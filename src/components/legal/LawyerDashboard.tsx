import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Scale, Mail, DollarSign, TrendingUp, User, Settings, 
  FileText, Star, MessageSquare, Calendar, CheckCircle, Clock, XCircle
} from 'lucide-react';

interface LawyerDashboardProps {
  onLogout: () => void;
}

// Mock data
const mockLawyer = {
  name: 'John Smith',
  firmName: 'Smith Law Group',
  email: 'john.smith@lawfirm.com',
  phone: '(555) 123-4567',
  barNumber: '123456',
  barState: 'California',
  yearsExperience: 15,
  rating: 4.8,
  totalReviews: 47,
  practiceAreas: ['Expungement', 'Record Sealing', 'Pardons'],
  serviceStates: ['California', 'Nevada'],
  consultationFee: 0,
  expungementFeeMin: 800,
  expungementFeeMax: 2500,
  sealingFeeMin: 600,
  sealingFeeMax: 1800,
};

const mockStats = {
  totalLeads: 124,
  activeLeads: 18,
  convertedClients: 42,
  revenue: 52400,
  conversionRate: 34,
  avgResponseTime: '2.3 hours',
};

const mockLeads = [
  {
    id: 1,
    name: 'Michael Johnson',
    email: 'michael.j@email.com',
    phone: '(555) 987-6543',
    state: 'California',
    county: 'Los Angeles County',
    offense: 'Drug Possession (2018)',
    eligible: true,
    eligibilityDetails: 'Eligible under PC 1203.4 - Completed probation 2020',
    dateSubmitted: '2024-12-03',
    status: 'new',
    message: 'I need help clearing my record for a job opportunity. Can you help?',
  },
  {
    id: 2,
    name: 'Sarah Williams',
    email: 'sarah.w@email.com',
    phone: '(555) 456-7890',
    state: 'California',
    county: 'Orange County',
    offense: 'Petty Theft (2017)',
    eligible: true,
    eligibilityDetails: 'Eligible for expungement - All requirements met',
    dateSubmitted: '2024-12-02',
    status: 'contacted',
    message: 'Looking to get my record expunged. What are the next steps?',
  },
  {
    id: 3,
    name: 'David Martinez',
    email: 'david.m@email.com',
    phone: '(555) 234-5678',
    state: 'California',
    county: 'San Diego County',
    offense: 'DUI (2019)',
    eligible: true,
    eligibilityDetails: 'Eligible - Waiting period satisfied',
    dateSubmitted: '2024-12-01',
    status: 'consultation_scheduled',
    consultationDate: '2024-12-08',
    message: 'Want to clear my DUI conviction. Available for consultation this week.',
  },
];

