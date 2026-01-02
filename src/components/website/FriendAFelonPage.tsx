import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Users, Briefcase, Home, Gift, CheckCircle, TrendingUp, 
  Heart, Hammer, Smartphone, Code, Lightbulb, Target
} from 'lucide-react';
import Navigation from './Navigation';
import Footer from './Footer';

interface FriendAFelonPageProps {
  onNavigate: (page: string) => void;
}

export default function FriendAFelonPage({ onNavigate }: FriendAFelonPageProps) {
  return (
    <div className="min-h-screen bg-black">
      <Navigation onNavigate={onNavigate} currentPage="service-friend-a-felon" />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Hero Section */}
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-[#A8F32C]/20 text-[#A8F32C] border-[#A8F32C]/30 text-sm px-4 py-2">
              For the People
            </Badge>
            <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
              Friend A Felon
              <br />
              <span className="text-[#A8F32C]">The Original Vision</span>
            </h1>
            <p className="text-2xl text-white/80 max-w-4xl mx-auto mb-4">
              One formerly incarcerated person's mission to build the platform he wished existed when he got out.
            </p>
            <p className="text-lg text-white/60 max-w-3xl mx-auto mb-12 italic">
              Dedicated to Quin Braden — my superhero, my purpose, my reason to never give up.
            </p>
          </div>

          {/* Sterling's Story */}
          <div className="mb-24">
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-[#A8F32C]/10 to-transparent border border-[#A8F32C]/30 rounded-3xl p-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-16 w-16 bg-[#A8F32C] rounded-full flex items-center justify-center">
                    <Code className="h-8 w-8 text-black" />
                  </div>
                  <div>
                    <h2 className="text-3xl text-white">Sterling Braden's Story</h2>
                    <p className="text-[#A8F32C]">Founder, Friend A Felon</p>
                  </div>
                </div>

                <div className="space-y-6 text-lg text-white/90">
                  <p>
                    When I got out, I had <strong className="text-white">nothing</strong>. No job. No connections. No clue where to start. 
                    I spent weeks calling employers, getting hung up on the moment they heard about my record. I scrolled through 
                    Facebook Marketplace at 2 AM looking for free furniture. I begged landlords to give me a chance.
                  </p>
                  <p>
                    And I was one of the <em className="text-[#A8F32C]">lucky ones</em>. I had family who believed in me. I had a place to crash. 
                    I had just enough savings to survive those first brutal months.
                  </p>
                  <p className="text-xl text-white border-l-4 border-[#A8F32C] pl-6 italic">
                    "70% of people getting out don't have what I had. And 50% end up back inside within 3 years. 
                    Not because they want to—because the system is designed to fail them."
                  </p>
                  <p>
                    So I got <strong className="text-[#A8F32C]">angry</strong>. And I decided to do something about it.
                  </p>
                  <p>
                    I taught myself to code. I stayed up late learning React, databases, APIs—anything I could find for free online. 
                    I worked construction during the day and built this platform at night. No team. No investors. No fancy office. 
                    Just me, a laptop, and a mission to build what should have existed when I got out.
                  </p>
                  <p className="text-xl text-white">
                    <strong>Friend A Felon</strong> is that platform. A place where people like me can find jobs from employers 
                    who actually want to hire us. Where we can search for housing from landlords who get it. Where we can get 
                    free stuff from community members who care. Where we can book services from providers who understand our journey.
                  </p>
                  <p className="text-white/70">
                    I'm not a Silicon Valley genius. I'm just someone who got tired of watching people fail because the tools 
                    didn't exist. If I can teach myself to build this, <em className="text-[#A8F32C]">you can rebuild your life</em>. 
                    I promise you that.
                  </p>
                </div>

                <div className="mt-10 pt-10 border-t border-[#A8F32C]/20">
                  <p className="text-center text-white/60 italic">
                    Friend A Felon is now part of FairPath Industries, but the mission stays the same: 
                    give every justice-impacted person the tools to succeed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What We're Building */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl text-white mb-4">Four Platforms in One</h2>
              <p className="text-xl text-white/60">Everything you need to rebuild your life</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gray-900 border-gray-800 hover:border-[#A8F32C] transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-lg flex items-center justify-center mb-4">
                    <Briefcase className="h-6 w-6 text-[#A8F32C]" />
                  </div>
                  <CardTitle className="text-white text-2xl">Job Marketplace</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-6">
                    Connect with fair chance employers who are actively looking to hire justice-impacted people. 
                    No more getting ghosted when they Google your name.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#A8F32C] mt-0.5 flex-shrink-0" />
                      <p className="text-white">Search jobs by location, skills, and pay rate</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#A8F32C] mt-0.5 flex-shrink-0" />
                      <p className="text-white">Every employer is verified background-friendly</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#A8F32C] mt-0.5 flex-shrink-0" />
                      <p className="text-white">One-click applications with built-in resume builder</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#A8F32C] mt-0.5 flex-shrink-0" />
                      <p className="text-white">Direct messaging with hiring managers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Home className="h-6 w-6 text-blue-400" />
                  </div>
                  <CardTitle className="text-white text-2xl">Housing FastTrack</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-6">
                    Find apartments, rooms, and transitional housing from landlords who don't automatically say no. 
                    Because everyone deserves a safe place to live.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-white">Filter by budget and location</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-white">Background-friendly landlords clearly marked</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-white">Apply to multiple properties at once</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-white">Direct contact with property managers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Gift className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-white text-2xl">Free Marketplace</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-6">
                    Get free furniture, clothes, electronics, and essentials from community members who want to help. 
                    Everything donated. Nothing sold. Just people helping people.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <p className="text-white">Browse free items near you</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <p className="text-white">Connect directly with donors for pickup</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <p className="text-white">Post what you need, community responds</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <p className="text-white">Furniture, clothes, bikes, phones, and more</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800 hover:border-orange-500 transition-all">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-orange-400" />
                  </div>
                  <CardTitle className="text-white text-2xl">Services Directory</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-6">
                    Book services from providers who understand your journey. Legal help, therapy, job training, 
                    financial coaching—all in one place.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                      <p className="text-white">Search by service type and location</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                      <p className="text-white">Book appointments online</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                      <p className="text-white">Many providers offer sliding scale pricing</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                      <p className="text-white">Legal, mental health, training, and more</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* The Numbers */}
          <div className="bg-gradient-to-r from-red-500/20 to-transparent p-12 rounded-2xl border border-red-500/30 mb-20">
            <h2 className="text-3xl text-white mb-8 text-center">Why This Matters</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-5xl text-red-400 mb-3">650K</p>
                <p className="text-white mb-2">Released Annually</p>
                <p className="text-sm text-white/60">From US prisons every year</p>
              </div>
              <div>
                <p className="text-5xl text-red-400 mb-3">70%</p>
                <p className="text-white mb-2">Can't Find Jobs</p>
                <p className="text-sm text-white/60">Due to background check barriers</p>
              </div>
              <div>
                <p className="text-5xl text-red-400 mb-3">50%</p>
                <p className="text-white mb-2">Return to Prison</p>
                <p className="text-sm text-white/60">Within 3 years without support</p>
              </div>
            </div>
            <p className="text-center text-white/80 mt-8 text-lg max-w-3xl mx-auto">
              These aren't just statistics. These are real people whose lives are destroyed by a broken system. 
              We're building Friend A Felon to change these numbers.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center bg-gradient-to-br from-[#A8F32C]/20 to-transparent border border-[#A8F32C]/30 rounded-3xl p-12">
            <h2 className="text-4xl text-white mb-6">Ready to Rebuild Your Life?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
              Friend A Felon is <strong className="text-white">100% FREE</strong> for people impacted by the justice system. 
              Forever. No hidden fees, no premium tiers, no bullshit. Join the platform Sterling built for you.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                size="lg" 
                className="bg-[#A8F32C] text-black hover:bg-[#8CD423] text-lg px-8 py-6 h-auto"
                onClick={() => onNavigate('signup')}
              >
                Get Started Free
                <Target className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 h-auto"
                onClick={() => onNavigate('contact')}
              >
                <Heart className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </div>
          </div>

        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}