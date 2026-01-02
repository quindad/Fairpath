import { useState, useEffect } from 'react';
import { Heart, TrendingUp, Users, DollarSign, FileText, ArrowRight, Download, CheckCircle, ThumbsUp, ThumbsDown, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface ImpactFundPageProps {
  onNavigate: (page: string) => void;
}

export default function ImpactFundPage({ onNavigate }: ImpactFundPageProps) {
  const [balance, setBalance] = useState(12847.53);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate live updates every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  const transactions = [
    { type: 'in', amount: 50.00, description: 'Donation from Anonymous', time: '2:30 PM', date: 'Dec 4' },
    { type: 'out', amount: 200.00, description: 'Legal retainer for Marcus J. - wrongful arrest defense', time: '11:15 AM', date: 'Dec 4' },
    { type: 'in', amount: 100.00, description: 'Monthly donation from Sarah K.', time: '9:00 AM', date: 'Dec 4' },
    { type: 'out', amount: 85.00, description: 'Emergency rent assistance - Jamal T. (Atlanta)', time: '8:20 PM', date: 'Dec 3' },
    { type: 'in', amount: 25.00, description: 'Donation from James T.', time: '2:15 PM', date: 'Dec 3' },
    { type: 'out', amount: 20.00, description: 'Groceries for single mom - Keisha L. (Baltimore)', time: '11:45 AM', date: 'Dec 3' },
    { type: 'out', amount: 350.00, description: 'Bail assistance - Darnell W. (Chicago)', time: '3:20 PM', date: 'Dec 2' },
  ];

  const allocationData = [
    { category: 'Legal Retainers & Defense', percentage: 40, color: '#A855F7' },
    { category: 'Emergency Cash (Rent/Food/Bills)', percentage: 30, color: '#10B981' },
    { category: 'Bail Assistance', percentage: 20, color: '#EF4444' },
    { category: 'Free Legal Consults (Pro Users)', percentage: 10, color: '#3B82F6' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold text-[#A8F32C] hover:text-[#A8F32C]/80 transition-colors"
            >
              FairPath Industries
            </button>
            <div className="flex items-center gap-6">
              <button onClick={() => onNavigate('home')} className="text-white/60 hover:text-white transition-colors">Home</button>
              <button onClick={() => onNavigate('service-police')} className="text-white/60 hover:text-white transition-colors">Police The Police</button>
              <button onClick={() => onNavigate('service-legal')} className="text-white/60 hover:text-white transition-colors">FairPath Legal</button>
              <Button 
                onClick={() => window.scrollTo({ top: document.getElementById('donate')?.offsetTop, behavior: 'smooth' })}
                className="bg-[#A8F32C] hover:bg-[#A8F32C]/80 text-black font-bold"
              >
                Donate Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#A8F32C]/10 to-black">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#A8F32C]/20 border border-[#A8F32C]/30 px-4 py-2 rounded-full mb-6">
            <Heart className="w-4 h-4 text-[#A8F32C]" />
            <span className="text-sm text-[#A8F32C]">100% Transparency. Zero Overhead.</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-[#A8F32C]">THE IMPACT FUND</span>
          </h1>
          
          <p className="text-2xl sm:text-3xl text-white/80 mb-4">
            "Every Dollar In. Every Dollar Out."
          </p>
          
          <p className="text-xl text-white/60 mb-12 max-w-3xl mx-auto">
            We keep Police The Police free for everyone through community donations.<br />
            <span className="text-white font-semibold">100% transparency. Zero overhead. For the people.</span>
          </p>
        </div>
      </section>

      {/* Live Statistics Dashboard */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Live Fund Dashboard</h2>
            <p className="text-white/60">Real-time updates every 5 minutes</p>
          </div>

          {/* Top Stats */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Total Balance */}
            <div className="bg-gradient-to-br from-[#A8F32C]/20 to-[#A8F32C]/5 p-8 rounded-3xl border border-[#A8F32C]/30">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 text-[#A8F32C]" />
                <span className="text-xs text-white/40">
                  Updated {Math.floor((new Date().getTime() - lastUpdate.getTime()) / 60000)} min ago
                </span>
              </div>
              <div className="text-sm text-white/60 mb-2">Total Fund Balance</div>
              <div className="text-5xl font-bold text-[#A8F32C] mb-2">
                ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-white/40">
                Available for community support
              </div>
            </div>

            {/* This Month */}
            <div className="bg-[#1F1F1F] p-8 rounded-3xl border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-[#3B82F6]" />
                <span className="text-xs text-white/40">December 2024</span>
              </div>
              <div className="text-sm text-white/60 mb-4">This Month</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-white/40 mb-1">Raised</div>
                  <div className="text-2xl font-bold text-[#10B981]">+$4,250</div>
                </div>
                <div>
                  <div className="text-xs text-white/40 mb-1">Spent</div>
                  <div className="text-2xl font-bold text-[#EF4444]">-$3,100</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="text-xs text-white/40 mb-1">Net Change</div>
                <div className="text-xl font-bold text-[#A8F32C]">+$1,150</div>
              </div>
            </div>
          </div>

          {/* Live Transaction Feed */}
          <div className="bg-[#1F1F1F] p-8 rounded-3xl border border-white/10 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Live Transaction Feed</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
                <span className="text-sm text-white/60">Live</span>
              </div>
            </div>

            <div className="space-y-4">
              {transactions.map((tx, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-black/50 rounded-xl border border-white/5 hover:border-white/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      tx.type === 'in' ? 'bg-[#10B981]/20' : 'bg-[#EF4444]/20'
                    }`}>
                      {tx.type === 'in' ? '↓' : '↑'}
                    </div>
                    <div>
                      <div className="font-medium">{tx.description}</div>
                      <div className="text-sm text-white/40">{tx.date}, {tx.time}</div>
                    </div>
                  </div>
                  <div className={`text-xl font-bold ${
                    tx.type === 'in' ? 'text-[#10B981]' : 'text-[#EF4444]'
                  }`}>
                    {tx.type === 'in' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button className="text-[#A8F32C] hover:underline text-sm">
                View All Transactions →
              </button>
            </div>
          </div>

          {/* Where It Goes + People Helped */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Allocation */}
            <div className="bg-[#1F1F1F] p-8 rounded-3xl border border-white/10">
              <h3 className="text-2xl font-bold mb-6">Where It Goes</h3>
              <div className="space-y-4">
                {allocationData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/80">{item.category}</span>
                      <span className="font-bold" style={{ color: item.color }}>{item.percentage}%</span>
                    </div>
                    <div className="h-3 bg-black rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${item.percentage}%`,
                          backgroundColor: item.color 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Stats */}
            <div className="bg-[#1F1F1F] p-8 rounded-3xl border border-white/10">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-6 h-6 text-[#A8F32C]" />
                <h3 className="text-2xl font-bold">People Helped This Month</h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-4xl font-bold text-[#A8F32C] mb-1">127</div>
                  <div className="text-sm text-white/60">Users Supported</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#A855F7] mb-1">18</div>
                  <div className="text-sm text-white/60">Legal Consultations</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#EF4444] mb-1">340 GB</div>
                  <div className="text-sm text-white/60">Evidence Secured</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#10B981] mb-1">9</div>
                  <div className="text-sm text-white/60">Charges Dropped</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency Promise */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1F1F1F]/30">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-[#A8F32C]/10 to-black p-12 rounded-3xl border border-[#A8F32C]/30">
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 text-[#A8F32C] mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Our Transparency Promise</h2>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                We promised to never charge people who need Police The Police. Here's how we keep that promise.
              </p>
              
              <p className="text-white/60 mb-6">
                Every donation goes directly to:
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C] mt-1 flex-shrink-0" />
                  <span className="text-white/60"><strong>Legal retainers</strong> for wrongful arrest defense</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C] mt-1 flex-shrink-0" />
                  <span className="text-white/60"><strong>Emergency cash</strong> for rent, groceries, and bills</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C] mt-1 flex-shrink-0" />
                  <span className="text-white/60"><strong>Bail assistance</strong> for those who can't afford to wait in jail</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C] mt-1 flex-shrink-0" />
                  <span className="text-white/60"><strong>Free legal consultations</strong> for Premium subscribers through FairPath Legal</span>
                </li>
              </ul>

              <div className="bg-black/50 p-6 rounded-xl mb-6">
                <p className="text-[#A8F32C] font-bold text-xl mb-2">
                  FairPath Industries takes ZERO administrative fees.
                </p>
                <p className="text-white/60">
                  Our operational costs are covered by FairPath Forward, Staffing, and Legal subscription revenue.
                </p>
              </div>

              <p className="text-white/80 text-lg font-semibold text-center">
                This is for the people. Period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REVENUE ALLOCATION LOGIC */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <DollarSign className="w-12 h-12 text-[#A8F32C] mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Automatic Revenue Allocation</h2>
            <p className="text-xl text-white/60">20% of every dollar we make goes straight to the Impact Fund</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-[#EF4444]/10 to-transparent p-6 rounded-2xl border border-[#EF4444]/30">
              <h3 className="text-lg font-bold mb-2 text-[#EF4444]">Police The Police Premium</h3>
              <div className="text-3xl font-bold mb-2">$4.99<span className="text-sm text-white/40">/mo</span></div>
              <div className="text-sm text-white/60 mb-4">$1.00 → Impact Fund (20%)</div>
              <div className="text-xs text-white/40">At 10,000 users = $120k/year to fund</div>
            </div>

            <div className="bg-gradient-to-br from-[#A855F7]/10 to-transparent p-6 rounded-2xl border border-[#A855F7]/30">
              <h3 className="text-lg font-bold mb-2 text-[#A855F7]">FairPath Legal Lawyer Fees</h3>
              <div className="text-3xl font-bold mb-2">$20<span className="text-sm text-white/40">/mo</span></div>
              <div className="text-sm text-white/60 mb-4">$4.00 → Impact Fund (20%)</div>
              <div className="text-xs text-white/40">At 500 lawyers = $24k/year to fund</div>
            </div>

            <div className="bg-gradient-to-br from-[#3B82F6]/10 to-transparent p-6 rounded-2xl border border-[#3B82F6]/30">
              <h3 className="text-lg font-bold mb-2 text-[#3B82F6]">FairPath Staffing Placements</h3>
              <div className="text-3xl font-bold mb-2">$1,500<span className="text-sm text-white/40">/hire</span></div>
              <div className="text-sm text-white/60 mb-4">$300 → Impact Fund (20%)</div>
              <div className="text-xs text-white/40">At 100 hires/mo = $360k/year to fund</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent p-8 rounded-2xl border border-[#A8F32C]/30 text-center">
            <h3 className="text-2xl font-bold mb-4">Projected Annual Impact Fund</h3>
            <div className="text-5xl font-bold text-[#A8F32C] mb-2">$504,000</div>
            <p className="text-white/60">
              20% of all FairPath revenue automatically allocated to help those who need it most
            </p>
          </div>
        </div>
      </section>

      {/* GRANT REQUEST SYSTEM WITH PRO USER VOTING */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1F1F1F]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Users className="w-12 h-12 text-[#A8F32C] mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Community Grant System</h2>
            <p className="text-xl text-white/60 mb-4">
              When the fund reaches <span className="text-[#A8F32C] font-bold">$15,000</span>, justice-impacted people can request grants
            </p>
            <p className="text-white/40 text-sm">
              Premium subscribers vote to approve or deny. Democracy for the people, by the people.
            </p>
          </div>

          {/* Current Fund Status */}
          <div className="bg-gradient-to-br from-[#A8F32C]/10 to-transparent p-8 rounded-2xl border border-[#A8F32C]/30 mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">Current Fund Status</h3>
              <span className="text-sm text-white/60">Target: $15,000</span>
            </div>
            <div className="relative h-8 bg-black rounded-full overflow-hidden mb-4">
              <div 
                className="absolute h-full bg-gradient-to-r from-[#A8F32C] to-[#8CD423] transition-all duration-500"
                style={{ width: `${(balance / 15000) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#A8F32C] font-bold">${balance.toLocaleString()}</span>
              <span className="text-white/60">${(15000 - balance).toLocaleString()} to go</span>
            </div>
            {balance >= 15000 ? (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 bg-[#A8F32C]/20 px-4 py-2 rounded-full mb-4">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C]" />
                  <span className="text-[#A8F32C] font-bold">Grant requests now OPEN!</span>
                </div>
              </div>
            ) : (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-bold">Building the fund...</span>
                </div>
              </div>
            )}
          </div>

          {/* Active Grant Requests */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">Active Grant Requests</h3>
            
            {balance >= 15000 ? (
              <div className="space-y-6">
                {/* Grant Request 1 */}
                <div className="bg-[#1F1F1F] p-8 rounded-2xl border border-white/10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold mb-2">Marcus J. - Legal Defense Fund</h4>
                      <p className="text-white/60 mb-4">
                        Requesting $500 for legal representation after wrongful arrest. Evidence from Police The Police app shows officer misconduct.
                      </p>
                      <div className="flex gap-4 text-sm text-white/40">
                        <span>Posted: 2 days ago</span>
                        <span>Expires: 5 days</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#A8F32C]">$500</div>
                      <div className="text-xs text-white/40">requested</div>
                    </div>
                  </div>

                  {/* Voting Progress */}
                  <div className="bg-black/50 p-6 rounded-xl mb-4">
                    <div className="flex justify-between mb-3">
                      <span className="text-sm text-white/60">Community Vote</span>
                      <span className="text-sm font-bold">87 / 100 votes needed</span>
                    </div>
                    <div className="relative h-6 bg-black rounded-full overflow-hidden mb-4">
                      <div className="absolute h-full bg-gradient-to-r from-[#10B981] to-[#A8F32C] w-[87%]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="w-5 h-5 text-[#10B981]" />
                        <span className="font-bold text-[#10B981]">73 Approve</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ThumbsDown className="w-5 h-5 text-[#EF4444]" />
                        <span className="font-bold text-[#EF4444]">14 Deny</span>
                      </div>
                    </div>
                  </div>

                  {/* Vote Buttons (Premium Users Only) */}
                  <div className="flex gap-4">
                    <Button className="flex-1 bg-[#10B981] hover:bg-[#059669]">
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Approve Grant
                    </Button>
                    <Button variant="outline" className="flex-1 border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white">
                      <ThumbsDown className="w-4 h-4 mr-2" />
                      Deny
                    </Button>
                  </div>
                  <p className="text-center text-xs text-white/40 mt-3">
                    <span className="text-[#EF4444]">Premium users only.</span> Sign up for Premium to vote on grants.
                  </p>
                </div>

                {/* Grant Request 2 */}
                <div className="bg-[#1F1F1F] p-8 rounded-2xl border border-white/10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-bold mb-2">Keisha T. - Premium Sponsorship</h4>
                      <p className="text-white/60 mb-4">
                        Requesting 1-year Premium sponsorship ($60) for cloud storage. Working activist documenting community policing issues.
                      </p>
                      <div className="flex gap-4 text-sm text-white/40">
                        <span>Posted: 1 day ago</span>
                        <span>Expires: 6 days</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#A8F32C]">$60</div>
                      <div className="text-xs text-white/40">requested</div>
                    </div>
                  </div>

                  {/* Voting Progress */}
                  <div className="bg-black/50 p-6 rounded-xl mb-4">
                    <div className="flex justify-between mb-3">
                      <span className="text-sm text-white/60">Community Vote</span>
                      <span className="text-sm font-bold">45 / 100 votes needed</span>
                    </div>
                    <div className="relative h-6 bg-black rounded-full overflow-hidden mb-4">
                      <div className="absolute h-full bg-gradient-to-r from-[#10B981] to-[#A8F32C] w-[45%]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="w-5 h-5 text-[#10B981]" />
                        <span className="font-bold text-[#10B981]">42 Approve</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ThumbsDown className="w-5 h-5 text-[#EF4444]" />
                        <span className="font-bold text-[#EF4444]">3 Deny</span>
                      </div>
                    </div>
                  </div>

                  {/* Vote Buttons (Premium Users Only) */}
                  <div className="flex gap-4">
                    <Button className="flex-1 bg-[#10B981] hover:bg-[#059669]">
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Approve Grant
                    </Button>
                    <Button variant="outline" className="flex-1 border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white">
                      <ThumbsDown className="w-4 h-4 mr-2" />
                      Deny
                    </Button>
                  </div>
                  <p className="text-center text-xs text-white/40 mt-3">
                    <span className="text-[#EF4444]">Premium users only.</span> Sign up for Premium to vote on grants.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-[#1F1F1F] p-12 rounded-2xl border border-white/10 text-center">
                <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-4">Grant Requests Open Soon</h4>
                <p className="text-white/60 mb-6">
                  Once the Impact Fund reaches $15,000, justice-impacted people can request grants.
                  Premium subscribers will vote to approve or deny requests.
                </p>
                <Button 
                  size="lg"
                  onClick={() => window.scrollTo({ top: document.getElementById('donate')?.offsetTop, behavior: 'smooth' })}
                  className="bg-[#A8F32C] hover:bg-[#A8F32C]/80 text-black font-bold"
                >
                  Donate to Reach Threshold
                </Button>
              </div>
            )}
          </div>

          {/* How Grant System Works */}
          <div className="bg-gradient-to-br from-[#3B82F6]/10 to-transparent p-8 rounded-2xl border border-[#3B82F6]/30">
            <h3 className="text-2xl font-bold mb-6">How the Grant System Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="text-[#3B82F6] font-bold text-lg mb-2">1. Submit Request</div>
                <p className="text-white/60 text-sm">
                  Justice-impacted people submit grant requests with documentation and need justification.
                </p>
              </div>
              <div>
                <div className="text-[#3B82F6] font-bold text-lg mb-2">2. Community Votes</div>
                <p className="text-white/60 text-sm">
                  Premium subscribers vote approve/deny. Need 100 votes minimum and 75% approval to pass.
                </p>
              </div>
              <div>
                <div className="text-[#3B82F6] font-bold text-lg mb-2">3. Instant Disbursement</div>
                <p className="text-white/60 text-sm">
                  Once approved, funds are instantly released. Full transparency with public ledger.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Contribute */}
      <section id="donate" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How to Contribute</h2>
            <p className="text-xl text-white/60">Every dollar makes a difference</p>
          </div>

          {/* Donation Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* One-Time */}
            <div className="bg-[#1F1F1F] p-8 rounded-2xl border border-white/10">
              <Heart className="w-8 h-8 text-[#EF4444] mb-4" />
              <h3 className="text-xl font-bold mb-4">One-Time Donation</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Button variant="outline" className="border-white/20 hover:bg-white/10">$10</Button>
                <Button variant="outline" className="border-white/20 hover:bg-white/10">$25</Button>
                <Button variant="outline" className="border-white/20 hover:bg-white/10">$50</Button>
                <Button variant="outline" className="border-white/20 hover:bg-white/10">$100</Button>
              </div>
              <Button className="w-full bg-[#EF4444] hover:bg-[#DC2626]">
                Custom Amount
              </Button>
            </div>

            {/* Monthly */}
            <div className="bg-gradient-to-br from-[#A8F32C]/20 to-[#A8F32C]/5 p-8 rounded-2xl border-2 border-[#A8F32C]">
              <div className="flex items-center justify-between mb-4">
                <Heart className="w-8 h-8 text-[#A8F32C]" />
                <span className="text-xs bg-[#A8F32C] text-black px-2 py-1 rounded-full font-bold">RECURRING</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Monthly Donation</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Button variant="outline" className="border-[#A8F32C]/40 hover:bg-[#A8F32C]/20">$5/mo</Button>
                <Button variant="outline" className="border-[#A8F32C]/40 hover:bg-[#A8F32C]/20">$10/mo</Button>
                <Button variant="outline" className="border-[#A8F32C]/40 hover:bg-[#A8F32C]/20">$25/mo</Button>
                <Button variant="outline" className="border-[#A8F32C]/40 hover:bg-[#A8F32C]/20">$50/mo</Button>
              </div>
              <Button className="w-full bg-[#A8F32C] hover:bg-[#A8F32C]/80 text-black font-bold">
                Start Monthly
              </Button>
            </div>

            {/* Sponsor */}
            <div className="bg-[#1F1F1F] p-8 rounded-2xl border border-white/10">
              <Users className="w-8 h-8 text-[#A855F7] mb-4" />
              <h3 className="text-xl font-bold mb-4">Sponsor a User</h3>
              <p className="text-white/60 text-sm mb-4">
                Cover cloud storage for 1 user for 1 year
              </p>
              <div className="text-3xl font-bold text-[#A855F7] mb-6">$60</div>
              <Button className="w-full bg-[#A855F7] hover:bg-[#9333EA]">
                Sponsor Now
              </Button>
            </div>
          </div>

          {/* Corporate Sponsorship */}
          <div className="bg-gradient-to-br from-[#3B82F6]/10 to-black p-8 rounded-2xl border border-[#3B82F6]/30 text-center">
            <h3 className="text-2xl font-bold mb-4">Corporate Sponsorship</h3>
            <p className="text-white/60 mb-6 max-w-2xl mx-auto">
              Your organization can sponsor an entire community. Contact us for custom partnership opportunities.
            </p>
            <Button 
              size="lg"
              onClick={() => onNavigate('contact')}
              className="bg-[#3B82F6] hover:bg-[#2563EB]"
            >
              Contact Us About Sponsorship
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Reports */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1F1F1F]/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <FileText className="w-12 h-12 text-[#A8F32C] mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Transparency Reports</h2>
            <p className="text-white/60">Download full financial documentation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-black p-6 rounded-xl border border-white/10">
              <div className="text-white/40 text-sm mb-2">Latest Report</div>
              <div className="font-bold mb-4">December 2024 Audit</div>
              <Button variant="outline" className="w-full border-white/20 hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>

            <div className="bg-black p-6 rounded-xl border border-white/10">
              <div className="text-white/40 text-sm mb-2">Quarterly</div>
              <div className="font-bold mb-4">Q4 2024 Summary</div>
              <Button variant="outline" className="w-full border-white/20 hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>

            <div className="bg-black p-6 rounded-xl border border-white/10">
              <div className="text-white/40 text-sm mb-2">Annual</div>
              <div className="font-bold mb-4">2024 Impact Report</div>
              <Button variant="outline" className="w-full border-white/20 hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="text-[#A8F32C] hover:underline">
              View All Reports & Transaction History →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/60 mb-4">
            Built with purpose by{' '}
            <button onClick={() => onNavigate('home')} className="text-[#A8F32C] hover:underline">
              FairPath Industries
            </button>
          </p>
          <p className="text-white/40 text-sm">
            Dedicated to Quin Braden - our superhero 💚
          </p>
          <p className="text-[#A8F32C] font-semibold mt-4">For the people. Always.</p>
        </div>
      </footer>
    </div>
  );
}