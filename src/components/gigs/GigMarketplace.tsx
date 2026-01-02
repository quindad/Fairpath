import { useState } from 'react';
import { Search, Filter, Star, MapPin, DollarSign, Clock, Wrench, Paintbrush, Truck, Car, Code, Scissors, Trees, Baby, Hammer, ChevronRight, Award, Shield } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';

interface GigMarketplaceProps {
  onSelectGig: (gig: any) => void;
  onBack: () => void;
}

export default function GigMarketplace({ onSelectGig, onBack }: GigMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: 'handyman', label: 'Handyman', icon: Hammer },
    { id: 'painting', label: 'Painting', icon: Paintbrush },
    { id: 'moving', label: 'Moving', icon: Truck },
    { id: 'automotive', label: 'Automotive', icon: Car },
    { id: 'tech', label: 'Tech/Web', icon: Code },
    { id: 'sewing', label: 'Sewing/Alterations', icon: Scissors },
    { id: 'lawn', label: 'Lawn Care', icon: Trees },
    { id: 'childcare', label: 'Childcare', icon: Baby },
    { id: 'construction', label: 'Construction', icon: Wrench }
  ];

  const gigs = [
    {
      id: 1,
      providerId: 'provider-1',
      providerName: 'Marcus Johnson',
      providerRating: 4.9,
      providerReviews: 47,
      providerScore: 856,
      title: 'Professional House Painting',
      category: 'painting',
      description: 'Interior and exterior painting services. 10+ years experience. All supplies included.',
      price: 150,
      priceType: 'starting',
      location: 'Chicago, IL',
      tags: ['Interior', 'Exterior', 'Residential'],
      verified: true,
      responseTime: '1 hour',
      completedJobs: 52,
      image: null
    },
    {
      id: 2,
      providerId: 'provider-2',
      providerName: 'Darnell Brown',
      providerRating: 4.8,
      providerReviews: 33,
      providerScore: 782,
      title: 'Local Moving & Heavy Lifting',
      category: 'moving',
      description: 'Professional moving services. Load/unload trucks, furniture assembly, heavy items.',
      price: 40,
      priceType: 'hourly',
      location: 'Chicago, IL',
      tags: ['Local Moves', 'Loading', 'Assembly'],
      verified: true,
      responseTime: '30 min',
      completedJobs: 38,
      image: null
    },
    {
      id: 3,
      providerId: 'provider-3',
      providerName: 'Jamal Williams',
      providerRating: 5.0,
      providerReviews: 61,
      providerScore: 923,
      title: 'Licensed Electrician Services',
      category: 'construction',
      description: 'Certified electrician. Wiring, outlets, fixtures, troubleshooting. Licensed & insured.',
      price: 85,
      priceType: 'hourly',
      location: 'Chicago, IL',
      tags: ['Licensed', 'Insured', 'Emergency'],
      verified: true,
      responseTime: '15 min',
      completedJobs: 74,
      image: null
    },
    {
      id: 4,
      providerId: 'provider-4',
      providerName: 'Kevin Martinez',
      providerRating: 4.7,
      providerReviews: 28,
      providerScore: 745,
      title: 'Lawn Mowing & Yard Care',
      category: 'lawn',
      description: 'Weekly lawn maintenance, trimming, edging, leaf removal. Own equipment.',
      price: 35,
      priceType: 'starting',
      location: 'Chicago, IL',
      tags: ['Mowing', 'Trimming', 'Cleanup'],
      verified: false,
      responseTime: '2 hours',
      completedJobs: 31,
      image: null
    },
    {
      id: 5,
      providerId: 'provider-5',
      providerName: 'Andre Washington',
      providerRating: 4.9,
      providerReviews: 42,
      providerScore: 834,
      title: 'Auto Detailing & Car Wash',
      category: 'automotive',
      description: 'Full interior/exterior detailing. Wash, wax, vacuum, steam clean. Mobile service available.',
      price: 75,
      priceType: 'starting',
      location: 'Chicago, IL',
      tags: ['Detailing', 'Mobile', 'Full Service'],
      verified: true,
      responseTime: '45 min',
      completedJobs: 56,
      image: null
    },
    {
      id: 6,
      providerId: 'provider-6',
      providerName: 'Terrell Jackson',
      providerRating: 4.6,
      providerReviews: 19,
      providerScore: 698,
      title: 'Handyman Services - Small Repairs',
      category: 'handyman',
      description: 'General handyman work. Drywall, doors, shelves, minor plumbing, and more.',
      price: 45,
      priceType: 'hourly',
      location: 'Chicago, IL',
      tags: ['Repairs', 'Installation', 'Maintenance'],
      verified: false,
      responseTime: '3 hours',
      completedJobs: 23,
      image: null
    }
  ];

  const filteredGigs = gigs.filter(gig => {
    const matchesSearch = searchQuery === '' || 
      gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gig.providerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || gig.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : Wrench;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Button
            variant="ghost"
            className="text-white/60 hover:text-white mb-4"
            onClick={onBack}
          >
            ← Back
          </Button>
          <h1 className="text-3xl mb-2">FairPath Gigs</h1>
          <p className="text-white/60">
            Find trusted workers for any job. All background-verified, FairPath-scored professionals.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search & Filter */}
        <Card className="bg-[#121212] border-white/10 p-4 mb-6">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <Input
                placeholder="Search for services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-black/50 border-white/20 text-white pl-10"
              />
            </div>
            <Button variant="outline" className="border-white/20 text-white">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </Card>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-lg mb-4 text-white">Browse by Category</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              className={selectedCategory === null ? 'bg-[#A8F32C] text-black' : 'border-white/20 text-white'}
              onClick={() => setSelectedCategory(null)}
            >
              All Services
            </Button>
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  className={selectedCategory === category.id ? 'bg-[#A8F32C] text-black' : 'border-white/20 text-white'}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-white/60">
            {filteredGigs.length} {filteredGigs.length === 1 ? 'service' : 'services'} available
          </p>
        </div>

        {/* Gigs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGigs.map((gig) => {
            const CategoryIcon = getCategoryIcon(gig.category);
            return (
              <Card
                key={gig.id}
                className="bg-[#121212] border-white/10 overflow-hidden cursor-pointer hover:border-[#A8F32C]/50 transition-all"
                onClick={() => onSelectGig(gig)}
              >
                {/* Gig Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
                  <CategoryIcon className="h-16 w-16 text-white/20" />
                </div>

                <div className="p-6">
                  {/* Provider Info */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                        <span className="text-sm">{gig.providerName[0]}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-white">{gig.providerName}</span>
                          {gig.verified && (
                            <Shield className="h-4 w-4 text-[#A8F32C]" />
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-white/60">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{gig.providerRating}</span>
                          <span>({gig.providerReviews})</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                      {gig.providerScore} Score
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg mb-2 text-white">{gig.title}</h3>

                  {/* Description */}
                  <p className="text-sm text-white/60 mb-3 line-clamp-2">
                    {gig.description}
                  </p>

                  {/* Tags */}
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {gig.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} className="bg-white/10 text-white border-white/20 text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-white/10">
                    <div>
                      <div className="text-xs text-white/60 mb-1">Completed Jobs</div>
                      <div className="text-white">{gig.completedJobs}</div>
                    </div>
                    <div>
                      <div className="text-xs text-white/60 mb-1">Response Time</div>
                      <div className="text-white">{gig.responseTime}</div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-white/60 mb-1">
                        {gig.priceType === 'hourly' ? 'Hourly Rate' : 'Starting at'}
                      </div>
                      <div className="text-2xl text-[#A8F32C]">
                        ${gig.price}
                        <span className="text-sm text-white/60">
                          {gig.priceType === 'hourly' ? '/hr' : ''}
                        </span>
                      </div>
                    </div>
                    <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                      View Details
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 mt-3 text-sm text-white/60">
                    <MapPin className="h-4 w-4" />
                    {gig.location}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredGigs.length === 0 && (
          <Card className="bg-[#121212] border-white/10 p-12 text-center">
            <Search className="h-12 w-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl mb-2 text-white">No services found</h3>
            <p className="text-white/60 mb-6">
              Try adjusting your search or browse all categories
            </p>
            <Button
              variant="outline"
              className="border-white/20 text-white"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
            >
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
