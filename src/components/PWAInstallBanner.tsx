import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallBanner = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the banner before
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowBanner(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 z-50"
        >
          <div className="neon-snake-border p-[2px]">
            <div className="bg-background/95 backdrop-blur-md rounded-xl p-2.5 relative">
              {/* Close button */}
              <button
                onClick={handleDismiss}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors border border-border"
                aria-label="Zatvoriť"
              >
                <X className="w-2.5 h-2.5 text-muted-foreground" />
              </button>

              <div className="flex items-center gap-2">
                {/* Icon */}
                <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center flex-shrink-0">
                  <Download className="w-4 h-4 text-primary-foreground" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-montserrat font-semibold text-foreground text-[10px] leading-tight">
                    Inštalovať
                  </h4>
                  <p className="text-[8px] text-muted-foreground leading-tight">
                    Pridať na plochu
                  </p>
                </div>

                {/* Install button */}
                <Button
                  onClick={handleInstall}
                  size="sm"
                  className="h-7 px-2.5 text-[10px] bg-gradient-gold hover:opacity-90 text-primary-foreground font-medium"
                >
                  <Download className="w-3 h-3 mr-1" />
                  OK
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAInstallBanner;
