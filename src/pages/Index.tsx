
import { useState } from "react";
import { MainNavigation } from "@/components/MainNavigation";
import { Footer } from "@/components/Footer";
import { BreadcrumbNavigation } from "@/components/BreadcrumbNavigation";
import { GovernmentHeader } from "@/components/layout/GovernmentHeader";
import { MainHeader } from "@/components/layout/MainHeader";
import { ContentRenderer } from "@/components/layout/ContentRenderer";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [language, setLanguage] = useState("fr");

  return (
    <div className="min-h-screen w-full algerian-green-bg flex flex-col">
      {/* Header gouvernemental */}
      <GovernmentHeader language={language} onLanguageChange={setLanguage} />

      {/* Header principal */}
      <MainHeader 
        language={language}
        activeSection={activeSection}
        onLanguageChange={setLanguage}
        onSectionChange={setActiveSection}
      />

      {/* Menu de navigation principal - Hidden on mobile */}
      <div className="hidden md:block">
        <MainNavigation 
          onSectionChange={setActiveSection} 
          activeSection={activeSection}
          language={language}
        />
      </div>

      <BreadcrumbNavigation 
        currentSection={activeSection}
        onSectionChange={setActiveSection}
        language={language}
      />

      {/* Main Content */}
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-7xl">
          <ContentRenderer activeSection={activeSection} language={language} />
        </div>
      </main>

      {/* Footer */}
      <Footer onSectionChange={setActiveSection} />
    </div>
  );
};

export default Index;
