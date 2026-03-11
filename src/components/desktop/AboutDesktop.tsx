"use client";

import Image from "next/image";
import { RefObject } from "react";
import lang from "@/data/lang";
import Section from "@/components/Section";

interface Props {
  language: "en" | "cz";
  trigger: boolean;
  refProp: RefObject<HTMLDivElement | null>;
}

export default function AboutDesktop({ language, trigger, refProp }: Props) {
  const content = lang[language].about;

  return (
    <Section
      id="about"
      refProp={refProp}
      
      customLayout={true}
      leftContent={
        <div className="relative w-[30%] bg-black flex items-center justify-center overflow-hidden">
          {trigger && (
            <div className="absolute top-0 left-0 w-[8%] h-full bg-white animate-slideDown z-0" />
          )}
          <div className="relative z-10 w-full h-full px-6 py-10 flex flex-col justify-around text-white font-montserrat gap-10">
            <h2
              className={`text-4xl font-bold text-center ${
                trigger ? "fade-in-delayed" : "opacity-0"
              }`}
              style={trigger ? { animationDelay: "0.5s" } : {}}
            >
              {content.heading}
            </h2>
            <div className="px-5 pl-10 flex flex-col gap-10 text-center text-base max-w-prose text-lg lg:text-sm xl:text-lg">
              {content.paragraphs.map((text, i) => (
                <p
                  key={i}
                  className={trigger ? "fade-in-delayed" : "opacity-0"}
                  style={{ animationDelay: `${1.1 + i * 0.3}s` }}
                >
                  {text}
                </p>
              ))}
            </div>
            <div
              className={`flex justify-center ${
                trigger ? "fade-in-delayed" : "opacity-0"
              }`}
              style={{ animationDelay: "2.1s" }}
            >
              <Image
                src={content.logoSrc}
                alt="N-design logo"
                width={300}
                height={100}
                priority
                className="w-[30%]"
              />
            </div>
          </div>
        </div>
      }
      rightContent={
        <div className="relative w-full h-full bg-black text-white font-montserrat overflow-hidden">
          {trigger && (
            <>
              <div className="absolute top-0 left-0 w-[2px] h-1/2 bg-white animate-lineDown z-10" />
              <div className="absolute bottom-0 left-0 w-[2px] h-1/2 bg-white animate-lineUp z-10" />
              <div className="absolute top-1/2 left-0 h-[2px] w-0 bg-white animate-horizontalSplit z-10" />
            </>
          )}

          <div className="relative z-20 w-full h-full grid grid-rows-2 gap-12 px-4 py-4 overflow-hidden">
            {/* Natasha Row */}
            <div className="grid grid-cols-3 gap-6 pt-2 items-start">
              <div className="flex flex-col items-center gap-4 col-span-1">
                <div
                  className={`relative w-[8vw] aspect-square min-w-[130px] rounded-full overflow-hidden ${
                    trigger ? "fade-in-delayed" : "opacity-0"
                  }`}
                  style={{ animationDelay: "0.3s" }}
                >
                  <Image
                    src={content.natasha.image}
                    alt="Natasha"
                    fill
                    priority
                    className="object-cover object-top"
                  />
                </div>
                <p
                  className={`text-center text-sm font-semibold whitespace-pre-line ${
                    trigger ? "fade-in-delayed" : "opacity-0"
                  }`}
                  style={{ animationDelay: "0.5s" }}
                >
                  {content.natasha.name}
                  {"\n"}
                  {content.natasha.title}
                </p>
                <blockquote
                  className={`italic text-[clamp(0.75rem,1vw,0.875rem)] border px-1 py-2 border-white text-center rounded max-w-[80%] ${
                    trigger ? "fade-in-delayed" : "opacity-0"
                  }`}
                  style={{ animationDelay: "0.7s" }}
                >
                  {content.natasha.quote}
                </blockquote>
              </div>

              <div
                className={`col-span-2 h-full flex items-center justify-center group ${
                  trigger ? "fade-in-delayed" : "opacity-0"
                }`}
                style={{ animationDelay: "0.9s" }}
              >
                <div className="text-sm max-w-prose text-center opacity-0 group-hover:opacity-100 transition duration-300 text-lg lg:text-sm xl:text-lg text-left">
                  {content.natasha.paragraphs.map((text, i) => (
                    <p key={i}>{text}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Nedeljko Row */}
            <div className="grid grid-cols-3 gap-6 pt-2 items-start group">
              <div
                className={`col-span-2 h-full flex items-center justify-center group ${
                  trigger ? "fade-in-delayed" : "opacity-0"
                }`}
                style={{ animationDelay: "1.2s" }}
              >
                <div className="flex justify-center items-center h-full">
                  <div className="text-sm max-w-prose text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg lg:text-sm xl:text-lg text-left">
                    {content.nedeljko.paragraphs.map((text, i) => (
                      <p key={i}>{text}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4 col-span-1">
                <div
                  className={`relative w-[8vw] aspect-square min-w-[130px] rounded-full overflow-hidden ${
                    trigger ? "fade-in-delayed" : "opacity-0"
                  }`}
                  style={{ animationDelay: "0.9s" }}
                >
                  <Image
                    src={content.nedeljko.image}
                    alt="Nedeljko"
                    fill
                    priority
                    className="object-cover object-top"
                  />
                </div>
                <p
                  className={`text-center text-sm font-semibold whitespace-pre-line ${
                    trigger ? "fade-in-delayed" : "opacity-0"
                  }`}
                  style={{ animationDelay: "1s" }}
                >
                  {content.nedeljko.name}
                  {"\n"}
                  {content.nedeljko.title}
                </p>
                <blockquote
                  className={`italic text-[clamp(0.75rem,1vw,0.875rem)] border px-1 py-2 border-white text-center rounded max-w-[80%] ${
                    trigger ? "fade-in-delayed" : "opacity-0"
                  }`}
                  style={{ animationDelay: "1.1s" }}
                >
                  {content.nedeljko.quote}
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
