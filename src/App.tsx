import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import BrainTumorProject from "./pages/BrainTumorProject.tsx";
import ResumeAnalyzerProject from "./pages/ResumeAnalyzerProject.tsx";
import WellSphereProject from "./pages/wellsphere/WellSphereProject.tsx";
import MIndicatorProject from "./pages/MIndicatorCaseStudy.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/brain-tumor-detection" element={<BrainTumorProject />} />
          <Route path="/resume-analyzer" element={<ResumeAnalyzerProject />} />
          <Route path="/wellsphere" element={<WellSphereProject />} />
          <Route path="/m-indicator" element={<MIndicatorProject />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
