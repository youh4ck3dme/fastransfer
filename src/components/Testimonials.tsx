import { motion } from 'framer-motion';
import { StarIcon, QuoteIcon } from './icons/ServiceIcons';

const testimonials = [
  {
    name: 'Peter Kováč',
    role: 'CEO, Tech Solutions',
    content: 'Už 3 roky využívam služby FastTransfer pre firemné transfery. Absolútna spoľahlivosť a profesionalita. Vodiči vždy načas, vozidlá bezchybné.',
    rating: 5,
  },
  {
    name: 'Mária Horváthová',
    role: 'Manažérka marketingu',
    content: 'Perfektná služba na letisko do Viedne. Vodič sledoval môj let a čakal na mňa, aj keď som mala meškanie. Odporúčam všetkým!',
    rating: 5,
  },
  {
    name: 'Martin Svoboda',
    role: 'Podnikateľ',
    content: 'VIP preprava na svadbu bola úžasná. Mercedes S-Class vyzdobený, šampanské pripravené. Hostia boli nadšení. Ďakujeme!',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      {/* Decorative Quote */}
      <div className="absolute top-20 left-10 opacity-10">
        <QuoteIcon className="w-64 h-64 text-primary" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            Referencie
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Čo hovoria naši
            <span className="text-gradient-gold"> klienti</span>
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-gradient-card gold-border hover:border-primary/50 transition-all duration-500 hover:shadow-gold hover:bg-gradient-to-br hover:from-card hover:to-primary/5">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-primary" filled />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed text-sm sm:text-base">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">
                      {testimonial.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground tracking-tight">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground tracking-normal">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <StarIcon className="w-5 h-5 text-primary" filled />
            <span className="font-semibold text-foreground">4.9</span>
            <span>na Google</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div>
            <span className="font-semibold text-foreground">500+</span>
            <span> spokojných klientov</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div>
            <span className="font-semibold text-foreground">10+</span>
            <span> rokov skúseností</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
