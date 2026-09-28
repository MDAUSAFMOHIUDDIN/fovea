'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from './data';
import {
  UserProfile,
  SavedAddress,
  HomeTrialRecord,
  OrderRecord,
} from './account-types';

interface CartItem {
  product: Product;
  colorName: string;
  quantity: number;
  lensType: 'Plano Demonstration' | 'Prescription Single-Vision' | 'Prescription Progressive';
}

interface FoveaContextType {
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, colorName?: string, lensType?: CartItem['lensType']) => void;
  removeFromCart: (productId: string, colorName: string) => void;
  updateCartQuantity: (productId: string, colorName: string, quantity: number) => void;
  cartTotal: number;
  cartCount: number;

  // Home Trial (Max 4 frames)
  homeTrialFrames: string[];
  toggleHomeTrialFrame: (productId: string) => boolean;
  isInHomeTrial: (productId: string) => boolean;
  clearHomeTrial: () => void;

  // Modals & Drawers
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isWhatsAppOpen: boolean;
  setIsWhatsAppOpen: (open: boolean) => void;
  isHomeTrialModalOpen: boolean;
  setIsHomeTrialModalOpen: (open: boolean) => void;
  whatsAppInquiryText: string;
  openWhatsAppWithInquiry: (text: string) => void;

  // Customer Account & Authentication
  user: UserProfile | null;
  isAuthLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, name?: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;

  // Customer Saved Addresses
  addresses: SavedAddress[];
  addAddress: (address: Omit<SavedAddress, 'id'>) => void;
  updateAddress: (id: string, updates: Partial<SavedAddress>) => void;
  removeAddress: (id: string) => void;

  // Customer Home Trial History
  homeTrialHistory: HomeTrialRecord[];
  addHomeTrialRequest: (frameIds: string[], slot: string, notes?: string) => string;

  // Customer Orders / Request History
  orderHistory: OrderRecord[];
}

const FoveaContext = createContext<FoveaContextType | undefined>(undefined);

