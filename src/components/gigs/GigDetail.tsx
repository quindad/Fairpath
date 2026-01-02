import { Star, MapPin, Clock, Shield, Award, CheckCircle, MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface GigDetailProps {
  gig: any;
  onBook: () => void;
  onMessage: () => void;
  onBack: () => void;
}

export default function GigDetail({ gig, onBook, onMessage, onBack }: GigDetailProps) {
  const reviews = [
    {
      id: 1,
      customerName: 'Sarah M.',
      rating: 5,
      date: '2024-11-28',
      comment: 'Excellent work! Very professional and finished ahead of schedule.',
      jobType: 'House Painting'
    },
    {
      id: 2,
      customerName: 'Mike T.',
      rating: 5,
      date: '2024-11-20',
      comment: 'Great attention to detail. Will definitely hire again.',
      jobType: 'Interior Painting'
    },
    {
      id: 3,
      customerName: 'Jennifer L.',
      rating: 4,
      date: '2024-11-10',
      comment: 'Good work overall. Communication could be better but quality was great.',
      jobType: 'Exterior Painting'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212]">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <Button
            variant="ghost"
            className="text-white/60 hover:text-white mb-4"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Gigs
          </Button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Gig Title & Description */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <h1 className="text-3xl mb-4">{gig.title}</h1>
              <p className="text-white/80 text-lg mb-6">{gig.description}</p>
              
              <div className="flex gap-2 mb-6">
                {gig.tags.map((tag: string, index: number) => (
                  <Badge key={index} className="bg-white/10 text-white border-white/20">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 bg-black/50 rounded-lg">
                <div>
                  <div className="text-sm text-white/60 mb-1">Completed Jobs</div>
                  <div className="text-xl text-white">{gig.completedJobs}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Response Time</div>
                  <div className="text-xl text-white">{gig.responseTime}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Location</div>
                  <div className="text-white flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">Chicago, IL</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Reviews */}
            <Card className="bg-[#121212] border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl">Reviews ({gig.providerReviews})</h2>
                <div className="flex items-center gap-2">
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl text-white">{gig.providerRating}</span>
                  <span className="text-white/60">out of 5</span>
                </div>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-white/10 pb-4 last:border-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-white mb-1">{review.customerName}</div>
                        <div className="flex items-center gap-2 mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-white/20'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-white/60">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-white/80 mb-2">{review.comment}</p>
                    <Badge className="bg-white/10 text-white/60 border-white/10 text-xs">
                      {review.jobType}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Provider Card */}
            <Card className="bg-[#121212] border-white/10 p-6 sticky top-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl">
                  {gig.providerName[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg text-white">{gig.providerName}</h3>
                    {gig.verified && (
                      <Shield className="h-5 w-5 text-[#A8F32C]" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                      <Award className="h-3 w-3 mr-1" />
                      {gig.providerScore} Score
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-xl text-white">{gig.providerRating}</span>
                  <span className="text-white/60">({gig.providerReviews} reviews)</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-6 p-4 bg-black/50 border border-white/10 rounded-lg">
                <div className="text-sm text-white/60 mb-2">
                  {gig.priceType === 'hourly' ? 'Hourly Rate' : 'Starting at'}
                </div>
                <div className="text-4xl text-[#A8F32C] mb-1">
                  ${gig.price}
                  <span className="text-lg text-white/60">
                    {gig.priceType === 'hourly' ? '/hr' : ''}
                  </span>
                </div>
                <div className="text-xs text-white/60 mt-2">
                  + 5% FairPath service fee
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                  onClick={onBook}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Book Now
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-white/20 text-white hover:bg-white/5"
                  onClick={onMessage}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message Provider
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span className="text-white/80">Background verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-white/80">FairPath+ member</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Award className="h-4 w-4 text-yellow-400" />
                  <span className="text-white/80">Top rated provider</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
