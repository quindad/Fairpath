import { useState, useEffect } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { Input } from '../ui/input';

interface LocationSuggestion {
  placeId: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  isOpportunityZone?: boolean;
}

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string, details?: LocationSuggestion) => void;
  placeholder?: string;
  showOpportunityZone?: boolean;
  className?: string;
}

export default function LocationAutocomplete({ 
  value, 
  onChange, 
  placeholder = "Enter address...",
  showOpportunityZone = false,
  className = ""
}: LocationAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock location suggestions based on Chicago area
  const mockSuggestions: LocationSuggestion[] = [
    {
      placeId: '1',
      description: '2847 N Sheffield Ave, Chicago, IL 60657',
      address: '2847 N Sheffield Ave',
      city: 'Chicago',
      state: 'IL',
      zip: '60657',
      isOpportunityZone: false
    },
    {
      placeId: '2',
      description: '1234 S State St, Chicago, IL 60605',
      address: '1234 S State St',
      city: 'Chicago',
      state: 'IL',
      zip: '60605',
      isOpportunityZone: true
    },
    {
      placeId: '3',
      description: '456 W Division St, Chicago, IL 60610',
      address: '456 W Division St',
      city: 'Chicago',
      state: 'IL',
      zip: '60610',
      isOpportunityZone: false
    },
    {
      placeId: '4',
      description: '789 E 47th St, Chicago, IL 60653',
      address: '789 E 47th St',
      city: 'Chicago',
      state: 'IL',
      zip: '60653',
      isOpportunityZone: true
    },
    {
      placeId: '5',
      description: '321 W Madison St, Chicago, IL 60661',
      address: '321 W Madison St',
      city: 'Chicago',
      state: 'IL',
      zip: '60661',
      isOpportunityZone: true
    },
    {
      placeId: '6',
      description: '567 N Michigan Ave, Chicago, IL 60611',
      address: '567 N Michigan Ave',
      city: 'Chicago',
      state: 'IL',
      zip: '60611',
      isOpportunityZone: false
    }
  ];

  useEffect(() => {
    if (value.length >= 3) {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        const filtered = mockSuggestions.filter(s => 
          s.description.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filtered);
        setIsLoading(false);
        setShowSuggestions(true);
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value]);

  const handleSelect = (suggestion: LocationSuggestion) => {
    onChange(suggestion.description, suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`bg-black border-white/20 text-white pl-10 ${className}`}
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A8F32C] animate-spin" />
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-[#121212] border border-white/20 rounded-lg shadow-xl max-h-64 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.placeId}
              onClick={() => handleSelect(suggestion)}
              className="w-full text-left p-3 hover:bg-[#A8F32C]/10 border-b border-white/5 last:border-0 transition-all"
            >
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-white text-sm">{suggestion.description}</p>
                  {showOpportunityZone && suggestion.isOpportunityZone && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">
                      ✓ Opportunity Zone
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {showSuggestions && suggestions.length === 0 && !isLoading && value.length >= 3 && (
        <div className="absolute z-50 w-full mt-2 bg-[#121212] border border-white/20 rounded-lg shadow-xl p-4 text-center">
          <p className="text-white/60 text-sm">No addresses found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}
