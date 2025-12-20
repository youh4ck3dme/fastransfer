import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  PhoneIcon, 
  MailIcon, 
  LocationIcon, 
  ClockIcon, 
  MessageIcon 
} from '@/components/icons/ServiceIcons';

const Contact = () => {
  const contactInfo = [
    {
      Icon: PhoneIcon,
      title: 'Telefón 1',
      value: '+421 902 609 940',
      href: 'tel:+421902609940',
      description: 'Hlavná linka',
    },
    {
      Icon: PhoneIcon,
      title: 'Telefón 2',
      value: '+421 911 923 573',
      href: 'tel:+421911923573',
      description: 'Záložná linka',
    },
    {
      Icon: MailIcon,
      title: 'Email',
      value: 'info@fastransfer.sk',
      href: 'mailto:info@fastransfer.sk',
      description: 'Odpovieme do 2 hodín',
    },
    {
      Icon: ClockIcon,
      title: 'Dispečing',
      value: '08:00 - 21:00',
      href: '#',
      description: 'Pondelok - Nedeľa',
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
          <span className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">
            Kontaktujte nás
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Sme tu
            <span className="text-gradient-gold"> pre vás</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
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
              className="block p-6 rounded-2xl bg-gradient-card gold-border hover:border-primary/50 transition-all duration-300 hover:shadow-gold group hover:bg-gradient-to-br hover:from-card hover:to-primary/5"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <item.Icon className="w-6 h-6 text-primary-foreground" />
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
                <MessageIcon className="w-8 h-8 text-primary-foreground" />
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 tracking-tight">
                Potrebujete okamžitú pomoc?
              </h3>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
                Zavolajte nám a my vám okamžite pomôžeme s vaším transferom. Sme dostupní 24 hodín denne, 7 dní v týždni.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="hero" size="xl" asChild>
                  <a href="tel:+421902609940" className="flex items-center gap-2">
                    <PhoneIcon className="w-5 h-5" />
                    +421 902 609 940
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
