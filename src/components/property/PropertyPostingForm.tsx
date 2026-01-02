import { useState } from 'react';
import { Home, DollarSign, MapPin, Zap, Check, ArrowRight, ArrowLeft, Upload, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import LogoFinal from '../common/LogoFinal';

interface PropertyPostingFormProps {
  packageType: 'basic' | 'pro' | 'premium';
  currentListings: number;
  onComplete: () => void;
  onCancel: () => void;
}

export default function PropertyPostingForm({ packageType, currentListings, onComplete, onCancel }: PropertyPostingFormProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const packageLimits = {
    basic: 1,
    pro: 5,
    premium: 999
  };

  const maxListings = packageLimits[packageType];
  const canPostMore = currentListings < maxListings;
  const hasFastTrack = packageType !== 'basic';

  const [propertyData, setPropertyData] = useState({
    address: '',
    unit: '',
    city: '',
    state: 'IL',
    zip: '',
    rent: '',
    deposit: '',
    bedrooms: '1',
    bathrooms: '1',
    squareFeet: '',
    propertyType: 'apartment',
    description: '',
    amenities: [] as string[],
    utilities: [] as string[],
    petPolicy: 'no',
    smokingPolicy: 'no',
    leaseTerm: '12',
    availableDate: '',
    acceptsConvictions: [] as string[],
    timeRequirement: '5',
    enableFastTrack: hasFastTrack,
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    images: [] as string[]
  });

  const convictionTypes = [
    { id: 'violent', label: 'Violent Offenses', description: 'Assault, robbery, etc.' },
    { id: 'property', label: 'Property Crimes', description: 'Theft, burglary, etc.' },
    { id: 'drug', label: 'Drug-Related', description: 'Possession, distribution, etc.' },
    { id: 'fraud', label: 'Fraud/White Collar', description: 'Embezzlement, forgery, etc.' },
    { id: 'sex', label: 'Sex Offenses', description: 'Any registered offense' },
    { id: 'other', label: 'Other/Non-Violent', description: 'All other offenses' }
  ];

  const amenitiesList = [
    'Parking', 'Laundry In-Unit', 'Dishwasher', 'Air Conditioning',
    'Heating', 'Hardwood Floors', 'Balcony/Patio', 'Gym/Fitness Center',
    'Pool', 'Storage', 'Wheelchair Accessible', 'Elevator'
  ];

  const utilitiesList = [
    'Water', 'Heat', 'Electric', 'Gas', 'Trash', 'Internet'
  ];

  const handleAmenityToggle = (amenity: string) => {
    if (propertyData.amenities.includes(amenity)) {
      setPropertyData({ ...propertyData, amenities: propertyData.amenities.filter(a => a !== amenity) });
    } else {
      setPropertyData({ ...propertyData, amenities: [...propertyData.amenities, amenity] });
    }
  };

  const handleUtilityToggle = (utility: string) => {
    if (propertyData.utilities.includes(utility)) {
      setPropertyData({ ...propertyData, utilities: propertyData.utilities.filter(u => u !== utility) });
    } else {
      setPropertyData({ ...propertyData, utilities: [...propertyData.utilities, utility] });
    }
  };

  const handleConvictionToggle = (id: string) => {
    if (propertyData.acceptsConvictions.includes(id)) {
      setPropertyData({ ...propertyData, acceptsConvictions: propertyData.acceptsConvictions.filter(c => c !== id) });
    } else {
      setPropertyData({ ...propertyData, acceptsConvictions: [...propertyData.acceptsConvictions, id] });
    }
  };

  const progress = (step / totalSteps) * 100;

  if (!canPostMore) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-white/5 bg-[#121212]">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <LogoFinal size="md" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <Card className="bg-[#121212] border-white/10 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
              <Home className="h-8 w-8 text-red-400" />
            </div>
            <h2 className="text-3xl mb-3 text-white">Listing Limit Reached</h2>
            <p className="text-xl text-white/60 mb-8">
              You've reached your limit of {maxListings} active listing{maxListings > 1 ? 's' : ''} on the {packageType.charAt(0).toUpperCase() + packageType.slice(1)} plan.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={onCancel} variant="outline" className="border-white/20 text-white">
                Go Back
              </Button>
              <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                Upgrade Plan
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <LogoFinal size="md" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">Step {step} of {totalSteps}</span>
            <span className="text-sm text-[#A8F32C]">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Property Details */}
        {step === 1 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center">
                <Home className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-2xl text-white">Property Information</h2>
                <p className="text-white/60">Basic details about your rental</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="address" className="text-white mb-2 block">
                  Street Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="address"
                  placeholder="2847 N Sheffield Ave"
                  value={propertyData.address}
                  onChange={(e) => setPropertyData({ ...propertyData, address: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="unit" className="text-white mb-2 block">
                  Unit/Apt Number
                </Label>
                <Input
                  id="unit"
                  placeholder="Unit 3B"
                  value={propertyData.unit}
                  onChange={(e) => setPropertyData({ ...propertyData, unit: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="text-white mb-2 block">
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    placeholder="Chicago"
                    value={propertyData.city}
                    onChange={(e) => setPropertyData({ ...propertyData, city: e.target.value })}
                    className="bg-black border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-white mb-2 block">
                    State <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="state"
                    placeholder="IL"
                    value={propertyData.state}
                    onChange={(e) => setPropertyData({ ...propertyData, state: e.target.value })}
                    className="bg-black border-white/20 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="zip" className="text-white mb-2 block">
                  ZIP Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="zip"
                  placeholder="60657"
                  value={propertyData.zip}
                  onChange={(e) => setPropertyData({ ...propertyData, zip: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rent" className="text-white mb-2 block">
                    Monthly Rent <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="rent"
                    placeholder="$1,450"
                    value={propertyData.rent}
                    onChange={(e) => setPropertyData({ ...propertyData, rent: e.target.value })}
                    className="bg-black border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="deposit" className="text-white mb-2 block">
                    Security Deposit <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="deposit"
                    placeholder="$1,450"
                    value={propertyData.deposit}
                    onChange={(e) => setPropertyData({ ...propertyData, deposit: e.target.value })}
                    className="bg-black border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bedrooms" className="text-white mb-2 block">
                    Bedrooms <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="bedrooms"
                    value={propertyData.bedrooms}
                    onChange={(e) => setPropertyData({ ...propertyData, bedrooms: e.target.value })}
                    className="w-full p-2 bg-black border border-white/20 rounded-lg text-white"
                  >
                    <option value="0">Studio</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5+</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="bathrooms" className="text-white mb-2 block">
                    Bathrooms <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="bathrooms"
                    value={propertyData.bathrooms}
                    onChange={(e) => setPropertyData({ ...propertyData, bathrooms: e.target.value })}
                    className="w-full p-2 bg-black border border-white/20 rounded-lg text-white"
                  >
                    <option value="1">1</option>
                    <option value="1.5">1.5</option>
                    <option value="2">2</option>
                    <option value="2.5">2.5</option>
                    <option value="3">3</option>
                    <option value="3.5">3.5</option>
                    <option value="4">4+</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="squareFeet" className="text-white mb-2 block">
                    Square Feet
                  </Label>
                  <Input
                    id="squareFeet"
                    placeholder="800"
                    value={propertyData.squareFeet}
                    onChange={(e) => setPropertyData({ ...propertyData, squareFeet: e.target.value })}
                    className="bg-black border-white/20 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white mb-2 block">
                  Property Type <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {['apartment', 'house', 'condo'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPropertyData({ ...propertyData, propertyType: type })}
                      className={`p-3 border-2 rounded-lg transition-all ${
                        propertyData.propertyType === type
                          ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <div className="text-white capitalize">{type}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Amenities & Policies */}
        {step === 2 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Check className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl text-white">Amenities & Details</h2>
                <p className="text-white/60">What does this property include?</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="description" className="text-white mb-2 block">
                  Property Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the property, neighborhood, and any special features..."
                  value={propertyData.description}
                  onChange={(e) => setPropertyData({ ...propertyData, description: e.target.value })}
                  className="bg-black border-white/20 text-white min-h-32"
                />
              </div>

              <div>
                <Label className="text-white mb-3 block">Amenities</Label>
                <div className="grid grid-cols-2 gap-3">
                  {amenitiesList.map((amenity) => (
                    <label
                      key={amenity}
                      className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                        propertyData.amenities.includes(amenity)
                          ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={propertyData.amenities.includes(amenity)}
                        onChange={() => handleAmenityToggle(amenity)}
                      />
                      <span className="text-white text-sm">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-white mb-3 block">Utilities Included</Label>
                <div className="grid grid-cols-3 gap-3">
                  {utilitiesList.map((utility) => (
                    <label
                      key={utility}
                      className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                        propertyData.utilities.includes(utility)
                          ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={propertyData.utilities.includes(utility)}
                        onChange={() => handleUtilityToggle(utility)}
                      />
                      <span className="text-white text-sm">{utility}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white mb-2 block">Pet Policy</Label>
                  <select
                    value={propertyData.petPolicy}
                    onChange={(e) => setPropertyData({ ...propertyData, petPolicy: e.target.value })}
                    className="w-full p-3 bg-black border border-white/20 rounded-lg text-white"
                  >
                    <option value="no">No Pets</option>
                    <option value="cats">Cats Only</option>
                    <option value="dogs">Dogs Only</option>
                    <option value="both">Cats & Dogs</option>
                    <option value="negotiable">Negotiable</option>
                  </select>
                </div>
                <div>
                  <Label className="text-white mb-2 block">Smoking Policy</Label>
                  <select
                    value={propertyData.smokingPolicy}
                    onChange={(e) => setPropertyData({ ...propertyData, smokingPolicy: e.target.value })}
                    className="w-full p-3 bg-black border border-white/20 rounded-lg text-white"
                  >
                    <option value="no">No Smoking</option>
                    <option value="outside">Outside Only</option>
                    <option value="yes">Smoking Allowed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="leaseTerm" className="text-white mb-2 block">
                    Lease Term (months)
                  </Label>
                  <Input
                    id="leaseTerm"
                    placeholder="12"
                    value={propertyData.leaseTerm}
                    onChange={(e) => setPropertyData({ ...propertyData, leaseTerm: e.target.value })}
                    className="bg-black border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="availableDate" className="text-white mb-2 block">
                    Available Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="availableDate"
                    type="date"
                    value={propertyData.availableDate}
                    onChange={(e) => setPropertyData({ ...propertyData, availableDate: e.target.value })}
                    className="bg-black border-white/20 text-white"
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: Conviction Eligibility & FastTrack */}
        {step === 3 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl text-white">Tenant Eligibility & FastTrack</h2>
                <p className="text-white/60">Set your screening criteria</p>
              </div>
            </div>

            <div className="space-y-6">
              {hasFastTrack && (
                <div className="bg-gradient-to-r from-yellow-500/20 to-transparent border border-yellow-500/30 rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Zap className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg text-white mb-2">Enable FastTrack Applications</h3>
                      <p className="text-sm text-white/80 mb-4">
                        Earn $75 per FastTrack application. Applicants pay for professional background screening and you MUST show the property or provide a valid denial reason.
                      </p>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={propertyData.enableFastTrack}
                          onChange={(e) => setPropertyData({ ...propertyData, enableFastTrack: e.target.checked })}
                          className="w-5 h-5"
                        />
                        <span className="text-white">Enable FastTrack for this listing (+$75 per application)</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label className="text-white mb-3 block">
                  Accepted Conviction Types <span className="text-red-500">*</span>
                </Label>
                <div className="space-y-3 mb-4">
                  {convictionTypes.map((conviction) => (
                    <label
                      key={conviction.id}
                      className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        propertyData.acceptsConvictions.includes(conviction.id)
                          ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={propertyData.acceptsConvictions.includes(conviction.id)}
                        onChange={() => handleConvictionToggle(conviction.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="text-white mb-1">{conviction.label}</div>
                        <div className="text-sm text-white/60">{conviction.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-white mb-2 block">
                  Time Since Conviction <span className="text-red-500">*</span>
                </Label>
                <select
                  value={propertyData.timeRequirement}
                  onChange={(e) => setPropertyData({ ...propertyData, timeRequirement: e.target.value })}
                  className="w-full p-3 bg-black border border-white/20 rounded-lg text-white"
                >
                  <option value="0">Any time (most inclusive)</option>
                  <option value="1">1+ years since release</option>
                  <option value="2">2+ years since release</option>
                  <option value="3">3+ years since release</option>
                  <option value="5">5+ years since release</option>
                  <option value="10">10+ years since release</option>
                </select>
              </div>
            </div>
          </Card>
        )}

        {/* Step 4: Contact & Photos */}
        {step === 4 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center">
                <Check className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-2xl text-white">Contact & Photos</h2>
                <p className="text-white/60">Finish up your listing</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="contactName" className="text-white mb-2 block">
                  Contact Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactName"
                  placeholder="John Smith"
                  value={propertyData.contactName}
                  onChange={(e) => setPropertyData({ ...propertyData, contactName: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="contactEmail" className="text-white mb-2 block">
                  Contact Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="landlord@email.com"
                  value={propertyData.contactEmail}
                  onChange={(e) => setPropertyData({ ...propertyData, contactEmail: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="contactPhone" className="text-white mb-2 block">
                  Contact Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactPhone"
                  placeholder="(312) 555-0123"
                  value={propertyData.contactPhone}
                  onChange={(e) => setPropertyData({ ...propertyData, contactPhone: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              </div>

              <div>
                <Label className="text-white mb-3 block">Property Photos</Label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-[#A8F32C]/50 transition-all cursor-pointer">
                  <Upload className="h-12 w-12 text-white/40 mx-auto mb-3" />
                  <p className="text-white/60 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-white/40">PNG, JPG up to 10MB (max 10 photos)</p>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-black/50 border border-white/10 rounded-lg p-6">
                <h3 className="text-lg mb-4 text-white">Listing Preview</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Address:</span>
                    <span className="text-white">{propertyData.address || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Rent:</span>
                    <span className="text-white">{propertyData.rent || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Beds/Baths:</span>
                    <span className="text-white">{propertyData.bedrooms} bed / {propertyData.bathrooms} bath</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">FastTrack:</span>
                    <span className="text-white">{propertyData.enableFastTrack ? 'Enabled' : 'Disabled'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Accepted Convictions:</span>
                    <span className="text-white">{propertyData.acceptsConvictions.length} types</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <Button onClick={() => setStep(step - 1)} variant="outline" className="flex-1 border-white/20 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          {step < totalSteps ? (
            <Button onClick={() => setStep(step + 1)} className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={onComplete} className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
              Publish Listing
              <Check className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        <Button onClick={onCancel} variant="ghost" className="w-full mt-4 text-white/60">
          Cancel
        </Button>
      </div>
    </div>
  );
}
