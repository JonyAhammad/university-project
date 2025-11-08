import React, { useEffect, useState } from 'react';
import { Bell, CheckCircle, Clock, AlertTriangle, Info, X, Settings, Mail, MessageSquare } from 'lucide-react';
export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    sms: true,
    push: true,
    requestUpdates: true,
    donationUpdates: true,
    systemAlerts: true
  });
  const [showPreferences, setShowPreferences] = useState(false);
  // Mock notifications for demonstration
  useEffect(() => {
    const mockNotifications = [{
      id: 1,
      type: 'success',
      title: 'Donation Delivered',
      message: 'Your donation has been successfully delivered to the Thompson family.',
      time: '10 minutes ago',
      read: false
    }, {
      id: 2,
      type: 'info',
      title: 'New Request Matched',
      message: 'A new food request has been matched with your donation criteria.',
      time: '2 hours ago',
      read: false
    }, {
      id: 3,
      type: 'warning',
      title: 'Delivery Delayed',
      message: 'The delivery to Riverside Elementary School has been delayed by 30 minutes.',
      time: '5 hours ago',
      read: false
    }, {
      id: 4,
      type: 'success',
      title: 'Provider Verified',
      message: 'Helsinki Community Kitchen has been verified and added to your preferred providers.',
      time: '1 day ago',
      read: true
    }, {
      id: 5,
      type: 'info',
      title: 'Subscription Renewed',
      message: 'Your monthly donation subscription has been automatically renewed.',
      time: '3 days ago',
      read: true
    }];
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);
  const markAsRead = id => {
    const updatedNotifications = notifications.map(notification => notification.id === id ? {
      ...notification,
      read: true
    } : notification);
    setNotifications(updatedNotifications);
    setUnreadCount(updatedNotifications.filter(n => !n.read).length);
  };
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
  };
  const deleteNotification = id => {
    const updatedNotifications = notifications.filter(notification => notification.id !== id);
    setNotifications(updatedNotifications);
    setUnreadCount(updatedNotifications.filter(n => !n.read).length);
  };
  const handlePreferenceChange = key => {
    setNotificationPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  const getNotificationIcon = type => {
    switch (type) {
      case 'success':
        return <CheckCircle size={18} className="text-green-500" />;
      case 'warning':
        return <AlertTriangle size={18} className="text-amber-500" />;
      case 'error':
        return <AlertTriangle size={18} className="text-red-500" />;
      case 'info':
      default:
        return <Info size={18} className="text-blue-500" />;
    }
  };
  return <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 text-gray-700 hover:text-teal-600 transition-colors rounded-full hover:bg-gray-100">
        <Bell size={20} />
        {unreadCount > 0 && <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
            {unreadCount}
          </span>}
      </button>
      {isOpen && <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden z-50">
          <div className="p-3 bg-teal-600 text-white flex justify-between items-center">
            <h3 className="font-medium">Notifications</h3>
            <div className="flex items-center space-x-2">
              <button onClick={() => setShowPreferences(!showPreferences)} className="p-1 hover:bg-teal-700 rounded-full">
                <Settings size={16} />
              </button>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-teal-700 rounded-full">
                <X size={16} />
              </button>
            </div>
          </div>
          {showPreferences ? <div className="p-4">
              <h4 className="font-medium text-gray-800 mb-3">
                Notification Preferences
              </h4>
              <div className="mb-4">
                <h5 className="text-sm font-medium text-gray-700 mb-2">
                  Notification Methods
                </h5>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Mail size={16} className="mr-2 text-gray-500" />
                      <span className="text-sm">Email Notifications</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={notificationPreferences.email} onChange={() => handlePreferenceChange('email')} className="sr-only peer" />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageSquare size={16} className="mr-2 text-gray-500" />
                      <span className="text-sm">SMS Notifications</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={notificationPreferences.sms} onChange={() => handlePreferenceChange('sms')} className="sr-only peer" />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bell size={16} className="mr-2 text-gray-500" />
                      <span className="text-sm">Push Notifications</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={notificationPreferences.push} onChange={() => handlePreferenceChange('push')} className="sr-only peer" />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">
                  Notification Types
                </h5>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Request Updates</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={notificationPreferences.requestUpdates} onChange={() => handlePreferenceChange('requestUpdates')} className="sr-only peer" />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Donation Updates</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={notificationPreferences.donationUpdates} onChange={() => handlePreferenceChange('donationUpdates')} className="sr-only peer" />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">System Alerts</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={notificationPreferences.systemAlerts} onChange={() => handlePreferenceChange('systemAlerts')} className="sr-only peer" />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-between">
                <button onClick={() => setShowPreferences(false)} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 transition-colors">
                  Back to Notifications
                </button>
                <button className="px-3 py-1.5 bg-teal-600 text-white rounded-md text-sm hover:bg-teal-700 transition-colors">
                  Save Preferences
                </button>
              </div>
            </div> : <>
              <div className="max-h-[350px] overflow-y-auto">
                {notifications.length > 0 ? notifications.map(notification => <div key={notification.id} className={`p-3 border-b border-gray-100 ${notification.read ? 'bg-white' : 'bg-teal-50'}`}>
                      <div className="flex">
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="ml-3 flex-grow">
                          <div className="flex justify-between items-start">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <button onClick={() => deleteNotification(notification.id)} className="ml-2 text-gray-400 hover:text-gray-600">
                              <X size={14} />
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <div className="mt-1 flex justify-between items-center">
                            <div className="flex items-center text-xs text-gray-500">
                              <Clock size={12} className="mr-1" />
                              {notification.time}
                            </div>
                            {!notification.read && <button onClick={() => markAsRead(notification.id)} className="text-xs text-teal-600 hover:text-teal-800">
                                Mark as read
                              </button>}
                          </div>
                        </div>
                      </div>
                    </div>) : <div className="p-4 text-center text-gray-500">
                    <p>No notifications</p>
                  </div>}
              </div>
              <div className="p-3 bg-gray-50 border-t border-gray-100 flex justify-between">
                <button onClick={markAllAsRead} className="text-sm text-teal-600 hover:text-teal-800" disabled={unreadCount === 0}>
                  Mark all as read
                </button>
                <button className="text-sm text-teal-600 hover:text-teal-800">
                  View all
                </button>
              </div>
            </>}
        </div>}
    </div>;
}