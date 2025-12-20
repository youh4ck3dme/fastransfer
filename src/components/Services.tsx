import { motion } from 'framer-motion';
import { 
  PlaneIcon, 
  BuildingIcon, 
  GroupIcon, 
  CalendarIcon, 
  ShieldIcon, 
  ClockIcon 
} from '@/components/icons/ServiceIcons';

const services = [
  {
    Icon: PlaneIcon,
    title: 'Letiskové transfery',
    description: 'Pohodlný transfer na všetky európske letiská. Viedeň, Budapešť, Praha a ďalšie.',
    features: ['Sledovanie letov', 'Tabuľka s menom', 'Pomoc s batožinou'],
  },
  {
    Icon: BuildingIcon,
    title: 'Firemná preprava',
    description: 'Profesionálna preprava pre vašich klientov, partnerov a zamestnancov.',
    features: ['Fakturácia', 'Dlhodobé zmluvy', 'Prémiové vozidlá'],
  },
  {
    Icon: GroupIcon,
    title: 'Skupinové transfery',
    description: 'Preprava väčších skupín v komfortných minivanoch a autobusoch.',
    features: ['Až 8 osôb', 'Veľký batožinový priestor', 'WiFi na palube'],
  },
  {
    Icon: CalendarIcon,
    title: 'Eventy & Svadby',
    description: 'Exkluzívna preprava pre špeciálne príležitosti s maximálnou eleganciou.',
    features: ['Dekorácia vozidla', 'Šampanské', 'Červený koberec'],
  },
  {
    Icon: ShieldIcon,
    title: 'VIP Security',
    description: 'Diskrétna preprava s maximálnou bezpečnosťou pre náročných klientov.',
    features: ['Pancierové vozidlá', 'Školený personál', 'Absolútna diskrétnosť'],
  },
  {
    Icon: ClockIcon,
    title: 'Hodinový prenájom',
    description: 'Flexibilný prenájom vozidla s vodičom na celý deň alebo niekoľko hodín.',
    features: ['Od 2 hodín', 'Bez kilometrového limitu', 'Čakanie zahrnuté'],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

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
            Naše služby
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6">
            Prémiová preprava pre
            <span className="text-gradient-gold"> každú príležitosť</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Od letiskových transferov po exkluzívne VIP služby. Vždy s maximálnym komfortom a profesionalitou.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-gradient-card gold-border hover:border-primary/50 transition-all duration-500 hover:shadow-gold">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <service.Icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
