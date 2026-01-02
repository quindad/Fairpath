import { useState } from 'react';
import { Briefcase, DollarSign, MapPin, Clock, Users, FileText, Zap, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import LogoFinal from '../common/LogoFinal';

interface JobPostingFormProps {
  packageType: 'starter' | 'growth' | 'enterprise';
  currentJobs: number;
  onComplete: () => void;
  onCancel: () => void;
}

export default function JobPostingForm({ packageType, currentJobs, onComplete, onCancel }: JobPostingFormProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const packageLimits = {
    starter: 3,
    growth: 10,
    enterprise: 999
  };

  const maxJobs = packageLimits[packageType];
  const canPostMore = currentJobs < maxJobs;

  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    locationType: 'onsite',
    salaryType: 'hourly',
    salaryMin: '',
    salaryMax: '',
    employmentType: 'full-time',
    description: '',
    responsibilities: '',
    qualifications: '',
    benefits: '',
    acceptsConvictions: [] as string[],
    timeRequirement: '5',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    startDate: 'immediate'
  });

  const convictionTypes = [
    { id: 'violent', label: 'Violent Offenses', description: 'Assault, robbery, etc.' },
    { id: 'property', label: 'Property Crimes', description: 'Theft, burglary, etc.' },
    { id: 'drug', label: 'Drug-Related', description: 'Possession, distribution, etc.' },
    { id: 'fraud', label: 'Fraud/White Collar', description: 'Embezzlement, forgery, etc.' },
    { id: 'traffic', label: 'Traffic/DUI', description: 'DUI, reckless driving, etc.' },
    { id: 'other', label: 'Other/Non-Violent', description: 'All other offenses' }
  ];

  const handleConvictionToggle = (id: string) => {
    if (jobData.acceptsConvictions.includes(id)) {
      setJobData({ ...jobData, acceptsConvictions: jobData.acceptsConvictions.filter(c => c !== id) });
    } else {
      setJobData({ ...jobData, acceptsConvictions: [...jobData.acceptsConvictions, id] });
    }
  };

  const progress = (step / totalSteps) * 100;

  if (!canPostMore) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-white/5 bg-[#121212]">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <LogoFinal size="md" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <Card className="bg-[#121212] border-white/10 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
              <Briefcase className="h-8 w-8 text-red-400" />
            </div>
            <h2 className="text-3xl mb-3 text-white">Job Posting Limit Reached</h2>
            <p className="text-xl text-white/60 mb-8">
              You've reached your limit of {maxJobs} active job postings on the {packageType.charAt(0).toUpperCase() + packageType.slice(1)} plan.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={onCancel} variant="outline" className="border-white/20 text-white">
                Go Back
              </Button>
              <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                Upgrade Plan
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <LogoFinal size="md" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">Step {step} of {totalSteps}</span>
            <span className="text-sm text-[#A8F32C]">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Basic Information */}
        {step === 1 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-2xl text-white">Job Details</h2>
                <p className="text-white/60">Basic information about the position</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-white mb-2 block">
                  Job Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g. Warehouse Associate"
                  value={jobData.title}
                  onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="company" className="text-white mb-2 block">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="company"
                  placeholder="e.g. Amazon Fulfillment"
                  value={jobData.company}
                  onChange={(e) => setJobData({ ...jobData, company: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="location" className="text-white mb-2 block">
                  Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  placeholder="e.g. Chicago, IL"
                  value={jobData.location}
                  onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              </div>

              <div>
                <Label className="text-white mb-2 block">
                  Location Type <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {['onsite', 'remote', 'hybrid'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setJobData({ ...jobData, locationType: type })}
                      className={`p-3 border-2 rounded-lg transition-all ${
                        jobData.locationType === type
                          ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <div className="text-white capitalize">{type}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-white mb-2 block">Salary Type</Label>
                  <select
                    value={jobData.salaryType}
                    onChange={(e) => setJobData({ ...jobData, salaryType: e.target.value })}
                    className="w-full p-2 bg-black border border-white/20 rounded-lg text-white"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="salary">Salary</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="salaryMin" className="text-white mb-2 block">
                    Min {jobData.salaryType === 'hourly' ? 'Rate' : 'Salary'}
                  </Label>
                  <Input
                    id="salaryMin"
                    placeholder={jobData.salaryType === 'hourly' ? '$15' : '$35,000'}
                    value={jobData.salaryMin}
                    onChange={(e) => setJobData({ ...jobData, salaryMin: e.target.value })}
                    className="bg-black border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="salaryMax" className="text-white mb-2 block">
                    Max {jobData.salaryType === 'hourly' ? 'Rate' : 'Salary'}
                  </Label>
                  <Input
                    id="salaryMax"
                    placeholder={jobData.salaryType === 'hourly' ? '$20' : '$45,000'}
                    value={jobData.salaryMax}
                    onChange={(e) => setJobData({ ...jobData, salaryMax: e.target.value })}
                    className="bg-black border-white/20 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white mb-2 block">
                  Employment Type <span className="text-red-500">*</span>
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {['full-time', 'part-time', 'contract'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setJobData({ ...jobData, employmentType: type })}
                      className={`p-3 border-2 rounded-lg transition-all ${
                        jobData.employmentType === type
                          ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <div className="text-white capitalize">{type.replace('-', ' ')}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Job Description */}
        {step === 2 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl text-white">Job Description</h2>
                <p className="text-white/60">Tell candidates about the role</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="description" className="text-white mb-2 block">
                  Job Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this job entails..."
                  value={jobData.description}
                  onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                  className="bg-black border-white/20 text-white min-h-32"
                />
              </div>

              <div>
                <Label htmlFor="responsibilities" className="text-white mb-2 block">
                  Key Responsibilities
                </Label>
                <Textarea
                  id="responsibilities"
                  placeholder="• Load and unload packages&#10;• Operate warehouse equipment&#10;• Maintain clean workspace"
                  value={jobData.responsibilities}
                  onChange={(e) => setJobData({ ...jobData, responsibilities: e.target.value })}
                  className="bg-black border-white/20 text-white min-h-32"
                />
              </div>

              <div>
                <Label htmlFor="qualifications" className="text-white mb-2 block">
                  Required Qualifications
                </Label>
                <Textarea
                  id="qualifications"
                  placeholder="• Able to lift 50 lbs&#10;• Valid driver's license&#10;• Reliable transportation"
                  value={jobData.qualifications}
                  onChange={(e) => setJobData({ ...jobData, qualifications: e.target.value })}
                  className="bg-black border-white/20 text-white min-h-32"
                />
              </div>

              <div>
                <Label htmlFor="benefits" className="text-white mb-2 block">
                  Benefits & Perks
                </Label>
                <Textarea
                  id="benefits"
                  placeholder="• Health insurance&#10;• 401(k) matching&#10;• Paid time off&#10;• Career advancement opportunities"
                  value={jobData.benefits}
                  onChange={(e) => setJobData({ ...jobData, benefits: e.target.value })}
                  className="bg-black border-white/20 text-white min-h-32"
                />
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: Conviction Eligibility */}
        {step === 3 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl text-white">Conviction Eligibility</h2>
                <p className="text-white/60">What conviction types are you open to?</p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-white/80">
                  <p className="mb-2">Only justice-impacted individuals who match your criteria will see this job posting.</p>
                  <p>Being open to more conviction types increases your WOTC tax credit opportunities!</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {convictionTypes.map((conviction) => (
                <label
                  key={conviction.id}
                  className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    jobData.acceptsConvictions.includes(conviction.id)
                      ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={jobData.acceptsConvictions.includes(conviction.id)}
                    onChange={() => handleConvictionToggle(conviction.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="text-white mb-1">{conviction.label}</div>
                    <div className="text-sm text-white/60">{conviction.description}</div>
                  </div>
                </label>
              ))}
            </div>

            <div>
              <Label className="text-white mb-2 block">
                Time Since Conviction <span className="text-red-500">*</span>
              </Label>
              <select
                value={jobData.timeRequirement}
                onChange={(e) => setJobData({ ...jobData, timeRequirement: e.target.value })}
                className="w-full p-3 bg-black border border-white/20 rounded-lg text-white"
              >
                <option value="0">Any time (most inclusive)</option>
                <option value="1">1+ years since release</option>
                <option value="2">2+ years since release</option>
                <option value="3">3+ years since release</option>
                <option value="5">5+ years since release</option>
                <option value="10">10+ years since release</option>
              </select>
            </div>
          </Card>
        )}

        {/* Step 4: Contact & Review */}
        {step === 4 && (
          <Card className="bg-[#121212] border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center">
                <Check className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h2 className="text-2xl text-white">Contact Information & Review</h2>
                <p className="text-white/60">How should applicants reach you?</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <Label htmlFor="contactName" className="text-white mb-2 block">
                  Contact Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactName"
                  placeholder="John Smith"
                  value={jobData.contactName}
                  onChange={(e) => setJobData({ ...jobData, contactName: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="contactEmail" className="text-white mb-2 block">
                  Contact Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="hiring@company.com"
                  value={jobData.contactEmail}
                  onChange={(e) => setJobData({ ...jobData, contactEmail: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              </div>

              <div>
                <Label htmlFor="contactPhone" className="text-white mb-2 block">
                  Contact Phone
                </Label>
                <Input
                  id="contactPhone"
                  placeholder="(312) 555-0123"
                  value={jobData.contactPhone}
                  onChange={(e) => setJobData({ ...jobData, contactPhone: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              </div>

              <div>
                <Label className="text-white mb-2 block">
                  Start Date <span className="text-red-500">*</span>
                </Label>
                <select
                  value={jobData.startDate}
                  onChange={(e) => setJobData({ ...jobData, startDate: e.target.value })}
                  className="w-full p-3 bg-black border border-white/20 rounded-lg text-white"
                >
                  <option value="immediate">Immediate</option>
                  <option value="1week">Within 1 week</option>
                  <option value="2weeks">Within 2 weeks</option>
                  <option value="1month">Within 1 month</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-black/50 border border-white/10 rounded-lg p-6">
              <h3 className="text-lg mb-4 text-white">Job Posting Preview</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Title:</span>
                  <span className="text-white">{jobData.title || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Company:</span>
                  <span className="text-white">{jobData.company || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Location:</span>
                  <span className="text-white">{jobData.location || 'Not set'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Salary:</span>
                  <span className="text-white">
                    {jobData.salaryMin && jobData.salaryMax 
                      ? `${jobData.salaryMin} - ${jobData.salaryMax}${jobData.salaryType === 'hourly' ? '/hr' : '/year'}`
                      : 'Not set'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Accepts Convictions:</span>
                  <span className="text-white">{jobData.acceptsConvictions.length} types</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          {step > 1 && (
            <Button onClick={() => setStep(step - 1)} variant="outline" className="flex-1 border-white/20 text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          )}
          {step < totalSteps ? (
            <Button onClick={() => setStep(step + 1)} className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={onComplete} className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
              Publish Job Posting
              <Check className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        <Button onClick={onCancel} variant="ghost" className="w-full mt-4 text-white/60">
          Cancel
        </Button>
      </div>
    </div>
  );
}
