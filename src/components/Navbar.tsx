import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const links = [
  { label: "Home", href: "#hero" },
  { label: "Journey", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => (
  <motion.nav
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.9, duration: 0.5 }}
    className="fixed top-0 left-0 right-0 z-[500] h-[68px] flex items-center justify-between px-5 md:px-14 border-b border-border"
    style={{ background: "hsla(260,60%,5%,0.88)", backdropFilter: "blur(22px)" }}
  >
    <a href="#hero" className="flex items-center gap-2.5 no-underline hoverable">
<img
  src={logo}
  alt="Logo"
  className="w-14 h-14 md:w-16 md:h-16 object-contain"
  style={{ filter: "drop-shadow(0 4px 12px hsla(306,55%,33%,0.4))" }}
/>      
    </a>
    <ul className="hidden md:flex gap-8 list-none">
      {links.map((l) => (
        <li key={l.href}>
          <a
            href={l.href}
            className="font-body text-[15px] font-medium tracking-wide text-muted-foreground hover:text-accent transition-colors duration-200 hoverable"
          >
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  </motion.nav>
);

export default Navbar;
