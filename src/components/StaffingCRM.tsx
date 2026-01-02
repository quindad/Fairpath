import React from 'react';
import StaffingDashboard from './dashboards/StaffingDashboard';

interface StaffingCRMProps {
  onBackToHome: () => void;
}

export function StaffingCRM({ onBackToHome }: StaffingCRMProps) {
  // Mock user data for the public/demo view
  const mockUser = {
    id: 'demo-staffing-user',
    firstName: "Demo",
    lastName: "User",
    userType: "staffing",
    email: "demo@fairpathstaffing.com",
    phone: "(555) 123-4567"
  };

  const handleNavigate = (screen: string) => {
    if (screen === 'home') {
      onBackToHome();
    } else {
      console.log("Navigate to", screen);
      // In a real app, this might change the URL hash or state
    }
  };

  return (
    <StaffingDashboard userData={mockUser} onNavigate={handleNavigate} />
  );
}
