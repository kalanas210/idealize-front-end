import React, { useState, useEffect } from 'react';
import CalService, { CalEventType } from '../../services/calService';

interface MeetingSchedulerProps {
  sellerUsername: string;
  sellerName: string;
  gigId: string;
  sellerId: string;
  onBookingComplete?: (booking: any) => void;
  className?: string;
}

const MeetingScheduler: React.FC<MeetingSchedulerProps> = ({
  sellerUsername,
  sellerName,
  gigId,
  sellerId,
  onBookingComplete,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [eventTypes, setEventTypes] = useState<CalEventType[]>([]);
  const [selectedEventType, setSelectedEventType] = useState<CalEventType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const calService = new CalService();

  useEffect(() => {
    if (isOpen && sellerUsername) {
      loadEventTypes();
    }
  }, [isOpen, sellerUsername]);

  useEffect(() => {
    if (selectedEventType && selectedDate) {
      loadAvailableSlots();
    }
  }, [selectedEventType, selectedDate]);

  const loadEventTypes = async () => {
    try {
      setIsLoading(true);
      const response = await calService.getEventTypes(sellerUsername);
      
      if (response.success && response.data && response.data.length > 0) {
        setEventTypes(response.data);
        setSelectedEventType(response.data[0]);
      } else {
        // Fallback to default meeting types if API doesn't return data
        const fallbackEventTypes: CalEventType[] = [
          {
            id: 'consultation-30',
            title: '30-Minute Consultation',
            description: 'Quick consultation to discuss your project requirements',
            duration: 30,
            price: 0,
            slug: 'consultation-30'
          },
          {
            id: 'consultation-60',
            title: '1-Hour Deep Dive',
            description: 'Comprehensive consultation for complex projects',
            duration: 60,
            price: 0,
            slug: 'consultation-60'
          },
          {
            id: 'strategy-session',
            title: 'Strategy Session',
            description: 'Strategic planning and project roadmap discussion',
            duration: 45,
            price: 0,
            slug: 'strategy-session'
          }
        ];
        
        setEventTypes(fallbackEventTypes);
        setSelectedEventType(fallbackEventTypes[0]);
      }
    } catch (error) {
      // Fallback to default meeting types on error
      const fallbackEventTypes: CalEventType[] = [
        {
          id: 'consultation-30',
          title: '30-Minute Consultation',
          description: 'Quick consultation to discuss your project requirements',
          duration: 30,
          price: 0,
          slug: 'consultation-30'
        },
        {
          id: 'consultation-60',
          title: '1-Hour Deep Dive',
          description: 'Comprehensive consultation for complex projects',
          duration: 60,
          price: 0,
          slug: 'consultation-60'
        },
        {
          id: 'strategy-session',
          title: 'Strategy Session',
          description: 'Strategic planning and project roadmap discussion',
          duration: 45,
          price: 0,
          slug: 'strategy-session'
        }
      ];
      
      setEventTypes(fallbackEventTypes);
      setSelectedEventType(fallbackEventTypes[0]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAvailableSlots = async () => {
    if (!selectedEventType) return;

    try {
      setIsLoading(true);
      const dateStr = calService.formatDate(selectedDate);
      const response = await calService.getAvailableSlots(
        sellerUsername,
        dateStr,
        selectedEventType.duration
      );

      if (response.success && response.data && response.data.length > 0) {
        setAvailableSlots(response.data);
      } else {
        // Fallback to generated time slots if API fails or returns no data
        const slots = calService.generateTimeSlots(9, 17, 30);
        setAvailableSlots(slots);
      }
    } catch (error) {
      // Fallback to generated time slots on error
      const slots = calService.generateTimeSlots(9, 17, 30);
      setAvailableSlots(slots);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleBooking = async () => {
    if (!selectedEventType || !selectedTime) {
      setError('Please select a meeting type and time');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      setSuccess('');

      // Check if we're in demo mode (using fallback event types)
      const isDemoMode = selectedEventType.id.startsWith('consultation-');

      if (isDemoMode) {
        // Demo mode - simulate successful booking
        setTimeout(() => {
          setSuccess('Demo: Meeting scheduled successfully! In production, this would create a real Cal.com booking.');
          onBookingComplete?.({
            id: 'demo-booking-' + Date.now(),
            eventType: selectedEventType,
            startTime: selectedTime,
            date: selectedDate,
            status: 'confirmed'
          });
          
          // Close modal after a delay
          setTimeout(() => {
            setIsOpen(false);
            setSuccess('');
          }, 3000);
        }, 1000);
        return;
      }

      // Real Cal.com API call
      const startTime = new Date(selectedDate);
      const [hours, minutes] = selectedTime.split(':').map(Number);
      startTime.setHours(hours, minutes, 0, 0);
      
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + selectedEventType.duration);

      const bookingData = {
        eventTypeId: selectedEventType.id,
        startTime: calService.formatTime(startTime),
        endTime: calService.formatTime(endTime),
        buyerEmail: 'buyer@example.com', // This should come from user context
        buyerName: 'Buyer Name', // This should come from user context
        gigId,
        sellerId
      };

      const response = await calService.createBooking(bookingData);

      if (response.success) {
        setSuccess('Meeting scheduled successfully! Check your email for confirmation.');
        onBookingComplete?.(response.data);
        
        // Close modal after a delay
        setTimeout(() => {
          setIsOpen(false);
          setSuccess('');
        }, 3000);
      } else {
        setError(response.error || 'Failed to schedule meeting');
      }
    } catch (error) {
      setError('Failed to schedule meeting');
    } finally {
      setIsLoading(false);
    }
  };

  const openCalComDirectly = () => {
    const bookingLink = calService.generateBookingLink(sellerUsername);
    window.open(bookingLink, '_blank');
  };

  const getNextBusinessDays = (count: number = 7): Date[] => {
    const days: Date[] = [];
    let currentDate = new Date();
    
    while (days.length < count) {
      currentDate.setDate(currentDate.getDate() + 1);
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        days.push(new Date(currentDate));
      }
    }
    
    return days;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const isDateSelected = (date: Date): boolean => {
    return selectedDate.toDateString() === date.toDateString();
  };

  return (
    <div className={className}>
      {/* Schedule Meeting Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Schedule Video Call
      </button>

      {/* Alternative: Direct Cal.com Link */}
      <button
        onClick={openCalComDirectly}
        className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
      >
        Or book directly on Cal.com →
      </button>

      {/* Meeting Scheduler Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Schedule a Meeting</h2>
                <p className="text-gray-600 mt-1">Book a video call with {sellerName}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Info Message */}
              {eventTypes.length > 0 && eventTypes[0].id.startsWith('consultation-') && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 1 18 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-blue-800">
                        <strong>Demo Mode:</strong> This is a demonstration of the meeting scheduler. 
                        In production, these options would be configured by the seller through Cal.com.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Event Type Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Meeting Type</h3>
                {isLoading && eventTypes.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading meeting types...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {eventTypes.map((eventType) => (
                      <button
                        key={eventType.id}
                        onClick={() => setSelectedEventType(eventType)}
                        className={`p-4 border rounded-lg text-left transition-all ${
                          selectedEventType?.id === eventType.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-gray-900">{eventType.title}</div>
                        <div className="text-sm text-gray-600 mt-1">{eventType.description}</div>
                        <div className="text-sm text-gray-500 mt-2">
                          {eventType.duration} minutes
                          {eventType.price && eventType.price > 0 ? (
                            <span className="ml-2 text-blue-600 font-medium">
                              ${eventType.price}
                            </span>
                          ) : (
                            <span className="ml-2 text-green-600 font-medium">
                              Free
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Date</h3>
                <p className="text-sm text-gray-600 mb-3">Choose from the next 7 business days</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {getNextBusinessDays(7).map((date) => (
                    <button
                      key={date.toISOString()}
                      onClick={() => handleDateChange(date)}
                      className={`flex-shrink-0 px-4 py-2 rounded-lg border transition-all ${
                        isDateSelected(date)
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {formatDate(date)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedEventType && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Time</h3>
                  {isLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                      <p className="text-gray-600 mt-2">Loading available times...</p>
                    </div>
                  ) : availableSlots.length > 0 ? (
                    <>
                      <div className="mb-2">
                        <p className="text-sm text-gray-500">
                          {availableSlots[0] === '09:00' ? 'Generated time slots (demo mode)' : 'Available time slots'}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {availableSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            className={`py-2 px-3 rounded-lg border transition-all text-sm ${
                              selectedTime === time
                                ? 'border-blue-500 bg-blue-500 text-white'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600">No available time slots for this date.</p>
                      <p className="text-sm text-gray-500 mt-1">Please select a different date.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Error and Success Messages */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 1 18 0z" />
                    </svg>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {success && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-green-700 text-sm">{success}</p>
                  </div>
                </div>
              )}

              {/* Booking Summary */}
              {selectedEventType && selectedTime && (
                <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Booking Summary</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div><span className="font-medium">Meeting:</span> {selectedEventType.title}</div>
                    <div><span className="font-medium">Date:</span> {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    <div><span className="font-medium">Time:</span> {selectedTime}</div>
                    <div><span className="font-medium">Duration:</span> {selectedEventType.duration} minutes</div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBooking}
                  disabled={!selectedEventType || !selectedTime || isLoading}
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Scheduling...' : 'Schedule Meeting'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingScheduler;
