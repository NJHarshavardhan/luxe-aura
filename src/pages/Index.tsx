import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import portfolioData from "@/data/portfolio.json";
import LoadingScreen from "@/components/portfolio/LoadingScreen";
import Header from "@/components/portfolio/Header";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import Education from "@/components/portfolio/Education";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  const d = portfolioData;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LoadingScreen isLoading={isLoading} name={d.name} />
      {!isLoading && (
        <>
          <Header />
          <main>
            <Hero name={d.name} titles={d.titles} about={d.about} />
            <About about={d.about} stats={d.stats} roles={d.roles} />
            <Skills skills={d.technical_skills} />
            <Projects projects={d.projects} />
            <Experience experience={d.experience} />
            <Education education={d.education} />
            <Contact contact={d.contact} />
          </main>
          <Footer name={d.name} contact={d.contact} />
        </>
      )}
    </ThemeProvider>
  );
};

export default Index;
