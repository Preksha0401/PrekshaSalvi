import CurtainWipe from "@/components/CurtainWipe";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import Terminal from "@/components/Terminal";
import SkillsGrid from "@/components/SkillsGrid";
import ProjectsGrid from "@/components/ProjectsGrid";
import UIUXProjects from "@/components/UIUXProjects";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <CurtainWipe />
    <CustomCursor />
    <Navbar />
    <HeroSection />
    <AboutSection />
    <Terminal />
    <SkillsGrid />
    <ProjectsGrid />
    <UIUXProjects />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;