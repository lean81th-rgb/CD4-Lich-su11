
import React, { useState, useEffect } from 'react';
import { AppSection } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Objectives from './components/Sections/Objectives';
import Research from './components/Sections/Research';
import Summary from './components/Sections/Summary';
import Practice from './components/Sections/Practice';
import Resources from './components/Sections/Resources';
import APIKeyModal from './components/APIKeyModal';
import { getStoredApiKey } from './geminiService';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.OBJECTIVES);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [forceShowKeyModal, setForceShowKeyModal] = useState(false);

  // Simple hash-based router simulation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as AppSection;
      if (Object.values(AppSection).includes(hash)) {
        setActiveSection(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Check for API Key on load
  useEffect(() => {
    const checkApiKey = () => {
      const key = getStoredApiKey();
      if (!key) {
        setIsSettingsOpen(true);
        setForceShowKeyModal(true);
      } else {
        setForceShowKeyModal(false);
      }
    };
    checkApiKey();
  }, []);

  const handleCloseSettings = () => {
    // Re-check if key exists when closing. If forced and still no key, it won't close (handled by modal logic usually, but good to be safe)
    const key = getStoredApiKey();
    if (!key) {
      setForceShowKeyModal(true);
      // Don't close if forced
    } else {
      setForceShowKeyModal(false);
      setIsSettingsOpen(false);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case AppSection.OBJECTIVES:
        return <Objectives />;
      case AppSection.CONTENT:
        return <Research />;
      case AppSection.SUMMARY:
        return <Summary />;
      case AppSection.PRACTICE:
        return <Practice />;
      case AppSection.RESOURCES:
        return <Resources />;
      default:
        return <Objectives />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        activeSection={activeSection}
        onNavigate={setActiveSection}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      <main className="flex-grow container mx-auto px-4 pt-24 pb-12 max-w-6xl">
        <div className="animate-fade-in">
          {renderSection()}
        </div>
      </main>

      <Footer />

      <APIKeyModal
        isOpen={isSettingsOpen}
        onClose={handleCloseSettings}
        forceOpen={forceShowKeyModal}
      />
    </div>
  );
};

export default App;
