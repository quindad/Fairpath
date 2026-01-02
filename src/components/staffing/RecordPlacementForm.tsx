import { useState } from 'react';
import { ArrowLeft, Check, Briefcase, DollarSign, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import LogoFinal from '../common/LogoFinal';

interface RecordPlacementFormProps {
  onComplete: () => void;
  onCancel: () => void;
}

export default function RecordPlacementForm({ onComplete, onCancel }: RecordPlacementFormProps) {
  const [formData, setFormData] = useState({
    candidateName: '',
    clientName: '',
    position: '',
    startDate: '',
    salary: '',
    feeType: 'flat',
    feeAmount: ''
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
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <h2 className="text-2xl text-white">Record Placement</h2>
              <p className="text-white/60">Log a successful hire and calculate commission</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-2 block">Candidate Name</Label>
                <Input
                  value={formData.candidateName}
                  onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                  placeholder="Select candidate..."
                  className="bg-black border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white mb-2 block">Client Company</Label>
                <Input
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Select client..."
                  className="bg-black border-white/20 text-white"
                />
              </div>
            </div>

            <div>
              <Label className="text-white mb-2 block">Position Title</Label>
              <Input
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="bg-black border-white/20 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-2 block">Start Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="bg-black border-white/20 text-white pl-10"
                  />
                </div>
              </div>
              <div>
                <Label className="text-white mb-2 block">Hourly Salary</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    placeholder="0.00"
                    className="bg-black border-white/20 text-white pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white mb-2 block">Fee Type</Label>
                <select
                  value={formData.feeType}
                  onChange={(e) => setFormData({ ...formData, feeType: e.target.value })}
                  className="w-full p-2 bg-black border border-white/20 rounded-lg text-white"
                >
                  <option value="flat">Flat Fee</option>
                  <option value="percentage">Percentage</option>
                </select>
              </div>
              <div>
                <Label className="text-white mb-2 block">Fee Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    value={formData.feeAmount}
                    onChange={(e) => setFormData({ ...formData, feeAmount: e.target.value })}
                    placeholder="0.00"
                    className="bg-black border-white/20 text-white pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button onClick={onCancel} variant="outline" className="flex-1 border-white/20 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={onComplete} className="flex-1 bg-green-500 text-white hover:bg-green-600">
                <Check className="mr-2 h-4 w-4" />
                Record Placement
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}