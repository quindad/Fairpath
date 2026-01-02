import { useState } from 'react';
import { ArrowLeft, Briefcase, CheckCircle, X, ChevronRight, FileText, Zap, DollarSign, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import LogoFinal from '../common/LogoFinal';
import { wotcQuestions, calculateTaxCredit, type WOTCQuestion } from '../../data/wotcQuestions';

interface JobApplicationFlowProps {
  job: any;
  onClose: () => void;
  onApply: (applicationData: any) => void;
  isFastTrack?: boolean;
}

export default function JobApplicationFlow({ job, onClose, onApply, isFastTrack }: JobApplicationFlowProps) {
  const [step, setStep] = useState<'basic-info' | 'work-history' | 'wotc-questions' | 'confirmation'>('basic-info');
  const [formData, setFormData] = useState({
    // Basic Info
    resume: null as File | null,
    coverLetter: '',
    phone: '',
    email: '',
    startDate: '',
    availability: 'full-time',
    
    // Work History
    currentlyEmployed: 'no',
    currentEmployer: '',
    currentPosition: '',
    currentStartDate: '',
    reasonForLeaving: '',
    
    previousEmployer1: '',
    previousPosition1: '',
    previousDuration1: '',
    
    previousEmployer2: '',
    previousPosition2: '',
    previousDuration2: '',
    
    skills: '',
    certifications: '',
    
    // WOTC Answers
    wotcAnswers: {} as Record<string, any>,
    
    // Additional
    additionalInfo: ''
  });

  const [savedProgress, setSavedProgress] = useState(false);
  const [currentWOTCPage, setCurrentWOTCPage] = useState(0);
  const questionsPerPage = 5;

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleWOTCAnswer = (questionId: string, value: any) => {
    setFormData({
      ...formData,
      wotcAnswers: {
        ...formData.wotcAnswers,
        [questionId]: value
      }
    });
  };

  const saveProgress = () => {
    localStorage.setItem(`job_app_${job.id}`, JSON.stringify(formData));
    setSavedProgress(true);
    setTimeout(() => setSavedProgress(false), 2000);
  };

  const handleBasicInfoSubmit = () => {
    if (!formData.phone || !formData.email || !formData.startDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (isFastTrack) {
      // FastTrack skips to WOTC questions
      setStep('wotc-questions');
    } else {
      setStep('work-history');
    }
  };

  const handleWorkHistorySubmit = () => {
    setStep('wotc-questions');
  };

  const handleWOTCSubmit = () => {
    const taxCreditValue = calculateTaxCredit(formData.wotcAnswers);
    
    const applicationData = {
      ...formData,
      jobId: job.id,
      jobTitle: job.title,
      companyId: job.companyId,
      companyName: job.company,
      estimatedTaxCredit: taxCreditValue,
      submittedAt: new Date().toISOString(),
      status: 'submitted',
      isFastTrack
    };

    onApply(applicationData);
    setStep('confirmation');
  };

  // Paginate WOTC questions
  const totalWOTCPages = Math.ceil(wotcQuestions.length / questionsPerPage);
  const currentPageQuestions = wotcQuestions.slice(
    currentWOTCPage * questionsPerPage,
    (currentWOTCPage + 1) * questionsPerPage
  );

  const renderWOTCQuestion = (question: WOTCQuestion) => {
    const value = formData.wotcAnswers[question.id];

    return (
      <Card key={question.id} className="bg-black/50 border-white/10 p-4">
        <div className="mb-3">
          <div className="flex items-start justify-between mb-2">
            <div className="text-white flex-1">{question.question}</div>
            {question.taxCreditValue && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 ml-3">
                ${question.taxCreditValue}
              </Badge>
            )}
          </div>
          <div className="text-sm text-white/60 mb-3">{question.explanation}</div>
        </div>

        {question.type === 'yes-no' && (
          <div className="flex gap-3">
            <Button
              variant={value === 'yes' ? 'default' : 'outline'}
              className={value === 'yes' ? 'bg-[#A8F32C] text-black' : 'border-white/20 text-white'}
              onClick={() => handleWOTCAnswer(question.id, 'yes')}
            >
              Yes
            </Button>
            <Button
              variant={value === 'no' ? 'default' : 'outline'}
              className={value === 'no' ? 'bg-[#A8F32C] text-black' : 'border-white/20 text-white'}
              onClick={() => handleWOTCAnswer(question.id, 'no')}
            >
              No
            </Button>
          </div>
        )}

        {question.type === 'date' && (
          <Input
            type="date"
            value={value || ''}
            onChange={(e) => handleWOTCAnswer(question.id, e.target.value)}
            className="bg-black/50 border-white/20 text-white"
          />
        )}

        {question.type === 'select' && question.options && (
          <select
            value={value || ''}
            onChange={(e) => handleWOTCAnswer(question.id, e.target.value)}
            className="w-full bg-black/50 border border-white/20 text-white rounded-md p-2"
          >
            <option value="">Select an option</option>
            {question.options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )}

        {question.type === 'text' && (
          <Input
            type="text"
            value={value || ''}
            onChange={(e) => handleWOTCAnswer(question.id, e.target.value)}
            className="bg-black/50 border-white/20 text-white"
            placeholder="Enter your answer"
          />
        )}
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button onClick={onClose} variant="ghost" size="icon" className="text-white/60 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <LogoFinal size="md" />
            </div>
            <div className="flex items-center gap-3">
              {step !== 'confirmation' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white"
                  onClick={saveProgress}
                >
                  {savedProgress ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                      Saved!
                    </>
                  ) : (
                    'Save & Finish Later'
                  )}
                </Button>
              )}
              <Button onClick={onClose} variant="ghost" size="icon" className="text-white/60 hover:text-white">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Job Summary */}
        {step !== 'confirmation' && (
          <Card className="bg-gradient-to-r from-blue-500/10 to-transparent border-blue-500/30 p-6 mb-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl text-white">{job.title}</h2>
                  {isFastTrack && (
                    <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                      <Zap className="mr-1 h-3 w-3" />
                      FastTrack
                    </Badge>
                  )}
                </div>
                <div className="text-lg text-white/80 mb-2">{job.company}</div>
                <div className="flex gap-4 text-sm text-white/60">
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>{job.type}</span>
                  <span>•</span>
                  <span>${job.salary}</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* STEP 1: BASIC INFO */}
        {step === 'basic-info' && (
          <div className="space-y-6">
            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4 text-white">Contact Information</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Phone Number (Required) *</label>
                    <Input
                      type="tel"
                      placeholder="(312) 555-0123"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Email Address (Required) *</label>
                    <Input
                      type="email"
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Earliest Start Date (Required) *</label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Availability</label>
                    <select
                      value={formData.availability}
                      onChange={(e) => handleInputChange('availability', e.target.value)}
                      className="w-full bg-black/50 border border-white/20 text-white rounded-md p-2"
                    >
                      <option value="full-time">Full-Time (40+ hours/week)</option>
                      <option value="part-time">Part-Time (20-39 hours/week)</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>

            {!isFastTrack && (
              <Card className="bg-[#121212] border-white/10 p-6">
                <h3 className="text-xl mb-4 text-white">Resume & Cover Letter</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Upload Resume (Optional)</label>
                    <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                      <FileText className="h-8 w-8 text-white/40 mx-auto mb-2" />
                      <div className="text-white/60 mb-2">Drag and drop your resume here</div>
                      <Button variant="outline" className="border-white/20 text-white">
                        Choose File
                      </Button>
                      <div className="text-xs text-white/40 mt-2">PDF, DOC, or DOCX (Max 5MB)</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Cover Letter (Optional)</label>
                    <textarea
                      placeholder="Tell the employer why you're a great fit for this role..."
                      value={formData.coverLetter}
                      onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                      className="w-full bg-black/50 border border-white/20 text-white rounded-md p-3 min-h-[150px]"
                    />
                  </div>
                </div>
              </Card>
            )}

            {isFastTrack && (
              <Card className="bg-gradient-to-r from-[#A8F32C]/10 to-transparent border-[#A8F32C]/30 p-6">
                <div className="flex items-start gap-3">
                  <Zap className="h-6 w-6 text-[#A8F32C] flex-shrink-0" />
                  <div>
                    <h4 className="text-lg text-white mb-2">FastTrack Application</h4>
                    <div className="text-white/80 space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                        <span>One-click apply - no resume required</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                        <span>WOTC tax credit pre-screening included</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                        <span>Response within 48 hours guaranteed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            <Button
              className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-12"
              onClick={handleBasicInfoSubmit}
            >
              {isFastTrack ? 'Continue to WOTC Questions' : 'Continue to Work History'}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        {/* STEP 2: WORK HISTORY (Non-FastTrack Only) */}
        {step === 'work-history' && (
          <div className="space-y-6">
            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4 text-white">Current Employment</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Are you currently employed?</label>
                  <div className="flex gap-3">
                    <Button
                      variant={formData.currentlyEmployed === 'yes' ? 'default' : 'outline'}
                      className={formData.currentlyEmployed === 'yes' ? 'bg-[#A8F32C] text-black' : 'border-white/20 text-white'}
                      onClick={() => handleInputChange('currentlyEmployed', 'yes')}
                    >
                      Yes
                    </Button>
                    <Button
                      variant={formData.currentlyEmployed === 'no' ? 'default' : 'outline'}
                      className={formData.currentlyEmployed === 'no' ? 'bg-[#A8F32C] text-black' : 'border-white/20 text-white'}
                      onClick={() => handleInputChange('currentlyEmployed', 'no')}
                    >
                      No
                    </Button>
                  </div>
                </div>

                {formData.currentlyEmployed === 'yes' && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-white/60 mb-2">Current Employer</label>
                        <Input
                          placeholder="Company Name"
                          value={formData.currentEmployer}
                          onChange={(e) => handleInputChange('currentEmployer', e.target.value)}
                          className="bg-black/50 border-white/20 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-white/60 mb-2">Position/Title</label>
                        <Input
                          placeholder="Job Title"
                          value={formData.currentPosition}
                          onChange={(e) => handleInputChange('currentPosition', e.target.value)}
                          className="bg-black/50 border-white/20 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-white/60 mb-2">Start Date</label>
                      <Input
                        type="date"
                        value={formData.currentStartDate}
                        onChange={(e) => handleInputChange('currentStartDate', e.target.value)}
                        className="bg-black/50 border-white/20 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-white/60 mb-2">Reason for Seeking New Employment</label>
                      <Input
                        placeholder="e.g., Career growth, better opportunity, relocation"
                        value={formData.reasonForLeaving}
                        onChange={(e) => handleInputChange('reasonForLeaving', e.target.value)}
                        className="bg-black/50 border-white/20 text-white"
                      />
                    </div>
                  </>
                )}
              </div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4 text-white">Previous Employment</h3>
              <div className="space-y-6">
                <div>
                  <div className="text-white mb-3">Previous Employer #1</div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input
                      placeholder="Company Name"
                      value={formData.previousEmployer1}
                      onChange={(e) => handleInputChange('previousEmployer1', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                    <Input
                      placeholder="Position"
                      value={formData.previousPosition1}
                      onChange={(e) => handleInputChange('previousPosition1', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                    <Input
                      placeholder="Duration (e.g., 2 years)"
                      value={formData.previousDuration1}
                      onChange={(e) => handleInputChange('previousDuration1', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="text-white mb-3">Previous Employer #2</div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input
                      placeholder="Company Name"
                      value={formData.previousEmployer2}
                      onChange={(e) => handleInputChange('previousEmployer2', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                    <Input
                      placeholder="Position"
                      value={formData.previousPosition2}
                      onChange={(e) => handleInputChange('previousPosition2', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                    <Input
                      placeholder="Duration"
                      value={formData.previousDuration2}
                      onChange={(e) => handleInputChange('previousDuration2', e.target.value)}
                      className="bg-black/50 border-white/20 text-white"
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4 text-white">Skills & Certifications</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Relevant Skills</label>
                  <Input
                    placeholder="e.g., Forklift operation, Inventory management, Customer service"
                    value={formData.skills}
                    onChange={(e) => handleInputChange('skills', e.target.value)}
                    className="bg-black/50 border-white/20 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Certifications/Licenses</label>
                  <Input
                    placeholder="e.g., Forklift certified, CDL Class A, OSHA 10"
                    value={formData.certifications}
                    onChange={(e) => handleInputChange('certifications', e.target.value)}
                    className="bg-black/50 border-white/20 text-white"
                  />
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-white/20 text-white"
                onClick={() => setStep('basic-info')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-12"
                onClick={handleWorkHistorySubmit}
              >
                Continue to WOTC Questions
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: WOTC QUESTIONS */}
        {step === 'wotc-questions' && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-green-500/10 to-transparent border-green-500/30 p-6">
              <div className="flex items-start gap-4">
                <DollarSign className="h-8 w-8 text-green-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl mb-2 text-white">Tax Credit Screening Questions</h3>
                  <p className="text-white/80 mb-3">
                    These questions help determine if you qualify for the Work Opportunity Tax Credit (WOTC). 
                    Employers can receive tax credits up to <strong className="text-green-400">$9,600</strong> for hiring qualifying candidates.
                  </p>
                  <div className="text-sm text-white/60">
                    <strong>Why this helps you:</strong> Employers love WOTC-eligible candidates because it saves them money. 
                    Being WOTC-eligible makes you a MORE attractive hire, not less.
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl text-white">
                  Questions {currentWOTCPage * questionsPerPage + 1}-{Math.min((currentWOTCPage + 1) * questionsPerPage, wotcQuestions.length)} of {wotcQuestions.length}
                </h3>
                <div className="text-sm text-white/60">
                  Page {currentWOTCPage + 1} of {totalWOTCPages}
                </div>
              </div>

              <div className="space-y-4">
                {currentPageQuestions.map(renderWOTCQuestion)}
              </div>
            </Card>

            {/* Estimated Tax Credit */}
            {Object.keys(formData.wotcAnswers).length > 0 && (
              <Card className="bg-gradient-to-r from-green-500/10 to-transparent border-green-500/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white/60 mb-1">Estimated Tax Credit Value</div>
                    <div className="text-3xl text-green-400">
                      ${calculateTaxCredit(formData.wotcAnswers).toLocaleString()}
                    </div>
                    <div className="text-sm text-white/60 mt-1">
                      Based on your responses so far
                    </div>
                  </div>
                  <CheckCircle className="h-12 w-12 text-green-400" />
                </div>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex gap-3">
              {currentWOTCPage > 0 && (
                <Button
                  variant="outline"
                  className="flex-1 border-white/20 text-white"
                  onClick={() => setCurrentWOTCPage(currentWOTCPage - 1)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
              )}

              {currentWOTCPage === 0 && (
                <Button
                  variant="outline"
                  className="flex-1 border-white/20 text-white"
                  onClick={() => setStep(isFastTrack ? 'basic-info' : 'work-history')}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              )}

              {currentWOTCPage < totalWOTCPages - 1 ? (
                <Button
                  className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-12"
                  onClick={() => setCurrentWOTCPage(currentWOTCPage + 1)}
                >
                  Next Page
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button
                  className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-12"
                  onClick={handleWOTCSubmit}
                >
                  Submit Application
                  <CheckCircle className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRMATION */}
        {step === 'confirmation' && (
          <div className="text-center py-12">
            <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            
            <h2 className="text-3xl mb-3 text-white">Application Submitted!</h2>
            <p className="text-xl text-white/80 mb-8">Your application has been sent to {job.company}</p>

            <Card className="bg-[#121212] border-white/10 p-6 max-w-2xl mx-auto mb-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Position:</span>
                  <span className="text-white">{job.title}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Company:</span>
                  <span className="text-white">{job.company}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Submitted:</span>
                  <span className="text-white">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Status:</span>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    Under Review
                  </Badge>
                </div>
                {calculateTaxCredit(formData.wotcAnswers) > 0 && (
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <span className="text-white/60">Estimated Tax Credit:</span>
                    <span className="text-2xl text-green-400">
                      ${calculateTaxCredit(formData.wotcAnswers).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500/10 to-transparent border-blue-500/30 p-6 max-w-2xl mx-auto mb-8">
              <h3 className="text-lg mb-3 text-white">What Happens Next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-white text-sm">1</div>
                  <div>
                    <div className="text-white">Employer Reviews Application</div>
                    <div className="text-sm text-white/60">Typically within 2-3 business days</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-white text-sm">2</div>
                  <div>
                    <div className="text-white">Interview Invitation</div>
                    <div className="text-sm text-white/60">If selected, you'll receive interview details</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-white text-sm">3</div>
                  <div>
                    <div className="text-white">WOTC Processing</div>
                    <div className="text-sm text-white/60">We'll help the employer claim your tax credit</div>
                  </div>
                </div>
              </div>
            </Card>

            <Button
              className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-12 px-8"
              onClick={onClose}
            >
              Return to Jobs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
