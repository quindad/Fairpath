import React, { useState } from 'react';
import { Menu, X, ChevronRight, Users, Building, Briefcase, GraduationCap, Scale, Shield, DollarSign, TrendingUp, Heart, CheckCircle, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onNavigateToStaffingCRM: () => void;
}

export function HomePage({ onNavigateToStaffingCRM }: HomePageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    {
      name: 'Friend A Felon',
      color: '#A8F32C',
      icon: Users,
      description: 'Mobile app connecting justice-impacted people with jobs, housing, resources, and community support',
      features: ['Job Matching', 'Housing Search', 'Resource Directory', 'Peer Support Network'],
      status: 'Live App',
    },
    {
      name: 'FairPath Forward',
      color: '#3B82F6',
      icon: GraduationCap,
      description: 'Prison reentry program with pre-release job training, placement, and post-release support',
      features: ['Pre-Release Training', 'Job Placement', 'Release Date Tracking', 'Transition Support'],
      status: 'Active Program',
    },
    {
      name: 'FairPath Staffing',
      color: '#FF8C42',
      icon: Briefcase,
      description: 'Mission-focused AI-automated staffing agency connecting employers with justice-impacted talent',
      features: ['WOTC Tax Credits ($9,600/hire)', 'Automated Matching', 'Employer CRM', 'Compliance Support'],
      status: 'Employer Portal Available',
      action: 'Access CRM',
    },
    {
      name: 'FairPath Simulations',
      color: '#EF4444',
      icon: Building,
      description: 'VR/AR job training simulations for high-demand industries (construction, logistics, healthcare)',
      features: ['VR Training Modules', 'Skill Certification', 'Safety Training', 'Industry Partnerships'],
      status: 'In Development',
    },
    {
      name: 'FairPath Legal',
      color: '#A855F7',
      icon: Scale,
      description: 'AI-powered expungement eligibility checker and legal resource platform',
      features: ['Eligibility Scanner', 'Auto-Form Generation', 'Legal Directory', 'Progress Tracking'],
      status: 'Coming Soon',
    },
    {
      name: 'Police The Police',
      color: '#EF4444',
      icon: Shield,
      description: 'Police accountability app with incident reporting, legal resources, and community watchdog features',
      features: ['Incident Reporting', 'Live Recording', 'Legal Resources', 'Community Alerts'],
      status: 'Premium $4.99/mo',
      pricing: true,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-[#A8F32C]/20 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#A8F32C] rounded-xl flex items-center justify-center">
                <span className="text-black font-bold text-xl">FAF</span>
              </div>
              <div>
                <h1 className="text-xl">Friend A Felon</h1>
                <p className="text-xs text-[#A8F32C]">by FairPath Industries</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#services" className="text-white/60 hover:text-white transition-colors">Services</a>
              <a href="#impact-fund" className="text-white/60 hover:text-white transition-colors">Impact Fund</a>
              <a href="#how-it-works" className="text-white/60 hover:text-white transition-colors">How It Works</a>
              <button
                onClick={onNavigateToStaffingCRM}
                className="px-4 py-2 bg-[#FF8C42] text-black rounded-lg hover:bg-[#FF8C42]/90 transition-colors"
              >
                Employer Login
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-3">
              <a href="#services" className="block text-white/60 hover:text-white transition-colors">Services</a>
              <a href="#impact-fund" className="block text-white/60 hover:text-white transition-colors">Impact Fund</a>
              <a href="#how-it-works" className="block text-white/60 hover:text-white transition-colors">How It Works</a>
              <button
                onClick={onNavigateToStaffingCRM}
                className="w-full px-4 py-2 bg-[#FF8C42] text-black rounded-lg hover:bg-[#FF8C42]/90 transition-colors"
              >
                Employer Login
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl mb-6">
            Building A Comprehensive
            <br />
            <span className="text-[#A8F32C]">Reentry Ecosystem</span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
            Six integrated services connecting justice-impacted people with jobs, housing, resources, and community support—with 20% of all revenue funding real community impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#services"
              className="px-8 py-4 bg-[#A8F32C] text-black rounded-xl hover:bg-[#A8F32C]/90 transition-colors inline-flex items-center justify-center gap-2"
            >
              Explore Services
              <ChevronRight className="w-5 h-5" />
            </a>
            <a
              href="#impact-fund"
              className="px-8 py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2 border border-white/20"
            >
              Impact Fund
              <Heart className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl mb-4">The FairPath Ecosystem</h3>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Six services working together to break the cycle of recidivism and build safer communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-black border border-white/10 rounded-xl p-6 hover:border-[#A8F32C]/50 transition-all"
                style={{ borderTopColor: service.color, borderTopWidth: '3px' }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${service.color}20` }}
                >
                  <service.icon style={{ color: service.color }} className="w-6 h-6" />
                </div>

                <h4 className="text-xl mb-2" style={{ color: service.color }}>
                  {service.name}
                </h4>

                <p className="text-white/60 text-sm mb-4">{service.description}</p>

                <div className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#A8F32C] flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10">
                  {service.action ? (
                    <button
                      onClick={onNavigateToStaffingCRM}
                      className="w-full px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                      style={{ backgroundColor: service.color, color: '#000' }}
                    >
                      {service.action}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div
                      className="text-center py-2 px-3 rounded-lg text-sm"
                      style={{ backgroundColor: `${service.color}20`, color: service.color }}
                    >
                      {service.status}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-white/60 text-sm">
              <span className="text-[#A8F32C]">Note:</span> This website is a placeholder. The real products are CRM web apps for employers, property owners, and resource centers currently in development.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Fund Section */}
      <section id="impact-fund" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl mb-4">
              The <span className="text-[#A8F32C]">Impact Fund</span>
            </h3>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              20% of ALL revenue from every FairPath service automatically funds real community work
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* How It Works */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="w-8 h-8 text-[#A8F32C]" />
                <h4 className="text-2xl">How It Works</h4>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-[#A8F32C]/20 text-[#A8F32C] rounded-full flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <div className="text-white mb-1">20% Auto-Contribution</div>
                    <div className="text-white/60 text-sm">
                      Every dollar earned from all 6 services → 20¢ goes to Impact Fund
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-[#A8F32C]/20 text-[#A8F32C] rounded-full flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <div className="text-white mb-1">$15,000 Threshold</div>
                    <div className="text-white/60 text-sm">
                      When fund reaches $15K, grants open for justice-impacted people
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-[#A8F32C]/20 text-[#A8F32C] rounded-full flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <div className="text-white mb-1">Premium Users Vote</div>
                    <div className="text-white/60 text-sm">
                      Police The Police Premium subscribers vote to approve or deny grant requests
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-[#A8F32C]/20 text-[#A8F32C] rounded-full flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <div className="text-white mb-1">Real Impact</div>
                    <div className="text-white/60 text-sm">
                      Grants distributed for legal fees, emergency rent/food, bail assistance
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What We Fund */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-[#A8F32C]" />
                <h4 className="text-2xl">What We Fund</h4>
              </div>

              <div className="space-y-4">
                <div className="bg-black/50 border border-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Scale className="w-5 h-5 text-[#A855F7]" />
                    <div className="text-white">Legal Retainers</div>
                  </div>
                  <div className="text-white/60 text-sm">
                    Expungement lawyers, public defenders, appeals representation
                  </div>
                </div>

                <div className="bg-black/50 border border-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="w-5 h-5 text-[#A8F32C]" />
                    <div className="text-white">Emergency Cash Assistance</div>
                  </div>
                  <div className="text-white/60 text-sm">
                    Rent payments, food/groceries, utilities, transportation
                  </div>
                </div>

                <div className="bg-black/50 border border-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-[#EF4444]" />
                    <div className="text-white">Bail Assistance</div>
                  </div>
                  <div className="text-white/60 text-sm">
                    Bail bond payments to keep people out of jail pre-trial
                  </div>
                </div>

                <div className="bg-black/50 border border-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-[#3B82F6]" />
                    <div className="text-white">Reentry Support</div>
                  </div>
                  <div className="text-white/60 text-sm">
                    Job training, certifications, work tools, interview clothing
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Fund Status */}
          <div className="bg-gradient-to-r from-[#A8F32C]/10 to-[#3B82F6]/10 border border-[#A8F32C]/30 rounded-xl p-8">
            <div className="text-center mb-6">
              <div className="text-5xl text-[#A8F32C] mb-2">$8,247</div>
              <div className="text-white/60">Current Impact Fund Balance</div>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="bg-black/50 rounded-full h-4 mb-2 overflow-hidden">
                <div
                  className="bg-[#A8F32C] h-full rounded-full transition-all"
                  style={{ width: '55%' }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-white/60">
                <span>$0</span>
                <span>$6,753 until grants open</span>
                <span>$15,000</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl mb-4">How It All Works Together</h3>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              A closed-loop ecosystem where every service strengthens the others
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-black border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-[#A8F32C]/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#A8F32C]" />
              </div>
              <h4 className="text-xl mb-3">For Job Seekers</h4>
              <div className="text-white/60 text-sm space-y-2">
                <p>• Download Friend A Felon app</p>
                <p>• Create profile with skills & goals</p>
                <p>• Get matched with WOTC-eligible jobs</p>
                <p>• Access housing, resources, support</p>
                <p>• Apply for Impact Fund grants</p>
              </div>
            </div>

            <div className="bg-black border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-[#FF8C42]/20 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-[#FF8C42]" />
              </div>
              <h4 className="text-xl mb-3">For Employers</h4>
              <div className="text-white/60 text-sm space-y-2">
                <p>• Access FairPath Staffing CRM</p>
                <p>• See real-time talent pipeline</p>
                <p>• Calculate $9,600 WOTC tax credits</p>
                <p>• Auto-generate IRS forms</p>
                <p>• Track ROI & hiring wins</p>
              </div>
            </div>

            <div className="bg-black border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-[#3B82F6]/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-[#3B82F6]" />
              </div>
              <h4 className="text-xl mb-3">For Community</h4>
              <div className="text-white/60 text-sm space-y-2">
                <p>• 20% of revenue → Impact Fund</p>
                <p>• Premium users vote on grants</p>
                <p>• Real people get real help</p>
                <p>• Lower recidivism = safer streets</p>
                <p>• Economic growth for everyone</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl text-[#A8F32C] mb-2">70M+</div>
              <div className="text-white/60">Americans with Criminal Records</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl text-[#A8F32C] mb-2">$9,600</div>
              <div className="text-white/60">WOTC Tax Credit Per Hire</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl text-[#A8F32C] mb-2">44%</div>
              <div className="text-white/60">Recidivism Rate (We&apos;re Fixing This)</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl text-[#A8F32C] mb-2">20%</div>
              <div className="text-white/60">Revenue to Impact Fund</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#A8F32C]/10 to-[#3B82F6]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl mb-6">Ready to Make an Impact?</h3>
          <p className="text-xl text-white/60 mb-8">
            Whether you&apos;re an employer looking for talent, a justice-impacted person seeking opportunities, or a community member who wants to help—there&apos;s a place for you in the FairPath ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onNavigateToStaffingCRM}
              className="px-8 py-4 bg-[#FF8C42] text-black rounded-xl hover:bg-[#FF8C42]/90 transition-colors"
            >
              Employers: Access Staffing CRM
            </button>
            <button className="px-8 py-4 bg-[#A8F32C] text-black rounded-xl hover:bg-[#A8F32C]/90 transition-colors">
              Job Seekers: Download App
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#A8F32C] rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold">FAF</span>
                </div>
                <span className="text-white">Friend A Felon</span>
              </div>
              <p className="text-white/60 text-sm">
                Building a comprehensive reentry ecosystem to break the cycle of recidivism.
              </p>
            </div>

            <div>
              <h5 className="text-white mb-3">Services</h5>
              <div className="space-y-2 text-sm text-white/60">
                <div>Friend A Felon</div>
                <div>FairPath Forward</div>
                <div>FairPath Staffing</div>
                <div>FairPath Simulations</div>
                <div>FairPath Legal</div>
                <div>Police The Police</div>
              </div>
            </div>

            <div>
              <h5 className="text-white mb-3">Resources</h5>
              <div className="space-y-2 text-sm text-white/60">
                <div>Impact Fund</div>
                <div>How It Works</div>
                <div>For Employers</div>
                <div>For Job Seekers</div>
                <div>Community Support</div>
              </div>
            </div>

            <div>
              <h5 className="text-white mb-3">Company</h5>
              <div className="space-y-2 text-sm text-white/60">
                <div>About FairPath Industries</div>
                <div>Contact Us</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center text-white/60 text-sm">
            <p>© 2024 FairPath Industries. All rights reserved.</p>
            <p className="mt-2">Acquired company: Friend A Felon</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
