import { useState } from 'react';
import { Wrench, DollarSign, Star, TrendingUp, Calendar, FileText, Settings, LogOut, CheckCircle, Clock, XCircle, User, Award, ChevronRight, Download } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import LogoFinal from '../common/LogoFinal';
import { useUser } from '../../contexts/UserContext';

interface ProviderDashboardProps {
  userData?: any;
  onNavigate?: (screen: string) => void;
}

export default function ProviderDashboard({ userData, onNavigate }: ProviderDashboardProps) {
  const { logout } = useUser();
  const [activeTab, setActiveTab] = useState<'overview' | 'active-jobs' | 'earnings' | 'reviews' | '1099s'>('overview');

  const providerData = {
    name: userData?.name || 'Marcus Johnson',
    service: userData?.service || 'Handyman Services',
    hourlyRate: userData?.hourlyRate || 45,
    rating: userData?.rating || 4.9,
    totalReviews: userData?.totalReviews || 127,
    jobsCompleted: userData?.jobsCompleted || 143,
    fairPathScore: userData?.fairPathScore || 687,
    joinedDate: userData?.joinedDate || 'June 2024',
    avatar: userData?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
  };

  // Active Jobs
  const activeJobs = [
    {
      id: 1,
      customer: 'John Smith',
      service: 'Fix leaking faucet',
      date: 'Dec 10, 2025',
      time: '10:00 AM',
      location: '1234 Main St, Chicago',
      amount: 135,
      status: 'scheduled',
      estimatedHours: 3
    },
    {
      id: 2,
      customer: 'Sarah Johnson',
      service: 'Install ceiling fan',
      date: 'Dec 12, 2025',
      time: '2:00 PM',
      location: '5678 Oak Ave, Chicago',
      amount: 180,
      status: 'scheduled',
      estimatedHours: 4
    },
    {
      id: 3,
      customer: 'Mike Williams',
      service: 'Repair drywall damage',
      date: 'Dec 8, 2025',
      time: 'Completed',
      location: '9012 Elm St, Chicago',
      amount: 225,
      status: 'awaiting_confirmation',
      estimatedHours: 5
    }
  ];

  // Completed Jobs (for earnings)
  const completedJobs = [
    { id: 1, date: 'Dec 1, 2025', customer: 'Lisa Brown', service: 'Plumbing repair', amount: 180, platformFee: 18, netEarnings: 162 },
    { id: 2, date: 'Nov 28, 2025', customer: 'Tom Davis', service: 'Door installation', amount: 225, platformFee: 22.50, netEarnings: 202.50 },
    { id: 3, date: 'Nov 25, 2025', customer: 'Jennifer Lee', service: 'Kitchen faucet', amount: 135, platformFee: 13.50, netEarnings: 121.50 },
    { id: 4, date: 'Nov 22, 2025', customer: 'Robert Taylor', service: 'Light fixture', amount: 90, platformFee: 9, netEarnings: 81 },
    { id: 5, date: 'Nov 20, 2025', customer: 'Amanda White', service: 'Cabinet repair', amount: 270, platformFee: 27, netEarnings: 243 },
  ];

  // Reviews
  const recentReviews = [
    { id: 1, customer: 'Lisa Brown', rating: 5, date: 'Dec 1, 2025', comment: 'Amazing work! Fixed my plumbing issue quickly and professionally. Highly recommend!' },
    { id: 2, customer: 'Tom Davis', rating: 5, date: 'Nov 28, 2025', comment: 'Marcus did an excellent job installing my new door. Very skilled and punctual.' },
    { id: 3, customer: 'Jennifer Lee', rating: 4, date: 'Nov 25, 2025', comment: 'Good work on the faucet. Took a bit longer than expected but quality was great.' }
  ];

  // 1099 Data
  const tax1099Data = {
    currentYear: 2025,
    totalEarnings: 48750,
    platformFees: 4875,
    netEarnings: 43875,
    jobsCompleted: 143,
    quarterlyBreakdown: [
      { quarter: 'Q1 2025', earnings: 12340, fees: 1234, net: 11106 },
      { quarter: 'Q2 2025', earnings: 13890, fees: 1389, net: 12501 },
      { quarter: 'Q3 2025', earnings: 11250, fees: 1125, net: 10125 },
      { quarter: 'Q4 2025', earnings: 11270, fees: 1127, net: 10143 }
    ]
  };

  const totalEarningsThisMonth = completedJobs.reduce((sum, job) => sum + job.netEarnings, 0);
  const platformFeesThisMonth = completedJobs.reduce((sum, job) => sum + job.platformFee, 0);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation Bar */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <LogoFinal size="md" />
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-white/60 hover:text-white">
                <Settings className="h-5 w-5" />
              </Button>
              <Button onClick={logout} variant="outline" className="border-white/20 text-white hover:bg-white/5">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Provider Header */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-[#A8F32C]/10 to-transparent border-[#A8F32C]/30 p-6">
            <div className="flex items-start gap-6">
              <img src={providerData.avatar} alt={providerData.name} className="w-24 h-24 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl mb-2 text-white">{providerData.name}</h1>
                    <div className="text-xl text-white/80 mb-3">{providerData.service}</div>
                    <div className="flex gap-4 text-sm">
                      <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                        ⭐ {providerData.rating} ({providerData.totalReviews} reviews)
                      </Badge>
                      <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                        {providerData.jobsCompleted} jobs completed
                      </Badge>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        Joined {providerData.joinedDate}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/60 mb-1">Your Rate</div>
                    <div className="text-3xl text-[#A8F32C]">${providerData.hourlyRate}/hr</div>
                    <div className="text-sm text-white/60">You earn ${Math.round(providerData.hourlyRate * 0.9)}/hr</div>
                  </div>
                </div>
              </div>
            </div>

            {/* FairPath Score */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#A8F32C]" />
                  <span className="text-white">FairPath Score</span>
                </div>
                <span className="text-2xl text-[#A8F32C]">{providerData.fairPathScore}</span>
              </div>
              <Progress value={(providerData.fairPathScore / 1000) * 100} className="h-2" />
              <div className="text-xs text-white/60 mt-1">
                Complete more jobs and get 5-star reviews to increase your score
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'active-jobs', label: 'Active Jobs', icon: Wrench },
            { id: 'earnings', label: 'Earnings', icon: DollarSign },
            { id: 'reviews', label: 'Reviews', icon: Star },
            { id: '1099s', label: '1099 Tax Forms', icon: FileText }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                className={activeTab === tab.id ? 'bg-[#A8F32C] text-black' : 'border-white/20 text-white hover:bg-white/5'}
                onClick={() => setActiveTab(tab.id as any)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  <span className="text-white/60">This Month</span>
                </div>
                <div className="text-3xl text-white">${totalEarningsThisMonth.toFixed(2)}</div>
                <div className="text-sm text-white/60">Net earnings</div>
              </Card>

              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Wrench className="h-5 w-5 text-blue-400" />
                  <span className="text-white/60">Active Jobs</span>
                </div>
                <div className="text-3xl text-white">{activeJobs.filter(j => j.status === 'scheduled').length}</div>
                <div className="text-sm text-white/60">Upcoming bookings</div>
              </Card>

              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="text-white/60">Rating</span>
                </div>
                <div className="text-3xl text-white">{providerData.rating}</div>
                <div className="text-sm text-white/60">{providerData.totalReviews} reviews</div>
              </Card>

              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="h-5 w-5 text-[#A8F32C]" />
                  <span className="text-white/60">Completed</span>
                </div>
                <div className="text-3xl text-white">{providerData.jobsCompleted}</div>
                <div className="text-sm text-white/60">Total jobs</div>
              </Card>
            </div>

            {/* Upcoming Jobs */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-2xl mb-4 text-white">Upcoming Jobs</h2>
              <div className="space-y-4">
                {activeJobs.filter(j => j.status === 'scheduled').map((job) => (
                  <Card key={job.id} className="bg-black/50 border-white/10 p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-lg text-white">{job.service}</div>
                          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                            ${job.amount}
                          </Badge>
                        </div>
                        <div className="text-sm text-white/60 mb-1">Customer: {job.customer}</div>
                        <div className="flex gap-4 text-sm text-white/60">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {job.date} at {job.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            ~{job.estimatedHours} hours
                          </div>
                        </div>
                        <div className="text-sm text-white/60 mt-1">{job.location}</div>
                      </div>
                      <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                        View Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Awaiting Confirmation */}
            {activeJobs.filter(j => j.status === 'awaiting_confirmation').length > 0 && (
              <Card className="bg-gradient-to-r from-yellow-500/10 to-transparent border-yellow-500/30 p-6">
                <h2 className="text-2xl mb-4 text-white">Awaiting Customer Confirmation</h2>
                <div className="space-y-4">
                  {activeJobs.filter(j => j.status === 'awaiting_confirmation').map((job) => (
                    <Card key={job.id} className="bg-black/50 border-white/10 p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="text-lg text-white">{job.service}</div>
                            <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                              Pending Payment
                            </Badge>
                          </div>
                          <div className="text-sm text-white/60 mb-1">Customer: {job.customer}</div>
                          <div className="text-sm text-white/60">Amount: ${job.amount} (You'll receive ${Math.round(job.amount * 0.9)})</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-white/60 mb-2">Job completed</div>
                          <div className="text-sm text-yellow-400">Waiting for customer to confirm</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}

        {/* ACTIVE JOBS TAB */}
        {activeTab === 'active-jobs' && (
          <div className="space-y-4">
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-2xl mb-4 text-white">All Active Jobs</h2>
              <div className="space-y-4">
                {activeJobs.map((job) => (
                  <Card key={job.id} className="bg-black/50 border-white/10 p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-lg text-white">{job.service}</div>
                          <Badge className={
                            job.status === 'scheduled' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                            job.status === 'awaiting_confirmation' ? 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30' :
                            'bg-green-500/20 text-green-400 border-green-500/30'
                          }>
                            {job.status === 'scheduled' ? 'Scheduled' : 
                             job.status === 'awaiting_confirmation' ? 'Awaiting Confirmation' : 
                             'Completed'}
                          </Badge>
                        </div>
                        <div className="text-sm text-white/60">Customer: {job.customer}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl text-[#A8F32C]">${job.amount}</div>
                        <div className="text-sm text-white/60">You earn: ${Math.round(job.amount * 0.9)}</div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-white/60">Date & Time</div>
                        <div className="text-white">{job.date} at {job.time}</div>
                      </div>
                      <div>
                        <div className="text-white/60">Location</div>
                        <div className="text-white">{job.location}</div>
                      </div>
                      <div>
                        <div className="text-white/60">Estimated Duration</div>
                        <div className="text-white">{job.estimatedHours} hours</div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" className="flex-1 border-white/20 text-white">
                        Message Customer
                      </Button>
                      <Button className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                        View Full Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* EARNINGS TAB */}
        {activeTab === 'earnings' && (
          <div className="space-y-6">
            {/* Summary Card */}
            <Card className="bg-gradient-to-r from-green-500/10 to-transparent border-green-500/30 p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-white/60 mb-1">This Month (Net)</div>
                  <div className="text-3xl text-green-400">${totalEarningsThisMonth.toFixed(2)}</div>
                  <div className="text-sm text-white/60">{completedJobs.length} jobs completed</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Platform Fees</div>
                  <div className="text-3xl text-white">${platformFeesThisMonth.toFixed(2)}</div>
                  <div className="text-sm text-white/60">10% of gross</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Year to Date</div>
                  <div className="text-3xl text-[#A8F32C]">${tax1099Data.netEarnings.toLocaleString()}</div>
                  <div className="text-sm text-white/60">{tax1099Data.jobsCompleted} total jobs</div>
                </div>
              </div>
            </Card>

            {/* Recent Transactions */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-2xl mb-4 text-white">Recent Transactions</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 text-white/60">Date</th>
                      <th className="text-left py-3 text-white/60">Customer</th>
                      <th className="text-left py-3 text-white/60">Service</th>
                      <th className="text-right py-3 text-white/60">Gross</th>
                      <th className="text-right py-3 text-white/60">Fee (10%)</th>
                      <th className="text-right py-3 text-white/60">Net Earnings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedJobs.map((job) => (
                      <tr key={job.id} className="border-b border-white/5">
                        <td className="py-3 text-white">{job.date}</td>
                        <td className="py-3 text-white">{job.customer}</td>
                        <td className="py-3 text-white">{job.service}</td>
                        <td className="py-3 text-right text-white">${job.amount}</td>
                        <td className="py-3 text-right text-red-400">-${job.platformFee}</td>
                        <td className="py-3 text-right text-green-400">${job.netEarnings}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <Card className="bg-gradient-to-r from-yellow-500/10 to-transparent border-yellow-500/30 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-white/60 mb-1">Overall Rating</div>
                  <div className="text-4xl text-yellow-400 mb-2">⭐ {providerData.rating}</div>
                  <div className="text-white/60">Based on {providerData.totalReviews} reviews</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white/60 mb-1">5-Star Reviews</div>
                  <div className="text-3xl text-white">94%</div>
                </div>
              </div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-2xl mb-4 text-white">Recent Reviews</h2>
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <Card key={review.id} className="bg-black/50 border-white/10 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-white mb-1">{review.customer}</div>
                        <div className="flex items-center gap-1 text-yellow-400">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-white/60">{review.date}</div>
                    </div>
                    <div className="text-white/80">{review.comment}</div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* 1099 TAX FORMS TAB */}
        {activeTab === '1099s' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-blue-500/10 to-transparent border-blue-500/30 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl mb-2 text-white">2025 Tax Summary (1099-NEC)</h2>
                  <div className="text-white/60 mb-4">
                    Your 1099-NEC form will be automatically generated and sent by January 31st
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <div className="text-white/60 mb-1">Total Gross Earnings</div>
                      <div className="text-3xl text-white">${tax1099Data.totalEarnings.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-white/60 mb-1">Platform Fees Paid</div>
                      <div className="text-3xl text-red-400">${tax1099Data.platformFees.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-white/60 mb-1">Net Earnings (Reportable)</div>
                      <div className="text-3xl text-[#A8F32C]">${tax1099Data.netEarnings.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
                <Button className="bg-blue-500 text-white hover:bg-blue-600">
                  <Download className="mr-2 h-4 w-4" />
                  Download 2025 Summary
                </Button>
              </div>
            </Card>

            {/* Quarterly Breakdown */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-2xl mb-4 text-white">Quarterly Breakdown</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {tax1099Data.quarterlyBreakdown.map((quarter) => (
                  <Card key={quarter.quarter} className="bg-black/50 border-white/10 p-4">
                    <div className="text-lg text-white mb-3">{quarter.quarter}</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/60">Gross Earnings:</span>
                        <span className="text-white">${quarter.earnings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Platform Fees:</span>
                        <span className="text-red-400">-${quarter.fees.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between border-t border-white/10 pt-2">
                        <span className="text-white">Net Earnings:</span>
                        <span className="text-[#A8F32C]">${quarter.net.toLocaleString()}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Tax Info */}
            <Card className="bg-black/50 border-white/10 p-6">
              <h3 className="text-lg mb-3 text-white">Important Tax Information</h3>
              <div className="space-y-2 text-sm text-white/80">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>1099-NEC Form:</strong> You'll receive your 1099-NEC by January 31st since you earned over $600
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Self-Employment Tax:</strong> As an independent contractor, you're responsible for self-employment taxes (~15.3%)
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Quarterly Taxes:</strong> Consider making quarterly estimated tax payments to avoid penalties
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Deductions:</strong> You can deduct business expenses like tools, vehicle mileage, and supplies
                  </div>
                </div>
              </div>
              <Button variant="outline" className="mt-4 border-white/20 text-white">
                Download Tax Guide for Gig Workers
              </Button>
            </Card>

            {/* Previous Years */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-2xl mb-4 text-white">Previous Tax Years</h2>
              <div className="space-y-3">
                <Card className="bg-black/50 border-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-lg text-white mb-1">2024 Tax Year</div>
                      <div className="text-sm text-white/60">Net Earnings: $38,420 • 112 Jobs</div>
                    </div>
                    <Button variant="outline" className="border-white/20 text-white">
                      <Download className="mr-2 h-4 w-4" />
                      Download 1099-NEC
                    </Button>
                  </div>
                </Card>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
