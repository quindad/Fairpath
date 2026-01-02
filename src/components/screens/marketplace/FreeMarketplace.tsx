import { useState } from 'react';
import { Gift, Search, MapPin, Clock, AlertCircle, CheckCircle, Star } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { ImageWithFallback } from '../../figma/ImageWithFallback';

interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  category: 'furniture' | 'clothing' | 'electronics' | 'kitchen' | 'other';
  condition: 'like-new' | 'good' | 'fair';
  donorName: string;
  location: string;
  postedDate: string;
  imageUrl: string;
  claimed: boolean;
}

interface ClaimedItem {
  id: string;
  itemTitle: string;
  itemDescription: string;
  imageUrl: string;
  claimedDate: string;
  donorName: string;
  status: 'pending' | 'approved' | 'picked-up';
}

interface FreeMarketplaceProps {
  isSubscriber?: boolean;
  claimedItems?: ClaimedItem[];
  onClaimItem?: (itemId: string) => void;
}

const mockMarketplaceItems: MarketplaceItem[] = [
  {
    id: '1',
    title: 'Queen Size Bed Frame',
    description: 'Solid wood bed frame in good condition. No mattress included.',
    category: 'furniture',
    condition: 'good',
    donorName: 'Sarah M.',
    location: 'Cleveland, OH',
    postedDate: '2 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400',
    claimed: false
  },
  {
    id: '2',
    title: 'Winter Coats (Men\'s L-XL)',
    description: '3 warm winter coats, gently used. Perfect for cold weather.',
    category: 'clothing',
    condition: 'good',
    donorName: 'David P.',
    location: 'Akron, OH',
    postedDate: '1 day ago',
    imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400',
    claimed: false
  },
  {
    id: '3',
    title: 'Kitchen Essentials Bundle',
    description: 'Pots, pans, utensils, plates, cups. Everything to start a kitchen.',
    category: 'kitchen',
    condition: 'good',
    donorName: 'Maria G.',
    location: 'Toledo, OH',
    postedDate: '3 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1556911073-38141963c9e0?w=400',
    claimed: false
  },
  {
    id: '4',
    title: 'Work Boots (Size 10-11)',
    description: 'Steel toe work boots, barely worn. Great for construction jobs.',
    category: 'clothing',
    condition: 'like-new',
    donorName: 'James K.',
    location: 'Columbus, OH',
    postedDate: '4 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1542838686-5c7c5eb5a2f8?w=400',
    claimed: false
  },
  {
    id: '5',
    title: 'Laptop for Job Searching',
    description: 'Basic laptop, works great for resumes and job applications.',
    category: 'electronics',
    condition: 'good',
    donorName: 'Tech Donor Corp',
    location: 'Cincinnati, OH',
    postedDate: '5 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    claimed: false
  },
  {
    id: '6',
    title: 'Couch & Coffee Table Set',
    description: 'Comfortable couch and matching coffee table. Must pick up together.',
    category: 'furniture',
    condition: 'good',
    donorName: 'Robert C.',
    location: 'Dayton, OH',
    postedDate: '1 week ago',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
    claimed: false
  },
  {
    id: '7',
    title: 'Professional Clothing Bundle',
    description: 'Dress shirts, pants, ties. Perfect for interviews and office work.',
    category: 'clothing',
    condition: 'like-new',
    donorName: 'Career Closet',
    location: 'Cleveland, OH',
    postedDate: '3 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400',
    claimed: false
  },
  {
    id: '8',
    title: 'Microwave & Toaster',
    description: 'Both in working condition, clean and ready to use.',
    category: 'kitchen',
    condition: 'good',
    donorName: 'Linda W.',
    location: 'Akron, OH',
    postedDate: '2 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400',
    claimed: false
  }
];

