import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { X, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { createPortal } from 'react-dom';

type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  showNotification: (message: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = useCallback((message: string, type: NotificationType) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  }, []);

  // Listen for custom API Error events
  useEffect(() => {
    const handleApiError = (event: CustomEvent<{ message: string }>) => {
      showNotification(event.detail.message, 'error');
    };

    window.addEventListener('api-error' as any, handleApiError);
    return () => {
      window.removeEventListener('api-error' as any, handleApiError);
    };
  }, [showNotification]);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {createPortal(
        <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`
                pointer-events-auto
                flex items-center gap-3 px-4 py-3 
                bg-white/80 dark:bg-black/80 backdrop-blur-md
                border border-white/20 dark:border-white/10
                shadow-lg rounded-2xl
                animate-in slide-in-from-top-2 fade-in duration-300
                max-w-sm w-full
              `}
              role="alert"
            >
              <div className="flex-shrink-0">
                {notification.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
                {notification.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
                {notification.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white flex-1 leading-snug">
                {notification.message}
              </p>
              <button
                onClick={() => setNotifications((prev) => prev.filter((n) => n.id !== notification.id))}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>,
        document.body
      )}
    </NotificationContext.Provider>
  );
};
