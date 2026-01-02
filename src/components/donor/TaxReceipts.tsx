import { useState } from 'react';
import { FileText, Download, Mail, Calendar, Package, DollarSign, ArrowLeft, Search, Filter, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import LogoFinal from '../common/LogoFinal';

interface TaxReceiptsProps {
  onBack: () => void;
}

export default function TaxReceipts({ onBack }: TaxReceiptsProps) {
  const [selectedReceipt, setSelectedReceipt] = useState<number | null>(null);

  // Mock receipt data
  const receipts = [
    {
      id: 1,
      receiptNumber: 'FAF-2024-001234',
      itemName: 'Queen Mattress & Box Spring',
      recipient: 'Marcus Johnson',
      donationDate: 'November 28, 2024',
      fairMarketValue: 350,
      category: 'Furniture',
      donorName: 'Sarah Johnson',
      donorAddress: '456 Oak Street, Chicago, IL 60614',
      status: 'completed'
    },
    {
      id: 2,
      receiptNumber: 'FAF-2024-001189',
      itemName: 'Kitchen Essentials Bundle',
      recipient: 'Robert Davis',
      donationDate: 'November 25, 2024',
      fairMarketValue: 125,
      category: 'Household',
      donorName: 'Sarah Johnson',
      donorAddress: '456 Oak Street, Chicago, IL 60614',
      status: 'completed'
    },
    {
      id: 3,
      receiptNumber: 'FAF-2024-000987',
      itemName: 'Professional Interview Clothes (Men\'s L)',
      recipient: 'James Brown',
      donationDate: 'November 20, 2024',
      fairMarketValue: 200,
      category: 'Clothing',
      donorName: 'Sarah Johnson',
      donorAddress: '456 Oak Street, Chicago, IL 60614',
      status: 'completed'
    }
  ];

  const totalDeductions = receipts.reduce((sum, r) => sum + r.fairMarketValue, 0);

  const downloadReceipt = (receiptId: number) => {
    alert(`📄 Downloading receipt #${receiptId}...`);
    // In production, this would generate a PDF
  };

  const emailReceipt = (receiptId: number) => {
    alert(`📧 Receipt #${receiptId} sent to your email!`);
  };

  const downloadAll = () => {
    alert(`📦 Downloading all ${receipts.length} receipts as ZIP file...`);
  };

  const ReceiptDetail = ({ receipt }: { receipt: typeof receipts[0] }) => (
    <div className="bg-white text-black p-8 md:p-12 rounded-lg max-w-4xl mx-auto shadow-2xl">
      {/* Letterhead */}
      <div className="border-b-2 border-black pb-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl text-black mb-1" style={{ fontFamily: 'var(--font-heading)' }}>FRIEND A FELON</h1>
            <p className="text-xs md:text-sm text-black/70">A FairPath Industries Company</p>
          </div>
          <div className="text-right text-xs md:text-sm">
            <div className="text-black">501(c)(3) Nonprofit</div>
            <div className="text-black">EIN: 86-3010859</div>
          </div>
        </div>
        <div className="text-xs md:text-sm text-black/70">
          <div>Chicago, Illinois</div>
          <div>contact@friendafelon.org</div>
        </div>
      </div>

      {/* Receipt Header */}
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl text-black mb-2" style={{ fontFamily: 'var(--font-heading)' }}>TAX-DEDUCTIBLE DONATION RECEIPT</h2>
        <div className="text-xs md:text-sm text-black/70">Official IRS-Compliant Documentation</div>
      </div>

      {/* Receipt Details */}
      <div className="space-y-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-xs text-black/70 mb-1">Receipt Number</div>
            <div className="text-black text-sm md:text-base">{receipt.receiptNumber}</div>
          </div>
          <div>
            <div className="text-xs text-black/70 mb-1">Date of Donation</div>
            <div className="text-black text-sm md:text-base">{receipt.donationDate}</div>
          </div>
        </div>

        <div className="border-t border-black/10 pt-6">
          <div className="text-xs text-black/70 mb-2">Donor Information</div>
          <div className="text-black text-sm md:text-base mb-1">{receipt.donorName}</div>
          <div className="text-xs md:text-sm text-black/70">{receipt.donorAddress}</div>
        </div>

        <div className="border-t border-black/10 pt-6">
          <div className="text-xs text-black/70 mb-2">Donation Details</div>
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span className="text-black text-sm md:text-base">Item Description:</span>
              <span className="text-black text-sm md:text-base">{receipt.itemName}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-black text-sm md:text-base">Category:</span>
              <span className="text-black text-sm md:text-base">{receipt.category}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-black text-sm md:text-base">Condition:</span>
              <span className="text-black text-sm md:text-base">Good</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-black/10">
              <span className="text-black text-sm md:text-base">Fair Market Value:</span>
              <span className="text-lg md:text-xl text-black">${receipt.fairMarketValue.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-black/10 pt-6">
          <div className="text-xs text-black/70 mb-2">Recipient</div>
          <div className="text-xs md:text-sm text-black">
            This donation was received by {receipt.recipient}, a justice-impacted individual participating in Friend A Felon's reentry program.
          </div>
        </div>
      </div>

      {/* IRS Statement */}
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 md:p-6 mb-8">
        <h3 className="text-black text-sm md:text-base mb-3">IRS Compliance Statement</h3>
        <div className="text-xs md:text-sm text-black space-y-2">
          <p>
            <strong>No goods or services were provided in exchange for this donation.</strong> Friend A Felon Corp (EIN: 86-3010859) is a tax-exempt organization under Section 501(c)(3) of the Internal Revenue Code.
          </p>
          <p>
            Donations are tax-deductible to the extent allowed by law. Please consult with your tax advisor regarding the deductibility of this donation.
          </p>
          <p>
            The donor is responsible for determining the fair market value of donated items. Friend A Felon does not provide appraisals. For items valued over $5,000, IRS Form 8283 and a qualified appraisal may be required.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-black/10 pt-6 text-center text-xs md:text-sm text-black/70">
        <p className="mb-2">This receipt was generated electronically on {new Date().toLocaleDateString()}</p>
        <p>Thank you for helping justice-impacted individuals restart their lives! 💚</p>
      </div>

      {/* Signature */}
      <div className="mt-8 pt-6 border-t border-black/10">
        <div className="text-center">
          <div className="text-lg md:text-xl text-black mb-1" style={{ fontFamily: 'cursive' }}>
            Michael Torres
          </div>
          <div className="text-xs md:text-sm text-black/70">Executive Director</div>
          <div className="text-xs md:text-sm text-black/70">Friend A Felon Corp</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button onClick={onBack} variant="ghost" className="text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <LogoFinal size="md" />
            </div>
            <Button onClick={downloadAll} className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90">
              <Download className="mr-2 h-4 w-4" />
              Download All Receipts
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {!selectedReceipt ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl mb-2 text-white">Tax Receipts & Documents</h1>
              <p className="text-xl text-white/60">
                IRS-compliant receipts for your tax-deductible donations
              </p>
            </div>

            {/* Summary Card */}
            <Card className="bg-gradient-to-r from-green-500/20 to-transparent border-green-500/30 p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-green-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl mb-1 text-white">
                    ${totalDeductions.toLocaleString()} in Tax Deductions
                  </h2>
                  <p className="text-white/80 mb-4">
                    Total fair market value of your {receipts.length} tax-deductible donations in 2024
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-white/60">Total Items Donated</div>
                      <div className="text-xl text-white">{receipts.length}</div>
                    </div>
                    <div>
                      <div className="text-white/60">Average Value</div>
                      <div className="text-xl text-white">
                        ${Math.round(totalDeductions / receipts.length)}
                      </div>
                    </div>
                    <div>
                      <div className="text-white/60">Tax Year</div>
                      <div className="text-xl text-white">2024</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Search & Filter */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input
                  placeholder="Search receipts..."
                  className="bg-[#121212] border-white/20 text-white pl-10"
                />
              </div>
              <Button variant="outline" className="border-white/20 text-white">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>

            {/* Receipts List */}
            <div className="space-y-4">
              {receipts.map((receipt) => (
                <Card key={receipt.id} className="bg-[#121212] border-white/10 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#A8F32C]/20 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-6 w-6 text-[#A8F32C]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg text-white mb-1">{receipt.itemName}</h3>
                          <div className="flex items-center gap-3 text-sm text-white/60">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {receipt.donationDate}
                            </span>
                            <span>•</span>
                            <span>Receipt #{receipt.receiptNumber}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl text-[#A8F32C] mb-1">
                            ${receipt.fairMarketValue}
                          </div>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Tax Deductible
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="bg-black/50 border border-white/5 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-white/60 mb-1">Category</div>
                            <div className="text-white">{receipt.category}</div>
                          </div>
                          <div>
                            <div className="text-white/60 mb-1">Recipient</div>
                            <div className="text-white">{receipt.recipient}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          onClick={() => setSelectedReceipt(receipt.id)}
                          className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          View Receipt
                        </Button>
                        <Button 
                          onClick={() => downloadReceipt(receipt.id)}
                          variant="outline" 
                          className="border-white/20 text-white"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                        <Button 
                          onClick={() => emailReceipt(receipt.id)}
                          variant="outline" 
                          className="border-white/20 text-white"
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Email
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Tax Tips */}
            <Card className="bg-[#121212] border-white/10 p-6 mt-8">
              <h3 className="text-lg mb-4 text-white">💡 Tax Filing Tips</h3>
              <div className="space-y-3 text-sm text-white/80">
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Keep these receipts:</strong> Save all receipts with your tax documents
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Report on Schedule A:</strong> Itemize deductions on your tax return
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Over $5,000?</strong> You'll need IRS Form 8283 and a qualified appraisal
                  </div>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-5 w-5 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Consult a tax professional:</strong> For specific advice on your situation
                  </div>
                </div>
              </div>
            </Card>
          </>
        ) : (
          <>
            <Button 
              onClick={() => setSelectedReceipt(null)} 
              variant="ghost" 
              className="mb-6 text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Receipts
            </Button>
            <ReceiptDetail receipt={receipts.find(r => r.id === selectedReceipt)!} />
            <div className="flex justify-center gap-4 mt-8">
              <Button 
                onClick={() => downloadReceipt(selectedReceipt)}
                className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button 
                onClick={() => emailReceipt(selectedReceipt)}
                variant="outline" 
                className="border-white/20 text-white"
              >
                <Mail className="mr-2 h-4 w-4" />
                Email Receipt
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}