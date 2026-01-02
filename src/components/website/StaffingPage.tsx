import { ArrowRight, Users, Briefcase, DollarSign, CheckCircle, TrendingUp, Shield, Heart } from 'lucide-react';
import { Button } from '../ui/button';

interface StaffingPageProps {
  onNavigate: (page: string) => void;
}

export default function StaffingPage({ onNavigate }: StaffingPageProps) {
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
              <button onClick={() => onNavigate('service-faf')} className="text-white/60 hover:text-white transition-colors">Friend A Felon</button>
              <button onClick={() => onNavigate('service-forward')} className="text-white/60 hover:text-white transition-colors">FairPath Forward</button>
              <Button 
                onClick={() => window.scrollTo({ top: document.getElementById('cta')?.offsetTop, behavior: 'smooth' })}
                className="bg-[#F97316] hover:bg-[#EA580C] text-white font-bold"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#F97316]/10 to-black">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#F97316]/20 border border-[#F97316]/30 px-4 py-2 rounded-full mb-6">
            <Briefcase className="w-4 h-4 text-[#F97316]" />
            <span className="text-sm text-[#F97316]">AI-Powered Staffing • Second Chance Hiring</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-[#F97316]">FAIRPATH STAFFING</span>
          </h1>
          
          <p className="text-2xl sm:text-3xl text-white/80 mb-4">
            When Felons Have Jobs, We All Have Safer Streets
          </p>
          
          <p className="text-xl text-white/60 mb-12 max-w-4xl mx-auto">
            100% automated staffing agency connecting justice-impacted people with employers who believe in second chances. 
            <span className="text-[#F97316] font-semibold"> 70% cheaper. 10x faster. Zero bias.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => window.scrollTo({ top: document.getElementById('cta')?.offsetTop, behavior: 'smooth' })}
              className="bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-lg px-8"
            >
              I Want to Hire
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => onNavigate('service-faf')}
              className="border-[#A8F32C] text-[#A8F32C] hover:bg-[#A8F32C] hover:text-black text-lg px-8"
            >
              I'm Job Seeking
            </Button>
          </div>
        </div>
      </section>

      {/* The Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1F1F1F]/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Heart className="w-12 h-12 text-[#F97316] mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Why This Matters</h2>
            <p className="text-xl text-white/60">Employment is the single biggest factor in preventing recidivism</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-[#EF4444]/10 to-transparent p-8 rounded-2xl border border-[#EF4444]/30">
              <h3 className="text-2xl font-bold mb-4 text-[#EF4444]">The Vicious Cycle</h3>
              <div className="space-y-4 text-white/70">
                <p>650,000 people are released from prison every year. Most want to work, rebuild their lives, and take care of their families.</p>
                <p>But employers won't hire them. Background checks = automatic rejection.</p>
                <p className="text-white/90 font-semibold">No job → No money → No housing → Back to survival mode → Back to prison.</p>
                <p>Half of them are re-incarcerated within 3 years. Not because they're bad people. Because the system is broken.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#10B981]/10 to-transparent p-8 rounded-2xl border border-[#10B981]/30">
              <h3 className="text-2xl font-bold mb-4 text-[#10B981]">The Solution is Simple</h3>
              <div className="space-y-4 text-white/70">
                <p>Give them a job. Give them a paycheck. Give them dignity.</p>
                <p>When someone has stable employment, they're no longer in survival mode. They can pay rent, feed their kids, stay out of trouble.</p>
                <p className="text-white/90 font-semibold">Job → Paycheck → Housing → Stability → Safer communities.</p>
                <p>This isn't charity. It's common sense. Employed people don't commit crimes. They pay taxes. They contribute.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#F97316]/20 to-transparent p-8 rounded-2xl border border-[#F97316]/30 text-center">
            <h3 className="text-2xl font-bold mb-4">FairPath Staffing Creates the Workforce Boom</h3>
            <p className="text-white/70 max-w-3xl mx-auto mb-6">
              There are millions of justice-impacted people ready to work RIGHT NOW. They're motivated, loyal, and hungry for opportunity. 
              We connect them with employers who see past the background check and focus on the talent. The result? A massive, untapped workforce ready to fill your open positions.
            </p>
            <p className="text-[#F97316] text-lg font-semibold">
              More people working = Stronger economy + Safer streets + Thriving communities
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How FairPath Staffing Works</h2>
            <p className="text-xl text-white/60">AI-powered, bias-free, automated from start to finish</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-[#1F1F1F] p-8 rounded-2xl border border-white/10">
              <div className="text-5xl font-bold text-[#F97316] mb-4">01</div>
              <h3 className="text-xl font-bold mb-4">Post Your Job</h3>
              <p className="text-white/60">
                Tell us what you need: warehouse workers, CDL drivers, construction crew, whatever. 
                Be upfront about background-friendly or not. AI handles the rest.
              </p>
            </div>

            <div className="bg-[#1F1F1F] p-8 rounded-2xl border border-white/10">
              <div className="text-5xl font-bold text-[#F97316] mb-4">02</div>
              <h3 className="text-xl font-bold mb-4">AI Matches Candidates</h3>
              <p className="text-white/60">
                Our system scans thousands of profiles from FairPath Forward (prison tablets) and Friend A Felon (job seekers). 
                It matches based on skills, location, and availability—NOT criminal history.
              </p>
            </div>

            <div className="bg-[#1F1F1F] p-8 rounded-2xl border border-white/10">
              <div className="text-5xl font-bold text-[#F97316] mb-4">03</div>
              <h3 className="text-xl font-bold mb-4">We Handle Everything</h3>
              <p className="text-white/60">
                Drug tests, background checks, interview scheduling, onboarding paperwork—all automated. 
                You just pick who you want to hire. We do the rest.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#A8F32C]/10 to-transparent p-8 rounded-2xl border border-[#A8F32C]/30 text-center">
            <h3 className="text-2xl font-bold mb-4">Average Time to Hire: 24-48 Hours</h3>
            <p className="text-white/60 mb-4">
              Traditional staffing takes 2-4 weeks and costs $3,000-$5,000 per hire. We do it in 2 days for $500-$1,500. 
              No markup on wages. No bullshit.
            </p>
            <p className="text-[#A8F32C] font-semibold">
              This is a web app CRM for employers. Coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* Why Hire Justice-Impacted People */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1F1F1F]/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="w-12 h-12 text-[#10B981] mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Why Employers Choose Second Chance Hiring</h2>
            <p className="text-xl text-white/60">It's not just the right thing to do—it's smart business</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#1F1F1F] p-8 rounded-2xl border border-white/10">
              <CheckCircle className="w-8 h-8 text-[#10B981] mb-4" />
              <h3 className="text-xl font-bold mb-3">Higher Retention Rates</h3>
              <p className="text-white/60">
                Justice-impacted employees stay longer. They're grateful for the opportunity and prove themselves every day. 
                Less turnover = Less hiring costs.
              </p>
            </div>

            <div className="bg-[#1F1F1F] p-8 rounded-2xl border border-white/10">
              <CheckCircle className="w-8 h-8 text-[#10B981] mb-4" />
              <h3 className="text-xl font-bold mb-3">Loyal, Hardworking Employees</h3>
              <p className="text-white/60">
                When you give someone a second chance, they don't take it for granted. They show up on time, work hard, and go the extra mile.
              </p>
            </div>

            <div className="bg-[#1F1F1F] p-8 rounded-2xl border border-white/10">
              <CheckCircle className="w-8 h-8 text-[#10B981] mb-4" />
              <h3 className="text-xl font-bold mb-3">Untapped Talent Pool</h3>
              <p className="text-white/60">
                Everyone else is fighting over the same candidates. You're tapping into a massive pool of motivated workers who just need a shot.
              </p>
            </div>

            <div className="bg-[#1F1F1F] p-8 rounded-2xl border border-white/10">
              <CheckCircle className="w-8 h-8 text-[#10B981] mb-4" />
              <h3 className="text-xl font-bold mb-3">Tax Incentives & Credits</h3>
              <p className="text-white/60">
                Federal Work Opportunity Tax Credit (WOTC) gives you up to $9,600 per eligible hire. You get paid to do the right thing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <DollarSign className="w-12 h-12 text-[#F97316] mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Pricing That Makes Sense</h2>
            <p className="text-xl text-white/60">70% cheaper than traditional staffing. Flat fee. No hidden costs.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-[#1F1F1F] p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-2">Entry Level</h3>
              <p className="text-white/60 text-sm mb-6">Warehouse, retail, food service</p>
              <div className="text-5xl font-bold text-[#F97316] mb-6">$500</div>
              
              <ul className="space-y-3 text-sm text-white/70 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#10B981] mt-0.5 flex-shrink-0" />
                  Background check included
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#10B981] mt-0.5 flex-shrink-0" />
                  Drug test included
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#10B981] mt-0.5 flex-shrink-0" />
                  AI matching
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#10B981] mt-0.5 flex-shrink-0" />
                  90-day guarantee
                </li>
              </ul>

              <Button className="w-full bg-[#F97316] hover:bg-[#EA580C]">
                Get Started
              </Button>
            </div>

            <div className="bg-gradient-to-br from-[#F97316]/20 to-transparent p-8 rounded-2xl border-2 border-[#F97316] relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-[#F97316] text-white px-4 py-1.5 rounded-full text-sm font-bold">
                  MOST POPULAR
                </span>
              </div>

              <h3 className="text-2xl font-bold mb-2 mt-2">Skilled Labor</h3>
              <p className="text-white/60 text-sm mb-6">Construction, trades, CDL drivers</p>
              <div className="text-5xl font-bold text-[#F97316] mb-6">$1,000</div>
              
              <ul className="space-y-3 text-sm text-white/80 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#10B981] mt-0.5 flex-shrink-0" />
                  Everything in Entry Level
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F97316] mt-0.5 flex-shrink-0" />
                  Certification verification
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F97316] mt-0.5 flex-shrink-0" />
                  Skills assessments
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#F97316] mt-0.5 flex-shrink-0" />
                  Priority matching
                </li>
              </ul>

              <Button className="w-full bg-[#F97316] hover:bg-[#EA580C]">
                Get Started
              </Button>
            </div>

            <div className="bg-[#1F1F1F] p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <p className="text-white/60 text-sm mb-6">IT, healthcare, management</p>
              <div className="text-5xl font-bold text-[#F97316] mb-6">$1,500</div>
              
              <ul className="space-y-3 text-sm text-white/70 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#10B981] mt-0.5 flex-shrink-0" />
                  Everything in Skilled Labor
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#A855F7] mt-0.5 flex-shrink-0" />
                  Advanced testing
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#A855F7] mt-0.5 flex-shrink-0" />
                  Education verification
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#A855F7] mt-0.5 flex-shrink-0" />
                  White-glove service
                </li>
              </ul>

              <Button className="w-full bg-[#F97316] hover:bg-[#EA580C]">
                Get Started
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#A8F32C]/10 to-transparent p-8 rounded-2xl border border-[#A8F32C]/30 text-center">
            <h3 className="text-2xl font-bold mb-4">20% of Every Dollar Goes to the Impact Fund</h3>
            <p className="text-white/60 max-w-3xl mx-auto">
              Your hiring budget funds real community work: Legal retainers, bail assistance, emergency cash for rent and groceries. 
              When you hire through FairPath, you're not just building your team—you're building safer communities.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-[#F97316]/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Tap Into the Workforce Boom?
          </h2>
          <p className="text-xl text-white/60 mb-8">
            Access thousands of motivated candidates. Fill positions faster. Build a stronger team. All while making communities safer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg"
              className="bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-lg px-8"
            >
              Request Access to Employer CRM
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => onNavigate('contact')}
              className="border-white text-white hover:bg-white hover:text-black text-lg px-8"
            >
              Schedule a Call
            </Button>
          </div>
          <p className="text-white/40 text-sm">
            This is a placeholder site. The full Employer CRM web app is coming soon.
          </p>
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
          <p className="text-[#F97316] font-semibold mt-4">When felons have jobs, we all have safer streets.</p>
        </div>
      </footer>
    </div>
  );
}
