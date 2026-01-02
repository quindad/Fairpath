import { useState } from 'react';
import { Heart, MapPin, Clock, Users, Sofa, ShirtIcon as Shirt, Tv, Home as HomeIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import LogoFinal from '../common/LogoFinal';

interface BrowseItemsProps {
  onClaimItem: (itemId: string) => void;
  hasFairPathPlus: boolean;
  claimsUsedThisMonth: number;
}

export default function BrowseItems({ onClaimItem, hasFairPathPlus, claimsUsedThisMonth }: BrowseItemsProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const maxClaims = hasFairPathPlus ? 7 : 3;
  const claimsRemaining = maxClaims - claimsUsedThisMonth;

  // Dummy marketplace data
  const items = [
    {
      id: '1',
      title: 'Queen Size Bed Frame',
      category: 'furniture',
      condition: 'Good',
      description: 'Solid wood bed frame, barely used. Moving and can\'t take it with me.',
      donorName: 'Sarah M.',
      donorRating: 4.9,
      location: 'Chicago, IL 60614',
      distance: '2.3 miles',
      postedTime: '2 hours ago',
      claimCount: 3,
      expiresIn: '46 hours',
      imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600'
    },
    {
      id: '2',
      title: 'Business Casual Clothes (Men\'s L)',
      category: 'clothing',
      condition: 'Like New',
      description: '3 dress shirts, 2 pairs of slacks, 1 blazer. Perfect for interviews or office work.',
      donorName: 'Mike T.',
      donorRating: 5.0,
      location: 'Evanston, IL 60201',
      distance: '5.8 miles',
      postedTime: '5 hours ago',
      claimCount: 7,
      expiresIn: '43 hours',
      imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600'
    },
    {
      id: '3',
      title: 'Kitchen Essentials Bundle',
      category: 'household',
      condition: 'Good',
      description: 'Pots, pans, dishes, silverware, glasses. Everything you need to start cooking!',
      donorName: 'Jennifer L.',
      donorRating: 4.8,
      location: 'Chicago, IL 60625',
      distance: '3.1 miles',
      postedTime: '1 day ago',
      claimCount: 12,
      expiresIn: '22 hours',
      imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600'
    },
    {
      id: '4',
      title: '32" Flat Screen TV',
      category: 'electronics',
      condition: 'Excellent',
      description: 'Works perfectly. Upgraded to a bigger one. Includes HDMI cable.',
      donorName: 'David K.',
      donorRating: 4.7,
      location: 'Cicero, IL 60804',
      distance: '4.5 miles',
      postedTime: '3 hours ago',
      claimCount: 15,
      expiresIn: '45 hours',
      imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items', icon: HomeIcon },
    { id: 'furniture', name: 'Furniture', icon: Sofa },
    { id: 'clothing', name: 'Clothing', icon: Shirt },
    { id: 'electronics', name: 'Electronics', icon: Tv },
    { id: 'household', name: 'Household', icon: HomeIcon }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <LogoFinal size="md" />
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-white/60">
                <MapPin className="mr-2 h-4 w-4" />
                Chicago, IL
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-4xl mb-3">Community Marketplace</h1>
          <p className="text-xl text-white/60">
            Claim free items from community donors
          </p>
        </div>

        {/* Claims Tracker */}
        <Card className={`p-6 mb-8 border ${claimsRemaining > 0 ? 'bg-gradient-to-br from-[#A8F32C]/10 via-transparent to-transparent border-[#A8F32C]/30' : 'bg-[#121212] border-white/10'}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-5 w-5 text-[#A8F32C]" />
                <h3 className="text-lg">Your Monthly Claims</h3>
              </div>
              <p className="text-white/60">
                {claimsRemaining} of {maxClaims} claims remaining this month
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl text-[#A8F32C]">{claimsRemaining}</div>
              <div className="text-sm text-white/60">available</div>
            </div>
          </div>

          {!hasFairPathPlus && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-sm text-white/60 mb-2">
                Want more claims? Upgrade to FairPath+ for 7 claims/month!
              </p>
              <Button size="sm" className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                Upgrade to FairPath+ ($2/mo)
              </Button>
            </div>
          )}
        </Card>

        {/* Categories */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#A8F32C] text-black border-[#A8F32C]'
                    : 'bg-transparent text-white border-white/20 hover:border-white/40'
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="bg-[#121212] border-white/10 overflow-hidden hover:border-[#A8F32C]/50 transition-all">
              {/* Image */}
              <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${item.imageUrl})` }}>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-black/80 text-white border-white/20">
                    {item.condition}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className="bg-[#A8F32C]/90 text-black">
                    <Clock className="h-3 w-3 mr-1" />
                    {item.expiresIn}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-white/60 mb-4 line-clamp-2">{item.description}</p>

                {/* Donor Info */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <Heart className="h-4 w-4 text-[#A8F32C]" />
                    </div>
                    <div>
                      <div className="text-sm">{item.donorName}</div>
                      <div className="text-xs text-white/60">⭐ {item.donorRating}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-white/60">
                      <Users className="h-3 w-3" />
                      <span>{item.claimCount} claims</span>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 mb-4 text-sm text-white/60">
                  <MapPin className="h-4 w-4" />
                  <span>{item.location} • {item.distance}</span>
                </div>

                {/* Actions */}
                <Button
                  onClick={() => onClaimItem(item.id)}
                  disabled={claimsRemaining === 0}
                  className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 disabled:bg-white/10 disabled:text-white/40"
                >
                  {claimsRemaining > 0 ? (
                    <>
                      <Heart className="mr-2 h-4 w-4" />
                      Claim This Item
                    </>
                  ) : (
                    'No Claims Remaining'
                  )}
                </Button>

                <p className="text-xs text-white/40 text-center mt-2">
                  Posted {item.postedTime}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <HomeIcon className="h-16 w-16 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl mb-2">No items in this category</h3>
            <p className="text-white/60 mb-4">Try selecting a different category</p>
            <Button onClick={() => setSelectedCategory('all')} variant="outline" className="border-white/20 text-white">
              Show All Items
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
