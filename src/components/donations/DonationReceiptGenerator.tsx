import { Check, Download, FileText } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface DonationReceiptProps {
  donation: {
    id: string;
    donorName: string;
    donorEmail: string;
    donorAddress: string;
    itemDescription: string;
    donationDate: string;
    recipientName: string;
  };
  onDownload?: () => void;
}

export default function DonationReceiptGenerator({ donation, onDownload }: DonationReceiptProps) {
  const nonprofitInfo = {
    name: 'Friend A Felon',
    legalName: 'Friend A Felon Corp',
    ein: '86-3010859',
    address: '1234 Main Street, Cleveland, OH 44101',
    phone: '(216) 555-0100',
    email: 'donate@friendafelon.org',
    status: '501(c)(3) Tax-Exempt Organization'
  };

  const generatePDF = () => {
    // In production, this would generate actual PDF using jsPDF or similar
    if (onDownload) onDownload();
    alert('PDF Receipt Downloaded! (In production, this generates a real PDF)');
  };

  return (
    <div className="space-y-6">
      {/* Receipt Preview */}
      <Card className="bg-white border-2 border-[#A8F32C] p-8 text-black">
        <div className="border-b-2 border-black pb-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl mb-2" style={{ fontFamily: 'Futura, sans-serif' }}>
                FRIEND A FELON
              </h1>
              <p className="text-sm text-black/60 italic mb-4">A FairPath Industries Company</p>
              <div className="text-sm space-y-1">
                <p><strong>{nonprofitInfo.legalName}</strong></p>
                <p>{nonprofitInfo.address}</p>
                <p>{nonprofitInfo.phone} • {nonprofitInfo.email}</p>
                <p className="mt-2 text-[#A8F32C] font-bold">✓ {nonprofitInfo.status}</p>
                <p><strong>EIN:</strong> {nonprofitInfo.ein}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-[#A8F32C]/20 border-2 border-[#A8F32C] px-4 py-2 rounded-lg mb-2">
                <p className="text-xs text-black/60">TAX-DEDUCTIBLE</p>
                <p className="text-lg font-bold">DONATION RECEIPT</p>
              </div>
              <p className="text-sm mt-2">Receipt #{donation.id}</p>
            </div>
          </div>
        </div>

        {/* Donor Information */}
        <div className="mb-6">
          <h2 className="text-lg mb-3 font-bold">DONOR INFORMATION</h2>
          <div className="bg-gray-100 p-4 rounded-lg text-sm">
            <p><strong>Name:</strong> {donation.donorName}</p>
            <p><strong>Email:</strong> {donation.donorEmail}</p>
            <p><strong>Address:</strong> {donation.donorAddress}</p>
          </div>
        </div>

        {/* Donation Details */}
        <div className="mb-6">
          <h2 className="text-lg mb-3 font-bold">DONATION DETAILS</h2>
          <div className="bg-gray-100 p-4 rounded-lg text-sm space-y-2">
            <div className="flex justify-between">
              <span><strong>Donation Date:</strong></span>
              <span>{new Date(donation.donationDate).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}</span>
            </div>
            <div className="border-t border-gray-300 pt-2">
              <p><strong>Item Description:</strong></p>
              <p className="mt-1">{donation.itemDescription}</p>
            </div>
            <div className="border-t border-gray-300 pt-2">
              <p><strong>Recipient:</strong> {donation.recipientName}</p>
              <p className="text-xs text-black/60 mt-1">
                (Justice-impacted individual supported through Friend A Felon's reentry programs)
              </p>
            </div>
          </div>
        </div>

        {/* IRS Required Statement */}
        <div className="bg-yellow-50 border-2 border-yellow-400 p-4 rounded-lg mb-6">
          <p className="text-sm font-bold mb-2">⚠️ IMPORTANT TAX INFORMATION</p>
          <div className="text-xs space-y-2">
            <p>
              <strong>No goods or services were provided in exchange for this donation.</strong>
            </p>
            <p>
              This organization is tax-exempt under Section 501(c)(3) of the Internal Revenue Code. 
              Donations are deductible to the extent allowed by law.
            </p>
            <p>
              <strong>Donor is responsible for determining fair market value.</strong> For items valued 
              over $500, you must complete IRS Form 8283. Items valued over $5,000 require a qualified appraisal.
            </p>
            <p className="mt-3 text-black/60">
              For questions about this receipt, please contact {nonprofitInfo.email}
            </p>
          </div>
        </div>

        {/* Signature */}
        <div className="border-t-2 border-black pt-4">
          <div className="flex justify-between items-end">
            <div>
              <div className="mb-1">
                <p className="text-2xl mb-1" style={{ fontFamily: 'Brush Script MT, cursive' }}>
                  Marcus Thompson
                </p>
                <div className="border-t border-black w-48"></div>
              </div>
              <p className="text-xs">Executive Director, Friend A Felon</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-black/60">Receipt Issued On:</p>
              <p className="text-sm">{new Date().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Download Button */}
      <div className="flex gap-4">
        <Button onClick={generatePDF} className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 py-6">
          <Download className="mr-2 h-5 w-5" />
          DOWNLOAD PDF RECEIPT
        </Button>
        <Button 
          onClick={() => window.print()} 
          variant="outline" 
          className="border-white/20 text-white py-6"
        >
          <FileText className="mr-2 h-5 w-5" />
          PRINT
        </Button>
      </div>

      {/* Tax Filing Tips */}
      <Card className="bg-gradient-to-r from-blue-500/20 to-transparent border-blue-500/30 p-6">
        <h3 className="text-white mb-3 flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-400" />
          HOW TO USE THIS RECEIPT
        </h3>
        <ul className="space-y-2 text-sm text-white/80">
          <li className="flex gap-2">
            <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
            <span><strong>Save this receipt</strong> for your tax records</span>
          </li>
          <li className="flex gap-2">
            <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
            <span><strong>Determine fair market value</strong> using sites like eBay, Goodwill pricing guides, or tax software</span>
          </li>
          <li className="flex gap-2">
            <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
            <span><strong>Report on Schedule A</strong> of your tax return when you itemize deductions</span>
          </li>
          <li className="flex gap-2">
            <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
            <span><strong>Use Form 8283</strong> if total non-cash donations exceed $500</span>
          </li>
          <li className="flex gap-2">
            <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
            <span><strong>Consult a tax professional</strong> for items valued over $5,000</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}