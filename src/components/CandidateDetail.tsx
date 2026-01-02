import React, { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, CheckCircle, DollarSign, FileText, Send, Phone, Mail, Clock } from 'lucide-react';

interface CandidateDetailProps {
  candidate: any;
  onBack: () => void;
  hasPremium: boolean;
  isDemoMode: boolean;
}

export function CandidateDetail({ candidate, onBack, hasPremium, isDemoMode }: CandidateDetailProps) {
  const [showInterviewForm, setShowInterviewForm] = useState(false);
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewTime, setInterviewTime] = useState('');
  const [notes, setNotes] = useState('');

  const sendInterviewInvite = () => {
    // In production, this would trigger automated email/SMS
    alert(`Interview invitation sent to ${candidate.name}!\n\nDate: ${interviewDate}\nTime: ${interviewTime}`);
    setShowInterviewForm(false);
  };

  const sendJobOffer = () => {
    // Create job listing for Friend A Felon mobile app
    const jobListing = {
      id: `job_${Date.now()}`,
      candidateName: candidate.name,
      candidateId: candidate.id,
      source: 'fairpath-staffing-crm',
      jobType: 'fairpath-staffing',
      wotcEligible: candidate.wotcEligible || true,
      taxCreditAmount: candidate.wotcAmount ? parseInt(candidate.wotcAmount.replace(/[^0-9]/g, '')) : 9600,
      tags: ['WOTC Eligible', 'Tax Credit', 'FairPath Staffing', 'Release Alert'],
      badges: [`$${candidate.wotcAmount || '$9,600'} Tax Credit Available`],
      priority: 'featured',
      releaseAlert: true,
      releaseDate: candidate.releaseDate,
      facility: candidate.facility,
      location: candidate.location,
      createdAt: new Date().toISOString(),
      syncToMobileApp: true
    };

    // Log for mobile app sync
    console.log('📱 MOBILE APP SYNC - FairPath Staffing Job Created:', jobListing);
    console.log('🏷️ Job Tags:', jobListing.tags);
    console.log('💰 WOTC Amount:', jobListing.taxCreditAmount);
    console.log('🎯 Display Priority:', jobListing.priority);
    console.log('📍 Source Portal:', jobListing.source);
    
    alert(`Job offer sent to ${candidate.name}!\n\n✅ Synced to Friend A Felon mobile app\n🏷️ Tagged as: WOTC Opportunity\n💰 Tax Credit: $${jobListing.taxCreditAmount}`);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Talent Pipeline
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Candidate Header */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-white text-3xl mb-2">{candidate.name}</h1>
                  <div className="flex items-center gap-4 text-white/60">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{candidate.location}</span>
                    </div>
                    <span>•</span>
                    <span>{candidate.age} years old</span>
                  </div>
                </div>

                {candidate.wotcEligible && (
                  <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-4 text-center">
                    <DollarSign className="w-6 h-6 text-[#A8F32C] mx-auto mb-1" />
                    <div className="text-[#A8F32C] text-2xl">{candidate.wotcAmount}</div>
                    <div className="text-white/60 text-sm">WOTC Credit</div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#A8F32C]/20 text-[#A8F32C] rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Status & Availability */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-white text-xl mb-4">Status & Availability</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-white/60 text-sm mb-2">Current Status</div>
                  <div className="flex items-center gap-2">
                    {candidate.releaseDate ? (
                      <>
                        <Clock className="w-5 h-5 text-[#FF8C42]" />
                        <span className="text-white">{candidate.status}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 text-[#A8F32C]" />
                        <span className="text-white">{candidate.status}</span>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-white/60 text-sm mb-2">Availability</div>
                  <div className="text-white">{candidate.availability}</div>
                </div>

                <div>
                  <div className="text-white/60 text-sm mb-2">Source</div>
                  <span className="px-3 py-1 bg-[#FF8C42]/20 text-[#FF8C42] rounded text-sm">
                    {candidate.source}
                  </span>
                </div>

                <div>
                  <div className="text-white/60 text-sm mb-2">Background Check</div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#A8F32C]" />
                    <span className="text-white">Cleared</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience & Background */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-white text-xl mb-4">Experience & Background</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="text-white/60 text-sm mb-2">Work Experience</div>
                  <div className="text-white">
                    {candidate.skills.join(', ')} - Multiple years of hands-on experience in the field
                  </div>
                </div>

                <div>
                  <div className="text-white/60 text-sm mb-2">Last Conviction</div>
                  <div className="text-white">{candidate.lastConviction}</div>
                </div>

                <div>
                  <div className="text-white/60 text-sm mb-2">Rehabilitation Programs</div>
                  <div className="text-white">
                    Completed reentry program, job training, and life skills workshops
                  </div>
                </div>
              </div>
            </div>

            {/* WOTC Details */}
            {candidate.wotcEligible && hasPremium && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-6 h-6 text-[#A8F32C]" />
                  <h2 className="text-white text-xl">WOTC Tax Credit Details</h2>
                </div>

                <div className="bg-[#A8F32C]/10 border border-[#A8F32C]/30 rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-white/60 text-sm mb-1">Estimated Credit</div>
                      <div className="text-[#A8F32C] text-2xl">{candidate.wotcAmount}</div>
                    </div>
                    <div>
                      <div className="text-white/60 text-sm mb-1">Category</div>
                      <div className="text-white">Ex-Felon</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="text-white/60 text-sm">Qualification Details:</div>
                  <div className="flex items-start gap-2 text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#A8F32C] mt-0.5" />
                    <span>Convicted within eligible timeframe</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#A8F32C] mt-0.5" />
                    <span>Qualifies for 40% credit on first $24,000 of wages</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#A8F32C] mt-0.5" />
                    <span>Employee must work minimum 400 hours for full credit</span>
                  </div>
                </div>

                <button className="w-full px-4 py-3 bg-[#A8F32C] text-black rounded-lg hover:bg-[#A8F32C]/90 transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5" />
                  Generate WOTC Forms (8850, 9061, 9062)
                </button>
              </div>
            )}
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-white mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => setShowInterviewForm(!showInterviewForm)}
                  className="w-full px-4 py-3 bg-[#A8F32C] text-black rounded-lg hover:bg-[#A8F32C]/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Schedule Interview
                </button>

                <button
                  onClick={sendJobOffer}
                  className="w-full px-4 py-3 bg-[#FF8C42] text-black rounded-lg hover:bg-[#FF8C42]/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Job Offer
                </button>

                <button className="w-full px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call Candidate
                </button>

                <button className="w-full px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  Send Message
                </button>
              </div>
            </div>

            {/* Interview Form */}
            {showInterviewForm && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-white mb-4">Schedule Interview</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/60 text-sm mb-2">Interview Date</label>
                    <input
                      type="date"
                      value={interviewDate}
                      onChange={(e) => setInterviewDate(e.target.value)}
                      className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#A8F32C] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">Interview Time</label>
                    <input
                      type="time"
                      value={interviewTime}
                      onChange={(e) => setInterviewTime(e.target.value)}
                      className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#A8F32C] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm mb-2">Notes (optional)</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 bg-black border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#A8F32C] transition-colors"
                      placeholder="Position details, location, etc."
                    />
                  </div>

                  <button
                    onClick={sendInterviewInvite}
                    disabled={!interviewDate || !interviewTime}
                    className="w-full px-4 py-3 bg-[#A8F32C] text-black rounded-lg hover:bg-[#A8F32C]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send Interview Invitation
                  </button>

                  <p className="text-white/60 text-sm text-center">
                    Automated email & SMS will be sent to candidate
                  </p>
                </div>
              </div>
            )}

            {/* Contact Info */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-white mb-4">Contact Information</h3>
              
              <div className="space-y-3">
                <div>
                  <div className="text-white/60 text-sm mb-1">Email</div>
                  <div className="text-white">{candidate.name.toLowerCase().replace(' ', '.')}@example.com</div>
                </div>
                
                <div>
                  <div className="text-white/60 text-sm mb-1">Phone</div>
                  <div className="text-white">(555) 123-4567</div>
                </div>

                <div>
                  <div className="text-white/60 text-sm mb-1">Best Time to Reach</div>
                  <div className="text-white">Weekdays 9am - 5pm</div>
                </div>
              </div>
            </div>

            {/* Activity Log */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-white mb-4">Activity Log</h3>
              
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="text-white/60 mb-1">Today, 10:23 AM</div>
                  <div className="text-white">Profile viewed by your team</div>
                </div>
                
                <div className="text-sm">
                  <div className="text-white/60 mb-1">Yesterday, 3:45 PM</div>
                  <div className="text-white">Added to talent pipeline</div>
                </div>

                <div className="text-sm">
                  <div className="text-white/60 mb-1">Dec 3, 2024</div>
                  <div className="text-white">WOTC eligibility confirmed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}