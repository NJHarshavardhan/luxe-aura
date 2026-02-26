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
    <AnimatedSection id="experience" className="py-24 sm:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-primary/40" />
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-foreground">
            Work <span className="text-primary">Experience</span>
          </h2>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-primary/40" />
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Timeline line with gradient */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-border to-transparent" />

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
              <div className="absolute left-2.5 sm:left-6.5 top-1">
                <div
                  className={`w-3 h-3 rounded-full border-2 ${
                    exp.current_working
                      ? "bg-primary border-primary"
                      : "bg-muted border-border"
                  }`}
                />
                {exp.current_working && (
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-primary animate-ping opacity-30" />
                )}
              </div>

              <div className="glass rounded-2xl p-6 hover:border-primary/20 transition-colors group">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">{exp.company}</h3>
                  {exp.current_working && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/15 text-primary font-body font-medium">
                      Current
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-body mb-4">
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-primary/60" /> {exp.role}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary/60" /> {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary/60" /> {exp.location}
                  </span>
                </div>

                <ul className="space-y-2">
                  {exp.achievements.map((a, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + j * 0.05 }}
                      className="text-sm text-muted-foreground font-body flex gap-2"
                    >
                      <span className="text-primary mt-0.5 shrink-0">▸</span>
                      {a}
                    </motion.li>
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
