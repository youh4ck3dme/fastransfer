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
    <section className="relative min-h-[100dvh] h-screen w-full overflow-hidden bg-black">
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
        
        {/* Simple dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-end sm:items-center justify-center px-4 pb-12 sm:pb-8 sm:px-6 lg:px-8 pt-[120px]">
        <div className="w-full max-w-4xl space-y-6 sm:space-y-8 text-center sm:text-left">
          
          {/* Badge - Hidden on mobile */}
          <div className="hidden sm:inline-flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 backdrop-blur-sm border border-primary/20">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-wider text-white/90">VIP Preprava</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Váš <span className="text-primary italic font-extrabold">exkluzívny</span> transfer
          </h1>

          {/* Description - Hidden on mobile */}
          <p className="hidden sm:block max-w-xl text-base text-gray-300 sm:text-lg">
            Letiskové transfery a VIP služby s maximálnym komfortom. 
            Profesionálni vodiči a luxusné vozidlá.
          </p>


          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row justify-center sm:justify-start">
            <Button 
              variant="hero" 
              size="lg"
              asChild 
              className="w-full font-bold uppercase tracking-wider sm:w-auto"
            >
              <a href="#booking" className="flex items-center justify-center gap-2">
                Objednať Transfer
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            
            <Button 
              variant="heroOutline" 
              size="lg"
              asChild 
              className="w-full bg-black/40 font-semibold uppercase tracking-wider backdrop-blur-sm sm:w-auto"
            >
              <a href="#pricing">Cenník</a>
            </Button>
          </div>


          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-6 sm:flex sm:gap-8 sm:border-t-0 sm:pt-0 justify-center">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-primary/20">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">4.9</p>
                <p className="text-xs text-gray-400 uppercase">Hodnotenie</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-primary/20">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">24/7</p>
                <p className="text-xs text-gray-400 uppercase">Dostupnosť</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-primary/20">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">10+</p>
                <p className="text-xs text-gray-400 uppercase">Rokov</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
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
