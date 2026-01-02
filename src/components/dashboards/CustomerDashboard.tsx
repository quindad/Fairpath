import { useState } from 'react';
import { ShoppingBag, Star, Calendar, DollarSign, Settings, LogOut, User, Award, ChevronRight, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import LogoFinal from '../common/LogoFinal';
import { useUser } from '../../contexts/UserContext';
import ServicesTab from '../felon/ServicesTab';
import ServiceBookingFlow from '../felon/ServiceBookingFlow';

interface CustomerDashboardProps {
  userData?: any;
  onNavigate?: (screen: string) => void;
}

export default function CustomerDashboard({ userData, onNavigate }: CustomerDashboardProps) {
  const { logout } = useUser();
  const [activeTab, setActiveTab] = useState<'browse' | 'my-bookings' | 'reviews'>('browse');
  const [bookingProvider, setBookingProvider] = useState<any | null>(null);

  const customerData = {
    name: userData?.name || 'John Smith',
    email: userData?.email || 'john.smith@demo.com',
    fairPathScore: userData?.fairPathScore || 756,
    totalBookings: userData?.totalBookings || 12,
    totalSpent: userData?.totalSpent || 1847,
    joinedDate: userData?.joinedDate || 'March 2024',
    avatar: userData?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
  };

  // My Bookings
  const myBookings = [
    {
      id: 1,
      provider: 'Jamal Williams',
      providerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      service: 'Handyman Services',
      jobDescription: 'Fix leaking faucet and patch drywall',
      date: 'Dec 10, 2025',
      time: '10:00 AM',
      location: '1234 Main St, Chicago',
      amount: 135,
      status: 'scheduled',
      providerRating: 4.9
    },
    {
      id: 2,
      provider: 'Marcus Thompson',
      providerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      service: 'Moving & Labor',
      jobDescription: 'Help move furniture to new apartment',
      date: 'Dec 15, 2025',
      time: '2:00 PM',
      location: '5678 Oak Ave, Chicago',
      amount: 280,
      status: 'scheduled',
      providerRating: 4.8
    },
    {
      id: 3,
      provider: 'Darnell Brown',
      providerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
      service: 'Auto Detailing',
      jobDescription: 'Full interior and exterior detail',
      date: 'Dec 5, 2025',
      time: 'Completed',
      location: '9012 Elm St, Chicago',
      amount: 165,
      status: 'completed',
      providerRating: 5.0,
      needsReview: true
    },
    {
      id: 4,
      provider: 'Carlos Garcia',
      providerAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
      service: 'House Cleaning',
      jobDescription: 'Deep clean 3-bedroom house',
      date: 'Nov 28, 2025',
      time: 'Completed',
      location: '3456 Pine St, Chicago',
      amount: 180,
      status: 'completed',
      providerRating: 4.7,
      myReview: 5
    }
  ];

  // My Reviews Given
  const myReviews = [
    {
      id: 1,
      provider: 'Carlos Garcia',
      service: 'House Cleaning',
      rating: 5,
      date: 'Nov 29, 2025',
      comment: 'Carlos did an amazing job! My house has never looked better. Very professional and thorough.'
    },
    {
      id: 2,
      provider: 'Kevin Johnson',
      service: 'Computer Repair',
      rating: 4,
      date: 'Nov 15, 2025',
      comment: 'Fixed my laptop quickly. Good service, would recommend.'
    }
  ];

  // If booking a service, show that flow
  if (bookingProvider) {
    return (
      <ServiceBookingFlow
        provider={bookingProvider}
        onClose={() => setBookingProvider(null)}
        onBook={(bookingData) => {
          console.log('Booking created:', bookingData);
          // Add to bookings list
          setBookingProvider(null);
          setActiveTab('my-bookings');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Navigation Bar */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <LogoFinal size="md" />
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-white/60 hover:text-white">
                <Settings className="h-5 w-5" />
              </Button>
              <Button onClick={logout} variant="outline" className="border-white/20 text-white hover:bg-white/5">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Customer Header */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-blue-500/10 to-transparent border-blue-500/30 p-6">
            <div className="flex items-start gap-6">
              <img src={customerData.avatar} alt={customerData.name} className="w-24 h-24 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl mb-2 text-white">{customerData.name}</h1>
                    <div className="text-white/60 mb-3">{customerData.email}</div>
                    <div className="flex gap-4 text-sm">
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        {customerData.totalBookings} bookings
                      </Badge>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        ${customerData.totalSpent} spent
                      </Badge>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        Member since {customerData.joinedDate}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FairPath Score */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[#A8F32C]" />
                  <span className="text-white">FairPath Score</span>
                </div>
                <span className="text-2xl text-[#A8F32C]">{customerData.fairPathScore}</span>
              </div>
              <Progress value={(customerData.fairPathScore / 1000) * 100} className="h-2" />
              <div className="text-xs text-white/60 mt-1">
                Pay on time and leave reviews to increase your score
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'browse', label: 'Browse Services', icon: ShoppingBag },
            { id: 'my-bookings', label: 'My Bookings', icon: Calendar },
            { id: 'reviews', label: 'My Reviews', icon: Star }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                className={activeTab === tab.id ? 'bg-blue-500 text-white' : 'border-white/20 text-white hover:bg-white/5'}
                onClick={() => setActiveTab(tab.id as any)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* BROWSE SERVICES TAB */}
        {activeTab === 'browse' && (
          <ServicesTab
            onBookService={(provider) => setBookingProvider(provider)}
            onBecomeProvider={() => alert('Switch to Provider account to offer services')}
            isProvider={false}
          />
        )}

        {/* MY BOOKINGS TAB */}
        {activeTab === 'my-bookings' && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  <span className="text-white/60">Upcoming</span>
                </div>
                <div className="text-3xl text-white">{myBookings.filter(b => b.status === 'scheduled').length}</div>
                <div className="text-sm text-white/60">Scheduled bookings</div>
              </Card>

              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  <span className="text-white/60">Total Spent</span>
                </div>
                <div className="text-3xl text-white">${customerData.totalSpent}</div>
                <div className="text-sm text-white/60">All time</div>
              </Card>

              <Card className="bg-[#121212] border-white/10 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="text-white/60">Reviews</span>
                </div>
                <div className="text-3xl text-white">{myReviews.length}</div>
                <div className="text-sm text-white/60">Given</div>
              </Card>
            </div>

            {/* Upcoming Bookings */}
            {myBookings.filter(b => b.status === 'scheduled').length > 0 && (
              <Card className="bg-[#121212] border-white/10 p-6">
                <h2 className="text-2xl mb-4 text-white">Upcoming Bookings</h2>
                <div className="space-y-4">
                  {myBookings.filter(b => b.status === 'scheduled').map((booking) => (
                    <Card key={booking.id} className="bg-black/50 border-white/10 p-4">
                      <div className="flex items-start gap-4">
                        <img src={booking.providerAvatar} alt={booking.provider} className="w-16 h-16 rounded-full object-cover" />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="text-lg text-white mb-1">{booking.provider}</div>
                              <div className="text-sm text-white/60 mb-1">{booking.service}</div>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                                  ⭐ {booking.providerRating}
                                </Badge>
                                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                  ${booking.amount}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-white/80 mb-2">{booking.jobDescription}</div>
                          <div className="flex gap-4 text-sm text-white/60">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {booking.date} at {booking.time}
                            </div>
                          </div>
                          <div className="text-sm text-white/60 mt-1">{booking.location}</div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" className="flex-1 border-white/20 text-white">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Message Provider
                        </Button>
                        <Button variant="outline" className="flex-1 border-white/20 text-white">
                          Reschedule
                        </Button>
                        <Button variant="outline" className="flex-1 border-red-500/30 text-red-400">
                          Cancel Booking
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            )}

            {/* Completed Bookings */}
            {myBookings.filter(b => b.status === 'completed').length > 0 && (
              <Card className="bg-[#121212] border-white/10 p-6">
                <h2 className="text-2xl mb-4 text-white">Completed Bookings</h2>
                <div className="space-y-4">
                  {myBookings.filter(b => b.status === 'completed').map((booking) => (
                    <Card key={booking.id} className="bg-black/50 border-white/10 p-4">
                      <div className="flex items-start gap-4">
                        <img src={booking.providerAvatar} alt={booking.provider} className="w-16 h-16 rounded-full object-cover" />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="text-lg text-white mb-1">{booking.provider}</div>
                              <div className="text-sm text-white/60 mb-1">{booking.service}</div>
                              <div className="flex items-center gap-2">
                                <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                                  ⭐ {booking.providerRating}
                                </Badge>
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                  Completed
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg text-white">${booking.amount}</div>
                              <div className="text-sm text-white/60">{booking.date}</div>
                            </div>
                          </div>
                          <div className="text-sm text-white/80 mb-2">{booking.jobDescription}</div>
                          {booking.needsReview && (
                            <Button className="mt-3 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                              Leave Review
                            </Button>
                          )}
                          {booking.myReview && (
                            <div className="mt-3 text-sm text-white/60">
                              ✓ You rated this {booking.myReview} stars
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}

        {/* MY REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <Card className="bg-[#121212] border-white/10 p-6">
              <h2 className="text-2xl mb-4 text-white">Reviews You've Given</h2>
              <div className="space-y-4">
                {myReviews.map((review) => (
                  <Card key={review.id} className="bg-black/50 border-white/10 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-lg text-white mb-1">{review.provider}</div>
                        <div className="text-sm text-white/60 mb-2">{review.service}</div>
                        <div className="flex items-center gap-1 text-yellow-400">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-white/60">{review.date}</div>
                    </div>
                    <div className="text-white/80">{review.comment}</div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Pending Reviews */}
            {myBookings.filter(b => b.needsReview).length > 0 && (
              <Card className="bg-gradient-to-r from-yellow-500/10 to-transparent border-yellow-500/30 p-6">
                <h2 className="text-2xl mb-4 text-white">Pending Reviews</h2>
                <div className="text-white/60 mb-4">
                  Help the community by reviewing your recent bookings
                </div>
                <div className="space-y-3">
                  {myBookings.filter(b => b.needsReview).map((booking) => (
                    <Card key={booking.id} className="bg-black/50 border-white/10 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white mb-1">{booking.provider} - {booking.service}</div>
                          <div className="text-sm text-white/60">{booking.date}</div>
                        </div>
                        <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                          Leave Review
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
