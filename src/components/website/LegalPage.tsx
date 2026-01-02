import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Scale, Brain, DollarSign, CheckCircle, FileText, 
  UserCheck, Clock, Shield, Zap, Search, Award
} from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

interface LegalPageProps {
  onNavigate: (page: string) => void;
}

export default function LegalPage({ onNavigate }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-black">
      <Navigation onNavigate={onNavigate} currentPage="service-legal" />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Hero Section */}
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-purple-500/20 text-purple-400 border-purple-500/30 text-sm px-4 py-2">
              AI-Powered Expungement Eligibility
            </Badge>
            <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
              FairPath Legal
              <br />
              <span className="text-purple-400">Clear Your Record with AI</span>
            </h1>
            <p className="text-2xl text-white/80 max-w-4xl mx-auto mb-4">
              AI instantly analyzes your criminal charges to identify expungement eligibility, 
              then connects you with verified lawyers who pay to access pre-qualified leads.
            </p>
            <p className="text-lg text-white/60 max-w-3xl mx-auto mb-12">
              100% free for people with criminal records. Lawyers pay $20/month to access qualified clients.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="bg-purple-400 text-black hover:bg-purple-500 text-lg px-8 py-6 h-auto"
                onClick={() => onNavigate('legal-checker')}
              >
                Check Your Eligibility
                <Search className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 h-auto"
                onClick={() => onNavigate('legal-lawyer-signup')}
              >
                I'm a Lawyer
              </Button>
            </div>
          </div>

          {/* How It Works for Users */}
          <div className="mb-20">
            <h2 className="text-4xl text-white mb-4 text-center">How It Works (For You)</h2>
            <p className="text-xl text-white/60 mb-12 text-center">3 simple steps to clear your record</p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#A8F32C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-8 w-8 text-[#A8F32C]" />
                </div>
                <h3 className="text-2xl text-white mb-4">1. Enter Your Charges</h3>
                <p className="text-white/70">
                  Type in your criminal charges (offense name, year, state). Our AI analyzes them against 
                  50-state expungement laws in real-time.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-2xl text-white mb-4">2. AI Checks Eligibility</h3>
                <p className="text-white/70">
                  Our AI instantly tells you if you're eligible for expungement, sealing, or record 
                  reduction. See waiting periods, costs, and next steps.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <UserCheck className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-2xl text-white mb-4">3. Connect with Lawyers</h3>
                <p className="text-white/70">
                  If eligible, we match you with verified expungement lawyers in your area. 
                  Compare prices, reviews, and book consultations—all free.
                </p>
              </div>
            </div>
          </div>

          {/* What the AI Checks */}
          <div className="mb-20">
            <div className="bg-gradient-to-br from-[#A8F32C]/20 to-transparent border border-[#A8F32C]/30 rounded-3xl p-12">
              <div className="flex items-center gap-4 mb-8">
                <Brain className="h-12 w-12 text-[#A8F32C]" />
                <div>
                  <h2 className="text-3xl text-white">What Our AI Analyzes</h2>
                  <p className="text-white/60">Instant eligibility check across all 50 states</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-[#A8F32C] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white mb-1">Offense Type & Severity</p>
                      <p className="text-white/60 text-sm">Felony vs misdemeanor, violent vs non-violent, drug offenses, etc.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-[#A8F32C] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white mb-1">Time Since Conviction</p>
                      <p className="text-white/60 text-sm">Waiting periods vary by state—we calculate exact eligibility dates</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-[#A8F32C] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white mb-1">State-Specific Laws</p>
                      <p className="text-white/60 text-sm">All 50 states have different rules—our AI knows them all</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-[#A8F32C] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white mb-1">Sentence Completion</p>
                      <p className="text-white/60 text-sm">Probation, parole, fines—all must be completed first</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-[#A8F32C] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white mb-1">Additional Convictions</p>
                      <p className="text-white/60 text-sm">Multiple charges affect eligibility—we check all of them</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-[#A8F32C] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white mb-1">Disqualifying Factors</p>
                      <p className="text-white/60 text-sm">Sex offenses, violent crimes, pending charges that block expungement</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-[#A8F32C] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white mb-1">Alternative Options</p>
                      <p className="text-white/60 text-sm">If not eligible for expungement, check for sealing, pardons, etc.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-[#A8F32C] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white mb-1">Cost & Timeline Estimates</p>
                      <p className="text-white/60 text-sm">Filing fees, lawyer costs, average processing time by county</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-[#A8F32C]/20">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                  <p className="text-white/90 mb-3">
                    <strong className="text-white">Example Result:</strong> "Your 2018 California drug possession conviction 
                    is eligible for expungement under PC 1203.4. You completed probation in 2020, so you qualify now. 
                    Filing fee: $150. Average timeline: 3-6 months."
                  </p>
                  <p className="text-white/70 text-sm">
                    Our AI gives you instant answers that would normally cost $200-500 for a lawyer consultation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits of Clearing Your Record */}
          <div className="mb-20">
            <h2 className="text-4xl text-white mb-12 text-center">Why Clear Your Record?</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-lg flex items-center justify-center">
                      <Zap className="h-6 w-6 text-[#A8F32C]" />
                    </div>
                    <CardTitle className="text-white text-xl">Employment Opportunities</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-4">
                    Most employers run background checks. An expunged record means you can legally say "no" 
                    when asked about criminal history on job applications.
                  </p>
                  <p className="text-white/60 text-sm">
                    People with expunged records earn 20-30% more on average than those with visible records.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <Shield className="h-6 w-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-white text-xl">Housing Access</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-4">
                    Landlords routinely reject applicants with criminal records. Expungement removes that barrier 
                    and opens up quality housing options.
                  </p>
                  <p className="text-white/60 text-sm">
                    75% of landlords say they'd be more likely to approve an application without a criminal record.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <Award className="h-6 w-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-white text-xl">Professional Licenses</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-4">
                    Many careers require licenses (nursing, real estate, barbering, etc.). A clean record 
                    makes it easier to get licensed and advance your career.
                  </p>
                  <p className="text-white/60 text-sm">
                    Some states automatically deny licenses for certain convictions—expungement removes that block.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-green-400" />
                    </div>
                    <CardTitle className="text-white text-xl">Peace of Mind</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 mb-4">
                    No more anxiety about background checks. No more explaining your past to every employer, 
                    landlord, or loan officer. Just move forward.
                  </p>
                  <p className="text-white/60 text-sm">
                    Expungement gives you a true second chance to rebuild your life without the past haunting you.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* For Lawyers */}
          <div className="mb-20">
            <div className="bg-gradient-to-br from-blue-500/20 to-transparent border border-blue-500/30 rounded-3xl p-12">
              <div className="flex items-center gap-4 mb-8">
                <Scale className="h-12 w-12 text-blue-400" />
                <div>
                  <h2 className="text-3xl text-white">For Expungement Lawyers</h2>
                  <p className="text-white/60">Get pre-qualified leads for $20/month</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <p className="text-4xl text-blue-400 mb-2">$20/mo</p>
                  <p className="text-white mb-2">Listing Fee</p>
                  <p className="text-sm text-white/60">Access to qualified leads in your state</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl text-blue-400 mb-2">Pre-Qualified</p>
                  <p className="text-white mb-2">Leads Only</p>
                  <p className="text-sm text-white/60">AI already confirmed eligibility</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl text-blue-400 mb-2">No Commission</p>
                  <p className="text-white mb-2">Keep 100%</p>
                  <p className="text-sm text-white/60">We don't take a cut of your fees</p>
                </div>
              </div>

              <div className="bg-black/30 rounded-xl p-6 mb-6">
                <h3 className="text-xl text-white mb-4">What You Get:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                    <p className="text-white/70">Profile in our lawyer directory with reviews</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                    <p className="text-white/70">Direct client inquiries via messaging</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                    <p className="text-white/70">AI-generated eligibility reports for each client</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                    <p className="text-white/70">Case management dashboard</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  size="lg" 
                  className="bg-blue-500 text-white hover:bg-blue-600 text-lg px-8 py-6 h-auto"
                  onClick={() => onNavigate('signup')}
                >
                  Join as a Lawyer
                  <Scale className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Pricing for Users */}
          <div className="mb-20">
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-gradient-to-br from-[#A8F32C]/20 to-transparent border border-[#A8F32C]/30 rounded-3xl p-12">
                <h2 className="text-3xl text-white mb-6">100% Free for People with Records</h2>
                <div className="mb-8">
                  <p className="text-6xl text-[#A8F32C] mb-4">$0</p>
                  <p className="text-xl text-white mb-2">Check Eligibility</p>
                  <p className="text-white/60">AI analysis, lawyer matching, consultations—all free</p>
                </div>
                <div className="bg-black/30 rounded-xl p-6 mb-8">
                  <p className="text-white/90 mb-4">
                    FairPath Legal is completely free for people trying to clear their records. 
                    We make money from lawyers who pay to access pre-qualified leads.
                  </p>
                  <p className="text-white/70">
                    <strong className="text-white">You pay the lawyer directly</strong> for their services 
                    (typically $500-$2,000 depending on complexity). But using our platform is free forever.
                  </p>
                </div>
                <Button 
                  size="lg" 
                  className="bg-[#A8F32C] text-black hover:bg-[#8CD423] text-lg px-8 py-6 h-auto"
                  onClick={() => onNavigate('signup')}
                >
                  Get Started Free
                  <FileText className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-4xl text-white mb-6">Ready to Clear Your Record?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              Find out if you're eligible in under 60 seconds. No credit card required. 
              No lawyer consultation fees. Just answers.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="bg-[#A8F32C] text-black hover:bg-[#8CD423] text-lg px-8 py-6 h-auto"
                onClick={() => onNavigate('signup')}
              >
                Check Eligibility Now
                <Search className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 h-auto"
                onClick={() => onNavigate('contact')}
              >
                Questions? Contact Us
              </Button>
            </div>
          </div>

        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}