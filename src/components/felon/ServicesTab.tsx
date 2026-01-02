import { useState } from 'react';
import { Search, Filter, Wrench, Star, MapPin, Clock, DollarSign, CheckCircle, Shield, Award, ChevronRight, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

interface ServicesTabProps {
  onBookService: (provider: any) => void;
  onBecomeProvider: () => void;
  isProvider?: boolean;
}

export default function ServicesTab({ onBookService, onBecomeProvider, isProvider }: ServicesTabProps) {
  const [viewMode, setViewMode] = useState<'browse' | 'my-services'>('browse');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Service categories
  const categories = [
    { id: 'all', name: 'All Services', icon: '🔧', count: 847 },
    { id: 'home_services', name: 'Home Services', icon: '🏠', count: 234 },
    { id: 'moving_labor', name: 'Moving & Labor', icon: '📦', count: 156 },
    { id: 'automotive', name: 'Automotive', icon: '🚗', count: 89 },
    { id: 'cleaning', name: 'Cleaning', icon: '🧹', count: 178 },
    { id: 'technology', name: 'Technology', icon: '💻', count: 67 },
    { id: 'food_service', name: 'Food Service', icon: '🍳', count: 45 },
    { id: 'creative', name: 'Creative', icon: '🎨', count: 34 },
    { id: 'pet_care', name: 'Pet Care', icon: '🐕', count: 28 },
    { id: 'tutoring', name: 'Tutoring', icon: '📚', count: 16 }
  ];

  // Mock service providers
  const serviceProviders = [
    {
      id: 1001,
      name: 'Jamal Williams',
      service: 'Handyman Services',
      category: 'Home Services',
      rating: 4.9,
      reviews: 127,
      jobsCompleted: 184,
      hourlyRate: 45,
      location: 'West Side, Chicago',
      description: 'Professional handyman with 8 years experience. Specializing in repairs, installations, and home improvements.',
      avatar: 'https://i.pravatar.cc/150?u=jamal',
      fairPathScore: 842,
      verified: true,
      skills: ['Repairs', 'Installation', 'Carpentry', 'Electrical'],
      availability: 'Weekdays & Weekends',
      responseTime: 2,
      yearsExperience: 8
    },
    {
      id: 1002,
      name: 'Marcus Thompson',
      service: 'Moving & Labor',
      category: 'Moving & Labor',
      rating: 4.8,
      reviews: 93,
      jobsCompleted: 156,
      hourlyRate: 35,
      location: 'South Side, Chicago',
      description: 'Reliable moving help and heavy lifting. I can handle furniture, appliances, and everything in between.',
      avatar: 'https://i.pravatar.cc/150?u=marcus',
      fairPathScore: 789,
      verified: true,
      skills: ['Heavy Lifting', 'Packing', 'Furniture Assembly', 'Loading'],
      availability: 'Flexible',
      responseTime: 1,
      yearsExperience: 5
    },
    {
      id: 1003,
      name: 'Darnell Brown',
      service: 'Auto Detailing',
      category: 'Automotive',
      rating: 5.0,
      reviews: 64,
      jobsCompleted: 89,
      hourlyRate: 55,
      location: 'Downtown, Chicago',
      description: 'Premium auto detailing services. Interior/exterior, buffing, waxing. Your car will look brand new!',
      avatar: 'https://i.pravatar.cc/150?u=darnell',
      fairPathScore: 912,
      verified: true,
      skills: ['Interior Detailing', 'Exterior Wash', 'Waxing', 'Paint Correction'],
      availability: 'Weekends',
      responseTime: 3,
      yearsExperience: 6
    },
    {
      id: 1004,
      name: 'Carlos Garcia',
      service: 'House Cleaning',
      category: 'Cleaning',
      rating: 4.7,
      reviews: 112,
      jobsCompleted: 203,
      hourlyRate: 30,
      location: 'North Side, Chicago',
      description: 'Professional deep cleaning services. Move-in/move-out, regular maintenance, eco-friendly products available.',
      avatar: 'https://i.pravatar.cc/150?u=carlos',
      fairPathScore: 834,
      verified: true,
      skills: ['Deep Cleaning', 'Organization', 'Sanitization', 'Eco-Friendly'],
      availability: 'Weekdays',
      responseTime: 2,
      yearsExperience: 4
    },
    {
      id: 1005,
      name: 'Kevin Johnson',
      service: 'Computer Repair',
      category: 'Technology',
      rating: 4.9,
      reviews: 81,
      jobsCompleted: 124,
      hourlyRate: 60,
      location: 'Citywide, Chicago',
      description: 'Tech support and computer repair. Virus removal, hardware upgrades, data recovery. Same-day service available.',
      avatar: 'https://i.pravatar.cc/150?u=kevin',
      fairPathScore: 876,
      verified: true,
      skills: ['Virus Removal', 'Hardware Repair', 'Data Recovery', 'Setup'],
      availability: 'Evenings',
      responseTime: 1,
      yearsExperience: 7
    },
    {
      id: 1006,
      name: 'Tyrone Davis',
      service: 'Landscaping',
      category: 'Home Services',
      rating: 4.8,
      reviews: 97,
      jobsCompleted: 168,
      hourlyRate: 40,
      location: 'West Side, Chicago',
      description: 'Professional landscaping and lawn care. Mowing, trimming, mulching, seasonal cleanup.',
      avatar: 'https://i.pravatar.cc/150?u=tyrone',
      fairPathScore: 801,
      verified: true,
      skills: ['Lawn Mowing', 'Trimming', 'Mulching', 'Cleanup'],
      availability: 'Weekdays',
      responseTime: 4,
      yearsExperience: 10
    }
  ];

  return (
    <div>
      {/* Top Banner */}
      {!isProvider && (
        <Card className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl mb-2 text-white">Become a Service Provider</h3>
              <p className="text-white/80 mb-4">
                Earn money doing what you're good at. Get paid through the app, build your reputation, and receive 1099s for tax time.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-white/80">
                  <DollarSign className="h-5 w-5 text-[#A8F32C]" />
                  <span>Set your own rates</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Shield className="h-5 w-5 text-[#A8F32C]" />
                  <span>Secure payments</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Award className="h-5 w-5 text-[#A8F32C]" />
                  <span>Build FairPath Score</span>
                </div>
              </div>
            </div>
            <Button 
              className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-12 px-8"
              onClick={onBecomeProvider}
            >
              <Plus className="mr-2 h-5 w-5" />
              Become a Provider
            </Button>
          </div>
        </Card>
      )}

      {/* Mode Toggle (if user is a provider) */}
      {isProvider && (
        <div className="flex gap-2 mb-6">
          <Button
            variant={viewMode === 'browse' ? 'default' : 'outline'}
            className={viewMode === 'browse' ? 'bg-[#A8F32C] text-black' : 'border-white/20 text-white'}
            onClick={() => setViewMode('browse')}
          >
            Browse Services
          </Button>
          <Button
            variant={viewMode === 'my-services' ? 'default' : 'outline'}
            className={viewMode === 'my-services' ? 'bg-[#A8F32C] text-black' : 'border-white/20 text-white'}
            onClick={() => setViewMode('my-services')}
          >
            My Service Listings
          </Button>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <Input 
            placeholder="Search services (plumbing, moving, cleaning...)" 
            className="pl-10 bg-[#121212] border-white/20 text-white" 
          />
        </div>
        <Button variant="outline" className="border-white/20 text-white">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id === 'all' ? null : cat.id)}
            className={`px-4 py-2 rounded-full border whitespace-nowrap transition-all ${
              (selectedCategory === null && cat.id === 'all') || selectedCategory === cat.id
                ? 'bg-[#A8F32C] text-black border-[#A8F32C]'
                : 'bg-[#121212] text-white border-white/20 hover:border-[#A8F32C]/50'
            }`}
          >
            <span className="mr-2">{cat.icon}</span>
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>

      {/* Service Providers Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {serviceProviders.map((provider) => (
          <Card key={provider.id} className="bg-[#121212] border-white/10 p-6 hover:border-[#A8F32C]/50 transition-all">
            <div className="flex items-start gap-4 mb-4">
              <img 
                src={provider.avatar} 
                alt={provider.name} 
                className="w-20 h-20 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="text-xl text-white mb-1">{provider.name}</h3>
                    <div className="text-sm text-white/60 mb-2">{provider.service}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl text-[#A8F32C]">${provider.hourlyRate}</div>
                    <div className="text-xs text-white/60">/hour</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white">{provider.rating}</span>
                    <span className="text-white/60 text-sm">({provider.reviews})</span>
                  </div>
                  <div className="text-sm text-white/60">
                    {provider.jobsCompleted} jobs completed
                  </div>
                  {provider.verified && (
                    <Badge className="bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-1 text-sm text-white/60 mb-2">
                  <Star className="h-3 w-3 text-yellow-400" />
                  <span>FairPath Score: {provider.fairPathScore}</span>
                </div>
              </div>
            </div>

            <p className="text-white/80 text-sm mb-4">{provider.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {provider.skills.map((skill, idx) => (
                <Badge key={idx} className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
              <div className="bg-black/50 border border-white/10 rounded-lg p-2 text-center">
                <div className="text-white/60 text-xs mb-1">Experience</div>
                <div className="text-white">{provider.yearsExperience} years</div>
              </div>
              <div className="bg-black/50 border border-white/10 rounded-lg p-2 text-center">
                <div className="text-white/60 text-xs mb-1">Response</div>
                <div className="text-white">{provider.responseTime}hr avg</div>
              </div>
              <div className="bg-black/50 border border-white/10 rounded-lg p-2 text-center">
                <div className="text-white/60 text-xs mb-1">Location</div>
                <div className="text-white text-xs">{provider.location.split(',')[0]}</div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                onClick={() => onBookService(provider)}
              >
                Book Service
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-white/20 text-white">
                View Profile
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <Button variant="outline" className="border-white/20 text-white">
          Load More Providers
        </Button>
        <div className="text-sm text-white/60 mt-2">
          Showing 6 of 847 service providers
        </div>
      </div>
    </div>
  );
}