export default function FreeMarketplace({ 
  isSubscriber = false,
  claimedItems = [],
  onClaimItem 
}: FreeMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);

  const maxClaims = isSubscriber ? 7 : 1;
  const usedClaims = claimedItems.length;
  const remainingClaims = maxClaims - usedClaims;

  const filteredItems = mockMarketplaceItems.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(query) ||
             item.description.toLowerCase().includes(query) ||
             item.category.toLowerCase().includes(query);
    }
    return true;
  });

  const handleClaimItem = (item: MarketplaceItem) => {
    if (remainingClaims > 0 && onClaimItem) {
      onClaimItem(item.id);
      setSelectedItem(null);
    }
  };

  if (selectedItem) {
    return <ItemDetail item={selectedItem} onBack={() => setSelectedItem(null)} onClaim={handleClaimItem} remainingClaims={remainingClaims} isSubscriber={isSubscriber} />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="p-6">
        <div className="text-xs tracking-widest text-[#A8F32C] mb-2">
          FREE MARKETPLACE
        </div>
        <h1 className="text-3xl mb-6">Free Items</h1>

        {/* Claim Tracker */}
        <div className="bg-[#121212] rounded-2xl p-6 border border-white/5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg mb-1">Your Monthly Claims</h3>
              <p className="text-sm text-white/60">
                {isSubscriber ? 'FairPath+ gives you 7 claims per month' : 'Free tier gets 1 claim per month'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl text-[#A8F32C] mb-1">{remainingClaims}</div>
              <div className="text-xs text-white/40">claims left</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-[#A8F32C] transition-all"
              style={{ width: `${(usedClaims / maxClaims) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-white/40">
            <span>{usedClaims} used</span>
            <span>{maxClaims} total</span>
          </div>

          {!isSubscriber && remainingClaims === 0 && (
            <div className="mt-4 bg-[#A8F32C]/10 rounded-xl p-4 border border-[#A8F32C]/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-white/80 mb-2">
                    You've used your monthly claim. Upgrade to FairPath+ for 7 claims per month!
                  </p>
                  <Button size="sm" className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                    Upgrade to FairPath+ - $2/mo
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Your Claimed Items */}
        {claimedItems.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl mb-4">Your Claimed Items</h2>
            <div className="space-y-3">
              {claimedItems.map((item) => (
                <div key={item.id} className="bg-[#121212] rounded-xl p-4 border border-white/5">
                  <div className="flex items-start gap-4">
                    <ImageWithFallback 
                      src={item.imageUrl}
                      alt={item.itemTitle}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg">{item.itemTitle}</h3>
                        <Badge className={`${
                          item.status === 'picked-up' ? 'bg-green-500/20 text-green-500' :
                          item.status === 'approved' ? 'bg-blue-500/20 text-blue-500' :
                          'bg-yellow-500/20 text-yellow-500'
                        } border-0 text-xs`}>
                          {item.status === 'picked-up' ? 'Picked Up' :
                           item.status === 'approved' ? 'Approved - Coordinate Pickup' :
                           'Pending Approval'}
                        </Badge>
                      </div>
                      <p className="text-sm text-white/60 mb-2">{item.itemDescription}</p>
                      <div className="flex items-center gap-4 text-xs text-white/40">
                        <span>From: {item.donorName}</span>
                        <span>Claimed: {item.claimedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search & Filter */}
        <div className="mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              placeholder="Search free items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-[#121212] border-white/10 text-white"
            />
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'furniture', label: 'Furniture' },
              { id: 'clothing', label: 'Clothing' },
              { id: 'electronics', label: 'Electronics' },
              { id: 'kitchen', label: 'Kitchen' },
              { id: 'other', label: 'Other' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#A8F32C] text-black'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-[#121212] rounded-2xl overflow-hidden border border-white/5 hover:border-[#A8F32C]/40 transition-all text-left"
            >
              <ImageWithFallback 
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-white/5 text-white/80 border-0 text-xs">
                    {item.category}
                  </Badge>
                  <Badge className={`${
                    item.condition === 'like-new' ? 'bg-green-500/20 text-green-500' :
                    item.condition === 'good' ? 'bg-blue-500/20 text-blue-500' :
                    'bg-yellow-500/20 text-yellow-500'
                  } border-0 text-xs`}>
                    {item.condition}
                  </Badge>
                </div>

                <h3 className="text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-white/60 mb-3 line-clamp-2">{item.description}</p>

                <div className="flex items-center justify-between text-xs text-white/40">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{item.postedDate}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-white/5 text-xs text-white/60">
                  Donated by {item.donorName}
                </div>
              </div>
            </button>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Gift className="h-16 w-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">No items found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Item Detail Component
function ItemDetail({ 
  item, 
  onBack, 
  onClaim, 
  remainingClaims,
  isSubscriber 
}: { 
  item: MarketplaceItem; 
  onBack: () => void; 
  onClaim: (item: MarketplaceItem) => void;
  remainingClaims: number;
  isSubscriber: boolean;
}) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-4 px-4 h-14">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            ←
          </button>
          <div className="flex-1">
            <div className="text-xs text-[#A8F32C]">FREE ITEM DETAIL</div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Image */}
        <ImageWithFallback 
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-64 object-cover rounded-2xl mb-6"
        />

        {/* Item Info */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-white/5 text-white/80 border-0">
              {item.category}
            </Badge>
            <Badge className={`${
              item.condition === 'like-new' ? 'bg-green-500/20 text-green-500' :
              item.condition === 'good' ? 'bg-blue-500/20 text-blue-500' :
              'bg-yellow-500/20 text-yellow-500'
            } border-0`}>
              {item.condition}
            </Badge>
          </div>

          <h1 className="text-3xl mb-3">{item.title}</h1>
          <p className="text-white/80 mb-6">{item.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#121212] rounded-xl p-4 border border-white/5">
              <div className="text-xs text-white/40 mb-1">Location</div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#A8F32C]" />
                <span>{item.location}</span>
              </div>
            </div>

            <div className="bg-[#121212] rounded-xl p-4 border border-white/5">
              <div className="text-xs text-white/40 mb-1">Posted</div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#A8F32C]" />
                <span>{item.postedDate}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#121212] rounded-xl p-4 border border-white/5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-full flex items-center justify-center">
                <Gift className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <div className="text-sm mb-1">Donated by</div>
                <div className="text-lg">{item.donorName}</div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-[#A8F32C]/5 rounded-xl p-6 border border-[#A8F32C]/20 mb-6">
            <h3 className="text-sm mb-4 text-[#A8F32C]">How It Works:</h3>
            <ol className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#A8F32C] text-xs">1</span>
                </div>
                <span>Click "Claim This Item" to request it</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#A8F32C] text-xs">2</span>
                </div>
                <span>Donor will review your request and approve</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#A8F32C] text-xs">3</span>
                </div>
                <span>Coordinate pickup time and location with donor</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#A8F32C] text-xs">4</span>
                </div>
                <span>Pick up your free item!</span>
              </li>
            </ol>
          </div>

          {/* Claim Limit Warning */}
          {remainingClaims === 0 && !isSubscriber && (
            <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white/80 mb-2">
                    You've used your monthly claim. Upgrade to FairPath+ for 7 claims per month!
                  </p>
                  <Button size="sm" className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                    Upgrade to FairPath+ - $2/mo
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Claim Button */}
        <div className="sticky bottom-0 pb-6 pt-4 bg-gradient-to-t from-black via-black to-transparent">
          <Button 
            className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-14 text-lg"
            onClick={() => onClaim(item)}
            disabled={remainingClaims === 0}
          >
            {remainingClaims === 0 ? (
              <span className="flex items-center justify-center gap-2">
                <AlertCircle className="h-5 w-5" />
                No Claims Remaining
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Gift className="h-5 w-5" />
                Claim This Item ({remainingClaims} claims left)
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}