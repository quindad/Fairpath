import React, { useState } from 'react';
import { Calculator, FileText, Download, Lock, CheckCircle, AlertCircle } from 'lucide-react';

interface WOTCCalculatorProps {
  hasPremium: boolean;
  onUpgrade: () => void;
  isDemoMode: boolean;
}

export function WOTCCalculator({ hasPremium, onUpgrade, isDemoMode }: WOTCCalculatorProps) {
  const [candidateName, setCandidateName] = useState('');
  const [felonyDate, setFelonyDate] = useState('');
  const [releasedDate, setReleasedDate] = useState('');
  const [receivedTANF, setReceivedTANF] = useState(false);
  const [receivedSNAP, setReceivedSNAP] = useState(false);
  const [veteranStatus, setVeteranStatus] = useState(false);
  const [calculationResult, setCalculationResult] = useState<any>(null);

  const calculateWOTC = () => {
    if (!hasPremium) {
      return;
    }

    const convictionDate = new Date(felonyDate);
    const releaseDate = new Date(releasedDate);
    const now = new Date();
    
    const yearsSinceConviction = (now.getTime() - convictionDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
    const yearsSinceRelease = (now.getTime() - releaseDate.getTime()) / (1000 * 60 * 60 * 24 * 365);

    let eligible = false;
    let amount = 0;
    let category = '';
    let reasoning = [];

    // Ex-Felon Category (highest credit)
    if (yearsSinceConviction <= 1 || yearsSinceRelease <= 1) {
      eligible = true;
      amount = 9600;
      category = 'Ex-Felon (Convicted/Released within 1 year)';
      reasoning.push('Hired within 1 year of conviction or release date');
      reasoning.push('Qualifies for maximum credit: 40% of first $24,000 wages');
    }

    // TANF/SNAP Recipients
    if (receivedTANF) {
      if (amount < 9600) {
        amount = 9600;
        category = 'TANF Recipient (Long-term)';
        reasoning.push('Received TANF assistance');
      }
    }

    if (receivedSNAP) {
      if (amount < 5600) {
        amount = 5600;
        category = 'SNAP Recipient';
        reasoning.push('Received SNAP benefits');
      }
    }

    // Veteran
    if (veteranStatus && yearsSinceRelease <= 1) {
      if (amount < 9600) {
        amount = 9600;
        category = 'Veteran Ex-Felon';
        reasoning.push('Veteran status + felony conviction/release within 1 year');
      }
    }

    if (!eligible && amount === 0) {
      reasoning.push('Does not meet timing requirements for ex-felon category');
      reasoning.push('No TANF/SNAP benefits reported');
      reasoning.push('May qualify for other WOTC categories - verify with candidate');
    }

    setCalculationResult({
      eligible: amount > 0,
      amount,
      category,
      reasoning,
      forms: amount > 0 ? ['IRS Form 8850', 'ETA Form 9061', 'ETA Form 9062'] : [],
    });
  };

  if (!hasPremium) {
    return (
      <div className="space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-[#A8F32C]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-[#A8F32C]" />
          </div>
          <h2 className="text-white text-2xl mb-2">Premium Feature</h2>
          <p className="text-white/60 mb-6 max-w-2xl mx-auto">
            Unlock the WOTC Calculator and Form Generator to automatically calculate tax credits up to $9,600 per hire and generate perfect IRS-ready forms
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
            <div className="bg-black/50 border border-white/10 rounded-lg p-6">
              <Calculator className="w-8 h-8 text-[#A8F32C] mb-3 mx-auto" />
              <div className="text-white mb-2">WOTC Calculator</div>
              <div className="text-white/60 text-sm">Instantly calculate eligibility and credit amounts</div>
            </div>
            
            <div className="bg-black/50 border border-white/10 rounded-lg p-6">
              <FileText className="w-8 h-8 text-[#A8F32C] mb-3 mx-auto" />
              <div className="text-white mb-2">Form Generator</div>
              <div className="text-white/60 text-sm">Auto-generate IRS Forms 8850, 9061, 9062</div>
            </div>
            
            <div className="bg-black/50 border border-white/10 rounded-lg p-6">
              <Download className="w-8 h-8 text-[#A8F32C] mb-3 mx-auto" />
              <div className="text-white mb-2">Export & File</div>
              <div className="text-white/60 text-sm">Download perfect forms ready to submit</div>
            </div>
          </div>

          <button
            onClick={onUpgrade}
            className="px-8 py-4 bg-[#A8F32C] text-black rounded-lg hover:bg-[#A8F32C]/90 transition-colors text-lg"
          >
            Upgrade to Premium - $99/month
          </button>

          <p className="text-white/40 text-sm mt-4">
            One $9,600 WOTC credit pays for 8 years of this service
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Calculator */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-6 h-6 text-[#A8F32C]" />
          <h2 className="text-white text-xl">WOTC Eligibility Calculator</h2>
          <span className="px-3 py-1 bg-[#A8F32C]/20 text-[#A8F32C] rounded-full text-sm">
            Premium
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-white mb-2">Candidate Name</label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#A8F32C] transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Felony Conviction Date</label>
            <input
              type="date"
              value={felonyDate}
              onChange={(e) => setFelonyDate(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#A8F32C] transition-colors"
            />
          </div>

          <div>
            <label className="block text-white mb-2">Release Date (if incarcerated)</label>
            <input
              type="date"
              value={releasedDate}
              onChange={(e) => setReleasedDate(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#A8F32C] transition-colors"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-white mb-2">Additional Qualifications</label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={receivedTANF}
                onChange={(e) => setReceivedTANF(e.target.checked)}
                className="w-5 h-5 bg-black border border-white/20 rounded accent-[#A8F32C]"
              />
              <span className="text-white">Received TANF (welfare) assistance</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={receivedSNAP}
                onChange={(e) => setReceivedSNAP(e.target.checked)}
                className="w-5 h-5 bg-black border border-white/20 rounded accent-[#A8F32C]"
              />
              <span className="text-white">Received SNAP (food stamps)</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={veteranStatus}
                onChange={(e) => setVeteranStatus(e.target.checked)}
                className="w-5 h-5 bg-black border border-white/20 rounded accent-[#A8F32C]"
              />
              <span className="text-white">Veteran status</span>
            </label>
          </div>
        </div>

        <button
          onClick={calculateWOTC}
          disabled={!candidateName || !felonyDate}
          className="w-full px-6 py-4 bg-[#A8F32C] text-black rounded-lg hover:bg-[#A8F32C]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate WOTC Eligibility
        </button>
      </div>

      {/* Results */}
      {calculationResult && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            {calculationResult.eligible ? (
              <>
                <CheckCircle className="w-6 h-6 text-[#A8F32C]" />
                <h3 className="text-white text-xl">WOTC Eligible</h3>
              </>
            ) : (
              <>
                <AlertCircle className="w-6 h-6 text-yellow-500" />
                <h3 className="text-white text-xl">Further Review Needed</h3>
              </>
            )}
          </div>

          {calculationResult.eligible && (
            <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-6 mb-6">
              <div className="text-[#A8F32C] text-4xl mb-2">
                ${calculationResult.amount.toLocaleString()}
              </div>
              <div className="text-white mb-1">Tax Credit Available</div>
              <div className="text-white/60 text-sm">{calculationResult.category}</div>
            </div>
          )}

          <div className="space-y-3 mb-6">
            <div className="text-white">Determination Reasoning:</div>
            {calculationResult.reasoning.map((reason: string, index: number) => (
              <div key={index} className="flex items-start gap-2 text-white/60 text-sm">
                <span className="text-[#A8F32C] mt-1">•</span>
                <span>{reason}</span>
              </div>
            ))}
          </div>

          {calculationResult.eligible && (
            <div>
              <div className="text-white mb-3">Required Forms:</div>
              <div className="space-y-2 mb-6">
                {calculationResult.forms.map((form: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-black/50 border border-white/10 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#A8F32C]" />
                      <span className="text-white">{form}</span>
                    </div>
                    <button className="text-[#A8F32C] hover:underline text-sm">
                      Preview
                    </button>
                  </div>
                ))}
              </div>

              <button className="w-full px-6 py-4 bg-[#A8F32C] text-black rounded-lg hover:bg-[#A8F32C]/90 transition-colors flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Generate & Download All Forms
              </button>

              <p className="text-white/60 text-sm mt-4 text-center">
                Forms are pre-filled and ready to submit to the IRS. You can edit before downloading.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Recent Calculations */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-white text-xl mb-4">Recent WOTC Calculations</h3>
        <div className="space-y-3">
          {[
            { name: 'Marcus Johnson', amount: '$9,600', date: '2024-12-04', status: 'Forms Generated' },
            { name: 'DeShawn Williams', amount: '$9,600', date: '2024-12-03', status: 'Approved' },
            { name: 'Terrence Brown', amount: '$5,600', date: '2024-12-02', status: 'Forms Generated' },
          ].map((calc, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-black/50 border border-white/10 rounded-lg p-4"
            >
              <div>
                <div className="text-white mb-1">{calc.name}</div>
                <div className="text-white/60 text-sm">{calc.date}</div>
              </div>
              <div className="text-right">
                <div className="text-[#A8F32C] mb-1">{calc.amount}</div>
                <div className="text-white/60 text-sm">{calc.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}