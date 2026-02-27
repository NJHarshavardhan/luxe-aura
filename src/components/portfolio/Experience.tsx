import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import CodeBackground from "./CodeBackground";
import { Briefcase, MapPin, Calendar, Building2, ChevronRight, Zap } from "lucide-react";

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
      <CodeBackground />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="container mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full mb-4 text-sm text-muted-foreground font-body"
          >
            <Briefcase className="w-3.5 h-3.5 text-primary" />
            Career Journey
          </motion.span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-foreground">
            Work <span className="text-primary">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Central timeline line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

          {experience.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="relative pl-16 sm:pl-20 pb-12 last:pb-0 group"
            >
              {/* Timeline node */}
              <div className="absolute left-6 sm:left-8 top-1 -translate-x-1/2">
                <div className={`w-4 h-4 rounded-full border-2 border-primary ${
                  exp.current_working 
                    ? "bg-primary animate-pulse-glow shadow-[0_0_12px_hsl(var(--primary)/0.5)]" 
                    : "bg-background"
                } transition-all`} />
                {/* Connector line to card */}
                <div className="absolute top-1.5 left-full w-6 sm:w-8 h-px bg-primary/30" />
              </div>

              {/* Experience card */}
              <div className="relative glass rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 group-hover:shadow-[0_8px_40px_hsl(var(--primary)/0.08)]">
                {/* Gradient top bar */}
                <div className={`h-1 ${
                  exp.current_working 
                    ? "bg-gradient-to-r from-primary via-primary/60 to-accent" 
                    : "bg-gradient-to-r from-primary/30 to-transparent"
                }`} />

                <div className="p-5 sm:p-7">
                  {/* Company header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-heading font-bold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors">
                            {exp.company}
                          </h3>
                          {exp.current_working && (
                            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-primary/15 text-primary font-body font-semibold uppercase tracking-wider flex items-center gap-1">
                              <Zap className="w-2.5 h-2.5" /> Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm sm:text-base text-foreground/80 font-body font-medium">
                          {exp.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:shrink-0">
                      <span className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-secondary/80 text-foreground/70 font-body">
                        <Calendar className="w-3 h-3 text-primary" /> {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-secondary/80 text-foreground/70 font-body">
                        <MapPin className="w-3 h-3 text-primary" /> {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-border via-primary/20 to-transparent mb-4" />

                  {/* Achievements */}
                  <ul className="space-y-2.5">
                    {exp.achievements.map((a, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + j * 0.05 }}
                        className="text-sm text-foreground/70 font-body flex items-start gap-2.5 group/item hover:text-foreground transition-colors"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0 group-hover/item:translate-x-1 transition-transform" />
                        <span className="leading-relaxed">{a}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Experience;
