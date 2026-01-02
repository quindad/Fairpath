import { useState } from 'react';
import { Search, Filter, Star, MapPin, DollarSign, Clock, TrendingUp, Plus, Briefcase, Home as HomeIcon, Wrench, Car, Scissors, Users, ArrowRight, CheckCircle, Award } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

interface Gig {
  id: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  title: string;
  category: string;
  description: string;
  price: number;
  priceType: 'fixed' | 'hourly';
  location: string;
  rating: number;
  reviews: number;
  completedJobs: number;
  responseTime: string;
  availability: string;
  verified: boolean;
  tags: string[];
  images: string[];
}

interface GigsMarketplaceCompleteProps {
  onSelectGig: (gig: Gig) => void;
  onCreateGig: () => void;
  userType: 'user' | 'provider';
}

export default function GigsMarketplaceComplete({ onSelectGig, onCreateGig, userType }: GigsMarketplaceCompleteProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState<'all' | 'budget' | 'mid' | 'premium'>('all');
  const [view, setView] = useState<'browse' | 'my-gigs' | 'orders'>('browse');

  const categories = [
    { id: 'all', name: 'All Services', icon: Briefcase },
    { id: 'home', name: 'Home & Garden', icon: HomeIcon },
    { id: 'handyman', name: 'Handyman', icon: Wrench },
    { id: 'automotive', name: 'Automotive', icon: Car },
    { id: 'beauty', name: 'Beauty & Wellness', icon: Scissors },
    { id: 'moving', name: 'Moving & Labor', icon: Users },
  ];

  const gigs: Gig[] = [
    {
      id: 'gig_001',
      providerId: 'provider_001',
      providerName: 'Marcus Thompson',
      providerAvatar: '🔧',
      title: 'Professional Home Repairs & Handyman Services',
      category: 'handyman',
      description: 'Expert handyman with 10+ years experience. Drywall, painting, plumbing, electrical, and more.',
      price: 45,
      priceType: 'hourly',
      location: 'Chicago, IL',
      rating: 4.9,
      reviews: 87,
      completedJobs: 142,
      responseTime: 'Within 2 hours',
      availability: 'Available now',
      verified: true,
      tags: ['Plumbing', 'Electrical', 'Drywall', 'Painting'],
      images: []
    },
    {
      id: 'gig_002',
      providerId: 'provider_002',
      providerName: 'David Williams',
      providerAvatar: '🚗',
      title: 'Mobile Auto Detailing & Car Wash',
      category: 'automotive',
      description: 'I come to you! Full detail, wash, wax, interior cleaning. Your car will look brand new.',
      price: 120,
      priceType: 'fixed',
      location: 'Oakland, CA',
      rating: 4.8,
      reviews: 56,
      completedJobs: 98,
      responseTime: 'Within 1 hour',
      availability: 'Available this week',
      verified: true,
      tags: ['Detailing', 'Wash & Wax', 'Interior Clean'],
      images: []
    },
    {
      id: 'gig_003',
      providerId: 'provider_003',
      providerName: 'James Rodriguez',
      providerAvatar: '🌳',
      title: 'Lawn Care & Landscaping Services',
      category: 'home',
      description: 'Mowing, edging, trimming, leaf removal, and basic landscaping. Weekly or one-time service.',
      price: 35,
      priceType: 'hourly',
      location: 'Atlanta, GA',
      rating: 5.0,
      reviews: 112,
      completedJobs: 287,
      responseTime: 'Within 30 min',
      availability: 'Available now',
      verified: true,
      tags: ['Lawn Care', 'Landscaping', 'Leaf Removal'],
      images: []
    },
    {
      id: 'gig_004',
      providerId: 'provider_004',
      providerName: 'Michael Brown',
      providerAvatar: '📦',
      title: 'Moving Help & Heavy Lifting',
      category: 'moving',
      description: 'Strong, reliable help for moving, furniture assembly, and heavy lifting. Truck available.',
      price: 30,
      priceType: 'hourly',
      location: 'Houston, TX',
      rating: 4.7,
      reviews: 43,
      completedJobs: 76,
      responseTime: 'Same day',
      availability: 'Available weekends',
      verified: false,
      tags: ['Moving', 'Assembly', 'Heavy Lifting'],
      images: []
    },
    {
      id: 'gig_005',
      providerId: 'provider_005',
      providerName: 'Robert Johnson',
      providerAvatar: '✂️',
      title: 'Barbershop Quality Haircuts - Mobile Service',
      category: 'beauty',
      description: 'Professional barber bringing the shop to you. Fades, tapers, beard trims, and more.',
      price: 40,
      priceType: 'fixed',
      location: 'Detroit, MI',
      rating: 4.9,
      reviews: 134,
      completedJobs: 421,
      responseTime: 'Within 1 hour',
      availability: 'Book 24hrs ahead',
      verified: true,
      tags: ['Haircuts', 'Fades', 'Beard Trim', 'Mobile'],
      images: []
    },
    {
      id: 'gig_006',
      providerId: 'provider_006',
      providerName: 'Christopher Davis',
      providerAvatar: '🎨',
      title: 'Interior & Exterior Painting',
      category: 'home',
      description: 'Quality painting services for residential and commercial. Free estimates, all supplies included.',
      price: 50,
      priceType: 'hourly',
      location: 'Phoenix, AZ',
      rating: 4.8,
      reviews: 67,
      completedJobs: 94,
      responseTime: 'Within 3 hours',
      availability: 'Next week',
      verified: true,
      tags: ['Interior Painting', 'Exterior Painting', 'Commercial'],
      images: []
    },
  ];

  const filteredGigs = gigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gig.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gig.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || gig.category === selectedCategory;
    
    const matchesPrice = priceFilter === 'all' ||
                        (priceFilter === 'budget' && gig.price < 35) ||
                        (priceFilter === 'mid' && gig.price >= 35 && gig.price < 60) ||
                        (priceFilter === 'premium' && gig.price >= 60);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  if (view === 'browse') {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="border-b border-white/10 bg-[#121212] sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl mb-1">FairPath Gigs</h1>
                <p className="text-white/60 text-sm">Connect with skilled workers in your area</p>
              </div>
              {userType === 'provider' && (
                <Button
                  onClick={onCreateGig}
                  className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Create Gig
                </Button>
              )}
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setView('browse')}
                className="px-4 py-2 bg-[#A8F32C] text-black rounded-lg"
              >
                Browse Gigs
              </button>
              {userType === 'provider' && (
                <>
                  <button
                    onClick={() => setView('my-gigs')}
                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
                  >
                    My Gigs
                  </button>
                  <button
                    onClick={() => setView('orders')}
                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
                  >
                    Orders
                  </button>
                </>
              )}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for services..."
                className="pl-10 bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <Card className="bg-white/5 border-white/10 p-4 sticky top-24">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </h3>

                {/* Categories */}
                <div className="mb-6">
                  <div className="text-sm text-white/60 mb-2">Category</div>
                  <div className="space-y-1">
                    {categories.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === cat.id
                              ? 'bg-[#A8F32C] text-black'
                              : 'bg-white/5 text-white hover:bg-white/10'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{cat.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <div className="text-sm text-white/60 mb-2">Price Range</div>
                  <div className="space-y-1">
                    <button
                      onClick={() => setPriceFilter('all')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        priceFilter === 'all'
                          ? 'bg-[#A8F32C] text-black'
                          : 'bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      <span className="text-sm">All Prices</span>
                    </button>
                    <button
                      onClick={() => setPriceFilter('budget')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        priceFilter === 'budget'
                          ? 'bg-[#A8F32C] text-black'
                          : 'bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      <span className="text-sm">Budget (< $35)</span>
                    </button>
                    <button
                      onClick={() => setPriceFilter('mid')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        priceFilter === 'mid'
                          ? 'bg-[#A8F32C] text-black'
                          : 'bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      <span className="text-sm">Mid-Range ($35-60)</span>
                    </button>
                    <button
                      onClick={() => setPriceFilter('premium')}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        priceFilter === 'premium'
                          ? 'bg-[#A8F32C] text-black'
                          : 'bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      <span className="text-sm">Premium ($60+)</span>
                    </button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Gigs Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <div className="text-white/60 text-sm">
                  {filteredGigs.length} services found
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredGigs.map((gig) => (
                  <Card
                    key={gig.id}
                    onClick={() => onSelectGig(gig)}
                    className="bg-white/5 border-white/10 p-5 hover:border-[#A8F32C]/50 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#A8F32C]/20 rounded-full flex items-center justify-center text-2xl">
                          {gig.providerAvatar}
                        </div>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {gig.providerName}
                            {gig.verified && (
                              <CheckCircle className="w-4 h-4 text-[#A8F32C]" />
                            )}
                          </div>
                          <div className="text-sm text-white/60">{gig.completedJobs} jobs completed</div>
                        </div>
                      </div>
                    </div>

                    <h3 className="font-medium mb-2 group-hover:text-[#A8F32C] transition-colors">
                      {gig.title}
                    </h3>

                    <p className="text-sm text-white/60 mb-3 line-clamp-2">
                      {gig.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {gig.tags.slice(0, 3).map((tag, index) => (
                        <Badge
                          key={index}
                          className="bg-white/10 text-white/80 border-white/20 text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 mb-3 text-sm text-white/60">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#A8F32C] text-[#A8F32C]" />
                        <span>{gig.rating}</span>
                        <span>({gig.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{gig.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <div>
                        <div className="text-2xl text-[#A8F32C]">
                          ${gig.price}
                          <span className="text-sm text-white/60">
                            /{gig.priceType === 'hourly' ? 'hr' : 'job'}
                          </span>
                        </div>
                        <div className="text-xs text-white/60">{gig.availability}</div>
                      </div>
                      <Button
                        size="sm"
                        className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                      >
                        View Details
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredGigs.length === 0 && (
                <Card className="bg-white/5 border-white/10 p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl mb-2">No gigs found</h3>
                  <p className="text-white/60 mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setPriceFilter('all');
                    }}
                    variant="outline"
                    className="border-white/20 text-white"
                  >
                    Clear Filters
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'my-gigs') {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-white/10 bg-[#121212]">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <h1 className="text-2xl mb-4">My Gigs</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setView('browse')}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
              >
                Browse Gigs
              </button>
              <button
                onClick={() => setView('my-gigs')}
                className="px-4 py-2 bg-[#A8F32C] text-black rounded-lg"
              >
                My Gigs
              </button>
              <button
                onClick={() => setView('orders')}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
              >
                Orders
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-white/5 border-white/10 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="w-5 h-5 text-[#A8F32C]" />
                <div className="text-sm text-white/60">Active Gigs</div>
              </div>
              <div className="text-3xl">3</div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <div className="text-sm text-white/60">Total Earnings</div>
              </div>
              <div className="text-3xl text-[#A8F32C]">$2,847</div>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <div className="flex items-center gap-3 mb-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <div className="text-sm text-white/60">Average Rating</div>
              </div>
              <div className="text-3xl">4.8</div>
            </Card>
          </div>

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl">Your Gigs</h2>
            <Button
              onClick={onCreateGig}
              className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
            >
              <Plus className="mr-2 h-5 w-5" />
              Create New Gig
            </Button>
          </div>

          <div className="space-y-4">
            {gigs.slice(0, 3).map((gig) => (
              <Card key={gig.id} className="bg-white/5 border-white/10 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl mb-2">{gig.title}</h3>
                    <p className="text-white/60 mb-3">{gig.description}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-[#A8F32C] text-[#A8F32C]" />
                        <span>{gig.rating} ({gig.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#A8F32C]" />
                        <span>{gig.completedJobs} completed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-[#A8F32C]" />
                        <span>${gig.price}/{gig.priceType === 'hourly' ? 'hr' : 'job'}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                    Active
                  </Badge>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-white/20 text-white"
                  >
                    Edit Gig
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-white/20 text-white"
                  >
                    View Stats
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                  >
                    Pause
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'orders') {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="border-b border-white/10 bg-[#121212]">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <h1 className="text-2xl mb-4">Orders</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setView('browse')}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
              >
                Browse Gigs
              </button>
              <button
                onClick={() => setView('my-gigs')}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
              >
                My Gigs
              </button>
              <button
                onClick={() => setView('orders')}
                className="px-4 py-2 bg-[#A8F32C] text-black rounded-lg"
              >
                Orders
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card className="bg-white/5 border-white/10 p-4">
              <div className="text-sm text-white/60 mb-1">Active Orders</div>
              <div className="text-2xl">7</div>
            </Card>
            <Card className="bg-white/5 border-white/10 p-4">
              <div className="text-sm text-white/60 mb-1">Pending Payout</div>
              <div className="text-2xl text-[#A8F32C]">$342</div>
            </Card>
            <Card className="bg-white/5 border-white/10 p-4">
              <div className="text-sm text-white/60 mb-1">This Month</div>
              <div className="text-2xl">23</div>
            </Card>
            <Card className="bg-white/5 border-white/10 p-4">
              <div className="text-sm text-white/60 mb-1">Platform Fee (5%)</div>
              <div className="text-2xl text-white/60">$17.10</div>
            </Card>
          </div>

          <h2 className="text-xl mb-4">Active Orders</h2>
          <div className="space-y-4">
            <Card className="bg-white/5 border-white/10 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg mb-1">Home Repairs - Kitchen Cabinet Fix</h3>
                  <div className="text-sm text-white/60">Ordered by Sarah M. on Jan 3, 2025</div>
                </div>
                <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">
                  In Progress
                </Badge>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-sm text-white/60 mb-1">Job Price</div>
                  <div>$120</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Platform Fee (5%)</div>
                  <div className="text-red-400">-$6.00</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Your Earnings</div>
                  <div className="text-[#A8F32C]">$114</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Scheduled</div>
                  <div>Jan 8, 2pm</div>
                </div>
              </div>
              <Button className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                Mark as Complete
              </Button>
            </Card>

            <Card className="bg-white/5 border-white/10 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg mb-1">Lawn Care Service</h3>
                  <div className="text-sm text-white/60">Ordered by John D. on Jan 2, 2025</div>
                </div>
                <Badge className="bg-purple-500/20 text-purple-500 border-purple-500/30">
                  Scheduled
                </Badge>
              </div>
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-sm text-white/60 mb-1">Job Price</div>
                  <div>$70</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Platform Fee (5%)</div>
                  <div className="text-red-400">-$3.50</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Your Earnings</div>
                  <div className="text-[#A8F32C]">$66.50</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Scheduled</div>
                  <div>Jan 6, 10am</div>
                </div>
              </div>
              <Button variant="outline" className="w-full border-white/20 text-white">
                Contact Customer
              </Button>
            </Card>
          </div>

          <h2 className="text-xl mt-8 mb-4">Completed Orders</h2>
          <div className="space-y-4">
            <Card className="bg-white/5 border-white/10 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg mb-1">Auto Detailing</h3>
                  <div className="text-sm text-white/60">Completed Dec 28, 2024</div>
                </div>
                <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                  Completed
                </Badge>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-white/60 mb-1">Job Price</div>
                  <div>$120</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Platform Fee (5%)</div>
                  <div className="text-red-400">-$6.00</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Your Earnings</div>
                  <div className="text-[#A8F32C]">$114</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">Customer Rating</div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span>5.0</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
