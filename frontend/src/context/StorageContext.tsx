import React, { createContext, useContext, useState, useEffect } from 'react';

interface StorageContextType {
  totalStorage: number; // in GB
  usedStorage: number; // in GB
  adsWatched: number;
  isSubscribed: boolean;
  watchAd: () => Promise<number>; // returns gained storage
  subscribe: () => void;
  share: () => void;
}

const StorageContext = createContext<StorageContextType | undefined>(undefined);

export const useStorage = () => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error('useStorage must be used within a StorageProvider');
  }
  return context;
};

const DEFAULT_STORAGE = 1.0; // 1GB
// const MAX_AD_STORAGE = 8.0;
const MAX_TOTAL_STORAGE = 2.0; // Hard limit for now

export const StorageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [totalStorage, setTotalStorage] = useState(DEFAULT_STORAGE);
  const [adsWatched, setAdsWatched] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);
  // Simulation of used storage
  const [usedStorage] = useState(0.0);

  // Load from localStorage on mount
  useEffect(() => {
    const savedStorage = localStorage.getItem('totalStorage');
    const savedAds = localStorage.getItem('adsWatched');
    const savedSub = localStorage.getItem('isSubscribed');

    if (savedStorage) setTotalStorage(parseFloat(savedStorage));
    if (savedAds) setAdsWatched(parseInt(savedAds, 10));
    if (savedSub) setIsSubscribed(savedSub === 'true');
  }, []);

  // Save changes
  useEffect(() => {
    localStorage.setItem('totalStorage', totalStorage.toString());
    localStorage.setItem('adsWatched', adsWatched.toString());
    localStorage.setItem('isSubscribed', String(isSubscribed));
  }, [totalStorage, adsWatched, isSubscribed]);

  const calculateAdStorage = (currentAds: number): number => {
    const nextAd = currentAds + 1;
    if (nextAd <= 4) return 1.0;
    if (nextAd <= 8) return 0.5;
    if (nextAd <= 12) return 0.25;
    return 0.1;
  };

  const watchAd = async (): Promise<number> => {
    return new Promise((resolve) => {
      const gained = calculateAdStorage(adsWatched);
      
      setAdsWatched(prev => prev + 1);
      setTotalStorage(prev => {
        const newTotal = prev + gained;
        return newTotal > MAX_TOTAL_STORAGE ? MAX_TOTAL_STORAGE : newTotal;
      });
      
      resolve(gained);
    });
  };

  const subscribe = () => {
    if (!isSubscribed) {
      setIsSubscribed(true);
      setTotalStorage(prev => {
        const newTotal = prev + 1.0;
        return newTotal > MAX_TOTAL_STORAGE ? MAX_TOTAL_STORAGE : newTotal;
      });
    }
  };

  const share = () => {
    setTotalStorage(prev => {
      const newTotal = prev + 1.0;
      return newTotal > MAX_TOTAL_STORAGE ? MAX_TOTAL_STORAGE : newTotal;
    });
  };

  return (
    <StorageContext.Provider value={{
      totalStorage,
      usedStorage,
      adsWatched,
      isSubscribed,
      watchAd,
      subscribe,
      share
    }}>
      {children}
    </StorageContext.Provider>
  );
};