export default function LawyerDashboard({ onLogout }: LawyerDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Scale className="h-8 w-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl text-white">{mockLawyer.firmName}</h1>
              <p className="text-white/60">{mockLawyer.name} • {mockLawyer.barState} Bar #{mockLawyer.barNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              Active Subscription
            </Badge>
            <Button variant="outline" onClick={onLogout} className="border-gray-700 text-white">
              Logout
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-gray-900 border-gray-800 mb-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-500">
              Overview
            </TabsTrigger>
            <TabsTrigger value="leads" className="data-[state=active]:bg-purple-500">
              Leads ({mockStats.activeLeads})
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-purple-500">
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-500">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-gray-900 border-purple-500/30">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <Mail className="h-8 w-8 text-purple-400" />
                    <Badge className="bg-purple-500/20 text-purple-400 border-0">
                      +{mockStats.activeLeads} new
                    </Badge>
                  </div>
                  <p className="text-3xl text-white mb-1">{mockStats.totalLeads}</p>
                  <p className="text-sm text-white/60">Total Leads</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-green-500/30">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                    <Badge className="bg-green-500/20 text-green-400 border-0">
                      {mockStats.conversionRate}%
                    </Badge>
                  </div>
                  <p className="text-3xl text-white mb-1">{mockStats.convertedClients}</p>
                  <p className="text-sm text-white/60">Converted Clients</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-blue-500/30">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <DollarSign className="h-8 w-8 text-blue-400" />
                    <Badge className="bg-blue-500/20 text-blue-400 border-0">
                      +12%
                    </Badge>
                  </div>
                  <p className="text-3xl text-white mb-1">${mockStats.revenue.toLocaleString()}</p>
                  <p className="text-sm text-white/60">Est. Revenue</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-orange-500/30">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="h-8 w-8 text-orange-400" />
                    <Star className="h-6 w-6 text-orange-400" />
                  </div>
                  <p className="text-3xl text-white mb-1">{mockStats.avgResponseTime}</p>
                  <p className="text-sm text-white/60">Avg Response Time</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Leads */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-white">Recent Leads</h2>
                <Button 
                  variant="outline" 
                  className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
                  onClick={() => setActiveTab('leads')}
                >
                  View All Leads
                </Button>
              </div>

              <div className="space-y-4">
                {mockLeads.slice(0, 3).map(lead => (
                  <Card key={lead.id} className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl text-white">{lead.name}</h3>
                            <Badge className={
                              lead.status === 'new' 
                                ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                                : lead.status === 'contacted'
                                ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                : 'bg-green-500/20 text-green-400 border-green-500/30'
                            }>
                              {lead.status === 'new' && 'New Lead'}
                              {lead.status === 'contacted' && 'Contacted'}
                              {lead.status === 'consultation_scheduled' && 'Consultation Scheduled'}
                            </Badge>
                          </div>
                          <p className="text-white/60 mb-1">{lead.offense}</p>
                          <p className="text-white/80 mb-2">
                            {lead.county}, {lead.state}
                          </p>
                          <p className="text-sm text-green-400 mb-3">
                            ✓ {lead.eligibilityDetails}
                          </p>
                          <p className="text-white/70 italic">"{lead.message}"</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-white/60 mb-4">{lead.dateSubmitted}</p>
                          <Button className="bg-purple-500 hover:bg-purple-600">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Respond
                          </Button>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-gray-800 flex items-center gap-4 text-sm text-white/60">
                        <span>{lead.email}</span>
                        <span>•</span>
                        <span>{lead.phone}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-purple-500/20 to-transparent border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Update Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-4">
                    Keep your profile current to attract more clients
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full border-purple-500 text-purple-400"
                    onClick={() => setActiveTab('profile')}
                  >
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/20 to-transparent border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Your Rating
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-4">
                    <p className="text-3xl text-white">{mockLawyer.rating}</p>
                    <div className="flex">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-white/70">{mockLawyer.totalReviews} client reviews</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/20 to-transparent border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-2">
                    <strong className="text-white">{mockStats.conversionRate}%</strong> conversion rate
                  </p>
                  <p className="text-white/70 mb-4">
                    <strong className="text-white">{mockStats.avgResponseTime}</strong> avg response
                  </p>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    Above Average
                  </Badge>
                </CardContent>
              </Card>
            </div>

          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl text-white mb-2">All Leads</h2>
                <p className="text-white/60">{mockLeads.length} total leads • {mockStats.activeLeads} active</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="border-gray-700 text-white">
                  All
                </Button>
                <Button variant="outline" className="border-gray-700 text-white">
                  New
                </Button>
                <Button variant="outline" className="border-gray-700 text-white">
                  In Progress
                </Button>
                <Button variant="outline" className="border-gray-700 text-white">
                  Converted
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {mockLeads.map(lead => (
                <Card key={lead.id} className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl text-white">{lead.name}</h3>
                          <Badge className={
                            lead.status === 'new' 
                              ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                              : lead.status === 'contacted'
                              ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                              : 'bg-green-500/20 text-green-400 border-green-500/30'
                          }>
                            {lead.status === 'new' && 'New Lead'}
                            {lead.status === 'contacted' && 'Contacted'}
                            {lead.status === 'consultation_scheduled' && 'Consultation Scheduled'}
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-white/60 mb-1">Offense</p>
                            <p className="text-white">{lead.offense}</p>
                          </div>
                          <div>
                            <p className="text-sm text-white/60 mb-1">Location</p>
                            <p className="text-white">{lead.county}, {lead.state}</p>
                          </div>
                        </div>

                        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4">
                          <p className="text-sm text-green-400 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" />
                            {lead.eligibilityDetails}
                          </p>
                        </div>

                        <p className="text-white/70 mb-3 italic">"{lead.message}"</p>

                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            {lead.email}
                          </span>
                          <span className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            {lead.phone}
                          </span>
                          {lead.consultationDate && (
                            <span className="flex items-center gap-2 text-green-400">
                              <Calendar className="h-4 w-4" />
                              Consultation: {lead.consultationDate}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-6">
                        <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-700 text-white">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-700 text-white">
                          Mark Converted
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-gray-900 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">Profile Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-white/80 text-sm mb-2 block">First Name</label>
                    <input 
                      type="text" 
                      defaultValue={mockLawyer.name.split(' ')[0]}
                      className="w-full h-10 px-3 rounded-md bg-black border border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white/80 text-sm mb-2 block">Last Name</label>
                    <input 
                      type="text" 
                      defaultValue={mockLawyer.name.split(' ')[1]}
                      className="w-full h-10 px-3 rounded-md bg-black border border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white/80 text-sm mb-2 block">Firm Name</label>
                  <input 
                    type="text" 
                    defaultValue={mockLawyer.firmName}
                    className="w-full h-10 px-3 rounded-md bg-black border border-gray-700 text-white"
                  />
                </div>

                <div>
                  <label className="text-white/80 text-sm mb-2 block">Bio</label>
                  <textarea 
                    className="w-full h-32 px-3 py-2 rounded-md bg-black border border-gray-700 text-white"
                    placeholder="Tell potential clients about your experience with expungement cases..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-white/80 text-sm mb-2 block">Email</label>
                    <input 
                      type="email" 
                      defaultValue={mockLawyer.email}
                      className="w-full h-10 px-3 rounded-md bg-black border border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white/80 text-sm mb-2 block">Phone</label>
                    <input 
                      type="tel" 
                      defaultValue={mockLawyer.phone}
                      className="w-full h-10 px-3 rounded-md bg-black border border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-800">
                  <h3 className="text-white mb-4">Practice Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockLawyer.practiceAreas.map(area => (
                      <Badge key={area} className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        {area}
                      </Badge>
                    ))}
                    <Button size="sm" variant="outline" className="border-purple-500 text-purple-400">
                      + Add Area
                    </Button>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-800">
                  <h3 className="text-white mb-4">Service Pricing</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-white/80 text-sm mb-2 block">Consultation Fee</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-white/60">$</span>
                        <input 
                          type="number" 
                          defaultValue={mockLawyer.consultationFee}
                          className="w-full h-10 px-3 pl-7 rounded-md bg-black border border-gray-700 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-white/80 text-sm mb-2 block">Expungement Fee Range</label>
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-2.5 text-white/60">$</span>
                          <input 
                            type="number" 
                            defaultValue={mockLawyer.expungementFeeMin}
                            className="w-full h-10 px-3 pl-7 rounded-md bg-black border border-gray-700 text-white"
                          />
                        </div>
                        <span className="text-white/60">to</span>
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-2.5 text-white/60">$</span>
                          <input 
                            type="number" 
                            defaultValue={mockLawyer.expungementFeeMax}
                            className="w-full h-10 px-3 pl-7 rounded-md bg-black border border-gray-700 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-6">
                  <Button variant="outline" className="border-gray-700 text-white">
                    Cancel
                  </Button>
                  <Button className="bg-purple-500 hover:bg-purple-600">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-gray-900 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">Subscription & Billing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl text-white mb-2">FairPath Legal - Lawyer Plan</h3>
                      <p className="text-white/60">Active subscription</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl text-purple-400">$20</p>
                      <p className="text-white/60 text-sm">/month</p>
                    </div>
                  </div>
                  <p className="text-sm text-white/70 mb-4">
                    Next billing date: January 4, 2025
                  </p>
                  <div className="flex gap-4">
                    <Button variant="outline" className="border-purple-500 text-purple-400">
                      Update Payment Method
                    </Button>
                    <Button variant="outline" className="border-red-500 text-red-400">
                      Cancel Subscription
                    </Button>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-800">
                  <h3 className="text-white mb-4">Notification Preferences</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-black rounded-lg">
                      <div>
                        <p className="text-white">New Lead Emails</p>
                        <p className="text-sm text-white/60">Get notified when new leads come in</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-5 w-5" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-black rounded-lg">
                      <div>
                        <p className="text-white">Weekly Summary</p>
                        <p className="text-sm text-white/60">Weekly report of leads and performance</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-5 w-5" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-black rounded-lg">
                      <div>
                        <p className="text-white">Client Messages</p>
                        <p className="text-sm text-white/60">Instant notifications for client messages</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <Button className="bg-purple-500 hover:bg-purple-600">
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>

      </div>
    </div>
  );
}
