'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, LockKeyhole, ShieldCheck, Sparkles, X } from 'lucide-react';
import { useFovea } from '@/lib/context';

export default function AuthGateModal() {
  const {
    isAuthGateOpen,
    closeAuthGate,
    authGateReason,
    loginWithGoogle,
    isAuthLoading,
  } = useFovea();
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      await loginWithGoogle();
    } catch (loginError) {
      const code = (loginError as { code?: string }).code;
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        setError('Google sign-in was cancelled. Please try again to continue.');
      } else if (code === 'auth/unauthorized-domain') {
        setError('Google sign-in is not authorized for this domain yet. Please contact Fovea support.');
      } else if (code === 'auth/network-request-failed') {
        setError('The connection was interrupted. Check your internet and try again.');
      } else {
        setError('Google sign-in could not be completed. Please try again.');
      }
    }
  };

  return (
    <AnimatePresence>
      {isAuthGateOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.button
            type="button"
            aria-label="Close sign-in window"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuthGate}
            className="absolute inset-0 bg-[#0C162C]/65 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="fovea-auth-title"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            className="relative w-full max-w-md rounded-3xl border border-[#C5A880]/25 bg-[#FAF9F6] p-6 shadow-2xl sm:p-9"
          >
            <button
              type="button"
              onClick={closeAuthGate}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-[#0C162C]/55 hover:bg-[#0C162C]/5 hover:text-[#0C162C]"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0D5C63]/10 text-[#0D5C63]">
                <LockKeyhole className="h-7 w-7" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0D5C63]">
                  <Sparkles className="h-3.5 w-3.5 text-[#C5A880]" />
                  Fovea Client Account
                </div>
                <h2 id="fovea-auth-title" className="font-editorial text-3xl font-semibold text-[#0C162C]">
                  Sign in to continue
                </h2>
                <p className="text-sm font-light leading-relaxed text-[#0C162C]/65">
                  Google verification is required to {authGateReason}. Your selection will continue automatically after sign-in.
                </p>
              </div>

              {error && <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">{error}</p>}

              <button
                type="button"
                onClick={handleLogin}
                disabled={isAuthLoading}
                className="flex min-h-[52px] w-full items-center justify-center gap-3 rounded-2xl border border-[#0C162C]/15 bg-white px-5 text-sm font-semibold text-[#0C162C] shadow-sm transition hover:bg-[#F5F3EF] disabled:opacity-60"
              >
                {isAuthLoading ? (
                  <><span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0C162C] border-t-transparent" /> Connecting securely…</>
                ) : (
                  <>
                    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.31v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.09Z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.29-2.66l-3.57-2.77c-.99.66-2.24 1.06-3.72 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
                      <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.49 12c0-.73.13-1.43.35-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.94l3.66-2.84Z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.56 10.56 0 0 0 12 1a11 11 0 0 0-9.82 6.06L5.84 9.9C6.71 7.3 9.14 5.38 12 5.38Z" />
                    </svg>
                    Continue with Google
                  </>
                )}
              </button>

              <div className="grid gap-2 text-left text-[11px] text-[#0C162C]/55">
                <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#0D5C63]" /> Saved frames and bag remain linked to your account</span>
                <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#0D5C63]" /> Orders, Home Trials and addresses stay private</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
