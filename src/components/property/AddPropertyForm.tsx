import { useState } from 'react';
import { Home, DollarSign, MapPin, Upload, X, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Badge } from '../ui/badge';

interface PropertyFormData {
  address: string;
  city: string;
  state: string;
  zip: string;
  bedrooms: number;
  bathrooms: number;
  rent: number;
  deposit: number;
  description: string;
  petFriendly: boolean;
  utilities: string;
  images: string[];
  
  // FastTrack Package Options
  enableFastTrack: boolean;
  guaranteedShowing: boolean;
  priorityListing: boolean;
  featuredPlacement: boolean;
  videoTour: boolean;
  backgroundCheckIncluded: boolean;
  
  // Conviction Restrictions
  acceptedCategories: string[];
  excludedCategories: string[];
  minYearsSinceRelease: number;
}

interface AddPropertyFormProps {
  onSubmit: (data: PropertyFormData) => void;
  onCancel: () => void;
  isFreePlan?: boolean;
}

const CONVICTION_CATEGORIES = [
  'Drug Offenses',
  'Property Crimes',
  'DUI/Traffic',
  'White Collar/Financial',
  'Weapons Crimes',
  'Public Order Crimes',
  'Violent Offenses',
  'Sex Offenses'
];

export default function AddPropertyForm({ onSubmit, onCancel, isFreePlan = false }: AddPropertyFormProps) {
  const [formData, setFormData] = useState<PropertyFormData>({
    address: '',
    city: '',
    state: '',
    zip: '',
    bedrooms: 1,
    bathrooms: 1,
    rent: 0,
    deposit: 0,
    description: '',
    petFriendly: false,
    utilities: '',
    images: [],
    enableFastTrack: true, // Default ON
    guaranteedShowing: true,
    priorityListing: false,
    featuredPlacement: false,
    videoTour: false,
    backgroundCheckIncluded: true,
    acceptedCategories: [],
    excludedCategories: ['Violent Offenses', 'Sex Offenses'], // Default exclusions
    minYearsSinceRelease: 2
  });

  const [currentStep, setCurrentStep] = useState<'basic' | 'package' | 'restrictions'>('basic');

  const updateField = (field: keyof PropertyFormData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleCategory = (category: string, type: 'accepted' | 'excluded') => {
    if (type === 'accepted') {
      if (formData.acceptedCategories.includes(category)) {
        updateField('acceptedCategories', formData.acceptedCategories.filter(c => c !== category));
      } else {
        updateField('acceptedCategories', [...formData.acceptedCategories, category]);
      }
    } else {
      if (formData.excludedCategories.includes(category)) {
        updateField('excludedCategories', formData.excludedCategories.filter(c => c !== category));
      } else {
        updateField('excludedCategories', [...formData.excludedCategories, category]);
      }
    }
  };

  // Calculate FastTrack Package Cost
  const calculatePackageCost = () => {
    if (!formData.enableFastTrack) return 0;
    
    let baseCost = isFreePlan ? 24.99 : 14.99; // Free plan pays more for FastTrack
    
    if (formData.priorityListing) baseCost += 5;
    if (formData.featuredPlacement) baseCost += 10;
    if (formData.videoTour) baseCost += 15;
    
    return baseCost;
  };

  // Calculate Revenue Per Application
  const calculateRevenuePerApp = () => {
    // Standard user pays $75, FairPath+ pays $65
    // Landlord gets 60% (min $30)
    const avgAppFee = 70; // Average between $75 and $65
    const singleKeyFee = 18; // Cost to FAF
    const netRevenue = avgAppFee - singleKeyFee; // $52
    const landlordShare = netRevenue * 0.6; // 60% = ~$31
    
    return Math.max(30, Math.round(landlordShare)); // Minimum $30
  };

  const packageCost = calculatePackageCost();
  const revenuePerApp = calculateRevenuePerApp();

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-3">List Your Property</h1>
          <p className="text-white/60">
            Set up your listing and configure your FastTrack package to start receiving applications.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setCurrentStep('basic')}
            className={`flex-1 p-4 rounded-lg border ${
              currentStep === 'basic'
                ? 'border-[#A8F32C] bg-[#A8F32C]/10 text-[#A8F32C]'
                : 'border-white/10 bg-[#121212] text-white/60'
            }`}
          >
            <div className="text-sm">Step 1</div>
            <div>Property Details</div>
          </button>
          <button
            onClick={() => setCurrentStep('package')}
            className={`flex-1 p-4 rounded-lg border ${
              currentStep === 'package'
                ? 'border-[#A8F32C] bg-[#A8F32C]/10 text-[#A8F32C]'
                : 'border-white/10 bg-[#121212] text-white/60'
            }`}
          >
            <div className="text-sm">Step 2</div>
            <div>FastTrack Package</div>
          </button>
          <button
            onClick={() => setCurrentStep('restrictions')}
            className={`flex-1 p-4 rounded-lg border ${
              currentStep === 'restrictions'
                ? 'border-[#A8F32C] bg-[#A8F32C]/10 text-[#A8F32C]'
                : 'border-white/10 bg-[#121212] text-white/60'
            }`}
          >
            <div className="text-sm">Step 3</div>
            <div>Eligibility Rules</div>
          </button>
        </div>

        {/* STEP 1: Basic Info */}
        {currentStep === 'basic' && (
          <div className="space-y-6">
            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4">Property Information</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address" className="text-white">Street Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    placeholder="123 Main Street"
                    className="bg-black border-white/20 text-white mt-2"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-white">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      placeholder="City"
                      className="bg-black border-white/20 text-white mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-white">State</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => updateField('state', e.target.value)}
                      placeholder="ST"
                      className="bg-black border-white/20 text-white mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip" className="text-white">ZIP</Label>
                    <Input
                      id="zip"
                      value={formData.zip}
                      onChange={(e) => updateField('zip', e.target.value)}
                      placeholder="12345"
                      className="bg-black border-white/20 text-white mt-2"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bedrooms" className="text-white">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => updateField('bedrooms', parseInt(e.target.value))}
                      className="bg-black border-white/20 text-white mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms" className="text-white">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      step="0.5"
                      value={formData.bathrooms}
                      onChange={(e) => updateField('bathrooms', parseFloat(e.target.value))}
                      className="bg-black border-white/20 text-white mt-2"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rent" className="text-white">Monthly Rent</Label>
                    <Input
                      id="rent"
                      type="number"
                      value={formData.rent}
                      onChange={(e) => updateField('rent', parseInt(e.target.value))}
                      placeholder="1200"
                      className="bg-black border-white/20 text-white mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deposit" className="text-white">Security Deposit</Label>
                    <Input
                      id="deposit"
                      type="number"
                      value={formData.deposit}
                      onChange={(e) => updateField('deposit', parseInt(e.target.value))}
                      placeholder="1200"
                      className="bg-black border-white/20 text-white mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-white">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="Describe your property..."
                    rows={4}
                    className="bg-black border-white/20 text-white mt-2"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="petFriendly"
                    checked={formData.petFriendly}
                    onCheckedChange={(checked) => updateField('petFriendly', checked)}
                  />
                  <Label htmlFor="petFriendly" className="text-white cursor-pointer">
                    Pet Friendly
                  </Label>
                </div>
              </div>
            </Card>

            <Button
              onClick={() => setCurrentStep('package')}
              className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
            >
              Continue to Package Builder
            </Button>
          </div>
        )}

        {/* STEP 2: FastTrack Package Builder */}
        {currentStep === 'package' && (
          <div className="space-y-6">
            {/* Enable FastTrack Toggle */}
            <Card className="bg-gradient-to-br from-[#A8F32C]/20 via-[#121212] to-[#121212] border-[#A8F32C] p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl mb-2">Enable FastTrack Applications</h3>
                  <p className="text-white/60 text-sm mb-3">
                    FastTrack brings you <span className="text-[#A8F32C]">qualified, pre-screened applicants</span> with 
                    guaranteed showings. You earn <span className="text-[#A8F32C]">${revenuePerApp} per application</span> through 
                    our Rev-Share Program.
                  </p>
                  {isFreePlan && (
                    <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                      Free Plan: Higher listing fee, same revenue share
                    </Badge>
                  )}
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => updateField('enableFastTrack', !formData.enableFastTrack)}
                    className={`w-16 h-8 rounded-full transition-colors ${
                      formData.enableFastTrack ? 'bg-[#A8F32C]' : 'bg-white/20'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 bg-white rounded-full transition-transform ${
                        formData.enableFastTrack ? 'translate-x-9' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {formData.enableFastTrack && (
                <div className="bg-[#A8F32C]/10 rounded-lg p-4 border border-[#A8F32C]/30">
                  <h4 className="text-sm mb-2 text-white">Revenue Breakdown (per application):</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Avg. application fee:</span>
                      <span className="text-white">$70</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">SingleKey screening (our cost):</span>
                      <span className="text-white">-$18</span>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-1">
                      <span className="text-white/60">Revenue to split:</span>
                      <span className="text-white">$52</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A8F32C]">Your 60% share:</span>
                      <span className="text-[#A8F32C]">${revenuePerApp}</span>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {formData.enableFastTrack && (
              <>
                {/* Package Options */}
                <Card className="bg-[#121212] border-white/10 p-6">
                  <h3 className="text-xl mb-4">Build Your À La Carte Package</h3>
                  <p className="text-sm text-white/60 mb-6">
                    Select add-ons to boost visibility. Pricing updates automatically.
                  </p>

                  <div className="space-y-4">
                    {/* Guaranteed Showing (Required) */}
                    <div className="flex items-start justify-between p-4 bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
                        <div>
                          <div className="text-white">Guaranteed Showing</div>
                          <div className="text-xs text-white/60">Required for FastTrack</div>
                        </div>
                      </div>
                      <Badge className="bg-[#A8F32C] text-black border-0">Included</Badge>
                    </div>

                    {/* Background Check (Required) */}
                    <div className="flex items-start justify-between p-4 bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
                        <div>
                          <div className="text-white">SingleKey Background Check</div>
                          <div className="text-xs text-white/60">Included in FastTrack</div>
                        </div>
                      </div>
                      <Badge className="bg-[#A8F32C] text-black border-0">Included</Badge>
                    </div>

                    {/* Priority Listing */}
                    <div className="flex items-start justify-between p-4 bg-black border border-white/10 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Checkbox
                            id="priority"
                            checked={formData.priorityListing}
                            onCheckedChange={(checked) => updateField('priorityListing', checked)}
                          />
                          <Label htmlFor="priority" className="text-white cursor-pointer">
                            Priority Listing Placement
                          </Label>
                        </div>
                        <div className="text-xs text-white/60 ml-8">
                          Appear higher in search results
                        </div>
                      </div>
                      <div className="text-[#A8F32C] ml-4">+$5</div>
                    </div>

                    {/* Featured Placement */}
                    <div className="flex items-start justify-between p-4 bg-black border border-white/10 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Checkbox
                            id="featured"
                            checked={formData.featuredPlacement}
                            onCheckedChange={(checked) => updateField('featuredPlacement', checked)}
                          />
                          <Label htmlFor="featured" className="text-white cursor-pointer">
                            Featured Placement
                          </Label>
                        </div>
                        <div className="text-xs text-white/60 ml-8">
                          Top of search + highlighted badge
                        </div>
                      </div>
                      <div className="text-[#A8F32C] ml-4">+$10</div>
                    </div>

                    {/* Video Tour */}
                    <div className="flex items-start justify-between p-4 bg-black border border-white/10 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Checkbox
                            id="video"
                            checked={formData.videoTour}
                            onCheckedChange={(checked) => updateField('videoTour', checked)}
                          />
                          <Label htmlFor="video" className="text-white cursor-pointer">
                            Video Tour Support
                          </Label>
                        </div>
                        <div className="text-xs text-white/60 ml-8">
                          Upload video walkthroughs
                        </div>
                      </div>
                      <div className="text-[#A8F32C] ml-4">+$15</div>
                    </div>
                  </div>
                </Card>

                {/* Pricing Summary */}
                <Card className="bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent border-[#A8F32C]/30 p-6">
                  <h3 className="text-xl mb-4">Listing Cost Summary</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-white/60">
                      <span>Base FastTrack listing fee:</span>
                      <span>${isFreePlan ? '24.99' : '14.99'}</span>
                    </div>
                    {formData.priorityListing && (
                      <div className="flex justify-between text-white/60">
                        <span>Priority placement:</span>
                        <span>+$5.00</span>
                      </div>
                    )}
                    {formData.featuredPlacement && (
                      <div className="flex justify-between text-white/60">
                        <span>Featured placement:</span>
                        <span>+$10.00</span>
                      </div>
                    )}
                    {formData.videoTour && (
                      <div className="flex justify-between text-white/60">
                        <span>Video tour:</span>
                        <span>+$15.00</span>
                      </div>
                    )}
                    <div className="border-t border-white/10 pt-2 flex justify-between text-xl">
                      <span className="text-white">Total Listing Cost:</span>
                      <span className="text-[#A8F32C]">${packageCost.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="bg-black/50 rounded-lg p-4">
                    <div className="text-sm text-white/60 mb-2">Projected Revenue:</div>
                    <div className="text-2xl text-[#A8F32C]">${revenuePerApp} per application</div>
                    <div className="text-xs text-white/40 mt-1">
                      Break even after {Math.ceil(packageCost / revenuePerApp)} applications
                    </div>
                  </div>
                </Card>
              </>
            )}

            <div className="flex gap-3">
              <Button
                onClick={() => setCurrentStep('basic')}
                variant="outline"
                className="flex-1 border-white/20 text-white"
              >
                Back
              </Button>
              <Button
                onClick={() => setCurrentStep('restrictions')}
                className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
              >
                Continue to Eligibility
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Eligibility Restrictions */}
        {currentStep === 'restrictions' && (
          <div className="space-y-6">
            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4">Set Conviction Eligibility Rules</h3>
              <p className="text-white/60 text-sm mb-6">
                Choose which conviction categories you're comfortable accepting. Applicants will only see 
                your listing if they match your criteria.
              </p>

              <div className="mb-6">
                <Label className="text-white mb-3 block">Excluded Categories (Won't see your listing):</Label>
                <div className="grid md:grid-cols-2 gap-3">
                  {CONVICTION_CATEGORIES.map((category) => (
                    <div
                      key={category}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        formData.excludedCategories.includes(category)
                          ? 'bg-red-500/10 border-red-500/50'
                          : 'bg-black border-white/10 hover:border-white/30'
                      }`}
                      onClick={() => toggleCategory(category, 'excluded')}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={formData.excludedCategories.includes(category)}
                          onCheckedChange={() => toggleCategory(category, 'excluded')}
                        />
                        <span className="text-white text-sm">{category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="yearsRelease" className="text-white mb-2 block">
                  Minimum Years Since Release:
                </Label>
                <Input
                  id="yearsRelease"
                  type="number"
                  value={formData.minYearsSinceRelease}
                  onChange={(e) => updateField('minYearsSinceRelease', parseInt(e.target.value))}
                  className="bg-black border-white/20 text-white"
                />
                <p className="text-xs text-white/40 mt-2">
                  Applicants must have been released at least this many years ago
                </p>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button
                onClick={() => setCurrentStep('package')}
                variant="outline"
                className="flex-1 border-white/20 text-white"
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
              >
                List Property (${packageCost.toFixed(2)})
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
