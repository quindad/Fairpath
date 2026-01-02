import SimulationLanding from './SimulationLanding';
import Navigation from '../website/Navigation';
import Footer from '../website/Footer';

interface SimulationLandingWrapperProps {
  onNavigate: (page: string) => void;
}

export default function SimulationLandingWrapper({ onNavigate }: SimulationLandingWrapperProps) {
  const onStartSimulation = () => {
    // TODO: Wire to actual simulation when Tab 3 is integrated
    alert('Simulation starting soon! Tab 3 integration in progress.');
  };

  const onRequestDemo = () => {
    onNavigate('contact');
  };

  return (
    <>
      <Navigation onNavigate={onNavigate} currentPage="simulation" />
      <SimulationLanding onStartSimulation={onStartSimulation} onRequestDemo={onRequestDemo} />
      <Footer onNavigate={onNavigate} />
    </>
  );
}
