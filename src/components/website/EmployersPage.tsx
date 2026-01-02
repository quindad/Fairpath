import { ArrowRight, DollarSign, TrendingUp, Users, Shield, CheckCircle, Building2, Clock, Award } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import Navigation from './Navigation';
import Footer from './Footer';
import WOTCCalculatorPublic from '../home/WOTCCalculatorPublic';
import JobPostingComparison from './JobPostingComparison';

interface EmployersPageProps {
  onNavigate: (page: string) => void;
}

export default function EmployersPage({ onNavigate }: EmployersPageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation onNavigate={onNavigate} currentPage="employers" />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 text-sm px-4 py-2">
            💼 For Employers
          </Badge>
          <h1 className="text-6xl lg:text-7xl mb-6 leading-tight">
            Hire Great Employees.<br/>
            <span className="text-[#A8F32C]">Get $9,600 Tax Credits.</span>
          </h1>
          <p className="text-2xl text-white/80 max-w-4xl mx-auto mb-12">
            FairPath Staffing makes hiring returning citizens the smartest business decision you&rsquo;ll make this year.
          </p>
        </div>
      </section>

      {/* WOTC Calculator */}
      <WOTCCalculatorPublic onGetStarted={() => onNavigate('staffing-crm')} />

      {/* Why FairPath Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl mb-4">Why FairPath Staffing is Different</h2>
            <p className="text-xl text-white/60">
              We solve the WHOLE problem, not just placement
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="w-12 h-12 bg-[#A8F32C]/20 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <h3 className="text-2xl mb-3">Automated WOTC Processing</h3>
              <p className="text-white/70 mb-4">
                We handle all IRS paperwork (Forms 8850, 9061, 9062) automatically. You just hire—we handle the tax credits.
              </p>
              <ul className="space-y-2 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#A8F32C]" />
                  Pre-qualified WOTC candidates only
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#A8F32C]" />
                  Automated IRS filing within 28 days
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#A8F32C]" />
                  Real-time credit tracking dashboard
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-2xl mb-3">Complete Support System</h3>
              <p className="text-white/70 mb-4">
                We don&rsquo;t just place workers—we ensure they succeed. Housing, transportation, support services all handled.
              </p>
              <ul className="space-y-2 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Housing secured before Day 1
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  Transportation arranged
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  24/7 crisis support hotline
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-2xl mb-3">92% Retention Rate</h3>
              <p className="text-white/70 mb-4">
                Our placements stay 34% longer than industry average. Why? Because we solve housing + support, not just employment.
              </p>
              <ul className="space-y-2 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  92% still employed at 12 months
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  25% lower turnover than competitors
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-500" />
                  Ongoing case management included
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="text-2xl mb-3">Release Alerts</h3>
              <p className="text-white/70 mb-4">
                Get notified when qualified candidates are releasing from prison. Pre-screen and hire before they even get out.
              </p>
              <ul className="space-y-2 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-500" />
                  90-day pre-release alerts
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-500" />
                  FairPath Forward training inside
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-yellow-500" />
                  Day-1 ready workers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Job Posting Comparison */}
      <JobPostingComparison onNavigate={onNavigate} />

      <Footer onNavigate={onNavigate} />
    </div>
  );
}