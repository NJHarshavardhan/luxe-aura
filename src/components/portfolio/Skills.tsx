import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

interface SkillsProps {
  skills: Record<string, string[]>;
}

const categoryLabels: Record<string, string> = {
  languages: "Languages",
  frameworks: "Frameworks",
  apis: "APIs & Protocols",
  platforms: "Platforms & Cloud",
  databases: "Databases",
  ai_integration: "AI & ML",
  messaging: "Messaging",
};

const Skills = ({ skills }: SkillsProps) => {
  return (
    <AnimatedSection id="skills" className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-heading font-bold mb-16 text-center text-foreground"
        >
          Technical <span className="text-primary">Skills</span>
        </motion.h2>

        <div className="max-w-4xl mx-auto space-y-10">
          {Object.entries(skills).map(([category, items], catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1, duration: 0.5 }}
            >
              <h3 className="text-sm font-heading font-semibold text-primary uppercase tracking-wider mb-4">
                {categoryLabels[category] || category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {items.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIdx * 0.05 + i * 0.03, duration: 0.4 }}
                    whileHover={{
                      scale: 1.08,
                      boxShadow: "0 0 20px hsl(268 100% 84.5% / 0.25)",
                      y: -2,
                    }}
                    className="px-4 py-2 glass rounded-full text-sm font-body text-foreground cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Skills;
