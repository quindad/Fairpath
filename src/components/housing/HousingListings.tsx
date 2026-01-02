import { useState } from 'react';
import { MapPin, Home, Zap, DollarSign, Bed, Bath, Calendar, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import LogoFinal from '../common/LogoFinal';

interface HousingListingsProps {
  onApplyWithFastTrack: (listingId: string) => void;
  onViewDetails: (listingId: string) => void;
  hasFairPathPlus?: boolean;
}

export default function HousingListings({ onApplyWithFastTrack, onViewDetails, hasFairPathPlus = false }: HousingListingsProps) {
  const [filter, setFilter] = useState('all');

  // Dummy data - in production this would come from API
  const listings = [
    {
      id: '1',
      address: '1234 Oak Street, Unit 2B',
      city: 'Chicago',
      state: 'IL',
      zip: '60614',
      rent: 1200,
      bedrooms: 2,
      bathrooms: 1,
      available: '2024-01-15',
      landlordRating: 4.8,
      landlordName: 'Smith Property Management',
      fastTrackEnabled: true,
      acceptsConvictions: ['drug', 'property', 'financial'],
      imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      featured: true,
      eligibleForYou: true
    },
    {
      id: '2',
      address: '5678 Maple Avenue',
      city: 'Chicago',
      state: 'IL',
      zip: '60625',
      rent: 950,
      bedrooms: 1,
      bathrooms: 1,
      available: '2024-01-20',
      landlordRating: 4.5,
      landlordName: 'Green Homes LLC',
      fastTrackEnabled: true,
      acceptsConvictions: ['drug', 'property', 'financial', 'other'],
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      featured: false,
      eligibleForYou: true
    },
    {
      id: '3',
      address: '9012 Pine Street',
      city: 'Evanston',
      state: 'IL',
      zip: '60201',
      rent: 1450,
      bedrooms: 3,
      bathrooms: 2,
      available: '2024-02-01',
      landlordRating: 4.9,
      landlordName: 'Lakeview Rentals',
      fastTrackEnabled: true,
      acceptsConvictions: ['drug', 'property'],
      imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800',
      featured: true,
      eligibleForYou: false
    }
  ];

  const filteredListings = filter === 'all' 
    ? listings 
    : filter === 'eligible'
    ? listings.filter(l => l.eligibleForYou)
    : listings.filter(l => l.fastTrackEnabled);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <LogoFinal size="md" />
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-white/60">
                <MapPin className="mr-2 h-4 w-4" />
                Chicago, IL
              </Button>
              {hasFairPathPlus && (
                <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                  FairPath+ Member
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-4xl mb-3">Find Your Home</h1>
          <p className="text-xl text-white/60">
            Browse felony-friendly housing with guaranteed showings
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg border transition-all ${
              filter === 'all'
                ? 'bg-[#A8F32C] text-black border-[#A8F32C]'
                : 'bg-transparent text-white border-white/20 hover:border-white/40'
            }`}
          >
            All Listings ({listings.length})
          </button>
          <button
            onClick={() => setFilter('eligible')}
            className={`px-4 py-2 rounded-lg border transition-all ${
              filter === 'eligible'
                ? 'bg-[#A8F32C] text-black border-[#A8F32C]'
                : 'bg-transparent text-white border-white/20 hover:border-white/40'
            }`}
          >
            Eligible for Me ({listings.filter(l => l.eligibleForYou).length})
          </button>
          <button
            onClick={() => setFilter('fasttrack')}
            className={`px-4 py-2 rounded-lg border transition-all ${
              filter === 'fasttrack'
                ? 'bg-[#A8F32C] text-black border-[#A8F32C]'
                : 'bg-transparent text-white border-white/20 hover:border-white/40'
            }`}
          >
            <Zap className="inline mr-1 h-4 w-4" />
            FastTrack ({listings.filter(l => l.fastTrackEnabled).length})
          </button>
        </div>

        {/* Listings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="bg-[#121212] border-white/10 overflow-hidden hover:border-[#A8F32C]/50 transition-all">
              {/* Image */}
              <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${listing.imageUrl})` }}>
                {listing.featured && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-[#A8F32C] text-black">Featured</Badge>
                  </div>
                )}
                {listing.fastTrackEnabled && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-black/80 text-[#A8F32C] border-[#A8F32C]/50">
                      <Zap className="h-3 w-3 mr-1" />
                      FastTrack
                    </Badge>
                  </div>
                )}
                {!listing.eligibleForYou && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="bg-black/80 border border-white/20 rounded-lg px-4 py-2 text-sm">
                      Not eligible based on your profile
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg mb-1">{listing.address}</h3>
                    <p className="text-sm text-white/60">{listing.city}, {listing.state} {listing.zip}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl text-[#A8F32C]">${listing.rent}</div>
                    <div className="text-xs text-white/60">per month</div>
                  </div>
                </div>

                {/* Property Details */}
                <div className="flex items-center gap-4 mb-4 text-sm text-white/60">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{listing.bedrooms} BR</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{listing.bathrooms} BA</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{listing.available}</span>
                  </div>
                </div>

                {/* Landlord Rating */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                  <Star className="h-4 w-4 text-[#A8F32C] fill-[#A8F32C]" />
                  <span className="text-sm">{listing.landlordRating} • {listing.landlordName}</span>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  {listing.eligibleForYou && listing.fastTrackEnabled && (
                    <Button
                      onClick={() => onApplyWithFastTrack(listing.id)}
                      className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                    >
                      <Zap className="mr-2 h-4 w-4" />
                      Apply with FastTrack {hasFairPathPlus ? '$65' : '$75'}
                    </Button>
                  )}
                  <Button
                    onClick={() => onViewDetails(listing.id)}
                    variant="outline"
                    className="w-full border-white/20 text-white"
                  >
                    View Details
                  </Button>
                </div>

                {hasFairPathPlus && listing.fastTrackEnabled && listing.eligibleForYou && (
                  <p className="text-xs text-[#A8F32C] text-center mt-2">
                    💰 Save $10 with FairPath+
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredListings.length === 0 && (
          <div className="text-center py-16">
            <Home className="h-16 w-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl mb-2">No listings found</h3>
            <p className="text-white/60 mb-4">Try adjusting your filters</p>
            <Button onClick={() => setFilter('all')} variant="outline" className="border-white/20 text-white">
              Show All Listings
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
