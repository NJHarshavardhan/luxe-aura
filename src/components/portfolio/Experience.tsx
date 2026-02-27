import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import SpotlightCard from "./SpotlightCard";
import GridPattern from "./GridPattern";
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
      <GridPattern />
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

        <div className="max-w-5xl mx-auto space-y-8">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            >
              <SpotlightCard className="glass rounded-2xl overflow-hidden group hover:border-primary/30 transition-all duration-300">
                {/* Top accent bar for current */}
                {exp.current_working && (
                  <div className="h-1 bg-gradient-to-r from-primary via-primary/60 to-accent" />
                )}

                <div className="p-6 sm:p-8">
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-heading font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                            {exp.company}
                          </h3>
                          {exp.current_working && (
                            <span className="text-[10px] px-3 py-1 rounded-full bg-primary/15 text-primary font-body font-semibold uppercase tracking-wider">
                              ● Current
                            </span>
                          )}
                        </div>
                        <p className="text-base text-foreground/80 font-body font-medium mt-1">
                          {exp.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-3 sm:shrink-0">
                      <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-secondary/80 text-foreground/70 font-body">
                        <Calendar className="w-3 h-3 text-primary" /> {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-secondary/80 text-foreground/70 font-body">
                        <MapPin className="w-3 h-3 text-primary" /> {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-5" />

                  {/* Achievements grid */}
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                    {exp.achievements.map((a, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 + j * 0.04 }}
                        className="text-sm text-foreground/70 font-body flex gap-2.5 group/item hover:text-foreground transition-colors"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform" />
                        <span>{a}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Experience;
