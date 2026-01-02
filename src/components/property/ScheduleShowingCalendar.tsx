import { useState } from 'react';
import { Calendar, Clock, ArrowLeft, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import Logo from '../common/Logo';

interface ScheduleShowingCalendarProps {
  application: any;
  onConfirm: (date: string, time: string) => void;
  onCancel: () => void;
}

export default function ScheduleShowingCalendar({ application, onConfirm, onCancel }: ScheduleShowingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Generate next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  // Available time slots
  const timeSlots = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM'
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      onConfirm(selectedDate, selectedTime);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" showTagline={false} />
            <Button
              onClick={onCancel}
              variant="ghost"
              className="text-white/60 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header Info */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2">Schedule Property Showing</h1>
          <p className="text-white/60 mb-4">
            Select a date and time for {application.applicantName}'s showing at {application.propertyAddress}
          </p>
          
          {/* Important Notice */}
          <Card className="bg-[#A8F32C]/10 border-[#A8F32C]/30 p-4">
            <div className="text-sm text-white">
              <span className="text-[#A8F32C]">FastTrack Requirement:</span> All FastTrack applicants 
              are guaranteed a showing. This is part of our $30 rev-share agreement.
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Date Selection */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-[#A8F32C]" />
              <h2 className="text-xl">Select Date</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {dates.map((date) => {
                const dateStr = formatDate(date);
                const isSelected = selectedDate === dateStr;
                
                return (
                  <button
                    key={dateStr}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      isSelected
                        ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                        : 'border-white/20 bg-[#121212] hover:border-white/40'
                    }`}
                  >
                    <div className="text-xs text-white/60 mb-1">{getDayName(date)}</div>
                    <div className="text-white">{date.getDate()}</div>
                    <div className="text-xs text-white/60">
                      {date.toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                    {isSelected && (
                      <Check className="h-4 w-4 text-[#A8F32C] absolute top-2 right-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-[#A8F32C]" />
              <h2 className="text-xl">Select Time</h2>
            </div>

            {!selectedDate ? (
              <Card className="bg-[#121212] border-white/10 p-8 text-center">
                <p className="text-white/40">Please select a date first</p>
              </Card>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((time) => {
                  const isSelected = selectedTime === time;
                  
                  return (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-[#A8F32C] bg-[#A8F32C]/10'
                          : 'border-white/20 bg-[#121212] hover:border-white/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white">{time}</span>
                        {isSelected && (
                          <Check className="h-4 w-4 text-[#A8F32C]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Selection Summary */}
        {selectedDate && selectedTime && (
          <Card className="bg-gradient-to-br from-[#A8F32C]/20 via-[#121212] to-[#121212] border-[#A8F32C] p-6 mt-8">
            <h3 className="text-lg mb-4">Showing Details</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-sm text-white/60 mb-1">Property</div>
                <div className="text-white">{application.propertyAddress}</div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-1">Applicant</div>
                <div className="text-white">{application.applicantName}</div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-1">Date</div>
                <div className="text-[#A8F32C]">{selectedDate}</div>
              </div>
              <div>
                <div className="text-sm text-white/60 mb-1">Time</div>
                <div className="text-[#A8F32C]">{selectedTime}</div>
              </div>
            </div>

            <div className="bg-black/30 rounded-lg p-4 mb-6">
              <div className="text-sm text-white/60 mb-2">What happens next:</div>
              <ul className="space-y-2 text-sm text-white">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>Applicant receives showing confirmation via app notification</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>Automatic reminders sent 24 hours before showing</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>You can reschedule anytime from your dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[#A8F32C] flex-shrink-0 mt-0.5" />
                  <span>Your $30 rev-share is credited after showing completion</span>
                </li>
              </ul>
            </div>

            <Button
              onClick={handleConfirm}
              className="w-full bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90"
            >
              Confirm Showing
            </Button>
          </Card>
        )}

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-white/40">
            Need to change your availability? You can update your showing schedule in Settings.
          </p>
        </div>
      </div>
    </div>
  );
}
