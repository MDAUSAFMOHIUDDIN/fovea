'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  browserLocalPersistence,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  User as FirebaseUser,
} from 'firebase/auth';
import { Product, PRODUCTS } from './data';
import { firebaseAuth } from './firebase';
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
  const pathname = usePathname();
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
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

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

  const profileFromFirebaseUser = (firebaseUser: FirebaseUser): UserProfile => {
    let savedProfile: UserProfile | null = null;
    try {
      const saved = localStorage.getItem('fovea_customer_user');
      if (saved) {
        const parsed = JSON.parse(saved) as UserProfile;
        if (parsed.id === firebaseUser.uid) savedProfile = parsed;
      }
    } catch {}

    return {
      id: firebaseUser.uid,
      fullName: firebaseUser.displayName || savedProfile?.fullName || 'Fovea Client',
      email: firebaseUser.email || savedProfile?.email || '',
      mobileNumber: savedProfile?.mobileNumber || firebaseUser.phoneNumber || '',
      avatar: firebaseUser.photoURL || savedProfile?.avatar,
      joinedDate:
        savedProfile?.joinedDate ||
        new Date(firebaseUser.metadata.creationTime || Date.now()).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        }),
      memberTier: savedProfile?.memberTier || 'Atelier Patron',
    };
  };

  useEffect(() => {
    let active = true;

    setPersistence(firebaseAuth, browserLocalPersistence).catch(() => {
      // Firebase still uses its standard browser persistence if this is unavailable.
    });

    const unsubscribe = onAuthStateChanged(firebaseAuth, (firebaseUser) => {
      if (!active) return;
      saveUserToStorage(firebaseUser ? profileFromFirebaseUser(firebaseUser) : null);
      setIsAuthLoading(false);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user || pathname === '/login') return;

    try {
      if (sessionStorage.getItem('fovea_resume_checkout') === 'true') {
        sessionStorage.removeItem('fovea_resume_checkout');
        const openCartTimer = window.setTimeout(() => setIsCartOpen(true), 0);
        return () => window.clearTimeout(openCartTimer);
      }
    } catch {}
  }, [pathname, user]);

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
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      await setPersistence(firebaseAuth, browserLocalPersistence);
      await signInWithPopup(firebaseAuth, provider);
    } catch (error) {
      const errorCode = (error as { code?: string }).code;
      const shouldUseRedirect =
        errorCode === 'auth/popup-blocked' ||
        errorCode === 'auth/operation-not-supported-in-this-environment';

      if (shouldUseRedirect) {
        await signInWithRedirect(firebaseAuth, provider);
        return;
      }

      setIsAuthLoading(false);
      throw error;
    }
  };

  const logout = () => {
    setIsAuthLoading(true);
    void signOut(firebaseAuth).catch(() => setIsAuthLoading(false));
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
