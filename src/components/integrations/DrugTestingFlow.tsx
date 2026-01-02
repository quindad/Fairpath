import { useState } from 'react';
import { QrCode, MapPin, Clock, CheckCircle, AlertCircle, Loader2, FileText, Calendar } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface DrugTestingFlowProps {
  applicantId: string;
  jobId: string;
  onComplete: (testId: string) => void;
  onCancel: () => void;
}

interface QuestLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  distance: string;
  hours: string;
  phone: string;
}

interface DrugTestOrder {
  id: string;
  qrCode: string; // Base64 encoded QR code image
  orderNumber: string;
  testType: string;
  expiresAt: string;
  status: 'pending' | 'scheduled' | 'completed' | 'expired';
  location?: QuestLocation;
}

const mockQuestLocations: QuestLocation[] = [
  {
    id: 'quest_1',
    name: 'Quest Diagnostics - Downtown Cleveland',
    address: '1001 Euclid Ave, Suite 200',
    city: 'Cleveland',
    state: 'OH',
    zip: '44115',
    distance: '2.3 miles',
    hours: 'Mon-Fri: 7:00 AM - 4:00 PM',
    phone: '(216) 555-1234'
  },
  {
    id: 'quest_2',
    name: 'Quest Diagnostics - East Side',
    address: '5500 Superior Ave',
    city: 'Cleveland',
    state: 'OH',
    zip: '44103',
    distance: '4.1 miles',
    hours: 'Mon-Fri: 6:30 AM - 5:00 PM, Sat: 8:00 AM - 12:00 PM',
    phone: '(216) 555-5678'
  },
  {
    id: 'quest_3',
    name: 'Quest Diagnostics - West Side',
    address: '11100 Lorain Ave',
    city: 'Cleveland',
    state: 'OH',
    zip: '44111',
    distance: '6.8 miles',
    hours: 'Mon-Fri: 7:00 AM - 3:30 PM',
    phone: '(216) 555-9012'
  },
];

