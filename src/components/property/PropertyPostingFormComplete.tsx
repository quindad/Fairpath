import { useState } from 'react';
import { ArrowLeft, Home, DollarSign, Image, MapPin, FileText, Plus, X, CheckCircle, Building2, Bed, Bath, Maximize, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import LogoFinal from '../common/LogoFinal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface PropertyPostingFormCompleteProps {
  onBack: () => void;
  onComplete: (propertyData: any) => void;
  packageType?: 'basic' | 'premium' | 'partner';
}

export default function PropertyPostingFormComplete({ onBack, onComplete, packageType = 'basic' }: PropertyPostingFormCompleteProps) {
  const [step, setStep] = useState<'details' | 'amenities' | 'eligibility' | 'preview'>('details');
  const [formData, setFormData] = useState({
    address: '',
    unit: '',
    city: '',
    state: 'IL',
    zip: '',
    rent: '',
    deposit: '',
    beds: '1',
    baths: '1',
    sqft: '',
    availableDate: '',
    leaseLength: '12',
    propertyType: 'apartment',
    description: '',
    amenities: [] as string[],
    utilities: [] as string[],
    images: [] as string[],
    acceptsConvictions: [] as string[],
    maxTimeLimit: 'none',
    requiresIncome: '3x',
    petPolicy: 'case-by-case',
    fastTrackEnabled: packageType !== 'basic'
  });

  const allAmenities = [
    'Parking', 'Laundry In-Unit', 'Laundry On-Site', 'Dishwasher', 'Air Conditioning',
    'Heating', 'Hardwood Floors', 'Carpet', 'Balcony', 'Patio', 'Yard', 'Storage',
    'Gym', 'Pool', 'Elevator', 'Wheelchair Accessible', 'Pet Friendly'
  ];

  const allUtilities = [
    'Water Included', 'Gas Included', 'Electric Included', 'Internet Included',
    'Trash Included', 'Sewer Included'
  ];

  const convictionTypes = [
    'Non-Violent Felony', 'Violent Felony', 'Drug Offense', 'Property Crime',
    'White Collar Crime', 'DUI/DWI', 'Domestic Violence', 'Sex Offense'
  ];

  // Details Step
  const DetailsStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl mb-2 text-white">Property Details</h2>
        <p className="text-white/60">Enter the basic information about your property</p>
      </div>

      <Card className="bg-[#121212] border-white/10 p-6">
        <h3 className="text-xl mb-4 text-white">Location</h3>
        <div className="space-y-4">
          <div>
            <Label className="text-white mb-2 block">Street Address</Label>
            <Input
              type="text"
              placeholder="123 Main Street"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="bg-black/50 border-white/20 text-white"
              required
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white mb-2 block">Unit # (Optional)</Label>
              <Input
                type="text"
                placeholder="Apt 4B"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                className="bg-black/50 border-white/20 text-white"
              />
            </div>
            <div>
              <Label className="text-white mb-2 block">City</Label>
              <Input
                type="text"
                placeholder="Chicago"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="bg-black/50 border-white/20 text-white"
                required
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white mb-2 block">State</Label>
              <Input
                type="text"
                placeholder="IL"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="bg-black/50 border-white/20 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-white mb-2 block">ZIP Code</Label>
              <Input
                type="text"
                placeholder="60614"
                value={formData.zip}
                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                className="bg-black/50 border-white/20 text-white"
                required
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-[#121212] border-white/10 p-6">
        <h3 className="text-xl mb-4 text-white">Property Information</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label className="text-white mb-2 block">Property Type</Label>
            <Select value={formData.propertyType} onValueChange={(value) => setFormData({ ...formData, propertyType: value })}>
              <SelectTrigger className="bg-black/50 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#121212] border-white/20">
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-white mb-2 block">Square Footage</Label>
            <Input
              type="number"
              placeholder="800"
              value={formData.sqft}
              onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
              className="bg-black/50 border-white/20 text-white"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-white mb-2 block">Bedrooms</Label>
            <Select value={formData.beds} onValueChange={(value) => setFormData({ ...formData, beds: value })}>
              <SelectTrigger className="bg-black/50 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#121212] border-white/20">
                <SelectItem value="0">Studio</SelectItem>
                <SelectItem value="1">1 Bedroom</SelectItem>
                <SelectItem value="2">2 Bedrooms</SelectItem>
                <SelectItem value="3">3 Bedrooms</SelectItem>
                <SelectItem value="4">4+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-white mb-2 block">Bathrooms</Label>
            <Select value={formData.baths} onValueChange={(value) => setFormData({ ...formData, baths: value })}>
              <SelectTrigger className="bg-black/50 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#121212] border-white/20">
                <SelectItem value="1">1 Bathroom</SelectItem>
                <SelectItem value="1.5">1.5 Bathrooms</SelectItem>
                <SelectItem value="2">2 Bathrooms</SelectItem>
                <SelectItem value="2.5">2.5 Bathrooms</SelectItem>
                <SelectItem value="3">3+ Bathrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="bg-[#121212] border-white/10 p-6">
        <h3 className="text-xl mb-4 text-white">Pricing & Availability</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label className="text-white mb-2 block">Monthly Rent</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <Input
                type="number"
                placeholder="1200"
                value={formData.rent}
                onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                className="pl-10 bg-black/50 border-white/20 text-white"
                required
              />
            </div>
          </div>
          <div>
            <Label className="text-white mb-2 block">Security Deposit</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <Input
                type="number"
                placeholder="1200"
                value={formData.deposit}
                onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
                className="pl-10 bg-black/50 border-white/20 text-white"
                required
              />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-white mb-2 block">Available Date</Label>
            <Input
              type="date"
              value={formData.availableDate}
              onChange={(e) => setFormData({ ...formData, availableDate: e.target.value })}
              className="bg-black/50 border-white/20 text-white"
              required
            />
          </div>
          <div>
            <Label className="text-white mb-2 block">Lease Length</Label>
            <Select value={formData.leaseLength} onValueChange={(value) => setFormData({ ...formData, leaseLength: value })}>
              <SelectTrigger className="bg-black/50 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#121212] border-white/20">
                <SelectItem value="6">6 months</SelectItem>
                <SelectItem value="12">12 months</SelectItem>
                <SelectItem value="18">18 months</SelectItem>
                <SelectItem value="24">24 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="bg-[#121212] border-white/10 p-6">
        <h3 className="text-xl mb-4 text-white">Description</h3>
        <Textarea
          placeholder="Describe your property, neighborhood, and what makes it special..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="bg-black/50 border-white/20 text-white min-h-[120px]"
          required
        />
      </Card>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" className="border-white/20 text-white">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Cancel
        </Button>
        <Button 
          onClick={() => setStep('amenities')}
          className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  // Amenities Step
  const AmenitiesStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl mb-2 text-white">Amenities & Features</h2>
        <p className="text-white/60">Select all that apply to make your listing stand out</p>
      </div>

      <Card className="bg-[#121212] border-white/10 p-6">
        <h3 className="text-xl mb-4 text-white">Property Amenities</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {allAmenities.map((amenity) => (
            <label
              key={amenity}
              className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                formData.amenities.includes(amenity)
                  ? 'bg-[#A8F32C]/20 border-[#A8F32C]/50'
                  : 'bg-black/30 border-white/10 hover:border-white/30'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.amenities.includes(amenity)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData({ ...formData, amenities: [...formData.amenities, amenity] });
                  } else {
                    setFormData({ ...formData, amenities: formData.amenities.filter(a => a !== amenity) });
                  }
                }}
                className="w-4 h-4"
              />
              <span className="text-white text-sm">{amenity}</span>
            </label>
          ))}
        </div>
      </Card>

      <Card className="bg-[#121212] border-white/10 p-6">
        <h3 className="text-xl mb-4 text-white">Utilities Included</h3>
        <div className="grid md:grid-cols-3 gap-3">
          {allUtilities.map((utility) => (
            <label
              key={utility}
              className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                formData.utilities.includes(utility)
                  ? 'bg-[#A8F32C]/20 border-[#A8F32C]/50'
                  : 'bg-black/30 border-white/10 hover:border-white/30'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.utilities.includes(utility)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData({ ...formData, utilities: [...formData.utilities, utility] });
                  } else {
                    setFormData({ ...formData, utilities: formData.utilities.filter(u => u !== utility) });
                  }
                }}
                className="w-4 h-4"
              />
              <span className="text-white text-sm">{utility}</span>
            </label>
          ))}
        </div>
      </Card>

      <Card className="bg-[#121212] border-white/10 p-6">
        <h3 className="text-xl mb-4 text-white">Pet Policy</h3>
        <Select value={formData.petPolicy} onValueChange={(value) => setFormData({ ...formData, petPolicy: value })}>
          <SelectTrigger className="bg-black/50 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#121212] border-white/20">
            <SelectItem value="no">No Pets Allowed</SelectItem>
            <SelectItem value="cats">Cats Only</SelectItem>
            <SelectItem value="dogs">Dogs Only</SelectItem>
            <SelectItem value="all">All Pets Allowed</SelectItem>
            <SelectItem value="case-by-case">Case by Case</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      <div className="flex gap-3">
        <Button onClick={() => setStep('details')} variant="outline" className="border-white/20 text-white">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
        <Button 
          onClick={() => setStep('eligibility')}
          className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
        >
          Continue
        </Button>
      </div>
    </div>
  );

  // Eligibility Criteria Step
  const EligibilityStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl mb-2 text-white">Eligibility Criteria</h2>
        <p className="text-white/60">Set clear requirements for applicants</p>
      </div>

      <Card className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-6 w-6 text-[#A8F32C] flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl text-white mb-2">Second Chance Housing</h3>
            <p className="text-white/60 mb-4">
              By listing on FairPath, you're opening your property to justice-impacted individuals. 
              Your willingness to consider their applications is appreciated and helps our community.
            </p>
          </div>
        </div>
      </Card>

      <Card className="bg-[#121212] border-white/10 p-6">
        <h3 className="text-xl mb-4 text-white">Conviction Types Accepted</h3>
        <p className="text-sm text-white/60 mb-4">
          Select which types of convictions you're willing to consider. More flexibility = more applicants.
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          {convictionTypes.map((conviction) => (
            <label
              key={conviction}
              className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${
                formData.acceptsConvictions.includes(conviction)
                  ? 'bg-[#A8F32C]/20 border-[#A8F32C]/50'
                  : 'bg-black/30 border-white/10 hover:border-white/30'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.acceptsConvictions.includes(conviction)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData({ ...formData, acceptsConvictions: [...formData.acceptsConvictions, conviction] });
                  } else {
                    setFormData({ ...formData, acceptsConvictions: formData.acceptsConvictions.filter(c => c !== conviction) });
                  }
                }}
                className="w-4 h-4"
              />
              <span className="text-white text-sm">{conviction}</span>
            </label>
          ))}
        </div>
      </Card>

      <Card className="bg-[#121212] border-white/10 p-6">
        <h3 className="text-xl mb-4 text-white">Time Since Conviction</h3>
        <Select value={formData.maxTimeLimit} onValueChange={(value) => setFormData({ ...formData, maxTimeLimit: value })}>
          <SelectTrigger className="bg-black/50 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#121212] border-white/20">
            <SelectItem value="none">No Time Limit</SelectItem>
            <SelectItem value="1">1+ years since release</SelectItem>
            <SelectItem value="3">3+ years since release</SelectItem>
            <SelectItem value="5">5+ years since release</SelectItem>
            <SelectItem value="7">7+ years since release</SelectItem>
            <SelectItem value="10">10+ years since release</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      <Card className="bg-[#121212] border-white/10 p-6">
        <h3 className="text-xl mb-4 text-white">Income Requirement</h3>
        <Select value={formData.requiresIncome} onValueChange={(value) => setFormData({ ...formData, requiresIncome: value })}>
          <SelectTrigger className="bg-black/50 border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#121212] border-white/20">
            <SelectItem value="2x">2x Monthly Rent</SelectItem>
            <SelectItem value="2.5x">2.5x Monthly Rent</SelectItem>
            <SelectItem value="3x">3x Monthly Rent (Standard)</SelectItem>
            <SelectItem value="flexible">Flexible</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {packageType !== 'basic' && (
        <Card className="bg-gradient-to-r from-yellow-500/20 to-transparent border-yellow-500/30 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-xl text-white">FastTrack Enabled</h3>
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 mt-1">
                Included with {packageType === 'premium' ? 'Premium' : 'Partner'} Plan
              </Badge>
            </div>
          </div>
          <p className="text-white/60">
            Earn $75 for every FastTrack application. Applicants get priority review and you must 
            schedule a showing or provide a denial reason within 48 hours.
          </p>
        </Card>
      )}

      <div className="flex gap-3">
        <Button onClick={() => setStep('amenities')} variant="outline" className="border-white/20 text-white">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
        <Button 
          onClick={() => setStep('preview')}
          className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
        >
          Preview Listing
        </Button>
      </div>
    </div>
  );

  // Preview Step
  const PreviewStep = () => {
    const fullAddress = `${formData.address}${formData.unit ? `, ${formData.unit}` : ''}, ${formData.city}, ${formData.state} ${formData.zip}`;
    
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl mb-2 text-white">Review Your Listing</h2>
          <p className="text-white/60">Make sure everything looks good before publishing</p>
        </div>

        <Card className="bg-[#121212] border-white/10 p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h3 className="text-2xl text-white mb-2">{fullAddress}</h3>
              <div className="flex items-center gap-4 text-white/60 mb-4">
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  <span>{formData.beds} bed</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="h-4 w-4" />
                  <span>{formData.baths} bath</span>
                </div>
                {formData.sqft && (
                  <div className="flex items-center gap-1">
                    <Maximize className="h-4 w-4" />
                    <span>{formData.sqft} sqft</span>
                  </div>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl text-[#A8F32C] mb-1">${formData.rent}/mo</div>
              <div className="text-sm text-white/60">Deposit: ${formData.deposit}</div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-white mb-2">Description</h4>
            <p className="text-white/60">{formData.description}</p>
          </div>

          {formData.amenities.length > 0 && (
            <div className="mb-6">
              <h4 className="text-white mb-2">Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {formData.amenities.map((amenity) => (
                  <Badge key={amenity} className="bg-white/10 text-white border-white/20">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {formData.utilities.length > 0 && (
            <div className="mb-6">
              <h4 className="text-white mb-2">Utilities Included</h4>
              <div className="flex flex-wrap gap-2">
                {formData.utilities.map((utility) => (
                  <Badge key={utility} className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                    {utility}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
            <div>
              <div className="text-sm text-white/60 mb-1">Available</div>
              <div className="text-white">{new Date(formData.availableDate).toLocaleDateString()}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Lease Length</div>
              <div className="text-white">{formData.leaseLength} months</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Pet Policy</div>
              <div className="text-white capitalize">{formData.petPolicy.replace('-', ' ')}</div>
            </div>
            <div>
              <div className="text-sm text-white/60 mb-1">Income Requirement</div>
              <div className="text-white">{formData.requiresIncome} monthly rent</div>
            </div>
          </div>
        </Card>

        <Card className="bg-[#121212] border-white/10 p-6">
          <h4 className="text-xl text-white mb-4">Eligibility Criteria</h4>
          {formData.acceptsConvictions.length > 0 ? (
            <div className="mb-4">
              <div className="text-sm text-white/60 mb-2">Accepted Conviction Types:</div>
              <div className="flex flex-wrap gap-2">
                {formData.acceptsConvictions.map((conviction) => (
                  <Badge key={conviction} className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    {conviction}
                  </Badge>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-white/60 mb-4">No specific conviction restrictions selected</p>
          )}
          <div className="text-sm text-white/60">
            Time requirement: {formData.maxTimeLimit === 'none' ? 'No time limit' : `${formData.maxTimeLimit}+ years since release`}
          </div>
        </Card>

        <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="h-6 w-6 text-[#A8F32C]" />
            <div className="text-xl text-white">Ready to Publish</div>
          </div>
          <p className="text-white/60 mb-4">
            Your listing will be visible to eligible applicants immediately after publishing.
            {formData.fastTrackEnabled && ' FastTrack applications will earn you $75 each.'}
          </p>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => setStep('eligibility')} variant="outline" className="border-white/20 text-white">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Edit
          </Button>
          <Button 
            onClick={() => onComplete(formData)}
            className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
          >
            <CheckCircle className="mr-2 h-5 w-5" />
            Publish Listing
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <LogoFinal size="md" />
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="border-b border-white/10 bg-black">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {[
              { key: 'details', label: 'Details' },
              { key: 'amenities', label: 'Amenities' },
              { key: 'eligibility', label: 'Eligibility' },
              { key: 'preview', label: 'Preview' }
            ].map((s, index) => (
              <div
                key={s.key}
                className={`flex items-center ${index < 3 ? 'flex-1' : ''}`}
              >
                <div
                  className={`flex items-center gap-2 ${
                    step === s.key ? 'text-[#A8F32C]' : 'text-white/40'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step === s.key
                        ? 'bg-[#A8F32C] text-black'
                        : 'bg-white/10'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="hidden md:inline">{s.label}</span>
                </div>
                {index < 3 && (
                  <div className="flex-1 h-[2px] bg-white/10 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {step === 'details' && <DetailsStep />}
        {step === 'amenities' && <AmenitiesStep />}
        {step === 'eligibility' && <EligibilityStep />}
        {step === 'preview' && <PreviewStep />}
      </div>
    </div>
  );
}
