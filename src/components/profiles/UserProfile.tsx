import { useState, useEffect } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Award, Edit, Save, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import LogoFinal from '../common/LogoFinal';
import { useUser } from '../../contexts/UserContext';
import FelonProfileComplete from '../user/FelonProfileComplete';
import api from '../../utils/api';

interface UserProfileProps {
  onBack: () => void;
}

export default function UserProfile({ onBack }: UserProfileProps) {
  const { currentUser, setCurrentUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editData, setEditData] = useState(currentUser || {});

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60">No user logged in</p>
          <Button onClick={onBack} className="mt-4 bg-[#A8F32C] text-black">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // If user is justice-impacted (felon), use the comprehensive profile
  if (currentUser.userType === 'user') {
    return <FelonProfileComplete onBack={onBack} userData={currentUser} />;
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.user.saveUser(currentUser.id, editData);
      setCurrentUser(editData);
      setIsEditing(false);
      alert('✅ Profile updated successfully!');
    } catch (error) {
      console.error('Failed to save profile:', error);
      alert('❌ Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditData(currentUser);
    setIsEditing(false);
  };

  // User type labels
  const userTypeLabels: Record<string, string> = {
    user: 'Justice-Impacted Individual',
    donor: 'Community Donor',
    employer: 'Employer Partner',
    property: 'Property Owner',
    resource: 'Resource Partner'
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button onClick={onBack} variant="ghost" size="icon" className="text-white/60">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <LogoFinal size="md" />
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="outline" className="border-white/20 text-white">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleCancel} variant="ghost" className="text-white/60">
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90" disabled={saving}>
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? 'Saving...' : 'Save'}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <Card className="bg-[#121212] border-white/10 p-8 mb-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#A8F32C] to-green-600 flex items-center justify-center flex-shrink-0">
              <span className="text-4xl text-black font-bold">
                {(currentUser.firstName?.[0] || currentUser.name?.[0] || 'U').toUpperCase()}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl text-white mb-2">
                {currentUser.name || `${currentUser.firstName} ${currentUser.lastName}`}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                  {userTypeLabels[currentUser.userType] || currentUser.userType}
                </Badge>
                {currentUser.fairPathScore !== undefined && (
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    <Award className="mr-1 h-3 w-3" />
                    Score: {currentUser.fairPathScore}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Calendar className="h-4 w-4" />
                <span>Member since {new Date(currentUser.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="bg-[#121212] border-white/10 p-8 mb-6">
          <h2 className="text-xl text-white mb-6">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-white/60 mb-2 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              {isEditing ? (
                <Input
                  value={editData.email || ''}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              ) : (
                <p className="text-white">{currentUser.email || 'Not provided'}</p>
              )}
            </div>

            <div>
              <Label className="text-white/60 mb-2 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone
              </Label>
              {isEditing ? (
                <Input
                  value={editData.phone || ''}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              ) : (
                <p className="text-white">{currentUser.phone || 'Not provided'}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Location Information */}
        {(currentUser.address || currentUser.city || currentUser.state) && (
          <Card className="bg-[#121212] border-white/10 p-8 mb-6">
            <h2 className="text-xl text-white mb-6 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location
            </h2>
            <div className="space-y-4">
              {currentUser.address && (
                <div>
                  <Label className="text-white/60 mb-2">Address</Label>
                  {isEditing ? (
                    <Input
                      value={editData.address || ''}
                      onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                      className="bg-black border-white/20 text-white"
                    />
                  ) : (
                    <p className="text-white">{currentUser.address}</p>
                  )}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentUser.city && (
                  <div>
                    <Label className="text-white/60 mb-2">City</Label>
                    {isEditing ? (
                      <Input
                        value={editData.city || ''}
                        onChange={(e) => setEditData({ ...editData, city: e.target.value })}
                        className="bg-black border-white/20 text-white"
                      />
                    ) : (
                      <p className="text-white">{currentUser.city}</p>
                    )}
                  </div>
                )}
                {currentUser.state && (
                  <div>
                    <Label className="text-white/60 mb-2">State</Label>
                    {isEditing ? (
                      <Input
                        value={editData.state || ''}
                        onChange={(e) => setEditData({ ...editData, state: e.target.value })}
                        className="bg-black border-white/20 text-white"
                      />
                    ) : (
                      <p className="text-white">{currentUser.state}</p>
                    )}
                  </div>
                )}
                {currentUser.zipCode && (
                  <div>
                    <Label className="text-white/60 mb-2">ZIP Code</Label>
                    {isEditing ? (
                      <Input
                        value={editData.zipCode || ''}
                        onChange={(e) => setEditData({ ...editData, zipCode: e.target.value })}
                        className="bg-black border-white/20 text-white"
                      />
                    ) : (
                      <p className="text-white">{currentUser.zipCode}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        {/* Justice-Impacted User Specific Info */}
        {currentUser.userType === 'user' && (
          <Card className="bg-[#121212] border-white/10 p-8 mb-6">
            <h2 className="text-xl text-white mb-6">Background Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentUser.convictionCategory && (
                <div>
                  <Label className="text-white/60 mb-2">Conviction Type</Label>
                  <p className="text-white capitalize">{currentUser.convictionCategory}</p>
                </div>
              )}
              {currentUser.releaseDate && (
                <div>
                  <Label className="text-white/60 mb-2">Release Date</Label>
                  <p className="text-white">{new Date(currentUser.releaseDate).toLocaleDateString()}</p>
                </div>
              )}
              {currentUser.lookingForJob && (
                <div>
                  <Label className="text-white/60 mb-2">Job Search</Label>
                  <p className="text-white">{currentUser.lookingForJob === 'yes' ? 'Actively looking' : 'Not currently'}</p>
                </div>
              )}
              {currentUser.lookingForHousing && (
                <div>
                  <Label className="text-white/60 mb-2">Housing Search</Label>
                  <p className="text-white">{currentUser.lookingForHousing === 'yes' ? 'Actively looking' : 'Not currently'}</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Employer Specific Info */}
        {currentUser.userType === 'employer' && (
          <Card className="bg-[#121212] border-white/10 p-8 mb-6">
            <h2 className="text-xl text-white mb-6">Company Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentUser.companyName && (
                <div>
                  <Label className="text-white/60 mb-2">Company Name</Label>
                  <p className="text-white">{currentUser.companyName}</p>
                </div>
              )}
              {currentUser.industry && (
                <div>
                  <Label className="text-white/60 mb-2">Industry</Label>
                  <p className="text-white">{currentUser.industry}</p>
                </div>
              )}
              {currentUser.companySize && (
                <div>
                  <Label className="text-white/60 mb-2">Company Size</Label>
                  <p className="text-white">{currentUser.companySize}</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Donor Specific Info */}
        {currentUser.userType === 'donor' && (
          <Card className="bg-[#121212] border-white/10 p-8 mb-6">
            <h2 className="text-xl text-white mb-6">Donation Activity</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-black/50 rounded-lg">
                <p className="text-3xl text-[#A8F32C] mb-2">0</p>
                <p className="text-sm text-white/60">Items Donated</p>
              </div>
              <div className="text-center p-4 bg-black/50 rounded-lg">
                <p className="text-3xl text-blue-400 mb-2">0</p>
                <p className="text-sm text-white/60">Active Listings</p>
              </div>
              <div className="text-center p-4 bg-black/50 rounded-lg">
                <p className="text-3xl text-purple-400 mb-2">0</p>
                <p className="text-sm text-white/60">Lives Impacted</p>
              </div>
            </div>
          </Card>
        )}

        {/* Property Owner Specific Info */}
        {currentUser.userType === 'property' && (
          <Card className="bg-[#121212] border-white/10 p-8 mb-6">
            <h2 className="text-xl text-white mb-6">Property Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentUser.propertyType && (
                <div>
                  <Label className="text-white/60 mb-2">Property Type</Label>
                  <p className="text-white capitalize">{currentUser.propertyType}</p>
                </div>
              )}
              {currentUser.numberOfUnits && (
                <div>
                  <Label className="text-white/60 mb-2">Number of Units</Label>
                  <p className="text-white">{currentUser.numberOfUnits}</p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* FairPath Score Details (for justice-impacted users) */}
        {currentUser.userType === 'user' && currentUser.fairPathScore !== undefined && (
          <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/30 p-8">
            <h2 className="text-xl text-white mb-4 flex items-center gap-2">
              <Award className="h-6 w-6 text-blue-400" />
              Your FairPath Score
            </h2>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-6xl text-white font-bold">{currentUser.fairPathScore}</span>
                <span className="text-white/60">/ 1000</span>
              </div>
              <div className="w-full bg-black/50 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-[#A8F32C] to-blue-400 h-3 rounded-full transition-all"
                  style={{ width: `${(currentUser.fairPathScore / 1000) * 100}%` }}
                />
              </div>
            </div>
            <div className="text-sm text-white/80 space-y-2">
              <p><strong>What affects your score:</strong></p>
              <ul className="space-y-1 text-xs text-white/70 ml-4">
                <li>✓ Time since release</li>
                <li>✓ Type of conviction</li>
                <li>✓ Employment status & benefits</li>
                <li>✓ Vocational training participation</li>
                <li>✓ Veteran status</li>
                <li>✓ Application completion & engagement</li>
              </ul>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}