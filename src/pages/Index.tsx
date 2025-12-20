import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Fleet from '@/components/Fleet';
import Pricing from '@/components/Pricing';
import BookingForm from '@/components/BookingForm';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>FastTransfer | VIP Preprava & Luxusné Letiskové Transfery na Slovensku</title>
        <meta 
          name="description" 
          content="Prémiová VIP preprava na Slovensku. Letiskové transfery Viedeň, Budapešť, Praha. Luxusné vozidlá Mercedes & BMW. 24/7 dostupnosť. Profesionálni vodiči." 
        />
        <meta name="keywords" content="VIP preprava, letiskový transfer, Bratislava Viedeň, luxusná preprava, firemná preprava, Mercedes limuzína" />
        <link rel="canonical" href="https://fastransfer.sk" />
        <meta property="og:title" content="FastTransfer | VIP Preprava Slovensko" />
        <meta property="og:description" content="Prémiová VIP preprava s luxusnými vozidlami. Letiskové transfery, firemná preprava, eventy." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Services />
          <Fleet />
          <Pricing />
          <Testimonials />
          <BookingForm />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