export default function DrugTestingFlow({
  applicantId,
  jobId,
  onComplete,
  onCancel
}: DrugTestingFlowProps) {
  const [step, setStep] = useState<'info' | 'location' | 'qr-code' | 'awaiting-results' | 'results'>('info');
  const [selectedLocation, setSelectedLocation] = useState<QuestLocation | null>(null);
  const [testOrder, setTestOrder] = useState<DrugTestOrder | null>(null);

  const handleGenerateQRCode = async () => {
    // In production, this calls your backend which calls Quest Diagnostics API
    const mockQRCode = generateMockQRCode();
    
    const order: DrugTestOrder = {
      id: `test_${Math.random().toString(36).substr(2, 9)}`,
      qrCode: mockQRCode,
      orderNumber: `QD${Math.random().toString().slice(2, 11)}`,
      testType: '5-Panel + Expanded Opiates',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      status: 'pending',
      location: selectedLocation || undefined
    };
    
    setTestOrder(order);
    setStep('qr-code');
  };

  const generateMockQRCode = () => {
    // In production, this would be a real QR code from Quest
    // For now, returning a placeholder SVG as base64
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
        <rect width="200" height="200" fill="#A8F32C"/>
        <text x="100" y="100" text-anchor="middle" dominant-baseline="middle" font-size="24" fill="black">
          QR CODE
        </text>
        <text x="100" y="130" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="black">
          Quest Diagnostics
        </text>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {step === 'info' && (
          <Card className="bg-[#121212] border-white/5 p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-[#A8F32C]" />
                </div>
                <div>
                  <h1 className="text-2xl">Drug Screening Required</h1>
                  <p className="text-sm text-white/60">
                    Quest Diagnostics • Fast results
                  </p>
                </div>
              </div>
            </div>

            {/* Why Drug Test */}
            <div className="bg-black/50 rounded-xl p-6 mb-6 border border-white/5">
              <h2 className="text-lg mb-4">About This Drug Test</h2>
              <div className="space-y-3 text-sm text-white/80">
                <p>
                  This employer requires a pre-employment drug screening as part of their hiring process. 
                  This is a standard 5-panel drug test with expanded opiate testing.
                </p>
                <div className="bg-[#A8F32C]/5 rounded-lg p-4 border border-[#A8F32C]/20">
                  <div className="text-xs text-[#A8F32C] mb-2">What's Tested:</div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-white/60">
                    <div>• Marijuana (THC)</div>
                    <div>• Cocaine</div>
                    <div>• Amphetamines</div>
                    <div>• Opiates (expanded panel)</div>
                    <div>• Phencyclidine (PCP)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-black/50 rounded-xl p-6 mb-6 border border-white/5">
              <h3 className="text-lg mb-4">How It Works</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#A8F32C] text-xs">1</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm mb-1">Choose a Quest Diagnostics location</div>
                    <div className="text-xs text-white/60">Pick the most convenient lab near you</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#A8F32C] text-xs">2</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm mb-1">Get your QR code</div>
                    <div className="text-xs text-white/60">We'll generate a unique QR code for your test order</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#A8F32C] text-xs">3</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm mb-1">Visit the lab</div>
                    <div className="text-xs text-white/60">Show your QR code at check-in. Bring photo ID.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#A8F32C]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#A8F32C] text-xs">4</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm mb-1">Results sent automatically</div>
                    <div className="text-xs text-white/60">Results typically available in 24-48 hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Info */}
            <div className="bg-[#A8F32C]/5 rounded-xl p-6 mb-6 border border-[#A8F32C]/20">
              <h3 className="text-sm mb-3 text-[#A8F32C]">Important Information:</h3>
              <ul className="space-y-2 text-xs text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-[#A8F32C]">•</span>
                  <span>Bring a valid photo ID (driver's license, state ID, or passport)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A8F32C]">•</span>
                  <span>Your QR code is valid for 7 days from generation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A8F32C]">•</span>
                  <span>No appointment needed - walk-in testing available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A8F32C]">•</span>
                  <span>The test is prepaid - no cost to you</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 border-white/20"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                onClick={() => setStep('location')}
              >
                Choose Lab Location
              </Button>
            </div>
          </Card>
        )}

        {step === 'location' && (
          <Card className="bg-[#121212] border-white/5 p-8">
            <div className="mb-8">
              <h1 className="text-2xl mb-2">Choose Lab Location</h1>
              <p className="text-sm text-white/60">
                Select the Quest Diagnostics location most convenient for you
              </p>
            </div>

            <div className="space-y-4 mb-6">
              {mockQuestLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => setSelectedLocation(location)}
                  className={`w-full text-left bg-black/50 rounded-xl p-5 border transition-all ${
                    selectedLocation?.id === location.id
                      ? 'border-[#A8F32C]'
                      : 'border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <MapPin className="h-5 w-5 text-[#A8F32C]" />
                        <div>
                          <h3 className="text-lg">{location.name}</h3>
                          <div className="text-sm text-white/60">{location.distance} away</div>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-white/80">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-white/40 flex-shrink-0 mt-0.5" />
                          <div>
                            {location.address}<br />
                            {location.city}, {location.state} {location.zip}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-white/40" />
                          <span>{location.hours}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-white/40" />
                          <span>{location.phone}</span>
                        </div>
                      </div>
                    </div>

                    {selectedLocation?.id === location.id && (
                      <CheckCircle className="h-6 w-6 text-[#A8F32C] flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 border-white/20"
                onClick={() => setStep('info')}
              >
                Back
              </Button>
              <Button 
                className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                onClick={handleGenerateQRCode}
                disabled={!selectedLocation}
              >
                Generate QR Code
              </Button>
            </div>
          </Card>
        )}

        {step === 'qr-code' && testOrder && (
          <Card className="bg-[#121212] border-white/5 p-8">
            <div className="mb-8 text-center">
              <div className="w-16 h-16 bg-[#A8F32C]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <QrCode className="h-8 w-8 text-[#A8F32C]" />
              </div>
              <h1 className="text-2xl mb-2">Your Drug Test QR Code</h1>
              <p className="text-sm text-white/60">
                Show this code at the Quest Diagnostics check-in desk
              </p>
            </div>

            {/* QR Code Display */}
            <div className="bg-white rounded-2xl p-8 mb-6">
              <div className="flex flex-col items-center">
                {/* Mock QR Code - In production, this would be the real QR code */}
                <div className="w-64 h-64 bg-gradient-to-br from-[#A8F32C] to-[#85C123] rounded-xl flex items-center justify-center mb-4">
                  <div className="text-center">
                    <QrCode className="h-32 w-32 text-black mx-auto mb-4" />
                    <div className="text-black text-sm">Quest Diagnostics</div>
                    <div className="text-black text-xs">Order #{testOrder.orderNumber}</div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-black text-lg mb-1">Order Number</div>
                  <div className="text-black text-2xl tracking-wider">{testOrder.orderNumber}</div>
                </div>
              </div>
            </div>

            {/* Test Details */}
            <div className="bg-black/50 rounded-xl p-6 mb-6 border border-white/5">
              <h3 className="text-sm mb-4 text-white/80">Test Details:</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Test Type:</span>
                  <span className="text-white">{testOrder.testType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Order Number:</span>
                  <span className="text-white">{testOrder.orderNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60">Valid Until:</span>
                  <span className="text-white">
                    {new Date(testOrder.expiresAt).toLocaleDateString()}
                  </span>
                </div>
                {testOrder.location && (
                  <div className="flex items-start justify-between">
                    <span className="text-white/60">Location:</span>
                    <span className="text-white text-right max-w-xs">
                      {testOrder.location.name}<br />
                      <span className="text-xs text-white/60">{testOrder.location.address}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-[#A8F32C]/5 rounded-xl p-6 mb-6 border border-[#A8F32C]/20">
              <h3 className="text-sm mb-3 text-[#A8F32C]">At the Lab:</h3>
              <ol className="space-y-2 text-xs text-white/80">
                <li className="flex items-start gap-2">
                  <span className="text-[#A8F32C]">1.</span>
                  <span>Check in at the front desk</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A8F32C]">2.</span>
                  <span>Show this QR code on your phone (or print this page)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A8F32C]">3.</span>
                  <span>Present a valid photo ID</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A8F32C]">4.</span>
                  <span>Follow the collector's instructions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A8F32C]">5.</span>
                  <span>Results will be sent to FairPath automatically (24-48 hours)</span>
                </li>
              </ol>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1 border-white/20"
                onClick={() => window.print()}
              >
                Print QR Code
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-white/20"
              >
                Email to Myself
              </Button>
              <Button 
                className="flex-1 bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
                onClick={() => {
                  setStep('awaiting-results');
                  onComplete(testOrder.id);
                }}
              >
                I'm Ready
              </Button>
            </div>
          </Card>
        )}

        {step === 'awaiting-results' && testOrder && (
          <Card className="bg-[#121212] border-white/5 p-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#A8F32C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-10 w-10 text-[#A8F32C]" />
              </div>
              <h2 className="text-2xl mb-2">Awaiting Test Results</h2>
              <p className="text-sm text-white/60 mb-8">
                Once you complete your drug test, results will be available in 24-48 hours
              </p>

              <div className="bg-black/50 rounded-xl p-6 mb-6 border border-white/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-white/60">Order Number:</span>
                  <span className="text-white">{testOrder.orderNumber}</span>
                </div>
                <Badge className="bg-yellow-500/20 text-yellow-500 border-0">
                  <Clock className="h-3 w-3 mr-1" />
                  Pending Test
                </Badge>
              </div>

              <p className="text-xs text-white/40">
                You'll receive an email notification when results are available.<br />
                You can also check your dashboard for updates.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

// Quest Diagnostics API Integration (Backend)
export const questDiagnosticsConfig = {
  API_KEY: 'quest_api_key_...',
  API_URL: 'https://api.questdiagnostics.com/v1',
  CLIENT_ID: 'fairpath_industries',
  
  // Webhook for results
  WEBHOOK_URL: '/api/webhooks/quest-diagnostics',
  WEBHOOK_SECRET: 'whsec_...',
};

// Backend API Example
/*
POST /api/drug-test/create-order

Request:
{
  "applicantId": "user_123",
  "jobId": "job_456",
  "testType": "5-panel-expanded",
  "locationId": "quest_1"
}

Response:
{
  "orderId": "test_xxx",
  "orderNumber": "QD123456789",
  "qrCodeData": "base64_encoded_qr_code_image",
  "qrCodeUrl": "https://api.fairpath.com/qr/test_xxx",
  "expiresAt": "2025-12-03T00:00:00Z",
  "location": {...}
}

Quest Diagnostics Result Webhook:
POST /api/webhooks/quest-diagnostics

{
  "event": "test.completed",
  "orderNumber": "QD123456789",
  "testId": "test_xxx",
  "result": "negative" | "positive" | "invalid",
  "completedAt": "2025-11-25T14:30:00Z",
  "reportUrl": "https://secure.questdiagnostics.com/reports/xxx",
  "substances": [
    {
      "name": "THC",
      "result": "negative",
      "cutoffLevel": "50 ng/mL",
      "detectedLevel": "< 15 ng/mL"
    }
  ]
}

Workflow:
1. User generates QR code in app
2. Backend calls Quest API to create test order
3. Quest returns QR code data
4. User visits Quest location with QR code
5. Quest processes sample and sends results to webhook
6. Backend updates application status
7. User/Employer notified of results
*/
