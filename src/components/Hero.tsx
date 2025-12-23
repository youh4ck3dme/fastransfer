import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.log);
    }
  }, []);

  return (
    <section className="relative min-h-[100dvh] h-screen w-full overflow-hidden bg-black" style={{ perspective: '1000px' }}>
      {/* Video Background */}
      <div className="absolute inset-0 min-h-[100dvh] h-screen w-full">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isVideoLoaded ? 1 : 0 }}
          transition={{ duration: 1.5 }}
          className="h-full w-full min-h-[100dvh]"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            className="absolute inset-0 h-full w-full min-h-[100dvh] object-cover"
          >
            <source src="/hero-background.mp4" type="video/mp4" />
          </video>
        </motion.div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/80 sm:bg-gradient-to-r sm:from-black/95 sm:via-black/60 sm:to-black/30" />
      </div>

      {/* Content - Split Layout for Mobile */}
      <div className="relative z-10 flex flex-col h-full justify-between px-4 sm:px-6 lg:px-8" style={{ transformStyle: 'preserve-3d' }}>
        
        {/* TOP SECTION - Headline (Mobile: under header) */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-24 sm:pt-32 text-center sm:text-left max-w-4xl mx-auto sm:mx-0 w-full"
          style={{ transform: 'translateZ(50px)' }}
        >
          {/* Badge - Hidden on mobile */}
          <div className="hidden sm:inline-flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 backdrop-blur-sm border border-primary/20 mb-6">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-wider text-white/90">VIP Preprava</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Váš <span className="text-primary italic font-extrabold">exkluzívny</span> transfer
          </h1>

          {/* Thematic Subheading */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-4 text-sm sm:text-base md:text-lg text-gray-300 max-w-md mx-auto sm:mx-0"
            style={{ transform: 'translateZ(30px)' }}
          >
            <span className="hidden sm:inline">Profesionálna VIP preprava po celom Slovensku. </span>
            <span className="sm:hidden">Komfort • Elegancia • Spoľahlivosť</span>
            <span className="hidden sm:inline">Letiskové transfery • Firemná doprava • Eventy</span>
          </motion.p>
        </motion.div>

        {/* BOTTOM SECTION - Buttons & Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="pb-8 sm:pb-12 text-center w-full space-y-6"
          style={{ transform: 'translateZ(20px)' }}
        >
          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row justify-center">
            <Button 
              variant="hero" 
              size="lg"
              asChild 
              className="w-full sm:w-auto font-bold uppercase tracking-wider text-sm sm:text-base px-6 sm:px-8"
            >
              <a href="#booking" className="flex items-center justify-center gap-2">
                Objednať Transfer
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </Button>
            
            <Button 
              variant="heroOutline" 
              size="lg"
              asChild 
              className="w-full sm:w-auto bg-black/40 font-semibold uppercase tracking-wider backdrop-blur-sm text-sm sm:text-base px-6 sm:px-8"
            >
              <a href="#pricing">Cenník</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-4 sm:gap-6 md:gap-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-white/5 border border-primary/20">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-white">4.9</p>
                <p className="text-[10px] sm:text-xs text-gray-400 uppercase">Hodnotenie</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-white/5 border border-primary/20">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-white">24/7</p>
                <p className="text-[10px] sm:text-xs text-gray-400 uppercase">Dostupnosť</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-white/5 border border-primary/20">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div>
                <p className="text-base sm:text-lg font-bold text-white">10+</p>
                <p className="text-[10px] sm:text-xs text-gray-400 uppercase">Rokov</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 bg-black/10 p-1 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-primary"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
