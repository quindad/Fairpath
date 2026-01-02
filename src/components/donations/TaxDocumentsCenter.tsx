import { useState } from 'react';
import { FileText, Download, Calendar, DollarSign, TrendingUp, Filter } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import DonationReceiptGenerator from './DonationReceiptGenerator';

interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  donorAddress: string;
  itemDescription: string;
  donationDate: string;
  recipientName: string;
  estimatedValue?: number;
}

export default function TaxDocumentsCenter() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [viewingReceipt, setViewingReceipt] = useState<Donation | null>(null);

  // Mock donation data
  const donations: Donation[] = [
    {
      id: 'DR-2024-001',
      donorName: 'Sarah Mitchell',
      donorEmail: 'sarah.mitchell@email.com',
      donorAddress: '456 Oak Street, Chicago, IL 60614',
      itemDescription: 'Queen size mattress and box spring set, gently used, approximately 2 years old, no stains or damage',
      donationDate: '2024-11-15',
      recipientName: 'Marcus Johnson',
      estimatedValue: 250
    },
    {
      id: 'DR-2024-002',
      donorName: 'Sarah Mitchell',
      donorEmail: 'sarah.mitchell@email.com',
      donorAddress: '456 Oak Street, Chicago, IL 60614',
      itemDescription: 'Wooden dining table with 4 chairs, solid oak construction, minor wear on table surface',
      donationDate: '2024-10-22',
      recipientName: 'Jamal Williams',
      estimatedValue: 175
    },
    {
      id: 'DR-2024-003',
      donorName: 'Sarah Mitchell',
      donorEmail: 'sarah.mitchell@email.com',
      donorAddress: '456 Oak Street, Chicago, IL 60614',
      itemDescription: 'Box of kitchen essentials including pots, pans, utensils, dishes, and glassware (approximately 30 items)',
      donationDate: '2024-09-08',
      recipientName: 'Latoya Henderson',
      estimatedValue: 120
    },
    {
      id: 'DR-2023-005',
      donorName: 'Sarah Mitchell',
      donorEmail: 'sarah.mitchell@email.com',
      donorAddress: '456 Oak Street, Chicago, IL 60614',
      itemDescription: 'Professional work clothing: 3 dress shirts, 2 pairs of slacks, 1 blazer, 2 ties, all in excellent condition',
      donationDate: '2023-12-10',
      recipientName: 'Carlos Rodriguez',
      estimatedValue: 85
    }
  ];

  const years = [...new Set(donations.map(d => new Date(d.donationDate).getFullYear()))].sort((a, b) => b - a);
  
  const filteredDonations = donations.filter(d => new Date(d.donationDate).getFullYear() === selectedYear);
  
  const totalValue = filteredDonations.reduce((sum, d) => sum + (d.estimatedValue || 0), 0);
  const totalItems = filteredDonations.length;

  if (viewingReceipt) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => setViewingReceipt(null)}
            variant="outline"
            className="border-white/20 text-white mb-6"
          >
            ← BACK TO TAX DOCUMENTS
          </Button>
          <DonationReceiptGenerator donation={viewingReceipt} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl text-white mb-2">TAX DOCUMENTS CENTER</h1>
          <p className="text-white/60">Download your tax-deductible donation receipts</p>
        </div>

        {/* Tax Year Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-[#A8F32C]/30 p-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="h-8 w-8 text-[#A8F32C]" />
              <div>
                <p className="text-sm text-white/60">Tax Year</p>
                <p className="text-3xl text-white">{selectedYear}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500/20 to-transparent border-blue-500/30 p-6">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-8 w-8 text-blue-400" />
              <div>
                <p className="text-sm text-white/60">Total Donations</p>
                <p className="text-3xl text-white">{totalItems}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-r from-green-500/20 to-transparent border-green-500/30 p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="h-8 w-8 text-green-400" />
              <div>
                <p className="text-sm text-white/60">Est. Total Value</p>
                <p className="text-3xl text-white">${totalValue.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Year Filter */}
        <div className="flex items-center gap-3 mb-6">
          <Filter className="h-5 w-5 text-white/60" />
          <span className="text-white/60">Filter by year:</span>
          <div className="flex gap-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  selectedYear === year
                    ? 'bg-[#A8F32C] text-black border-[#A8F32C]'
                    : 'bg-black text-white border-white/20 hover:border-white/40'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Important Tax Info */}
        <Card className="bg-gradient-to-r from-yellow-500/20 to-transparent border-yellow-500/30 p-6 mb-6">
          <h3 className="text-white mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-yellow-400" />
            🎉 YOU HELPED REBUILD LIVES AND GET TAX BENEFITS!
          </h3>
          <div className="text-sm text-white/80 space-y-2">
            <p>
              <strong>Your {selectedYear} donations helped {totalItems} justice-impacted individual{totalItems > 1 ? 's' : ''} rebuild their {totalItems > 1 ? 'lives' : 'life'}.</strong>
            </p>
            <p>
              If you itemize deductions on your tax return, you can claim approximately <strong className="text-[#A8F32C]">${totalValue.toLocaleString()}</strong> in charitable deductions.
            </p>
            <p className="text-white/60 text-xs mt-3">
              💡 <strong>Tax Tip:</strong> Keep these receipts with your tax documents. You determine fair market value. Consult a tax professional for items over $5,000.
            </p>
          </div>
        </Card>

        {/* Receipts List */}
        <Card className="bg-[#121212] border-white/10">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl text-white">DONATION RECEIPTS - {selectedYear}</h2>
          </div>

          {filteredDonations.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl text-white mb-2">No Donations in {selectedYear}</h3>
              <p className="text-white/60">Donations you make will appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {filteredDonations.map((donation) => (
                <div key={donation.id} className="p-6 hover:bg-white/5 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-[#A8F32C]" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">Receipt #{donation.id}</h3>
                          <p className="text-sm text-white/60">
                            {new Date(donation.donationDate).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <p className="text-white/80 text-sm mb-2">{donation.itemDescription}</p>
                      <div className="flex items-center gap-4 text-xs text-white/60">
                        <span>Recipient: {donation.recipientName}</span>
                        {donation.estimatedValue && (
                          <span className="text-[#A8F32C]">Est. Value: ${donation.estimatedValue}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setViewingReceipt(donation)}
                        className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        VIEW RECEIPT
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white/20 text-white"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Download All */}
        {filteredDonations.length > 0 && (
          <div className="mt-6 flex justify-end">
            <Button className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
              <Download className="mr-2 h-4 w-4" />
              DOWNLOAD ALL {selectedYear} RECEIPTS (PDF)
            </Button>
          </div>
        )}

        {/* 501(c)(3) Info */}
        <Card className="bg-black border-white/10 p-6 mt-6">
          <h3 className="text-white mb-3">ABOUT FRIEND A FELON</h3>
          <div className="text-sm text-white/80 space-y-2">
            <p>
              <strong>Friend A Felon Corp</strong> is a 501(c)(3) tax-exempt organization dedicated to supporting justice-impacted individuals through job placement, housing assistance, and community resources.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/10">
              <div>
                <p className="text-white/60 text-xs">EIN (Tax ID)</p>
                <p className="text-white">86-3010859</p>
              </div>
              <div>
                <p className="text-white/60 text-xs">Status</p>
                <p className="text-[#A8F32C]">✓ 501(c)(3) Approved</p>
              </div>
              <div>
                <p className="text-white/60 text-xs">Address</p>
                <p className="text-white">1234 Main St, Cleveland, OH 44101</p>
              </div>
              <div>
                <p className="text-white/60 text-xs">Contact</p>
                <p className="text-white">donate@friendafelon.org</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}