import { motion } from "framer-motion";

const codeSnippets = [
  "const app = express();",
  "import React from 'react';",
  "async function getData() {",
  "  return await fetch(url);",
  "export default App;",
  "npm install",
  "git commit -m 'feat'",
  "const [state, setState]",
  "useEffect(() => {",
  "  console.log('hello');",
  "interface Props {",
  "  name: string;",
  "docker build -t app .",
  "SELECT * FROM users",
  "flutter run --release",
  "pip install fastapi",
  "def main():",
  "class Component:",
  "=> res.json(data)",
  "module.exports = {",
  "<div className={cn(",
  "  variants: {",
  "const router = express",
  "app.listen(3000);",
];

const CodeBackground = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden pointer-events-none ${className}`}>
      {/* Code text floating in background */}
      {codeSnippets.map((snippet, i) => {
        const row = Math.floor(i / 4);
        const col = i % 4;
        return (
          <motion.span
            key={i}
            className="absolute font-mono text-[10px] sm:text-xs text-primary/[0.06] dark:text-primary/[0.08] whitespace-nowrap select-none"
            style={{
              top: `${8 + row * 16}%`,
              left: `${5 + col * 24}%`,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.8 }}
          >
            {snippet}
          </motion.span>
        );
      })}

      {/* Bracket decorations */}
      <div className="absolute top-10 left-6 text-6xl sm:text-8xl font-mono text-primary/[0.04] dark:text-primary/[0.06] select-none">
        {"{ }"}
      </div>
      <div className="absolute bottom-10 right-6 text-6xl sm:text-8xl font-mono text-primary/[0.04] dark:text-primary/[0.06] select-none">
        {"< />"}
      </div>
      <div className="absolute top-1/2 right-12 text-5xl font-mono text-accent/[0.05] select-none rotate-12">
        {"( )"}
      </div>

      {/* Dot grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dotgrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotgrid)" />
      </svg>

      {/* Circuit-like lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <line x1="10%" y1="20%" x2="30%" y2="20%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
        <line x1="30%" y1="20%" x2="30%" y2="45%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
        <line x1="70%" y1="60%" x2="90%" y2="60%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
        <line x1="70%" y1="60%" x2="70%" y2="85%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
        <circle cx="30%" cy="20%" r="3" fill="currentColor" opacity="0.5" />
        <circle cx="70%" cy="60%" r="3" fill="currentColor" opacity="0.5" />
        <circle cx="30%" cy="45%" r="3" fill="currentColor" opacity="0.5" />
        <circle cx="70%" cy="85%" r="3" fill="currentColor" opacity="0.5" />
      </svg>
    </div>
  );
};

export default CodeBackground;
