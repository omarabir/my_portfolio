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
  Facebook,
  MessageCircle,
  Phone,
  MapPin,
  User,
  Palette,
  Music,
  Gamepad,
  Star,
  Heart,
  TrendingUp,
  Award,
  Target,
  Briefcase,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [terminalText, setTerminalText] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState(null);


  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);

  
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);


  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  
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
 
    const handleMouseMove = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

   
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
          theme === "dark"
            ? "rgba(0, 0, 0, 0.05)"
            : "rgba(255, 255, 255, 0.05)";
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
          toggleActions: "play none none none",
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
        toggleActions: "play none none none",
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
      title: "TicketBari - Online Ticket Booking Platform",
      description:
        "A full-stack MERN application for booking travel tickets (Bus, Train, Launch, Plane) with role-based access control for Users, Vendors, and Admins.",
      tech: ["MERN", "Stripe", "JWT", "Firebase"],
      live: "https://ticketbari1.netlify.app/",
      github: "https://github.com/omarabir/TicketBari",
      color: "#3B82F6",
      icon: Rocket,
      image:
        "https://i.ibb.co.com/L7tfgmd/Neutral-Beige-Screen-Creator-Facebook-Cover-2.jpghttps://i.ibb.co.com/placeholder-ticketbari.jpg",
      fullDescription:
        "TicketBari is a comprehensive ticket booking platform built with the MERN stack. It features three user roles (User, Vendor, Admin) with distinct dashboards and capabilities. Users can search, filter, and book tickets with Stripe payment integration. Vendors can manage their ticket listings and track revenue with interactive charts. Admins have full platform control including ticket approval, user management, and fraud detection. The platform includes advanced features like PDF ticket generation, real-time countdown timers, search with pagination, dark/light mode, and responsive design across all devices.",
      challenges:
        "Building a secure multi-role authentication system with JWT and Firebase was complex. Implementing real-time booking status updates, managing payment flows with Stripe, and creating a scalable architecture that handles concurrent bookings while preventing race conditions required careful planning. Also optimized database queries for search/filter/sort operations to maintain fast performance with large datasets.",
      improvements:
        "Planning to add real-time notifications using Socket.io, implement a mobile app with React Native, integrate multiple payment gateways, add ticket QR code scanning for verification, implement advanced analytics dashboard with more detailed insights, and create a review/rating system for vendors and routes.",
      mainTech:
        "MongoDB, Express.js, React 18, Node.js, JWT, Stripe API, Firebase Auth, TanStack Query, Recharts, jsPDF",
    },
    {
      title: "SkillSwap Learning App",
      description:
        "A platform where users exchange skills — real-time updates, booking flow, and dynamic filters.",
      tech: ["React", "Firebase", "Tailwind"],
      live: "https://skilswapp.netlify.app/",
      github: "https://github.com/omarabir/SkillSwap",
      color: "#3B82F6",
      icon: Rocket,
      image:
        "https://i.ibb.co.com/DgVHcWZ0/Neutral-Beige-Screen-Creator-Facebook-Cover-1.jpg",
      fullDescription:
        "SkillSwap is a comprehensive learning platform that connects people who want to exchange skills. Built with React and Firebase, it features real-time updates, a smooth booking flow, and advanced filtering options to match learners with teachers.",
      challenges:
        "Implementing real-time synchronization across multiple users was challenging. Had to optimize Firebase queries to prevent excessive reads and manage complex state updates efficiently.",
      improvements:
        "Plan to add video calling integration, a rating system, and AI-powered skill matching. Also working on mobile apps for iOS and Android using React Native.",
      mainTech: "React, Firebase Realtime Database, React Router, Tailwind CSS",
    },
    {
      title: "PawMart - Your Pet's Paradise",
      description:
        "PawMart is an online pet marketplace where users can discover, buy, and adoption everything related to pets in one place.",
      tech: ["React", "Firebase", "Tailwind"],
      live: "https://pawmart2.netlify.app/?hl=bn-IN",
      github: "https://github.com/omarabir/PawMart",
      color: "#F97316",
      icon: Globe,
      image:
        "https://i.ibb.co.com/5hsd4cYJ/Neutral-Beige-Screen-Creator-Facebook-Cover.jpg",
      fullDescription:
        "PawMart is a full-featured e-commerce platform dedicated to pets. Users can browse, purchase pet products, and even find pets for adoption. Features include user authentication, shopping cart, order management, and admin dashboard.",
      challenges:
        "Building a secure payment integration and managing complex product inventory with multiple categories. Also implemented advanced search and filtering for better user experience.",
      improvements:
        "Planning to add a pet care blog, veterinary consultation booking, and a community forum where pet owners can connect and share experiences.",
      mainTech: "React, Firebase, Stripe API, React Context, Tailwind CSS",
    },
    {
      title: "Scentora - Online Perfume Shop",
      description:
        "Sentora is a fragrance e-commerce platform that allows users to browse products, filter by categories and brands, view detailed product information, and manage their shopping experience with authentication-based features.",
      tech: ["Next.js", "MongoDB", "Tailwind", "JWT"],
      live: "https://sentora-online-perfume-shop.vercel.app",
      github: "https://github.com/omarabir/Scentora--Online_Perfume_Shop",
      color: "#F15959",
      icon: Globe,
      image:
        "https://i.ibb.co.com/gL3K6QV9/Neutral-Beige-Screen-Creator-Facebook-Cover.png",
      fullDescription:
        "Sentora is a fragrance e-commerce platform that allows users to browse products, filter by categories and brands, view detailed product information, and manage their shopping experience with authentication-based features.",
      challenges:
        "Building a secure payment integration and managing complex product inventory with multiple categories. Also implemented advanced search and filtering for better user experience.",
      improvements:
        "Planning to add a pet care blog, veterinary consultation booking, and a community forum where pet owners can connect and share experiences.",
      mainTech: "Next.js, MongoDB, Tailwind CSS,JWT",
    },
  ];

  const skills = [
    // Languages
    {
      name: "JavaScript",
      icon: FileCode,
      level: 90,
      color: "#F7DF1E",
      category: "Languages",
    },

    // UI Technologies
    {
      name: "Bootstrap",
      icon: Box,
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
      level: 85,
      color: "#7952B3",
      category: "UI",
    },
    {
      name: "Tailwind CSS",
      icon: Box,
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      level: 90,
      color: "#06B6D4",
      category: "UI",
    },
    {
      name: "DaisyUI",
      icon: Palette,
      iconUrl: "https://img.icons8.com/fluency/96/000000/daisy.png",
      level: 85,
      color: "#5A0EF8",
      category: "UI",
    },

    // Frontend Technologies
    {
      name: "React.js",
      icon: Braces,
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      level: 90,
      color: "#61DAFB",
      category: "Frontend",
    },
    {
      name: "Next.js",
      icon: Code,
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      level: 85,
      color: "#000000",
      category: "Frontend",
    },

    // Backend Technologies
    {
      name: "Express",
      icon: Zap,
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      level: 85,
      color: "#000000",
      category: "Backend",
    },
    {
      name: "MongoDB",
      icon: Database,
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      level: 80,
      color: "#47A248",
      category: "Backend",
    },

    // Code Tools
    {
      name: "VS Code",
      icon: Code,
      level: 95,
      color: "#007ACC",
      category: "Code Tools",
    },
    {
      name: "Git",
      icon: Github,
      level: 90,
      color: "#F05032",
      category: "Code Tools",
    },
    {
      name: "GitHub",
      icon: Github,
      level: 90,
      color: "#181717",
      category: "Code Tools",
    },
    {
      name: "npm",
      icon: Terminal,
      level: 85,
      color: "#CB3837",
      category: "Code Tools",
    },
    {
      name: "Firebase",
      icon: Rocket,
      level: 80,
      color: "#FFCA28",
      category: "Code Tools",
    },
    {
      name: "Netlify",
      icon: Globe,
      level: 85,
      color: "#00C7B7",
      category: "Code Tools",
    },
    {
      name: "Vercel",
      icon: Zap,
      level: 85,
      color: "#000000",
      category: "Code Tools",
    },

    // Design Tools
    {
      name: "Figma",
      icon: Palette,
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      level: 80,
      color: "#F24E1E",
      category: "Design Tools",
    },
    {
      name: "Canva",
      icon: Palette,
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
      level: 85,
      color: "#00C4CC",
      category: "Design Tools",
    },
    {
      name: "Photoshop",
      icon: Palette,
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg",
      level: 75,
      color: "#31A8FF",
      category: "Design Tools",
    },
    {
      name: "Illustrator",
      icon: Palette,
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
      level: 70,
      color: "#FF9A00",
      category: "Design Tools",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-500 relative overflow-x-hidden ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
          : "bg-gradient-to-br from-slate-50 via-white to-slate-100"
      }`}
    >
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={cursorFollowerRef} className="custom-cursor-follower" />
      {/* Modern Mesh Gradient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className={`absolute inset-0 ${
            theme === "dark" ? "opacity-30" : "opacity-20"
          }`}
        >
          <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-gradient-to-br from-violet-500 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute top-0 -right-4 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-[500px] h-[500px] bg-gradient-to-br from-pink-500 to-rose-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className={`fixed inset-0 pointer-events-none z-0 ${
          theme === "dark"
            ? "bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"
            : "bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"
        }`}
      />

      {/* Modern Navbar with Glassmorphism */}
      <nav
        className={`fixed w-full backdrop-blur-2xl z-50 transition-all duration-300 ${
          theme === "dark"
            ? "bg-slate-900/40 border-b border-white/10"
            : "bg-white/40 border-b border-gray-200/50 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div href="/" className="flex justify-between items-center">
        
            <div className="flex items-center gap-3 group cursor-pointer">
              <img
                src={
                  theme === "dark"
                    ? "https://i.ibb.co.com/Dg4ZL7PK/logo.png"
                    : "https://i.ibb.co.com/qYk1N1tH/Untitled-1.png"
                }
                alt="Omar Abir Logo"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {["about", "projects", "skills", "contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  className={`relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300 capitalize ${
                    activeSection === link
                      ? theme === "dark"
                        ? "text-violet-400 bg-violet-500/10"
                        : "text-violet-600 bg-violet-100"
                      : theme === "dark"
                      ? "text-gray-400 hover:text-violet-400 hover:bg-white/5"
                      : "text-gray-600 hover:text-violet-600 hover:bg-gray-100"
                  }`}
                >
                  {link}
                </a>
              ))}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`ml-2 p-3 rounded-xl transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-violet-500/10 text-violet-400 hover:bg-violet-500/20"
                    : "bg-violet-100 text-violet-600 hover:bg-violet-200"
                }`}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden p-2 rounded-xl transition-all ${
                theme === "dark"
                  ? "text-gray-400 hover:text-violet-400 hover:bg-white/5"
                  : "text-gray-600 hover:text-violet-600 hover:bg-gray-100"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div
              className={`md:hidden mt-4 p-4 rounded-2xl backdrop-blur-xl ${
                theme === "dark"
                  ? "bg-slate-800/50 border border-white/10"
                  : "bg-white/50 border border-gray-200/50"
              }`}
            >
              {["about", "projects", "skills", "contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  className={`block py-3 px-4 rounded-xl mb-2 capitalize font-medium transition-all ${
                    theme === "dark"
                      ? "text-gray-400 hover:text-violet-400 hover:bg-white/5"
                      : "text-gray-600 hover:text-violet-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link}
                </a>
              ))}
              <button
                onClick={toggleTheme}
                className={`w-full mt-2 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-all ${
                  theme === "dark"
                    ? "bg-violet-500/10 text-violet-400"
                    : "bg-violet-100 text-violet-600"
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
        </div>
      </nav>

      {/* Modern Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl ${
                  theme === "dark"
                    ? "bg-violet-500/10 border border-violet-500/20"
                    : "bg-violet-100 border border-violet-200"
                }`}
              >
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
                </div>
                <span
                  className={`text-sm font-medium ${
                    theme === "dark" ? "text-violet-400" : "text-violet-600"
                  }`}
                >
                  Available for work
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1
                  className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  <span className="block mb-2">Creative</span>
                  <span className="block bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                    Developer
                  </span>
                </h1>

                <p
                  className={`text-xl md:text-2xl font-medium ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Hi, I'm{" "}
                  <span
                    className={`font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Omar Mohammad Saidullah
                  </span>
                  . A passionate MERN Stack Developer crafting beautiful digital
                  experiences with modern technologies.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-violet-500/50 hover:shadow-xl hover:shadow-violet-500/60 hover:-translate-y-0.5"
                >
                  <Briefcase size={20} />
                  View My Work
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </a>

                <a
                  href="https://drive.google.com/uc?export=download&id=1CQnXvSeiFZkPHy-LL3OVG9Co71jnRJE4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-xl ${
                    theme === "dark"
                      ? "bg-white/5 border-2 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                      : "bg-white border-2 border-gray-200 text-gray-900 hover:border-gray-300 shadow-lg hover:shadow-xl"
                  }`}
                >
                  <Download size={20} />
                  Download Resume
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-4">
                <span
                  className={`text-sm font-medium ${
                    theme === "dark" ? "text-gray-500" : "text-gray-600"
                  }`}
                >
                  Connect with me:
                </span>
                <div className="flex gap-3">
                  {[
                    {
                      icon: Github,
                      href: "https://github.com/omarabir",
                      label: "GitHub",
                    },
                    {
                      icon: Linkedin,
                      href: "https://www.linkedin.com/in/omar-abir/",
                      label: "LinkedIn",
                    },
                    {
                      icon: () => (
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          width="20"
                          height="20"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      ),
                      href: "https://x.com/Omar_Abir_",
                      label: "X (Twitter)",
                    },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.label}
                      className={`p-3 rounded-xl transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-white/5 hover:bg-violet-500/10 text-gray-400 hover:text-violet-400 border border-white/10 hover:border-violet-500/20"
                          : "bg-gray-100 hover:bg-violet-100 text-gray-600 hover:text-violet-600 border border-gray-200 hover:border-violet-200"
                      }`}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Image/Visual */}
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full opacity-20 blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full opacity-20 blur-3xl animate-pulse animation-delay-2000" />

              {/* Profile Card */}
              <div
                className={`relative backdrop-blur-2xl rounded-3xl overflow-hidden border ${
                  theme === "dark"
                    ? "bg-slate-800/40 border-white/10 shadow-2xl shadow-violet-500/20"
                    : "bg-white/40 border-gray-200/50 shadow-2xl shadow-violet-500/10"
                }`}
              >
                {/* Profile Image */}
                <div className="aspect-square p-8">
                  <div
                    className={`w-full h-full rounded-2xl flex items-center justify-center overflow-hidden ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-violet-600/20 to-purple-600/20 border border-violet-500/20"
                        : "bg-gradient-to-br from-violet-100 to-purple-100 border border-violet-200"
                    }`}
                  >
                    <img
                      src="https://i.ibb.co.com/S4PDN0Gn/Picsart-26-01-05-13-23-25-904.png"
                      alt="Omar Abir - Professional Photo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
            <span
              className={`text-sm font-medium ${
                theme === "dark" ? "text-gray-500" : "text-gray-600"
              }`}
            >
              Scroll to explore
            </span>
            <div
              className={`w-6 h-10 rounded-full border-2 flex items-start justify-center p-2 ${
                theme === "dark"
                  ? "border-violet-400/30"
                  : "border-violet-600/30"
              }`}
            >
              <div
                className={`w-1 h-2 rounded-full ${
                  theme === "dark" ? "bg-violet-400" : "bg-violet-600"
                } animate-pulse`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Modern About Section */}
      <section id="about" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 backdrop-blur-xl ${
                theme === "dark"
                  ? "bg-violet-500/10 border border-violet-500/20"
                  : "bg-violet-100 border border-violet-200"
              }`}
            >
              <User
                size={16}
                className={
                  theme === "dark" ? "text-violet-400" : "text-violet-600"
                }
              />
              <span
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-violet-400" : "text-violet-600"
                }`}
              >
                About Me
              </span>
            </div>
            <h2
              className={`text-4xl md:text-6xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Turning Ideas Into{" "}
              <span className="bg-gradient-to-r from-violet-500 to-purple-500 text-transparent bg-clip-text">
                Reality
              </span>
            </h2>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {/* Who I Am - Large Card */}
            <div
              className={`md:col-span-2 lg:col-span-2 p-8 rounded-3xl backdrop-blur-xl border transition-all duration-300 hover:scale-[1.02] ${
                theme === "dark"
                  ? "bg-slate-800/40 border-white/10"
                  : "bg-white/40 border-gray-200/50"
              }`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`p-3 rounded-2xl ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-violet-600 to-purple-600"
                      : "bg-gradient-to-br from-violet-500 to-purple-500"
                  }`}
                >
                  <Code className="text-white" size={28} />
                </div>
                <div>
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Who I Am
                  </h3>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-violet-400" : "text-violet-600"
                    }`}
                  >
                    MERN Stack Developer
                  </p>
                </div>
              </div>
              <p
                className={`text-lg leading-relaxed ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                I'm a{" "}
                <span
                  className={`font-bold ${
                    theme === "dark" ? "text-violet-400" : "text-violet-600"
                  }`}
                >
                  MERN stack developer
                </span>{" "}
                passionate about crafting digital experiences that matter. I
                transform complex problems into elegant solutions through clean
                code and intuitive design. With expertise in MongoDB,
                Express.js, React, and Node.js, I build full-stack web
                applications that are scalable, performant, and user-friendly.
              </p>
            </div>

            {/* Journey Card */}
            <div
              className={`p-8 rounded-3xl backdrop-blur-xl border transition-all duration-300 hover:scale-[1.02] ${
                theme === "dark"
                  ? "bg-slate-800/40 border-white/10"
                  : "bg-white/40 border-gray-200/50"
              }`}
            >
              <div
                className={`p-3 rounded-2xl mb-4 inline-block ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-pink-600 to-rose-600"
                    : "bg-gradient-to-br from-pink-500 to-rose-500"
                }`}
              >
                <Rocket className="text-white" size={28} />
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                My Journey
              </h3>
              <p
                className={`leading-relaxed ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Started with curiosity about how websites work. Evolved into
                mastering full-stack development through countless hours of
                learning and building real-world solutions.
              </p>
            </div>

            {/* What I Love Card */}
            <div
              className={`p-8 rounded-3xl backdrop-blur-xl border transition-all duration-300 hover:scale-[1.02] ${
                theme === "dark"
                  ? "bg-slate-800/40 border-white/10"
                  : "bg-white/40 border-gray-200/50"
              }`}
            >
              <div
                className={`p-3 rounded-2xl mb-4 inline-block ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-emerald-600 to-teal-600"
                    : "bg-gradient-to-br from-emerald-500 to-teal-500"
                }`}
              >
                <Heart className="text-white" size={28} />
              </div>
              <h3
                className={`text-xl font-bold mb-3 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                What I Love
              </h3>
              <p
                className={`leading-relaxed ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Building interactive UIs with React, designing RESTful APIs, and
                optimizing databases. Love the magic moment when everything
                clicks!
              </p>
            </div>

            {/* Hobbies Card */}
            <div
              className={`p-8 rounded-3xl backdrop-blur-xl border transition-all duration-300 hover:scale-[1.02] ${
                theme === "dark"
                  ? "bg-slate-800/40 border-white/10"
                  : "bg-white/40 border-gray-200/50"
              }`}
            >
              <div
                className={`p-3 rounded-2xl mb-4 inline-block ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-amber-600 to-orange-600"
                    : "bg-gradient-to-br from-amber-500 to-orange-500"
                }`}
              >
                <Coffee className="text-white" size={28} />
              </div>
              <h3
                className={`text-xl font-bold mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Beyond Coding
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Gamepad
                    size={18}
                    className={
                      theme === "dark" ? "text-violet-400" : "text-violet-600"
                    }
                  />
                  <span
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Strategy & Puzzle Games
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Music
                    size={18}
                    className={
                      theme === "dark" ? "text-violet-400" : "text-violet-600"
                    }
                  />
                  <span
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Music While Coding
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Palette
                    size={18}
                    className={
                      theme === "dark" ? "text-violet-400" : "text-violet-600"
                    }
                  />
                  <span
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    UI/UX Design
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 backdrop-blur-xl ${
                theme === "dark"
                  ? "bg-violet-500/10 border border-violet-500/20"
                  : "bg-violet-100 border border-violet-200"
              }`}
            >
              <Briefcase
                size={16}
                className={
                  theme === "dark" ? "text-violet-400" : "text-violet-600"
                }
              />
              <span
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-violet-400" : "text-violet-600"
                }`}
              >
                Featured Projects
              </span>
            </div>
            <h2
              className={`text-4xl md:text-6xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              My Best{" "}
              <span className="bg-gradient-to-r from-violet-500 to-purple-500 text-transparent bg-clip-text">
                Work
              </span>
            </h2>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`group rounded-3xl backdrop-blur-xl border overflow-hidden transition-all duration-300 hover:scale-[1.02] flex flex-col ${
                  theme === "dark"
                    ? "bg-slate-800/40 border-white/10 hover:border-violet-500/50"
                    : "bg-white/40 border-gray-200/50 hover:border-violet-200 hover:shadow-2xl"
                }`}
              >
                {/* Project Image Placeholder */}
                <div
                  className={`h-48 relative overflow-hidden ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-slate-700 to-slate-800"
                      : "bg-gradient-to-br from-gray-100 to-gray-200"
                  }`}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <project.icon
                        size={64}
                        style={{ color: project.color }}
                        className="opacity-40 group-hover:opacity-60 transition-opacity"
                      />
                    </div>
                  )}
                  <div
                    className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-xl ${
                      theme === "dark"
                        ? "bg-black/40 text-white border border-white/10"
                        : "bg-white/40 text-gray-900 border border-gray-200"
                    }`}
                  >
                    {project.tech[0]}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3
                    className={`text-xl font-bold mb-3 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed line-clamp-3 mb-4 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-lg text-xs font-medium ${
                          theme === "dark"
                            ? "bg-violet-500/10 text-violet-400"
                            : "bg-violet-100 text-violet-600"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className={`flex-1 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                        theme === "dark"
                          ? "bg-violet-600 hover:bg-violet-500 text-white"
                          : "bg-violet-600 hover:bg-violet-500 text-white"
                      }`}
                    >
                      View Details
                    </button>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 rounded-xl transition-all ${
                        theme === "dark"
                          ? "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-violet-400 border border-white/10"
                          : "bg-gray-100 hover:bg-violet-100 text-gray-600 hover:text-violet-600 border border-gray-200"
                      }`}
                      title="Live Demo"
                    >
                      <ExternalLink size={18} />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 rounded-xl transition-all ${
                        theme === "dark"
                          ? "bg-white/5 hover:bg-white/10 text-gray-400 hover:text-violet-400 border border-white/10"
                          : "bg-gray-100 hover:bg-violet-100 text-gray-600 hover:text-violet-600 border border-gray-200"
                      }`}
                      title="View Code"
                    >
                      <Github size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border ${
              theme === "dark"
                ? "bg-gray-900 border-cyan-400/30"
                : "bg-white border-gray-300"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className={`sticky top-0 px-6 py-4 flex items-center justify-between border-b ${
                theme === "dark"
                  ? "bg-gray-800 border-cyan-400/30"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <selectedProject.icon
                  size={24}
                  style={{ color: selectedProject.color }}
                />
                <h3 className="text-xl font-bold">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className={`p-2 rounded-lg transition ${
                  theme === "dark"
                    ? "hover:bg-white/10 text-gray-400 hover:text-cyan-400"
                    : "hover:bg-gray-200 text-gray-600 hover:text-blue-600"
                }`}
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              {/* Main Tech Stack */}
              <div>
                <h4
                  className={`text-lg font-bold mb-3 flex items-center gap-2 ${
                    theme === "dark" ? "text-cyan-400" : "text-blue-600"
                  }`}
                >
                  <Code size={20} />
                  Main Technology Stack
                </h4>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {selectedProject.mainTech}
                </p>
              </div>

              {/* Description */}
              <div>
                <h4
                  className={`text-lg font-bold mb-3 flex items-center gap-2 ${
                    theme === "dark" ? "text-cyan-400" : "text-blue-600"
                  }`}
                >
                  <FileCode size={20} />
                  Project Description
                </h4>
                <p
                  className={`leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {selectedProject.fullDescription}
                </p>
              </div>

              {/* Challenges */}
              <div>
                <h4
                  className={`text-lg font-bold mb-3 flex items-center gap-2 ${
                    theme === "dark" ? "text-cyan-400" : "text-blue-600"
                  }`}
                >
                  <Zap size={20} />
                  Challenges Faced
                </h4>
                <p
                  className={`leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {selectedProject.challenges}
                </p>
              </div>

              {/* Improvements */}
              <div>
                <h4
                  className={`text-lg font-bold mb-3 flex items-center gap-2 ${
                    theme === "dark" ? "text-cyan-400" : "text-blue-600"
                  }`}
                >
                  <Rocket size={20} />
                  Future Improvements
                </h4>
                <p
                  className={`leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {selectedProject.improvements}
                </p>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-black hover:shadow-lg hover:shadow-cyan-500/30"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/30"
                  }`}
                >
                  <Globe size={20} />
                  Live Project
                  <ExternalLink size={18} />
                </a>
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border-2 ${
                    theme === "dark"
                      ? "border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                      : "border-blue-600 text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <Github size={20} />
                  GitHub Repo
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Skills Section */}
      <section id="skills" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 backdrop-blur-xl ${
                theme === "dark"
                  ? "bg-violet-500/10 border border-violet-500/20"
                  : "bg-violet-100 border border-violet-200"
              }`}
            >
              <Zap
                size={16}
                className={
                  theme === "dark" ? "text-violet-400" : "text-violet-600"
                }
              />
              <span
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-violet-400" : "text-violet-600"
                }`}
              >
                Skills & Tools
              </span>
            </div>
            <h2
              className={`text-4xl md:text-6xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              My{" "}
              <span className="bg-gradient-to-r from-violet-500 to-purple-500 text-transparent bg-clip-text">
                Expertise
              </span>
            </h2>
          </div>

          {/* Languages */}
          <div className="mb-12">
            <h3
              className={`text-2xl font-bold mb-6 ${
                theme === "dark" ? "text-violet-400" : "text-violet-600"
              }`}
            >
              Languages
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills
                .filter((s) => s.category === "Languages")
                .map((skill, i) => (
                  <div
                    key={i}
                    className={`group rounded-2xl p-6 backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                      theme === "dark"
                        ? "bg-slate-800/40 border-white/10 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/20"
                        : "bg-white/40 border-gray-200/50 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/20"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <skill.icon
                        className={`mb-4 transition-transform group-hover:scale-110 ${
                          theme === "dark"
                            ? "text-violet-400"
                            : "text-violet-600"
                        }`}
                        size={48}
                      />
                      <span
                        className={`font-bold mb-3 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {skill.name}
                      </span>

                      <div
                        className={`w-full rounded-full h-2 overflow-hidden ${
                          theme === "dark" ? "bg-slate-700" : "bg-gray-200"
                        }`}
                      >
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            theme === "dark"
                              ? "bg-gradient-to-r from-violet-500 to-purple-500"
                              : "bg-gradient-to-r from-violet-600 to-purple-600"
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
          </div>

          {/* UI Technologies */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div
                className={`h-1 w-12 rounded-full ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                    : "bg-gradient-to-r from-cyan-600 to-blue-600"
                }`}
              />
              <h3
                className={`text-3xl font-bold ${
                  theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                }`}
              >
                UI Technologies
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills
                .filter((s) => s.category === "UI")
                .map((skill, i) => (
                  <div
                    key={i}
                    className={`group relative rounded-3xl p-8 backdrop-blur-xl border transition-all duration-500 hover:-translate-y-2 ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/30"
                        : "bg-gradient-to-br from-white/80 to-cyan-50/50 border-cyan-200/50 hover:border-cyan-300 hover:shadow-2xl hover:shadow-cyan-500/20"
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full" />
                    <div className="flex flex-col items-center text-center relative z-10">
                      <div
                        className={`mb-6 p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                          theme === "dark" ? "bg-cyan-500/10" : "bg-cyan-100"
                        }`}
                      >
                        <img
                          src={skill.iconUrl}
                          alt={skill.name}
                          className="w-16 h-16 object-contain"
                          style={{
                            filter:
                              theme === "dark" ? "brightness(1.2)" : "none",
                          }}
                        />
                      </div>
                      <span
                        className={`font-bold text-lg mb-4 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {skill.name}
                      </span>

                      <div className="w-full">
                        <div className="flex justify-between items-center mb-2">
                          <span
                            className={`text-xs font-semibold ${
                              theme === "dark"
                                ? "text-cyan-400"
                                : "text-cyan-600"
                            }`}
                          >
                            Proficiency
                          </span>
                          <span
                            className={`text-sm font-bold ${
                              theme === "dark"
                                ? "text-cyan-400"
                                : "text-cyan-600"
                            }`}
                          >
                            {skill.level}%
                          </span>
                        </div>
                        <div
                          className={`w-full rounded-full h-3 overflow-hidden ${
                            theme === "dark" ? "bg-slate-700/50" : "bg-gray-200"
                          }`}
                        >
                          <div
                            className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 shadow-lg"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Frontend Technologies */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div
                className={`h-1 w-12 rounded-full ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-blue-400 to-indigo-500"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600"
                }`}
              />
              <h3
                className={`text-3xl font-bold ${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                }`}
              >
                Frontend Technologies
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills
                .filter((s) => s.category === "Frontend")
                .map((skill, i) => (
                  <div
                    key={i}
                    className={`group relative rounded-3xl p-8 backdrop-blur-xl border transition-all duration-500 hover:-translate-y-2 ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-blue-500/20 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/30"
                        : "bg-gradient-to-br from-white/80 to-blue-50/50 border-blue-200/50 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/20"
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full" />
                    <div className="flex flex-col items-center text-center relative z-10">
                      <div
                        className={`mb-6 p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                          theme === "dark" ? "bg-blue-500/10" : "bg-blue-100"
                        }`}
                      >
                        <img
                          src={skill.iconUrl}
                          alt={skill.name}
                          className="w-16 h-16 object-contain"
                          style={{
                            filter:
                              theme === "dark" && skill.name === "Next.js"
                                ? "invert(1) brightness(2)"
                                : theme === "dark"
                                ? "brightness(1.2)"
                                : "none",
                          }}
                        />
                      </div>
                      <span
                        className={`font-bold text-lg mb-4 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {skill.name}
                      </span>

                      <div className="w-full">
                        <div className="flex justify-between items-center mb-2">
                          <span
                            className={`text-xs font-semibold ${
                              theme === "dark"
                                ? "text-blue-400"
                                : "text-blue-600"
                            }`}
                          >
                            Proficiency
                          </span>
                          <span
                            className={`text-sm font-bold ${
                              theme === "dark"
                                ? "text-blue-400"
                                : "text-blue-600"
                            }`}
                          >
                            {skill.level}%
                          </span>
                        </div>
                        <div
                          className={`w-full rounded-full h-3 overflow-hidden ${
                            theme === "dark" ? "bg-slate-700/50" : "bg-gray-200"
                          }`}
                        >
                          <div
                            className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 shadow-lg"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Backend Technologies */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div
                className={`h-1 w-12 rounded-full ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-green-400 to-emerald-500"
                    : "bg-gradient-to-r from-green-600 to-emerald-600"
                }`}
              />
              <h3
                className={`text-3xl font-bold ${
                  theme === "dark" ? "text-green-400" : "text-green-600"
                }`}
              >
                Backend Technologies
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills
                .filter((s) => s.category === "Backend")
                .map((skill, i) => (
                  <div
                    key={i}
                    className={`group relative rounded-3xl p-8 backdrop-blur-xl border transition-all duration-500 hover:-translate-y-2 ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-green-500/20 hover:border-green-400/50 hover:shadow-2xl hover:shadow-green-500/30"
                        : "bg-gradient-to-br from-white/80 to-green-50/50 border-green-200/50 hover:border-green-300 hover:shadow-2xl hover:shadow-green-500/20"
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-500/10 to-transparent rounded-bl-full" />
                    <div className="flex flex-col items-center text-center relative z-10">
                      <div
                        className={`mb-6 p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                          theme === "dark" ? "bg-green-500/10" : "bg-green-100"
                        }`}
                      >
                        <img
                          src={skill.iconUrl}
                          alt={skill.name}
                          className="w-16 h-16 object-contain"
                          style={{
                            filter:
                              theme === "dark" && skill.name === "Express"
                                ? "invert(1) brightness(2)"
                                : theme === "dark"
                                ? "brightness(1.2)"
                                : "none",
                          }}
                        />
                      </div>
                      <span
                        className={`font-bold text-lg mb-4 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {skill.name}
                      </span>

                      <div className="w-full">
                        <div className="flex justify-between items-center mb-2">
                          <span
                            className={`text-xs font-semibold ${
                              theme === "dark"
                                ? "text-green-400"
                                : "text-green-600"
                            }`}
                          >
                            Proficiency
                          </span>
                          <span
                            className={`text-sm font-bold ${
                              theme === "dark"
                                ? "text-green-400"
                                : "text-green-600"
                            }`}
                          >
                            {skill.level}%
                          </span>
                        </div>
                        <div
                          className={`w-full rounded-full h-3 overflow-hidden ${
                            theme === "dark" ? "bg-slate-700/50" : "bg-gray-200"
                          }`}
                        >
                          <div
                            className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 shadow-lg"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Code Tools */}
          <div className="mb-12">
            <h3
              className={`text-2xl font-bold mb-6 ${
                theme === "dark" ? "text-pink-400" : "text-pink-600"
              }`}
            >
              Code Tools & Software
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills
                .filter((s) => s.category === "Code Tools")
                .map((skill, i) => (
                  <div
                    key={i}
                    className={`group rounded-2xl p-6 backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                      theme === "dark"
                        ? "bg-slate-800/40 border-white/10 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/20"
                        : "bg-white/40 border-gray-200/50 hover:border-pink-300 hover:shadow-lg hover:shadow-pink-500/20"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <skill.icon
                        className={`mb-4 transition-transform group-hover:scale-110 ${
                          theme === "dark" ? "text-pink-400" : "text-pink-600"
                        }`}
                        size={48}
                      />
                      <span
                        className={`font-bold mb-3 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {skill.name}
                      </span>

                      <div
                        className={`w-full rounded-full h-2 overflow-hidden ${
                          theme === "dark" ? "bg-slate-700" : "bg-gray-200"
                        }`}
                      >
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            theme === "dark"
                              ? "bg-gradient-to-r from-pink-400 to-rose-500"
                              : "bg-gradient-to-r from-pink-600 to-rose-600"
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
          </div>

          {/* Design Tools */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <div
                className={`h-1 w-12 rounded-full ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-orange-400 to-amber-500"
                    : "bg-gradient-to-r from-orange-600 to-amber-600"
                }`}
              />
              <h3
                className={`text-3xl font-bold ${
                  theme === "dark" ? "text-orange-400" : "text-orange-600"
                }`}
              >
                Design Tools
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills
                .filter((s) => s.category === "Design Tools")
                .map((skill, i) => (
                  <div
                    key={i}
                    className={`group relative rounded-3xl p-8 backdrop-blur-xl border transition-all duration-500 hover:-translate-y-2 ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-orange-500/20 hover:border-orange-400/50 hover:shadow-2xl hover:shadow-orange-500/30"
                        : "bg-gradient-to-br from-white/80 to-orange-50/50 border-orange-200/50 hover:border-orange-300 hover:shadow-2xl hover:shadow-orange-500/20"
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full" />
                    <div className="flex flex-col items-center text-center relative z-10">
                      <div
                        className={`mb-6 p-4 rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                          theme === "dark"
                            ? "bg-orange-500/10"
                            : "bg-orange-100"
                        }`}
                      >
                        <img
                          src={skill.iconUrl}
                          alt={skill.name}
                          className="w-16 h-16 object-contain"
                          style={{
                            filter:
                              theme === "dark" ? "brightness(1.2)" : "none",
                          }}
                        />
                      </div>
                      <span
                        className={`font-bold text-lg mb-4 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {skill.name}
                      </span>

                      <div className="w-full">
                        <div className="flex justify-between items-center mb-2">
                          <span
                            className={`text-xs font-semibold ${
                              theme === "dark"
                                ? "text-orange-400"
                                : "text-orange-600"
                            }`}
                          >
                            Proficiency
                          </span>
                          <span
                            className={`text-sm font-bold ${
                              theme === "dark"
                                ? "text-orange-400"
                                : "text-orange-600"
                            }`}
                          >
                            {skill.level}%
                          </span>
                        </div>
                        <div
                          className={`w-full rounded-full h-3 overflow-hidden ${
                            theme === "dark" ? "bg-slate-700/50" : "bg-gray-200"
                          }`}
                        >
                          <div
                            className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 shadow-lg"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div
            className={`p-6 rounded-2xl backdrop-blur-xl border ${
              theme === "dark"
                ? "bg-slate-800/40 border-white/10"
                : "bg-white/40 border-gray-200/50"
            }`}
          >
            <p
              className={`font-mono text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <span
                className={
                  theme === "dark" ? "text-violet-400" : "text-violet-600"
                }
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
      <section
        id="contact"
        className="py-32 px-6 relative z-10 min-h-screen flex items-center"
      >
        <div className="max-w-4xl mx-auto text-center w-full">
          <div className="mb-16">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 backdrop-blur-xl ${
                theme === "dark"
                  ? "bg-violet-500/10 border border-violet-500/20"
                  : "bg-violet-100 border border-violet-200"
              }`}
            >
              <Mail
                size={16}
                className={
                  theme === "dark" ? "text-violet-400" : "text-violet-600"
                }
              />
              <span
                className={`text-sm font-medium ${
                  theme === "dark" ? "text-violet-400" : "text-violet-600"
                }`}
              >
                Get In Touch
              </span>
            </div>
            <h2
              className={`text-4xl md:text-6xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Let's Work{" "}
              <span className="bg-gradient-to-r from-violet-500 to-purple-500 text-transparent bg-clip-text">
                Together
              </span>
            </h2>
          </div>

          <div
            className={` p-8 rounded-2xl backdrop-blur-sm border mb-12 max-w-2xl mx-auto font-mono text-sm ${
              theme === "dark"
                ? "bg-white/5 border-cyan-400/30"
                : "bg-white border-gray-300"
            }`}
          >
            <div className="space-y-2 text-left">
              <p
                className={
                  theme === "dark" ? "text-purple-400" : "text-purple-600"
                }
              >
                <span className="opacity-50">if</span>{" "}
                <span
                  className={theme === "dark" ? "text-white" : "text-gray-900"}
                >
                  (
                </span>
                <span
                  className={
                    theme === "dark" ? "text-blue-400" : "text-blue-600"
                  }
                >
                  you.need
                </span>{" "}
                <span
                  className={
                    theme === "dark" ? "text-cyan-400" : "text-blue-600"
                  }
                >
                  ===
                </span>{" "}
                <span
                  className={
                    theme === "dark" ? "text-green-400" : "text-green-600"
                  }
                >
                  "developer"
                </span>
                <span
                  className={theme === "dark" ? "text-white" : "text-gray-900"}
                >
                  )
                </span>{" "}
                <span
                  className={theme === "dark" ? "text-white" : "text-gray-900"}
                >
                  {"{"}
                </span>
              </p>
              <p
                className={
                  theme === "dark" ? "text-blue-400 ml-6" : "text-blue-600 ml-6"
                }
              >
                contact
                <span
                  className={theme === "dark" ? "text-white" : "text-gray-900"}
                >
                  (
                </span>
                <span
                  className={
                    theme === "dark" ? "text-green-400" : "text-green-600"
                  }
                >
                  "Omar Abir"
                </span>
                <span
                  className={theme === "dark" ? "text-white" : "text-gray-900"}
                >
                  );
                </span>
              </p>
              <p
                className={
                  theme === "dark"
                    ? "text-purple-400 ml-6"
                    : "text-purple-600 ml-6"
                }
              >
                return{" "}
                <span
                  className={
                    theme === "dark" ? "text-green-400" : "text-green-600"
                  }
                >
                  "Amazing Projects"
                </span>
                <span
                  className={theme === "dark" ? "text-white" : "text-gray-900"}
                >
                  ;
                </span>
              </p>
              <p className={theme === "dark" ? "text-white" : "text-gray-900"}>
                {"}"}
              </p>
            </div>
          </div>

          {/* Contact Information Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Email */}
            <a
              href="mailto:abiromor506@gmail.com"
              className={`p-8 rounded-3xl backdrop-blur-xl border transition-all duration-300 hover:-translate-y-2 ${
                theme === "dark"
                  ? "bg-slate-800/40 border-white/10 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/30"
                  : "bg-white/40 border-gray-200/50 hover:border-violet-300 hover:shadow-2xl hover:shadow-violet-500/20"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <Mail
                  className={`mb-3 ${
                    theme === "dark" ? "text-cyan-400" : "text-blue-600"
                  }`}
                  size={32}
                />
                <h4 className="font-bold mb-2">Email</h4>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  abiromor506@gmail.com
                </p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+8801342246229"
              className={`p-8 rounded-3xl backdrop-blur-xl border transition-all duration-300 hover:-translate-y-2 ${
                theme === "dark"
                  ? "bg-slate-800/40 border-white/10 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/30"
                  : "bg-white/40 border-gray-200/50 hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/20"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <Phone
                  className={`mb-3 ${
                    theme === "dark" ? "text-purple-400" : "text-purple-600"
                  }`}
                  size={32}
                />
                <h4 className="font-bold mb-2">Phone</h4>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  +880 1799-224629
                </p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/01799459659"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-8 rounded-3xl backdrop-blur-xl border transition-all duration-300 hover:-translate-y-2 ${
                theme === "dark"
                  ? "bg-slate-800/40 border-white/10 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/30"
                  : "bg-white/40 border-gray-200/50 hover:border-green-300 hover:shadow-2xl hover:shadow-green-500/20"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <MessageCircle
                  className={`mb-3 ${
                    theme === "dark" ? "text-green-400" : "text-green-600"
                  }`}
                  size={32}
                />
                <h4 className="font-bold mb-2">WhatsApp</h4>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  +880 1799-459659
                </p>
              </div>
            </a>
          </div>

          {/* Social Media Links */}
          <div className="flex gap-6 justify-center flex-wrap ">
            {[
              {
                icon: Github,
                href: "https://github.com/omarabir",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/omar-abir/",
                label: "LinkedIn",
              },
              {
                icon: () => (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="20"
                    height="20"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                ),
                href: "https://x.com/Omar_Abir_",
                label: "X (Twitter)",
              },
             
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={` group relative p-8 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-110 ${
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
          <span
            className={theme === "dark" ? "text-cyan-400" : "text-blue-600"}
          >
            {"<"}
          </span>
          © 2025 Omar Abir
          <span
            className={theme === "dark" ? "text-cyan-400" : "text-blue-600"}
          >
            {"/>"}
          </span>
        </p>
      </footer>
    </div>
  );
}
