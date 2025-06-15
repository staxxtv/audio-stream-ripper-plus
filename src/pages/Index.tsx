
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ConverterCard from '@/components/ConverterCard';
import FeaturesSection from '@/components/FeaturesSection';
import InstructionsSection from '@/components/InstructionsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <HeroSection />
          <ConverterCard />
          <FeaturesSection />
          <InstructionsSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
