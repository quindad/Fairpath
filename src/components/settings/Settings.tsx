import { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Lock, CreditCard, Mail, Phone, MapPin, Building, ArrowLeft, Save, Shield, Eye, EyeOff } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import LogoFinal from '../common/LogoFinal';

interface SettingsProps {
  onBack: () => void;
  userType?: 'user' | 'employer' | 'property' | 'resource' | 'donor';
}

export default function Settings({ onBack, userType = 'donor' }: SettingsProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'payment'>('profile');
  const [showPassword, setShowPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(312) 555-0123',
    address: '456 Oak Street, Chicago, IL 60614',
    organization: 'Community Helper',
    bio: 'Passionate about helping people restart their lives.'
  });

  const [notifications, setNotifications] = useState({
    emailNewClaims: true,
    emailApprovals: true,
    emailMessages: true,
    pushNewClaims: true,
    pushMessages: true,
    weeklyDigest: true
  });

  const [privacy, setPrivacy] = useState({
    showName: true,
    showOrganization: false,
    publicProfile: true
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'payment', label: 'Payment', icon: CreditCard }
  ];

  const handleSave = () => {
    alert('✅ Settings saved successfully!');
    onBack();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button onClick={onBack} variant="ghost" className="text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <LogoFinal size="md" />
            </div>
            <Button onClick={handleSave} className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl mb-2 text-white">Settings</h1>
          <p className="text-xl text-white/60">Manage your account preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-[#121212] border-white/10 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#A8F32C]/20 text-[#A8F32C]'
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card className="bg-[#121212] border-white/10 p-6">
                <h2 className="text-2xl mb-6 text-white">Profile Information</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-white mb-2 block">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="bg-black border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white mb-2 block">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        className="bg-black border-white/20 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="text-white mb-2 block">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="bg-black border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="organization" className="text-white mb-2 block">
                        Organization {userType === 'donor' && '(Optional)'}
                      </Label>
                      <Input
                        id="organization"
                        value={profileData.organization}
                        onChange={(e) => setProfileData({ ...profileData, organization: e.target.value })}
                        className="bg-black border-white/20 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-white mb-2 block">Address</Label>
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      className="bg-black border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio" className="text-white mb-2 block">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      className="bg-black border-white/20 text-white min-h-24"
                      placeholder="Tell us a bit about yourself..."
                    />
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <h3 className="text-lg mb-4 text-white">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword" className="text-white mb-2 block">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showPassword ? 'text' : 'password'}
                            className="bg-black border-white/20 text-white pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="newPassword" className="text-white mb-2 block">New Password</Label>
                          <Input
                            id="newPassword"
                            type={showPassword ? 'text' : 'password'}
                            className="bg-black border-white/20 text-white"
                          />
                        </div>
                        <div>
                          <Label htmlFor="confirmPassword" className="text-white mb-2 block">Confirm Password</Label>
                          <Input
                            id="confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            className="bg-black border-white/20 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <Card className="bg-[#121212] border-white/10 p-6">
                <h2 className="text-2xl mb-6 text-white">Notification Preferences</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg mb-4 text-white">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white">New Claims</div>
                          <div className="text-sm text-white/60">When someone claims your item</div>
                        </div>
                        <Switch
                          checked={notifications.emailNewClaims}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, emailNewClaims: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white">Approvals & Updates</div>
                          <div className="text-sm text-white/60">Status changes on your items</div>
                        </div>
                        <Switch
                          checked={notifications.emailApprovals}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, emailApprovals: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white">Messages</div>
                          <div className="text-sm text-white/60">Direct messages from recipients</div>
                        </div>
                        <Switch
                          checked={notifications.emailMessages}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, emailMessages: checked })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <h3 className="text-lg mb-4 text-white">Push Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white">New Claims</div>
                          <div className="text-sm text-white/60">Real-time notifications</div>
                        </div>
                        <Switch
                          checked={notifications.pushNewClaims}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, pushNewClaims: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white">Messages</div>
                          <div className="text-sm text-white/60">Chat notifications</div>
                        </div>
                        <Switch
                          checked={notifications.pushMessages}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, pushMessages: checked })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white">Weekly Impact Digest</div>
                        <div className="text-sm text-white/60">Summary of your donations and impact</div>
                      </div>
                      <Switch
                        checked={notifications.weeklyDigest}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyDigest: checked })}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <Card className="bg-[#121212] border-white/10 p-6">
                <h2 className="text-2xl mb-6 text-white">Privacy Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white">Show My Name</div>
                      <div className="text-sm text-white/60">Display your name on listings</div>
                    </div>
                    <Switch
                      checked={privacy.showName}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, showName: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white">Show Organization</div>
                      <div className="text-sm text-white/60">Display your organization name</div>
                    </div>
                    <Switch
                      checked={privacy.showOrganization}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, showOrganization: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white">Public Profile</div>
                      <div className="text-sm text-white/60">Allow others to view your profile</div>
                    </div>
                    <Switch
                      checked={privacy.publicProfile}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, publicProfile: checked })}
                    />
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-lg mb-4 text-white">Data & Privacy</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full border-white/20 text-white justify-start">
                        Download My Data
                      </Button>
                      <Button variant="outline" className="w-full border-white/20 text-white justify-start">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Payment Tab */}
            {activeTab === 'payment' && (
              <Card className="bg-[#121212] border-white/10 p-6">
                <h2 className="text-2xl mb-6 text-white">Payment & Billing</h2>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border border-[#A8F32C]/30 rounded-lg p-4">
                    <p className="text-white/80">
                      <strong className="text-white">💚 Free for Donors!</strong> There are no fees to post items or help people restart their lives.
                    </p>
                  </div>

                  {userType !== 'donor' && (
                    <>
                      <div>
                        <h3 className="text-lg mb-4 text-white">Payment Methods</h3>
                        <div className="space-y-3">
                          <div className="bg-black/50 border border-white/10 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <CreditCard className="h-5 w-5 text-white/60" />
                              <div>
                                <div className="text-white">•••• •••• •••• 4242</div>
                                <div className="text-xs text-white/60">Expires 12/25</div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-white/60">
                              Edit
                            </Button>
                          </div>
                          <Button variant="outline" className="w-full border-white/20 text-white">
                            + Add Payment Method
                          </Button>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <h3 className="text-lg mb-4 text-white">Billing History</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between py-2 border-b border-white/5">
                            <span className="text-white/60">Nov 2024</span>
                            <span className="text-white">$0.00</span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-white/5">
                            <span className="text-white/60">Oct 2024</span>
                            <span className="text-white">$0.00</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
