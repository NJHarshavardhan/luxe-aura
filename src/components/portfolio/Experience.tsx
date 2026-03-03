import { motion } from "framer-motion";
import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import CodeBackground from "./CodeBackground";
import CardSwap, { Card } from "./CardSwap";
import { Briefcase, MapPin, Calendar, Building2, ChevronRight, Zap } from "lucide-react";
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

const ExperienceCard = ({ exp, index }: { exp: ExperienceItem; index: number }) => (
  <div className="p-6 h-full flex flex-col overflow-y-auto">
    {/* Header */}
    <div className="flex items-start gap-4 mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
        exp.current_working 
          ? "bg-gradient-to-br from-primary/30 to-accent/20 shadow-[0_0_20px_hsl(var(--primary)/0.3)]" 
          : "bg-primary/10"
      }`}>
        <Building2 className="w-6 h-6 text-primary" />
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <h3 className="font-heading font-bold text-lg text-foreground">{exp.company}</h3>
          {exp.current_working && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary font-body font-semibold uppercase tracking-wider flex items-center gap-1 border border-primary/20">
              <Zap className="w-2.5 h-2.5" /> Current
            </span>
          )}
        </div>
        <p className="text-sm text-foreground/80 font-body font-medium">{exp.role}</p>
      </div>
    </div>

    {/* Meta pills */}
    <div className="flex flex-wrap gap-2 mb-4">
      <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-secondary/80 text-foreground/70 font-body border border-border/40">
        <Calendar className="w-3 h-3 text-primary" /> {exp.period}
      </span>
      <span className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-secondary/80 text-foreground/70 font-body border border-border/40">
        <MapPin className="w-3 h-3 text-primary" /> {exp.location}
      </span>
    </div>

    {/* Divider */}
    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4" />

    {/* Achievements */}
    <div className="space-y-2 flex-grow">
      {exp.achievements.map((a, j) => (
        <div key={j} className="flex items-start gap-2">
          <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
            <ChevronRight className="w-3 h-3 text-primary" />
          </div>
          <span className="text-xs text-foreground/70 font-body leading-relaxed">{a}</span>
        </div>
      ))}
    </div>
  </div>
);

const Experience = ({ experience }: ExperienceProps) => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <AnimatedSection id="experience" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-20">
        <img src={experienceBg} alt="" className="w-full h-full object-cover opacity-[0.06] dark:opacity-[0.12]" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>
      <CodeBackground />

      <div className="container mx-auto px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
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

        {/* Desktop: CardSwap + Detail panel */}
        <div className="hidden md:flex items-start justify-center gap-16 max-w-5xl mx-auto">
          {/* CardSwap on left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-[420px] h-[380px] shrink-0"
          >
            <CardSwap
              width={380}
              height={340}
              cardDistance={50}
              verticalDistance={60}
              delay={6000}
              pauseOnHover={true}
              skewAmount={4}
              easing="elastic"
              onCardClick={(idx) => setActiveIdx(idx)}
            >
              {experience.map((exp, i) => (
                <Card key={exp.company} customClass="cursor-pointer">
                  <ExperienceCard exp={exp} index={i} />
                </Card>
              ))}
            </CardSwap>
          </motion.div>

          {/* Right: Details of currently active */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 max-w-md"
          >
            <div className="glass rounded-2xl p-8 border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-body text-muted-foreground uppercase tracking-widest">Experience Overview</span>
              </div>

              {experience.map((exp, i) => (
                <motion.div
                  key={exp.company}
                  initial={false}
                  animate={{
                    opacity: activeIdx === i ? 1 : 0.4,
                    scale: activeIdx === i ? 1 : 0.95
                  }}
                  className={`mb-4 p-4 rounded-xl transition-colors cursor-pointer ${
                    activeIdx === i ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setActiveIdx(i)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-heading font-semibold text-foreground text-sm">{exp.company}</h4>
                    {exp.current_working && (
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/20 text-primary font-semibold uppercase">Active</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground font-body">{exp.role}</p>
                  <p className="text-xs text-muted-foreground/60 font-body mt-1">{exp.period}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile: Stacked cards */}
        <div className="md:hidden space-y-6">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass rounded-2xl overflow-hidden border border-border/50"
            >
              <div className={`h-1 ${
                exp.current_working 
                  ? "bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-shimmer" 
                  : "bg-gradient-to-r from-primary/40 via-primary/20 to-transparent"
              }`} />
              <ExperienceCard exp={exp} index={i} />
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Experience;
