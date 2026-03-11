"use client";
import Image from "next/image";
import lang from "@/data/lang";
import { useEffect, useRef, useState } from "react";
import Section from "@/components/Section";
import ContactForm from "@/components/ContactForm";

import ArchitectureGrid from "@/components/ArchitectureGrid";

import ReferencesList from "@/components/ReferencesList";

import MobileSection from "@/components/MobileSection";

import getContactContent from "@/components/mobile/contactContent";
import getAboutContent from "@/components/mobile/aboutContent";
import ArchitectureMobile from "@/components/ArchitectureMobile";
import AboutDesktop from "@/components/desktop/AboutDesktop";
import getServicesContent from "@/components/mobile/servicesContent";
import ServicesDesktop from "@/components/desktop/ServicesDesktop";

export default function Home() {
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const architectureSectionRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lastSection, setLastSection] = useState<string | null>(null);

  const [triggerAboutAnimation, setTriggerAboutAnimation] = useState(false);
  const [triggerServicesAnimation, setTriggerServicesAnimation] =
    useState(false);
  const [triggerArchitectureAnimation, setTriggerArchitectureAnimation] =
    useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [triggerWebAnimation, setTriggerWebAnimation] = useState(false);
  const [triggerContactAnimation, setTriggerContactAnimation] = useState(false);
  const [language, setLanguage] = useState<"en" | "cz">("en");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "cz" : "en";
    localStorage.setItem("preferredLanguage", newLang);

    const url = new URL(window.location.href);
    url.searchParams.set("lang", newLang);

    // This reloads the page and sets URL properly
    window.location.href = url.toString();
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const urlLang = url.searchParams.get("lang");

    if (urlLang === "cz" || urlLang === "en") {
      setLanguage(urlLang);
      localStorage.setItem("preferredLanguage", urlLang);
    } else {
      const saved = localStorage.getItem("preferredLanguage");
      if (saved === "cz" || saved === "en") {
        setLanguage(saved);
      } else {
        setLanguage("en"); // fallback default
      }
    }
  }, []);

  // Save on change
  useEffect(() => {
    localStorage.setItem("preferredLanguage", language);
  }, [language]);
  const t = lang[language].hero;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "about") {
              requestAnimationFrame(() => setTriggerAboutAnimation(true));
            } else if (entry.target.id === "services") {
              requestAnimationFrame(() => setTriggerServicesAnimation(true));
            } else if (entry.target.id === "architecture") {
              requestAnimationFrame(() =>
                setTriggerArchitectureAnimation(true)
              );
            } else if (entry.target.id === "contact") {
              requestAnimationFrame(() => setTriggerContactAnimation(true));
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.3, // Lower threshold to trigger animation earlier
      }
    );

    if (aboutSectionRef.current) observer.observe(aboutSectionRef.current);
    if (servicesSectionRef.current)
      observer.observe(servicesSectionRef.current);
    if (architectureSectionRef.current)
      observer.observe(architectureSectionRef.current);
    if (contactSectionRef.current) observer.observe(contactSectionRef.current);

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string, fromId?: string) => {
    if (fromId) setLastSection(fromId);

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });

      // Delay animation trigger slightly to allow smooth scroll to happen first
      setTimeout(() => {
        if (id === "about") setTriggerAboutAnimation(true);
        if (id === "services") setTriggerServicesAnimation(true);
        if (id === "architecture") setTriggerArchitectureAnimation(true);
        if (id === "web") setTriggerWebAnimation(true);
      }, 300); // 300ms is usually good enough
    }
  };
  const handleComingSoon = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 2500); // hide after 2.5 seconds
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize(); // run once on first mount to get correct initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const contactContent = getContactContent(language);
  const aboutContent = getAboutContent(language);
  const servicesContent = isMobile
    ? getServicesContent(language, (id, fromId) => {
        if (id === "web") {
          setShowComingSoon(true);
          setTimeout(() => setShowComingSoon(false), 2500);
        } else {
          handleNavClick(id, fromId);
        }
      })
    : getServicesContent(language);

  return (
    <main className="relative bg-black text-[#FFFFFF] font-montserrat">
      {showComingSoon && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 px-6 py-3 bg-white text-black text-lg rounded shadow-lg z-[9999]">
          {language === "cz" ? "Již brzy" : "Coming Soon"}
        </div>
      )}
      <div
        onClick={toggleLanguage}
        className="absolute top-15 right-25 z-50 text-sm font-semibold tracking-wide cursor-pointer hover:scale-105 transition"
      >
        {language === "en" ? "CZ" : "EN"}
      </div>
      {/* Hero Section */}
      <section className="flex flex-col h-screen w-full items-center justify-center gap-[5vw] md:gap-[8vw] lg:gap-[10vw]">
        <div className="relative w-[35vw] md:w-[20vw] lg:w-[15vw]  bg-black">
          <div className="absolute top-1/2  left-1/2 w-16 h-16 md:w-12 md:h-12 lg:w-10 lg:h-10 bg-[#FFFFFF] rounded-full z-0 animate-expandCircleFadeIn origin-center transform -translate-x-1/2 -translate-y-1/2" />
          <Image
            src="/background1.png"
            alt="Animated Logo"
            width={2000} // you can adjust based on your asset size
            height={1000}
            priority
            className="block relative z-20 logo-img"
            style={{
              width: "200%",
              maxWidth: "none",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        <nav className="flex gap-[5vw] md:gap-[8vw] lg:gap-[10vw] text-[3vw] md:text-[2vw] lg:text-[1.2vw] opacity-0 animate-fadeInNav">
          <span className="inline-block transition-transform duration-300 hover:scale-105">
            <a
              onClick={() => handleNavClick("about")}
              className="cursor-pointer"
            >
              {t.about}
            </a>
          </span>
          <span className="inline-block transition-transform duration-300 hover:scale-105">
            <a
              onClick={() => handleNavClick("services")}
              className="cursor-pointer"
            >
              {t.services}
            </a>
          </span>
          <span className="inline-block transition-transform duration-300 hover:scale-105">
            <a
              onClick={() => handleNavClick("contact")}
              className="cursor-pointer"
            >
              {t.contact}
            </a>
          </span>
        </nav>
      </section>
      {triggerAboutAnimation && (
        <div className="w-full h-[2px] bg-white animate-horizontalSplit" />
      )}

      {/* About Section */}
      {isMobile ? (
        <MobileSection
          id="about"
          leftContent={aboutContent.leftContent}
          rightContentBlocks={[
            aboutContent.natashaBlock,
            aboutContent.nedeljkoBlock,
          ]}
          logo={aboutContent.logo}
          background="black"
        />
      ) : (
        <AboutDesktop
          refProp={aboutSectionRef}
          trigger={triggerAboutAnimation}
          language={language}
        />
      )}
      {/* Services Section */}

      {isMobile ? (
        <MobileSection
          id="services"
          leftContent={servicesContent.leftContent}
          rightContentBlocks={servicesContent.rightContentBlocks}
          logo={null}
          background="black"
          handleNavClick={handleNavClick}
        />
      ) : (
        <ServicesDesktop
          refProp={servicesSectionRef}
          trigger={triggerServicesAnimation}
          language={language}
          handleComingSoon={handleComingSoon}
        />
      )}
      {isMobile ? (
        <div id="architecture">
          <ArchitectureMobile language={language} />
        </div>
      ) : (
        <Section
          id="architecture"
          customLayout={true}
          refProp={architectureSectionRef}
          leftContent={
            <div className="relative w-[30%] bg-black flex items-center justify-center overflow-hidden">
              {/* Fat left white line */}
              {triggerArchitectureAnimation && (
                <div className="absolute top-0 left-0 w-[8%] h-full bg-[#FFFFFF] animate-slideDown z-0" />
              )}

              {/* Content area */}
              <div className="relative z-10 gap-2 w-full h-full px-2 py-10 flex flex-col justify-around text-[#FFFFFF] font-montserrat">
                <h2
                  className={`text-4xl font-bold text-center ${
                    triggerArchitectureAnimation
                      ? "fade-in-delayed"
                      : "opacity-0"
                  }`}
                  style={
                    triggerArchitectureAnimation
                      ? { animationDelay: "0.5s" }
                      : {}
                  }
                >
                  {lang[language].architecture.heading}
                </h2>

                <div className="px-10 flex flex-col gap-14 text-center pb-10">
                  <h3
                    className={`text-3xl ${
                      triggerArchitectureAnimation
                        ? "fade-in-delayed"
                        : "opacity-0"
                    }`}
                    style={{ animationDelay: "0.8s" }}
                  >
                    <strong>{lang[language].architecture.references}</strong>
                  </h3>
                  <ReferencesList
                    hoveredSlug={hoveredSlug}
                    setHoveredSlug={setHoveredSlug}
                    trigger={triggerArchitectureAnimation}
                    language={language}
                  />
                </div>

                <div
                  className={`flex justify-center ${
                    triggerArchitectureAnimation
                      ? "fade-in-delayed"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: "2.1s" }}
                ></div>
              </div>
            </div>
          }
          
          rightContent={
            <div className="relative w-full h-full bg-black text-white font-montserrat overflow-hidden ">
              {/* Tiny vertical lines */}
              {triggerArchitectureAnimation && (
                <>
                  <div className="absolute top-0 left-0 w-[2px] h-1/2 bg-white animate-lineDown z-10" />
                  <div className="absolute bottom-0 left-0 w-[2px] h-1/2 bg-white animate-lineUp z-10" />
                </>
              )}
              {triggerArchitectureAnimation && (
                <div className="absolute top left-0 h-[2px] w-0 bg-white animate-horizontalSplit z-10" />
              )}

              {/* Main content container */}
              <div className="absolute inset-0 z-20 px-10 py-10 overflow-y-auto flex items-center justify-center">
                {triggerArchitectureAnimation && (
                  <ArchitectureGrid
                    hoveredSlug={hoveredSlug}
                    trigger={triggerArchitectureAnimation}
                    language={language}
                  />
                )}
              </div>
            </div>
          }
        />
      )}
      {isMobile ? (
        <MobileSection
          id="contact"
          leftContent={contactContent.leftContent}
          rightContentBlocks={contactContent.rightContentBlocks}
          background="black"
        />
      ) : (
        <Section
          id="contact"
          customLayout={true}
          refProp={contactSectionRef}
          
          height="h-auto"
          leftContent={
            <div className="relative w-[30%] bg-black flex items-center justify-center overflow-hidden">
              {triggerContactAnimation && (
                <div className="absolute top-0 left-0 w-[8%] h-full bg-[#FFFFFF] animate-slideDown z-0" />
              )}

              <div
                className={`relative z-10 w-full px-4 flex flex-col items-center gap-20 text-white font-montserrat ${
                  triggerContactAnimation ? "fade-in-delayed" : "opacity-0"
                }`}
              >
                <div className="px-4 flex flex-col gap-4 text-center text-lg lg:text-sm xl:text-lg">
                  {contactContent.leftContent}
                </div>
              </div>
            </div>
          }
          rightContent={
            <div className="relative w-full bg-black text-white font-montserrat py-20">
              {triggerContactAnimation && (
                <>
                  <div className="absolute top-0 left-0 w-[2px] h-1/2 bg-white animate-lineDown z-20" />
                  <div className="absolute bottom-0 left-0 w-[2px] h-1/2 bg-white animate-lineUp z-20" />
                  <div className="absolute top-0 left-0 h-[2px] w-0 bg-white animate-horizontalSplit z-20" />
                </>
              )}

              <div className="relative z-20 w-full max-w-xl mx-auto px-6">
                <ContactForm
                  trigger={triggerContactAnimation}
                  language={language}
                />
              </div>
            </div>
          }
        />
      )}
    </main>
  );
}
