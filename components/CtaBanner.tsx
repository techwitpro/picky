"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

interface CtaBannerProps {
  onOpenBooking: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const cutleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Yellow card entrance scale & fade with clean reset
      gsap.fromTo(
        cardRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 82%",
            once: true,
          },
          scale: 1,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          clearProps: "all",
        }
      );

      // 2. Parallax scrub on floating salad plate (floats upward)
      if (plateRef.current && containerRef.current) {
        gsap.fromTo(
          plateRef.current,
          { y: 40, rotate: -3 },
          {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
            y: -30,
            rotate: 4,
            ease: "none",
          }
        );
      }

      // 3. Parallax scrub on floating golden cutlery (floats downward)
      if (cutleryRef.current && containerRef.current) {
        gsap.fromTo(
          cutleryRef.current,
          { y: -30, rotate: 3 },
          {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
            y: 30,
            rotate: -4,
            ease: "none",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-20 md:py-24 px-6 overflow-hidden w-full max-w-full"
    >
      <div className="max-w-[1320px] mx-auto">
        {/* Yellow Card Container with overflow-hidden for exact corner clipping */}
        <div
          ref={cardRef}
          className="relative bg-[#FFDF00] rounded-[36px] sm:rounded-[44px] md:rounded-[50px] px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-24 md:py-28 shadow-2xl flex flex-col items-center text-center overflow-hidden"
        >
          {/* Top-Right Decorative Cutlery Image with Parallax */}
          <div
            ref={cutleryRef}
            className="absolute -right-4 -top-4 w-[160px] sm:w-[210px] md:w-[264px] h-[175px] sm:h-[230px] md:h-[288px] pointer-events-none select-none z-10"
          >
            <Image
              src="/images/cta_2-748382.png"
              alt="Artisanal cutlery decoration"
              fill
              sizes="(max-width: 640px) 160px, (max-width: 768px) 210px, 264px"
              className="object-contain object-top-right"
              priority
            />
          </div>

          {/* Bottom-Left Decorative Salad Plate Image with Parallax */}
          <div
            ref={plateRef}
            className="absolute -left-6 -bottom-6 w-[200px] sm:w-[280px] md:w-[382px] h-[190px] sm:h-[260px] md:h-[348px] pointer-events-none select-none z-10"
          >
            <Image
              src="/images/cta_1-548201.png"
              alt="Fresh culinary plate decoration"
              fill
              sizes="(max-width: 640px) 200px, (max-width: 768px) 280px, 382px"
              className="object-contain object-bottom-left"
              priority
            />
          </div>

          {/* Center Content */}
          <div className="relative z-20 max-w-[716px] flex flex-col items-center gap-6">
            <h2 className="font-['Sedan'] text-[#00383D] text-[36px] sm:text-[52px] md:text-[62px] lg:text-[72px] leading-[1.1] font-normal tracking-[-0.0139em]">
              Memorable Catering
              <br />
              For Every Occasion!
            </h2>

            <p className="font-['Inter'] text-[#00383D] text-[16px] sm:text-[17px] md:text-[18px] leading-[1.8] font-normal max-w-[716px] opacity-95">
              From candlelit dinners to large celebrations, our chefs shape seasonal menus and service around your plans, making every gathering feel personal and easy.
            </p>

            <div className="pt-4">
              <button
                onClick={onOpenBooking}
                className="bg-[#00383D] text-[#FFDF00] font-['Sedan'] text-[20px] leading-[18px] px-8 py-5 rounded-full transition-spring hover:scale-105 hover:bg-[#005057] active:scale-95 shadow-lg hover:shadow-2xl cursor-pointer font-medium"
              >
                Book Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
