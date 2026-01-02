import { useState } from 'react';
import { Bell, Check, X, Briefcase, Home, Package, DollarSign, AlertCircle, MessageCircle, Clock, Filter, ArrowLeft } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { useUser } from '../../contexts/UserContext';
import LogoFinal from '../common/LogoFinal';

interface Notification {
  id: string;
  type: 'job' | 'housing' | 'marketplace' | 'payment' | 'message' | 'system';
  userTypes: ('user' | 'employer' | 'property' | 'resource' | 'donor')[]; // Which user types should see this
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

interface NotificationsCenterProps {
  onBack: () => void;
}

export default function NotificationsCenter({ onBack }: NotificationsCenterProps) {
  const { currentUser } = useUser();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  
  // All notifications for all user types
  const allNotifications: Notification[] = [
    // JUSTICE-IMPACTED USER NOTIFICATIONS
    {
      id: '1',
      type: 'job',
      userTypes: ['user'],
      title: 'Interview Scheduled!',
      message: 'Amazon Fulfillment wants to interview you for Warehouse Associate. Friday at 2pm.',
      timestamp: '5 min ago',
      read: false,
      actionUrl: '/messages',
      actionLabel: 'View Details'
    },
    {
      id: '2',
      type: 'housing',
      userTypes: ['user'],
      title: 'Application Approved ✓',
      message: 'Lincoln Park Apartments approved your FastTrack application! Schedule a showing now.',
      timestamp: '1 hour ago',
      read: false,
      actionUrl: '/applications',
      actionLabel: 'Schedule Showing'
    },
    {
      id: '3',
      type: 'marketplace',
      userTypes: ['user'],
      title: 'Your Claim Was Selected!',
      message: 'Sarah M. chose you to receive the Queen Mattress. Check messages for pickup details.',
      timestamp: '3 hours ago',
      read: false,
      actionUrl: '/messages',
      actionLabel: 'View Message'
    },
    {
      id: '4',
      type: 'payment',
      userTypes: ['user'],
      title: 'Payment Successful',
      message: '$75 FastTrack payment processed. Your application is being reviewed.',
      timestamp: '1 day ago',
      read: true,
      actionUrl: '/applications',
      actionLabel: 'Track Application'
    },
    {
      id: '5',
      type: 'message',
      userTypes: ['user'],
      title: 'New Message',
      message: 'You have a new message from Target Distribution Center',
      timestamp: '1 day ago',
      read: true,
      actionUrl: '/messages',
      actionLabel: 'Read Message'
    },
    {
      id: '6',
      type: 'system',
      userTypes: ['user'],
      title: 'FairPath Score Updated',
      message: 'Your FairPath Score increased to 734 (+12 points). Keep up the great work!',
      timestamp: '2 days ago',
      read: true,
      actionUrl: '/profile',
      actionLabel: 'View Score'
    },
    {
      id: '7',
      type: 'housing',
      userTypes: ['user'],
      title: 'Application Status Update',
      message: 'Your application for 2BR Apartment in Wicker Park is under review.',
      timestamp: '2 days ago',
      read: true,
      actionUrl: '/applications',
      actionLabel: 'Check Status'
    },
    {
      id: '8',
      type: 'job',
      userTypes: ['user'],
      title: 'New Job Match',
      message: '3 new felony-friendly jobs match your profile in Chicago, IL',
      timestamp: '3 days ago',
      read: true,
      actionUrl: '/jobs',
      actionLabel: 'View Jobs'
    },

    // DONOR NOTIFICATIONS
    {
      id: 'd1',
      type: 'marketplace',
      userTypes: ['donor'],
      title: 'New Claim Received!',
      message: 'Marcus J. submitted a claim for your Queen Mattress. Review their story now.',
      timestamp: '10 min ago',
      read: false,
      actionLabel: 'Review Claim'
    },
    {
      id: 'd2',
      type: 'marketplace',
      userTypes: ['donor'],
      title: 'Item Picked Up ✓',
      message: 'Sarah confirmed pickup of the Kitchen Table Set. Tax receipt ready!',
      timestamp: '2 hours ago',
      read: false,
      actionLabel: 'View Receipt'
    },
    {
      id: 'd3',
      type: 'system',
      userTypes: ['donor'],
      title: 'Tax Receipt Available',
      message: 'Your 2024 tax receipts are ready for download. Total donated value: $1,240.',
      timestamp: '1 day ago',
      read: true,
      actionLabel: 'Download Receipts'
    },
    {
      id: 'd4',
      type: 'message',
      userTypes: ['donor'],
      title: 'Thank You Message',
      message: 'Carlos sent you a thank you message for the Winter Coat donation.',
      timestamp: '3 days ago',
      read: true,
      actionLabel: 'Read Message'
    },

    // EMPLOYER NOTIFICATIONS
    {
      id: 'e1',
      type: 'job',
      userTypes: ['employer'],
      title: 'New Application Received',
      message: 'Marcus Johnson applied for Warehouse Associate position.',
      timestamp: '30 min ago',
      read: false,
      actionLabel: 'Review Application'
    },
    {
      id: 'e2',
      type: 'job',
      userTypes: ['employer'],
      title: '5 New Applications',
      message: 'You received 5 new applications for Delivery Driver in the past 24 hours.',
      timestamp: '1 day ago',
      read: false,
      actionLabel: 'View Applications'
    },
    {
      id: 'e3',
      type: 'system',
      userTypes: ['employer'],
      title: 'WOTC Tax Credit Eligible',
      message: '12 of your recent hires qualify for Work Opportunity Tax Credit. Est. value: $28,800.',
      timestamp: '2 days ago',
      read: true,
      actionLabel: 'View Details'
    },

    // PROPERTY OWNER NOTIFICATIONS
    {
      id: 'p1',
      type: 'housing',
      userTypes: ['property'],
      title: 'FastTrack Application',
      message: 'Sarah Williams submitted a FastTrack application for 2BR Unit A. Guaranteed showing required.',
      timestamp: '20 min ago',
      read: false,
      actionLabel: 'Review Application'
    },
    {
      id: 'p2',
      type: 'housing',
      userTypes: ['property'],
      title: '3 New Applications',
      message: 'You received 3 new FastTrack applications today.',
      timestamp: '2 hours ago',
      read: false,
      actionLabel: 'View All'
    },
    {
      id: 'p3',
      type: 'payment',
      userTypes: ['property'],
      title: 'Payment Received',
      message: '$75 FastTrack fee received for application #FAF-2024-7892.',
      timestamp: '1 day ago',
      read: true,
      actionLabel: 'View Transaction'
    },

    // RESOURCE PARTNER NOTIFICATIONS
    {
      id: 'r1',
      type: 'system',
      userTypes: ['resource'],
      title: 'Profile Verified ✓',
      message: 'Your resource center profile has been verified. You\'re now visible to justice-impacted individuals.',
      timestamp: '1 hour ago',
      read: false,
    },
    {
      id: 'r2',
      type: 'message',
      userTypes: ['resource'],
      title: 'New Service Request',
      message: 'James D. is interested in your vocational training program.',
      timestamp: '3 hours ago',
      read: true,
      actionLabel: 'View Request'
    }
  ];

  // Filter notifications by current user type
  const [notifications, setNotifications] = useState<Notification[]>(
    allNotifications.filter(notif => 
      currentUser && notif.userTypes.includes(currentUser.userType)
    )
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'job':
        return <Briefcase className="h-5 w-5" />;
      case 'housing':
        return <Home className="h-5 w-5" />;
      case 'marketplace':
        return <Package className="h-5 w-5" />;
      case 'payment':
        return <DollarSign className="h-5 w-5" />;
      case 'message':
        return <MessageCircle className="h-5 w-5" />;
      case 'system':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'job':
        return 'bg-blue-500/20 text-blue-400';
      case 'housing':
        return 'bg-purple-500/20 text-purple-400';
      case 'marketplace':
        return 'bg-[#A8F32C]/20 text-[#A8F32C]';
      case 'payment':
        return 'bg-green-500/20 text-green-400';
      case 'message':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'system':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-white/20 text-white';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button onClick={onBack} variant="ghost" size="icon" className="text-white/60 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <LogoFinal size="md" />
            </div>
            <Button onClick={onBack} variant="outline" className="border-white/20 text-white hover:bg-white/5">
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#A8F32C]/20 flex items-center justify-center">
                <Bell className="h-6 w-6 text-[#A8F32C]" />
              </div>
              <div>
                <h1 className="text-4xl text-white">NOTIFICATIONS</h1>
                <p className="text-white/60">
                  {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Button
                onClick={markAllAsRead}
                variant="outline"
                className="border-white/20 text-white"
              >
                <Check className="mr-2 h-4 w-4" />
                MARK ALL READ
              </Button>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg border transition-all ${
                filter === 'all'
                  ? 'bg-[#A8F32C] text-black border-[#A8F32C]'
                  : 'bg-black text-white border-white/20 hover:border-white/40'
              }`}
            >
              ALL ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg border transition-all ${
                filter === 'unread'
                  ? 'bg-[#A8F32C] text-black border-[#A8F32C]'
                  : 'bg-black text-white border-white/20 hover:border-white/40'
              }`}
            >
              UNREAD ({unreadCount})
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <Card className="bg-[#121212] border-white/10 p-12 text-center">
              <Bell className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <h3 className="text-xl text-white mb-2">No Notifications</h3>
              <p className="text-white/60">
                {filter === 'unread' 
                  ? "You're all caught up! No unread notifications."
                  : "You don't have any notifications yet."}
              </p>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`bg-[#121212] border p-4 transition-all ${
                  notification.read
                    ? 'border-white/10'
                    : 'border-[#A8F32C]/50 bg-[#A8F32C]/5'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconColor(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-white font-medium">{notification.title}</h3>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-[#A8F32C] flex-shrink-0 mt-2"></div>
                      )}
                    </div>
                    <p className="text-white/80 text-sm mb-3">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/40 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {notification.timestamp}
                      </span>
                      <div className="flex gap-2">
                        {notification.actionUrl && (
                          <Button
                            size="sm"
                            className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 h-8 text-xs"
                          >
                            {notification.actionLabel}
                          </Button>
                        )}
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markAsRead(notification.id)}
                            className="border-white/20 text-white h-8 text-xs"
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-white/60 hover:text-white h-8"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}