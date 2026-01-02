import { ArrowLeft, MapPin, Zap, CheckCircle, AlertCircle, Shield, DollarSign, Home } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { UserProfile } from '../ProfileSetupWizard';
import { PropertyListing, isEligibleForProperty } from '../../lib/eligibility';

interface PropertyDetailProps {
  property: PropertyListing;
  userProfile: UserProfile | null;
  isSubscriber: boolean;
  onBack: () => void;
  onApply: (propertyId: string) => void;
}

export default function PropertyDetail({
  property,
  userProfile,
  isSubscriber,
  onBack,
  onApply,
}: PropertyDetailProps) {
  const isEligible = isEligibleForProperty(userProfile, property);
  const fastTrackFee = isSubscriber ? 65 : 75;
  const savings = isSubscriber ? 10 : 0;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-4 px-4 h-14">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex-1">
            <div className="text-xs text-[#A8F32C]">PROPERTY DETAIL</div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-64 bg-white/5">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        
        {/* Floating badges */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          {property.fastTrackEnabled && property.guaranteedShowing && (
            <Badge className="bg-[#A8F32C] text-black border-0">
              <Zap className="h-3 w-3 mr-1" />
              FastTrack + Guaranteed Showing
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Title & Price */}
        <div>
          <h1 className="text-3xl mb-2">{property.title}</h1>
          <div className="flex items-center gap-2 text-white/60 mb-4">
            <MapPin className="h-4 w-4" />
            <span>{property.address}, {property.city}, {property.state}</span>
          </div>
          
          <div className="flex items-end gap-6">
            <div>
              <div className="text-4xl text-[#A8F32C]">
                ${property.rent.toLocaleString()}
              </div>
              <div className="text-sm text-white/60">per month</div>
            </div>
            <div>
              <div className="text-xl">${property.deposit.toLocaleString()}</div>
              <div className="text-xs text-white/60">deposit</div>
            </div>
          </div>
        </div>

        {/* Eligibility Banner */}
        <div className={`rounded-xl p-4 border ${
          isEligible
            ? 'bg-[#A8F32C]/5 border-[#A8F32C]/20'
            : 'bg-yellow-500/5 border-yellow-500/20'
        }`}>
          <div className="flex items-start gap-3">
            {isEligible ? (
              <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className={`text-sm mb-1 ${isEligible ? 'text-[#A8F32C]' : 'text-yellow-500'}`}>
                {isEligible 
                  ? 'Based on what you told us, you are eligible for this listing.'
                  : 'This listing might not accept your record, but you can still apply.'
                }
              </p>
              <p className="text-xs text-white/60">
                {isEligible
                  ? 'The property owner has indicated they accept applicants with your record type and history.'
                  : 'The property has specific requirements that may not match your profile. The landlord will review your application individually.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="bg-[#121212] rounded-xl p-5 border border-white/5">
          <h3 className="text-lg mb-4">Property Details</h3>
          <div className="grid grid-cols-3 gap-4">
            <DetailItem label="Bedrooms" value={property.bedrooms.toString()} />
            <DetailItem label="Bathrooms" value={property.bathrooms.toString()} />
            <DetailItem label="Square Feet" value={property.sqft.toLocaleString()} />
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg mb-3">Description</h3>
          <p className="text-white/80 leading-relaxed">{property.description}</p>
        </div>

        {/* Amenities */}
        {property.amenities.length > 0 && (
          <div>
            <h3 className="text-lg mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {property.amenities.map((amenity, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="border-white/10 text-white/80"
                >
                  {amenity}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Requirements */}
        <div className="bg-[#121212] rounded-xl p-5 border border-white/5">
          <h3 className="text-lg mb-3">Requirements</h3>
          <div className="space-y-2 text-sm">
            {property.minimumIncome && (
              <div className="flex items-center gap-2 text-white/80">
                <DollarSign className="h-4 w-4 text-[#A8F32C]" />
                <span>Minimum monthly income: ${property.minimumIncome.toLocaleString()}</span>
              </div>
            )}
            {property.requirements.yearsRequired && (
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle className="h-4 w-4 text-[#A8F32C]" />
                <span>At least {property.requirements.yearsRequired} years since conviction</span>
              </div>
            )}
            {property.requirements.acceptsAllFelonies && (
              <div className="flex items-center gap-2 text-white/80">
                <CheckCircle className="h-4 w-4 text-[#A8F32C]" />
                <span>Open to all felony types</span>
              </div>
            )}
          </div>
        </div>

        {/* Landlord */}
        <div className="bg-[#121212] rounded-xl p-5 border border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-[#A8F32C]" />
            </div>
            <div>
              <h3 className="mb-1">{property.landlordName}</h3>
              {property.landlordCompany && (
                <p className="text-sm text-white/60">{property.landlordCompany}</p>
              )}
            </div>
          </div>
        </div>

        {/* FastTrack Application Section */}
        {property.fastTrackEnabled && (
          <div className="bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent rounded-2xl p-1">
            <div className="bg-[#121212] rounded-2xl p-6 border border-[#A8F32C]/20">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="h-5 w-5 text-[#A8F32C]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-1">Apply with FastTrack</h3>
                  <p className="text-sm text-white/60">
                    One unified application with full screening and guaranteed showing
                  </p>
                </div>
              </div>

              <div className="bg-black/50 rounded-xl p-4 mb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Application fee:</span>
                  {savings > 0 ? (
                    <div className="text-right">
                      <div className="text-sm line-through text-white/40">$75</div>
                      <div className="text-lg text-[#A8F32C]">${fastTrackFee}</div>
                    </div>
                  ) : (
                    <div className="text-lg">${fastTrackFee}</div>
                  )}
                </div>
                {savings > 0 && (
                  <div className="text-xs text-[#A8F32C] text-right">
                    Saving ${savings} with FairPath+
                  </div>
                )}
              </div>

              <div className="space-y-2 mb-5 text-sm text-white/60">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>Full tenant screening via SingleKey (credit, eviction, criminal)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>Screening report sent to landlord and to you</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>Guaranteed in-person or virtual showing</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>No auto-deny based on record alone</span>
                </div>
              </div>

              <Button
                onClick={() => onApply(property.id)}
                className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-14 text-base"
              >
                <Zap className="mr-2 h-5 w-5" />
                Apply with FastTrack - ${fastTrackFee}
              </Button>

              {!isSubscriber && (
                <p className="text-xs text-center text-white/60 mt-3">
                  💡 Join FairPath+ for $2/month and save $10 on every application
                </p>
              )}
            </div>
          </div>
        )}

        {!property.fastTrackEnabled && (
          <div className="bg-[#121212] rounded-xl p-5 border border-white/5 text-center">
            <Home className="h-12 w-12 text-white/20 mx-auto mb-3" />
            <p className="text-sm text-white/60 mb-4">
              This property requires a separate application process. Contact the landlord directly.
            </p>
            <Button variant="outline" className="border-white/20">
              Contact Landlord
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-white/60 mb-1">{label}</div>
      <div className="text-lg">{value}</div>
    </div>
  );
}