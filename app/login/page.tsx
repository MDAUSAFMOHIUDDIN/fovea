'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  Glasses,
  Compass,
} from 'lucide-react';
import { useFovea } from '@/lib/context';

export default function LoginPage() {
  const router = useRouter();
  const { user, isAuthLoading, loginWithGoogle, loginWithEmail } = useFovea();

  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [useEmailForm, setUseEmailForm] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // If already logged in, show quick redirect message or button
  if (user) {
    return (
      <div className="py-20 sm:py-32 bg-[#FAF9F6] min-h-screen text-[#0C162C] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#0C162C]/10 shadow-lg text-center space-y-5"
        >
          <div className="w-14 h-14 rounded-full bg-[#0D5C63]/10 text-[#0D5C63] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h2 className="font-editorial text-3xl font-semibold text-[#0C162C]">
            Already Signed In
          </h2>
          <p className="text-xs sm:text-sm text-[#0C162C]/70 font-light leading-relaxed">
            Welcome back, <strong className="text-[#0C162C] font-semibold">{user.fullName}</strong>.
            Your atelier profile, saved frames, and Home Trial history are ready.
          </p>
          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              href="/account"
              className="w-full min-h-[48px] px-6 bg-[#0C162C] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#1A365D] transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Go to My Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="w-full min-h-[44px] px-6 bg-[#FAF9F6] text-[#0C162C]/80 text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#F5F3EF] transition-all flex items-center justify-center gap-2"
            >
              <span>Continue Browsing</span>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const handleGoogleLogin = async () => {
    try {
      setErrorMsg('');
      await loginWithGoogle();
      router.push('/account');
    } catch {
      setErrorMsg('Unable to connect with Google. Please try again or use email sign-in.');
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    try {
      setErrorMsg('');
      await loginWithEmail(email, fullName);
      router.push('/account');
    } catch {
      setErrorMsg('Unable to complete email sign-in. Please try again.');
    }
  };

  return (
    <div className="py-16 sm:py-24 bg-[#FAF9F6] min-h-screen text-[#0C162C] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white rounded-3xl sm:rounded-4xl p-8 sm:p-12 border border-[#0C162C]/10 shadow-xl space-y-6"
      >
        {/* Brand Monogram & Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D5C63]/10 text-[#0D5C63] text-xs font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FOVEA CLIENT ATELIER</span>
          </div>

          <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-[#0C162C] tracking-tight">
            Welcome to Fovea.
          </h1>

          <p className="text-xs sm:text-sm text-[#0C162C]/70 font-light leading-relaxed">
            Access your curated optical wishlist, track Home Trial suites, and manage your delivery addresses.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-light text-center">
            {errorMsg}
          </div>
        )}

        {/* Primary Action: Continue with Google */}
        <div className="space-y-4">
          <button
            type="button"
            disabled={isAuthLoading}
            onClick={handleGoogleLogin}
            className="w-full min-h-[50px] px-6 bg-white hover:bg-[#FAF9F6] active:bg-[#F5F3EF] border border-[#0C162C]/15 rounded-2xl text-xs font-semibold text-[#0C162C] flex items-center justify-center gap-3 transition-all shadow-xs group disabled:opacity-60"
          >
            {isAuthLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-[#0C162C] border-t-transparent rounded-full animate-spin" />
                Connecting securely...
              </span>
            ) : (
              <>
                {/* Clean SVG Google Icon */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="w-full border-t border-[#0C162C]/10" />
            <span className="absolute px-3 bg-white text-[11px] uppercase tracking-wider text-[#0C162C]/40">
              or
            </span>
          </div>

          {/* Email Login Alternative */}
          {!useEmailForm ? (
            <button
              type="button"
              onClick={() => setUseEmailForm(true)}
              className="w-full min-h-[46px] px-6 bg-[#FAF9F6] hover:bg-[#F5F3EF] border border-[#0C162C]/10 rounded-2xl text-xs font-semibold text-[#0C162C]/80 flex items-center justify-center gap-2 transition-all"
            >
              <Mail className="w-4 h-4 text-[#0D5C63]" />
              <span>Continue with Email</span>
            </button>
          ) : (
            <form onSubmit={handleEmailLogin} className="space-y-3.5 pt-1">
              <div>
                <label className="text-[11px] font-semibold text-[#0C162C] block mb-1">
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Elena Rostova"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 min-h-[44px] bg-[#FAF9F6] border border-[#0C162C]/12 rounded-xl text-xs text-[#0C162C] focus:outline-none focus:ring-1 focus:ring-[#0D5C63]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#0C162C] block mb-1">
                  Email Address <span className="text-rose-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 min-h-[44px] bg-[#FAF9F6] border border-[#0C162C]/12 rounded-xl text-xs text-[#0C162C] focus:outline-none focus:ring-1 focus:ring-[#0D5C63]"
                />
              </div>

              <button
                type="submit"
                disabled={isAuthLoading}
                className="w-full min-h-[48px] px-6 bg-[#0C162C] text-[#FAF9F6] rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-[#1A365D] transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-60"
              >
                <span>Sign In with Email</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setUseEmailForm(false)}
                className="w-full text-center text-xs text-[#0C162C]/50 hover:text-[#0C162C] pt-1"
              >
                Cancel
              </button>
            </form>
          )}
        </div>

        {/* Security & Reassurance Footer */}
        <div className="pt-4 border-t border-[#0C162C]/8 space-y-2 text-center text-[11px] text-[#0C162C]/50 font-light">
          <div className="flex items-center justify-center gap-1.5 text-[#0D5C63] font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Encrypted 256-bit Client Connection</span>
          </div>
          <p>
            By continuing, you agree to Fovea’s Terms of Optical Craftsmanship and Privacy Charter.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
