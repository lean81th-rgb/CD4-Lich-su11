import { GoogleGenAI, Type } from "@google/genai";
import { QuizData } from "./types";

export const getStoredApiKey = (): string | null => {
  return localStorage.getItem("GEMINI_API_KEY");
};

export const setStoredApiKey = (key: string) => {
  localStorage.setItem("GEMINI_API_KEY", key);
};

export const generateHistoryQuiz = async (): Promise<QuizData> => {
  const apiKey = getStoredApiKey();
  if (!apiKey || apiKey.trim() === '' || apiKey === 'PLACEHOLDER_API_KEY') {
    throw new Error("Vui lòng nhập API Key hợp lệ trong phần Cài đặt (Settings) để sử dụng tính năng này.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Bạn là một giáo viên Lịch sử lớp 11 chuyên nghiệp. Hãy tạo một đề ôn tập về Chủ đề 4: Bảo vệ Tổ quốc (trước 1945).
    Kiến thức bao gồm: Vị trí địa chiến lược Việt Nam, Bạch Đằng (938), Kháng chiến chống Tống/Mông-Nguyên/Minh, Khởi nghĩa Lam Sơn, Quang Trung (1789), Bài học kinh nghiệm.
    Đảm bảo các mức độ tư duy: 30% nhận biết, 30% thông hiểu, 40% vận dụng.
    
    Tạo cấu trúc chính xác:
    - 5 câu trắc nghiệm nhiều lựa chọn (multiple_choice). Mỗi câu có 4 phương án.
    - 3 câu trắc nghiệm đúng/sai (true_false).
    - 2 câu tự luận vận dụng (essay).

    Trả về JSON theo đúng cấu trúc schema đã yêu cầu.
  `;

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      multiple_choice: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Phải có đúng 4 phương án A, B, C, D"
            },
            correct: { type: Type.INTEGER, description: "Index của câu trả lời đúng (0-3)" },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correct", "explanation"]
        }
      },
      true_false: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            answer: { type: Type.BOOLEAN },
            explanation: { type: Type.STRING }
          },
          required: ["question", "answer", "explanation"]
        }
      },
      essay: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING }
          },
          required: ["question"]
        }
      }
    },
    required: ["multiple_choice", "true_false", "essay"]
  };

  try {
    console.log("Calling Gemini API with @google/genai SDK, model: gemini-2.0-flash");

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonStr = response.text?.trim();
    console.log("Raw Gemini JSON:", jsonStr);

    if (!jsonStr) {
      throw new Error("AI không trả về dữ liệu. Vui lòng thử lại.");
    }

    const parsed = JSON.parse(jsonStr) as QuizData;

    // Validate the response structure
    if (!parsed.multiple_choice || !parsed.true_false || !parsed.essay) {
      throw new Error("Dữ liệu trả về từ AI không đúng cấu trúc. Vui lòng thử lại.");
    }

    return parsed;
  } catch (error: unknown) {
    console.error("Failed to generate or parse Gemini response:", error);

    if (error instanceof Error) {
      // Always show the raw error for debugging
      const rawMsg = error.message;
      const msg = rawMsg.toLowerCase();

      // Check for common API key errors
      if (msg.includes('api_key_invalid') || msg.includes('api key not valid') || msg.includes('permission_denied')) {
        throw new Error(`API Key không hợp lệ. Vui lòng vào Settings để nhập lại.\n\n[Chi tiết: ${rawMsg}]`);
      }

      // Check for quota/rate limit errors (be specific to avoid false positives)
      if (msg.includes('resource_exhausted') || msg.includes('rate_limit') || msg.includes('rate limit') || msg.includes('quota_exceeded')) {
        throw new Error(`API Key đã hết quota. Vui lòng chờ vài phút hoặc tạo API Key mới.\n\n[Chi tiết: ${rawMsg}]`);
      }

      // For ALL other errors, show the raw message directly so user can debug
      throw new Error(`Lỗi AI: ${rawMsg}`);
    }

    throw new Error("Lỗi không xác định khi tạo đề thi từ AI. Vui lòng thử lại sau.");
  }
};
