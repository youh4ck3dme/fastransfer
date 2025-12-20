import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onLoadComplete: () => void;
  minDisplayTime?: number;
}

const SplashScreen = ({ onLoadComplete, minDisplayTime = 2000 }: SplashScreenProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start video at random position
    const handleLoadedMetadata = () => {
      const duration = video.duration;
      if (duration && duration > 0) {
        const randomStart = Math.random() * (duration * 0.7); // Start within first 70% of video
        video.currentTime = randomStart;
      }
      video.play().catch(() => {
        // Autoplay might be blocked, that's okay
      });
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Minimum display time before allowing fade out
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onLoadComplete, 500); // Wait for fade animation
    }, minDisplayTime);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      clearTimeout(timer);
    };
  }, [onLoadComplete, minDisplayTime]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
        >
          {/* Video Background */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/splash-video.mp4" type="video/mp4" />
          </video>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />

          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative z-10 text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-gradient-gold mb-4">
              FastTransfer
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base tracking-widest uppercase">
              VIP Preprava
            </p>
            
            {/* Loading indicator */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: minDisplayTime / 1000, ease: 'linear' }}
              className="mt-8 h-0.5 bg-primary/50 rounded-full mx-auto max-w-[200px]"
            >
              <div className="h-full bg-primary rounded-full animate-pulse" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
