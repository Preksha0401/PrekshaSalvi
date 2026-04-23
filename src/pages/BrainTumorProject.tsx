import { useEffect } from "react";
import BrainNavBar from "@/components/brain-tumor/BrainNavBar";
import BrainHeroSection from "@/components/brain-tumor/BrainHeroSection";
import ProblemSection from "@/components/brain-tumor/ProblemSection";
import SolutionSection from "@/components/brain-tumor/SolutionSection";
import HowItWorksSection from "@/components/brain-tumor/HowItWorksSection";
import TimelineSection from "@/components/brain-tumor/TimelineSection";
import FeaturesSection from "@/components/brain-tumor/FeaturesSection";
import ScreenshotsSection from "@/components/brain-tumor/ScreenshotsSection";
import ChallengesSection from "@/components/brain-tumor/ChallengesSection";
import TechStackSection from "@/components/brain-tumor/TechStackSection";
import DemoVideoSection from "@/components/brain-tumor/DemoVideoSection";
import BackToTop from "@/components/brain-tumor/BackToTop";
import CustomCursor from "@/components/CustomCursor";

const BrainTumorProject = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#05020e] text-white overflow-x-hidden">
      <CustomCursor />
      <BrainNavBar />
      <BrainHeroSection />
      <ProblemSection />
      <SolutionSection />
      <HowItWorksSection />
      <TimelineSection />
      <FeaturesSection />
      <ScreenshotsSection />
      <ChallengesSection />
      <TechStackSection />
      <DemoVideoSection />
      <BackToTop />
    </div>
  );
};

export default BrainTumorProject;
