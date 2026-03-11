"use client";

import Image from "next/image";
import { RefObject } from "react";
import lang from "@/data/lang";
import ServiceCard from "@/components/ServiceCard";

interface Props {
  language: "en" | "cz";
  trigger: boolean;
  refProp: RefObject<HTMLDivElement | null>;
  handleComingSoon: () => void;
}

export default function ServicesDesktop({
  language,
  trigger,
  refProp,
  handleComingSoon,
}: Props) {
  const t = lang[language].services;

  return (
    <section
      id="services"
      ref={refProp}
      className="relative w-full min-h-screen flex"
    >
      {/* LEFT SIDE */}
      <div className="relative w-[30%] bg-black flex items-center justify-center overflow-hidden">
        {trigger && (
          <div className="absolute top-0 left-0 w-[8%] h-full bg-white animate-slideDown z-0" />
        )}

        <div className="relative z-10 w-full h-full py-20 pl-12 px-2 flex flex-col justify-start text-white font-montserrat gap-40">
          <h2
            className={`text-4xl font-bold text-center ${
              trigger ? "fade-in-delayed" : "opacity-0"
            }`}
            style={trigger ? { animationDelay: "0.5s" } : {}}
          >
            {t.heading}
          </h2>

          <div className="flex flex-col gap-10 text-center text-lg lg:text-sm xl:text-lg">
            {t.paragraphs.map((p, i) => (
              <p
                key={i}
                className={trigger ? "fade-in-delayed" : "opacity-0"}
                style={{ animationDelay: `${0.8 + i * 0.3}s` }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative w-full bg-black text-white font-montserrat overflow-hidden">
        {trigger && (
          <>
            <div className="absolute top-0 left-0 w-[2px] h-1/2 bg-white animate-lineDown z-10" />
            <div className="absolute bottom-0 left-0 w-[2px] h-1/2 bg-white animate-lineUp z-10" />
            <div className="absolute top-0 left-0 h-[2px] w-0 bg-white animate-horizontalSplit z-10" />
            <div className="absolute top-1/2 left-1/2 w-[2px] h-full bg-white animate-lineUpFromCenter origin-bottom z-10" />
            <div className="absolute top-1/2 left-1/2 w-[2px] h-full bg-white animate-lineDownFromCenter origin-top z-10" />
          </>
        )}

        <div className="absolute inset-0 z-20 flex flex-row px-10 py-10">
          {/* Architecture */}
          <div className="w-1/2 flex flex-col items-center gap-10 px-6 text-center group">
            <div
              className={`w-full ${trigger ? "fade-in-delayed" : "opacity-0"}`}
              style={{ animationDelay: "0.4s" }}
            >
              <ServiceCard
                title={t.architecture.title}
                description={t.architecture.description}
                onClick={() =>
                  document
                    .getElementById("architecture")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              />
            </div>

            <div
              className={`max-w-prose text-lg lg:text-sm xl:text-lg flex flex-col gap-6 ${
                trigger ? "fade-in-delayed" : "opacity-0"
              }`}
              style={{ animationDelay: "1.2s" }}
            >
              {t.architecture.blocks.map((section, i) => (
                <div className="flex flex-col gap-4" key={i}>
                  <h3>
                    <strong>{section.heading}</strong>
                  </h3>
                  <p>{section.text}</p>
                </div>
              ))}
            </div>

            <Image
              src="/picture1.png"
              alt="Architecture example"
              width={600}
              height={400}
              priority
              className={`w-[45%] rounded shadow-md ${
                trigger ? "fade-in-delayed" : "opacity-0"
              }`}
              style={{ animationDelay: "1.8s" }}
            />
          </div>

          {/* Web */}
          <div className="w-1/2 flex flex-col items-center gap-10 px-6 text-center group">
            <div
              className={`w-full ${trigger ? "fade-in-delayed" : "opacity-0"}`}
              style={{ animationDelay: "0.6s" }}
            >
              <ServiceCard
                title={t.web.title}
                description={t.web.description}
                onClick={handleComingSoon}
              />
            </div>

            <Image
              src="/picture4.png"
              alt="Web project"
              width={600}
              height={400}
              priority
              className={`w-[45%] rounded shadow-md ${
                trigger ? "fade-in-delayed" : "opacity-0"
              }`}
              style={{ animationDelay: "1.6s" }}
            />

            <div
              className={`max-w-prose text-lg lg:text-sm xl:text-lg flex flex-col gap-6 ${
                trigger ? "fade-in-delayed" : "opacity-0"
              }`}
              style={{ animationDelay: "1.4s" }}
            >
              {t.web.blocks.map((block, index) => (
                <div className="flex flex-col gap-6" key={index}>
                  <h3>
                    <strong>{block.heading}</strong>
                  </h3>
                  <p>{block.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}