import { useState } from 'react';
import { Search, SlidersHorizontal, MapPin, Home, Zap, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { UserProfile } from '../ProfileSetupWizard';
import { PropertyListing, mockProperties, isEligibleForProperty } from '../../lib/eligibility';

interface HousingMarketplaceProps {
  userProfile?: UserProfile | null;
  isSubscriber?: boolean;
  onNavigateToFastTrack?: (propertyId: string) => void;
}

export default function HousingMarketplace({ 
  userProfile = null, 
  isSubscriber = false,
  onNavigateToFastTrack 
}: HousingMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showEligibleOnly, setShowEligibleOnly] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter properties based on eligibility toggle
  const filteredProperties = mockProperties.filter(property => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        property.title.toLowerCase().includes(query) ||
        property.city.toLowerCase().includes(query) ||
        property.address.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Eligibility filter
    if (showEligibleOnly) {
      return isEligibleForProperty(userProfile, property);
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="p-6 border-b border-white/5">
        <div className="text-xs tracking-widest text-[#A8F32C] mb-2">
          HOUSING MARKETPLACE
        </div>
        <h1 className="text-3xl mb-1">Felony-Friendly Housing</h1>
        <p className="text-sm text-white/60">
          {filteredProperties.length} {filteredProperties.length === 1 ? 'listing' : 'listings'} available
        </p>
      </div>

      {/* Search & Filters */}
      <div className="px-6 py-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
          <Input
            placeholder="Search by city, address, or property name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-12 h-12 bg-[#121212] border-white/10 text-white"
          />
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/5 rounded transition-colors"
          >
            <SlidersHorizontal className="h-5 w-5 text-white/40" />
          </button>
        </div>

        {/* Eligibility Toggle */}
        <div className="bg-[#121212] rounded-xl p-4 border border-white/5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {showEligibleOnly ? (
                  <CheckCircle className="h-4 w-4 text-[#A8F32C]" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                )}
                <span className="text-sm">
                  {showEligibleOnly 
                    ? 'Showing only properties you\'re eligible for' 
                    : 'Showing all properties'
                  }
                </span>
              </div>
              <p className="text-xs text-white/60">
                {showEligibleOnly
                  ? 'Based on your profile, these properties accept your record'
                  : 'Some properties may not accept your record'
                }
              </p>
            </div>
            <button
              onClick={() => setShowEligibleOnly(!showEligibleOnly)}
              className={`px-4 py-2 rounded-lg text-sm transition-all flex-shrink-0 ${
                showEligibleOnly
                  ? 'bg-[#A8F32C] text-black'
                  : 'bg-white/5 text-white border border-white/10'
              }`}
            >
              {showEligibleOnly ? 'Show All' : 'Eligible Only'}
            </button>
          </div>
        </div>

        {!showEligibleOnly && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-100">
              You're viewing all listings. Some may have requirements that don't match your profile. Look for the "You're eligible" badge.
            </p>
          </div>
        )}
      </div>

      {/* Property Listings */}
      <div className="px-6 pb-6 space-y-4">
        {filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <Home className="h-16 w-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/60 mb-2">No properties found</p>
            <p className="text-sm text-white/40">
              {showEligibleOnly 
                ? 'Try toggling "Show All" to see more listings'
                : 'Try adjusting your search'
              }
            </p>
          </div>
        ) : (
          filteredProperties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              isEligible={isEligibleForProperty(userProfile, property)}
              showEligibilityBadge={!showEligibleOnly}
              onClick={() => {
                if (onNavigateToFastTrack) {
                  onNavigateToFastTrack(property.id);
                }
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

function PropertyCard({ 
  property, 
  isEligible, 
  showEligibilityBadge,
  onClick 
}: { 
  property: PropertyListing; 
  isEligible: boolean;
  showEligibilityBadge: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-[#121212] rounded-2xl overflow-hidden border border-white/5 hover:border-[#A8F32C]/40 transition-all text-left group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-white/5">
        <img 
          src={property.imageUrl} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges overlay */}
        <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
          {property.fastTrackEnabled && property.guaranteedShowing && (
            <Badge className="bg-[#A8F32C] text-black border-0 text-xs">
              <Zap className="h-3 w-3 mr-1" />
              FastTrack + Guaranteed Showing
            </Badge>
          )}
          
          {showEligibilityBadge && (
            isEligible ? (
              <Badge className="bg-green-500/90 text-white border-0 text-xs">
                <CheckCircle className="h-3 w-3 mr-1" />
                You're eligible
              </Badge>
            ) : (
              <Badge className="bg-yellow-500/90 text-black border-0 text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                May not accept your record
              </Badge>
            )
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg mb-2 group-hover:text-[#A8F32C] transition-colors">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-white/60 mb-3">
          <MapPin className="h-4 w-4" />
          <span>{property.city}, {property.state}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div>
            <div className="text-2xl text-[#A8F32C]">
              ${property.rent.toLocaleString()}
            </div>
            <div className="text-xs text-white/60">per month</div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-white/60">
            <div>
              <span className="text-white">{property.bedrooms}</span> bed
            </div>
            <div>
              <span className="text-white">{property.bathrooms}</span> bath
            </div>
            <div>
              <span className="text-white">{property.sqft}</span> sqft
            </div>
          </div>
        </div>

        {/* Landlord info */}
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
          <div className="w-8 h-8 bg-[#A8F32C]/10 rounded-full flex items-center justify-center">
            <Shield className="h-4 w-4 text-[#A8F32C]" />
          </div>
          <div className="text-xs">
            <div className="text-white/80">{property.landlordName}</div>
            {property.landlordCompany && (
              <div className="text-white/40">{property.landlordCompany}</div>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}