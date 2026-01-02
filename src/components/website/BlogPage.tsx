import { Calendar, User, Clock, ArrowRight, Search, Tag } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import Navigation from './Navigation';
import Footer from './Footer';
import { useState } from 'react';

interface BlogPageProps {
  onNavigate: (page: string) => void;
}

export default function BlogPage({ onNavigate }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'All',
    'Success Stories',
    'Employer Insights',
    'Housing Tips',
    'Reentry Guide',
    'Legal Updates',
    'Community',
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'How Marcus Found Housing in 2 Weeks Using FastTrack',
      excerpt: 'After years of rejection, Marcus discovered FastTrack and secured housing within 2 weeks of release. Here\'s his story.',
      category: 'Success Stories',
      author: 'Sarah Johnson',
      date: '2024-12-01',
      readTime: '5 min read',
      image: '🏠',
      tags: ['Housing', 'Success Story', 'FastTrack'],
    },
    {
      id: 2,
      title: 'WOTC Tax Credits: A Complete Guide for Employers',
      excerpt: 'Learn how hiring justice-impacted individuals can save your company thousands in tax credits while building an inclusive workforce.',
      category: 'Employer Insights',
      author: 'David Chen',
      date: '2024-11-28',
      readTime: '8 min read',
      image: '💼',
      tags: ['WOTC', 'Tax Credits', 'Hiring'],
    },
    {
      id: 3,
      title: '10 Things I Wish I Knew Before Release',
      excerpt: 'Real advice from someone who\'s been there: practical tips for preparing for life after incarceration.',
      category: 'Reentry Guide',
      author: 'Anonymous',
      date: '2024-11-25',
      readTime: '6 min read',
      image: '📋',
      tags: ['Reentry', 'Tips', 'Preparation'],
    },
    {
      id: 4,
      title: 'How Property Owners Earn $2,000+/Month with FairPath',
      excerpt: 'Three landlords share how they\'re filling vacancies faster and earning revenue through our 60/40 share program.',
      category: 'Housing Tips',
      author: 'Lisa Martinez',
      date: '2024-11-22',
      readTime: '7 min read',
      image: '🏘️',
      tags: ['Property Owners', 'Revenue', 'Housing'],
    },
    {
      id: 5,
      title: 'Understanding Ban the Box Laws: State-by-State Guide',
      excerpt: 'A comprehensive breakdown of Ban the Box legislation across the United States and what it means for job seekers.',
      category: 'Legal Updates',
      author: 'Attorney Michael Brown',
      date: '2024-11-20',
      readTime: '10 min read',
      image: '⚖️',
      tags: ['Legal', 'Employment Law', 'Ban the Box'],
    },
    {
      id: 6,
      title: 'From Felon to Entrepreneur: James\' Journey',
      excerpt: 'How James went from serving 8 years to starting his own successful construction business with FairPath\'s support.',
      category: 'Success Stories',
      author: 'James Wilson',
      date: '2024-11-18',
      readTime: '12 min read',
      image: '🚀',
      tags: ['Entrepreneurship', 'Success Story', 'Inspiration'],
    },
    {
      id: 7,
      title: 'Building an Inclusive Hiring Strategy in 2024',
      excerpt: 'Why forward-thinking companies are embracing fair chance hiring and seeing incredible results.',
      category: 'Employer Insights',
      author: 'HR Insights Team',
      date: '2024-11-15',
      readTime: '9 min read',
      image: '🤝',
      tags: ['HR', 'Diversity', 'Hiring'],
    },
    {
      id: 8,
      title: 'The Ultimate Reentry Checklist: 90 Days to Success',
      excerpt: 'A day-by-day guide to navigating your first 90 days after release, from paperwork to finding stability.',
      category: 'Reentry Guide',
      author: 'FairPath Team',
      date: '2024-11-12',
      readTime: '15 min read',
      image: '✅',
      tags: ['Reentry', 'Checklist', 'Guide'],
    },
    {
      id: 9,
      title: 'Community Spotlight: LA County Resource Fair',
      excerpt: 'Highlights from our recent resource fair where 200+ justice-impacted individuals connected with services.',
      category: 'Community',
      author: 'Events Team',
      date: '2024-11-10',
      readTime: '4 min read',
      image: '🎉',
      tags: ['Events', 'Community', 'Resources'],
    },
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation onNavigate={onNavigate} currentPage="blog" />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl mb-4">FairPath Blog</h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Success stories, insights, and resources for justice-impacted individuals, employers, and property owners
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 px-6 bg-white/5 sticky top-[73px] z-40 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
              <Input
                type="text"
                placeholder="Search articles, tags, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/50 border-white/20 text-white"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  className={`whitespace-nowrap ${
                    selectedCategory === category.toLowerCase().replace(' ', '-')
                      ? 'bg-[#A8F32C] text-black border-[#A8F32C] hover:bg-[#A8F32C]/90'
                      : 'border-white/20 text-white hover:bg-white/5'
                  }`}
                  onClick={() => setSelectedCategory(category.toLowerCase().replace(' ', '-'))}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl mb-6">Featured Story</h2>
          <Card className="bg-gradient-to-br from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-0 overflow-hidden hover:border-[#A8F32C]/50 transition-all group cursor-pointer">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="aspect-video lg:aspect-auto bg-[#A8F32C]/10 flex items-center justify-center">
                <div className="text-9xl">{featuredPost.image}</div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <Badge className="mb-4 w-fit bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30">
                  {featuredPost.category}
                </Badge>
                <h3 className="text-3xl lg:text-4xl mb-4 group-hover:text-[#A8F32C] transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-white/70 mb-6 text-lg leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-white/60 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <Button className="w-fit bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                  Read Full Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl">
              {selectedCategory === 'all' ? 'All Articles' : `${selectedCategory.replace('-', ' ')}`}
            </h2>
            <p className="text-white/60">{filteredPosts.length} articles</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post) => (
              <Card
                key={post.id}
                className="bg-[#121212] border-white/10 p-0 overflow-hidden hover:border-[#A8F32C]/50 transition-all group cursor-pointer"
              >
                {/* Image */}
                <div className="aspect-video bg-white/5 flex items-center justify-center border-b border-white/10">
                  <div className="text-6xl">{post.image}</div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <Badge className="mb-3 bg-white/5 text-white/80 border-white/10">
                    {post.category}
                  </Badge>
                  <h3 className="text-xl mb-3 group-hover:text-[#A8F32C] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded bg-white/5 text-white/60 flex items-center gap-1"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-white/40 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/5"
            >
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#A8F32C]/20 to-transparent border-y border-[#A8F32C]/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl mb-4">Stay Updated</h2>
          <p className="text-xl text-white/70 mb-8">
            Get weekly success stories, reentry tips, and exclusive resources delivered to your inbox
          </p>
          <div className="flex gap-4 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-black/50 border-white/20 text-white"
            />
            <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 whitespace-nowrap">
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-white/40 mt-4">
            No spam. Unsubscribe anytime. We respect your privacy.
          </p>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
