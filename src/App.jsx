import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowRight,
  Code,
  Terminal,
  Braces,
  FileCode,
  Globe,
  Rocket,
  Zap,
  Database,
  Box,
  Sun,
  Moon,
  Download,
  Sparkles,
  Coffee,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [terminalText, setTerminalText] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const heroRef = useRef(null);
  const cursorRef = useRef(null);

  // Toggle theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Terminal typing effect
  useEffect(() => {
    const text = "npm run build-amazing-things";
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setTerminalText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Active section tracker
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id || "home");
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  useEffect(() => {
    // Custom cursor
    const handleMouseMove = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Code rain effect
    const canvas = document.getElementById("code-rain");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const chars = "01</>{}[]();=+-*&|!@#$%^";
      const columns = Math.floor(canvas.width / 20);
      const drops = Array(columns).fill(1);

      const drawRain = () => {
        ctx.fillStyle =
          theme === "dark" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = theme === "dark" ? "#22d3ee" : "#0891b2";
        ctx.font = "15px monospace";

        drops.forEach((y, i) => {
          const text = chars[Math.floor(Math.random() * chars.length)];
          const x = i * 20;
          ctx.fillText(text, x, y * 20);

          if (y * 20 > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        });
      };

      const rainInterval = setInterval(drawRain, 50);
      
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      window.addEventListener("resize", handleResize);

      return () => {
        clearInterval(rainInterval);
        window.removeEventListener("resize", handleResize);
      };
    }

    // GSAP Animations
    gsap.from(".hero-content", {
      opacity: 0,
      y: 100,
      duration: 1.2,
      ease: "power4.out",
    });

    gsap.utils.toArray(".fade-in").forEach((element) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });
    });

    gsap.from(".stagger-item", {
      scrollTrigger: {
        trigger: ".stagger-container",
        start: "top 70%",
      },
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.to(".float", {
      y: "random(-20, 20)",
      x: "random(-20, 20)",
      duration: "random(3, 5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [theme]);

  const projects = [
    {
      title: "SkillSwap Learning App",
      description:
        "A platform where users exchange skills — real-time updates, booking flow, and dynamic filters.",
      tech: ["React", "Firebase", "Tailwind"],
      live: "https://skilswapp.netlify.app/",
      github: "https://github.com/omarabir/SkillSwap",
      color: "#3B82F6",
      icon: Rocket,
    },
    {
      title: "PawMart - Your Pet's Paradise",
      description:
        "PawMart is an online pet marketplace where users can discover, buy, and adoption everything related to pets in one place.",
      tech: ["React", "Firebase", "Tailwind"],
      live: "https://pawmart2.netlify.app/?hl=bn-IN",
      github: "https://github.com/omarabir/PawMart-client-site?hl=bn-IN",
      color: "#F97316",
      icon: Globe,
    },
  ];

  const skills = [
    { name: "JavaScript", icon: FileCode, level: 90, color: "#F7DF1E" },
    { name: "React", icon: Braces, level: 85, color: "#61DAFB" },
    { name: "Node.js", icon: Terminal, level: 80, color: "#339933" },
    { name: "MongoDB", icon: Database, level: 75, color: "#47A248" },
    { name: "Express", icon: Zap, level: 80, color: "#000000" },
    { name: "HTML/CSS", icon: Code, level: 95, color: "#E34F26" },
    { name: "Tailwind", icon: Box, level: 90, color: "#06B6D4" },
    { name: "Git", icon: Github, level: 85, color: "#F05032" },
    { name: "REST APIs", icon: Globe, level: 80, color: "#009688" },
    { name: "Firebase", icon: Rocket, level: 75, color: "#FFCA28" },
    { name: "JWT", icon: Code, level: 70, color: "#000000" },
    { name: "MERN", icon: Braces, level: 85, color: "#00D9FF" },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
      } overflow-x-hidden relative`}
    >
      {/* Code Rain Background */}
      <canvas
        id="code-rain"
        className="fixed inset-0 opacity-10 pointer-events-none z-0"
      />

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`fixed w-8 h-8 border-2 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block ${
          theme === "dark" ? "border-cyan-400" : "border-blue-600"
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <div
          className={`absolute inset-0 border-2 rounded-full animate-ping opacity-75 ${
            theme === "dark" ? "border-cyan-400" : "border-blue-600"
          }`}
        />
      </div>

      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`float absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 ${
            theme === "dark" ? "bg-cyan-500" : "bg-blue-400"
          }`}
        />
        <div
          className={`float absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            theme === "dark" ? "bg-purple-500" : "bg-purple-400"
          }`}
        />
        <div
          className={`float absolute bottom-40 left-1/4 w-80 h-80 rounded-full blur-3xl opacity-20 ${
            theme === "dark" ? "bg-pink-500" : "bg-pink-400"
          }`}
        />
      </div>

      {/* Navbar */}
      <nav
        className={`fixed w-full backdrop-blur-xl z-40 border-b transition-all duration-300 ${
          theme === "dark"
            ? "bg-black/60 border-cyan-400/20"
            : "bg-white/60 border-blue-200/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xl font-mono group cursor-pointer">
            <Terminal
              className={`group-hover:rotate-12 transition-transform ${
                theme === "dark" ? "text-cyan-400" : "text-blue-600"
              }`}
              size={24}
            />
            <span className="font-bold">
              {"<"}
              <span className={theme === "dark" ? "text-cyan-400" : "text-blue-600"}>
                Omar
              </span>
              Abir{"/>"}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 font-mono text-sm">
            {["about", "projects", "skills", "contact"].map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className={`relative px-3 py-2 rounded-lg transition-all ${
                  activeSection === link
                    ? theme === "dark"
                      ? "text-cyan-400 bg-cyan-400/10"
                      : "text-blue-600 bg-blue-100"
                    : theme === "dark"
                    ? "text-gray-400 hover:text-cyan-400"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {link}
              </a>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all ${
                theme === "dark"
                  ? "bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400/20"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
              title="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <button
            className={`md:hidden transition ${
              theme === "dark"
                ? "text-gray-400 hover:text-cyan-400"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div
            className={`md:hidden backdrop-blur-xl px-6 py-6 border-t font-mono ${
              theme === "dark"
                ? "bg-black/95 border-cyan-400/20"
                : "bg-white/95 border-blue-200/50"
            }`}
          >
            {["about", "projects", "skills", "contact"].map((link) => (
              <a
                key={link}
                href={`#${link}`}
                className={`block py-3 transition ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-cyan-400"
                    : "text-gray-600 hover:text-blue-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <button
              onClick={toggleTheme}
              className={`mt-4 w-full py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                theme === "dark"
                  ? "bg-cyan-400/10 text-cyan-400"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {theme === "dark" ? (
                <>
                  <Sun size={20} /> Light Mode
                </>
              ) : (
                <>
                  <Moon size={20} /> Dark Mode
                </>
              )}
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-6 pt-20 relative z-10"
      >
        <div className="max-w-6xl mx-auto hero-content">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Sparkles
                  className={theme === "dark" ? "text-cyan-400" : "text-blue-600"}
                  size={24}
                />
                <span
                  className={`font-mono text-sm ${
                    theme === "dark" ? "text-cyan-400" : "text-blue-600"
                  }`}
                >
                  Welcome to my digital space
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="block mb-2">Hi, I'm</span>
                <span
                  className={`block bg-gradient-to-r ${
                    theme === "dark"
                      ? "from-cyan-400 via-blue-500 to-purple-500"
                      : "from-blue-600 via-purple-600 to-pink-600"
                  } text-transparent bg-clip-text`}
                >
                  Omar Abir
                </span>
              </h1>

              <p
                className={`text-xl md:text-2xl mb-8 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <span className="font-bold">MERN Stack Developer</span> crafting
                digital experiences with clean code & creative design
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="#projects"
                  className={`group px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-black hover:shadow-cyan-500/50"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-blue-500/50"
                  }`}
                >
                  <Rocket size={20} />
                  View Projects
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </a>
                <a
                  href="#contact"
                  className={`px-8 py-4 border-2 rounded-xl font-bold transition-all flex items-center gap-2 ${
                    theme === "dark"
                      ? "border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                      : "border-blue-600 text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <Mail size={20} />
                  Contact Me
                </a>
              </div>

              <div className="flex items-center gap-6">
                {[
                  { icon: Github, href: "https://github.com/omarabir" },
                  { icon: Linkedin, href: "https://linkedin.com/in/omarabir" },
                  { icon: Mail, href: "mailto:abiromor506@gmail.com" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg transition-all ${
                      theme === "dark"
                        ? "bg-white/5 hover:bg-cyan-400/10 text-gray-400 hover:text-cyan-400"
                        : "bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column - Terminal */}
            <div
              className={`rounded-2xl overflow-hidden shadow-2xl border ${
                theme === "dark"
                  ? "bg-gray-900 border-cyan-400/30 shadow-cyan-500/20"
                  : "bg-white border-gray-300 shadow-blue-500/20"
              }`}
            >
              <div
                className={`px-4 py-3 flex items-center gap-3 border-b ${
                  theme === "dark"
                    ? "bg-gray-800 border-cyan-400/30"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span
                  className={`text-sm font-mono ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  terminal
                </span>
              </div>
              <div className="p-6 font-mono text-sm space-y-3">
                <div
                  className={theme === "dark" ? "text-cyan-400" : "text-blue-600"}
                >
                  <span className={theme === "dark" ? "text-gray-500" : "text-gray-400"}>
                    $
                  </span>{" "}
                  {terminalText}
                  <span className="animate-pulse">|</span>
                </div>
                <div
                  className={theme === "dark" ? "text-green-400" : "text-green-600"}
                >
                  ✓ Building innovative web solutions...
                </div>
                <div className={theme === "dark" ? "text-purple-400" : "text-purple-600"}>
                  <span className="opacity-50">const</span> developer = {"{"}
                </div>
                <div className={theme === "dark" ? "text-blue-400" : "text-blue-600"}>
                  {"  "}name: <span className="text-green-500">"Omar Abir"</span>,
                </div>
                <div className={theme === "dark" ? "text-blue-400" : "text-blue-600"}>
                  {"  "}role: <span className="text-green-500">"MERN Developer"</span>,
                </div>
                <div className={theme === "dark" ? "text-blue-400" : "text-blue-600"}>
                  {"  "}status:{" "}
                  <span className="flex items-center gap-2 inline-flex">
                    <span className="text-green-500">"</span>
                    <span
                      className={`w-2 h-2 rounded-full animate-pulse ${
                        theme === "dark" ? "bg-green-400" : "bg-green-500"
                      }`}
                    />
                    <span className="text-green-500">Available"</span>
                  </span>
                </div>
                <div className={theme === "dark" ? "text-purple-400" : "text-purple-600"}>
                  {"};"}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span
              className={`text-sm font-mono ${
                theme === "dark" ? "text-cyan-400" : "text-blue-600"
              }`}
            >
              Scroll Down
            </span>
            <div
              className={`w-px h-16 bg-gradient-to-b ${
                theme === "dark"
                  ? "from-cyan-400 to-transparent"
                  : "from-blue-600 to-transparent"
              } animate-pulse`}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="fade-in text-4xl md:text-5xl font-bold mb-16 flex items-center gap-4">
            <span
              className={theme === "dark" ? "text-cyan-400" : "text-blue-600"}
            >
              01.
            </span>
            <span>About Me</span>
            <div
              className={`flex-1 h-px ${
                theme === "dark"
                  ? "bg-gradient-to-r from-cyan-400/50 to-transparent"
                  : "bg-gradient-to-r from-blue-600/50 to-transparent"
              }`}
            />
          </h2>

          <div className="grid md:grid-cols-2 gap-12 stagger-container">
            <div className="space-y-6 stagger-item">
              <div
                className={`p-8 rounded-2xl backdrop-blur-sm border ${
                  theme === "dark"
                    ? "bg-white/5 border-cyan-400/20"
                    : "bg-white/80 border-blue-200"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Code
                    className={theme === "dark" ? "text-cyan-400" : "text-blue-600"}
                    size={32}
                  />
                  <h3 className="text-2xl font-bold">Who I Am</h3>
                </div>
                <p
                  className={`leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  I'm a <span className="font-bold">MERN stack developer</span>{" "}
                  passionate about crafting digital experiences that matter. I
                  transform complex problems into elegant solutions through clean
                  code and intuitive design.
                </p>
              </div>

              <div
                className={`p-8 rounded-2xl backdrop-blur-sm border ${
                  theme === "dark"
                    ? "bg-white/5 border-purple-400/20"
                    : "bg-white/80 border-purple-200"
                }`}
              >
                <p
                  className={`leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  When I'm not coding, you'll find me exploring new technologies,
                  contributing to open-source, or experimenting with creative UI
                  concepts. I believe in continuous learning and staying updated with
                  the latest web development trends.
                </p>
              </div>
            </div>

            <div
              className={`stagger-item p-8 rounded-2xl backdrop-blur-sm border shadow-xl ${
                theme === "dark"
                  ? "bg-gray-900/80 border-cyan-400/30"
                  : "bg-white border-gray-300"
              }`}
            >
              <div className="flex items-center gap-2 mb-6">
                <Coffee
                  className={theme === "dark" ? "text-cyan-400" : "text-blue-600"}
                  size={20}
                />
                <span
                  className={`font-mono text-sm ${
                    theme === "dark" ? "text-cyan-400" : "text-blue-600"
                  }`}
                >
                  philosophy.js
                </span>
              </div>
              <div className="font-mono text-sm space-y-2">
                <p className={theme === "dark" ? "text-purple-400" : "text-purple-600"}>
                  {"const"}{" "}
                  <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
                    codeQuality
                  </span>{" "}
                  <span className={theme === "dark" ? "text-cyan-400" : "text-blue-600"}>
                    =
                  </span>{" "}
                  {"{"}
                </p>
                <p className={theme === "dark" ? "ml-4 text-blue-400" : "ml-4 text-blue-600"}>
                  readability
                  <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
                    :
                  </span>{" "}
                  <span className={theme === "dark" ? "text-green-400" : "text-green-600"}>
                    "high"
                  </span>
                  <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
                    ,
                  </span>
                </p>
                <p className={theme === "dark" ? "ml-4 text-blue-400" : "ml-4 text-blue-600"}>
                  maintainability
                  <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
                    :
                  </span>{" "}
                  <span className={theme === "dark" ? "text-green-400" : "text-green-600"}>
                    "essential"
                  </span>
                  <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
                    ,
                  </span>
                </p>
                <p className={theme === "dark" ? "ml-4 text-blue-400" : "ml-4 text-blue-600"}>
                  scalability
                  <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
                    :
                  </span>{" "}
                  <span className={theme === "dark" ? "text-green-400" : "text-green-600"}>
                    "priority"
                  </span>
                  <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
                    ,
                  </span>
                </p>
                <p className={theme === "dark" ? "ml-4 text-blue-400" : "ml-4 text-blue-600"}>
                  performance
                  <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
                    :
                  </span>{" "}
                  <span className={theme === "dark" ? "text-green-400" : "text-green-600"}>
                    "optimized"
                  </span>
                </p>
                <p className={theme === "dark" ? "text-white" : "text-gray-900"}>
                  {"};"}
                </p>
                <p className={`mt-4 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                  {"// Clean code always looks like"}
                </p>
                <p className={theme === "dark" ? "text-gray-500" : "text-gray-400"}>
                  {"// it was written by someone who cares."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="fade-in text-4xl md:text-5xl font-bold mb-16 flex items-center gap-4">
            <span
              className={theme === "dark" ? "text-cyan-400" : "text-blue-600"}
            >
              02.
            </span>
            <span>Featured Projects</span>
            <div
              className={`flex-1 h-px ${
                theme === "dark"
                  ? "bg-gradient-to-r from-cyan-400/50 to-transparent"
                  : "bg-gradient-to-r from-blue-600/50 to-transparent"
              }`}
            />
          </h2>

          <div className="space-y-12 stagger-container">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`stagger-item group rounded-2xl overflow-hidden backdrop-blur-sm border transition-all duration-500 hover:scale-[1.02] ${
                  theme === "dark"
                    ? "bg-white/5 border-cyan-400/30 hover:border-cyan-400/70 hover:shadow-2xl hover:shadow-cyan-500/20"
                    : "bg-white border-gray-300 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/20"
                }`}
              >
                <div
                  className={`px-4 py-3 flex items-center justify-between border-b ${
                    theme === "dark"
                      ? "bg-gray-800/50 border-cyan-400/30"
                      : "bg-gray-100 border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span
                      className={`text-sm font-mono flex items-center gap-2 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <project.icon size={14} />
                      project_{String(index + 1).padStart(2, "0")}.jsx
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`transition ${
                        theme === "dark"
                          ? "text-gray-400 hover:text-cyan-400"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                      title="View Code"
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`transition ${
                        theme === "dark"
                          ? "text-gray-400 hover:text-cyan-400"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                      title="Live Demo"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <project.icon size={32} style={{ color: project.color }} />
                    <h3 className="text-2xl md:text-3xl font-bold">
                      {project.title}
                    </h3>
                  </div>

                  <p
                    className={`text-lg mb-6 leading-relaxed ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className={`px-4 py-2 rounded-lg text-sm font-mono transition ${
                          theme === "dark"
                            ? "bg-white/5 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
                            : "bg-blue-50 border border-blue-200 text-blue-600 hover:bg-blue-100"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="fade-in text-4xl md:text-5xl font-bold mb-16 flex items-center gap-4">
            <span
              className={theme === "dark" ? "text-cyan-400" : "text-blue-600"}
            >
              03.
            </span>
            <span>Tech Stack</span>
            <div
              className={`flex-1 h-px ${
                theme === "dark"
                  ? "bg-gradient-to-r from-cyan-400/50 to-transparent"
                  : "bg-gradient-to-r from-blue-600/50 to-transparent"
              }`}
            />
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 stagger-container">
            {skills.map((skill, i) => (
              <div
                key={i}
                className={`stagger-item group relative rounded-2xl p-6 backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                  theme === "dark"
                    ? "bg-white/5 border-cyan-400/30 hover:border-cyan-400/70 hover:shadow-lg hover:shadow-cyan-500/20"
                    : "bg-white border-gray-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <skill.icon
                    className={`mb-4 transition-transform group-hover:scale-110 ${
                      theme === "dark" ? "text-cyan-400" : "text-blue-600"
                    }`}
                    size={48}
                  />
                  <span className="font-bold mb-3">{skill.name}</span>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        theme === "dark"
                          ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                          : "bg-gradient-to-r from-blue-600 to-purple-600"
                      }`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <span
                    className={`text-xs mt-2 font-mono ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {skill.level}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`fade-in mt-12 p-6 rounded-2xl backdrop-blur-sm border ${
              theme === "dark"
                ? "bg-white/5 border-cyan-400/30"
                : "bg-white border-blue-200"
            }`}
          >
            <p
              className={`font-mono text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <span
                className={theme === "dark" ? "text-cyan-400" : "text-blue-600"}
              >
                {"// "}
              </span>
              Always learning and exploring new technologies...
              <span className="animate-pulse">_</span>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="fade-in text-4xl md:text-5xl font-bold mb-8 flex items-center justify-center gap-4">
            <span
              className={theme === "dark" ? "text-cyan-400" : "text-blue-600"}
            >
              04.
            </span>
            <span>Get In Touch</span>
          </h2>

          <div
            className={`fade-in p-8 rounded-2xl backdrop-blur-sm border mb-12 max-w-2xl mx-auto font-mono text-sm ${
              theme === "dark"
                ? "bg-white/5 border-cyan-400/30"
                : "bg-white border-gray-300"
            }`}
          >
            <div className="space-y-2 text-left">
              <p className={theme === "dark" ? "text-purple-400" : "text-purple-600"}>
                <span className="opacity-50">if</span>{" "}
                <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
                  (
                </span>
                <span className={theme === "dark" ? "text-blue-400" : "text-blue-600"}>
                  you.need
                </span>{" "}
                <span className={theme === "dark" ? "text-cyan-400" : "text-blue-600"}>
                  ===
                </span>{" "}
                <span className={theme === "dark" ? "text-green-400" : "text-green-600"}>
                  "developer"
                </span>
                <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
                  )
                </span>{" "}
                <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
                  {"{"}
                </span>
              </p>
              <p className={theme === "dark" ? "text-blue-400 ml-6" : "text-blue-600 ml-6"}>
                contact
                <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
                  (
                </span>
                <span className={theme === "dark" ? "text-green-400" : "text-green-600"}>
                  "Omar Abir"
                </span>
                <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
                  );
                </span>
              </p>
              <p className={theme === "dark" ? "text-purple-400 ml-6" : "text-purple-600 ml-6"}>
                return{" "}
                <span className={theme === "dark" ? "text-green-400" : "text-green-600"}>
                  "Amazing Projects"
                </span>
                <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
                  ;
                </span>
              </p>
              <p className={theme === "dark" ? "text-white" : "text-gray-900"}>
                {"}"}
              </p>
            </div>
          </div>

          <div className="flex gap-6 justify-center flex-wrap stagger-container">
            {[
              {
                icon: Github,
                href: "https://github.com/omarabir",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://linkedin.com/in/omarabir",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: "mailto:abiromor506@gmail.com",
                label: "Email",
              },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`stagger-item group relative p-8 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-110 ${
                  theme === "dark"
                    ? "bg-white/5 border-cyan-400/30 hover:border-cyan-400/70 hover:shadow-lg hover:shadow-cyan-500/20"
                    : "bg-white border-gray-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20"
                }`}
                title={social.label}
              >
                <social.icon
                  className={`transition-all ${
                    theme === "dark"
                      ? "text-gray-400 group-hover:text-cyan-400"
                      : "text-gray-600 group-hover:text-blue-600"
                  }`}
                  size={32}
                />
                <span
                  className={`absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-mono whitespace-nowrap ${
                    theme === "dark" ? "text-cyan-400" : "text-blue-600"
                  }`}
                >
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`border-t py-8 text-center font-mono text-sm relative z-10 ${
          theme === "dark"
            ? "border-cyan-400/20 text-gray-500"
            : "border-gray-300 text-gray-600"
        }`}
      >
        <p className="mb-2">
          <span className={theme === "dark" ? "text-cyan-400" : "text-blue-600"}>
            {"<"}
          </span>
          © 2025 Omar Abir
          <span className={theme === "dark" ? "text-cyan-400" : "text-blue-600"}>
            {"/>"}
          </span>
        </p>
        <p className="text-xs">
          <span className={theme === "dark" ? "text-gray-600" : "text-gray-400"}>
            {"// "}
          </span>
          Crafted with React, GSAP & lots of coffee ☕
        </p>
      </footer>
    </div>
  );
}