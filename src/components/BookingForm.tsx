import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
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



const BookingForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {


      // Send data to PHP backend on Websupport (HTTP for testing until SSL cert is ready)
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          pickupLocation: formData.pickupLocation,
          dropoffLocation: formData.dropoffLocation,
          bookingDate: formData.date,
          bookingTime: formData.time,
          passengers: parseInt(formData.passengers),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Nepodarilo sa odoslať rezerváciu');
      }

      toast({
        title: "Rezervácia odoslaná!",
        description: "Ozveme sa vám do 30 minút s potvrdením. Kontrolujte aj email.",
      });

      setShowSuccessModal(true);

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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Nepodarilo sa odoslať rezerváciu. Skúste to prosím znova.";
      toast({
        title: "Chyba",
        description: errorMessage,
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
    <>
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
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-6">
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
                  className="w-full h-12 rounded-lg bg-secondary/50 border border-border/50 focus:border-primary px-4 text-foreground appearance-none cursor-pointer"
                  aria-label="Počet cestujúcich"
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

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card w-full max-w-lg p-8 rounded-2xl shadow-gold border border-primary/20 relative"
            >
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Zavrieť"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center space-y-6">
                <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center shadow-gold">
                  <CheckCircle2 className="w-10 h-10 text-primary" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold font-serif text-foreground">Rezervácia Prijatá!</h3>
                  <p className="text-muted-foreground text-lg">
                    Ďakujeme za prejavenú dôveru.
                  </p>
                </div>

                <div className="bg-secondary/30 p-4 rounded-xl border border-white/5">
                  <p className="text-foreground font-medium">
                    Čo sa bude diať teraz?
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Náš tím spracuje vašu požiadavku a <strong>do 30 minút</strong> vás budeme kontaktovať pre finálne potvrdenie.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                  <Button variant="outline" onClick={() => setShowSuccessModal(false)} className="w-full sm:w-auto">
                    Zavrieť
                  </Button>
                  <Button variant="hero" asChild className="w-full sm:w-auto">
                    <a href="tel:+421911620520" className="flex items-center gap-2 justify-center">
                      <PhoneIcon className="w-4 h-4" />
                      Súrne? Zavolajte nám
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BookingForm;
