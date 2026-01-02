import { useState } from 'react';
import { Users, Plus, Search, Filter, MessageCircle, FileText, TrendingUp, Calendar, CheckCircle, Clock, AlertCircle, Settings, Download, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

interface ResourceCRMProps {
  onClose: () => void;
}

export default function ResourceCRM({ onClose }: ResourceCRMProps) {
  const [activeTab, setActiveTab] = useState<'clients' | 'referrals' | 'messages' | 'reports' | 'settings'>('clients');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<any | null>(null);

  // Mock clients data
  const clients = [
    {
      id: 1,
      name: 'Marcus Johnson',
      email: 'marcus.j@email.com',
      phone: '(312) 555-0123',
      status: 'active',
      assignedTo: 'Sarah Williams',
      caseType: 'Employment Support',
      lastContact: '2025-12-01',
      nextAppointment: '2025-12-10',
      progress: 75,
      notes: 12,
      referrals: 3,
      tags: ['Housing Needed', 'Job Seeking'],
      joinedDate: '2024-09-15',
      convictionType: 'Non-violent',
      releaseDate: '2023-06-20'
    },
    {
      id: 2,
      name: 'Darnell Brown',
      email: 'dbrown@email.com',
      phone: '(312) 555-0456',
      status: 'pending',
      assignedTo: 'Mike Davis',
      caseType: 'Re-entry Services',
      lastContact: '2025-11-28',
      nextAppointment: '2025-12-05',
      progress: 45,
      notes: 8,
      referrals: 2,
      tags: ['Transportation', 'Skills Training'],
      joinedDate: '2024-10-22',
      convictionType: 'Drug-related',
      releaseDate: '2024-08-10'
    },
    {
      id: 3,
      name: 'Jamal Williams',
      email: 'jwilliams@email.com',
      phone: '(312) 555-0789',
      status: 'success',
      assignedTo: 'Sarah Williams',
      caseType: 'Job Placement',
      lastContact: '2025-11-15',
      nextAppointment: null,
      progress: 100,
      notes: 15,
      referrals: 4,
      tags: ['Employed', 'Success Story'],
      joinedDate: '2024-06-10',
      convictionType: 'Property',
      releaseDate: '2023-12-01'
    }
  ];

  // Mock referrals
  const referrals = [
    {
      id: 1,
      clientName: 'Marcus Johnson',
      referredTo: 'Second Chance Housing',
      type: 'Housing',
      date: '2025-11-30',
      status: 'pending',
      notes: 'Referred for 2BR apartment in South Loop'
    },
    {
      id: 2,
      clientName: 'Darnell Brown',
      referredTo: 'Target Distribution',
      type: 'Employment',
      date: '2025-11-28',
      status: 'completed',
      notes: 'Successfully placed as warehouse associate'
    },
    {
      id: 3,
      clientName: 'Marcus Johnson',
      referredTo: 'FairPath Gigs',
      type: 'Gig Work',
      date: '2025-12-01',
      status: 'active',
      notes: 'Signed up for handyman gigs'
    }
  ];

  // Filter clients based on search
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.caseType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'pending': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'success': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-white/10 text-white/60 border-white/10';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl text-white">Resource Partner CRM</h1>
              <p className="text-white/60">Client & case management system</p>
            </div>
            <div className="flex items-center gap-3">
              <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Client
              </Button>
              <Button onClick={onClose} variant="ghost" size="icon">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'clients', label: 'Clients', icon: Users },
              { id: 'referrals', label: 'Referrals', icon: TrendingUp },
              { id: 'messages', label: 'Messages', icon: MessageCircle },
              { id: 'reports', label: 'Reports', icon: FileText },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  className={activeTab === tab.id ? 'bg-[#A8F32C] text-black' : 'text-white/60 hover:text-white'}
                  onClick={() => setActiveTab(tab.id as any)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* CLIENTS TAB */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  <span className="text-white/60">Total Clients</span>
                </div>
                <div className="text-3xl text-white">{clients.length}</div>
              </Card>

              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-5 w-5 text-yellow-400" />
                  <span className="text-white/60">Active Cases</span>
                </div>
                <div className="text-3xl text-white">{clients.filter(c => c.status === 'active').length}</div>
              </Card>

              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-white/60">Success Cases</span>
                </div>
                <div className="text-3xl text-white">{clients.filter(c => c.status === 'success').length}</div>
              </Card>

              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="h-5 w-5 text-[#A8F32C]" />
                  <span className="text-white/60">Referrals Made</span>
                </div>
                <div className="text-3xl text-white">{referrals.length}</div>
              </Card>
            </div>

            {/* Search & Filters */}
            <Card className="bg-[#121212] border-white/10 p-4">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                  <Input
                    placeholder="Search clients by name, email, or case type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-black/50 border-white/20 text-white pl-10"
                  />
                </div>
                <Button variant="outline" className="border-white/20 text-white">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
            </Card>

            {/* Clients List */}
            <div className="grid gap-4">
              {filteredClients.map((client) => (
                <Card
                  key={client.id}
                  className="bg-[#121212] border-white/10 p-6 cursor-pointer hover:border-[#A8F32C]/50 transition-all"
                  onClick={() => setSelectedClient(client)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl text-white">{client.name}</h3>
                        <Badge className={getStatusColor(client.status)}>
                          {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="text-white/60 mb-2">{client.caseType}</div>
                      <div className="flex gap-4 text-sm text-white/60">
                        <span>{client.email}</span>
                        <span>•</span>
                        <span>{client.phone}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-white/60 mb-1">Assigned to</div>
                      <div className="text-white">{client.assignedTo}</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-white/60 mb-1">Last Contact</div>
                      <div className="text-white">{new Date(client.lastContact).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-white/60 mb-1">Next Appointment</div>
                      <div className="text-white">{client.nextAppointment ? new Date(client.nextAppointment).toLocaleDateString() : 'None scheduled'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-white/60 mb-1">Progress</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#A8F32C]" style={{ width: `${client.progress}%` }} />
                        </div>
                        <span className="text-white text-sm">{client.progress}%</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-white/60 mb-1">Activity</div>
                      <div className="text-white">{client.notes} notes • {client.referrals} referrals</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {client.tags.map((tag, index) => (
                      <Badge key={index} className="bg-white/10 text-white border-white/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Client Detail Modal */}
            {selectedClient && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                <Card className="bg-[#121212] border-white/10 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl text-white mb-2">{selectedClient.name}</h2>
                      <Badge className={getStatusColor(selectedClient.status)}>
                        {selectedClient.status.charAt(0).toUpperCase() + selectedClient.status.slice(1)}
                      </Badge>
                    </div>
                    <Button onClick={() => setSelectedClient(null)} variant="ghost" size="icon">
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <Card className="bg-black/50 border-white/10 p-4">
                      <h4 className="text-white mb-3">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Email:</span>
                          <span className="text-white">{selectedClient.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Phone:</span>
                          <span className="text-white">{selectedClient.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Joined:</span>
                          <span className="text-white">{new Date(selectedClient.joinedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </Card>

                    <Card className="bg-black/50 border-white/10 p-4">
                      <h4 className="text-white mb-3">Case Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Case Type:</span>
                          <span className="text-white">{selectedClient.caseType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Assigned To:</span>
                          <span className="text-white">{selectedClient.assignedTo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Progress:</span>
                          <span className="text-white">{selectedClient.progress}%</span>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Card className="bg-black/50 border-white/10 p-4 mb-6">
                    <h4 className="text-white mb-3">Background</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Conviction Type:</span>
                        <span className="text-white">{selectedClient.convictionType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Release Date:</span>
                        <span className="text-white">{new Date(selectedClient.releaseDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Card>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-blue-500 text-white hover:bg-blue-600">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                    <Button className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Note
                    </Button>
                    <Button className="flex-1 bg-white/10 text-white hover:bg-white/20">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Create Referral
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* REFERRALS TAB */}
        {activeTab === 'referrals' && (
          <div className="space-y-6">
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-white">Referral Management</h2>
                <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Referral
                </Button>
              </div>

              <div className="space-y-4">
                {referrals.map((referral) => (
                  <Card key={referral.id} className="bg-black/50 border-white/10 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg text-white">{referral.clientName}</h4>
                          <Badge className={getStatusColor(referral.status)}>
                            {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="text-white/80 mb-2">Referred to: <strong>{referral.referredTo}</strong></div>
                        <div className="text-sm text-white/60">{referral.notes}</div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 mb-2">
                          {referral.type}
                        </Badge>
                        <div className="text-sm text-white/60">{new Date(referral.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === 'messages' && (
          <Card className="bg-[#121212] border-white/10 p-8 text-center">
            <MessageCircle className="h-16 w-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">Messaging System</h3>
            <p className="text-white/60 mb-4">
              Secure messaging with clients and partners
            </p>
            <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
              Launch Messaging
            </Button>
          </Card>
        )}

        {/* REPORTS TAB */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-2xl mb-4 text-white">Analytics & Reports</h2>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-black/50 border-white/10 p-4">
                  <div className="text-white/60 mb-1">Success Rate</div>
                  <div className="text-3xl text-green-400">33%</div>
                  <div className="text-sm text-white/60">1 of 3 clients</div>
                </Card>

                <Card className="bg-black/50 border-white/10 p-4">
                  <div className="text-white/60 mb-1">Avg Case Duration</div>
                  <div className="text-3xl text-white">3.2 months</div>
                  <div className="text-sm text-white/60">From intake to success</div>
                </Card>

                <Card className="bg-black/50 border-white/10 p-4">
                  <div className="text-white/60 mb-1">Referral Success</div>
                  <div className="text-3xl text-blue-400">67%</div>
                  <div className="text-sm text-white/60">Successful placements</div>
                </Card>
              </div>

              <div className="space-y-3">
                <Button className="w-full bg-white/10 text-white hover:bg-white/20 justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Download Client Outcomes Report
                </Button>
                <Button className="w-full bg-white/10 text-white hover:bg-white/20 justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Download Referral Success Report
                </Button>
                <Button className="w-full bg-white/10 text-white hover:bg-white/20 justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Download Monthly Activity Report
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-2xl mb-4 text-white">Organization Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Organization Name</label>
                  <Input
                    value="Second Chance Resource Center"
                    className="bg-black/50 border-white/20 text-white"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Contact Email</label>
                    <Input
                      type="email"
                      value="contact@scrc.org"
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      value="(312) 555-0900"
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4 text-white">Team Management</h3>
              <p className="text-white/60 mb-4">
                Current plan: <strong className="text-white">5 Free Seats</strong>
              </p>

              <div className="bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/30 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white mb-1">Need more seats?</div>
                    <div className="text-sm text-white/60">$50 for 3 additional seats</div>
                  </div>
                  <Button className="bg-blue-500 text-white hover:bg-blue-600">
                    Add Seats
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-black/50 border border-white/10 rounded-lg">
                  <div>
                    <div className="text-white">Sarah Williams</div>
                    <div className="text-sm text-white/60">Case Manager</div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-black/50 border border-white/10 rounded-lg">
                  <div>
                    <div className="text-white">Mike Davis</div>
                    <div className="text-sm text-white/60">Case Manager</div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                </div>
              </div>

              <Button className="w-full mt-4 bg-white/10 text-white hover:bg-white/20">
                <Plus className="mr-2 h-4 w-4" />
                Invite Team Member
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
