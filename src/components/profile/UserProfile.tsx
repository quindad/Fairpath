import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Shield, Bell, CreditCard, LogOut, Edit2, Save, X, TrendingUp } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import LogoFinal from '../common/LogoFinal';
import LocationAutocomplete from '../common/LocationAutocomplete';

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'security'>('profile');

  const [profileData, setProfileData] = useState({
    firstName: 'Marcus',
    lastName: 'Johnson',
    email: 'marcus.johnson@email.com',
    phone: '(312) 555-0198',
    address: '2847 N Sheffield Ave, Chicago, IL 60657',
    dateOfBirth: '1985-03-15',
    releaseDate: '2022-06-10',
    fairPathScore: 734
  });

  const [tempData, setTempData] = useState({...profileData});

  const [notificationSettings, setNotificationSettings] = useState({
    jobMatches: true,
    housingMatches: true,
    marketplaceUpdates: true,
    applicationUpdates: true,
    messages: true,
    emailNotifications: true,
    smsNotifications: false
  });

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/5 bg-[#121212]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <LogoFinal size="md" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl text-white mb-2">MY PROFILE</h1>
          <p className="text-white/60">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="bg-[#121212] border-white/10 p-4 lg:col-span-1 h-fit">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#A8F32C] text-black'
                        : 'text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
              <div className="border-t border-white/10 my-4"></div>
              <button className="w-full flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-all">
                <LogOut className="h-5 w-5" />
                <span>LOG OUT</span>
              </button>
            </div>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <>
                {/* FairPath Score Card */}
                <Card className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-[#A8F32C]/20 flex items-center justify-center">
                        <TrendingUp className="h-8 w-8 text-[#A8F32C]" />
                      </div>
                      <div>
                        <h3 className="text-sm text-white/60 mb-1">YOUR FAIRPATH SCORE</h3>
                        <div className="text-4xl text-white mb-1">{profileData.fairPathScore}</div>
                        <p className="text-sm text-[#A8F32C]">+12 points this month ↗</p>
                      </div>
                    </div>
                    <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                      VIEW BREAKDOWN
                    </Button>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-sm text-white/80">
                      Your score is <strong>above average</strong>. Keep applying to jobs and housing to increase it further!
                    </p>
                  </div>
                </Card>

                {/* Personal Information */}
                <Card className="bg-[#121212] border-white/10 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl text-white">PERSONAL INFORMATION</h2>
                    {!isEditing ? (
                      <Button
                        onClick={() => setIsEditing(true)}
                        variant="outline"
                        className="border-white/20 text-white"
                      >
                        <Edit2 className="mr-2 h-4 w-4" />
                        EDIT
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          onClick={handleSave}
                          className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                        >
                          <Save className="mr-2 h-4 w-4" />
                          SAVE
                        </Button>
                        <Button
                          onClick={handleCancel}
                          variant="outline"
                          className="border-white/20 text-white"
                        >
                          <X className="mr-2 h-4 w-4" />
                          CANCEL
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-white mb-2 block">
                        First Name
                      </Label>
                      {isEditing ? (
                        <Input
                          id="firstName"
                          value={tempData.firstName}
                          onChange={(e) => setTempData({ ...tempData, firstName: e.target.value })}
                          className="bg-black border-white/20 text-white"
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-white/80">
                          <User className="h-4 w-4" />
                          {profileData.firstName}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="lastName" className="text-white mb-2 block">
                        Last Name
                      </Label>
                      {isEditing ? (
                        <Input
                          id="lastName"
                          value={tempData.lastName}
                          onChange={(e) => setTempData({ ...tempData, lastName: e.target.value })}
                          className="bg-black border-white/20 text-white"
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-white/80">
                          <User className="h-4 w-4" />
                          {profileData.lastName}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-white mb-2 block">
                        Email Address
                      </Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={tempData.email}
                          onChange={(e) => setTempData({ ...tempData, email: e.target.value })}
                          className="bg-black border-white/20 text-white"
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-white/80">
                          <Mail className="h-4 w-4" />
                          {profileData.email}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-white mb-2 block">
                        Phone Number
                      </Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          value={tempData.phone}
                          onChange={(e) => setTempData({ ...tempData, phone: e.target.value })}
                          className="bg-black border-white/20 text-white"
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-white/80">
                          <Phone className="h-4 w-4" />
                          {profileData.phone}
                        </div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="address" className="text-white mb-2 block">
                        Address
                      </Label>
                      {isEditing ? (
                        <LocationAutocomplete
                          value={tempData.address}
                          onChange={(value) => setTempData({ ...tempData, address: value })}
                          showOpportunityZone
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-white/80">
                          <MapPin className="h-4 w-4" />
                          {profileData.address}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="dateOfBirth" className="text-white mb-2 block">
                        Date of Birth
                      </Label>
                      <div className="flex items-center gap-2 text-white/80">
                        <Calendar className="h-4 w-4" />
                        {new Date(profileData.dateOfBirth).toLocaleDateString()}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="releaseDate" className="text-white mb-2 block">
                        Release Date
                      </Label>
                      <div className="flex items-center gap-2 text-white/80">
                        <Calendar className="h-4 w-4" />
                        {new Date(profileData.releaseDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <Card className="bg-[#121212] border-white/10 p-6">
                <h2 className="text-2xl text-white mb-6">NOTIFICATION SETTINGS</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white mb-1">Job Matches</h3>
                      <p className="text-sm text-white/60">Get notified when new jobs match your profile</p>
                    </div>
                    <Switch
                      checked={notificationSettings.jobMatches}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, jobMatches: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white mb-1">Housing Matches</h3>
                      <p className="text-sm text-white/60">Get notified when new housing matches your criteria</p>
                    </div>
                    <Switch
                      checked={notificationSettings.housingMatches}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, housingMatches: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white mb-1">Marketplace Updates</h3>
                      <p className="text-sm text-white/60">Updates on your claims and donated items</p>
                    </div>
                    <Switch
                      checked={notificationSettings.marketplaceUpdates}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, marketplaceUpdates: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white mb-1">Application Updates</h3>
                      <p className="text-sm text-white/60">Status changes on your job and housing applications</p>
                    </div>
                    <Switch
                      checked={notificationSettings.applicationUpdates}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, applicationUpdates: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white mb-1">Messages</h3>
                      <p className="text-sm text-white/60">New messages from employers, landlords, and donors</p>
                    </div>
                    <Switch
                      checked={notificationSettings.messages}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, messages: checked })}
                    />
                  </div>

                  <div className="border-t border-white/10 my-6"></div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white mb-1">Email Notifications</h3>
                      <p className="text-sm text-white/60">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, emailNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white mb-1">SMS Notifications</h3>
                      <p className="text-sm text-white/60">Receive notifications via text message</p>
                    </div>
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({ ...notificationSettings, smsNotifications: checked })}
                    />
                  </div>
                </div>

                <Button className="w-full mt-8 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                  SAVE SETTINGS
                </Button>
              </Card>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <Card className="bg-[#121212] border-white/10 p-6">
                  <h2 className="text-2xl text-white mb-6">CHANGE PASSWORD</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword" className="text-white mb-2 block">
                        Current Password
                      </Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        placeholder="••••••••"
                        className="bg-black border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="newPassword" className="text-white mb-2 block">
                        New Password
                      </Label>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="••••••••"
                        className="bg-black border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword" className="text-white mb-2 block">
                        Confirm New Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        className="bg-black border-white/20 text-white"
                      />
                    </div>
                    <Button className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                      UPDATE PASSWORD
                    </Button>
                  </div>
                </Card>

                <Card className="bg-[#121212] border-white/10 p-6">
                  <h2 className="text-2xl text-white mb-6">CONNECTED ACCOUNTS</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-black border border-white/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                          🍎
                        </div>
                        <div>
                          <h3 className="text-white">Apple</h3>
                          <p className="text-sm text-white/60">Connected</p>
                        </div>
                      </div>
                      <Button variant="outline" className="border-white/20 text-white">
                        DISCONNECT
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-black border border-white/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                          <svg className="h-6 w-6" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-white">Google</h3>
                          <p className="text-sm text-white/60">Connected</p>
                        </div>
                      </div>
                      <Button variant="outline" className="border-white/20 text-white">
                        DISCONNECT
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="bg-red-500/10 border-red-500/30 p-6">
                  <h2 className="text-2xl text-white mb-2">DELETE ACCOUNT</h2>
                  <p className="text-white/80 mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                    DELETE MY ACCOUNT
                  </Button>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
