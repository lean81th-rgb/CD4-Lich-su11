import React, { useState, useEffect } from 'react';
import { Key, Save, X, ExternalLink } from 'lucide-react';
import { getStoredApiKey, setStoredApiKey } from '../geminiService';

interface APIKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    forceOpen?: boolean;
}

const APIKeyModal: React.FC<APIKeyModalProps> = ({ isOpen, onClose, forceOpen = false }) => {
    const [apiKey, setApiKey] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const stored = getStoredApiKey();
        if (stored) {
            setApiKey(stored);
        }
    }, [isOpen]);

    const handleSave = () => {
        if (!apiKey.trim()) {
            setError('Vui lòng nhập API Key');
            return;
        }
        setStoredApiKey(apiKey.trim());
        setError('');
        onClose();
    };

    const handleClose = () => {
        if (forceOpen) return;
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100">
                <div className="bg-gradient-to-r from-primary to-orange-600 p-6 text-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <Key className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold font-hand">Cấu hình API Key</h2>
                    </div>
                    {!forceOpen && (
                        <button onClick={handleClose} className="text-white/80 hover:text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    )}
                </div>

                <div className="p-6 space-y-6">
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800 space-y-2">
                        <p className="font-semibold flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            Hướng dẫn lấy khóa:
                        </p>
                        <ol className="list-decimal list-inside space-y-1 ml-1 text-blue-700">
                            <li>Truy cập <a href="https://aistudio.google.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline font-medium hover:text-blue-900">Google AI Studio</a></li>
                            <li>Tạo một key mới (Create API Key)</li>
                            <li>Copy và dán vào ô bên dưới</li>
                        </ol>
                        <div className="pt-2 border-t border-blue-200 mt-2">
                            <a href="https://tinyurl.com/hdsdpmTHT" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-blue-600 hover:text-blue-800 underline font-medium">
                                Xem hướng dẫn chi tiết tại đây
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="apiKey" className="block text-sm font-semibold text-slate-700 mb-2">
                                Google Gemini API Key
                            </label>
                            <input
                                type="password"
                                id="apiKey"
                                value={apiKey}
                                onChange={(e) => {
                                    setApiKey(e.target.value);
                                    setError('');
                                }}
                                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono text-sm"
                                placeholder="AIza..."
                            />
                            {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}
                        </div>

                        <button
                            onClick={handleSave}
                            className="w-full bg-primary hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            Lưu cấu hình
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default APIKeyModal;
