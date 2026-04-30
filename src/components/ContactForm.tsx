import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ArrowRightIcon } from '@/components/icons/ServiceIcons';

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    confirmContact: '', // Honeypot
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          subject: formData.subject,
          message: formData.message,
          confirmContact: formData.confirmContact,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Nepodarilo sa odoslať správu');
      }

      toast({
        title: 'Správa odoslaná!',
        description: 'Ďakujeme za vašu správu. Odpovieme vám v čo najkratšom čase.',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        confirmContact: '',
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Nepodarilo sa odoslať správu. Skúste to prosím znova.';
      toast({
        title: 'Chyba',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      onSubmit={handleSubmit}
      className="rounded-2xl bg-gradient-card p-8 md:p-10 gold-border shadow-elegant"
    >
      <h3 className="text-xl font-semibold text-foreground mb-6">Napíšte nám správu</h3>

      {/* Name & Email */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="contact-name" className="text-foreground">
            Meno a priezvisko <span className="text-primary">*</span>
          </Label>
          <Input
            id="contact-name"
            name="name"
            placeholder="Ján Novák"
            value={formData.name}
            onChange={handleChange}
            className="bg-secondary/50 border-border/50 focus:border-primary h-12"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email" className="text-foreground">
            Email <span className="text-primary">*</span>
          </Label>
          <Input
            id="contact-email"
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

      {/* Phone & Subject */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor="contact-phone" className="text-foreground">
            Telefón <span className="text-muted-foreground text-xs">(nepovinné)</span>
          </Label>
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            placeholder="+421 9XX XXX XXX"
            value={formData.phone}
            onChange={handleChange}
            className="bg-secondary/50 border-border/50 focus:border-primary h-12"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-subject" className="text-foreground">
            Predmet <span className="text-primary">*</span>
          </Label>
          <Input
            id="contact-subject"
            name="subject"
            placeholder="Napr. Otázka ohľadom ceny"
            value={formData.subject}
            onChange={handleChange}
            className="bg-secondary/50 border-border/50 focus:border-primary h-12"
            required
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2 mb-6">
        <Label htmlFor="contact-message" className="text-foreground">
          Správa <span className="text-primary">*</span>
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          placeholder="Sem napíšte vašu správu..."
          value={formData.message}
          onChange={handleChange}
          className="bg-secondary/50 border-border/50 focus:border-primary min-h-[140px] resize-none"
          required
          minLength={10}
          maxLength={5000}
        />
        <p className="text-xs text-muted-foreground text-right">
          {formData.message.length}/5000
        </p>
      </div>

      {/* Honeypot Field - Hidden for humans, visible for bots */}
      <div className="opacity-0 absolute -z-10 h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="confirmContact">Please leave this field blank</label>
        <input
          type="text"
          id="confirmContact"
          name="confirmContact"
          value={formData.confirmContact}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Submit */}
      <Button
        variant="hero"
        size="xl"
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        <span>{isSubmitting ? 'Odosielam...' : 'Odoslať správu'}</span>
        <ArrowRightIcon className="w-5 h-5 ml-2" />
      </Button>
    </motion.form>
  );
};

export default ContactForm;
