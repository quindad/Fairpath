import { useState } from 'react';
import { Home, DollarSign, Check, ArrowLeft, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import Logo from '../common/Logo';
import { Checkbox } from '../ui/checkbox';

interface AddPropertyFormWorkingProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function AddPropertyFormWorking({ onSubmit, onCancel }: AddPropertyFormWorkingProps) {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    bedrooms: '',
    bathrooms: '',
    rent: '',
    deposit: '',
    description: '',
    // Package options
    package: 'basic', // 'basic' or 'featured'
    enableFastTrack: true, // Always allow FastTrack
    acceptedConvictionTypes: [] as string[],
    minYearsSinceRelease: ''
  });

  const [showPackageBuilder, setShowPackageBuilder] = useState(false);

  const updateField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleConvictionType = (type: string) => {
    const current = formData.acceptedConvictionTypes;
    if (current.includes(type)) {
      updateField('acceptedConvictionTypes', current.filter(t => t !== type));
    } else {
      updateField('acceptedConvictionTypes', [...current, type]);
    }
  };

  // Calculate pricing based on selections
  const calculatePackagePrice = () => {
    if (formData.package === 'featured') {
      return 24.99;
    }
    return 14.99; // basic
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      packagePrice: calculatePackagePrice(),
      fastTrackEnabled: formData.enableFastTrack
    });
  };

  const packagePrice = calculatePackagePrice();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" showTagline={false} />
            <Button
              onClick={onCancel}
              variant="ghost"
              className="text-white/60 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl mb-2">List a New Property</h1>
          <p className="text-white/60">
            Add your property details and choose your listing package. FastTrack applications 
            earn you $30 per completed application.
          </p>
        </div>

        {/* Property Details */}
        <Card className="bg-[#121212] border-white/10 p-6 mb-6">
          <h2 className="text-xl mb-4">Property Information</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="address" className="text-white mb-2 block">
                Street Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="address"
                required
                placeholder="123 Main St"
                value={formData.address}
                onChange={(e) => updateField('address', e.target.value)}
                className="bg-black border-white/20 text-white"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city" className="text-white mb-2 block">
                  City <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="city"
                  required
                  placeholder="Springfield"
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  className="bg-black border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="state" className="text-white mb-2 block">
                  State <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="state"
                  required
                  placeholder="IL"
                  value={formData.state}
                  onChange={(e) => updateField('state', e.target.value)}
                  className="bg-black border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="zipCode" className="text-white mb-2 block">
                  ZIP Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="zipCode"
                  required
                  placeholder="62701"
                  value={formData.zipCode}
                  onChange={(e) => updateField('zipCode', e.target.value)}
                  className="bg-black border-white/20 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bedrooms" className="text-white mb-2 block">
                  Bedrooms <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="bedrooms"
                  type="number"
                  required
                  placeholder="3"
                  value={formData.bedrooms}
                  onChange={(e) => updateField('bedrooms', e.target.value)}
                  className="bg-black border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="bathrooms" className="text-white mb-2 block">
                  Bathrooms <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="bathrooms"
                  type="number"
                  step="0.5"
                  required
                  placeholder="2"
                  value={formData.bathrooms}
                  onChange={(e) => updateField('bathrooms', e.target.value)}
                  className="bg-black border-white/20 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rent" className="text-white mb-2 block">
                  Monthly Rent <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="rent"
                  type="number"
                  required
                  placeholder="1250"
                  value={formData.rent}
                  onChange={(e) => updateField('rent', e.target.value)}
                  className="bg-black border-white/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="deposit" className="text-white mb-2 block">
                  Security Deposit <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="deposit"
                  type="number"
                  required
                  placeholder="1250"
                  value={formData.deposit}
                  onChange={(e) => updateField('deposit', e.target.value)}
                  className="bg-black border-white/20 text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-white mb-2 block">
                Property Description
              </Label>
              <textarea
                id="description"
                rows={4}
                placeholder="Beautiful 3-bedroom home with updated kitchen..."
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                className="w-full bg-black border border-white/20 rounded-lg px-3 py-2 text-white"
              />
            </div>
          </div>
        </Card>

        {/* Package Builder */}
        <Card className="bg-gradient-to-br from-[#A8F32C]/20 via-[#121212] to-[#121212] border-[#A8F32C] p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl">Build Your Package</h2>
            <Badge className="bg-[#A8F32C] text-black border-0">
              ${packagePrice}/month
            </Badge>
          </div>

          <p className="text-sm text-white/60 mb-6">
            Choose your listing tier and configure who can apply via FastTrack.
          </p>

          {/* Package Selection */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={() => updateField('package', 'basic')}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                formData.package === 'basic'
                  ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                  : 'border-white/20 bg-black/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg text-white">Basic Listing</h3>
                {formData.package === 'basic' && (
                  <Check className="h-5 w-5 text-[#A8F32C]" />
                )}
              </div>
              <div className="text-2xl text-white mb-2">$14.99/mo</div>
              <ul className="space-y-1 text-sm text-white/60">
                <li>✓ Standard visibility</li>
                <li>✓ FastTrack applications enabled</li>
                <li>✓ Application management</li>
              </ul>
            </button>

            <button
              type="button"
              onClick={() => updateField('package', 'featured')}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                formData.package === 'featured'
                  ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                  : 'border-white/20 bg-black/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg text-white">Featured Listing</h3>
                {formData.package === 'featured' && (
                  <Check className="h-5 w-5 text-[#A8F32C]" />
                )}
              </div>
              <div className="text-2xl text-white mb-2">$24.99/mo</div>
              <ul className="space-y-1 text-sm text-white/60">
                <li>✓ Priority placement</li>
                <li>✓ Featured badge</li>
                <li>✓ FastTrack applications enabled</li>
                <li>✓ Advanced analytics</li>
              </ul>
            </button>
          </div>

          {/* FastTrack Revenue Info */}
          <div className="bg-black/50 rounded-lg p-4 border border-[#A8F32C]/30">
            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white mb-2">FastTrack Revenue Model</h4>
                <p className="text-sm text-white/60 mb-3">
                  Earn <span className="text-[#A8F32C]">$30 per completed FastTrack application</span>. 
                  Applicants pay $75 ($65 for FairPath+ users), we handle the screening, you keep $30.
                </p>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="bg-[#A8F32C]/10 rounded p-2">
                    <div className="text-white/60 mb-1">10 applications</div>
                    <div className="text-[#A8F32C]">$300 earned</div>
                  </div>
                  <div className="bg-[#A8F32C]/10 rounded p-2">
                    <div className="text-white/60 mb-1">20 applications</div>
                    <div className="text-[#A8F32C]">$600 earned</div>
                  </div>
                  <div className="bg-[#A8F32C]/10 rounded p-2">
                    <div className="text-white/60 mb-1">50 applications</div>
                    <div className="text-[#A8F32C]">$1,500 earned</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Conviction Preferences */}
        <Card className="bg-[#121212] border-white/10 p-6 mb-6">
          <h2 className="text-xl mb-4">Applicant Eligibility (Optional)</h2>
          <p className="text-sm text-white/60 mb-4">
            Choose which conviction types you're comfortable accepting. Leave blank to accept all types.
          </p>

          <div className="space-y-3 mb-4">
            {[
              'Drug Offenses',
              'Property Crimes',
              'Financial Crimes',
              'Public Order',
              'Traffic/DUI',
              'Violent Offenses',
              'Sex Offenses',
              'Weapons Crimes'
            ].map((type) => (
              <div key={type} className="flex items-center gap-3">
                <Checkbox
                  id={type}
                  checked={formData.acceptedConvictionTypes.includes(type)}
                  onCheckedChange={() => toggleConvictionType(type)}
                />
                <Label htmlFor={type} className="text-white cursor-pointer">
                  Accept: {type}
                </Label>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Label htmlFor="minYears" className="text-white mb-2 block">
              Minimum Years Since Release (Optional)
            </Label>
            <Input
              id="minYears"
              type="number"
              placeholder="e.g., 2"
              value={formData.minYearsSinceRelease}
              onChange={(e) => updateField('minYearsSinceRelease', e.target.value)}
              className="bg-black border-white/20 text-white"
            />
            <p className="text-xs text-white/40 mt-2">
              Leave blank to accept applicants regardless of time since release
            </p>
          </div>
        </Card>

        {/* Submit */}
        <div className="flex gap-3">
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="flex-1 border-white/20 text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
          >
            List Property - ${packagePrice}/mo
          </Button>
        </div>

        <p className="text-center text-xs text-white/40 mt-4">
          You can edit your listing and package options anytime from your dashboard
        </p>
      </form>
    </div>
  );
}
