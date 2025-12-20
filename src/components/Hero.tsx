import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-car.jpg';

const Hero = () => {
  const stats = [
    { icon: Star, value: '4.9', label: 'Hodnotenie' },
    { icon: Clock, value: '24/7', label: 'Dostupnosť' },
    { icon: Shield, value: '10+', label: 'Rokov skúseností' },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxusné VIP vozidlo"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect gold-border mb-8"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">Prémiová VIP preprava na Slovensku</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6"
          >
            Váš{' '}
            <span className="text-gradient-gold">exkluzívny</span>
            <br />
            transfer s eleganciou
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl"
          >
            Letiskové transfery, firemná preprava a VIP služby s maximálnym
            komfortom. Profesionálni vodiči, luxusné vozidlá, diskrétnosť zaručená.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <div className="neon-snake-border rounded-xl">
              <Button variant="hero" size="xl" asChild className="w-full">
                <a href="#booking" className="flex items-center gap-2">
                  Objednať Transfer
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </div>
            <div className="neon-snake-border rounded-xl">
              <Button variant="heroOutline" size="xl" asChild className="w-full bg-background">
                <a href="#pricing">Zobraziť cenník</a>
              </Button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center gold-border transition-all duration-300 group-hover:scale-110 group-hover:shadow-gold group-hover:border-primary/50">
                  <stat.icon className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
