import { useState } from 'react';
import { ArrowLeft, Check, Building2, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import LogoFinal from '../common/LogoFinal';

interface AddStaffingClientFormProps {
  onComplete: () => void;
  onCancel: () => void;
}

export default function AddStaffingClientForm({ onComplete, onCancel }: AddStaffingClientFormProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    location: '',
    hiringNeeds: ''
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <LogoFinal size="md" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Card className="bg-[#121212] border-white/10 p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-[#A8F32C]" />
            </div>
            <div>
              <h2 className="text-2xl text-white">Add Client</h2>
              <p className="text-white/60">Register a new company for staffing services</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-2 block">Company Name</Label>
                <Input
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white mb-2 block">Industry</Label>
                <Input
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-2 block">Contact Person</Label>
                <Input
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white mb-2 block">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-black border-white/20 text-white pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-2 block">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-black border-white/20 text-white pl-10"
                  />
                </div>
              </div>
              <div>
                <Label className="text-white mb-2 block">Website</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://"
                    className="bg-black border-white/20 text-white pl-10"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label className="text-white mb-2 block">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="bg-black border-white/20 text-white pl-10"
                />
              </div>
            </div>

            <div>
              <Label className="text-white mb-2 block">Primary Hiring Needs</Label>
              <Input
                value={formData.hiringNeeds}
                onChange={(e) => setFormData({ ...formData, hiringNeeds: e.target.value })}
                placeholder="e.g. Warehouse staff, 20 positions"
                className="bg-black border-white/20 text-white"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button onClick={onCancel} variant="outline" className="flex-1 border-white/20 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={onComplete} className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
                <Check className="mr-2 h-4 w-4" />
                Add Client
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}