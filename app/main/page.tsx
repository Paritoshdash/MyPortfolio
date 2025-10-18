"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeSwitcher } from "@/app/ThemeSwitcher";
import { TypingAnimation } from "@/registry/magicui/terminal";
import { useForm } from "react-hook-form";
import { InteractiveHoverButton } from "@/registry/magicui/interactive-hover-button";
import { projects } from "@/lib/projectsData";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import { MobileMenu } from "@/components/MobileMenu";
import { ResponsiveTest } from "@/components/ResponsiveTest";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Define types for form inputs
type Inputs = {
  name: string;
  email: string;
  message: string;
  botcheck?: boolean;
};

// --- Contact Form Component ---
function ContactForm() {
  const YOUR_ACCESS_KEY = "8e8e5825-f766-4c83-81d2-9f6da147d252";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<Inputs>();
  const [status, setStatus] = useState<"success" | "error" | "idle">("idle");

  const onSubmit = async (data: Inputs) => {
    setStatus("idle");
    try {
      const formData = new FormData();
      formData.append("access_key", YOUR_ACCESS_KEY);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("message", data.message);
      formData.append("subject", `New message from ${data.name} via Portfolio`);
      formData.append("botcheck", data.botcheck ? "true" : "");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();

      if (json.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        console.error("Web3Forms error:", json);
      }
    } catch (err) {
      setStatus("error");
      console.error("Submission error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* Success Message */}
      {isSubmitSuccessful && status === "success" && (
        <div className="p-6 text-center bg-green-100/80 dark:bg-green-900/40 text-green-800 dark:text-green-200 rounded-2xl border-2 border-green-300 dark:border-green-700 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Message sent successfully! I&apos;ll get back to you soon.
          </div>
        </div>
      )}
      {/* Error Message */}
      {status === "error" && (
        <div className="p-6 text-center bg-red-100/80 dark:bg-red-900/40 text-red-800 dark:text-red-200 rounded-2xl border-2 border-red-300 dark:border-red-700 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-3">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            Something went wrong. Please check your Access Key or try again.
          </div>
        </div>
      )}
      {/* Honeypot field */}
      <input type="checkbox" className="hidden" {...register("botcheck")} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold mb-3 text-card-foreground/80"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            className="w-full px-4 py-3 bg-card/50 border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 backdrop-blur-sm"
            {...register("name", { required: "Your name is required" })}
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="text-destructive text-sm mt-2">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold mb-3 text-card-foreground/80"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-card/50 border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 backdrop-blur-sm"
            {...register("email", {
              required: "Your email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-destructive text-sm mt-2">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold mb-3 text-card-foreground/80"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder="Your message..."
          className="w-full px-4 py-3 bg-card/50 border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none backdrop-blur-sm"
          {...register("message", { required: "A message is required" })}
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="text-destructive text-sm mt-2">
            {errors.message.message}
          </p>
        )}
      </div>
      <div>
        <InteractiveHoverButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Sending...
            </div>
          ) : (
            "Send Message"
          )}
        </InteractiveHoverButton>
      </div>
    </form>
  );
}

// Import Spline dynamically for better performance
const Spline = React.lazy(() => import('@splinetool/react-spline'));

// --- Main Page Component ---
const HomePage = () => {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTimeline
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
        )
        .fromTo(
          ".hero-p",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        );

      gsap.to(".animate-marquee", {
        xPercent: -50,
        ease: "none",
        duration: 20,
        repeat: -1,
      });

      const projectCards = gsap.utils.toArray(".project-card");
      projectCards.forEach((card) => {
        gsap.fromTo(
          card as HTMLElement,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card as HTMLElement,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      const timelineItems = gsap.utils.toArray(".timeline-item");
      timelineItems.forEach((item) => {
        gsap.fromTo(
          item as HTMLElement,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item as HTMLElement,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={mainRef}
      className="bg-background text-foreground min-h-screen transition-colors duration-300 overflow-x-hidden"
    >
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <React.Suspense fallback={<div className="w-full h-full bg-background" />}>
          {/* Added className to hide the Spline branding and improve mobile performance */}
          <div className="w-full h-full [&_*]:!selection:bg-transparent">
            <Spline 
              scene="https://prod.spline.design/eKilpIyM0mjbbxIx/scene.splinecode" 
              className="[&_*]:!selection:bg-transparent [&_*]:!will-change-auto"
            />
          </div>
        </React.Suspense>
      </div>

      {/* Content overlay */}
      <div className="relative z-10">
        {/* Enhanced Navigation */}
        <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl shadow-sm border-b border-border/50">
          <div className="flex justify-between items-center max-w-7xl mx-auto py-4 px-8">
            <div className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              PD.
            </div>
            <div className="flex items-center gap-6">
              <ul className="hidden md:flex items-center space-x-8 font-medium">
                {["About", "Projects", "Experience", "Articles", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className="text-card-foreground/80 hover:text-primary transition-all duration-300 hover:font-semibold relative group"
                      >
                        {item}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                      </a>
                    </li>
                  )
                )}
              </ul>
              <InteractiveHoverButton
                href="/Paritosh Dash copy.pdf"
                className="hidden md:block"
              >
                View Resume
              </InteractiveHoverButton>
              <ThemeSwitcher />
            </div>
          </div>
        </nav>

        {/* Enhanced Hero Section */}
        <div className="max-w-7xl mx-auto px-8 py-24 md:py-32">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.9] tracking-tight">
                <TypingAnimation
                  className="hero-title inline-block bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent"
                  delay={0}
                >
                  Paritosh
                </TypingAnimation>
                <br />
                <span className="hero-title inline-block bg-gradient-to-b from-primary to-primary/70 bg-clip-text text-transparent">
                  Dash
                </span>
              </h1>
              <p className="hero-p mt-8 text-xl text-card-foreground/80 max-w-lg mx-auto md:mx-0 leading-relaxed">
                I&apos;m an <span className="text-primary">AI/ML</span>,{" "}
                <span className="text-primary">Full-Stack Developer</span>, and{" "}
                <span className="text-primary">Tech Innovator</span>.
              </p>
            </div>
            {/* Removed the hero image section entirely */}
          </div>
        </div>

        {/* Enhanced About Section */}
        <section id="about" className="py-24 relative">
          <div className="relative overflow-hidden whitespace-nowrap">
            <h2 className="animate-marquee text-8xl md:text-9xl font-black uppercase text-black dark:text-white inline-block pr-12">
              {" "}
              About . About . About . About . About .{" "}
            </h2>
            <h2 className="animate-marquee text-8xl md:text-9xl font-black uppercase text-black dark:text-white inline-block pr-12">
              {" "}
              About . About . About . About . About .{" "}
            </h2>
          </div>
          <div className="max-w-7xl mx-auto px-8 mt-16">
            <div className="flex flex-col lg:flex-row items-start gap-16">
              <div className="lg:w-2/3">
                <h3 className="text-4xl font-bold text-foreground">
                  {" "}
                  Paritosh Dash{" "}
                </h3>
                <p className="mt-6 text-lg text-foreground/80 leading-relaxed">
                  I’m an AI and full-stack developer passionate about building
                  impactful solutions in healthcare, sports analytics, and
                  digital platforms. My key projects include VitalPredict, a
                  health risk prediction system with 82% accuracy, and RuralDoc,
                  a multilingual AI chatbot recognized in the Learnathon Top 7.
                  I’ve also developed an AI-based sports talent assessment
                  platform that enhanced evaluation accuracy by 84%. Skilled in
                  Python, JavaScript, React.js, Flask, and SQL, I focus on
                  creating scalable, intelligent systems that drive real-world
                  innovation.{" "}
                </p>
              </div>
              <div className="lg:w-1/3">
                <h4 className="text-2xl font-semibold mb-6 text-foreground">
                  Core Skills
                </h4>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Java",
                    "Python",
                    "React.js",
                    "Spring Boot",
                    "Node.js",
                    "SQL",
                    "MongoDB",
                    "Docker",
                    "Git",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-card/50 border border-border rounded-full text-sm font-medium hover:bg-primary/10 hover:border-primary/30 hover:scale-105 transition-all duration-300 cursor-default backdrop-blur-sm text-foreground"
                    >
                      {" "}
                      {skill}{" "}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Projects Section */}
        <section
          id="projects"
          className="py-24 bg-gradient-to-b from-background to-card/30"
        >
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-8xl md:text-9xl font-black uppercase text-center mb-20 text-foreground">
              {" "}
              Portfolio{" "}
            </h2>
            <ProjectsCarousel projects={projects} />
          </div>
        </section>

        {/* Enhanced Experience Section */}
        <section id="experience" className="py-24">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-5xl font-bold text-center mb-20 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {" "}
              Internships & Experience{" "}
            </h2>
            <div className="relative">
              <div className="absolute left-8 md:left-1/4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-border to-transparent"></div>

              {/* Timeline Item 1 */}
              <div className="timeline-item mb-16 md:flex items-start group">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <p className="font-bold text-lg text-card-foreground group-hover:text-primary transition-colors duration-300">
                    Launched Global
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    July 2025 - Sep 2025
                  </p>
                </div>
                <div className="md:w-3/4 relative">
                  <div className="absolute -left-8 md:-left-4 top-2 h-4 w-4 rounded-full bg-primary border-4 border-background group-hover:scale-125 transition-transform duration-300 z-10"></div>
                  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 ml-8 md:ml-0 group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-500">
                    <h3 className="text-2xl font-bold text-card-foreground">
                      Web Developer (Intern)
                    </h3>
                    <ul className="mt-4 space-y-3">
                      <li className="flex items-start gap-3 text-card-foreground/80">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>{" "}
                        Learned and implemented HTML, CSS, JavaScript...
                      </li>
                      <li className="flex items-start gap-3 text-card-foreground/80">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>{" "}
                        Built responsive web pages...
                      </li>
                    </ul>
                    <div className="mt-6">
                      <a
                        href="/launched-global-certificate.pdf"
                        className="inline-flex items-center gap-2 text-primary border-2 border-primary/30 hover:border-primary hover:bg-primary/10 px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300"
                      >
                        View Certificate
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="timeline-item mb-16 md:flex items-start group">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <p className="font-bold text-lg text-card-foreground group-hover:text-primary transition-colors duration-300">
                    Skyy Skill Academy
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    May 2025 - June 2025
                  </p>
                </div>
                <div className="md:w-3/4 relative">
                  <div className="absolute -left-8 md:-left-4 top-2 h-4 w-4 rounded-full bg-primary border-4 border-background group-hover:scale-125 transition-transform duration-300 z-10"></div>
                  <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 ml-8 md:ml-0 group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-500">
                    <h3 className="text-2xl font-bold text-card-foreground">
                      Java Developer (Intern)
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      In collaboration with IIT Guwahati
                    </p>
                    <ul className="mt-4 space-y-3">
                      <li className="flex items-start gap-3 text-card-foreground/80">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>{" "}
                        Gained hands-on experience with Java...
                      </li>
                      <li className="flex items-start gap-3 text-card-foreground/80">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>{" "}
                        Developed mini-projects...
                      </li>
                    </ul>
                    <div className="mt-6">
                      <a
                        href="/files/SkySkill.png"
                        className="inline-flex items-center gap-2 text-primary border-2 border-primary/30 hover:border-primary hover:bg-primary/10 px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300"
                      >
                        View Certificate
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Blog Section */}
        <section id="articles" className="py-24">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Writings & Insights
              </h2>
              <p className="text-xl text-card-foreground/80 max-w-2xl mx-auto leading-relaxed">
                Sharing thoughts on technology, development, and learnings.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Placeholder Post 1 */}
              <Link
                href="/blog/getting-started-gsap-nextjs"
                className="group flex flex-col bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-2">
                    Oct 17, 2025
                  </p>
                  <h3 className="text-xl font-semibold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                    {" "}
                    Getting Started with GSAP ScrollTrigger in Next.js{" "}
                  </h3>
                  <p className="text-card-foreground/80 text-sm mb-4 flex-1">
                    {" "}
                    A quick guide on integrating GreenSock&#39;s powerful scroll
                    animation library...{" "}
                  </p>
                  <span className="text-primary font-semibold text-sm group-hover:underline">
                    Read More &rarr;
                  </span>
                </div>
              </Link>
              {/* Placeholder Post 2 */}
              <Link
                href="/blog/react-native-vs-flutter-athletex"
                className="group flex flex-col bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-2">
                    Oct 10, 2025
                  </p>
                  <h3 className="text-xl font-semibold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                    {" "}
                    Choosing Between React Native and Flutter for AthleteX{" "}
                  </h3>
                  <p className="text-card-foreground/80 text-sm mb-4 flex-1">
                    {" "}
                    Exploring the pros and cons of different mobile
                    frameworks...{" "}
                  </p>
                  <span className="text-primary font-semibold text-sm group-hover:underline">
                    Read More &rarr;
                  </span>
                </div>
              </Link>
              {/* Placeholder Post 3 */}
              <Link
                href="/blog/tips-web3forms"
                className="group flex flex-col bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-primary/10 transition-all duration-300"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-2">
                    Sep 28, 2025
                  </p>
                  <h3 className="text-xl font-semibold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                    {" "}
                    Tips for Setting Up a Contact Form with Web3Forms{" "}
                  </h3>
                  <p className="text-card-foreground/80 text-sm mb-4 flex-1">
                    {" "}
                    Lessons learned while implementing a simple and free contact
                    form solution...{" "}
                  </p>
                  <span className="text-primary font-semibold text-sm group-hover:underline">
                    Read More &rarr;
                  </span>
                </div>
              </Link>
            </div>
            <div className="text-center mt-12">
              <a
                href="/main#articles"
                className="inline-flex items-center gap-2 text-primary border-2 border-primary/30 hover:border-primary hover:bg-primary/10 px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300"
              >
                View All Blogs
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Enhanced Contact Section */}
        <section
          id="contact"
          className="py-24 bg-gradient-to-b from-card/30 to-background"
        >
          <div className="max-w-4xl mx-auto px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {" "}
                Get In Touch{" "}
              </h2>
              <p className="text-xl text-card-foreground/80 max-w-2xl mx-auto leading-relaxed">
                {" "}
                Have a project in mind or just want to say hi? Fill out the form
                below and I&apos;ll get back to you.{" "}
              </p>
            </div>
            <ContactForm />
          </div>
        </section>

        {/* Enhanced Footer */}
        <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm py-12">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              <div className="text-center lg:text-left">
                <p className="text-muted-foreground text-lg">
                  {" "}
                  © 2025 Paritosh Dash. All Rights Reserved.{" "}
                </p>
                <p className="text-muted-foreground/70 text-sm mt-2">
                  {" "}
                  Crafted with passion and precision{" "}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <a
                  href="https://www.linkedin.com/in/paritosh-dash-264981355/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card/50 border border-border/50 rounded-2xl text-muted-foreground hover:text-primary hover:border-primary/30 hover:scale-110 transition-all duration-300 backdrop-blur-sm"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/Paritoshdash"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card/50 border border-border/50 rounded-2xl text-muted-foreground hover:text-primary hover:border-primary/30 hover:scale-110 transition-all duration-300 backdrop-blur-sm"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.479-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <ResponsiveTest />
    </main>
  );
};

export default HomePage;