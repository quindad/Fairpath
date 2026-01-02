import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Users, Calculator, ArrowRight, CheckCircle, AlertCircle, Building2, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

interface WOTCCalculatorPublicProps {
  onGetStarted?: () => void;
}

export default function WOTCCalculatorPublic({ onGetStarted }: WOTCCalculatorPublicProps) {
  const [step, setStep] = useState<'input' | 'results'>('input');
  
  // User inputs
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [avgHiresPerYear, setAvgHiresPerYear] = useState('');
  const [avgWage, setAvgWage] = useState('');
  const [currentlyHireReturningCitizens, setCurrentlyHireReturningCitizens] = useState<'yes' | 'no' | ''>('');
  
  // Calculated results
  const [eligibleHires, setEligibleHires] = useState(0);
  const [totalTaxCredits, setTotalTaxCredits] = useState(0);
  const [firstYearSavings, setFirstYearSavings] = useState(0);
  const [fiveYearSavings, setFiveYearSavings] = useState(0);
  const [perHireSavings, setPerHireSavings] = useState(0);

  const calculateWOTC = () => {
    const hiresPerYear = parseInt(avgHiresPerYear) || 0;
    const wage = parseFloat(avgWage) || 0;

    // LOGIC: Estimate percentage of hires that could be WOTC-eligible felons
    // Conservative estimate: 15-25% of entry-level positions could be filled by returning citizens
    // If already hiring: assume 10% of current hires could be WOTC-eligible
    // If not hiring: assume 20% of positions could be filled by returning citizens
    const eligibilityRate = currentlyHireReturningCitizens === 'yes' ? 0.10 : 0.20;
    const eligible = Math.floor(hiresPerYear * eligibilityRate);

    // WOTC Credit per hire: Up to $9,600 for long-term unemployment (most felons qualify)
    // Conservative calculation: $9,600 per qualifying hire
    const creditPerHire = 9600;
    const year1Credits = eligible * creditPerHire;
    
    // Additional savings beyond tax credits:
    // - Reduced turnover (25% lower turnover rate = ~$4,000/hire saved)
    // - Reduced recruiting costs (~$1,500/hire saved)
    // - Improved retention bonuses from reduced hiring needs
    const turnoverSavings = eligible * 4000 * 0.25; // 25% of positions have lower turnover
    const recruitingSavings = eligible * 1500;
    
    const year1Total = year1Credits + turnoverSavings + recruitingSavings;
    const year5Total = year1Total * 5;
    const perHire = eligible > 0 ? Math.floor(year1Total / eligible) : 0;

    setEligibleHires(eligible);
    setTotalTaxCredits(year1Credits);
    setFirstYearSavings(year1Total);
    setFiveYearSavings(year5Total);
    setPerHireSavings(perHire);
    setStep('results');

    // Log for analytics
    console.log('🧮 WOTC CALCULATOR USED:', {
      companyName,
      industry,
      location,
      hiresPerYear,
      avgWage: wage,
      currentlyHiring: currentlyHireReturningCitizens,
      calculated: {
        eligibleHires: eligible,
        taxCredits: year1Credits,
        firstYearSavings: year1Total,
        fiveYearSavings: year5Total,
        perHireSavings: perHire
      }
    });
  };

  if (step === 'input') {
    return (
      <div className="bg-gradient-to-br from-black via-[#0A0A0A] to-black text-white py-20" id="wotc-calculator">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 mb-4">
              💰 Free WOTC Calculator
            </Badge>
            <h2 className="text-4xl md:text-5xl mb-4">
              See How Much You're <span className="text-[#A8F32C]">Leaving on the Table</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Most employers don't realize they're missing out on up to <span className="text-[#A8F32C] font-bold">$9,600 per hire</span> in federal tax credits by not hiring returning citizens. Calculate your potential savings in 60 seconds.
            </p>
          </div>

          <Card className="bg-white/5 border-[#A8F32C]/30 p-8 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-white/70 mb-2">Company Name</label>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="ABC Logistics"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">Industry</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  <option value="">Select industry</option>
                  <option value="warehousing">Warehousing & Logistics</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="construction">Construction</option>
                  <option value="hospitality">Hospitality & Food Service</option>
                  <option value="retail">Retail</option>
                  <option value="transportation">Transportation</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">Primary Location (City, State)</label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Chicago, IL"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">Average Hires Per Year</label>
                <Input
                  type="number"
                  value={avgHiresPerYear}
                  onChange={(e) => setAvgHiresPerYear(e.target.value)}
                  placeholder="50"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">Average Starting Wage ($/hour)</label>
                <Input
                  type="number"
                  value={avgWage}
                  onChange={(e) => setAvgWage(e.target.value)}
                  placeholder="18"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2">Currently Hire Returning Citizens?</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentlyHireReturningCitizens('yes')}
                    className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                      currentlyHireReturningCitizens === 'yes'
                        ? 'border-[#A8F32C] bg-[#A8F32C]/20 text-[#A8F32C]'
                        : 'border-white/20 bg-white/5 text-white'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setCurrentlyHireReturningCitizens('no')}
                    className={`flex-1 px-4 py-2 rounded-lg border-2 transition-all ${
                      currentlyHireReturningCitizens === 'no'
                        ? 'border-[#A8F32C] bg-[#A8F32C]/20 text-[#A8F32C]'
                        : 'border-white/20 bg-white/5 text-white'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            <Button
              onClick={calculateWOTC}
              disabled={!avgHiresPerYear || !currentlyHireReturningCitizens}
              className="w-full mt-8 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Calculate My Tax Savings
            </Button>

            <p className="text-center text-sm text-white/50 mt-4">
              No commitment required • Takes 60 seconds • 100% free
            </p>
          </Card>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="text-4xl mb-2">💼</div>
              <div className="text-sm text-white/70">IRS-Approved</div>
              <div className="text-sm text-white/70">WOTC Program</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🎯</div>
              <div className="text-sm text-white/70">Up to $9,600</div>
              <div className="text-sm text-white/70">Per Qualifying Hire</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">⚡</div>
              <div className="text-sm text-white/70">Automated</div>
              <div className="text-sm text-white/70">Processing</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'results') {
    return (
      <div className="bg-gradient-to-br from-black via-[#0A0A0A] to-black text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-[#A8F32C] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-black" />
            </div>
            <h2 className="text-4xl md:text-5xl mb-4">
              You Could Save <span className="text-[#A8F32C]">${firstYearSavings.toLocaleString()}</span> in Year 1
            </h2>
            <p className="text-xl text-white/70">
              By hiring just {eligibleHires} returning citizens through FairPath Staffing
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6 text-center">
              <DollarSign className="w-8 h-8 text-[#A8F32C] mx-auto mb-3" />
              <div className="text-3xl text-[#A8F32C] mb-1">${totalTaxCredits.toLocaleString()}</div>
              <div className="text-sm text-white/70">WOTC Tax Credits</div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6 text-center">
              <Users className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <div className="text-3xl text-blue-500 mb-1">{eligibleHires}</div>
              <div className="text-sm text-white/70">Eligible Hires/Year</div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6 text-center">
              <TrendingUp className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <div className="text-3xl text-purple-500 mb-1">${perHireSavings.toLocaleString()}</div>
              <div className="text-sm text-white/70">Savings Per Hire</div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6 text-center">
              <Calendar className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
              <div className="text-3xl text-yellow-500 mb-1">${fiveYearSavings.toLocaleString()}</div>
              <div className="text-sm text-white/70">5-Year Projection</div>
            </Card>
          </div>

          {/* Breakdown */}
          <Card className="bg-white/5 border-white/10 p-8 mb-8">
            <h3 className="text-2xl mb-6">How We Calculated Your Savings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C]" />
                  <div>
                    <div className="font-medium">WOTC Tax Credits</div>
                    <div className="text-sm text-white/60">
                      {eligibleHires} qualifying hires × $9,600 = Federal tax credits
                    </div>
                  </div>
                </div>
                <div className="text-2xl text-[#A8F32C]">${totalTaxCredits.toLocaleString()}</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C]" />
                  <div>
                    <div className="font-medium">Reduced Turnover Costs</div>
                    <div className="text-sm text-white/60">
                      Returning citizens have 25% lower turnover • Saves ~$4,000 per retained hire
                    </div>
                  </div>
                </div>
                <div className="text-2xl text-[#A8F32C]">
                  ${(eligibleHires * 4000 * 0.25).toLocaleString()}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C]" />
                  <div>
                    <div className="font-medium">Recruiting Cost Savings</div>
                    <div className="text-sm text-white/60">
                      Pre-vetted candidates ready to work • Saves ~$1,500 per hire
                    </div>
                  </div>
                </div>
                <div className="text-2xl text-[#A8F32C]">
                  ${(eligibleHires * 1500).toLocaleString()}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#A8F32C]/10 rounded-lg border border-[#A8F32C]/30">
                <div className="font-medium text-lg">Total Year 1 Savings</div>
                <div className="text-3xl text-[#A8F32C]">${firstYearSavings.toLocaleString()}</div>
              </div>
            </div>
          </Card>

          {/* Why This Works */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-xl mb-4 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-[#A8F32C]" />
                Why Returning Citizens Are Great Hires
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Lower Turnover</div>
                    <div className="text-sm text-white/60">25% more likely to stay long-term due to limited job opportunities</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">High Motivation</div>
                    <div className="text-sm text-white/60">Proven work ethic from completing reentry programs</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Immediate Availability</div>
                    <div className="text-sm text-white/60">Ready to start immediately, no long notice periods</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Pre-Screened</div>
                    <div className="text-sm text-white/60">Background checks already completed through FairPath</div>
                  </div>
                </li>
              </ul>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <h3 className="text-xl mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-[#A8F32C]" />
                How FairPath Makes It Easy
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Automated WOTC Processing</div>
                    <div className="text-sm text-white/60">We handle all IRS forms (8850, 9061, 9062) automatically</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Pre-Qualified Candidates</div>
                    <div className="text-sm text-white/60">Every candidate is WOTC-verified before you see them</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Release Alerts</div>
                    <div className="text-sm text-white/60">Get notified when qualified candidates are released from prison</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium">Full Support Services</div>
                    <div className="text-sm text-white/60">Transportation, housing, resources - we handle it all</div>
                  </div>
                </li>
              </ul>
            </Card>
          </div>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-8 text-center">
            <h3 className="text-2xl mb-4">Ready to Start Saving?</h3>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Join 500+ companies already maximizing WOTC tax credits through FairPath Staffing. 
              No upfront costs, no long-term contracts. Only pay when you hire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={onGetStarted}
                className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                size="lg"
              >
                Get Started with FairPath Staffing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={() => setStep('input')}
                variant="outline"
                className="border-white/20 text-white"
                size="lg"
              >
                Recalculate
              </Button>
            </div>
          </Card>

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-white/50">
            <p>
              * Calculations based on IRS WOTC program guidelines. Actual savings may vary based on employee 
              qualifications, hours worked, and state-specific regulations. FairPath handles all verification.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
