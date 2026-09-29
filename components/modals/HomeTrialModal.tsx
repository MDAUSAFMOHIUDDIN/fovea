'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Plus,
  Trash2,
  MapPin,
  Calendar,
  Clock,
  Navigation,
  Copy,
  CheckCheck,
  MessageSquare,
  Eye,
  User,
  Phone,
  Mail,
  Home,
} from 'lucide-react';
import { useFovea } from '@/lib/context';
import { PRODUCTS } from '@/lib/data';

type BookingStep = 'frames' | 'details' | 'address' | 'schedule' | 'summary' | 'confirmed';

export default function HomeTrialModal() {
  const {
    isHomeTrialModalOpen,
    setIsHomeTrialModalOpen,
    homeTrialFrames,
    toggleHomeTrialFrame,
    clearHomeTrial,
    openWhatsAppWithInquiry,
    addHomeTrialRequest,
    user,
    addresses,
  } = useFovea();

  const [step, setStep] = useState<BookingStep>('frames');

  // Step 2 Details Form
  const [details, setDetails] = useState({
    fullName: '',
    mobileNumber: '',
    alternateNumber: '',
    email: '',
    wantsEyeTest: true,
  });

  // Step 3 Address Form
  const [address, setAddress] = useState({
    building: '',
    street: '',
    landmark: '',
    city: 'Hyderabad',
    pincode: '500028',
  });
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);
  const [currentLocationUrl, setCurrentLocationUrl] = useState('');
  const [showMapPicker, setShowMapPicker] = useState(false);

  // Auto-fill logged in user and default address
  useEffect(() => {
    const hydrationTimer = window.setTimeout(() => {
      if (user) {
        setDetails((prev) => ({
          ...prev,
          fullName: prev.fullName || user.fullName,
          mobileNumber: prev.mobileNumber || user.mobileNumber,
          email: prev.email || user.email,
        }));
      }
      if (addresses && addresses.length > 0) {
        const def = addresses.find((a) => a.isDefault) || addresses[0];
        if (def) {
          setAddress((prev) => ({
            ...prev,
            building: prev.building || def.fullAddress,
            landmark: prev.landmark || def.landmark || '',
            city: prev.city || def.city,
            pincode: prev.pincode || def.pincode,
          }));
        }
      }
    }, 0);

    return () => window.clearTimeout(hydrationTimer);
  }, [user, addresses, isHomeTrialModalOpen]);

  // Step 4 Schedule Form
  const [selectedDateIdx, setSelectedDateIdx] = useState(1); // Default Tomorrow
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('1 PM - 4 PM');

  // Confirmed state
  const [bookingRef, setBookingRef] = useState('');
  const [copiedRef, setCopiedRef] = useState(false);

  const selectedProducts = PRODUCTS.filter((p) => homeTrialFrames.includes(p.id));
  const remainingSlots = 4 - selectedProducts.length;

  // Next 5 days for scheduling
  const dates = [
    { label: 'Today (Express)', day: 'Today', date: 'Same-Day Evening', available: true },
    { label: 'Tomorrow', day: 'Tomorrow', date: 'Recommended', available: true },
    { label: 'Wednesday', day: 'Wed', date: 'Oct 01', available: true },
    { label: 'Thursday', day: 'Thu', date: 'Oct 02', available: true },
    { label: 'Friday', day: 'Fri', date: 'Oct 03', available: true },
  ];

  const timeSlots = [
    { id: '10 AM - 1 PM', label: '10 AM - 1 PM', desc: 'Morning Atelier Delivery' },
    { id: '1 PM - 4 PM', label: '1 PM - 4 PM', desc: 'Midday Delivery (Popular)' },
    { id: '4 PM - 7 PM', label: '4 PM - 7 PM', desc: 'Afternoon Delivery' },
    { id: '7 PM - 9 PM', label: '7 PM - 9 PM', desc: 'Evening Twilight Session' },
  ];

  const handleUseCurrentLocation = () => {
    setIsDetectingLocation(true);
    if (typeof window !== 'undefined' && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setIsDetectingLocation(false);
          setLocationDetected(true);
          setCurrentLocationUrl(
            `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`
          );
        },
        () => {
          setIsDetectingLocation(false);
          setLocationDetected(false);
          setCurrentLocationUrl('');
        },
        { timeout: 3000 }
      );
    } else {
      setIsDetectingLocation(false);
      setLocationDetected(false);
      setCurrentLocationUrl('');
    }
  };

  const handleConfirmBooking = () => {
    const slotStr = `${dates[selectedDateIdx]?.label || 'Next Available Slot'} (${selectedTimeSlot})`;
    const notesStr = `Delivering to ${details.fullName || 'Valued Client'}, ${address.building || ''} ${address.street || ''}, ${address.city || 'Hyderabad'}`;
    const generatedRef = addHomeTrialRequest
      ? addHomeTrialRequest(selectedProducts.map((p) => p.id), slotStr, notesStr)
      : `FOV-HT-${crypto.randomUUID().slice(0, 5).toUpperCase()}`;
    setBookingRef(generatedRef);
    setStep('confirmed');
  };

  const handleClose = () => {
    setIsHomeTrialModalOpen(false);
    setTimeout(() => {
      if (step === 'confirmed') {
        setStep('frames');
      }
    }, 400);
  };

  const handleCopyRef = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(bookingRef);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const handleWhatsAppBookingConfirm = () => {
    const frameLines = selectedProducts.map(
      (product, index) =>
        `${index + 1}. ${product.name} (${product.productCode || product.id})\n` +
        `   Description: ${product.shortDesc}\n` +
        `   Material: ${product.material}\n` +
        `   Shape: ${product.frameShape}\n` +
        `   Dimensions: ${product.dimensions}\n` +
        `   Default colour: ${product.defaultColor}`
    );

    const text = [
      '*FOVEA — HOME TRIAL CONFIRMATION*',
      `Booking reference: ${bookingRef}`,
      '',
      '*CUSTOMER DETAILS*',
      `Name: ${details.fullName || 'Not provided'}`,
      `Phone: ${details.mobileNumber || 'Not provided'}`,
      `Alternate phone: ${details.alternateNumber || 'Not provided'}`,
      `Email: ${details.email || 'Not provided'}`,
      `Optometrist assistance: ${details.wantsEyeTest ? 'Yes' : 'No'}`,
      '',
      '*DELIVERY ADDRESS*',
      `Building: ${address.building || 'Not provided'}`,
      `Street: ${address.street || 'Not provided'}`,
      `Landmark: ${address.landmark || 'Not provided'}`,
      `City: ${address.city || 'Not provided'}`,
      `PIN code: ${address.pincode || 'Not provided'}`,
      `Google Maps location: ${currentLocationUrl || 'Not shared'}`,
      '',
      '*SCHEDULE*',
      `${dates[selectedDateIdx]?.label || 'Next available slot'} (${selectedTimeSlot})`,
      '',
      '*SELECTED HOME TRIAL FRAMES*',
      ...frameLines,
      '',
      'Please confirm the Home Trial dispatch and delivery details.',
    ].join('\n');
    openWhatsAppWithInquiry(text);
  };

  return (
    <AnimatePresence>
      {isHomeTrialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#0C162C]/60 backdrop-blur-xs transition-opacity"
          />

          {/* Modal / Mobile Sheet Container */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full h-full sm:h-auto sm:max-h-[90vh] max-w-2xl bg-[#FAF9F6] sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 sm:border border-[#0C162C]/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 border-b border-[#0C162C]/10 bg-white shrink-0">
              <div className="flex items-center gap-3">
                {step !== 'frames' && step !== 'confirmed' && (
                  <button
                    type="button"
                    onClick={() => {
                      if (step === 'details') setStep('frames');
                      else if (step === 'address') setStep('details');
                      else if (step === 'schedule') setStep('address');
                      else if (step === 'summary') setStep('schedule');
                    }}
                    className="p-1.5 -ml-1 text-[#0C162C]/60 hover:text-[#0C162C] hover:bg-[#0C162C]/5 rounded-full transition-colors"
                    aria-label="Previous step"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <div>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#0D5C63] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Complimentary Atelier Service</span>
                  </span>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-[#0C162C] leading-tight">
                    {step === 'frames' && 'Your Home Trial Suite'}
                    {step === 'details' && 'Step 2: Client Details'}
                    {step === 'address' && 'Step 3: Delivery Address'}
                    {step === 'schedule' && 'Step 4: Preferred Schedule'}
                    {step === 'summary' && 'Step 5: Review & Confirm'}
                    {step === 'confirmed' && 'Trial Suite Reserved'}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-10 h-10 flex items-center justify-center text-[#0C162C]/60 hover:text-[#0C162C] rounded-full hover:bg-[#0C162C]/5 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stepper Progress Bar (Steps 1 to 5) */}
            {step !== 'confirmed' && (
              <div className="bg-[#F5F3EF] px-5 sm:px-8 py-2.5 border-b border-[#0C162C]/8 flex items-center justify-between text-xs shrink-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {[
                    { key: 'frames', num: '1', title: 'Frames' },
                    { key: 'details', num: '2', title: 'Details' },
                    { key: 'address', num: '3', title: 'Address' },
                    { key: 'schedule', num: '4', title: 'Schedule' },
                    { key: 'summary', num: '5', title: 'Summary' },
                  ].map((s, idx) => {
                    const stepsOrder = ['frames', 'details', 'address', 'schedule', 'summary'];
                    const currentIdx = stepsOrder.indexOf(step);
                    const isDone = currentIdx > idx;
                    const isCurrent = step === s.key;

                    return (
                      <div key={s.key} className="flex items-center gap-1.5">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold transition-colors ${
                            isCurrent
                              ? 'bg-[#0C162C] text-[#FAF9F6]'
                              : isDone
                              ? 'bg-[#0D5C63] text-white'
                              : 'bg-[#0C162C]/10 text-[#0C162C]/50'
                          }`}
                        >
                          {isDone ? <Check className="w-3 h-3" /> : s.num}
                        </div>
                        <span
                          className={`hidden md:inline font-medium text-[11px] ${
                            isCurrent ? 'text-[#0C162C] font-semibold' : 'text-[#0C162C]/50'
                          }`}
                        >
                          {s.title}
                        </span>
                        {idx < 4 && <span className="text-[#0C162C]/20 hidden sm:inline">→</span>}
                      </div>
                    );
                  })}
                </div>

                <span className="text-[11px] font-semibold text-[#0D5C63] bg-emerald-50 px-2 py-0.5 rounded-full">
                  100% Free · $0 Deposit
                </span>
              </div>
            )}

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
              {/* ============================================================== */}
              {/* STEP 1: YOUR FRAMES */}
              {/* ============================================================== */}
              {step === 'frames' && (
                <div className="space-y-6">
                  {/* Status Banner */}
                  <div className="p-4 bg-[#F5F3EF] rounded-2xl border border-[#0C162C]/8 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-[#0C162C] block">
                        {selectedProducts.length} of 4 Frames Selected
                      </span>
                      <span className="text-[11px] text-[#0C162C]/65">
                        {remainingSlots > 0
                          ? `Add ${remainingSlots} more frame${remainingSlots > 1 ? 's' : ''} to complete your curated velvet presentation box`
                          : 'Your 4-frame curation is complete and ready for dispatch'}
                      </span>
                    </div>
                    {selectedProducts.length > 0 && (
                      <button
                        type="button"
                        onClick={clearHomeTrial}
                        className="text-xs text-[#0C162C]/50 hover:text-red-700 transition-colors flex items-center gap-1 font-medium"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear All</span>
                      </button>
                    )}
                  </div>

                  {/* 4 Selected Frame Slots Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[0, 1, 2, 3].map((slotIdx) => {
                      const product = selectedProducts[slotIdx];
                      if (product) {
                        return (
                          <div
                            key={product.id}
                            className="relative p-3 bg-white rounded-2xl border border-[#0D5C63]/30 shadow-xs flex flex-col justify-between group"
                          >
                            <button
                              type="button"
                              onClick={() => toggleHomeTrialFrame(product.id)}
                              className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-[#FAF9F6] text-[#0C162C]/60 hover:text-red-700 hover:bg-red-50 flex items-center justify-center transition-colors shadow-xs"
                              aria-label="Remove frame"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>

                            <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden my-1 bg-[#F5F3EF]">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="160px"
                                referrerPolicy="no-referrer"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>

                            <div className="pt-2">
                              <span className="text-[10px] font-mono font-semibold text-[#0D5C63] uppercase tracking-wider block">
                                {product.productCode || `FOV-SB-${product.id.slice(-2)}`}
                              </span>
                              <h4 className="text-xs font-semibold text-[#0C162C] truncate">
                                {product.name}
                              </h4>
                              <div className="flex items-center justify-between text-[11px] text-[#0C162C]/60 mt-0.5">
                                <span>{product.frameShape}</span>
                                <span className="font-semibold text-emerald-700 font-mono">Free Trial</span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div
                          key={`empty-${slotIdx}`}
                          className="p-4 border-2 border-dashed border-[#0C162C]/15 rounded-2xl flex flex-col items-center justify-center text-center aspect-4/3 sm:aspect-auto sm:h-44 bg-[#FAF9F6]/50"
                        >
                          <div className="w-8 h-8 rounded-full bg-[#0C162C]/5 flex items-center justify-center mb-1 text-[#0C162C]/40">
                            <Plus className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-medium text-[#0C162C]/60">
                            Slot {slotIdx + 1} Empty
                          </span>
                          <span className="text-[10px] text-[#0C162C]/40">
                            Select below
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Recommendations Strip: Add in 1-Click */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#0C162C]/70">
                        Eligible Atelier Frames to Add
                      </span>
                      <Link
                        href="/products"
                        onClick={handleClose}
                        className="text-xs text-[#0D5C63] font-semibold hover:underline"
                      >
                        Explore all frames →
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {PRODUCTS.filter((p) => p.homeTrialEligible).map((product) => {
                        const isSelected = homeTrialFrames.includes(product.id);
                        return (
                          <div
                            key={product.id}
                            className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                              isSelected
                                ? 'bg-[#0D5C63]/5 border-[#0D5C63]/40'
                                : 'bg-white border-[#0C162C]/8 hover:border-[#0C162C]/20 shadow-xs'
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="relative w-16 h-12 bg-[#F5F3EF] rounded-xl overflow-hidden shrink-0 border border-[#0C162C]/5">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  sizes="80px"
                                  referrerPolicy="no-referrer"
                                  className="object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <h4 className="text-xs font-semibold text-[#0C162C] truncate">
                                  {product.name}
                                </h4>
                                <p className="text-[11px] text-[#0C162C]/60 truncate">
                                  {product.frameShape} · {product.material}
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleHomeTrialFrame(product.id)}
                              className={`min-h-[36px] px-3.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors shrink-0 ${
                                isSelected
                                  ? 'bg-[#0D5C63] text-white hover:bg-[#094348]'
                                  : remainingSlots === 0
                                  ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                                  : 'bg-[#0C162C] text-white hover:bg-[#1A365D]'
                              }`}
                              disabled={!isSelected && remainingSlots === 0}
                            >
                              {isSelected ? 'Selected' : '+ Add'}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* STEP 2: CLIENT DETAILS */}
              {/* ============================================================== */}
              {step === 'details' && (
                <div className="space-y-6">
                  <div className="p-4 bg-[#F5F3EF] rounded-2xl border border-[#0C162C]/8 text-xs text-[#0C162C]/80 leading-relaxed">
                    Please provide your contact information. We use this to coordinate your insured courier delivery, send SMS tracking updates, and WhatsApp arrival notifications.
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#0C162C] flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#0D5C63]" />
                        <span>Full Name *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eleanor Vance"
                        value={details.fullName}
                        onChange={(e) => setDetails({ ...details, fullName: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#0C162C]/15 rounded-xl text-xs text-[#0C162C] focus:outline-hidden focus:border-[#0C162C] shadow-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#0C162C] flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#0D5C63]" />
                          <span>Mobile Number (for SMS & WhatsApp) *</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+1 (555) 019-2834"
                          value={details.mobileNumber}
                          onChange={(e) => setDetails({ ...details, mobileNumber: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-[#0C162C]/15 rounded-xl text-xs text-[#0C162C] focus:outline-hidden focus:border-[#0C162C] shadow-xs"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#0C162C]">
                          Alternate Phone Number (Optional)
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g. +1 (555) 982-1049"
                          value={details.alternateNumber}
                          onChange={(e) => setDetails({ ...details, alternateNumber: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-[#0C162C]/15 rounded-xl text-xs text-[#0C162C] focus:outline-hidden focus:border-[#0C162C] shadow-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#0C162C] flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-[#0D5C63]" />
                        <span>Email Address (for courier tracking link) *</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="eleanor@atelier.com"
                        value={details.email}
                        onChange={(e) => setDetails({ ...details, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#0C162C]/15 rounded-xl text-xs text-[#0C162C] focus:outline-hidden focus:border-[#0C162C] shadow-xs"
                      />
                    </div>

                    {/* Optometrist Consultation Toggle */}
                    <div className="p-4 bg-white rounded-2xl border border-[#0D5C63]/20 shadow-xs flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="eyeTestCheckbox"
                        checked={details.wantsEyeTest}
                        onChange={(e) => setDetails({ ...details, wantsEyeTest: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded-sm border-gray-300 text-[#0D5C63] focus:ring-[#0D5C63]"
                      />
                      <label htmlFor="eyeTestCheckbox" className="text-xs cursor-pointer select-none">
                        <span className="font-semibold text-[#0C162C] block">
                          Include Certified Optometrist Assistance (Free)
                        </span>
                        <span className="text-[#0C162C]/65 text-[11px] leading-relaxed block mt-0.5">
                          Our specialist will arrive with a portable digital pupillometer and vision kit to verify your exact bridge fit, temple tension, and optical prescription at no charge.
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* STEP 3: TRIAL ADDRESS */}
              {/* ============================================================== */}
              {step === 'address' && (
                <div className="space-y-6">
                  {/* Location Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-2.5">
                    <button
                      type="button"
                      onClick={handleUseCurrentLocation}
                      disabled={isDetectingLocation}
                      className="w-full sm:w-auto flex-1 min-h-[44px] px-4 bg-white hover:bg-[#F5F3EF] border border-[#0C162C]/15 rounded-xl text-xs font-semibold text-[#0C162C] flex items-center justify-center gap-2 shadow-xs transition-colors"
                    >
                      <Navigation className={`w-4 h-4 text-[#0D5C63] ${isDetectingLocation ? 'animate-spin' : ''}`} />
                      <span>{isDetectingLocation ? 'Detecting GPS...' : locationDetected ? '✓ Current GPS Location Shared' : 'Use Current Location'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowMapPicker(!showMapPicker)}
                      className="w-full sm:w-auto px-4 min-h-[44px] bg-white hover:bg-[#F5F3EF] border border-[#0C162C]/15 rounded-xl text-xs font-semibold text-[#0C162C] flex items-center justify-center gap-2 shadow-xs transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-[#0D5C63]" />
                      <span>{showMapPicker ? 'Close Map' : 'Choose on Map'}</span>
                    </button>
                  </div>

                  {/* Interactive Visual Map Preview */}
                  {showMapPicker && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-slate-900 rounded-2xl text-white space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#C5A880]" />
                          <span>Pinpoint Delivery Location</span>
                        </span>
                        <span className="text-[11px] text-white/60">Drag map or click pin</span>
                      </div>
                      <div className="relative h-36 w-full rounded-xl overflow-hidden bg-slate-800 flex items-center justify-center border border-white/10">
                        {/* Map Grid Simulation */}
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FAF9F6_1px,transparent_1px)] [background-size:16px_16px]" />
                        <div className="text-center space-y-1 relative z-10">
                          <div className="w-10 h-10 rounded-full bg-[#0D5C63] text-white flex items-center justify-center mx-auto shadow-lg animate-bounce">
                            <MapPin className="w-5 h-5 text-[#C5A880]" />
                          </div>
                          <p className="text-xs font-semibold">Chelsea Historic District, Manhattan</p>
                          <p className="text-[10px] text-white/70">40.7465° N, 74.0014° W</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setAddress({
                            building: 'Residence 402, Royal Palms',
                            street: 'Masab Tank',
                            landmark: 'Near Chacha Nehru Park',
                            city: 'Hyderabad',
                            pincode: '500028',
                          });
                          setShowMapPicker(false);
                        }}
                        className="w-full py-2 bg-[#0D5C63] hover:bg-[#094348] text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        Confirm Pin Location
                      </button>
                    </motion.div>
                  )}

                  {/* Form Inputs */}
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#0C162C] flex items-center gap-1.5">
                        <Home className="w-3.5 h-3.5 text-[#0D5C63]" />
                        <span>House / Flat / Building / Suite *</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apt 4B, The Highline Lofts"
                        value={address.building}
                        onChange={(e) => setAddress({ ...address, building: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#0C162C]/15 rounded-xl text-xs text-[#0C162C] focus:outline-hidden focus:border-[#0C162C] shadow-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#0C162C]">
                        Street / Locality / Area *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 450 West 24th Street"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-[#0C162C]/15 rounded-xl text-xs text-[#0C162C] focus:outline-hidden focus:border-[#0C162C] shadow-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1.5 sm:col-span-1">
                        <label className="text-xs font-semibold text-[#0C162C]">Landmark (Optional)</label>
                        <input
                          type="text"
                          placeholder="Near High Line"
                          value={address.landmark}
                          onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-[#0C162C]/15 rounded-xl text-xs text-[#0C162C] focus:outline-hidden focus:border-[#0C162C] shadow-xs"
                        />
                      </div>

                      <div className="space-y-1.5 sm:col-span-1">
                        <label className="text-xs font-semibold text-[#0C162C]">City *</label>
                        <input
                          type="text"
                          required
                          placeholder="Hyderabad"
                          value={address.city}
                          onChange={(e) => setAddress({ ...address, city: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-[#0C162C]/15 rounded-xl text-xs text-[#0C162C] focus:outline-hidden focus:border-[#0C162C] shadow-xs"
                        />
                      </div>

                      <div className="space-y-1.5 sm:col-span-1">
                        <label className="text-xs font-semibold text-[#0C162C]">Pincode / Postal *</label>
                        <input
                          type="text"
                          required
                          placeholder="500028"
                          value={address.pincode}
                          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                          className="w-full px-4 py-3 bg-white border border-[#0C162C]/15 rounded-xl text-xs text-[#0C162C] focus:outline-hidden focus:border-[#0C162C] shadow-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* STEP 4: PREFERRED SCHEDULE */}
              {/* ============================================================== */}
              {step === 'schedule' && (
                <div className="space-y-6">
                  {/* Select Preferred Date */}
                  <div className="space-y-3">
                    <label className="text-xs font-semibold text-[#0C162C] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#0D5C63]" />
                      <span>Select Preferred Delivery Date</span>
                    </label>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                      {dates.map((d, idx) => (
                        <button
                          key={d.label}
                          type="button"
                          onClick={() => setSelectedDateIdx(idx)}
                          className={`p-3 rounded-2xl border text-center transition-all flex flex-col justify-between ${
                            selectedDateIdx === idx
                              ? 'bg-[#0C162C] text-[#FAF9F6] border-[#0C162C] shadow-md ring-2 ring-[#0C162C]/20'
                              : 'bg-white text-[#0C162C] border-[#0C162C]/15 hover:border-[#0C162C]/30'
                          }`}
                        >
                          <span className={`text-[10px] font-semibold uppercase tracking-wider block ${
                            selectedDateIdx === idx ? 'text-[#C5A880]' : 'text-[#0D5C63]'
                          }`}>
                            {d.day}
                          </span>
                          <span className="text-xs font-bold my-1 block truncate">
                            {d.label}
                          </span>
                          <span className={`text-[9px] block ${
                            selectedDateIdx === idx ? 'text-white/70' : 'text-[#0C162C]/50'
                          }`}>
                            {d.date}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Preferred Time Slot */}
                  <div className="space-y-3 pt-2">
                    <label className="text-xs font-semibold text-[#0C162C] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#0D5C63]" />
                      <span>Select 3-Hour Delivery Window</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {timeSlots.map((ts) => (
                        <button
                          key={ts.id}
                          type="button"
                          onClick={() => setSelectedTimeSlot(ts.id)}
                          className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                            selectedTimeSlot === ts.id
                              ? 'bg-[#0C162C] text-[#FAF9F6] border-[#0C162C] shadow-md ring-1 ring-[#0C162C]'
                              : 'bg-white text-[#0C162C] border-[#0C162C]/15 hover:border-[#0C162C]/30 shadow-xs'
                          }`}
                        >
                          <div>
                            <span className="font-semibold text-xs block">
                              {ts.label}
                            </span>
                            <span className={`text-[11px] block mt-0.5 ${
                              selectedTimeSlot === ts.id ? 'text-white/75' : 'text-[#0C162C]/60'
                            }`}>
                              {ts.desc}
                            </span>
                          </div>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            selectedTimeSlot === ts.id
                              ? 'border-[#C5A880] bg-[#C5A880]'
                              : 'border-[#0C162C]/20'
                          }`}>
                            {selectedTimeSlot === ts.id && (
                              <Check className="w-3 h-3 text-[#0C162C]" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Optometrist Protocol Note */}
                  <div className="p-4 bg-[#F5F3EF] rounded-2xl border border-[#0C162C]/8 space-y-1 text-xs text-[#0C162C]/75">
                    <p className="font-semibold text-[#0C162C]">White-Glove Delivery Guarantee</p>
                    <p className="leading-relaxed">
                      Your 4 frames will be delivered inside a padded velvet presentation case with a microfiber cloth, measuring ruler, and return courier pouch. You have 5 full days to enjoy them in your daily lighting.
                    </p>
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* STEP 5: CONFIRMATION & SUMMARY */}
              {/* ============================================================== */}
              {step === 'summary' && (
                <div className="space-y-6">
                  {/* Summary Card */}
                  <div className="p-5 bg-white rounded-3xl border border-[#0C162C]/10 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-[#0C162C]/8 pb-3">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#0D5C63] font-semibold">
                          Selected Curated Frames ({selectedProducts.length}/4)
                        </span>
                        <h4 className="font-editorial text-lg font-semibold text-[#0C162C]">
                          Fovea Atelier Presentation Suite
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep('frames')}
                        className="text-xs text-[#0D5C63] font-semibold hover:underline"
                      >
                        Edit frames
                      </button>
                    </div>

                    {/* Frame chips */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {selectedProducts.map((p) => (
                        <div key={p.id} className="flex items-center gap-2 p-2 bg-[#F5F3EF] rounded-xl border border-[#0C162C]/5">
                          <div className="relative w-10 h-8 rounded-lg overflow-hidden shrink-0 bg-white">
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              sizes="40px"
                              referrerPolicy="no-referrer"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="text-[11px] font-semibold text-[#0C162C] block truncate">
                              {p.name}
                            </span>
                            <span className="text-[9px] text-[#0C162C]/60 truncate block">
                              {p.defaultColor}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Dispatch Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#0C162C]/8 text-xs">
                      <div>
                        <span className="text-[#0C162C]/50 block text-[10px] uppercase tracking-wider">
                          Delivery Window
                        </span>
                        <p className="font-semibold text-[#0C162C] mt-0.5">
                          {dates[selectedDateIdx].label} · {selectedTimeSlot}
                        </p>
                      </div>

                      <div>
                        <span className="text-[#0C162C]/50 block text-[10px] uppercase tracking-wider">
                          Client & Mobile
                        </span>
                        <p className="font-semibold text-[#0C162C] mt-0.5 truncate">
                          {details.fullName || 'Client'} ({details.mobileNumber || '+1 555-0192'})
                        </p>
                      </div>

                      <div className="sm:col-span-2">
                        <span className="text-[#0C162C]/50 block text-[10px] uppercase tracking-wider">
                          Delivery Address
                        </span>
                        <p className="font-semibold text-[#0C162C] mt-0.5">
                          {address.building || 'Flat 402, Royal Palms'}, {address.street || 'Masab Tank'}, {address.city || 'Hyderabad'} {address.pincode || '500028'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Trust Points */}
                  <div className="p-4 bg-[#F5F3EF] rounded-2xl border border-[#0C162C]/8 space-y-2 text-xs text-[#0C162C]/80">
                    <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Fovea Atelier Trial Guarantees</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#0C162C]/75 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#0D5C63]" />
                        <span>100% Free Home Trial ($0 deposit)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#0D5C63]" />
                        <span>No purchase obligation whatsoever</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#0D5C63]" />
                        <span>Certified Optometrist fitting included</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#0D5C63]" />
                        <span>Prepaid return packaging provided</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* SUCCESS CONFIRMATION STATE */}
              {/* ============================================================== */}
              {step === 'confirmed' && (
                <div className="py-6 text-center space-y-6">
                  {/* Luxury Emblem Checkmark */}
                  <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-[#0D5C63]/10 animate-ping opacity-50" />
                    <div className="w-20 h-20 rounded-full bg-[#0D5C63] text-white flex items-center justify-center shadow-xl">
                      <Check className="w-10 h-10" strokeWidth={2.5} />
                    </div>
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#0D5C63]">
                      Home Trial Suite Confirmed
                    </span>
                    <h3 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0C162C]">
                      Your 4-Frame Presentation Box is Reserved
                    </h3>
                    <p className="text-xs sm:text-sm text-[#0C162C]/75 font-light leading-relaxed">
                      Thank you, <span className="font-semibold text-[#0C162C]">{details.fullName || 'Valued Client'}</span>. Your custom presentation suite is now being packed with white gloves by our optical team.
                    </p>
                  </div>

                  {/* Booking Reference Box */}
                  <div className="p-4 bg-white rounded-2xl border border-[#0C162C]/10 max-w-sm mx-auto shadow-xs space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#0C162C]/50 block">
                      Booking Reference Number
                    </span>
                    <div className="flex items-center justify-center gap-3">
                      <span className="font-mono text-xl font-bold tracking-wider text-[#0C162C]">
                        {bookingRef}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyRef}
                        className="p-1.5 hover:bg-[#F5F3EF] rounded-lg text-[#0C162C]/60 hover:text-[#0C162C] transition-colors"
                        title="Copy reference"
                      >
                        {copiedRef ? <CheckCheck className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <span className="text-[11px] text-[#0D5C63] font-medium block">
                      Scheduled: {dates[selectedDateIdx].label} ({selectedTimeSlot})
                    </span>
                  </div>

                  {/* 4-Step Next Steps Timeline */}
                  <div className="p-5 bg-[#F5F3EF] rounded-3xl max-w-md mx-auto text-left text-xs text-[#0C162C]/80 space-y-2.5 border border-[#0C162C]/8">
                    <span className="font-semibold text-[#0C162C] block text-[11px] uppercase tracking-wider">
                      Next Milestones
                    </span>
                    <div className="space-y-2 text-[11px]">
                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#0D5C63] text-white flex items-center justify-center text-[9px] shrink-0 mt-0.5">1</span>
                        <span>SMS tracking alert dispatched to <b>{details.mobileNumber || '+1 (555) 019-2834'}</b>.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#0D5C63] text-white flex items-center justify-center text-[9px] shrink-0 mt-0.5">2</span>
                        <span>Courier personal handoff at your door with sanitized presentation tray.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#0D5C63] text-white flex items-center justify-center text-[9px] shrink-0 mt-0.5">3</span>
                        <span>5 full days to live with the silhouettes and consult friends and family.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#0D5C63] text-white flex items-center justify-center text-[9px] shrink-0 mt-0.5">4</span>
                        <span>Hand back to prepaid courier, or order your favorite frame with lenses online.</span>
                      </div>
                    </div>
                  </div>

                  {/* Confirmation Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                    <button
                      type="button"
                      onClick={handleWhatsAppBookingConfirm}
                      className="w-full sm:w-auto px-6 py-3.5 bg-[#0D5C63] hover:bg-[#094348] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                    >
                      <MessageSquare className="w-4 h-4 text-[#C5A880]" />
                      <span>Confirm on WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="w-full sm:w-auto px-6 py-3.5 bg-[#0C162C] hover:bg-[#1A365D] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all"
                    >
                      Continue Browsing
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Action Footer (For Steps 1 to 5) */}
            {step !== 'confirmed' && (
              <div className="px-5 sm:px-8 py-4 pb-safe sm:pb-4 bg-white border-t border-[#0C162C]/10 flex items-center justify-between gap-4 shrink-0">
                <div className="hidden sm:block text-xs text-[#0C162C]/70">
                  <p className="font-semibold text-[#0C162C] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#0D5C63]" />
                    <span>Free Return Pouch Included</span>
                  </p>
                  <p className="text-[11px] text-[#0C162C]/50">
                    No payment details required to book.
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  {step === 'frames' && (
                    <button
                      type="button"
                      disabled={selectedProducts.length === 0}
                      onClick={() => setStep('details')}
                      className={`w-full sm:w-auto min-h-[48px] px-8 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                        selectedProducts.length === 0
                          ? 'opacity-40 cursor-not-allowed bg-[#0C162C] text-[#FAF9F6]'
                          : 'bg-[#0C162C] text-[#FAF9F6] hover:bg-[#1A365D] shadow-md active:scale-95'
                      }`}
                    >
                      <span>Continue to Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  {step === 'details' && (
                    <button
                      type="button"
                      onClick={() => {
                        if (!details.fullName) setDetails((prev) => ({ ...prev, fullName: 'Valued Client' }));
                        if (!details.mobileNumber) setDetails((prev) => ({ ...prev, mobileNumber: '+1 (555) 019-2834' }));
                        setStep('address');
                      }}
                      className="w-full sm:w-auto min-h-[48px] px-8 bg-[#0C162C] text-[#FAF9F6] hover:bg-[#1A365D] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                    >
                      <span>Continue to Address</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  {step === 'address' && (
                    <button
                      type="button"
                      onClick={() => {
                        if (!address.building) setAddress((prev) => ({ ...prev, building: 'Residence 4B' }));
                        if (!address.street) setAddress((prev) => ({ ...prev, street: '450 West 24th Street' }));
                        if (!address.pincode) setAddress((prev) => ({ ...prev, pincode: '10011' }));
                        setStep('schedule');
                      }}
                      className="w-full sm:w-auto min-h-[48px] px-8 bg-[#0C162C] text-[#FAF9F6] hover:bg-[#1A365D] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                    >
                      <span>Continue to Schedule</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  {step === 'schedule' && (
                    <button
                      type="button"
                      onClick={() => setStep('summary')}
                      className="w-full sm:w-auto min-h-[48px] px-8 bg-[#0C162C] text-[#FAF9F6] hover:bg-[#1A365D] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                    >
                      <span>Review Booking Summary</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  {step === 'summary' && (
                    <button
                      type="button"
                      onClick={handleConfirmBooking}
                      className="w-full sm:w-auto min-h-[50px] px-8 bg-[#0D5C63] hover:bg-[#094348] text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
                    >
                      <Sparkles className="w-4 h-4 text-[#C5A880]" />
                      <span>Confirm Home Trial Booking</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
