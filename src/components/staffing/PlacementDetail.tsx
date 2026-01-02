import React from 'react';
import { ArrowLeft, Building2, User, DollarSign, Calendar, CheckCircle, FileText, Download, Mail, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

interface PlacementDetailProps {
  placement: any;
  onBack: () => void;
}

export function PlacementDetail({ placement, onBack }: PlacementDetailProps) {
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
          Back to Placements
        </Button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">Placement #{placement.id}</h1>
              <Badge className={
                placement.status === 'active' ? 'bg-green-500/20 text-green-400' :
                placement.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                'bg-white/10 text-white/60'
              }>
                {placement.status.toUpperCase()}
              </Badge>
            </div>
            <p className="text-white/60">
              Created on {new Date(placement.startDate).toLocaleDateString()}
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/20 text-white">
              <Download className="mr-2 h-4 w-4" />
              Download Invoice
            </Button>
            <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
              <Mail className="mr-2 h-4 w-4" />
              Email Details
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-[#121212] border-white/10 p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#A8F32C]" />
              Placement Details
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-white/60 text-sm mb-4">Position Information</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-white/40 mb-1">Role Title</div>
                    <div className="text-white font-medium">{placement.position}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/40 mb-1">Start Date</div>
                    <div className="text-white font-medium">{new Date(placement.startDate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/40 mb-1">Hourly Rate</div>
                    <div className="text-white font-medium">${placement.salary}/hr</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/40 mb-1">Guarantee Period</div>
                    <div className="text-white font-medium">{placement.guarantee}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-white/60 text-sm mb-4">Financials</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-white/40 mb-1">Placement Fee</div>
                    <div className="text-2xl text-white font-bold">${placement.fee}</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/40 mb-1">Your Commission</div>
                    <div className="text-2xl text-[#A8F32C] font-bold">${placement.commission}</div>
                    <div className="text-xs text-white/40">90% of fee</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/40 mb-1">WOTC Credit Value</div>
                    <div className="text-yellow-400 font-medium flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      {placement.wotcCredit}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Candidate Card */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-400" />
                  Candidate
                </h3>
                <Button variant="ghost" size="sm" className="text-[#A8F32C] h-auto p-0 hover:bg-transparent">
                  View Profile
                </Button>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xl">
                  {placement.candidateName.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-medium">{placement.candidateName}</div>
                  <div className="text-white/60 text-sm">ID: #{placement.candidateId}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full bg-white/5 hover:bg-white/10 text-white justify-start">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Candidate
                </Button>
                <Button className="w-full bg-white/5 hover:bg-white/10 text-white justify-start">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Candidate
                </Button>
              </div>
            </Card>

            {/* Client Card */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-purple-400" />
                  Client
                </h3>
                <Button variant="ghost" size="sm" className="text-[#A8F32C] h-auto p-0 hover:bg-transparent">
                  View Profile
                </Button>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-xl">
                  {placement.clientName.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-medium">{placement.clientName}</div>
                  <div className="text-white/60 text-sm">ID: #{placement.clientId}</div>
                </div>
              </div>

               <div className="space-y-2">
                <Button className="w-full bg-white/5 hover:bg-white/10 text-white justify-start">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Client
                </Button>
                <Button className="w-full bg-white/5 hover:bg-white/10 text-white justify-start">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Client
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Timeline Sidebar */}
        <div className="space-y-6">
          <Card className="bg-[#121212] border-white/10 p-6">
            <h3 className="text-lg font-medium mb-4 text-white">Activity Timeline</h3>
            <div className="space-y-6 relative before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10">
              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                </div>
                <div className="text-sm text-white mb-1">Placement Completed</div>
                <div className="text-xs text-white/60">Dec 1, 2024 - 9:00 AM</div>
              </div>
              
              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center">
                  <FileText className="w-3 h-3 text-blue-500" />
                </div>
                <div className="text-sm text-white mb-1">Contract Signed</div>
                <div className="text-xs text-white/60">Nov 28, 2024 - 2:30 PM</div>
              </div>

              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-yellow-500/20 border border-yellow-500 flex items-center justify-center">
                  <DollarSign className="w-3 h-3 text-yellow-500" />
                </div>
                <div className="text-sm text-white mb-1">Invoice Generated</div>
                <div className="text-xs text-white/60">Dec 1, 2024 - 9:05 AM</div>
              </div>
            </div>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6">
            <h3 className="text-lg font-medium mb-4 text-white">Payment Status</h3>
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-green-400 font-medium mb-1">
                <CheckCircle className="h-4 w-4" />
                Payment Received
              </div>
              <p className="text-sm text-white/60">
                Processed via Stripe on Dec 1, 2024
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Subtotal</span>
                <span className="text-white">${placement.fee}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Platform Fee (10%)</span>
                <span className="text-red-400">-${(placement.fee * 0.1).toFixed(2)}</span>
              </div>
              <Separator className="bg-white/10" />
              <div className="flex justify-between font-medium">
                <span className="text-white">Net Earnings</span>
                <span className="text-[#A8F32C]">${placement.commission}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
