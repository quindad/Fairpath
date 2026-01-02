import { useState } from 'react';
import { Search, Filter, MapPin, DollarSign, Home, Bed, Bath, X, Zap } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import LocationAutocomplete from '../common/LocationAutocomplete';

export default function AdvancedHousingSearch() {
  const [filters, setFilters] = useState({
    location: '',
    radius: 25,
    minRent: 0,
    maxRent: 3000,
    bedrooms: [] as string[],
    bathrooms: [] as string[],
    propertyType: [] as string[],
    convictionTypes: [] as string[],
    yearsOutMin: 0,
    amenities: [] as string[],
    petPolicy: [] as string[],
    leaseTerm: [] as string[],
    hasFastTrack: false,
    opportunityZone: false,
    securityDepositFlexible: false,
    utilitiesIncluded: false
  });

  const convictionOptions = [
    'Violent Felony',
    'Non-Violent Felony',
    'Drug Offense',
    'Property Crime',
    'White Collar',
    'Sex Offense',
    'Traffic/DUI',
    'Misdemeanor'
  ];

  const bedroomOptions = ['Studio', '1', '2', '3', '4+'];
  const bathroomOptions = ['1', '1.5', '2', '2.5', '3+'];
  const propertyTypes = ['Apartment', 'House', 'Condo', 'Townhouse', 'Room/Shared'];
  const amenityOptions = [
    'Parking',
    'Laundry In-Unit',
    'Laundry On-Site',
    'Air Conditioning',
    'Heating',
    'Dishwasher',
    'Balcony/Patio',
    'Wheelchair Accessible',
    'Public Transit Nearby'
  ];
  const petOptions = ['Cats OK', 'Dogs OK', 'No Pets'];
  const leaseTerms = ['Month-to-Month', '3 Months', '6 Months', '1 Year', 'Flexible'];

  const toggleFilter = (category: string, value: string) => {
    const current = filters[category as keyof typeof filters] as string[];
    if (current.includes(value)) {
      setFilters({ ...filters, [category]: current.filter(v => v !== value) });
    } else {
      setFilters({ ...filters, [category]: [...current, value] });
    }
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      radius: 25,
      minRent: 0,
      maxRent: 3000,
      bedrooms: [],
      bathrooms: [],
      propertyType: [],
      convictionTypes: [],
      yearsOutMin: 0,
      amenities: [],
      petPolicy: [],
      leaseTerm: [],
      hasFastTrack: false,
      opportunityZone: false,
      securityDepositFlexible: false,
      utilitiesIncluded: false
    });
  };

  const activeFilterCount = 
    filters.bedrooms.length +
    filters.bathrooms.length +
    filters.propertyType.length +
    filters.convictionTypes.length +
    filters.amenities.length +
    filters.petPolicy.length +
    filters.leaseTerm.length +
    (filters.hasFastTrack ? 1 : 0) +
    (filters.opportunityZone ? 1 : 0) +
    (filters.securityDepositFlexible ? 1 : 0) +
    (filters.utilitiesIncluded ? 1 : 0);

  // Mock housing results
  const mockHousing = [
    {
      id: '1',
      title: '2BR/1BA Apartment',
      address: 'Lincoln Park, Chicago',
      rent: 1450,
      bedrooms: 2,
      bathrooms: 1,
      type: 'Apartment',
      acceptsConvictions: ['Non-Violent Felony', 'Drug Offense'],
      yearsOutRequired: 1,
      hasFastTrack: true,
      amenities: ['Parking', 'Laundry On-Site'],
      available: 'Now',
      isOpportunityZone: false
    },
    {
      id: '2',
      title: '1BR/1BA Condo',
      address: 'Wicker Park, Chicago',
      rent: 1200,
      bedrooms: 1,
      bathrooms: 1,
      type: 'Condo',
      acceptsConvictions: ['Violent Felony', 'Non-Violent Felony', 'Drug Offense'],
      yearsOutRequired: 0,
      hasFastTrack: true,
      amenities: ['Public Transit Nearby', 'Air Conditioning'],
      available: 'Dec 15',
      isOpportunityZone: true
    },
    {
      id: '3',
      title: 'Studio Apartment',
      address: 'South Loop, Chicago',
      rent: 950,
      bedrooms: 0,
      bathrooms: 1,
      type: 'Apartment',
      acceptsConvictions: ['Non-Violent Felony', 'Property Crime'],
      yearsOutRequired: 2,
      hasFastTrack: false,
      amenities: ['Laundry In-Unit', 'Heating'],
      available: 'Jan 1',
      isOpportunityZone: true
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl text-white mb-2">HOUSING SEARCH</h1>
          <p className="text-white/60">Find felony-friendly housing that accepts your background</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-[#121212] border-white/10 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-white flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  FILTERS
                </h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-[#A8F32C] hover:underline"
                  >
                    Clear All ({activeFilterCount})
                  </button>
                )}
              </div>

              <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                {/* Rent Range */}
                <div>
                  <Label className="text-white mb-3 block flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Monthly Rent
                  </Label>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm text-white/60 mb-2">
                        <span>Min: ${filters.minRent}</span>
                        <span>Max: ${filters.maxRent}</span>
                      </div>
                      <Slider
                        value={[filters.minRent]}
                        onValueChange={(val) => setFilters({ ...filters, minRent: val[0] })}
                        max={3000}
                        step={50}
                        className="mb-2"
                      />
                      <Slider
                        value={[filters.maxRent]}
                        onValueChange={(val) => setFilters({ ...filters, maxRent: val[0] })}
                        max={3000}
                        step={50}
                      />
                    </div>
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <Label className="text-white mb-3 block flex items-center gap-2">
                    <Bed className="h-4 w-4" />
                    Bedrooms
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {bedroomOptions.map((bed) => (
                      <button
                        key={bed}
                        onClick={() => toggleFilter('bedrooms', bed)}
                        className={`px-3 py-2 rounded border text-sm transition-all ${
                          filters.bedrooms.includes(bed)
                            ? 'bg-[#A8F32C]/10 border-[#A8F32C] text-white'
                            : 'bg-black border-white/10 text-white/80 hover:border-white/30'
                        }`}
                      >
                        {bed}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bathrooms */}
                <div>
                  <Label className="text-white mb-3 block flex items-center gap-2">
                    <Bath className="h-4 w-4" />
                    Bathrooms
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {bathroomOptions.map((bath) => (
                      <button
                        key={bath}
                        onClick={() => toggleFilter('bathrooms', bath)}
                        className={`px-3 py-2 rounded border text-sm transition-all ${
                          filters.bathrooms.includes(bath)
                            ? 'bg-[#A8F32C]/10 border-[#A8F32C] text-white'
                            : 'bg-black border-white/10 text-white/80 hover:border-white/30'
                        }`}
                      >
                        {bath}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <Label className="text-white mb-3 block">Property Type</Label>
                  <div className="space-y-2">
                    {propertyTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => toggleFilter('propertyType', type)}
                        className={`w-full text-left px-3 py-2 rounded border text-sm transition-all ${
                          filters.propertyType.includes(type)
                            ? 'bg-[#A8F32C]/10 border-[#A8F32C] text-white'
                            : 'bg-black border-white/10 text-white/80 hover:border-white/30'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conviction Types Accepted */}
                <div>
                  <Label className="text-white mb-3 block">Accepts Conviction Types</Label>
                  <div className="space-y-2">
                    {convictionOptions.map((type) => (
                      <button
                        key={type}
                        onClick={() => toggleFilter('convictionTypes', type)}
                        className={`w-full text-left px-3 py-2 rounded border text-sm transition-all ${
                          filters.convictionTypes.includes(type)
                            ? 'bg-purple-500/10 border-purple-500 text-white'
                            : 'bg-black border-white/10 text-white/80 hover:border-white/30'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <Label className="text-white mb-3 block">Amenities</Label>
                  <div className="space-y-2">
                    {amenityOptions.map((amenity) => (
                      <button
                        key={amenity}
                        onClick={() => toggleFilter('amenities', amenity)}
                        className={`w-full text-left px-3 py-2 rounded border text-sm transition-all ${
                          filters.amenities.includes(amenity)
                            ? 'bg-blue-500/10 border-blue-500 text-white'
                            : 'bg-black border-white/10 text-white/80 hover:border-white/30'
                        }`}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pet Policy */}
                <div>
                  <Label className="text-white mb-3 block">Pet Policy</Label>
                  <div className="space-y-2">
                    {petOptions.map((pet) => (
                      <button
                        key={pet}
                        onClick={() => toggleFilter('petPolicy', pet)}
                        className={`w-full text-left px-3 py-2 rounded border text-sm transition-all ${
                          filters.petPolicy.includes(pet)
                            ? 'bg-green-500/10 border-green-500 text-white'
                            : 'bg-black border-white/10 text-white/80 hover:border-white/30'
                        }`}
                      >
                        {pet}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Lease Terms */}
                <div>
                  <Label className="text-white mb-3 block">Lease Terms</Label>
                  <div className="space-y-2">
                    {leaseTerms.map((term) => (
                      <button
                        key={term}
                        onClick={() => toggleFilter('leaseTerm', term)}
                        className={`w-full text-left px-3 py-2 rounded border text-sm transition-all ${
                          filters.leaseTerm.includes(term)
                            ? 'bg-yellow-500/10 border-yellow-500 text-white'
                            : 'bg-black border-white/10 text-white/80 hover:border-white/30'
                        }`}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Filters */}
                <div>
                  <Label className="text-white mb-3 block">Special Filters</Label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setFilters({ ...filters, hasFastTrack: !filters.hasFastTrack })}
                      className={`w-full text-left px-3 py-2 rounded border text-sm transition-all ${
                        filters.hasFastTrack
                          ? 'bg-yellow-500/10 border-yellow-500 text-white'
                          : 'bg-black border-white/10 text-white/80 hover:border-white/30'
                      }`}
                    >
                      ⚡ FastTrack Available ($75)
                    </button>
                    <button
                      onClick={() => setFilters({ ...filters, opportunityZone: !filters.opportunityZone })}
                      className={`w-full text-left px-3 py-2 rounded border text-sm transition-all ${
                        filters.opportunityZone
                          ? 'bg-green-500/10 border-green-500 text-white'
                          : 'bg-black border-white/10 text-white/80 hover:border-white/30'
                      }`}
                    >
                      📍 Opportunity Zone
                    </button>
                    <button
                      onClick={() => setFilters({ ...filters, securityDepositFlexible: !filters.securityDepositFlexible })}
                      className={`w-full text-left px-3 py-2 rounded border text-sm transition-all ${
                        filters.securityDepositFlexible
                          ? 'bg-blue-500/10 border-blue-500 text-white'
                          : 'bg-black border-white/10 text-white/80 hover:border-white/30'
                      }`}
                    >
                      💰 Flexible Security Deposit
                    </button>
                    <button
                      onClick={() => setFilters({ ...filters, utilitiesIncluded: !filters.utilitiesIncluded })}
                      className={`w-full text-left px-3 py-2 rounded border text-sm transition-all ${
                        filters.utilitiesIncluded
                          ? 'bg-purple-500/10 border-purple-500 text-white'
                          : 'bg-black border-white/10 text-white/80 hover:border-white/30'
                      }`}
                    >
                      🔌 Utilities Included
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search Bar */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="location" className="text-white mb-2 block">Location</Label>
                  <LocationAutocomplete
                    value={filters.location}
                    onChange={(value) => setFilters({ ...filters, location: value })}
                    placeholder="City, neighborhood, or zip code"
                    showOpportunityZone
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Label className="text-white/60 text-sm">Radius:</Label>
                  <div className="flex-1">
                    <Slider
                      value={[filters.radius]}
                      onValueChange={(val) => setFilters({ ...filters, radius: val[0] })}
                      max={100}
                      step={5}
                    />
                  </div>
                  <span className="text-white text-sm w-16">{filters.radius} mi</span>
                </div>
              </div>
            </Card>

            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl text-white">{mockHousing.length} Properties Found</h2>
                <p className="text-white/60 text-sm">Showing properties that accept your background</p>
              </div>
              <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                SAVE SEARCH
              </Button>
            </div>

            {/* Housing Cards */}
            {mockHousing.map((property) => (
              <Card key={property.id} className="bg-[#121212] border-white/10 p-6 hover:border-[#A8F32C]/50 transition-all">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
                        <Home className="h-6 w-6 text-[#A8F32C]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl text-white mb-1">{property.title}</h3>
                        <p className="text-white/60 flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {property.address}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-white/60 mb-1">Rent</p>
                        <p className="text-lg text-[#A8F32C]">${property.rent}/mo</p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60 mb-1">Bedrooms</p>
                        <p className="text-sm text-white flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          {property.bedrooms === 0 ? 'Studio' : property.bedrooms}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60 mb-1">Bathrooms</p>
                        <p className="text-sm text-white flex items-center gap-1">
                          <Bath className="h-4 w-4" />
                          {property.bathrooms}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-white/60 mb-1">Available</p>
                        <p className="text-sm text-white">{property.available}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.hasFastTrack && (
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                          ⚡ FastTrack $75
                        </span>
                      )}
                      {property.isOpportunityZone && (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                          📍 Opportunity Zone
                        </span>
                      )}
                      {property.acceptsConvictions.slice(0, 2).map((conv) => (
                        <span key={conv} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                          {conv}
                        </span>
                      ))}
                      {property.acceptsConvictions.length > 2 && (
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded">
                          +{property.acceptsConvictions.length - 2} more
                        </span>
                      )}
                      {property.yearsOutRequired === 0 ? (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                          ✓ No Time Requirement
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                          {property.yearsOutRequired}+ years out
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-white/60">
                      Amenities: {property.amenities.join(', ')}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 whitespace-nowrap">
                      VIEW PROPERTY
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white whitespace-nowrap">
                      SAVE
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
