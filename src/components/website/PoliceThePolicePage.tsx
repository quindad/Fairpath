import { ArrowRight, Video, Cloud, Users, Scale, AlertCircle, Shield, Download, Heart, CheckCircle, X, Sparkles, FileText, Eye, Bell } from 'lucide-react';
import { Button } from '../ui/button';

interface PoliceThePolicePageProps {
  onNavigate: (page: string) => void;
}

export default function PoliceThePolicePage({ onNavigate }: PoliceThePolicePageProps) {
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
              <button onClick={() => onNavigate('service-legal')} className="text-white/60 hover:text-white transition-colors">FairPath Legal</button>
              <button onClick={() => onNavigate('impact-fund')} className="text-white/60 hover:text-white transition-colors">Impact Fund</button>
              <Button 
                onClick={() => window.open('https://apps.apple.com', '_blank')}
                className="bg-[#EF4444] hover:bg-[#DC2626] text-white"
              >
                Download App
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#EF4444]/10 to-black">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#EF4444]/20 border border-[#EF4444]/30 px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4 text-[#EF4444]" />
            <span className="text-sm text-[#EF4444]">A FairPath Industries Initiative</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-[#EF4444]">POLICE THE POLICE™</span>
          </h1>
          
          <p className="text-2xl sm:text-3xl text-white/80 mb-4">
            "The Body Cam for the People"
          </p>
          
          <p className="text-xl text-white/60 mb-12 max-w-3xl mx-auto">
            Record police interactions. Protect yourself. Get justice.<br />
            <span className="text-[#A8F32C] font-semibold">100% FREE. Always will be.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              className="bg-[#EF4444] hover:bg-[#DC2626] text-white text-lg px-8 py-6"
              onClick={() => window.open('https://apps.apple.com', '_blank')}
            >
              <Download className="w-5 h-5 mr-2" />
              Download on App Store
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white text-lg px-8 py-6"
              onClick={() => window.open('https://play.google.com', '_blank')}
            >
              <Download className="w-5 h-5 mr-2" />
              Get it on Google Play
            </Button>
          </div>
          
          <p className="mt-8 text-white/40 text-sm">
            Or{' '}
            <button 
              onClick={() => onNavigate('impact-fund')}
              className="text-[#A8F32C] hover:underline"
            >
              donate to the Impact Fund
            </button>
            {' '}to help keep it free for everyone
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-white/60">Four simple steps to protect yourself</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#1F1F1F] p-8 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-[#EF4444]/20 rounded-xl flex items-center justify-center mb-6">
                <Video className="w-6 h-6 text-[#EF4444]" />
              </div>
              <div className="text-[#EF4444] font-bold text-lg mb-2">1. TAP "RECORD NOW"</div>
              <p className="text-white/60">One button starts recording, locks GPS, begins cloud upload.</p>
            </div>
            
            <div className="bg-[#1F1F1F] p-8 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-[#EF4444]/20 rounded-xl flex items-center justify-center mb-6">
                <AlertCircle className="w-6 h-6 text-[#EF4444]" />
              </div>
              <div className="text-[#EF4444] font-bold text-lg mb-2">2. EMERGENCY CONTACTS ALERTED</div>
              <p className="text-white/60">Your chosen contacts receive instant push + SMS notifications.</p>
            </div>
            
            <div className="bg-[#1F1F1F] p-8 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-[#EF4444]/20 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-[#EF4444]" />
              </div>
              <div className="text-[#EF4444] font-bold text-lg mb-2">3. COMMUNITY JOINS IN</div>
              <p className="text-white/60">People within 2 miles can record additional angles.</p>
            </div>
            
            <div className="bg-[#1F1F1F] p-8 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-[#A855F7]/20 rounded-xl flex items-center justify-center mb-6">
                <Scale className="w-6 h-6 text-[#A855F7]" />
              </div>
              <div className="text-[#EF4444] font-bold text-lg mb-2">4. CONNECT TO LEGAL HELP</div>
              <p className="text-white/60">Direct link to FairPath Legal attorneys for free consultation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1F1F1F]/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-white/60">Everything you need to stay protected</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-black p-8 rounded-2xl border border-[#EF4444]/30">
              <Video className="w-8 h-8 text-[#EF4444] mb-4" />
              <h3 className="text-xl font-bold mb-2">Instant Recording</h3>
              <p className="text-white/60">One tap to start recording with GPS lock and timestamp.</p>
            </div>
            
            <div className="bg-black p-8 rounded-2xl border border-[#EF4444]/30">
              <Cloud className="w-8 h-8 text-[#EF4444] mb-4" />
              <h3 className="text-xl font-bold mb-2">Cloud Backup</h3>
              <p className="text-white/60">Evidence automatically saved to secure cloud. Can't be deleted by anyone.</p>
            </div>
            
            <div className="bg-black p-8 rounded-2xl border border-[#EF4444]/30">
              <Users className="w-8 h-8 text-[#EF4444] mb-4" />
              <h3 className="text-xl font-bold mb-2">Community Witnesses</h3>
              <p className="text-white/60">Multi-angle recording from nearby users creates complete timeline.</p>
            </div>
            
            <div className="bg-black p-8 rounded-2xl border border-[#EF4444]/30">
              <Scale className="w-8 h-8 text-[#A855F7] mb-4" />
              <h3 className="text-xl font-bold mb-2">Know Your Rights</h3>
              <p className="text-white/60">State-specific legal information and what to say during stops.</p>
            </div>
            
            <div className="bg-black p-8 rounded-2xl border border-[#EF4444]/30">
              <Scale className="w-8 h-8 text-[#A855F7] mb-4" />
              <h3 className="text-xl font-bold mb-2">FairPath Legal Connection</h3>
              <p className="text-white/60">Instant access to verified attorneys. FREE initial consultations.</p>
            </div>
            
            <div className="bg-black p-8 rounded-2xl border border-[#EF4444]/30">
              <Shield className="w-8 h-8 text-[#EF4444] mb-4" />
              <h3 className="text-xl font-bold mb-2">Panic Mode</h3>
              <p className="text-white/60">Fake shutdown screen if phone is seized. Recording continues in background.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FairPath Legal Integration */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-[#A855F7]/10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#1F1F1F] p-12 rounded-3xl border border-[#A855F7]/30">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-[#A855F7]/20 border border-[#A855F7]/30 px-4 py-2 rounded-full mb-6">
                <Scale className="w-4 h-4 text-[#A855F7]" />
                <span className="text-sm text-[#A855F7]">Seamless Integration</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Connected to FairPath Legal</h2>
              <p className="text-xl text-white/60">Complete legal support when you need it most</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-black/50 p-6 rounded-xl">
                <h3 className="font-bold mb-2 text-[#A855F7]">During Recording</h3>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li>• Connect to legal hotline button</li>
                  <li>• Send last 30 seconds to attorney</li>
                  <li>• Get real-time legal advice</li>
                  <li>• Know what to say and do</li>
                </ul>
              </div>
              
              <div className="bg-black/50 p-6 rounded-xl">
                <h3 className="font-bold mb-2 text-[#A855F7]">After Incident</h3>
                <ul className="space-y-2 text-white/60 text-sm">
                  <li>• Auto-generate legal summary</li>
                  <li>• FREE consultation with verified attorneys</li>
                  <li>• If arrested → instant lawyer notification</li>
                  <li>• If charges → expungement help</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                size="lg"
                onClick={() => onNavigate('service-legal')}
                className="bg-[#A855F7] hover:bg-[#9333EA] text-white"
              >
                Learn About FairPath Legal
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - FREE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Choose Your Protection Level</h2>
            <p className="text-xl text-white/60">100% FREE forever. Upgrade for unlimited storage & advanced features.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* FREE TIER */}
            <div className="bg-gradient-to-br from-[#A8F32C]/10 to-transparent p-8 rounded-3xl border-2 border-[#A8F32C]/30">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-3xl font-bold">FREE</h3>
                  <span className="text-xs bg-[#A8F32C] text-black px-3 py-1 rounded-full font-bold">ALWAYS FREE</span>
                </div>
                <div className="text-4xl font-bold text-[#A8F32C] mb-2">$0<span className="text-lg text-white/40">/month</span></div>
                <p className="text-white/60">Record. Stream. Go viral. No credit card required.</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C] mt-0.5 flex-shrink-0" />
                  <span className="text-white/80"><strong>Instant live recording</strong> with GPS lock</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C] mt-0.5 flex-shrink-0" />
                  <span className="text-white/80"><strong>Live stream</strong> to go viral instantly</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C] mt-0.5 flex-shrink-0" />
                  <span className="text-white/80">Emergency contact alerts (push + SMS)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C] mt-0.5 flex-shrink-0" />
                  <span className="text-white/80">Community witness network (2-mile radius)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C] mt-0.5 flex-shrink-0" />
                  <span className="text-white/80">Multi-angle incident timeline</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C] mt-0.5 flex-shrink-0" />
                  <span className="text-white/80">Know Your Rights library (all 50 states)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C] mt-0.5 flex-shrink-0" />
                  <span className="text-white/80">FairPath Legal connection</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C] mt-0.5 flex-shrink-0" />
                  <span className="text-white/80">Panic shutdown mode</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-white/30 mt-0.5 flex-shrink-0" />
                  <span className="text-white/40 line-through">Cloud storage (video saved permanently)</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-white/30 mt-0.5 flex-shrink-0" />
                  <span className="text-white/40 line-through">AI officer behavior analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-white/30 mt-0.5 flex-shrink-0" />
                  <span className="text-white/40 line-through">Auto-generated legal summary PDFs</span>
                </li>
              </ul>

              <Button 
                size="lg"
                className="w-full bg-[#A8F32C] hover:bg-[#A8F32C]/80 text-black font-bold"
                onClick={() => window.open('https://apps.apple.com', '_blank')}
              >
                Download Free App
              </Button>
              <p className="text-center text-xs text-white/40 mt-3">
                *FREE tier streams live but doesn't save to cloud. Upgrade for permanent storage.
              </p>
            </div>

            {/* PREMIUM TIER */}
            <div className="bg-gradient-to-br from-[#EF4444]/20 to-transparent p-8 rounded-3xl border-2 border-[#EF4444] relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-[#EF4444] text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  MOST POPULAR
                </span>
              </div>

              <div className="mb-6 mt-2">
                <h3 className="text-3xl font-bold mb-2">PREMIUM</h3>
                <div className="text-4xl font-bold text-[#EF4444] mb-2">$4.99<span className="text-lg text-white/40">/month</span></div>
                <p className="text-white/60">For power users, activists, and journalists.</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#EF4444] mt-0.5 flex-shrink-0" />
                  <span className="text-white"><strong className="text-[#EF4444]">Everything in FREE</strong> plus...</span>
                </li>
                <li className="flex items-start gap-3">
                  <Cloud className="w-5 h-5 text-[#EF4444] mt-0.5 flex-shrink-0" />
                  <span className="text-white/90"><strong>Unlimited</strong> cloud incident storage</span>
                </li>
                <li className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#EF4444] mt-0.5 flex-shrink-0" />
                  <span className="text-white/90"><strong>AI breakdown</strong> of officer behavior</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#EF4444] mt-0.5 flex-shrink-0" />
                  <span className="text-white/90"><strong>Auto-incident legal summary</strong> (exportable PDF)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Scale className="w-5 h-5 text-[#EF4444] mt-0.5 flex-shrink-0" />
                  <span className="text-white/90">Priority <strong>FairPath Legal panel</strong> access</span>
                </li>
                <li className="flex items-start gap-3">
                  <Bell className="w-5 h-5 text-[#EF4444] mt-0.5 flex-shrink-0" />
                  <span className="text-white/90"><strong>Automatic attorney notifications</strong> in your state</span>
                </li>
                <li className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-[#EF4444] mt-0.5 flex-shrink-0" />
                  <span className="text-white/90"><strong>Blur bystanders + faces</strong> (privacy controls)</span>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[#EF4444] mt-0.5 flex-shrink-0" />
                  <span className="text-white/90"><strong>Exportable PDF timelines</strong> (multiple formats)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#EF4444] mt-0.5 flex-shrink-0" />
                  <span className="text-white/90"><strong>Badge number</strong> auto-detection (OCR)</span>
                </li>
              </ul>

              <Button 
                size="lg"
                className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold"
                onClick={() => window.open('https://apps.apple.com', '_blank')}
              >
                Start 7-Day Free Trial
              </Button>
              <p className="text-center text-xs text-white/40 mt-3">Cancel anytime. No hidden fees.</p>
            </div>
          </div>

          {/* Impact Fund CTA */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-[#A8F32C]/10 to-transparent p-8 rounded-2xl border border-[#A8F32C]/30 text-center">
              <Heart className="w-12 h-12 text-[#A8F32C] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Can't Afford Premium?</h3>
              <p className="text-white/60 mb-6">
                The <strong>Impact Fund</strong> sponsors Premium subscriptions for those who need it most.<br />
                Apply for sponsorship or donate to help others.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => onNavigate('impact-fund')}
                  className="bg-[#A8F32C] hover:bg-[#A8F32C]/80 text-black font-bold"
                >
                  Apply for Sponsorship
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => onNavigate('impact-fund')}
                  className="border-[#A8F32C] text-[#A8F32C] hover:bg-[#A8F32C] hover:text-black"
                >
                  Donate to Fund
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Full Circle */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1F1F1F]/30">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Completing the Circle</h2>
          <p className="text-xl text-white/60 mb-12">
            Police The Police is part of FairPath's complete ecosystem for second chances
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-black p-6 rounded-xl border border-[#EF4444]/30">
              <div className="text-[#EF4444] font-bold text-lg mb-2">1. Prevention</div>
              <p className="text-white/60 text-sm">Police The Police prevents wrongful arrests with evidence</p>
            </div>
            
            <div className="bg-black p-6 rounded-xl border border-[#A855F7]/30">
              <div className="text-[#A855F7] font-bold text-lg mb-2">2. Legal Help</div>
              <p className="text-white/60 text-sm">FairPath Legal clears existing records through expungement</p>
            </div>
            
            <div className="bg-black p-6 rounded-xl border border-[#A8F32C]/30">
              <div className="text-[#A8F32C] font-bold text-lg mb-2">3. Reentry Support</div>
              <p className="text-white/60 text-sm">Friend A Felon provides jobs, housing, and community</p>
            </div>
          </div>
          
          <p className="mt-12 text-white/80 text-lg">
            <span className="text-[#A8F32C] font-semibold">Full circle of support.</span> Prevention → Legal → Reentry.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-[#EF4444]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Protect Yourself?</h2>
          <p className="text-xl text-white/60 mb-12">
            No account required. Start recording in 60 seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-[#EF4444] hover:bg-[#DC2626] text-white text-lg px-8 py-6"
              onClick={() => window.open('https://apps.apple.com', '_blank')}
            >
              <Download className="w-5 h-5 mr-2" />
              Download on App Store
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white text-lg px-8 py-6"
              onClick={() => window.open('https://play.google.com', '_blank')}
            >
              <Download className="w-5 h-5 mr-2" />
              Get it on Google Play
            </Button>
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
          <p className="text-[#EF4444] font-semibold mt-4">For the people. Always.</p>
        </div>
      </footer>
    </div>
  );
}