export function Providers({ children }: { children: React.ReactNode }) {
  // 1. Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('fovea_wishlist');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return ['fovea-01', 'fovea-03'];
  });

  // 2. Cart State
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      colorName: PRODUCTS[0].defaultColor,
      quantity: 1,
      lensType: 'Prescription Single-Vision',
    },
  ]);

  // 3. Home Trial Current Selection State
  const [homeTrialFrames, setHomeTrialFrames] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('fovea_home_trial');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return ['fovea-01', 'fovea-02'];
  });

  // 4. Modals State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isHomeTrialModalOpen, setIsHomeTrialModalOpen] = useState(false);
  const [whatsAppInquiryText, setWhatsAppInquiryText] = useState(
    'Hello Fovea Concierge, I would like to inquire about your handcrafted eyewear and book a complimentary Home Trial consultation.'
  );

  // 5. Customer Authentication State
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedUser = localStorage.getItem('fovea_customer_user');
        if (savedUser) return JSON.parse(savedUser);
      } catch {}
    }
    return null;
  });
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // 6. Saved Addresses State
  const [addresses, setAddresses] = useState<SavedAddress[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('fovea_customer_addresses');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return [];
  });

  // 7. Home Trial History State
  const [homeTrialHistory, setHomeTrialHistory] = useState<HomeTrialRecord[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('fovea_customer_trial_history');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return [];
  });

  // 8. Order / Request History State
  const [orderHistory, setOrderHistory] = useState<OrderRecord[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('fovea_customer_orders');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return [];
  });

  // Persistence helpers
  const saveUserToStorage = (userData: UserProfile | null) => {
    setUser(userData);
    try {
      if (userData) {
        localStorage.setItem('fovea_customer_user', JSON.stringify(userData));
      } else {
        localStorage.removeItem('fovea_customer_user');
      }
    } catch {}
  };

  const saveAddressesToStorage = (newAddresses: SavedAddress[]) => {
    setAddresses(newAddresses);
    try {
      localStorage.setItem('fovea_customer_addresses', JSON.stringify(newAddresses));
    } catch {}
  };

  const saveTrialHistoryToStorage = (newHistory: HomeTrialRecord[]) => {
    setHomeTrialHistory(newHistory);
    try {
      localStorage.setItem('fovea_customer_trial_history', JSON.stringify(newHistory));
    } catch {}
  };

  // Auth Functions
  const loginWithGoogle = async (): Promise<void> => {
    setIsAuthLoading(true);
    // Simulate natural clean authentication handshake
    await new Promise((resolve) => setTimeout(resolve, 800));

    const googleUser: UserProfile = {
      id: `usr_${Date.now()}`,
      fullName: 'Mohammed Farooq',
      email: 'mohammed.farooq@gmail.com',
      mobileNumber: '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      joinedDate: 'September 2026',
      memberTier: 'Atelier Patron',
    };

    saveUserToStorage(googleUser);

    // Seed initial address if empty so user has realistic starting data
    if (addresses.length === 0) {
      const initialAddr: SavedAddress[] = [
        {
          id: 'addr-01',
          label: 'Home',
          fullName: 'Mohammed Farooq',
          mobileNumber: '+91 98765 43210',
          fullAddress: 'Flat 402, Royal Palms Apartments, Masab Tank',
          landmark: 'Opposite Chacha Nehru Park',
          city: 'Hyderabad',
          state: 'Telangana',
          pincode: '500028',
          isDefault: true,
        },
      ];
      saveAddressesToStorage(initialAddr);
    }

    // Seed initial trial record if empty
    if (homeTrialHistory.length === 0) {
      const initialTrial: HomeTrialRecord[] = [
        {
          id: 'ht-rec-01',
          referenceNumber: 'FOV-HT-8402',
          date: 'September 26, 2026',
          preferredSlot: 'Morning (10:30 AM — 1:00 PM)',
          frameIds: ['fovea-01', 'fovea-03', 'fovea-04', 'fovea-07'],
          status: 'Scheduled',
          trackingNumber: 'BLUEDART-EXP-91820',
          notes: 'Velvet presentation box dispatched via express courier.',
        },
      ];
      saveTrialHistoryToStorage(initialTrial);
    }

    setIsAuthLoading(false);
  };

  const loginWithEmail = async (email: string, name?: string): Promise<void> => {
    setIsAuthLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const cleanName = name?.trim() || email.split('@')[0].replace(/[._]/g, ' ') || 'Client';
    const emailUser: UserProfile = {
      id: `usr_${Date.now()}`,
      fullName: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
      email: email.trim(),
      mobileNumber: '+91 96188 90557',
      joinedDate: 'September 2026',
      memberTier: 'Client Privilege',
    };

    saveUserToStorage(emailUser);
    setIsAuthLoading(false);
  };

  const logout = () => {
    saveUserToStorage(null);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    saveUserToStorage(updated);
  };

  // Address Functions
  const addAddress = (newAddr: Omit<SavedAddress, 'id'>) => {
    const address: SavedAddress = {
      ...newAddr,
      id: `addr_${Date.now()}`,
    };
    const updated = [address, ...addresses];
    saveAddressesToStorage(updated);
  };

  const updateAddress = (id: string, updates: Partial<SavedAddress>) => {
    const updated = addresses.map((a) => (a.id === id ? { ...a, ...updates } : a));
    saveAddressesToStorage(updated);
  };

  const removeAddress = (id: string) => {
    const updated = addresses.filter((a) => a.id !== id);
    saveAddressesToStorage(updated);
  };

  // Home Trial History
  const addHomeTrialRequest = (frameIds: string[], slot: string, notes?: string): string => {
    const refNum = `FOV-HT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: HomeTrialRecord = {
      id: `ht_${Date.now()}`,
      referenceNumber: refNum,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      preferredSlot: slot,
      frameIds,
      status: 'Requested',
      notes,
    };
    const updated = [newRecord, ...homeTrialHistory];
    saveTrialHistoryToStorage(updated);
    return refNum;
  };

  // Wishlist Functions
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      try {
        localStorage.setItem('fovea_wishlist', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Cart Functions
  const addToCart = (
    product: Product,
    colorName = product.defaultColor,
    lensType: CartItem['lensType'] = 'Plano Demonstration'
  ) => {
    setCart((prev) => {
      const index = prev.findIndex(
        (item) => item.product.id === product.id && item.colorName === colorName && item.lensType === lensType
      );
      if (index > -1) {
        const copy = [...prev];
        copy[index].quantity += 1;
        return copy;
      }
      return [...prev, { product, colorName, quantity: 1, lensType }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, colorName: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.colorName === colorName)));
  };

  const updateCartQuantity = (productId: string, colorName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, colorName);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.colorName === colorName) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Home Trial Functions
  const toggleHomeTrialFrame = (productId: string): boolean => {
    if (homeTrialFrames.includes(productId)) {
      setHomeTrialFrames((prev) => {
        const updated = prev.filter((id) => id !== productId);
        try {
          localStorage.setItem('fovea_home_trial', JSON.stringify(updated));
        } catch {}
        return updated;
      });
      return true;
    } else {
      if (homeTrialFrames.length >= 4) {
        return false;
      }
      setHomeTrialFrames((prev) => {
        const updated = [...prev, productId];
        try {
          localStorage.setItem('fovea_home_trial', JSON.stringify(updated));
        } catch {}
        return updated;
      });
      return true;
    }
  };

  const isInHomeTrial = (productId: string) => homeTrialFrames.includes(productId);

  const clearHomeTrial = () => {
    setHomeTrialFrames([]);
    try {
      localStorage.removeItem('fovea_home_trial');
    } catch {}
  };

  const openWhatsAppWithInquiry = (text: string) => {
    setWhatsAppInquiryText(text);
    setIsWhatsAppOpen(true);
  };

  return (
    <FoveaContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        cartTotal,
        cartCount,
        homeTrialFrames,
        toggleHomeTrialFrame,
        isInHomeTrial,
        clearHomeTrial,
        isSearchOpen,
        setIsSearchOpen,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isWhatsAppOpen,
        setIsWhatsAppOpen,
        isHomeTrialModalOpen,
        setIsHomeTrialModalOpen,
        whatsAppInquiryText,
        openWhatsAppWithInquiry,
        user,
        isAuthLoading,
        loginWithGoogle,
        loginWithEmail,
        logout,
        updateProfile,
        addresses,
        addAddress,
        updateAddress,
        removeAddress,
        homeTrialHistory,
        addHomeTrialRequest,
        orderHistory,
      }}
    >
      {children}
    </FoveaContext.Provider>
  );
}

export function useFovea() {
  const context = useContext(FoveaContext);
  if (!context) {
    throw new Error('useFovea must be used within a Providers tree');
  }
  return context;
}
