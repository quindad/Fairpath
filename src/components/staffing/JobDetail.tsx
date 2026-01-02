import React from 'react';
import { ArrowLeft, Briefcase, MapPin, DollarSign, Calendar, CheckCircle, Clock, Users, Building2, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

interface JobDetailProps {
  job: any;
  onBack: () => void;
}

export function JobDetail({ job, onBack }: JobDetailProps) {
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
          Back to Jobs
        </Button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{job.title}</h1>
              <Badge className={
                job.status === 'Open' ? 'bg-green-500/20 text-green-400' :
                job.status === 'Filled' ? 'bg-blue-500/20 text-blue-400' :
                'bg-white/10 text-white/60'
              }>
                {job.status.toUpperCase()}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-white/60">
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {job.client}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Posted {new Date(job.postedDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="border-white/20 text-white">
              Edit Job
            </Button>
            <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
              <Users className="mr-2 h-4 w-4" />
              Find Candidates
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-[#121212] border-white/10 p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-[#A8F32C]" />
              Job Description
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-white/60 text-sm mb-2">Role Overview</h3>
                <p className="text-white leading-relaxed">
                  We are looking for a reliable {job.title} to join our team at {job.client}. 
                  The ideal candidate will have experience in {job.industry} and be willing to work {job.shift} shifts.
                  This is a {job.type} position with potential for growth.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white/60 text-sm mb-2">Requirements</h3>
                  <ul className="list-disc list-inside text-white space-y-1">
                    {job.requirements?.map((req: string, i: number) => (
                      <li key={i}>{req}</li>
                    )) || <li>Prior experience required</li>}
                  </ul>
                </div>
                <div>
                  <h3 className="text-white/60 text-sm mb-2">Benefits</h3>
                  <ul className="list-disc list-inside text-white space-y-1">
                    <li>Competitive Pay: ${job.payRate}/hr</li>
                    <li>Health Insurance available</li>
                    <li>Paid Time Off</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6">
             <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Candidates Pipeline</h2>
              <Button size="sm" variant="outline" className="border-white/20 text-white">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/50 border border-white/10 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                    MJ
                  </div>
                  <div>
                    <div className="text-white font-medium">Marcus Johnson</div>
                    <div className="text-sm text-white/60">Applied 2 days ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                    Interviewing
                  </Badge>
                  <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                    Review
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-black/50 border border-white/10 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
                    DB
                  </div>
                  <div>
                    <div className="text-white font-medium">David Brown</div>
                    <div className="text-sm text-white/60">Applied 1 day ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    New
                  </Badge>
                  <Button size="sm" variant="ghost" className="text-white/60 hover:text-white">
                    Review
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="bg-[#121212] border-white/10 p-6">
            <h3 className="text-lg font-medium mb-4 text-white">Job Details</h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-white/60 mb-1">Pay Rate</div>
                <div className="text-white font-medium">${job.payRate}/hr</div>
              </div>
              <Separator className="bg-white/10" />
              <div>
                <div className="text-sm text-white/60 mb-1">Shift</div>
                <div className="text-white font-medium">{job.shift || '1st Shift (7AM - 3PM)'}</div>
              </div>
              <Separator className="bg-white/10" />
              <div>
                <div className="text-sm text-white/60 mb-1">Employment Type</div>
                <div className="text-white font-medium">{job.type}</div>
              </div>
              <Separator className="bg-white/10" />
              <div>
                <div className="text-sm text-white/60 mb-1">Openings</div>
                <div className="text-white font-medium">{job.openings || 1} positions</div>
              </div>
            </div>
          </Card>

          <Card className="bg-[#121212] border-white/10 p-6">
            <h3 className="text-lg font-medium mb-4 text-white">Commission Potential</h3>
            <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-[#A8F32C] font-medium mb-1">
                <DollarSign className="h-4 w-4" />
                Estimated Commission
              </div>
              <p className="text-2xl text-white font-bold">
                ${(job.payRate * 160 * 0.05).toFixed(0)} - ${(job.payRate * 160 * 0.10).toFixed(0)}
              </p>
              <p className="text-xs text-white/60 mt-1">Based on placement type</p>
            </div>
            
            <Button className="w-full bg-white/5 hover:bg-white/10 text-white">
              View Fee Agreement
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
