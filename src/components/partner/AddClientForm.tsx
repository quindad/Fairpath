import { useState } from 'react';
import { ArrowLeft, Check, User, Mail, Phone, MapPin, Calendar, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import LogoFinal from '../common/LogoFinal';

interface AddClientFormProps {
  onComplete: () => void;
  onCancel: () => void;
}

export default function AddClientForm({ onComplete, onCancel }: AddClientFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    needs: [] as string[],
    notes: ''
  });

  const needs = [
    { id: 'housing', label: 'Housing' },
    { id: 'employment', label: 'Employment' },
    { id: 'legal', label: 'Legal Support' },
    { id: 'food', label: 'Food Security' },
    { id: 'transportation', label: 'Transportation' },
    { id: 'mental_health', label: 'Mental Health' }
  ];

  const toggleNeed = (id: string) => {
    if (formData.needs.includes(id)) {
      setFormData({ ...formData, needs: formData.needs.filter(n => n !== id) });
    } else {
      setFormData({ ...formData, needs: [...formData.needs, id] });
    }
  };

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
              <User className="h-6 w-6 text-[#A8F32C]" />
            </div>
            <div>
              <h2 className="text-2xl text-white">Add New Client</h2>
              <p className="text-white/60">Enter client details to track referrals and outcomes</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-2 block">First Name</Label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="e.g. John"
                  className="bg-black border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white mb-2 block">Last Name</Label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="e.g. Doe"
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
                    placeholder="john@example.com"
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
                    placeholder="(555) 555-5555"
                    className="bg-black border-white/20 text-white pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-2 block">Date of Birth</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="bg-black border-white/20 text-white pl-10"
                  />
                </div>
              </div>
              <div>
                <Label className="text-white mb-2 block">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="City, State"
                    className="bg-black border-white/20 text-white pl-10"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label className="text-white mb-3 block">Primary Needs</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {needs.map((need) => (
                  <button
                    key={need.id}
                    type="button"
                    onClick={() => toggleNeed(need.id)}
                    className={`p-3 border rounded-lg text-left transition-all ${
                      formData.needs.includes(need.id)
                        ? 'bg-[#A8F32C]/10 border-[#A8F32C] text-white'
                        : 'border-white/20 text-white/60 hover:border-white/40'
                    }`}
                  >
                    {need.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-white mb-2 block">Case Notes</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add initial intake notes..."
                className="bg-black border-white/20 text-white min-h-32"
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