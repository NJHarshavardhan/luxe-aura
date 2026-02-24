import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import { GraduationCap, MapPin } from "lucide-react";

interface EducationItem {
  school: string;
  degree: string;
  period: string;
  location: string;
  grade: string;
}

interface EducationProps {
  education: EducationItem[];
}

const Education = ({ education }: EducationProps) => {
  return (
    <AnimatedSection id="education" className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-heading font-bold mb-16 text-center text-foreground"
        >
          <span className="text-primary">Education</span>
        </motion.h2>

        <div className="max-w-2xl mx-auto space-y-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground font-body mt-1">{edu.school}</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground font-body">
                    <span>{edu.period}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {edu.location}
                    </span>
                    <span className="text-primary font-medium">{edu.grade}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Education;
