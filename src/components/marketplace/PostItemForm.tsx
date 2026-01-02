import { useState } from 'react';
import { Package, MapPin, Upload, Check, ArrowRight, ArrowLeft, X, FileText, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { Switch } from '../ui/switch';
import LogoFinal from '../common/LogoFinal';
import SafePickupLocations from './SafePickupLocations';
import LocationAutocomplete from '../common/LocationAutocomplete';
import api from '../../utils/api';
import { useUser } from '../../contexts/UserContext';

interface PostItemFormProps {
  onBack?: () => void;
  onComplete?: () => void;
  onCancel?: () => void;
}

export default function PostItemForm({ onBack, onComplete, onCancel }: PostItemFormProps) {
  const { currentUser } = useUser();
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [submitting, setSubmitting] = useState(false);

  // Handle completion
  const handleComplete = async () => {
    setSubmitting(true);
    try {
      // Save item to database
      const response = await api.marketplace.createItem({
        ...itemData,
        donorId: currentUser?.id,
        donorName: currentUser?.name || `${currentUser?.firstName} ${currentUser?.lastName}`,
        donorEmail: currentUser?.email,
        status: 'active'
      });

      console.log('✅ Item posted to database:', response.data);
      
      // Generate tax receipt data for later
      if (itemData.isTaxDeductible && itemData.fairMarketValue) {
        console.log('📄 Item marked as tax-deductible. Receipt will be generated upon claim approval.');
      }

      alert('🎉 Item posted successfully! Your listing is now live.');
      
      if (onComplete) {
        onComplete();
      } else if (onBack) {
        onBack();
      }
    } catch (error) {
      console.error('❌ Failed to post item:', error);
      alert('Failed to post item. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else if (onBack) {
      onBack();
    }
  };

  const [itemData, setItemData] = useState({
    title: '',
    category: '',
    condition: 'good',
    description: '',
    quantity: '1',
    pickupLocation: '',
    pickupInstructions: '',
    availableDates: '',
    contactMethod: 'app',
    contactPhone: '',
    images: [] as string[],
    isTaxDeductible: true, // NEW - default to true
    donorName: '',
    donorAddress: '',
    fairMarketValue: '' // NEW - for tax deduction
  });

  const categories = [
    { id: 'furniture', label: 'Furniture', emoji: '🛋️' },
    { id: 'clothing', label: 'Clothing', emoji: '👔' },
    { id: 'household', label: 'Household Items', emoji: '🏠' },
    { id: 'electronics', label: 'Electronics', emoji: '💻' },
    { id: 'appliances', label: 'Appliances', emoji: '🔌' },
    { id: 'baby', label: 'Baby/Kids', emoji: '👶' },
    { id: 'tools', label: 'Tools', emoji: '🔧' },
    { id: 'other', label: 'Other', emoji: '📦' }
  ];

  const progress = (step / totalSteps) * 100;

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

        {/* Step 1: Item Details */}
        {step === 1 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center">
                <Package className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-2xl text-white">What are you donating?</h2>
                <p className="text-white/60">Tell us about your item</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-white mb-2 block">
                  Item Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. Queen Mattress & Box Spring"
                  value={itemData.title}
                  onChange={(e) => setItemData({ ...itemData, title: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              </div>

              <div>
                <Label className="text-white mb-3 block">
                  Category <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setItemData({ ...itemData, category: cat.id })}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        itemData.category === cat.id
                          ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <div className="text-2xl mb-2">{cat.emoji}</div>
                      <div className="text-white">{cat.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-white mb-3 block">
                  Condition <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-4 gap-3">
                  {['new', 'excellent', 'good', 'fair'].map((cond) => (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => setItemData({ ...itemData, condition: cond })}
                      className={`p-3 border-2 rounded-lg transition-all ${
                        itemData.condition === cond
                          ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <div className="text-white capitalize">{cond}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-white mb-2 block">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the item's condition, dimensions, features, etc."
                  value={itemData.description}
                  onChange={(e) => setItemData({ ...itemData, description: e.target.value })}
                  className="bg-black border-white/20 text-white min-h-32"
                />
              </div>

              <div>
                <Label htmlFor="quantity" className="text-white mb-2 block">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  placeholder="1"
                  value={itemData.quantity}
                  onChange={(e) => setItemData({ ...itemData, quantity: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Pickup Details */}
        {step === 2 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl text-white">Pickup Information</h2>
                <p className="text-white/60">Where and when can they pick it up?</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="pickupLocation" className="text-white mb-2 block">
                  Pickup Location <span className="text-red-500">*</span>
                </Label>
                <LocationAutocomplete
                  id="pickupLocation"
                  placeholder="e.g. Lincoln Park, Chicago"
                  value={itemData.pickupLocation}
                  onChange={(value) => setItemData({ ...itemData, pickupLocation: value })}
                  className="bg-black border-white/20 text-white"
                />
                <p className="text-xs text-white/40 mt-2">
                  Don't share your exact address publicly. You'll share details after approving a claim.
                </p>
              </div>

              <div>
                <Label htmlFor="pickupInstructions" className="text-white mb-2 block">
                  Pickup Instructions
                </Label>
                <Textarea
                  id="pickupInstructions"
                  placeholder="e.g. Available for pickup on weekends. Please bring help for heavy items. Contactless pickup available."
                  value={itemData.pickupInstructions}
                  onChange={(e) => setItemData({ ...itemData, pickupInstructions: e.target.value })}
                  className="bg-black border-white/20 text-white min-h-24"
                />
              </div>

              <div>
                <Label htmlFor="availableDates" className="text-white mb-2 block">
                  Available Dates
                </Label>
                <Input
                  id="availableDates"
                  placeholder="e.g. Weekends, Dec 15-20, Flexible"
                  value={itemData.availableDates}
                  onChange={(e) => setItemData({ ...itemData, availableDates: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              </div>

              <div>
                <Label className="text-white mb-3 block">
                  Preferred Contact Method <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setItemData({ ...itemData, contactMethod: 'app' })}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      itemData.contactMethod === 'app'
                        ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="text-white">Through App Messages</div>
                    <div className="text-xs text-white/60 mt-1">Most secure</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setItemData({ ...itemData, contactMethod: 'phone' })}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      itemData.contactMethod === 'phone'
                        ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="text-white">Phone Number</div>
                    <div className="text-xs text-white/60 mt-1">Direct contact</div>
                  </button>
                </div>

                {itemData.contactMethod === 'phone' && (
                  <div>
                    <Label htmlFor="contactPhone" className="text-white mb-2 block">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="contactPhone"
                      placeholder="(312) 555-0123"
                      value={itemData.contactPhone}
                      onChange={(e) => setItemData({ ...itemData, contactPhone: e.target.value })}
                      className="bg-black border-white/20 text-white"
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: Photos & Review */}
        {step === 3 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Check className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl text-white">Photos & Review</h2>
                <p className="text-white/60">Add photos and publish your listing</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-white mb-3 block">Item Photos</Label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-[#A8F32C]/50 transition-all cursor-pointer">
                  <Upload className="h-12 w-12 text-white/40 mx-auto mb-3" />
                  <p className="text-white/60 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-white/40">PNG, JPG up to 5MB (max 5 photos)</p>
                </div>
                <p className="text-xs text-white/40 mt-2">
                  Photos help people understand what you're offering!
                </p>
              </div>

              {/* Preview */}
              <div className="bg-black/50 border border-white/10 rounded-lg p-6">
                <h3 className="text-lg mb-4 text-white">Listing Preview</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Title:</span>
                    <span className="text-white">{itemData.title || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Category:</span>
                    <span className="text-white capitalize">{itemData.category || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Condition:</span>
                    <span className="text-white capitalize">{itemData.condition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Quantity:</span>
                    <span className="text-white">{itemData.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Pickup Location:</span>
                    <span className="text-white">{itemData.pickupLocation || 'Not set'}</span>
                  </div>
                </div>
              </div>

              {/* TAX DEDUCTIBLE DONATION TOGGLE */}
              <Card className="bg-gradient-to-r from-green-500/20 to-transparent border-green-500/30 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Heart className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg text-white">Make This a Tax-Deductible Donation</h3>
                      <Switch
                        checked={itemData.isTaxDeductible}
                        onCheckedChange={(checked) => setItemData({ ...itemData, isTaxDeductible: checked })}
                      />
                    </div>
                    <p className="text-sm text-white/80 mb-3">
                      {itemData.isTaxDeductible 
                        ? "✅ You'll receive an official 501(c)(3) donation receipt for your taxes!"
                        : "This item will be listed as a free giveaway without tax benefits."}
                    </p>
                  </div>
                </div>

                {itemData.isTaxDeductible && (
                  <div className="bg-black/50 border border-white/10 rounded-lg p-4 space-y-4">
                    <div className="text-sm text-white/80 space-y-2">
                      <p><strong className="text-white">🎉 Tax Benefits:</strong></p>
                      <ul className="space-y-1 text-xs text-white/70 ml-4">
                        <li>• Claim fair market value on your tax return</li>
                        <li>• We'll email you an official IRS-compliant receipt</li>
                        <li>• Friend A Felon is a registered 501(c)(3) nonprofit</li>
                        <li>• Save receipts in your Tax Documents Center</li>
                      </ul>
                    </div>

                    <div>
                      <Label htmlFor="donorName" className="text-white mb-2 block">
                        Your Full Name (for receipt) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="donorName"
                        placeholder="John Smith"
                        value={itemData.donorName}
                        onChange={(e) => setItemData({ ...itemData, donorName: e.target.value })}
                        className="bg-black border-white/20 text-white"
                      />
                    </div>

                    <div>
                      <Label htmlFor="donorAddress" className="text-white mb-2 block">
                        Your Address (for receipt) <span className="text-red-500">*</span>
                      </Label>
                      <LocationAutocomplete
                        value={itemData.donorAddress}
                        onChange={(value) => setItemData({ ...itemData, donorAddress: value })}
                        placeholder="456 Oak Street, Chicago, IL 60614"
                      />
                      <p className="text-xs text-white/40 mt-1">
                        Required for IRS-compliant donation receipt. This won't be shared publicly.
                      </p>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                      <p className="text-xs text-white/80">
                        <strong className="text-white">📋 After someone claims:</strong> We'll automatically generate your tax receipt with our EIN (86-3010859), item description, and donation date. You determine fair market value.
                      </p>
                    </div>
                  </div>
                )}
              </Card>

              <div className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border border-[#A8F32C]/30 rounded-lg p-6">
                <h3 className="text-lg text-white mb-2">What Happens Next?</h3>
                <ul className="space-y-2 text-sm text-white/80">
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0" />
                    <span>Your item will be visible to justice-impacted individuals</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0" />
                    <span>You'll receive claims with personal stories</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0" />
                    <span>Choose who gets your item</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-5 w-5 text-[#A8F32C] flex-shrink-0" />
                    <span>Arrange pickup and help someone restart their life!</span>
                  </li>
                </ul>
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
            <Button onClick={handleComplete} className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
              Publish Listing
              <Check className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        <Button onClick={handleCancel} variant="ghost" className="w-full mt-4 text-white/60">
          Cancel
        </Button>
      </div>
    </div>
  );
}