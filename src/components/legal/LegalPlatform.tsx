import React, { useState } from 'react';
import LawyerSignup from './LawyerSignup';
import LawyerDashboard from './LawyerDashboard';
import EligibilityChecker from './EligibilityChecker';
import LawyerDirectory from './LawyerDirectory';

type View = 'checker' | 'directory' | 'lawyer-signup' | 'lawyer-dashboard';

interface LegalPlatformProps {
  initialView?: View;
  onBack: () => void;
}

export default function LegalPlatform({ initialView = 'checker', onBack }: LegalPlatformProps) {
  const [currentView, setCurrentView] = useState<View>(initialView);
  const [eligibilityResults, setEligibilityResults] = useState<any>(null);
  const [isLawyerLoggedIn, setIsLawyerLoggedIn] = useState(false);

  const handleViewLawyers = (results: any) => {
    setEligibilityResults(results);
    setCurrentView('directory');
  };

  const handleContactLawyer = (lawyerId: number) => {
    console.log('Contacting lawyer:', lawyerId);
    // TODO: Open messaging modal
    alert('Messaging feature coming soon! For now, you can call the lawyer directly.');
  };

  const handleLawyerSignupComplete = () => {
    setIsLawyerLoggedIn(true);
    setCurrentView('lawyer-dashboard');
  };

  const handleLawyerLogout = () => {
    setIsLawyerLoggedIn(false);
    onBack();
  };

  if (currentView === 'lawyer-signup') {
    return (
      <LawyerSignup 
        onComplete={handleLawyerSignupComplete}
        onBack={onBack}
      />
    );
  }

  if (currentView === 'lawyer-dashboard' && isLawyerLoggedIn) {
    return (
      <LawyerDashboard onLogout={handleLawyerLogout} />
    );
  }

  if (currentView === 'directory') {
    return (
      <LawyerDirectory 
        prefilledState={eligibilityResults?.mainCharge?.state}
        onContactLawyer={handleContactLawyer}
      />
    );
  }

  return (
    <EligibilityChecker onViewLawyers={handleViewLawyers} />
  );
}
