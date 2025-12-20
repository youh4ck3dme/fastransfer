import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  CalendarIcon, 
  LocationIcon, 
  ClockIcon, 
  UsersIcon, 
  ArrowRightIcon, 
  PhoneIcon 
} from '@/components/icons/ServiceIcons';

declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (callback: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}

const RECAPTCHA_SITE_KEY = '6Lf1mjEsAAAAAADMdMOAns6yUTTjBJKSYeTwiKAq';

const BookingForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    date: '',
    time: '',
    passengers: '1',
    name: '',
    phone: '',
    email: '',
  });

  const executeRecaptcha = useCallback(async (): Promise<string | null> => {
    return new Promise((resolve) => {
      if (!window.grecaptcha?.enterprise) {
        console.warn('reCAPTCHA not loaded');
        resolve(null);
        return;
      }
      
      window.grecaptcha.enterprise.ready(async () => {
        try {
          const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, {
            action: 'BOOKING_SUBMIT'
          });
          resolve(token);
        } catch (error) {
          console.error('reCAPTCHA error:', error);
          resolve(null);
        }
      });
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Execute reCAPTCHA
      const recaptchaToken = await executeRecaptcha();
      
      if (!recaptchaToken) {
        toast({
          title: "Chyba overenia",
          description: "Nepodarilo sa overiť reCAPTCHA. Skúste to prosím znova.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Save booking to database
      const { error: dbError } = await supabase
        .from('bookings')
        .insert({
          pickup_location: formData.pickupLocation,
          dropoff_location: formData.dropoffLocation,
          booking_date: formData.date,
          booking_time: formData.time,
          passengers: parseInt(formData.passengers),
          customer_name: formData.name,
          customer_phone: formData.phone,
          customer_email: formData.email,
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Nepodarilo sa uložiť rezerváciu');
      }

      // Send email notifications with reCAPTCHA token
      const { error: emailError } = await supabase.functions.invoke('send-booking-notification', {
        body: {
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          pickupLocation: formData.pickupLocation,
          dropoffLocation: formData.dropoffLocation,
          bookingDate: formData.date,
          bookingTime: formData.time,
          passengers: parseInt(formData.passengers),
          recaptchaToken: recaptchaToken,
        },
      });

      if (emailError) {
        console.error('Email error:', emailError);
        // Don't throw - booking was saved, just email failed
      }

      toast({
        title: "Rezervácia odoslaná!",
        description: "Ozveme sa vám do 30 minút s potvrdením. Kontrolujte aj email.",
      });

      // Reset form
      setFormData({
        pickupLocation: '',
        dropoffLocation: '',
        date: '',
        time: '',
        passengers: '1',
        name: '',
        phone: '',
        email: '',
      });
    } catch (error: any) {
      console.error('Booking error:', error);
      toast({
        title: "Chyba",
        description: error.message || "Nepodarilo sa odoslať rezerváciu. Skúste to prosím znova.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="booking" className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
              Rýchla rezervácia
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6">
              Objednajte si
              <span className="text-gradient-gold"> transfer</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Vyplňte formulár a my vám do 30 minút potvrdíme rezerváciu.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="rounded-2xl bg-gradient-card p-8 md:p-10 gold-border shadow-elegant"
          >
            {/* Route Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <Label htmlFor="pickupLocation" className="text-foreground flex items-center gap-2">
                  <LocationIcon className="w-4 h-4 text-primary" />
                  Miesto vyzdvihnutia
                </Label>
                <Input
                  id="pickupLocation"
                  name="pickupLocation"
                  placeholder="Napr. Bratislava, Hlavná stanica"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  className="bg-secondary/50 border-border/50 focus:border-primary h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dropoffLocation" className="text-foreground flex items-center gap-2">
                  <LocationIcon className="w-4 h-4 text-primary" />
                  Cieľová destinácia
                </Label>
                <Input
                  id="dropoffLocation"
                  name="dropoffLocation"
                  placeholder="Napr. Viedeň, Schwechat letisko"
                  value={formData.dropoffLocation}
                  onChange={handleChange}
                  className="bg-secondary/50 border-border/50 focus:border-primary h-12"
                  required
                />
              </div>
            </div>

            {/* Date & Time Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-foreground flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-primary" />
                  Dátum
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="bg-secondary/50 border-border/50 focus:border-primary h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="text-foreground flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-primary" />
                  Čas vyzdvihnutia
                </Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="bg-secondary/50 border-border/50 focus:border-primary h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passengers" className="text-foreground flex items-center gap-2">
                  <UsersIcon className="w-4 h-4 text-primary" />
                  Počet cestujúcich
                </Label>
                <select
                  id="passengers"
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                  className="w-full h-12 rounded-lg bg-secondary/50 border border-border/50 focus:border-primary px-4 text-foreground"
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'osoba' : num < 5 ? 'osoby' : 'osôb'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-border/50 my-8" />

            {/* Contact Section */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Meno a priezvisko</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ján Novák"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-secondary/50 border-border/50 focus:border-primary h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">Telefón</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+421 9XX XXX XXX"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-secondary/50 border-border/50 focus:border-primary h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jan@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-secondary/50 border-border/50 focus:border-primary h-12"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-muted-foreground text-sm">
                <span>Alebo zavolajte priamo: </span>
                <a href="tel:+421911620520" className="text-primary font-semibold hover:underline">
                  +421 911 620 520
                </a>
              </div>
              <Button variant="hero" size="xl" type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                <span>{isSubmitting ? 'Odosielam...' : 'Odoslať dopyt'}</span>
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.form>

          {/* Quick Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
          >
            <span className="text-muted-foreground">Potrebujete okamžitú odpoveď?</span>
            <Button variant="heroOutline" asChild>
              <a href="tel:+421911620520" className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4" />
                Zavolajte nám
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
