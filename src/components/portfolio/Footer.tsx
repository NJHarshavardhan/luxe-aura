import { motion } from "framer-motion";
import { ArrowUp, Linkedin, Github, Mail } from "lucide-react";

interface FooterProps {
  name: string;
  contact: {
    email: string;
    linkedin: string;
    github: string;
  };
}

const Footer = ({ name, contact }: FooterProps) => {
  const socials = [
    { icon: Github, href: contact.github, label: "GitHub" },
    { icon: Linkedin, href: contact.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${contact.email}`, label: "Email" },
  ];

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted-foreground font-body">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.1 }}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
              aria-label={s.label}
            >
              <s.icon className="w-4 h-4" />
            </motion.a>
          ))}
        </div>

        <motion.button
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
