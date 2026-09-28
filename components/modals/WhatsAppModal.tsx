'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useFovea } from '@/lib/context';

export default function WhatsAppModal() {
  const { isWhatsAppOpen, setIsWhatsAppOpen, whatsAppInquiryText } = useFovea();
  const [customText, setCustomText] = useState('');

  const cannedOptions = [
    'I would like personal assistance choosing the right frame shape for my facial geometry.',
    'I have a question regarding progressive / high-index lens options for the Kyoto Panto.',
    'I want to inquire about scheduling a private complimentary Home Trial consultation.',
    'How do I submit my prescription and pupillary distance (PD) measurement?',
  ];

  const handleLaunchWhatsApp = (message: string) => {
    const encoded = encodeURIComponent(message || whatsAppInquiryText);
    // WhatsApp direct deep link with official Fovea business number
    const whatsappUrl = `https://wa.me/919700956245?text=${encoded}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsWhatsAppOpen(false);
  };

  return (
    <AnimatePresence>
      {isWhatsAppOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWhatsAppOpen(false)}
            className="fixed inset-0 bg-[#0C162C]/40 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative w-full max-w-lg bg-[#FAF9F6] border border-[#0C162C]/10 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#0C162C]/10 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0D5C63]/10 text-[#0D5C63] flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-editorial text-2xl font-semibold text-[#0C162C]">
                    Fovea Optical Concierge
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#0D5C63] font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Stylists online · Avg response &lt; 3 mins</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsWhatsAppOpen(false)}
                className="min-w-[40px] min-h-[40px] flex items-center justify-center text-[#0C162C]/60 hover:text-[#0C162C] rounded-full hover:bg-[#0C162C]/5 transition-colors"
                aria-label="Close concierge modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <p className="text-xs text-[#0C162C]/75 leading-relaxed">
                Connect directly with our master opticians for frame sizing, prescription verification, or bespoke titanium inquiries.
              </p>

              {/* Highlighted Inquiry if specific text was provided */}
              {whatsAppInquiryText && (
                <div className="p-3.5 rounded-2xl bg-[#0D5C63]/5 border border-[#0D5C63]/15 space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#0D5C63] font-bold block">
                    Your Pending Inquiry:
                  </span>
                  <p className="text-xs text-[#0C162C] font-medium leading-relaxed line-clamp-2">
                    &ldquo;{whatsAppInquiryText}&rdquo;
                  </p>
                  <button
                    type="button"
                    onClick={() => handleLaunchWhatsApp(whatsAppInquiryText)}
                    className="w-full min-h-[44px] px-4 bg-[#0D5C63] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#0A474D] active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Launch WhatsApp with This Inquiry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Pre-crafted Inquiries */}
              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-[#0C162C]/50 font-semibold block">
                  Select a consultation topic:
                </span>
                <div className="space-y-1.5">
                  {cannedOptions.map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleLaunchWhatsApp(opt)}
                      className="w-full text-left p-3 rounded-xl bg-white hover:bg-[#F5F3EF] border border-[#0C162C]/8 text-xs text-[#0C162C] transition-colors flex items-center justify-between group"
                    >
                      <span className="pr-2">{opt}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#0C162C]/40 group-hover:text-[#0D5C63] shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom message input */}
              <div className="space-y-1.5 pt-2">
                <label className="text-[11px] uppercase tracking-wider text-[#0C162C]/50 font-semibold block">
                  Or write a custom message:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="e.g. Can you check my -3.50 prescription?"
                    className="flex-1 px-4 py-2.5 bg-white border border-[#0C162C]/15 rounded-xl text-xs text-[#0C162C] focus:outline-hidden focus:border-[#0C162C]"
                  />
                  <button
                    type="button"
                    onClick={() => handleLaunchWhatsApp(customText || whatsAppInquiryText)}
                    className="min-h-[44px] px-5 bg-[#0D5C63] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#0A474D] transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <span>Start Chat</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Security reassurance */}
              <div className="pt-2 flex items-center gap-2 text-[11px] text-[#0C162C]/50">
                <ShieldCheck className="w-4 h-4 text-[#0D5C63]" />
                <span>Official verified business line: +91 97009 56245</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
