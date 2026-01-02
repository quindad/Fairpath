import { Mail, Phone, MapPin, Send, MessageSquare, Building2, Users, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import Navigation from './Navigation';
import Footer from './Footer';
import { useState } from 'react';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to backend
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'contact@fairpath.com',
      description: 'We typically respond within 24 hours',
      action: 'mailto:contact@fairpath.com',
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '1-800-555-1234',
      description: 'Mon-Fri, 9am-5pm PST',
      action: 'tel:+18005551234',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: 'Los Angeles, CA',
      description: 'Serving nationwide',
      action: null,
    },
  ];

  const departments = [
    {
      icon: Users,
      title: 'For Justice-Impacted Individuals',
      description: 'Need help finding a job or housing?',
      email: 'support@fairpath.com',
    },
    {
      icon: Building2,
      title: 'For Employers',
      description: 'Interested in hiring through FairPath?',
      email: 'employers@fairpath.com',
    },
    {
      icon: Heart,
      title: 'For Property Owners',
      description: 'Want to list your properties?',
      email: 'housing@fairpath.com',
    },
    {
      icon: MessageSquare,
      title: 'General Inquiries',
      description: 'Questions, partnerships, or press?',
      email: 'info@fairpath.com',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation onNavigate={onNavigate} currentPage="contact" />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl mb-4">Get in Touch</h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Have questions? We're here to help. Reach out and our team will get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="bg-[#121212] border-white/10 p-8 text-center hover:border-[#A8F32C]/50 transition-all"
              >
                <div className="h-16 w-16 rounded-full bg-[#A8F32C]/20 flex items-center justify-center mx-auto mb-4">
                  <method.icon className="h-8 w-8 text-[#A8F32C]" />
                </div>
                <h3 className="text-xl mb-2">{method.title}</h3>
                {method.action ? (
                  <a
                    href={method.action}
                    className="text-[#A8F32C] hover:underline text-lg mb-2 block"
                  >
                    {method.value}
                  </a>
                ) : (
                  <div className="text-white text-lg mb-2">{method.value}</div>
                )}
                <p className="text-sm text-white/60">{method.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form & Departments */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card className="bg-[#121212] border-white/10 p-8">
                <h2 className="text-3xl mb-6">Send Us a Message</h2>

                {submitted ? (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center">
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="text-2xl mb-2 text-green-400">Message Sent!</h3>
                    <p className="text-white/60">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-white/60 mb-2">
                          Your Name *
                        </label>
                        <Input
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="bg-black/50 border-white/20 text-white"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-white/60 mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-black/50 border-white/20 text-white"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-white/60 mb-2">
                          Phone Number (Optional)
                        </label>
                        <Input
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="bg-black/50 border-white/20 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-white/60 mb-2">
                          I am a... *
                        </label>
                        <select
                          value={formData.userType}
                          onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                          className="w-full bg-black/50 border border-white/20 text-white rounded-lg px-3 py-2"
                          required
                        >
                          <option value="">Select...</option>
                          <option value="job-seeker">Job Seeker</option>
                          <option value="housing-seeker">Housing Seeker</option>
                          <option value="employer">Employer</option>
                          <option value="property-owner">Property Owner</option>
                          <option value="donor">Donor/Partner</option>
                          <option value="press">Press/Media</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-white/60 mb-2">
                        Message *
                      </label>
                      <Textarea
                        placeholder="Tell us how we can help..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-black/50 border-white/20 text-white min-h-[150px]"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>

                    <p className="text-xs text-white/40 text-center">
                      We typically respond within 24 hours during business days
                    </p>
                  </form>
                )}
              </Card>
            </div>

            {/* Departments */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl mb-6">Departments</h2>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <Card
                    key={index}
                    className="bg-[#121212] border-white/10 p-6 hover:border-[#A8F32C]/50 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
                        <dept.icon className="h-6 w-6 text-[#A8F32C]" />
                      </div>
                      <div>
                        <h3 className="text-lg mb-1">{dept.title}</h3>
                        <p className="text-sm text-white/60 mb-2">{dept.description}</p>
                        <a
                          href={`mailto:${dept.email}`}
                          className="text-[#A8F32C] hover:underline text-sm"
                        >
                          {dept.email}
                        </a>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* FAQ Link */}
              <Card className="bg-gradient-to-br from-blue-500/20 to-transparent border-blue-500/30 p-6 mt-6">
                <h3 className="text-xl mb-2">Have a Quick Question?</h3>
                <p className="text-white/60 mb-4 text-sm">
                  Check out our FAQ page for instant answers to common questions
                </p>
                <Button
                  variant="outline"
                  className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                  onClick={() => onNavigate('about')}
                >
                  View FAQs
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-12 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4">Office Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Monday - Friday</span>
                  <span className="text-white">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Saturday</span>
                  <span className="text-white">10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Sunday</span>
                  <span className="text-white">Closed</span>
                </div>
              </div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4">Support Response Time</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Email</span>
                  <span className="text-white">24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Phone</span>
                  <span className="text-white">Immediate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Chat</span>
                  <span className="text-white">2-5 minutes</span>
                </div>
              </div>
            </Card>

            <Card className="bg-[#121212] border-white/10 p-6">
              <h3 className="text-xl mb-4">Emergency Support</h3>
              <p className="text-sm text-white/60 mb-4">
                For urgent housing or crisis situations, please call our 24/7 hotline
              </p>
              <a
                href="tel:+18005551234"
                className="text-[#A8F32C] hover:underline font-medium"
              >
                1-800-555-1234
              </a>
            </Card>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
