import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import AnimatedSection from "./AnimatedSection";
import { Trophy, Target, Users, Coffee } from "lucide-react";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Trophy, Target, Users, Coffee,
};

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

  if (value === "∞") return <span className="text-3xl font-heading font-bold text-foreground">∞</span>;

  return (
    <span ref={ref} className="text-3xl font-heading font-bold text-foreground">
      {count}{suffix}
    </span>
  );
};

const About = ({ about, stats, roles }: AboutProps) => {
  return (
    <AnimatedSection id="about" className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-heading font-bold mb-16 text-center text-foreground"
        >
          About <span className="text-primary">Me</span>
        </motion.h2>

        <div className="grid lg:grid-cols-5 gap-12 mb-20">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg font-body">
              {about}
            </p>
          </motion.div>

          {/* Stats */}
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
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-5 text-center flex flex-col items-center gap-2"
                >
                  <Icon className="w-6 h-6 text-primary" />
                  <Counter value={stat.value} />
                  <span className="text-xs text-muted-foreground font-body">{stat.label}</span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Roles */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px -12px hsl(268 100% 84.5% / 0.15)" }}
              className="glass rounded-2xl p-6 cursor-default"
            >
              <h3 className="font-heading font-semibold text-foreground mb-2">{role.title}</h3>
              <p className="text-sm text-muted-foreground font-body">{role.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default About;
