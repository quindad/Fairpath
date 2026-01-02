import { useState, useEffect } from 'react';
import { MapPin, Shield, Flame, Navigation, Check } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface SafeLocation {
  id: string;
  name: string;
  type: 'police' | 'fire';
  address: string;
  distance: number;
  hours: string;
  hasParking: boolean;
  isPublicSafe: boolean;
}

interface SafePickupLocationsProps {
  userLocation: string;
  onSelectLocation: (location: SafeLocation) => void;
  selectedLocationId?: string;
}

export default function SafePickupLocations({ userLocation, onSelectLocation, selectedLocationId }: SafePickupLocationsProps) {
  const [locations, setLocations] = useState<SafeLocation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock safe pickup locations in Chicago area
  const mockLocations: SafeLocation[] = [
    {
      id: 'cpd-18',
      name: 'Chicago Police 18th District',
      type: 'police',
      address: '1160 N Larrabee St, Chicago, IL 60610',
      distance: 0.8,
      hours: '24/7',
      hasParking: true,
      isPublicSafe: true
    },
    {
      id: 'cfd-23',
      name: 'Chicago Fire Station 23',
      type: 'fire',
      address: '2701 N Halsted St, Chicago, IL 60614',
      distance: 1.2,
      hours: '24/7',
      hasParking: true,
      isPublicSafe: true
    },
    {
      id: 'cpd-19',
      name: 'Chicago Police 19th District',
      type: 'police',
      address: '850 W Addison St, Chicago, IL 60613',
      distance: 1.5,
      hours: '24/7',
      hasParking: true,
      isPublicSafe: true
    },
    {
      id: 'cfd-11',
      name: 'Chicago Fire Station 11',
      type: 'fire',
      address: '3401 N Kedzie Ave, Chicago, IL 60618',
      distance: 2.1,
      hours: '24/7',
      hasParking: false,
      isPublicSafe: true
    },
    {
      id: 'cpd-14',
      name: 'Chicago Police 14th District',
      type: 'police',
      address: '2150 N California Ave, Chicago, IL 60647',
      distance: 2.4,
      hours: '24/7',
      hasParking: true,
      isPublicSafe: true
    }
  ];

  useEffect(() => {
    // Simulate loading nearby safe locations
    setIsLoading(true);
    setTimeout(() => {
      setLocations(mockLocations);
      setIsLoading(false);
    }, 800);
  }, [userLocation]);

  if (isLoading) {
    return (
      <Card className="bg-[#121212] border-white/10 p-6">
        <div className="text-center">
          <Navigation className="h-12 w-12 text-[#A8F32C] mx-auto mb-3 animate-pulse" />
          <p className="text-white/60">Finding safe pickup locations near you...</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-500/20 to-transparent border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-white/80">
            <p className="mb-2"><strong className="text-white">🛡️ Safe Exchange Zones:</strong></p>
            <p>Meet at police or fire stations for secure item exchanges. These locations are monitored, well-lit, and have parking available.</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {locations.map((location) => (
          <Card
            key={location.id}
            className={`bg-black border-2 p-4 cursor-pointer transition-all ${
              selectedLocationId === location.id
                ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                : 'border-white/10 hover:border-white/30'
            }`}
            onClick={() => onSelectLocation(location)}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                location.type === 'police' 
                  ? 'bg-blue-500/20' 
                  : 'bg-red-500/20'
              }`}>
                {location.type === 'police' ? (
                  <Shield className="h-6 w-6 text-blue-400" />
                ) : (
                  <Flame className="h-6 w-6 text-red-400" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-white font-medium mb-1">{location.name}</h3>
                    <p className="text-sm text-white/60 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {location.address}
                    </p>
                  </div>
                  {selectedLocationId === location.id && (
                    <div className="w-6 h-6 rounded-full bg-[#A8F32C] flex items-center justify-center">
                      <Check className="h-4 w-4 text-black" />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-white/60 mt-3">
                  <span className="flex items-center gap-1">
                    <Navigation className="h-3 w-3" />
                    {location.distance} mi away
                  </span>
                  <span>⏰ {location.hours}</span>
                  {location.hasParking && (
                    <span className="text-[#A8F32C]">🅿️ Parking</span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
        <p className="text-sm text-white/80">
          <strong className="text-white">💡 Exchange Tips:</strong> Meet during daylight hours when possible. Bring a friend. Inspect items before taking. Don't share personal info until you're comfortable.
        </p>
      </div>
    </div>
  );
}
