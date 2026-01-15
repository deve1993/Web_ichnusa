import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import WeOffer from "@/components/sections/WeOffer";
import SpecialDish from "@/components/sections/SpecialDish";
import Menu from "@/components/sections/Menu";
import InfoCards from "@/components/sections/InfoCards";
import Testimonials from "@/components/sections/Testimonials";
import Reservation from "@/components/sections/Reservation";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WeOffer />
        <SpecialDish />
        <Menu />
        <InfoCards />
        <Testimonials />
        <Reservation />
      </main>
      <Footer />
    </>
  );
}
