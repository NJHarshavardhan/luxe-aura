import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { Briefcase, MapPin, Calendar } from "lucide-react";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  current_working?: boolean;
  achievements: string[];
}

interface ExperienceProps {
  experience: ExperienceItem[];
}

const Experience = ({ experience }: ExperienceProps) => {
  return (
    <AnimatedSection id="experience" className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-heading font-bold mb-16 text-center text-foreground"
        >
          Work <span className="text-primary">Experience</span>
        </motion.h2>

        <div className="max-w-3xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-border" />

          {experience.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative pl-12 sm:pl-20 pb-12 last:pb-0"
            >
              {/* Timeline dot */}
              <div
                className={`absolute left-2.5 sm:left-6.5 top-1 w-3 h-3 rounded-full border-2 ${
                  exp.current_working
                    ? "bg-primary border-primary animate-pulse-glow"
                    : "bg-muted border-border"
                }`}
              />

              <div className="glass rounded-2xl p-6">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="font-heading font-bold text-lg text-foreground">{exp.company}</h3>
                  {exp.current_working && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-body">
                      Current
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-body mb-4">
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" /> {exp.role}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {exp.location}
                  </span>
                </div>

                <ul className="space-y-2">
                  {exp.achievements.map((a, j) => (
                    <li key={j} className="text-sm text-muted-foreground font-body flex gap-2">
                      <span className="text-primary mt-0.5 shrink-0">▸</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Experience;
