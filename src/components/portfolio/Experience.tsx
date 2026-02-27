import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import SpotlightCard from "./SpotlightCard";
import { Briefcase, MapPin, Calendar, Building2, ArrowUpRight } from "lucide-react";

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
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl -z-10" />

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

        <div className="max-w-4xl mx-auto relative">
          {/* Central timeline line */}
          <div className="absolute left-6 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5">
            <div className="h-full bg-gradient-to-b from-primary via-primary/40 to-transparent rounded-full" />
          </div>

          {experience.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                className={`relative mb-12 last:mb-0 pl-16 sm:pl-0 sm:w-1/2 ${
                  isLeft ? "sm:pr-12 sm:ml-0" : "sm:pl-12 sm:ml-auto"
                }`}
              >
                {/* Timeline node */}
                <div className={`absolute top-6 left-4 sm:left-auto ${
                  isLeft ? "sm:right-[-9px]" : "sm:left-[-9px]"
                }`}>
                  <div className="relative">
                    <div
                      className={`w-[18px] h-[18px] rounded-full border-[3px] transition-colors ${
                        exp.current_working
                          ? "bg-primary border-primary shadow-[0_0_12px_hsl(268_100%_84.5%/0.5)]"
                          : "bg-card border-border hover:border-primary/60"
                      }`}
                    />
                    {exp.current_working && (
                      <div className="absolute inset-0 w-[18px] h-[18px] rounded-full bg-primary animate-ping opacity-20" />
                    )}
                  </div>
                </div>

                {/* Connector line (mobile) */}
                <div className="absolute left-[23px] top-6 w-8 h-px bg-border sm:hidden" />

                <SpotlightCard className="glass rounded-2xl overflow-hidden group hover:border-primary/25 transition-all duration-300">
                  {/* Card header with gradient */}
                  <div className="px-6 pt-6 pb-4 relative">
                    {exp.current_working && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
                    )}
                    
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                            {exp.company}
                          </h3>
                          <p className="text-sm text-primary/80 font-body font-medium">{exp.role}</p>
                        </div>
                      </div>
                      {exp.current_working && (
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-primary/15 text-primary font-body font-semibold uppercase tracking-wider whitespace-nowrap animate-pulse-glow">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground font-body">
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/60">
                        <Calendar className="w-3 h-3 text-primary/60" /> {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/60">
                        <MapPin className="w-3 h-3 text-primary/60" /> {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="mx-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                  {/* Achievements */}
                  <div className="px-6 py-4">
                    <ul className="space-y-2.5">
                      {exp.achievements.map((a, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + j * 0.05 }}
                          className="text-sm text-muted-foreground font-body flex gap-2.5 group/item"
                        >
                          <ArrowUpRight className="w-3.5 h-3.5 text-primary/50 mt-0.5 shrink-0 group-hover/item:text-primary transition-colors" />
                          <span className="group-hover/item:text-foreground transition-colors">{a}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Experience;
