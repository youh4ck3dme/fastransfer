import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefón',
      value: '+421 911 620 520',
      href: 'tel:+421911620520',
      description: 'Dostupní 24/7',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'info@fastransfer.sk',
      href: 'mailto:info@fastransfer.sk',
      description: 'Odpovieme do 2 hodín',
    },
    {
      icon: MapPin,
      title: 'Adresa',
      value: 'Bratislava, Slovensko',
      href: '#',
      description: 'Pôsobíme po celom SK',
    },
    {
      icon: Clock,
      title: 'Pracovná doba',
      value: 'Non-stop 24/7',
      href: '#',
      description: 'Vrátane sviatkov',
    },
  ];

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            Kontaktujte nás
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6">
            Sme tu
            <span className="text-gradient-gold"> pre vás</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Máte otázky? Potrebujete špeciálnu ponuku? Kontaktujte nás kedykoľvek.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((item, index) => (
            <motion.a
              key={item.title}
              href={item.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="block p-6 rounded-2xl bg-gradient-card gold-border hover:border-primary/50 transition-all duration-300 hover:shadow-gold group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-primary font-medium mb-1">{item.value}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.a>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-2xl bg-gradient-card p-8 md:p-12 gold-border text-center relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center mx-auto mb-6 shadow-gold">
                <MessageCircle className="w-8 h-8 text-primary-foreground" />
              </div>

              <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                Potrebujete okamžitú pomoc?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Zavolajte nám a my vám okamžite pomôžeme s vaším transferom. Sme dostupní 24 hodín denne, 7 dní v týždni.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="xl" asChild>
                  <a href="tel:+421911620520" className="flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    +421 911 620 520
                  </a>
                </Button>
                <Button variant="heroOutline" size="xl" asChild>
                  <a href="mailto:info@fastransfer.sk">
                    Napíšte email
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
