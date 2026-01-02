import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { 
  Users, Calendar, MapPin, Award, TrendingUp, Briefcase,
  Search, Filter, Download, Send, CheckCircle, Clock, Star
} from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface Candidate {
  id: string;
  fullName: string;
  releaseDate: string;
  releasingToCity: string;
  releasingToState: string;
  facilityName: string;
  resume: {
    skills: string[];
    desiredJobTitles: string[];
    workHistory: any[];
    objectiveStatement?: string;
  };
  habits: any[];
  certifications: any[];
  goals: any[];
  readinessScore: number;
  daysUntilRelease: number;
}

interface JobOffer {
  id: string;
  jobTitle: string;
  salaryMin?: number;
  salaryMax?: number;
  startDate?: string;
  offerStatus: string;
  offeredAt: string;
  candidateName?: string;
}

export function PrereleaseEmployerPortal({ employerId = 'demo-employer' }: { employerId?: string }) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchSkills, setSearchSkills] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [showOfferDialog, setShowOfferDialog] = useState(false);
  
  // Offer form state
  const [offerForm, setOfferForm] = useState({
    jobTitle: '',
    jobDescription: '',
    salaryMin: '',
    salaryMax: '',
    jobType: 'full-time',
    startDate: ''
  });

  const fetchCandidates = async () => {
    try {
      const params = new URLSearchParams();
      if (searchLocation) params.append('location', searchLocation);
      if (searchSkills) params.append('skills', searchSkills);
      
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a6daf7a5/prerelease/candidates?${params}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      const data = await res.json();
      if (data.success) {
        setCandidates(data.data);
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const fetchOffers = async () => {
    try {
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a6daf7a5/prerelease/employers/${employerId}/offers`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      const data = await res.json();
      if (data.success) {
        setOffers(data.data);
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
    fetchOffers();
  }, []);

  const createOffer = async () => {
    if (!selectedCandidate) return;
    
    try {
      const res = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a6daf7a5/prerelease/offers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            employerId,
            employerName: 'Your Company Name',
            prereleaseUserId: selectedCandidate.id,
            jobTitle: offerForm.jobTitle,
            jobDescription: offerForm.jobDescription,
            salaryMin: parseInt(offerForm.salaryMin) || undefined,
            salaryMax: parseInt(offerForm.salaryMax) || undefined,
            jobType: offerForm.jobType,
            startDate: offerForm.startDate || undefined,
            responseDeadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          })
        }
      );
      
      const data = await res.json();
      if (data.success) {
        alert('Job offer sent successfully!');
        setShowOfferDialog(false);
        setOfferForm({
          jobTitle: '',
          jobDescription: '',
          salaryMin: '',
          salaryMax: '',
          jobType: 'full-time',
          startDate: ''
        });
        fetchOffers();
      }
    } catch (error) {
      console.error('Error creating offer:', error);
      alert('Failed to send offer');
    }
  };

  const getReadinessColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getDaysColor = (days: number) => {
    if (days <= 30) return 'text-red-400';
    if (days <= 60) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#A8F32C] mb-2">
            FairPath Employer Portal
          </h1>
          <p className="text-gray-400">
            Connect with pre-vetted candidates releasing soon. Job offers ready on day one.
          </p>
        </div>

        {/* Search & Filters */}
        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="h-5 w-5 text-[#A8F32C]" />
              Search Candidates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label className="text-gray-400">Location</Label>
                <Input
                  placeholder="Los Angeles, CA"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div>
                <Label className="text-gray-400">Skills (comma-separated)</Label>
                <Input
                  placeholder="Welding, Forklift, Construction"
                  value={searchSkills}
                  onChange={(e) => setSearchSkills(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={fetchCandidates}
                  className="bg-[#A8F32C] text-black hover:bg-[#8CD423] w-full"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchLocation('');
                    setSearchSkills('');
                    fetchCandidates();
                  }}
                  className="border-gray-700 text-gray-400 w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Available Candidates</p>
                  <p className="text-3xl font-bold text-[#A8F32C]">{candidates.length}</p>
                </div>
                <Users className="h-8 w-8 text-[#A8F32C]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Active Offers</p>
                  <p className="text-3xl font-bold text-yellow-400">
                    {offers.filter(o => o.offerStatus === 'pending').length}
                  </p>
                </div>
                <Send className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Accepted Offers</p>
                  <p className="text-3xl font-bold text-green-400">
                    {offers.filter(o => o.offerStatus === 'accepted').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total Hires</p>
                  <p className="text-3xl font-bold text-blue-400">
                    {offers.filter(o => o.offerStatus === 'hired').length}
                  </p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Candidate Cards */}
        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Candidate Pipeline</CardTitle>
            <CardDescription className="text-gray-400">
              Pre-vetted candidates with resumes, certifications, and habit tracking data
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-400 text-center py-8">Loading candidates...</p>
            ) : candidates.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                No candidates found matching your criteria
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {candidates.map((candidate) => (
                  <Card key={candidate.id} className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-white text-lg">
                            {candidate.fullName}
                          </CardTitle>
                          <p className="text-sm text-gray-400 mt-1">
                            <MapPin className="h-3 w-3 inline mr-1" />
                            {candidate.releasingToCity}, {candidate.releasingToState}
                          </p>
                        </div>
                        <Badge className={`${getReadinessColor(candidate.readinessScore)}`}>
                          <Star className="h-3 w-3 mr-1" />
                          {candidate.readinessScore}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {/* Release Date */}
                      <div className="flex items-center justify-between p-3 bg-gray-900 rounded">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#A8F32C]" />
                          <span className="text-sm text-gray-400">Releases in</span>
                        </div>
                        <span className={`text-sm font-bold ${getDaysColor(candidate.daysUntilRelease)}`}>
                          {candidate.daysUntilRelease} days
                        </span>
                      </div>

                      {/* Skills */}
                      <div>
                        <p className="text-xs text-gray-400 mb-2">Top Skills</p>
                        <div className="flex flex-wrap gap-1">
                          {candidate.resume?.skills?.slice(0, 4).map((skill, i) => (
                            <Badge key={i} variant="outline" className="border-[#A8F32C] text-[#A8F32C] text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.resume?.skills?.length > 4 && (
                            <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                              +{candidate.resume.skills.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Certifications */}
                      {candidate.certifications.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-400 mb-2">
                            <Award className="h-3 w-3 inline mr-1" />
                            Certifications ({candidate.certifications.length})
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {candidate.certifications.slice(0, 2).map((cert: any, i) => (
                              <Badge key={i} variant="outline" className="border-blue-500 text-blue-400 text-xs">
                                {cert.certType}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Habit Tracking */}
                      {candidate.habits.length > 0 && (
                        <div className="p-2 bg-green-900/20 border border-green-800 rounded">
                          <p className="text-xs text-green-400">
                            <TrendingUp className="h-3 w-3 inline mr-1" />
                            {candidate.habits.length} active habits tracked
                          </p>
                          {candidate.habits[0] && (
                            <p className="text-xs text-gray-400 mt-1">
                              Best: {candidate.habits[0].longestStreak || 0} day streak
                            </p>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-700 text-gray-400 hover:text-white flex-1"
                              onClick={() => setSelectedCandidate(candidate)}
                            >
                              View Profile
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-900 border-gray-800 max-w-3xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-white text-2xl">
                                {candidate.fullName}
                              </DialogTitle>
                              <DialogDescription className="text-gray-400">
                                Releases on {new Date(candidate.releaseDate).toLocaleDateString()} from {candidate.facilityName}
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-4 mt-4">
                              {/* Objective */}
                              {candidate.resume?.objectiveStatement && (
                                <div>
                                  <h4 className="text-sm font-semibold text-white mb-2">Objective</h4>
                                  <p className="text-sm text-gray-400">{candidate.resume.objectiveStatement}</p>
                                </div>
                              )}

                              {/* Skills */}
                              <div>
                                <h4 className="text-sm font-semibold text-white mb-2">Skills</h4>
                                <div className="flex flex-wrap gap-2">
                                  {candidate.resume?.skills?.map((skill, i) => (
                                    <Badge key={i} variant="outline" className="border-[#A8F32C] text-[#A8F32C]">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              {/* Work History */}
                              {candidate.resume?.workHistory && candidate.resume.workHistory.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-white mb-2">Work Experience</h4>
                                  <div className="space-y-3">
                                    {candidate.resume.workHistory.map((job: any, i) => (
                                      <div key={i} className="p-3 bg-gray-800 rounded border border-gray-700">
                                        <p className="text-white font-semibold">{job.title}</p>
                                        <p className="text-sm text-gray-400">{job.company}</p>
                                        <p className="text-xs text-gray-500">{job.startDate} - {job.endDate}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Certifications */}
                              {candidate.certifications.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-white mb-2">Certifications</h4>
                                  <div className="space-y-2">
                                    {candidate.certifications.map((cert: any, i) => (
                                      <div key={i} className="p-2 bg-blue-900/20 border border-blue-800 rounded">
                                        <p className="text-white text-sm">{cert.certName}</p>
                                        <p className="text-xs text-gray-400">{cert.issuingOrganization}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Goals */}
                              {candidate.goals.length > 0 && (
                                <div>
                                  <h4 className="text-sm font-semibold text-white mb-2">30/60/90 Day Goals</h4>
                                  <div className="space-y-2">
                                    {candidate.goals.map((goal: any, i) => (
                                      <div key={i} className="p-2 bg-gray-800 rounded">
                                        <p className="text-white text-sm">{goal.goalText}</p>
                                        <Badge variant="outline" className="mt-1 text-xs">
                                          {goal.goalCategory}
                                        </Badge>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button
                          size="sm"
                          className="bg-[#A8F32C] text-black hover:bg-[#8CD423] flex-1"
                          onClick={() => {
                            setSelectedCandidate(candidate);
                            setShowOfferDialog(true);
                          }}
                        >
                          <Send className="h-3 w-3 mr-1" />
                          Make Offer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Make Offer Dialog */}
        <Dialog open={showOfferDialog} onOpenChange={setShowOfferDialog}>
          <DialogContent className="bg-gray-900 border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-white">Make Job Offer</DialogTitle>
              <DialogDescription className="text-gray-400">
                Send a job offer to {selectedCandidate?.fullName}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div>
                <Label className="text-gray-400">Job Title *</Label>
                <Input
                  placeholder="Warehouse Associate"
                  value={offerForm.jobTitle}
                  onChange={(e) => setOfferForm({ ...offerForm, jobTitle: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div>
                <Label className="text-gray-400">Job Description</Label>
                <Textarea
                  placeholder="Describe the role and responsibilities..."
                  value={offerForm.jobDescription}
                  onChange={(e) => setOfferForm({ ...offerForm, jobDescription: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-400">Salary Min (Annual)</Label>
                  <Input
                    type="number"
                    placeholder="35000"
                    value={offerForm.salaryMin}
                    onChange={(e) => setOfferForm({ ...offerForm, salaryMin: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <Label className="text-gray-400">Salary Max (Annual)</Label>
                  <Input
                    type="number"
                    placeholder="45000"
                    value={offerForm.salaryMax}
                    onChange={(e) => setOfferForm({ ...offerForm, salaryMax: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-400">Start Date</Label>
                <Input
                  type="date"
                  value={offerForm.startDate}
                  onChange={(e) => setOfferForm({ ...offerForm, startDate: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowOfferDialog(false)}
                  className="flex-1 border-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  onClick={createOffer}
                  disabled={!offerForm.jobTitle}
                  className="flex-1 bg-[#A8F32C] text-black hover:bg-[#8CD423]"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Offer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
