import { useState } from 'react';
import { ArrowLeft, Check, User, Mail, Phone, MapPin, Briefcase, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import LogoFinal from '../common/LogoFinal';

interface AddCandidateFormProps {
  onComplete: () => void;
  onCancel: () => void;
}

export default function AddCandidateForm({ onComplete, onCancel }: AddCandidateFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    skills: '',
    desiredRole: '',
    desiredPay: '',
    convictionType: 'none'
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
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <User className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl text-white">Add Candidate</h2>
              <p className="text-white/60">Onboard new talent to your staffing pool</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-2 block">First Name</Label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white mb-2 block">Last Name</Label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="bg-black border-white/20 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-2 block">Desired Role</Label>
                <Input
                  value={formData.desiredRole}
                  onChange={(e) => setFormData({ ...formData, desiredRole: e.target.value })}
                  placeholder="e.g. Warehouse Associate"
                  className="bg-black border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white mb-2 block">Desired Hourly Pay</Label>
                <Input
                  value={formData.desiredPay}
                  onChange={(e) => setFormData({ ...formData, desiredPay: e.target.value })}
                  placeholder="$18.00"
                  className="bg-black border-white/20 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-white mb-2 block">Skills (comma separated)</Label>
              <Input
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="Forklift, OSHA, Microsoft Office"
                className="bg-black border-white/20 text-white"
              />
            </div>

            <div>
              <Label className="text-white mb-2 block">Background (for WOTC)</Label>
              <select
                value={formData.convictionType}
                onChange={(e) => setFormData({ ...formData, convictionType: e.target.value })}
                className="w-full p-2 bg-black border border-white/20 rounded-lg text-white"
              >
                <option value="none">No convictions</option>
                <option value="misdemeanor">Misdemeanor</option>
                <option value="felony">Felony</option>
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <Button onClick={onCancel} variant="outline" className="flex-1 border-white/20 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={onComplete} className="flex-1 bg-blue-500 text-white hover:bg-blue-600">
                <Check className="mr-2 h-4 w-4" />
                Save Candidate
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}