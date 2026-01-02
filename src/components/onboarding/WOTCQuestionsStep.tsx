import { useState } from 'react';
import { DollarSign, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Checkbox } from '../ui/checkbox';

interface WOTCData {
  unemploymentMonths: string;
  isVeteran: boolean;
  receivingTANF: boolean;
  receivingSNAP: boolean;
  receivingSSI: boolean;
  receivingSSID: boolean;
  convictionDate: string;
  releaseDate: string;
  ageAtConviction: string;
  onSupervision: boolean;
  inEZorTEA: boolean;
  employerReferral: boolean;
  longTermUnemployed: boolean;
}

interface WOTCQuestionsStepProps {
  data: Partial<WOTCData>;
  onDataChange: (data: Partial<WOTCData>) => void;
  onContinue: () => void;
  onSave?: () => void;
}

export default function WOTCQuestionsStep({
  data,
  onDataChange,
  onContinue,
  onSave
}: WOTCQuestionsStepProps) {
  const updateField = (field: keyof WOTCData, value: any) => {
    onDataChange({ ...data, [field]: value });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs tracking-widest text-[#A8F32C] mb-2">
            STEP 4 OF 5
          </div>
          <h1 className="text-3xl mb-3">Tax Credit Eligibility Questions</h1>
          <p className="text-white/60">
            These questions help us match you with employers who can earn tax credits for hiring you. 
            This makes you MORE attractive to employers and increases your chances of getting hired.
          </p>
        </div>

        {/* Info Banner */}
        <Card className="bg-gradient-to-br from-[#A8F32C]/20 via-[#121212] to-[#121212] border-[#A8F32C] p-6 mb-8">
          <div className="flex gap-4">
            <DollarSign className="h-8 w-8 text-[#A8F32C] flex-shrink-0" />
            <div>
              <h3 className="text-lg mb-2">Why These Questions Matter</h3>
              <p className="text-sm text-white/60 mb-3">
                Employers can receive up to <span className="text-[#A8F32C]">$9,600 in tax credits</span> for 
                hiring people with certain backgrounds. By answering these questions, you help us connect you 
                with opportunities where employers benefit from hiring YOU.
              </p>
              <div className="text-xs text-white/40">
                Your answers are private and only shared with employers you apply to.
              </div>
            </div>
          </div>
        </Card>

        {/* Questions */}
        <div className="space-y-6 mb-8">
          {/* Unemployment Length */}
          <Card className="bg-[#121212] border-white/10 p-6">
            <Label htmlFor="unemploymentMonths" className="text-white mb-3 block">
              How long have you been unemployed? <span className="text-red-500">*</span>
            </Label>
            <Input
              id="unemploymentMonths"
              type="number"
              placeholder="Number of months"
              value={data.unemploymentMonths || ''}
              onChange={(e) => updateField('unemploymentMonths', e.target.value)}
              className="bg-black border-white/20 text-white"
            />
            <p className="text-xs text-white/40 mt-2">
              Long-term unemployment can qualify you for tax credit programs
            </p>
          </Card>

          {/* Conviction Details */}
          <Card className="bg-[#121212] border-white/10 p-6">
            <h3 className="mb-4">Conviction Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="convictionDate" className="text-white mb-2 block">
                  Month/Year of Conviction <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="convictionDate"
                  type="month"
                  value={data.convictionDate || ''}
                  onChange={(e) => updateField('convictionDate', e.target.value)}
                  className="bg-black border-white/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="releaseDate" className="text-white mb-2 block">
                  Month/Year of Release <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="releaseDate"
                  type="month"
                  value={data.releaseDate || ''}
                  onChange={(e) => updateField('releaseDate', e.target.value)}
                  className="bg-black border-white/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="ageAtConviction" className="text-white mb-2 block">
                  Your Age at Time of Conviction <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="ageAtConviction"
                  type="number"
                  placeholder="Age"
                  value={data.ageAtConviction || ''}
                  onChange={(e) => updateField('ageAtConviction', e.target.value)}
                  className="bg-black border-white/20 text-white"
                />
              </div>
            </div>
          </Card>

          {/* Benefits & Programs */}
          <Card className="bg-[#121212] border-white/10 p-6">
            <h3 className="mb-4">Current Benefits & Programs</h3>
            <p className="text-sm text-white/60 mb-4">
              Select all that currently apply to you:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="tanf"
                  checked={data.receivingTANF || false}
                  onCheckedChange={(checked) => updateField('receivingTANF', checked)}
                />
                <Label htmlFor="tanf" className="text-white cursor-pointer">
                  Receiving TANF (Temporary Assistance for Needy Families)
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="snap"
                  checked={data.receivingSNAP || false}
                  onCheckedChange={(checked) => updateField('receivingSNAP', checked)}
                />
                <Label htmlFor="snap" className="text-white cursor-pointer">
                  Receiving SNAP (Food Stamps)
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="ssi"
                  checked={data.receivingSSI || false}
                  onCheckedChange={(checked) => updateField('receivingSSI', checked)}
                />
                <Label htmlFor="ssi" className="text-white cursor-pointer">
                  Receiving SSI (Supplemental Security Income)
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="ssid"
                  checked={data.receivingSSID || false}
                  onCheckedChange={(checked) => updateField('receivingSSID', checked)}
                />
                <Label htmlFor="ssid" className="text-white cursor-pointer">
                  Receiving SSDI (Social Security Disability Insurance)
                </Label>
              </div>
            </div>
          </Card>

          {/* Additional Qualifiers */}
          <Card className="bg-[#121212] border-white/10 p-6">
            <h3 className="mb-4">Additional Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="veteran"
                  checked={data.isVeteran || false}
                  onCheckedChange={(checked) => updateField('isVeteran', checked)}
                />
                <Label htmlFor="veteran" className="text-white cursor-pointer">
                  I am a veteran
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="supervision"
                  checked={data.onSupervision || false}
                  onCheckedChange={(checked) => updateField('onSupervision', checked)}
                />
                <Label htmlFor="supervision" className="text-white cursor-pointer">
                  I am currently on supervision (parole/probation)
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="ezTea"
                  checked={data.inEZorTEA || false}
                  onCheckedChange={(checked) => updateField('inEZorTEA', checked)}
                />
                <Label htmlFor="ezTea" className="text-white cursor-pointer">
                  I live in an Empowerment Zone or Targeted Employment Area
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="referral"
                  checked={data.employerReferral || false}
                  onCheckedChange={(checked) => updateField('employerReferral', checked)}
                />
                <Label htmlFor="referral" className="text-white cursor-pointer">
                  I was referred by an employer or agency
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="longTerm"
                  checked={data.longTermUnemployed || false}
                  onCheckedChange={(checked) => updateField('longTermUnemployed', checked)}
                />
                <Label htmlFor="longTerm" className="text-white cursor-pointer">
                  I have been unemployed for 27+ weeks
                </Label>
              </div>
            </div>
          </Card>

          {/* Tax Credit Estimate */}
          <Card className="bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent border-[#A8F32C]/30 p-6">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
              <div className="text-sm text-white">
                <p className="mb-2">
                  Based on your answers, employers could potentially earn tax credits by hiring you. 
                  This makes you a valuable candidate!
                </p>
                <p className="text-white/60">
                  These questions help us show you jobs where you're most likely to be hired.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {onSave && (
            <Button
              onClick={onSave}
              variant="outline"
              className="flex-1 border-white/20 text-white hover:bg-white/5"
            >
              Save & Finish Later
            </Button>
          )}
          <Button
            onClick={onContinue}
            disabled={!data.unemploymentMonths || !data.convictionDate || !data.releaseDate || !data.ageAtConviction}
            className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 disabled:opacity-50"
          >
            Continue
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 text-center">
          <p className="text-xs text-white/40">
            Almost done! Just one more step after this.
          </p>
        </div>
      </div>
    </div>
  );
}
