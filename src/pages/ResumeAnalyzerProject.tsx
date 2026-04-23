import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, ExternalLink, Github, FileText, Cpu, BarChart, 
  CheckCircle, Zap, Shield, Image as ImageIcon, ChevronRight 
} from "lucide-react";

const ResumeAnalyzerProject = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    {
      icon: <FileText className="w-8 h-8 text-pink-500" />,
      title: "Intelligent Parsing",
      description: "Extracts text from various resume formats (PDF, DOCX) and structures it for seamless processing."
    },
    {
      icon: <Cpu className="w-8 h-8 text-purple-500" />,
      title: "AI Keyword Matching",
      description: "Uses NLP models to compare extracted resume content against specific job descriptions."
    },
    {
      icon: <BarChart className="w-8 h-8 text-pink-500" />,
      title: "Score Generation",
      description: "Outputs a compatibility score and highlights missing keywords to help candidates improve."
    }
  ];

  const techStack = {
    frontend: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    backend: ["Python", "FastAPI", "PostgreSQL"],
    tools: ["Spacy", "HuggingFace Transformers", "Docker", "AWS"]
  };

  const challenges = [
    {
      title: "Complex Formatting",
      problem: "Resumes come in wild varieties of formats, making accurate text extraction difficult.",
      solution: "Implemented a multi-step OCR and heuristic pipeline to handle PDFs and word docs efficiently."
    },
    {
      title: "Semantic Understanding",
      problem: "Simple keyword matching failed to understand context (e.g., 'React' vs 'React Native').",
      solution: "Integrated contextual word embeddings using transformer models to capture true semantic meaning."
    }
  ];

  return (
    <div className="min-h-screen bg-[#060814] text-gray-200 font-body selection:bg-pink-500/30 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#060814]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
            Portfolio
          </Link>
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <Link to="/" className="hover:text-pink-400 transition-colors">Home</Link>
            <Link to="/#projects" className="text-white">Projects</Link>
            <Link to="/#contact" className="hover:text-pink-400 transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          
          {/* Back Button */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <Link to="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors mb-12">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.section 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
            className="mb-24 relative"
          >
            {/* Background glow */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-pink-600/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />

            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
              AI Resume <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">Analyzer</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
              An advanced NLP-based tool that evaluates resumes against job descriptions, providing instant feedback and compatibility scores.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="#" className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium hover:opacity-90 transition-opacity">
                Live Demo <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              <a href="#" className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors">
                View Code <Github className="w-4 h-4 ml-2" />
              </a>
            </div>
          </motion.section>

          {/* Project Overview */}
          <motion.section 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            className="mb-24 bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-pink-500/5 to-transparent pointer-events-none" />
            <h2 className="text-3xl font-display font-bold mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-3 text-pink-500" /> Executive Summary
            </h2>
            <div className="space-y-6 text-gray-400 leading-relaxed max-w-3xl text-lg">
              <p>
                The AI Resume Analyzer bridges the gap between job seekers and Applicant Tracking Systems (ATS). It simulates how hiring software ranks incoming applications by parsing raw resume files and benchmarking them against targeted job descriptions.
              </p>
              <p>
                Built to solve the frustrating "black box" of modern recruiting, this tool empowers candidates to optimize their language, highlighting missing crucial keywords and improving their chances of passing automated screenings before human review.
              </p>
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.section 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="mb-24"
          >
            <motion.h2 variants={fadeIn} className="text-3xl font-display font-bold mb-10">Core Features</motion.h2>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeIn}
                  className="bg-[#0a0d1f] border border-white/5 p-8 rounded-2xl hover:border-pink-500/30 transition-colors group relative overflow-hidden"
                >
                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-colors" />
                  <div className="mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Tech Stack */}
          <motion.section 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            className="mb-24"
          >
            <h2 className="text-3xl font-display font-bold mb-10">Tech Stack</h2>
            <div className="grid md:grid-cols-3 gap-8 p-8 bg-white/[0.02] border border-white/5 rounded-3xl">
              <div>
                <h3 className="text-pink-400 font-semibold mb-4 flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.frontend.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-white/5 rounded-full text-sm hover:bg-white/10 transition-colors">{tech}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-purple-400 font-semibold mb-4 flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.backend.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-white/5 rounded-full text-sm hover:bg-white/10 transition-colors">{tech}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-cyan-400 font-semibold mb-4 flex items-center"><CheckCircle className="w-4 h-4 mr-2" /> Tools & Libraries</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.tools.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-white/5 rounded-full text-sm hover:bg-white/10 transition-colors">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Screenshots Grid */}
          <motion.section 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            className="mb-24"
          >
            <h2 className="text-3xl font-display font-bold mb-10">Project Interface</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group relative rounded-2xl overflow-hidden bg-[#0c1024] border border-white/5 aspect-video flex items-center justify-center">
                  {/* Placeholder for actual screenshots */}
                  <ImageIcon className="w-12 h-12 text-gray-700 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060814] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <p className="text-sm font-medium text-white/90">Dashboard View {i}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Challenges & Learnings */}
          <motion.section 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            className="mb-24"
          >
            <h2 className="text-3xl font-display font-bold mb-10">Challenges & Learnings</h2>
            <div className="space-y-6">
              {challenges.map((item, idx) => (
                <div key={idx} className="bg-[#0a0d1f] border-l-4 border-purple-500 p-8 rounded-r-2xl">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-3 text-purple-400" /> {item.title}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <span className="text-pink-400 font-semibold block mb-2 uppercase tracking-wider text-xs">The Challenge</span>
                      <p className="text-gray-400">{item.problem}</p>
                    </div>
                    <div>
                      <span className="text-green-400 font-semibold block mb-2 uppercase tracking-wider text-xs">The Solution</span>
                      <p className="text-gray-400">{item.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Results / Impact */}
          <motion.section 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            className="mb-24 bg-gradient-to-br from-pink-500/10 to-purple-600/10 border border-white/10 rounded-3xl p-10 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            <h2 className="text-3xl font-display font-bold mb-8">Results & Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="p-4">
                <div className="text-4xl font-bold text-white mb-2">95%</div>
                <div className="text-sm text-pink-300">Parsing Accuracy</div>
              </div>
              <div className="p-4">
                <div className="text-4xl font-bold text-white mb-2">&lt;2s</div>
                <div className="text-sm text-purple-300">Processing Time</div>
              </div>
              <div className="p-4">
                <div className="text-4xl font-bold text-white mb-2">30+</div>
                <div className="text-sm text-pink-300">Supported Formats</div>
              </div>
              <div className="p-4">
                <div className="text-4xl font-bold text-white mb-2">10k+</div>
                <div className="text-sm text-purple-300">Resumes Analyzed</div>
              </div>
            </div>
          </motion.section>

          {/* Final CTA */}
          <motion.section 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            className="text-center py-16 border-t border-white/10"
          >
            <h2 className="text-3xl font-display font-bold mb-6">Want to see it in action?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Explore the live project, test it with your own resume, or dive deep into the open-source repository.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="inline-flex items-center px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors">
                View Live Project <ChevronRight className="w-5 h-5 ml-1" />
              </a>
              <Link to="/" className="inline-flex items-center px-8 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-colors">
                Explore More Projects
              </Link>
            </div>
          </motion.section>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} Your Name. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
};

export default ResumeAnalyzerProject;
