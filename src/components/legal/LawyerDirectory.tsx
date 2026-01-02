import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  Scale, Star, MapPin, DollarSign, MessageSquare, 
  Phone, Mail, Award, CheckCircle, Search, Filter
} from 'lucide-react';

interface LawyerDirectoryProps {
  prefilledState?: string;
  onContactLawyer: (lawyerId: number) => void;
}

// Mock lawyer data
const mockLawyers = [
  {
    id: 1,
    name: 'John Smith',
    firmName: 'Smith Law Group',
    photo: null,
    rating: 4.8,
    reviewCount: 47,
    yearsExperience: 15,
    barState: 'California',
    serviceStates: ['California', 'Nevada'],
    specialties: ['Expungement', 'Record Sealing', 'Pardons'],
    consultationFee: 0,
    expungementFeeRange: '$800 - $2,500',
    bio: 'Specializing in criminal record relief for over 15 years. Successfully helped 500+ clients clear their records and rebuild their lives.',
    casesCompleted: 523,
    successRate: 94,
    responseTime: '2 hours',
    location: 'Los Angeles, CA',
  },
  {
    id: 2,
    name: 'Maria Rodriguez',
    firmName: 'Rodriguez Legal Services',
    photo: null,
    rating: 4.9,
    reviewCount: 83,
    yearsExperience: 12,
    barState: 'California',
    serviceStates: ['California'],
    specialties: ['Expungement', 'Juvenile Sealing', 'Certificate of Rehabilitation'],
    consultationFee: 50,
    expungementFeeRange: '$1,000 - $3,000',
    bio: 'Former public defender with a passion for second chances. Bilingual (English/Spanish). Affordable payment plans available.',
    casesCompleted: 612,
    successRate: 96,
    responseTime: '1 hour',
    location: 'San Diego, CA',
  },
  {
    id: 3,
    name: 'David Chen',
    firmName: 'Chen & Associates',
    photo: null,
    rating: 4.7,
    reviewCount: 34,
    yearsExperience: 8,
    barState: 'California',
    serviceStates: ['California'],
    specialties: ['Expungement', 'Record Sealing'],
    consultationFee: 0,
    expungementFeeRange: '$600 - $2,000',
    bio: 'Efficient and affordable expungement services. Most cases completed in 3-4 months. Free initial consultation.',
    casesCompleted: 287,
    successRate: 92,
    responseTime: '4 hours',
    location: 'Orange County, CA',
  },
  {
    id: 4,
    name: 'Sarah Williams',
    firmName: 'Williams Criminal Defense',
    photo: null,
    rating: 5.0,
    reviewCount: 28,
    yearsExperience: 20,
    barState: 'California',
    serviceStates: ['California', 'Arizona'],
    specialties: ['Expungement', 'Pardons', 'Appeal/Motion to Reduce'],
    consultationFee: 100,
    expungementFeeRange: '$1,200 - $3,500',
    bio: 'Board certified criminal law specialist. Handled complex cases including federal expungements. White-glove service.',
    casesCompleted: 734,
    successRate: 98,
    responseTime: '3 hours',
    location: 'San Francisco, CA',
  },
];

export default function LawyerDirectory({ prefilledState, onContactLawyer }: LawyerDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterState, setFilterState] = useState(prefilledState || '');
  const [sortBy, setSortBy] = useState('rating');

  const states = [
    'All States', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 
    'Connecticut', 'Delaware', 'Florida', 'Georgia'
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center">
              <Scale className="h-8 w-8 text-purple-400" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl text-white">Find an Expungement Lawyer</h1>
              <p className="text-purple-400">{mockLawyers.length} verified attorneys ready to help</p>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-white/40" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-900 border-gray-700 text-white pl-10"
                placeholder="Search by name, location, or specialty..."
              />
            </div>
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="h-11 px-4 rounded-md bg-gray-900 border border-gray-700 text-white"
            >
              <option value="">All States</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 px-4 rounded-md bg-gray-900 border border-gray-700 text-white"
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="experience">Most Experience</option>
              <option value="price">Lowest Price</option>
            </select>
          </div>

          {prefilledState && (
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <p className="text-purple-400">
                <CheckCircle className="inline h-4 w-4 mr-2" />
                Showing lawyers in <strong>{prefilledState}</strong> based on your eligibility check
              </p>
            </div>
          )}
        </div>

        {/* Lawyer Cards */}
        <div className="space-y-6">
          {mockLawyers.map(lawyer => (
            <Card key={lawyer.id} className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all">
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  
                  {/* Photo/Avatar */}
                  <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Scale className="h-12 w-12 text-purple-400" />
                  </div>

                  {/* Main Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl text-white mb-1">{lawyer.name}</h3>
                        <p className="text-white/70 mb-2">{lawyer.firmName}</p>
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            <span className="text-white">{lawyer.rating}</span>
                            <span className="text-white/60">({lawyer.reviewCount} reviews)</span>
                          </div>
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                            {lawyer.yearsExperience} years experience
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/60 mb-3">
                          <MapPin className="h-4 w-4" />
                          <span>{lawyer.location}</span>
                          <span>•</span>
                          <span>Licensed in {lawyer.serviceStates.join(', ')}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="mb-4">
                          <p className="text-sm text-white/60 mb-1">Consultation</p>
                          <p className="text-xl text-white">
                            {lawyer.consultationFee === 0 ? 'FREE' : `$${lawyer.consultationFee}`}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-white/60 mb-1">Expungement</p>
                          <p className="text-lg text-white">{lawyer.expungementFeeRange}</p>
                        </div>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {lawyer.specialties.map(specialty => (
                        <Badge key={specialty} variant="outline" className="border-purple-500/30 text-purple-400">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    {/* Bio */}
                    <p className="text-white/80 mb-4">{lawyer.bio}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 p-4 bg-black rounded-lg mb-4">
                      <div>
                        <p className="text-sm text-white/60 mb-1">Cases Completed</p>
                        <p className="text-xl text-white">{lawyer.casesCompleted}</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/60 mb-1">Success Rate</p>
                        <p className="text-xl text-green-400">{lawyer.successRate}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/60 mb-1">Avg Response</p>
                        <p className="text-xl text-white">{lawyer.responseTime}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button 
                        className="flex-1 bg-purple-500 hover:bg-purple-600"
                        onClick={() => onContactLawyer(lawyer.id)}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact {lawyer.name.split(' ')[0]}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-gray-700 text-white hover:bg-gray-800"
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Call
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-gray-700 text-white hover:bg-gray-800"
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>

                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white">
            Load More Lawyers
          </Button>
        </div>

      </div>
    </div>
  );
}
