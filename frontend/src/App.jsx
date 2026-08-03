import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import ProductIntro from './components/ProductIntro.jsx';
import SkinScanDemo from './components/SkinScanDemo.jsx';
import AnalysisMetrics from './components/AnalysisMetrics.jsx';
import FaceMapping from './components/FaceMapping.jsx';
import PersonalizedRoutine from './components/PersonalizedRoutine.jsx';
import Technology from './components/Technology.jsx';
import UseCases from './components/UseCases.jsx';
import Pricing from './components/Pricing.jsx';
import FAQ from './components/FAQ.jsx';
import FinalCTA from './components/FinalCTA.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <div className="app-shell bg-lumi-black text-lumi-text">
      <Navbar />
      <main>
        <Hero />
        <ProductIntro />
        <SkinScanDemo />
        <AnalysisMetrics />
        <FaceMapping />
        <PersonalizedRoutine />
        <Technology />
        <UseCases />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
