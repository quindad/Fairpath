import { Star, ThumbsUp, ThumbsDown, AlertCircle, TrendingUp, MessageSquare } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import LogoWithTagline from '../common/LogoWithTagline';

interface Review {
  id: string;
  applicantName: string;
  rating: number;
  date: string;
  propertyAddress: string;
  comment: string;
  showingProvided: boolean;
  responseTime: 'fast' | 'average' | 'slow';
  wouldRecommend: boolean;
}

const DUMMY_REVIEWS: Review[] = [
  {
    id: '1',
    applicantName: 'Marcus J.',
    rating: 5,
    date: '2025-01-20',
    propertyAddress: '742 Evergreen Terrace',
    comment: 'Great landlord! Very professional, gave me a fair showing and actually considered my application despite my record. Communication was excellent.',
    showingProvided: true,
    responseTime: 'fast',
    wouldRecommend: true
  },
  {
    id: '2',
    applicantName: 'Sarah W.',
    rating: 4,
    date: '2025-01-18',
    propertyAddress: '742 Evergreen Terrace',
    comment: 'Responsive and fair. Showing was on time. Didn\'t get the apartment but the process was respectful.',
    showingProvided: true,
    responseTime: 'average',
    wouldRecommend: true
  },
  {
    id: '3',
    applicantName: 'David C.',
    rating: 5,
    date: '2025-01-15',
    propertyAddress: '124 Conch Street',
    comment: 'Honest and transparent about requirements. Appreciated the quick response and clear communication throughout.',
    showingProvided: true,
    responseTime: 'fast',
    wouldRecommend: true
  }
];

interface LandlordReviewSystemProps {
  landlordName: string;
  onBack: () => void;
}

export default function LandlordReviewSystem({ landlordName, onBack }: LandlordReviewSystemProps) {
  const averageRating = DUMMY_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / DUMMY_REVIEWS.length;
  const totalReviews = DUMMY_REVIEWS.length;
  const recommendPercentage = Math.round((DUMMY_REVIEWS.filter(r => r.wouldRecommend).length / totalReviews) * 100);

  const ratingDistribution = {
    5: DUMMY_REVIEWS.filter(r => r.rating === 5).length,
    4: DUMMY_REVIEWS.filter(r => r.rating === 4).length,
    3: DUMMY_REVIEWS.filter(r => r.rating === 3).length,
    2: DUMMY_REVIEWS.filter(r => r.rating === 2).length,
    1: DUMMY_REVIEWS.filter(r => r.rating === 1).length,
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <LogoWithTagline size="md" />
            <Button onClick={onBack} variant="outline" className="border-white/20 text-white">
              Back
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Your Landlord Rating</h1>
          <p className="text-white/60">
            Applicants can review their experience applying through FastTrack. Your rating affects 
            your visibility and trustworthiness on the platform.
          </p>
        </div>

        {/* Overall Rating Card */}
        <Card className="bg-gradient-to-br from-[#A8F32C]/20 via-[#121212] to-[#121212] border-[#A8F32C] p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Average Rating */}
            <div className="text-center">
              <div className="text-6xl text-[#A8F32C] mb-2">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(averageRating)
                        ? 'fill-[#A8F32C] text-[#A8F32C]'
                        : 'text-white/20'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm text-white/60">Based on {totalReviews} reviews</div>
            </div>

            {/* Recommendation Rate */}
            <div className="text-center border-l border-r border-white/10 px-8">
              <div className="text-6xl text-[#A8F32C] mb-2">{recommendPercentage}%</div>
              <div className="flex justify-center gap-2 mb-2">
                <ThumbsUp className="h-5 w-5 text-[#A8F32C]" />
              </div>
              <div className="text-sm text-white/60">Would recommend</div>
            </div>

            {/* Response Time */}
            <div className="text-center">
              <div className="text-6xl text-[#A8F32C] mb-2">
                <TrendingUp className="h-16 w-16 mx-auto" />
              </div>
              <div className="text-sm text-white/60 mb-1">Response Time</div>
              <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                Fast
              </Badge>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <h3 className="text-lg mb-4">Rating Distribution</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingDistribution[rating as keyof typeof ratingDistribution];
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

                return (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-20">
                      <span className="text-sm text-white">{rating}</span>
                      <Star className="h-3 w-3 text-[#A8F32C]" />
                    </div>
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#A8F32C]"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <div className="text-sm text-white/60 w-12 text-right">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Anti-Slumlord Protection */}
        <Card className="bg-yellow-500/10 border-yellow-500/30 p-6 mb-8">
          <div className="flex gap-3">
            <AlertCircle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg text-yellow-500 mb-2">Rating Protection System</h3>
              <p className="text-sm text-white/60 mb-3">
                This rating system exists to protect applicants from landlords who abuse the FastTrack system. 
                Consistently low ratings indicate problems like:
              </p>
              <ul className="text-sm text-white/60 space-y-1 mb-3">
                <li>• Not providing promised showings</li>
                <li>• Collecting fees with no intent to rent</li>
                <li>• Poor communication or unprofessional behavior</li>
                <li>• Discriminatory practices</li>
              </ul>
              <p className="text-sm text-white/60">
                Landlords with ratings below 3.0 are subject to account review and potential removal.
              </p>
            </div>
          </div>
        </Card>

        {/* Recent Reviews */}
        <div className="mb-8">
          <h2 className="text-2xl mb-6">Recent Reviews</h2>
          <div className="space-y-4">
            {DUMMY_REVIEWS.map((review) => (
              <Card key={review.id} className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-white">{review.applicantName}</div>
                      <Badge className="bg-white/10 text-white/60 border-0">
                        Verified Applicant
                      </Badge>
                    </div>
                    <div className="text-sm text-white/60">{review.propertyAddress}</div>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-0.5 mb-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? 'fill-[#A8F32C] text-[#A8F32C]'
                              : 'text-white/20'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-xs text-white/40">{review.date}</div>
                  </div>
                </div>

                <p className="text-white/80 mb-4">{review.comment}</p>

                <div className="flex gap-4 text-sm">
                  {review.showingProvided && (
                    <div className="flex items-center gap-1 text-[#A8F32C]">
                      <Star className="h-4 w-4" />
                      <span>Showing provided</span>
                    </div>
                  )}
                  <div className={`flex items-center gap-1 ${
                    review.responseTime === 'fast' ? 'text-[#A8F32C]' : 'text-white/60'
                  }`}>
                    <MessageSquare className="h-4 w-4" />
                    <span className="capitalize">{review.responseTime} response</span>
                  </div>
                  {review.wouldRecommend && (
                    <div className="flex items-center gap-1 text-[#A8F32C]">
                      <ThumbsUp className="h-4 w-4" />
                      <span>Would recommend</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* How to Improve */}
        <Card className="bg-[#121212] border-white/10 p-8">
          <h2 className="text-2xl mb-6">How to Maintain a High Rating</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-[#A8F32C] mb-3">Do This:</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li className="flex gap-2">
                  <span className="text-[#A8F32C]">✓</span>
                  <span>Respond to applications within 24-48 hours</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#A8F32C]">✓</span>
                  <span>Provide all guaranteed showings</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#A8F32C]">✓</span>
                  <span>Be professional and respectful</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#A8F32C]">✓</span>
                  <span>Give clear, honest feedback</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[#A8F32C]">✓</span>
                  <span>Consider applicants fairly</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-red-500 mb-3">Avoid This:</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li className="flex gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Ignoring or ghosting applicants</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Canceling showings last minute</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Being unprofessional or rude</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Collecting fees with no intent to rent</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-500">✗</span>
                  <span>Discriminatory behavior</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
