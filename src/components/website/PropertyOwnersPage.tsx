import { ArrowRight, Home, DollarSign, Shield, CheckCircle, Calendar, TrendingUp, Users, AlertTriangle, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import Navigation from './Navigation';
import Footer from './Footer';

interface PropertyOwnersPageProps {
  onNavigate: (page: string) => void;
}

export default function PropertyOwnersPage({ onNavigate }: PropertyOwnersPageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation onNavigate={onNavigate} currentPage="property-owners" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 text-sm px-4 py-2">
              💰 Get Paid to Show Your Property
            </Badge>
            <h1 className="text-6xl lg:text-7xl mb-6 leading-tight">
              Why Rent to a <span className="text-[#A8F32C]">Returning Citizen?</span>
            </h1>
            <p className="text-2xl text-white/80 max-w-4xl mx-auto mb-4">
              Because we pay you for your time, guarantee showings, and provide the support that makes them great tenants.
            </p>
            <p className="text-xl text-white/60 max-w-3xl mx-auto mb-12">
              FairPath&rsquo;s FastTrack program isn&rsquo;t just good for society—it&rsquo;s a smart business decision. Here&rsquo;s why.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#A8F32C] hover:bg-[#8CD423] text-black text-lg px-8 py-6 h-auto"
                onClick={() => onNavigate('property-portal')}
              >
                Join FastTrack Program
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white text-lg px-8 py-6 h-auto"
                onClick={() => onNavigate('contact')}
              >
                <Phone className="mr-2 h-5 w-5" />
                Talk to Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Share Breakdown */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-4">The FastTrack Revenue Share Program</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              You get paid 60% of every FastTrack application fee. That&rsquo;s $39-$45 per applicant just for scheduling a showing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-gradient-to-br from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-8 text-center">
              <div className="w-16 h-16 bg-[#A8F32C] rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-black" />
              </div>
              <div className="text-4xl text-[#A8F32C] mb-2">60%</div>
              <div className="text-lg mb-2">Revenue Share</div>
              <div className="text-sm text-white/60">
                You keep $39-$45 per application (depending on user tier)
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-8 text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-500" />
              </div>
              <div className="text-4xl text-blue-500 mb-2">45 Days</div>
              <div className="text-lg mb-2">Payout Schedule</div>
              <div className="text-sm text-white/60">
                Get paid every 45 days or after 20 applications (whichever comes first)
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-8 text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
              <div className="text-4xl text-purple-500 mb-2">$800+</div>
              <div className="text-lg mb-2">Avg Monthly Earnings</div>
              <div className="text-sm text-white/60">
                Based on 20 FastTrack applications per property per month
              </div>
            </Card>
          </div>

          {/* How It Works */}
          <Card className="bg-white/5 border-white/10 p-8 mb-8">
            <h3 className="text-3xl mb-6 text-center">How the Revenue Share Works</h3>
            
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white/5 rounded-lg p-6">
                <h4 className="text-xl mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-[#A8F32C] rounded-full flex items-center justify-center text-black font-bold">1</span>
                  Applicant Pays FastTrack Fee
                </h4>
                <div className="ml-10 space-y-2 text-white/80">
                  <p>• <strong>Free users:</strong> $75</p>
                  <p>• <strong>FairPath+ users:</strong> $70</p>
                  <p>• <strong>FairPath Pro users:</strong> $65</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-6">
                <h4 className="text-xl mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-[#A8F32C] rounded-full flex items-center justify-center text-black font-bold">2</span>
                  We Process Background Check
                </h4>
                <div className="ml-10 text-white/80">
                  <p>• SingleKey screening costs us $17.99 (bulk pricing for 500+ checks/month)</p>
                  <p>• Professional credit, criminal, and rental history check</p>
                  <p>• Results sent to you within 24-48 hours</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-6">
                <h4 className="text-xl mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-[#A8F32C] rounded-full flex items-center justify-center text-black font-bold">3</span>
                  You Get 60% Revenue Share
                </h4>
                <div className="ml-10 space-y-3">
                  <div className="bg-black/30 rounded p-4">
                    <div className="font-mono text-sm space-y-1">
                      <div className="flex justify-between">
                        <span className="text-white/60">Application Fee (example: Free tier)</span>
                        <span>$75.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">- Screening Cost (SingleKey)</span>
                        <span className="text-red-400">-$17.99</span>
                      </div>
                      <div className="border-t border-white/10 my-2"></div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Net Revenue</span>
                        <span>$57.01</span>
                      </div>
                      <div className="flex justify-between text-[#A8F32C] font-bold">
                        <span>Your Share (60%)</span>
                        <span>$34.21</span>
                      </div>
                      <div className="flex justify-between text-white/60">
                        <span>Platform Fee (40%)</span>
                        <span>$22.80</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-white/60">
                    * Higher tier users = Higher revenue share for you ($42 for Plus, $28.21 for Pro)
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent rounded-lg p-6 border border-[#A8F32C]/30">
                <h4 className="text-xl mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-[#A8F32C] rounded-full flex items-center justify-center text-black font-bold">4</span>
                  Get Paid Every 45 Days
                </h4>
                <div className="ml-10 text-white/80">
                  <p className="mb-2">We pay out via direct deposit (ACH) either:</p>
                  <p>• <strong>Every 45 days</strong> from your first FastTrack application, OR</p>
                  <p>• <strong>After 20 applications</strong> are resolved (whichever comes first)</p>
                  <p className="mt-4 text-sm text-white/60">Full payout history and 1099 tax forms available in your portal.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* The Guaranteed Showing Requirement */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl mb-4">The FastTrack Guarantee (and Requirements)</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              To earn full revenue share, you must meet these 3 simple requirements:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white/5 border-white/10 p-8">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-2xl mb-3">1. Guaranteed Showing</h3>
              <p className="text-white/70 mb-4">
                Schedule a showing within <strong>48 hours</strong> of receiving a FastTrack application. 
                This is non-negotiable and tracked in your dashboard.
              </p>
              <div className="bg-blue-500/10 rounded p-3 text-sm">
                <strong>Why:</strong> Applicants pay for guaranteed access. No-shows or ignored applications 
                hurt your compliance rating and reduce payouts.
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-8">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-2xl mb-3">2. Legitimate Denials</h3>
              <p className="text-white/70 mb-4">
                If you deny an applicant, provide a <strong>written, legitimate reason</strong> (credit score, 
                income verification, rental history, etc.). Vague or discriminatory reasons violate Fair Housing laws.
              </p>
              <div className="bg-purple-500/10 rounded p-3 text-sm">
                <strong>Why:</strong> We review all denials to ensure compliance with Fair Housing laws. 
                Patterns of discrimination will remove you from the program.
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-8">
              <div className="w-12 h-12 bg-[#A8F32C]/20 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <h3 className="text-2xl mb-3">3. Rent to 1 of 20</h3>
              <p className="text-white/70 mb-4">
                You must approve and <strong>rent to at least 1 out of every 20</strong> FastTrack applicants. 
                This ensures good faith participation in the program.
              </p>
              <div className="bg-[#A8F32C]/10 rounded p-3 text-sm">
                <strong>Why:</strong> The program exists to help people get housing. If you never approve anyone, 
                you&rsquo;re not participating in good faith.
              </div>
            </Card>
          </div>

          {/* Compliance Penalties */}
          <Card className="bg-yellow-500/10 border-yellow-500/30 p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl mb-4">What Happens if You&rsquo;re Non-Compliant?</h3>
                <div className="space-y-3 text-white/80">
                  <p>
                    <strong>Reduced Payout:</strong> Non-compliant applications receive 60% of your 60% share 
                    (effectively 36% instead of 60%). This is a significant reduction.
                  </p>
                  <p>
                    <strong>Example:</strong> Compliant application = $34.21. Non-compliant = $20.53. You lose $13.68 per violation.
                  </p>
                  <p>
                    <strong>Repeated Violations:</strong> If your compliance rate drops below 80%, you&rsquo;ll be 
                    removed from the FastTrack program and lose access to the revenue share entirely.
                  </p>
                </div>
                <div className="mt-4 p-4 bg-black/30 rounded">
                  <p className="text-sm text-white/60">
                    <strong>Good news:</strong> 94% of property owners maintain 100% compliance. It&rsquo;s easy 
                    when you just follow the rules: show the property, be honest about denials, and rent to qualified applicants.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Why Returning Citizens Make Great Tenants */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl mb-4">Why Returning Citizens Make Great Tenants</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Data shows they&rsquo;re often MORE reliable than the general population. Here&rsquo;s why:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white/5 border-white/10 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#A8F32C]/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-[#A8F32C]" />
                </div>
                <h3 className="text-2xl">Higher Retention</h3>
              </div>
              <p className="text-white/70 mb-4">
                Returning citizens stay in housing <strong>38% longer</strong> than the general renter population. 
                Why? Because they know how hard it is to find housing with a record. They don&rsquo;t take it for granted.
              </p>
              <div className="bg-[#A8F32C]/10 rounded p-4">
                <div className="text-3xl text-[#A8F32C] mb-1">14.2 months</div>
                <div className="text-sm text-white/60">Average tenancy vs 10.3 months general population</div>
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-2xl">Better Payment Rates</h3>
              </div>
              <p className="text-white/70 mb-4">
                FairPath users have <strong>stable employment</strong> (87% employed through our platform) and 
                support systems. They pay rent on time because their job, housing, and support are all connected.
              </p>
              <div className="bg-blue-500/10 rounded p-4">
                <div className="text-3xl text-blue-500 mb-1">91%</div>
                <div className="text-sm text-white/60">On-time payment rate vs 84% general population</div>
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-2xl">Ongoing Support</h3>
              </div>
              <p className="text-white/70 mb-4">
                Unlike regular tenants, FairPath users have case managers, mentors, and a support network. 
                If they hit a rough patch, we help them stay housed and employed.
              </p>
              <div className="bg-purple-500/10 rounded p-4 text-sm space-y-1">
                <p>✓ 24/7 crisis support hotline</p>
                <p>✓ Financial counseling</p>
                <p>✓ Job placement assistance</p>
                <p>✓ Conflict resolution services</p>
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="text-2xl">Pre-Screened</h3>
              </div>
              <p className="text-white/70 mb-4">
                Every FastTrack applicant goes through professional screening (SingleKey) BEFORE you meet them. 
                You get full credit, criminal, and rental history reports—better than most regular applicants provide.
              </p>
              <div className="bg-yellow-500/10 rounded p-4 text-sm space-y-1">
                <p>✓ National criminal background check</p>
                <p>✓ Credit report</p>
                <p>✓ Rental history verification</p>
                <p>✓ Income verification</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Real Property Owner Stories */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl mb-4">What Property Owners Are Saying</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 p-6">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Home className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-medium">Sarah Chen</div>
                    <div className="text-sm text-white/60">12-unit building, Chicago</div>
                  </div>
                </div>
              </div>
              <p className="text-white/80 text-sm mb-4">
                &quot;I was skeptical at first, but the revenue share convinced me to try. Now 4 of my 12 units are 
                FairPath tenants. They&rsquo;re some of my best renters—always pay on time, take care of the place. 
                Plus I made an extra $2,400 last year just from FastTrack fees.&quot;
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 text-xs">
                  100% on-time payments
                </Badge>
                <Badge className="bg-white/10 text-white/80 border-white/20 text-xs">
                  2 year avg tenancy
                </Badge>
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Home className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <div className="font-medium">Marcus Williams</div>
                    <div className="text-sm text-white/60">Property manager, 40+ units</div>
                  </div>
                </div>
              </div>
              <p className="text-white/80 text-sm mb-4">
                &quot;The screening process is better than what most applicants provide on their own. And knowing 
                they have case managers and support makes me feel safer as a landlord. If something goes wrong, 
                there&rsquo;s a whole team helping them stay housed.&quot;
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 text-xs">
                  87% retention
                </Badge>
                <Badge className="bg-white/10 text-white/80 border-white/20 text-xs">
                  $4.8K earned
                </Badge>
              </div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#A8F32C]/20 rounded-full flex items-center justify-center">
                    <Home className="w-5 h-5 text-[#A8F32C]" />
                  </div>
                  <div>
                    <div className="font-medium">Jennifer Martinez</div>
                    <div className="text-sm text-white/60">Single-family rentals</div>
                  </div>
                </div>
              </div>
              <p className="text-white/80 text-sm mb-4">
                &quot;I rent to 3 FairPath users now. The guaranteed showing requirement actually helped me—it forced 
                me to be more organized and responsive. And the extra income from FastTrack fees paid for property 
                improvements. Win-win.&quot;
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 text-xs">
                  Zero evictions
                </Badge>
                <Badge className="bg-white/10 text-white/80 border-white/20 text-xs">
                  3 years
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-12 text-center">
            <h2 className="text-4xl mb-4">Ready to Join the FastTrack Program?</h2>
            <p className="text-xl text-white/70 mb-8">
              Start earning 60% revenue share on every application. Free to join, no long-term contracts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                onClick={() => onNavigate('property-portal')}
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white"
                onClick={() => onNavigate('contact')}
              >
                <Phone className="mr-2 h-5 w-5" />
                Schedule a Call
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div>
                <div className="text-3xl text-[#A8F32C] mb-1">60%</div>
                <div className="text-sm text-white/60">Revenue Share</div>
              </div>
              <div>
                <div className="text-3xl text-[#A8F32C] mb-1">$800+</div>
                <div className="text-sm text-white/60">Avg Monthly Earnings</div>
              </div>
              <div>
                <div className="text-3xl text-[#A8F32C] mb-1">94%</div>
                <div className="text-sm text-white/60">Compliance Rate</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
