import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import AnimatedSection from "./AnimatedSection";
import { Mail, Linkedin, Github, Phone, Send, CheckCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  phone: string;
}

interface ContactProps {
  contact: ContactInfo;
}

const Contact = ({ contact }: ContactProps) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("sending");

    // For now, simulate send — will integrate edge function later
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  const links = [
    { icon: Mail, label: "Email", href: `mailto:${contact.email}`, text: contact.email },
    { icon: Linkedin, label: "LinkedIn", href: contact.linkedin, text: "LinkedIn Profile" },
    { icon: Github, label: "GitHub", href: contact.github, text: "GitHub Profile" },
    { icon: Phone, label: "Phone", href: `tel:${contact.phone}`, text: contact.phone },
  ];

  return (
    <AnimatedSection id="contact" className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-heading font-bold mb-16 text-center text-foreground"
        >
          Get in <span className="text-primary">Touch</span>
        </motion.h2>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {(["name", "email", "message"] as const).map((field) => (
              <div key={field}>
                <motion.label
                  className="text-sm font-body text-muted-foreground mb-1 block capitalize"
                  whileFocus={{ color: "hsl(268 100% 84.5%)" }}
                >
                  {field}
                </motion.label>
                {field === "message" ? (
                  <motion.textarea
                    whileFocus={{ boxShadow: "0 0 0 2px hsl(268 100% 84.5% / 0.3)" }}
                    rows={5}
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full px-4 py-3 glass rounded-xl text-foreground font-body resize-none outline-none focus:border-primary transition-all bg-transparent"
                    placeholder={`Your ${field}...`}
                  />
                ) : (
                  <motion.input
                    whileFocus={{ boxShadow: "0 0 0 2px hsl(268 100% 84.5% / 0.3)" }}
                    type={field === "email" ? "email" : "text"}
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full px-4 py-3 glass rounded-xl text-foreground font-body outline-none focus:border-primary transition-all bg-transparent"
                    placeholder={`Your ${field}...`}
                  />
                )}
                {errors[field] && (
                  <p className="text-xs text-destructive mt-1 font-body">{errors[field]}</p>
                )}
              </div>
            ))}

            <motion.button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 transition-opacity"
            >
              {status === "sending" ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                />
              ) : status === "sent" ? (
                <>
                  <CheckCircle className="w-5 h-5" /> Message Sent!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Send Message
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 flex flex-col justify-center"
          >
            <p className="text-muted-foreground font-body mb-4">
              Feel free to reach out through any of these channels. I'm always open to discussing new projects and opportunities.
            </p>
            {links.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                whileHover={{ x: 6, boxShadow: "0 10px 30px -10px hsl(268 100% 84.5% / 0.15)" }}
                className="glass rounded-xl p-4 flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <link.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-body">{link.label}</p>
                  <p className="text-sm font-body text-foreground">{link.text}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Contact;
