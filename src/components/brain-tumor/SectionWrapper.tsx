import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** extra top/bottom padding override */
  py?: string;
}

const SectionWrapper = ({ id, children, className = "", py = "py-24 md:py-32" }: Props) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id={id}
      className={`relative ${py} px-6 md:px-12 lg:px-20 max-w-7xl mx-auto ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;
