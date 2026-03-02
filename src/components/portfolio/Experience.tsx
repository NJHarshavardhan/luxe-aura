import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import CodeBackground from "./CodeBackground";
import { Briefcase, MapPin, Calendar, Building2, ChevronRight, Zap, Sparkles } from "lucide-react";
import experienceBg from "@/assets/experience-bg.jpg";

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
    <AnimatedSection id="experience" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 -z-20">
        <img
          src={experienceBg}
          alt=""
          className="w-full h-full object-cover opacity-[0.06] dark:opacity-[0.12]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <CodeBackground />

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

        {/* Experience Cards - Bento Grid Style */}
        <div className="max-w-5xl mx-auto space-y-8">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="group relative"
            >
              {/* Main card */}
              <div className="relative rounded-3xl overflow-hidden border border-border/60 bg-card/40 backdrop-blur-xl hover:border-primary/30 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.15)]">
                {/* Animated gradient border top */}
                <div className={`h-1.5 ${
                  exp.current_working 
                    ? "bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-shimmer" 
                    : "bg-gradient-to-r from-primary/40 via-primary/20 to-transparent"
                }`} />

                <div className="p-6 sm:p-8">
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-6">
                    {/* Company icon */}
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${
                        exp.current_working 
                          ? "bg-gradient-to-br from-primary/20 to-accent/20 shadow-[0_0_30px_hsl(var(--primary)/0.2)]" 
                          : "bg-primary/10"
                      }`}
                    >
                      <Building2 className="w-7 h-7 text-primary" />
                    </motion.div>

                    {/* Company info */}
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <h3 className="font-heading font-bold text-xl sm:text-2xl text-foreground group-hover:text-primary transition-colors">
                          {exp.company}
                        </h3>
                        {exp.current_working && (
                          <motion.span
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-[10px] px-3 py-1 rounded-full bg-primary/15 text-primary font-body font-semibold uppercase tracking-wider flex items-center gap-1.5 border border-primary/20"
                          >
                            <Zap className="w-2.5 h-2.5" /> Currently Working
                          </motion.span>
                        )}
                      </div>
                      <p className="text-base sm:text-lg text-foreground/80 font-body font-medium mb-3">
                        {exp.role}
                      </p>
                      
                      {/* Meta info pills */}
                      <div className="flex flex-wrap gap-2">
                        <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-secondary/80 text-foreground/70 font-body border border-border/40">
                          <Calendar className="w-3 h-3 text-primary" /> {exp.period}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-secondary/80 text-foreground/70 font-body border border-border/40">
                          <MapPin className="w-3 h-3 text-primary" /> {exp.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

                  {/* Achievements - 2 column on desktop */}
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                    {exp.achievements.map((a, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + j * 0.05 }}
                        className="flex items-start gap-3 group/item"
                      >
                        <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-primary/20 transition-colors">
                          <ChevronRight className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm text-foreground/70 font-body leading-relaxed hover:text-foreground transition-colors">
                          {a}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03]" />
              </div>

              {/* Connection line between cards */}
              {i < experience.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="w-px h-8 bg-gradient-to-b from-primary/30 to-transparent" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Experience;
