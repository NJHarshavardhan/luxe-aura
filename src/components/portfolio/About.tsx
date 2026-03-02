import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import AnimatedSection from "./AnimatedSection";
import SpotlightCard from "./SpotlightCard";
import GridPattern from "./GridPattern";
import CodeBackground from "./CodeBackground";
import aboutDecoration from "@/assets/about-decoration.jpg";
import { Trophy, Target, Users, Coffee, Code, Smartphone, Server, Brain, Bot, Monitor } from "lucide-react";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Trophy, Target, Users, Coffee,
};

const roleIcons: React.FC<{ className?: string }>[] = [Code, Smartphone, Monitor, Server, Brain, Bot];

interface Stat {
  icon: string;
  label: string;
  value: string;
}

interface Role {
  title: string;
  description: string;
}

interface AboutProps {
  about: string;
  stats: Stat[];
  roles: Role[];
}

const Counter = ({ value }: { value: string }) => {
  const numericMatch = value.match(/(\d+)/);
  const num = numericMatch ? parseInt(numericMatch[1]) : 0;
  const suffix = value.replace(/\d+/, "");
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let current = 0;
          const step = Math.max(1, Math.floor(num / 40));
          const interval = setInterval(() => {
            current += step;
            if (current >= num) {
              setCount(num);
              clearInterval(interval);
            } else {
              setCount(current);
            }
          }, 30);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [num]);

  if (value === "∞") return <span className="text-4xl font-heading font-bold text-foreground">∞</span>;

  return (
    <span ref={ref} className="text-4xl font-heading font-bold text-foreground">
      {count}{suffix}
    </span>
  );
};

const About = ({ about, stats, roles }: AboutProps) => {
  return (
    <AnimatedSection id="about" className="py-24 sm:py-32 relative overflow-hidden">
      <GridPattern />
      <CodeBackground />
      
      {/* Decorative floating image */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.06] dark:opacity-[0.1] -z-10 rotate-12">
        <img src={aboutDecoration} alt="" className="w-full h-full object-cover rounded-3xl" loading="lazy" />
      </div>
      
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-primary/40" />
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-foreground">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-primary/40" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 mb-20">
          {/* Bio with styled quote */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 relative"
          >
            <div className="absolute -left-4 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-primary via-primary/40 to-transparent" />
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg font-body pl-6">
              {about}
            </p>
          </motion.div>

          {/* Stats with spotlight effect */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {stats.map((stat, i) => {
              const Icon = iconMap[stat.icon] || Trophy;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <SpotlightCard className="glass rounded-2xl p-5 text-center flex flex-col items-center gap-2 h-full">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-1">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <Counter value={stat.value} />
                    <span className="text-xs text-muted-foreground font-body">{stat.label}</span>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Roles with icons and spotlight */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role, i) => {
            const RoleIcon = roleIcons[i % roleIcons.length];
            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <SpotlightCard className="glass rounded-2xl p-6 cursor-default h-full group hover:border-primary/20 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <RoleIcon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{role.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{role.description}</p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default About;
