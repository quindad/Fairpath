import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Brain, CheckCircle, XCircle, AlertTriangle, Scale, 
  DollarSign, Clock, FileText, ArrowRight, Plus, Trash2
} from 'lucide-react';

interface Charge {
  id: number;
  offense: string;
  year: string;
  state: string;
  county: string;
  felonyOrMisdemeanor: string;
}

interface EligibilityCheckerProps {
  onViewLawyers: (results: any) => void;
}

export default function EligibilityChecker({ onViewLawyers }: EligibilityCheckerProps) {
  const [step, setStep] = useState(1);
  const [charges, setCharges] = useState<Charge[]>([
    { id: 1, offense: '', year: '', state: '', county: '', felonyOrMisdemeanor: '' }
  ]);
  const [probationCompleted, setProbationCompleted] = useState<boolean | null>(null);
  const [additionalCharges, setAdditionalCharges] = useState<boolean | null>(null);
  const [results, setResults] = useState<any>(null);

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
    'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
    'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
    'Wisconsin', 'Wyoming'
  ];

  const addCharge = () => {
    setCharges([...charges, { 
      id: Date.now(), 
      offense: '', 
      year: '', 
      state: '', 
      county: '', 
      felonyOrMisdemeanor: '' 
    }]);
  };

  const removeCharge = (id: number) => {
    if (charges.length > 1) {
      setCharges(charges.filter(c => c.id !== id));
    }
  };

  const updateCharge = (id: number, field: string, value: string) => {
    setCharges(charges.map(c => c.id === id ? {...c, [field]: value} : c));
  };

  const handleCheckEligibility = () => {
    // Mock AI analysis
    const mockResults = {
      eligible: true,
      confidence: 'high',
      mainCharge: charges[0],
      eligibilityReason: 'Your 2018 California drug possession conviction is eligible for expungement under PC 1203.4. You completed probation in 2020, meeting the required waiting period.',
      nextSteps: [
        'Obtain certified copy of conviction from court',
        'File petition for dismissal (CR-180 form)',
        'Pay $150 court filing fee',
        'Attend hearing (usually waived for simple cases)',
      ],
      timeline: '3-6 months',
      courtFilingFee: 150,
      estimatedLawyerCost: {
        min: 800,
        max: 2500,
      },
      matchedLawyers: 12,
      alternativeOptions: [
        {
          type: 'Certificate of Rehabilitation',
          eligible: false,
          reason: 'Not required for your offense type'
        }
      ]
    };

    setResults(mockResults);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Brain className="h-8 w-8 text-purple-400" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl text-white">Check Your Eligibility</h1>
              <p className="text-purple-400">AI-powered expungement analysis</p>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((num) => (
              <React.Fragment key={num}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step >= num 
                    ? 'bg-purple-500 border-purple-500 text-white' 
                    : 'border-gray-700 text-gray-600'
                }`}>
                  {num}
                </div>
                {num < 3 && (
                  <div className={`w-12 h-0.5 ${step > num ? 'bg-purple-500' : 'bg-gray-700'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          <p className="text-white/60">
            {step === 1 && 'Enter Your Criminal Charges'}
            {step === 2 && 'Additional Information'}
            {step === 3 && 'Your Eligibility Results'}
          </p>
        </div>

        {/* Step 1: Enter Charges */}
        {step === 1 && (
          <div className="space-y-6">
            {charges.map((charge, index) => (
              <Card key={charge.id} className="bg-gray-900 border-purple-500/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">
                      Charge {index + 1}
                    </CardTitle>
                    {charges.length > 1 && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
                        onClick={() => removeCharge(charge.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={`offense-${charge.id}`} className="text-white">
                      Offense Name
                    </Label>
                    <Input
                      id={`offense-${charge.id}`}
                      value={charge.offense}
                      onChange={(e) => updateCharge(charge.id, 'offense', e.target.value)}
                      className="bg-black border-gray-700 text-white"
                      placeholder="e.g., Drug Possession, Petty Theft, DUI"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`year-${charge.id}`} className="text-white">
                        Year of Conviction
                      </Label>
                      <Input
                        id={`year-${charge.id}`}
                        value={charge.year}
                        onChange={(e) => updateCharge(charge.id, 'year', e.target.value)}
                        className="bg-black border-gray-700 text-white"
                        placeholder="2018"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`type-${charge.id}`} className="text-white">
                        Type
                      </Label>
                      <select
                        id={`type-${charge.id}`}
                        value={charge.felonyOrMisdemeanor}
                        onChange={(e) => updateCharge(charge.id, 'felonyOrMisdemeanor', e.target.value)}
                        className="w-full h-10 px-3 rounded-md bg-black border border-gray-700 text-white"
                      >
                        <option value="">Select...</option>
                        <option value="misdemeanor">Misdemeanor</option>
                        <option value="felony">Felony</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`state-${charge.id}`} className="text-white">
                        State
                      </Label>
                      <select
                        id={`state-${charge.id}`}
                        value={charge.state}
                        onChange={(e) => updateCharge(charge.id, 'state', e.target.value)}
                        className="w-full h-10 px-3 rounded-md bg-black border border-gray-700 text-white"
                      >
                        <option value="">Select state...</option>
                        {states.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor={`county-${charge.id}`} className="text-white">
                        County
                      </Label>
                      <Input
                        id={`county-${charge.id}`}
                        value={charge.county}
                        onChange={(e) => updateCharge(charge.id, 'county', e.target.value)}
                        className="bg-black border-gray-700 text-white"
                        placeholder="e.g., Los Angeles"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              variant="outline"
              className="w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white"
              onClick={addCharge}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Another Charge
            </Button>

            <div className="flex justify-end pt-6">
              <Button 
                onClick={() => setStep(2)} 
                className="bg-purple-500 hover:bg-purple-600"
              >
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Additional Info */}
        {step === 2 && (
          <Card className="bg-gray-900 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-white">Additional Information</CardTitle>
              <CardDescription className="text-white/60">
                Help us determine your eligibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <div>
                <Label className="text-white mb-4 block">
                  Have you completed all probation/parole requirements?
                </Label>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className={probationCompleted === true 
                      ? 'bg-purple-500 text-white border-purple-500' 
                      : 'border-gray-700 text-white'
                    }
                    onClick={() => setProbationCompleted(true)}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Yes, completed
                  </Button>
                  <Button
                    variant="outline"
                    className={probationCompleted === false 
                      ? 'bg-red-500 text-white border-red-500' 
                      : 'border-gray-700 text-white'
                    }
                    onClick={() => setProbationCompleted(false)}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    No, still ongoing
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-white mb-4 block">
                  Do you have any pending criminal charges?
                </Label>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    className={additionalCharges === false 
                      ? 'bg-purple-500 text-white border-purple-500' 
                      : 'border-gray-700 text-white'
                    }
                    onClick={() => setAdditionalCharges(false)}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    No pending charges
                  </Button>
                  <Button
                    variant="outline"
                    className={additionalCharges === true 
                      ? 'bg-red-500 text-white border-red-500' 
                      : 'border-gray-700 text-white'
                    }
                    onClick={() => setAdditionalCharges(true)}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Yes, pending charges
                  </Button>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <p className="text-sm text-blue-400">
                  💡 <strong>Why we ask:</strong> Most states require completion of all sentence terms 
                  and no pending charges before you can apply for expungement.
                </p>
              </div>

              <div className="flex justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)} 
                  className="border-gray-700 text-white"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleCheckEligibility} 
                  className="bg-purple-500 hover:bg-purple-600"
                  disabled={probationCompleted === null || additionalCharges === null}
                >
                  Check Eligibility
                  <Brain className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Results */}
        {step === 3 && results && (
          <div className="space-y-6">
            
            {/* Eligibility Status */}
            <Card className={`border-2 ${
              results.eligible 
                ? 'bg-gradient-to-br from-green-500/20 to-transparent border-green-500' 
                : 'bg-gradient-to-br from-red-500/20 to-transparent border-red-500'
            }`}>
              <CardContent className="pt-8">
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    results.eligible ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {results.eligible ? (
                      <CheckCircle className="h-8 w-8 text-white" />
                    ) : (
                      <XCircle className="h-8 w-8 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl text-white mb-3">
                      {results.eligible ? 'You Are Eligible!' : 'Not Eligible'}
                    </h2>
                    <p className="text-xl text-white/90 mb-4">
                      {results.eligibilityReason}
                    </p>
                    {results.eligible && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {results.confidence === 'high' ? 'High Confidence' : 'Moderate Confidence'}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {results.eligible && (
              <>
                {/* Next Steps */}
                <Card className="bg-gray-900 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <FileText className="h-5 w-5 text-purple-400" />
                      Next Steps
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-3">
                      {results.nextSteps.map((step: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-white/90">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>

                {/* Cost & Timeline */}
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="bg-gray-900 border-blue-500/30">
                    <CardContent className="pt-6">
                      <Clock className="h-8 w-8 text-blue-400 mb-4" />
                      <p className="text-sm text-white/60 mb-2">Timeline</p>
                      <p className="text-2xl text-white">{results.timeline}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-orange-500/30">
                    <CardContent className="pt-6">
                      <DollarSign className="h-8 w-8 text-orange-400 mb-4" />
                      <p className="text-sm text-white/60 mb-2">Court Filing Fee</p>
                      <p className="text-2xl text-white">${results.courtFilingFee}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-green-500/30">
                    <CardContent className="pt-6">
                      <Scale className="h-8 w-8 text-green-400 mb-4" />
                      <p className="text-sm text-white/60 mb-2">Lawyer Cost</p>
                      <p className="text-2xl text-white">
                        ${results.estimatedLawyerCost.min} - ${results.estimatedLawyerCost.max}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Matched Lawyers */}
                <Card className="bg-gradient-to-br from-purple-500/20 to-transparent border-purple-500">
                  <CardContent className="pt-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl text-white mb-2">
                          {results.matchedLawyers} Lawyers Ready to Help
                        </h3>
                        <p className="text-white/70">
                          Pre-qualified expungement attorneys in your area
                        </p>
                      </div>
                      <Button 
                        size="lg"
                        className="bg-purple-500 hover:bg-purple-600"
                        onClick={() => onViewLawyers(results)}
                      >
                        View Lawyers
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Alternative Options */}
            {results.alternativeOptions && results.alternativeOptions.length > 0 && (
              <Card className="bg-gray-900 border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    Alternative Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {results.alternativeOptions.map((option: any, index: number) => (
                    <div key={index} className="bg-black rounded-lg p-4">
                      <p className="text-white mb-1">{option.type}</p>
                      <p className="text-sm text-white/60">{option.reason}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Start Over */}
            <div className="text-center pt-6">
              <Button
                variant="outline"
                className="border-gray-700 text-white"
                onClick={() => {
                  setStep(1);
                  setResults(null);
                  setCharges([{ id: 1, offense: '', year: '', state: '', county: '', felonyOrMisdemeanor: '' }]);
                }}
              >
                Check Another Record
              </Button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
