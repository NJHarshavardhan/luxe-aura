import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, ExternalLink } from "lucide-react";
import AuroraBackground from "./AuroraBackground";
import FloatingParticles from "./FloatingParticles";
import MagneticButton from "./MagneticButton";
import GridPattern from "./GridPattern";

interface HeroProps {
  name: string;
  titles: string[];
  about: string;
}

const Hero = ({ name, titles, about }: HeroProps) => {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [titles.length]);

  const firstLine = about.split(".")[0] + ".";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Layered backgrounds */}
      <AuroraBackground speed={0.8} />
      <FloatingParticles count={30} />
      <GridPattern />

      {/* Decorative orbs */}
      <div className="absolute top-20 right-[15%] w-[400px] h-[400px] rounded-full bg-primary/8 blur-3xl animate-blob" />
      <div className="absolute bottom-20 left-[10%] w-[350px] h-[350px] rounded-full bg-accent/10 blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute top-1/3 left-1/4 w-[200px] h-[200px] rounded-full bg-primary/5 blur-2xl animate-float" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 -z-5 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm text-muted-foreground font-body">Available for opportunities</span>
          </motion.div>

          {/* Name with staggered letters */}
          <motion.h1
            className="text-5xl sm:text-7xl lg:text-8xl font-heading font-bold mb-6 text-foreground"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.04 } },
            }}
          >
            {name.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 50, rotateX: -90 },
                  visible: { opacity: 1, y: 0, rotateX: 0 },
                }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Rotating title */}
          <div className="h-10 mb-8 overflow-hidden">
            <motion.p
              key={titleIndex}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-2xl font-heading text-primary font-medium"
            >
              {titles[titleIndex]}
            </motion.p>
          </div>

          {/* Short intro */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-muted-foreground max-w-2xl mx-auto mb-10 text-base sm:text-lg leading-relaxed font-body"
          >
            {firstLine}
          </motion.p>

          {/* CTA buttons with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <MagneticButton strength={0.2}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium flex items-center gap-2 cursor-pointer shadow-[0_0_30px_hsl(var(--ring)/0.25)] hover:shadow-[0_0_50px_hsl(var(--ring)/0.4)] transition-shadow"
              >
                View Projects <ExternalLink className="w-4 h-4" />
              </motion.button>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-3 glass rounded-full font-medium text-foreground flex items-center gap-2 cursor-pointer hover:border-primary/40 transition-colors"
              >
                Contact Me
              </motion.button>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ArrowDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
