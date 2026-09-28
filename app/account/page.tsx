'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Heart,
  Package,
  Clock,
  MapPin,
  Settings,
  LogOut,
  Sparkles,
  ArrowRight,
  Plus,
  Trash2,
  Edit2,
  Check,
  Glasses,
  MessageSquare,
  Eye,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  ShoppingBag,
} from 'lucide-react';
import { useFovea } from '@/lib/context';
import { PRODUCTS, Product } from '@/lib/data';
import { SavedAddress, HomeTrialRecord } from '@/lib/account-types';

type AccountTab = 'profile' | 'wishlist' | 'home-trials' | 'orders' | 'addresses' | 'settings';

export default function AccountPage() {
  const {
    user,
    logout,
    updateProfile,
    wishlist,
    toggleWishlist,
    addToCart,
    toggleHomeTrialFrame,
    isInHomeTrial,
    addresses,
    addAddress,
    removeAddress,
    homeTrialHistory,
    orderHistory,
    openWhatsAppWithInquiry,
  } = useFovea();

  const [activeTab, setActiveTab] = useState<AccountTab>('wishlist');

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: user?.fullName || '',
    mobileNumber: user?.mobileNumber || '',
    email: user?.email || '',
  });

  // New Address Form State
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    label: 'Home' as SavedAddress['label'],
    fullName: user?.fullName || '',
    mobileNumber: user?.mobileNumber || '',
    fullAddress: '',
    landmark: '',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500028',
    isDefault: false,
  });

  // Saved Wishlist Products
  const savedWishlistProducts: Product[] = PRODUCTS.filter((p) =>
    wishlist.includes(p.id)
  );

  // If user is not logged in, prompt sign-in elegantly
  if (!user) {
    return (
      <div className="py-20 sm:py-32 bg-[#FAF9F6] min-h-screen text-[#0C162C] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-3xl sm:rounded-4xl p-8 sm:p-12 border border-[#0C162C]/10 shadow-xl text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-[#0D5C63]/10 text-[#0D5C63] mx-auto flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#0D5C63] font-bold">
              FOVEA CLIENT PORTAL
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0C162C]">
              Access Your Account
            </h1>
            <p className="text-xs sm:text-sm text-[#0C162C]/70 font-light leading-relaxed">
              Sign in to manage your saved eyewear, review Home Trial presentation boxes, and store your delivery coordinates.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/login"
              className="w-full min-h-[50px] px-6 bg-[#0C162C] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#1A365D] transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Sign In to Fovea</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/products"
              className="w-full min-h-[46px] px-6 bg-[#FAF9F6] border border-[#0C162C]/10 text-[#0C162C] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#F5F3EF] transition-all flex items-center justify-center"
            >
              <span>Explore Collection</span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    setIsEditingProfile(false);
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.fullAddress.trim() || !addressForm.pincode.trim()) return;

    addAddress({
      label: addressForm.label,
      fullName: addressForm.fullName || user.fullName,
      mobileNumber: addressForm.mobileNumber || user.mobileNumber,
      fullAddress: addressForm.fullAddress,
      landmark: addressForm.landmark,
      city: addressForm.city,
      state: addressForm.state,
      pincode: addressForm.pincode,
      isDefault: addressForm.isDefault,
    });

    setIsAddingAddress(false);
    setAddressForm({
      label: 'Home',
      fullName: user.fullName,
      mobileNumber: user.mobileNumber,
      fullAddress: '',
      landmark: '',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500028',
      isDefault: false,
    });
  };

  interface AccountNavItem {
    id: AccountTab;
    label: string;
    icon: React.ElementType;
    count?: number;
  }

  const navItems: AccountNavItem[] = [
    { id: 'wishlist', label: 'Wishlist', icon: Heart, count: savedWishlistProducts.length },
    { id: 'home-trials', label: 'Home Trials', icon: Package, count: homeTrialHistory.length },
    { id: 'orders', label: 'Orders & Requests', icon: Clock, count: orderHistory.length },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin, count: addresses.length },
    { id: 'profile', label: 'Client Profile', icon: User },
    { id: 'settings', label: 'Account Settings', icon: Settings },
  ];

  return (
    <div className="py-10 sm:py-16 bg-[#FAF9F6] min-h-screen text-[#0C162C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* 1. WELCOME BANNER / HEADER */}
        <section className="bg-white rounded-3xl sm:rounded-4xl border border-[#0C162C]/8 p-6 sm:p-10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#0D5C63]/20 bg-[#F5F3EF] shrink-0">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.fullName}
                  fill
                  sizes="80px"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-editorial text-2xl font-semibold text-[#0D5C63]">
                  {user.fullName.charAt(0)}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-[#0D5C63] font-bold bg-[#0D5C63]/10 px-2.5 py-0.5 rounded-full">
                  {user.memberTier}
                </span>
                <span className="text-xs text-[#0C162C]/40">· Member since {user.joinedDate}</span>
              </div>
              <h1 className="font-editorial text-2xl sm:text-4xl font-semibold text-[#0C162C]">
                {user.fullName}
              </h1>
              <p className="text-xs sm:text-sm text-[#0C162C]/60 font-light">
                {user.email} {user.mobileNumber && `· ${user.mobileNumber}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-4 md:pt-0 border-[#0C162C]/8">
            <button
              type="button"
              onClick={() =>
                openWhatsAppWithInquiry(
                  `Hi Fovea Concierge, this is ${user.fullName} from my customer account. I need styling assistance.`
                )
              }
              className="min-h-[44px] px-4 bg-[#0D5C63]/10 hover:bg-[#0D5C63]/15 text-[#0D5C63] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp Concierge</span>
              <span className="sm:hidden">Concierge</span>
            </button>

            <button
              type="button"
              onClick={logout}
              className="min-h-[44px] px-4 bg-[#FAF9F6] hover:bg-[#F5F3EF] text-[#0C162C]/70 hover:text-red-700 text-xs font-semibold uppercase tracking-wider rounded-xl border border-[#0C162C]/10 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </section>

        {/* 2. ACCOUNT NAVIGATION (Mobile Horizontally Scrollable Pills / Desktop Clean Sidebar) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Nav Menu / Mobile Horizontal Scroller */}
          <div className="lg:col-span-3">
            {/* Mobile Scrollable Pill Bar */}
            <div className="lg:hidden flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id as AccountTab)}
                    className={`min-h-[44px] px-4 rounded-xl text-xs font-medium tracking-wide whitespace-nowrap flex items-center gap-2 transition-all shrink-0 active:scale-95 ${
                      isActive
                        ? 'bg-[#0C162C] text-[#FAF9F6] shadow-xs font-semibold'
                        : 'bg-white text-[#0C162C]/70 hover:text-[#0C162C] border border-[#0C162C]/8'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                    {typeof item.count === 'number' && (
                      <span className="text-[10px] opacity-60">({item.count})</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Desktop Vertical Menu */}
            <div className="hidden lg:block bg-white rounded-3xl border border-[#0C162C]/8 p-3 shadow-xs space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id as AccountTab)}
                    className={`w-full min-h-[46px] px-4 py-3 rounded-2xl text-xs font-semibold tracking-wide flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-[#0C162C] text-[#FAF9F6] shadow-xs'
                        : 'text-[#0C162C]/75 hover:bg-[#FAF9F6] hover:text-[#0C162C]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>

                    {typeof item.count === 'number' && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[#F5F3EF] text-[#0C162C]/70'
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Workspace (9 Cols) */}
          <div className="lg:col-span-9 space-y-6">
            {/* TAB 1: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#0C162C]/8">
                  <div>
                    <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0C162C]">
                      Saved Eyewear ({savedWishlistProducts.length})
                    </h2>
                    <p className="text-xs text-[#0C162C]/60 font-light mt-0.5">
                      Your personalized optical curation. Add up to 4 frames to your Home Trial suite.
                    </p>
                  </div>

                  {savedWishlistProducts.length > 0 && (
                    <Link
                      href="/home-trial"
                      className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#0D5C63] font-semibold hover:underline"
                    >
                      <span>Proceed to Home Trial</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>

                {savedWishlistProducts.length === 0 ? (
                  <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-[#0C162C]/8 p-8">
                    <div className="w-14 h-14 rounded-full bg-[#FAF9F6] flex items-center justify-center text-[#0C162C]/30 mx-auto">
                      <Heart className="w-7 h-7" />
                    </div>
                    <h3 className="font-editorial text-2xl font-semibold text-[#0C162C]">
                      Nothing Saved Yet
                    </h3>
                    <p className="text-xs text-[#0C162C]/65 max-w-sm mx-auto font-light leading-relaxed">
                      Tap the heart icon on any Japanese titanium or sculpted Italian bio-acetate
                      silhouette to curate your personal archive.
                    </p>
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-2 px-6 py-3 min-h-[46px] rounded-xl bg-[#0C162C] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#1A365D] transition-colors"
                    >
                      <span>Explore Eyewear</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedWishlistProducts.map((product) => {
                      const inTrial = isInHomeTrial(product.id);

                      return (
                        <div
                          key={product.id}
                          className="group bg-white rounded-3xl border border-[#0C162C]/8 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                        >
                          <div>
                            {/* Frame Studio Image */}
                            <div className="relative aspect-4/3 w-full bg-[#F5F3EF] overflow-hidden p-6 flex items-center justify-center">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 350px"
                                referrerPolicy="no-referrer"
                                className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                              />

                              <button
                                type="button"
                                onClick={() => toggleWishlist(product.id)}
                                title="Remove from wishlist"
                                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-red-600 shadow-xs hover:bg-white transition-all"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>

                              {product.badge && (
                                <div className="absolute bottom-3 left-3 z-10">
                                  <span className="text-[9px] uppercase tracking-widest text-[#0D5C63] font-bold bg-white/95 px-2 py-0.5 rounded-full shadow-2xs">
                                    {product.badge}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Details */}
                            <div className="p-5 space-y-1.5">
                              <div className="flex items-center justify-between text-xs text-[#0C162C]/60">
                                <span>{product.materialType}</span>
                                <span className="font-semibold text-[#0C162C]">${product.price}</span>
                              </div>

                              <h3 className="font-editorial text-xl font-semibold text-[#0C162C] group-hover:text-[#0D5C63] transition-colors truncate">
                                <Link href={`/products/${product.slug}`}>{product.name}</Link>
                              </h3>

                              <p className="text-xs text-[#0C162C]/65 line-clamp-2 font-light">
                                {product.shortDesc}
                              </p>
                            </div>
                          </div>

                          {/* Action Strip */}
                          <div className="p-5 pt-0 border-t border-[#0C162C]/5 flex flex-col gap-2 mt-2">
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => addToCart(product)}
                                className="py-2.5 min-h-[42px] bg-[#0C162C] text-[#FAF9F6] hover:bg-[#1A365D] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors text-center"
                              >
                                Add to Bag
                              </button>

                              <button
                                type="button"
                                onClick={() => toggleHomeTrialFrame(product.id)}
                                className={`py-2.5 min-h-[42px] rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 ${
                                  inTrial
                                    ? 'bg-[#0D5C63] text-white shadow-2xs'
                                    : 'bg-[#F5F3EF] hover:bg-[#ECE8DF] text-[#0C162C]'
                                }`}
                              >
                                {inTrial ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>In Trial</span>
                                  </>
                                ) : (
                                  <>
                                    <Glasses className="w-3.5 h-3.5" />
                                    <span>Try at Home</span>
                                  </>
                                )}
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                openWhatsAppWithInquiry(
                                  `Hi Fovea, I have ${product.name} saved in my wishlist and would like styling advice.`
                                )
                              }
                              className="w-full py-2 text-[11px] text-[#0D5C63] hover:underline flex items-center justify-center gap-1.5"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>Ask Stylist on WhatsApp</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: HOME TRIALS */}
            {activeTab === 'home-trials' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#0C162C]/8">
                  <div>
                    <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0C162C]">
                      Home Trial History ({homeTrialHistory.length})
                    </h2>
                    <p className="text-xs text-[#0C162C]/60 font-light mt-0.5">
                      Review previous and current complimentary 4-frame presentation suites.
                    </p>
                  </div>

                  <Link
                    href="/home-trial"
                    className="min-h-[40px] px-4 bg-[#0C162C] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#1A365D] transition-colors flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Home Trial</span>
                  </Link>
                </div>

                {homeTrialHistory.length === 0 ? (
                  <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-[#0C162C]/8 p-8">
                    <Package className="w-12 h-12 text-[#0C162C]/30 mx-auto" />
                    <h3 className="font-editorial text-2xl font-semibold text-[#0C162C]">
                      No Home Trials Requested Yet
                    </h3>
                    <p className="text-xs text-[#0C162C]/65 max-w-sm mx-auto font-light leading-relaxed">
                      Select 4 optical or sun frames and experience them in the quiet of your home
                      with complimentary round-trip courier shipping.
                    </p>
                    <Link
                      href="/home-trial"
                      className="inline-flex items-center gap-2 px-6 py-3 min-h-[46px] rounded-xl bg-[#0C162C] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#1A365D] transition-colors"
                    >
                      <span>Begin Home Selection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {homeTrialHistory.map((trial) => {
                      const trialFrames = trial.frameIds
                        .map((id) => PRODUCTS.find((p) => p.id === id))
                        .filter((p): p is Product => !!p);

                      return (
                        <div
                          key={trial.id}
                          className="bg-white rounded-3xl border border-[#0C162C]/10 p-6 sm:p-8 space-y-5 shadow-xs"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#0C162C]/8">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-[#0C162C]">
                                  {trial.referenceNumber}
                                </span>
                                <span className="text-xs text-[#0C162C]/40">· {trial.date}</span>
                              </div>
                              <p className="text-xs text-[#0C162C]/60">
                                Preferred Slot: <strong className="text-[#0C162C]">{trial.preferredSlot}</strong>
                              </p>
                            </div>

                            {/* Status Pill */}
                            <span
                              className={`self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                                trial.status === 'Confirmed' || trial.status === 'Scheduled'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : trial.status === 'Completed'
                                  ? 'bg-[#0D5C63]/10 text-[#0D5C63]'
                                  : trial.status === 'Cancelled'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {trial.status}
                            </span>
                          </div>

                          {/* Curated Frames Preview */}
                          <div className="space-y-2">
                            <span className="text-[11px] uppercase tracking-wider text-[#0C162C]/50 block">
                              Selected Frames ({trialFrames.length})
                            </span>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {trialFrames.map((frame) => (
                                <Link
                                  key={frame.id}
                                  href={`/products/${frame.slug}`}
                                  className="group p-2.5 rounded-2xl bg-[#FAF9F6] border border-[#0C162C]/5 flex flex-col items-center text-center space-y-2 hover:bg-[#F5F3EF] transition-colors"
                                >
                                  <div className="relative w-16 h-12">
                                    <Image
                                      src={frame.image}
                                      alt={frame.name}
                                      fill
                                      sizes="64px"
                                      referrerPolicy="no-referrer"
                                      className="object-contain"
                                    />
                                  </div>
                                  <span className="text-xs font-semibold text-[#0C162C] group-hover:text-[#0D5C63] truncate w-full">
                                    {frame.name}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {trial.trackingNumber && (
                            <div className="pt-2 flex items-center justify-between text-xs text-[#0C162C]/70 bg-[#FAF9F6] p-3 rounded-xl border border-[#0C162C]/5">
                              <span>Courier Waybill: <strong className="font-mono text-[#0C162C]">{trial.trackingNumber}</strong></span>
                              <span className="text-[11px] text-[#0D5C63] font-medium">Express Courier Delivery</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: ORDERS / REQUESTS */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-[#0C162C]/8">
                  <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0C162C]">
                    Orders & Custom Surfacing ({orderHistory.length})
                  </h2>
                  <p className="text-xs text-[#0C162C]/60 font-light mt-0.5">
                    Track prescription manufacturing, optical coating application, and courier delivery.
                  </p>
                </div>

                {orderHistory.length === 0 ? (
                  <div className="py-20 text-center space-y-4 bg-white rounded-3xl border border-[#0C162C]/8 p-8">
                    <Clock className="w-12 h-12 text-[#0C162C]/30 mx-auto" />
                    <h3 className="font-editorial text-2xl font-semibold text-[#0C162C]">
                      No Custom Orders on File
                    </h3>
                    <p className="text-xs text-[#0C162C]/65 max-w-sm mx-auto font-light leading-relaxed">
                      When you order prescription eyewear or sun lenses, real-time lab surfacing updates
                      and ZEISS certification tracking will appear here.
                    </p>
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-2 px-6 py-3 min-h-[46px] rounded-xl bg-[#0C162C] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#1A365D] transition-colors"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orderHistory.map((order) => (
                      <div
                        key={order.id}
                        className="bg-white rounded-3xl border border-[#0C162C]/10 p-6 sm:p-8 space-y-4 shadow-xs"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#0C162C]/8">
                          <div>
                            <span className="font-mono text-xs font-bold text-[#0C162C]">
                              {order.referenceNumber}
                            </span>
                            <span className="text-xs text-[#0C162C]/40 block sm:inline sm:ml-2">
                              Placed on {order.date}
                            </span>
                          </div>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#0D5C63]/10 text-[#0D5C63]">
                            {order.status}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-editorial text-xl font-semibold text-[#0C162C]">
                              {order.productName}
                            </h4>
                            <p className="text-xs text-[#0C162C]/70">
                              {order.colorName} · {order.lensType}
                            </p>
                          </div>
                          <span className="font-editorial text-xl font-semibold text-[#0C162C]">
                            ${order.amount}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: SAVED ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#0C162C]/8">
                  <div>
                    <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0C162C]">
                      Saved Addresses ({addresses.length})
                    </h2>
                    <p className="text-xs text-[#0C162C]/60 font-light mt-0.5">
                      Delivery destinations for your Home Trial presentation boxes and orders.
                    </p>
                  </div>

                  {!isAddingAddress && (
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(true)}
                      className="min-h-[40px] px-4 bg-[#0C162C] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#1A365D] transition-colors flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Address</span>
                    </button>
                  )}
                </div>

                {/* Add Address Form */}
                {isAddingAddress && (
                  <form
                    onSubmit={handleCreateAddress}
                    className="bg-white rounded-3xl border border-[#0D5C63]/30 p-6 sm:p-8 space-y-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-[#0C162C]/8">
                      <h3 className="font-editorial text-xl font-semibold text-[#0C162C]">
                        New Delivery Coordinate
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        className="text-xs text-[#0C162C]/50 hover:text-[#0C162C]"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-[#0C162C] block mb-1">
                          Address Label
                        </label>
                        <select
                          value={addressForm.label}
                          onChange={(e) =>
                            setAddressForm({
                              ...addressForm,
                              label: e.target.value as SavedAddress['label'],
                            })
                          }
                          className="w-full px-3 py-2.5 min-h-[44px] bg-[#FAF9F6] border border-[#0C162C]/12 rounded-xl text-xs text-[#0C162C]"
                        >
                          <option value="Home">Home</option>
                          <option value="Work">Work</option>
                          <option value="Atelier Partner">Atelier Partner</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#0C162C] block mb-1">
                          Recipient Name
                        </label>
                        <input
                          type="text"
                          required
                          value={addressForm.fullName}
                          onChange={(e) =>
                            setAddressForm({ ...addressForm, fullName: e.target.value })
                          }
                          className="w-full px-3 py-2.5 min-h-[44px] bg-[#FAF9F6] border border-[#0C162C]/12 rounded-xl text-xs text-[#0C162C]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#0C162C] block mb-1">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={addressForm.mobileNumber}
                          onChange={(e) =>
                            setAddressForm({ ...addressForm, mobileNumber: e.target.value })
                          }
                          className="w-full px-3 py-2.5 min-h-[44px] bg-[#FAF9F6] border border-[#0C162C]/12 rounded-xl text-xs text-[#0C162C]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-[#0C162C] block mb-1">
                        Street Address / Apartment
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Flat 402, Royal Palms, Masab Tank"
                        value={addressForm.fullAddress}
                        onChange={(e) =>
                          setAddressForm({ ...addressForm, fullAddress: e.target.value })
                        }
                        className="w-full px-3 py-2.5 min-h-[44px] bg-[#FAF9F6] border border-[#0C162C]/12 rounded-xl text-xs text-[#0C162C]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-[#0C162C] block mb-1">
                          Landmark
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Near Pillar 45"
                          value={addressForm.landmark}
                          onChange={(e) =>
                            setAddressForm({ ...addressForm, landmark: e.target.value })
                          }
                          className="w-full px-3 py-2.5 min-h-[44px] bg-[#FAF9F6] border border-[#0C162C]/12 rounded-xl text-xs text-[#0C162C]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#0C162C] block mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          value={addressForm.city}
                          onChange={(e) =>
                            setAddressForm({ ...addressForm, city: e.target.value })
                          }
                          className="w-full px-3 py-2.5 min-h-[44px] bg-[#FAF9F6] border border-[#0C162C]/12 rounded-xl text-xs text-[#0C162C]"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-[#0C162C] block mb-1">
                          Pincode
                        </label>
                        <input
                          type="text"
                          required
                          value={addressForm.pincode}
                          onChange={(e) =>
                            setAddressForm({ ...addressForm, pincode: e.target.value })
                          }
                          className="w-full px-3 py-2.5 min-h-[44px] bg-[#FAF9F6] border border-[#0C162C]/12 rounded-xl text-xs text-[#0C162C]"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-2.5">
                      <button
                        type="button"
                        onClick={() => setIsAddingAddress(false)}
                        className="px-4 py-2.5 rounded-xl text-xs text-[#0C162C]/60 hover:text-[#0C162C]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 min-h-[42px] bg-[#0C162C] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#1A365D]"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                )}

                {/* Addresses Grid */}
                {addresses.length === 0 && !isAddingAddress ? (
                  <div className="py-16 text-center space-y-4 bg-white rounded-3xl border border-[#0C162C]/8 p-8">
                    <MapPin className="w-12 h-12 text-[#0C162C]/30 mx-auto" />
                    <h3 className="font-editorial text-2xl font-semibold text-[#0C162C]">
                      No Addresses Saved
                    </h3>
                    <p className="text-xs text-[#0C162C]/65 max-w-sm mx-auto font-light leading-relaxed">
                      Save your residence or office address for expedited Home Trial dispatches and order deliveries.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(true)}
                      className="px-6 py-2.5 rounded-xl bg-[#0C162C] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider hover:bg-[#1A365D]"
                    >
                      Add First Address
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="bg-white rounded-3xl border border-[#0C162C]/10 p-6 space-y-3 shadow-xs relative"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-widest text-[#0D5C63] font-bold bg-[#0D5C63]/10 px-2.5 py-0.5 rounded-full">
                            {addr.label}
                          </span>

                          <button
                            type="button"
                            onClick={() => removeAddress(addr.id)}
                            className="text-xs text-[#0C162C]/40 hover:text-red-700 transition-colors p-1"
                            title="Remove address"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="space-y-1 text-xs text-[#0C162C]/80 leading-relaxed font-light">
                          <p className="font-semibold text-sm text-[#0C162C]">{addr.fullName}</p>
                          <p>{addr.fullAddress}</p>
                          {addr.landmark && <p className="italic text-[#0C162C]/60">Landmark: {addr.landmark}</p>}
                          <p>
                            {addr.city}, {addr.state} – {addr.pincode}
                          </p>
                          <p className="pt-1 font-mono text-[#0C162C]/60">{addr.mobileNumber}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: PROFILE */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl sm:rounded-4xl border border-[#0C162C]/10 p-6 sm:p-10 space-y-6 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#0C162C]/8">
                  <div>
                    <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0C162C]">
                      Client Profile
                    </h2>
                    <p className="text-xs text-[#0C162C]/60 font-light mt-0.5">
                      Your identity and contact parameters inside the Fovea Atelier.
                    </p>
                  </div>

                  {!isEditingProfile && (
                    <button
                      type="button"
                      onClick={() => setIsEditingProfile(true)}
                      className="min-h-[40px] px-4 bg-[#FAF9F6] border border-[#0C162C]/10 text-[#0C162C] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#F5F3EF] transition-colors flex items-center gap-1.5"
                    >
                      <Edit2 className="w-3.5 h-3.5 text-[#0D5C63]" />
                      <span>Edit Details</span>
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                    <div>
                      <label className="text-xs font-semibold text-[#0C162C] block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={profileForm.fullName}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, fullName: e.target.value })
                        }
                        className="w-full px-4 py-2.5 min-h-[44px] bg-[#FAF9F6] border border-[#0C162C]/12 rounded-xl text-xs text-[#0C162C] focus:outline-none focus:ring-1 focus:ring-[#0D5C63]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#0C162C] block mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        value={profileForm.mobileNumber}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, mobileNumber: e.target.value })
                        }
                        className="w-full px-4 py-2.5 min-h-[44px] bg-[#FAF9F6] border border-[#0C162C]/12 rounded-xl text-xs text-[#0C162C] focus:outline-none focus:ring-1 focus:ring-[#0D5C63]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-[#0C162C] block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={profileForm.email}
                        onChange={(e) =>
                          setProfileForm({ ...profileForm, email: e.target.value })
                        }
                        className="w-full px-4 py-2.5 min-h-[44px] bg-[#FAF9F6] border border-[#0C162C]/12 rounded-xl text-xs text-[#0C162C] focus:outline-none focus:ring-1 focus:ring-[#0D5C63]"
                      />
                    </div>

                    <div className="pt-2 flex gap-3">
                      <button
                        type="submit"
                        className="px-6 py-2.5 min-h-[44px] bg-[#0C162C] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#1A365D]"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="px-4 py-2.5 text-xs text-[#0C162C]/60 hover:text-[#0C162C]"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4 max-w-lg text-xs sm:text-sm">
                    <div className="py-2.5 border-b border-[#0C162C]/5 flex justify-between">
                      <span className="text-[#0C162C]/60">Full Name</span>
                      <strong className="text-[#0C162C]">{user.fullName}</strong>
                    </div>

                    <div className="py-2.5 border-b border-[#0C162C]/5 flex justify-between">
                      <span className="text-[#0C162C]/60">Email Address</span>
                      <span className="text-[#0C162C] font-mono">{user.email}</span>
                    </div>

                    <div className="py-2.5 border-b border-[#0C162C]/5 flex justify-between">
                      <span className="text-[#0C162C]/60">Mobile Number</span>
                      <span className="text-[#0C162C] font-mono">{user.mobileNumber || 'Not set'}</span>
                    </div>

                    <div className="py-2.5 border-b border-[#0C162C]/5 flex justify-between">
                      <span className="text-[#0C162C]/60">Member Privilege</span>
                      <span className="text-[#0D5C63] font-semibold">{user.memberTier}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 6: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-3xl sm:rounded-4xl border border-[#0C162C]/10 p-6 sm:p-10 space-y-6 shadow-xs">
                <div className="pb-4 border-b border-[#0C162C]/8">
                  <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0C162C]">
                    Account & Privacy Settings
                  </h2>
                  <p className="text-xs text-[#0C162C]/60 font-light mt-0.5">
                    Manage session authentication and optical record retention.
                  </p>
                </div>

                <div className="space-y-5 text-xs sm:text-sm text-[#0C162C]/80">
                  <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#0C162C]/5 flex items-center justify-between">
                    <div>
                      <strong className="block text-[#0C162C]">Optical Records Retention</strong>
                      <p className="text-xs text-[#0C162C]/60 font-light">
                        Prescription and pupillary distance measurements are encrypted under medical standards.
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                      Active
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#0C162C]/5 flex items-center justify-between">
                    <div>
                      <strong className="block text-[#0C162C]">Atelier Monograph Notifications</strong>
                      <p className="text-xs text-[#0C162C]/60 font-light">
                        Receive quarterly optical essays and limited Sabae release invitations.
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-[#0D5C63] bg-[#0D5C63]/10 px-2.5 py-1 rounded-full">
                      Subscribed
                    </span>
                  </div>

                  <div className="pt-4 border-t border-[#0C162C]/8 flex items-center justify-between">
                    <span className="text-xs text-[#0C162C]/50">End current session</span>
                    <button
                      type="button"
                      onClick={logout}
                      className="px-6 py-2.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Sign Out of Fovea
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
