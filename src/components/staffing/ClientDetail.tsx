import React, { useState } from 'react';
import { ArrowLeft, Building2, User, MapPin, Mail, Phone, Globe, Briefcase, Plus, Search, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface ClientDetailProps {
  client: any;
  onBack: () => void;
}

export function ClientDetail({ client, onBack }: ClientDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <Button 
          variant="ghost" 
          onClick={onBack} 
          className="text-white/60 hover:text-white mb-4 pl-0 hover:bg-transparent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Clients
        </Button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="h-16 w-16 bg-purple-500/20 rounded-xl flex items-center justify-center border border-purple-500/30">
              <Building2 className="h-8 w-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">{client.name}</h1>
              <div className="flex items-center gap-4 text-white/60 text-sm">
                <span className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  {client.industry}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {client.location}
                </span>
                <Badge className={
                  client.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/60'
                }>
                  {client.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/20 text-white">
              <Mail className="mr-2 h-4 w-4" />
              Message
            </Button>
            <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
              <Plus className="mr-2 h-4 w-4" />
              New Placement
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="placements">Placements ({client.totalPlacements})</TabsTrigger>
            <TabsTrigger value="jobs">Open Jobs (2)</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-[#121212] border-white/10 p-6 md:col-span-2">
                <h2 className="text-xl font-semibold mb-4 text-white">Company Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-white/60 text-sm mb-1">Company Name</div>
                      <div className="text-white">{client.name}</div>
                    </div>
                    <div>
                      <div className="text-white/60 text-sm mb-1">Industry</div>
                      <div className="text-white">{client.industry}</div>
                    </div>
                    <div>
                      <div className="text-white/60 text-sm mb-1">Preferred Package</div>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        {client.preferredPackage.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-white/60 text-sm mb-1">Primary Contact</div>
                      <div className="flex items-center gap-2 text-white">
                        <User className="h-4 w-4 text-white/40" />
                        {client.contact}
                      </div>
                    </div>
                    <div>
                      <div className="text-white/60 text-sm mb-1">Email</div>
                      <div className="flex items-center gap-2 text-white">
                        <Mail className="h-4 w-4 text-white/40" />
                        {client.email}
                      </div>
                    </div>
                    <div>
                      <div className="text-white/60 text-sm mb-1">Phone</div>
                      <div className="flex items-center gap-2 text-white">
                        <Phone className="h-4 w-4 text-white/40" />
                        {client.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="space-y-6">
                <Card className="bg-[#121212] border-white/10 p-6">
                  <h3 className="text-lg font-medium mb-4 text-white">Revenue Stats</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-white/60 text-sm mb-1">Total Revenue</div>
                      <div className="text-3xl text-white font-bold">${client.revenue.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-white/60 text-sm mb-1">Your Commission</div>
                      <div className="text-2xl text-[#A8F32C] font-bold">${(client.revenue * 0.9).toFixed(2)}</div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-[#121212] border-white/10 p-6">
                  <h3 className="text-lg font-medium mb-4 text-white">Notes</h3>
                  <p className="text-white/60 text-sm italic">
                    "Prefer candidates with previous warehouse experience. Looking to hire 5 more people in Q1 2025."
                  </p>
                  <Button variant="link" className="text-[#A8F32C] pl-0 mt-2">
                    Edit Notes
                  </Button>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* PLACEMENTS TAB */}
          <TabsContent value="placements">
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Placement History</h2>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Search placements..." 
                    className="bg-black/50 border-white/20 text-white w-64"
                  />
                  <Button variant="outline" className="border-white/20 text-white">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Only showing mock if count > 0 */}
              {client.totalPlacements > 0 ? (
                <div className="space-y-4">
                  {[...Array(client.totalPlacements)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-black/50 border border-white/10 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                          C{i+1}
                        </div>
                        <div>
                          <div className="text-white font-medium">Placement #{2024000 + i}</div>
                          <div className="text-sm text-white/60">Warehouse Associate</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-medium">$99.00</div>
                        <div className="text-xs text-green-400">Paid</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-white/40">
                  No placements recorded yet.
                </div>
              )}
            </Card>
          </TabsContent>

          {/* JOBS TAB (Mock) */}
          <TabsContent value="jobs">
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Open Job Orders</h2>
                <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Job
                </Button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-black/50 border border-white/10 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg text-white font-medium mb-1">Warehouse Supervisor</h3>
                      <div className="flex gap-4 text-sm text-white/60">
                        <span>$22 - $25/hr</span>
                        <span>•</span>
                        <span>Full-time</span>
                        <span>•</span>
                        <span>Shift: 1st</span>
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Active
                    </Badge>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="border-white/20 text-white">View Details</Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Find Candidates</Button>
                  </div>
                </div>

                <div className="p-4 bg-black/50 border border-white/10 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg text-white font-medium mb-1">Forklift Operator</h3>
                      <div className="flex gap-4 text-sm text-white/60">
                        <span>$18/hr</span>
                        <span>•</span>
                        <span>Full-time</span>
                        <span>•</span>
                        <span>Shift: 2nd</span>
                      </div>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      Draft
                    </Badge>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="border-white/20 text-white">Edit</Button>
                    <Button size="sm" className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">Publish</Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
