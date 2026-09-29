'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Download, Share2, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const DISMISS_KEY = 'fovea_pwa_prompt_dismissed_at';
const DISMISS_FOR_MS = 7 * 24 * 60 * 60 * 1000;

export default function PWAInstallPrompt() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showIOSHelp, setShowIOSHelp] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // The website remains fully usable if registration is unavailable.
      });
    }

    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      ('standalone' in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone));

    if (isStandalone) return;

    const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
    const recentlyDismissed = Date.now() - dismissedAt < DISMISS_FOR_MS;
    if (recentlyDismissed) return;

    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    if (isIOS) {
      const timer = window.setTimeout(() => {
        setShowIOSHelp(true);
        setShowPrompt(true);
      }, 1800);
      return () => window.clearTimeout(timer);
    }

    const handleBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    const handleInstalled = () => {
      setShowPrompt(false);
      setInstallEvent(null);
      localStorage.removeItem(DISMISS_KEY);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setShowPrompt(false);
  };

  const install = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome === 'accepted') setShowPrompt(false);
    setInstallEvent(null);
  };

  if (!showPrompt) return null;

  return (
    <aside
      role="dialog"
      aria-label="Install Fovea app"
      className="fixed inset-x-3 bottom-20 z-[70] mx-auto max-w-md rounded-2xl border border-[#C5A880]/35 bg-[#07121f]/97 p-4 text-white shadow-2xl backdrop-blur-xl lg:bottom-6"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss app installation prompt"
        className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full text-white/65 transition-colors hover:bg-white/10 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-3 pr-8">
        <Image
          src="/icons/fovea-192.png"
          alt="Fovea app icon"
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-xl border border-[#C5A880]/30 object-cover"
        />
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C5A880]">
            Fovea App
          </p>
          <h2 className="font-editorial text-xl font-semibold leading-tight">Install Fovea</h2>
          <p className="mt-0.5 text-xs text-white/65">Faster access, full-screen browsing and offline essentials.</p>
        </div>
      </div>

      {showIOSHelp ? (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/8 px-3 py-2.5 text-xs text-white/80">
          <Share2 className="h-4 w-4 shrink-0 text-[#C5A880]" />
          <span>Tap Share in Safari, then choose <strong className="text-white">Add to Home Screen</strong>.</span>
        </div>
      ) : (
        <button
          type="button"
          onClick={install}
          disabled={!installEvent}
          className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#C5A880] px-5 text-xs font-bold uppercase tracking-[0.14em] text-[#07121f] transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:cursor-wait disabled:opacity-60"
        >
          <Download className="h-4 w-4" />
          Install App
        </button>
      )}
    </aside>
  );
}
