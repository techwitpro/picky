"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // 1. Title split line reveal
      tl.fromTo(
        ".hero-line-inner",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: "power4.out",
          clearProps: "all",
        }
      )
      // 2. Subtitle slide up
      .fromTo(
        ".hero-subtext",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          clearProps: "all",
        },
        "-=0.55"
      )
      // 3. Floating Badge pop in with slight rotation
      .fromTo(
        ".hero-badge-wrap",
        { scale: 0.75, opacity: 0, rotation: -8 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          clearProps: "all",
        },
        "-=0.5"
      )
      // 4. Hero showcase images staggered entrance
      .fromTo(
        ".hero-showcase-item",
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "all",
        },
        "-=0.6"
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToMenu = () => {
    const el = document.getElementById("menu");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative pt-[120px] md:pt-[150px] overflow-hidden w-full max-w-full"
    >
      {/* Top Hero Text & Badge Container */}
      <div className="max-w-[1320px] mx-auto px-6 mb-16 md:mb-20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          {/* Left Text Block */}
          <div className="max-w-[875px]">
            <h1 className="font-['Sedan'] text-[#00383D] text-[48px] sm:text-[64px] md:text-[80px] lg:text-[88px] leading-[1.12] tracking-[-0.0114em] mb-6 font-normal">
              <div className="overflow-hidden pb-1 -mb-1">
                <span className="hero-line-inner inline-block">
                  Exquisite Catering for
                </span>
              </div>
              <div className="overflow-hidden pb-1 -mb-1">
                <span className="hero-line-inner inline-block">
                  Your Finest Occasions
                </span>
              </div>
            </h1>

            <p className="hero-subtext font-['Inter'] text-[#00383D] text-[18px] sm:text-[20px] md:text-[21px] leading-[1.68] max-w-[700px] font-normal">
              At Catered Plate, we serve food so each guest feels at ease at every meal, with care and flair.
            </p>
          </div>

          {/* Right Floating Badge Graphic */}
          <div className="hero-badge-wrap flex items-center self-start lg:self-center">
            {/* Dark Teal Left Anchor */}
            <div className="w-[45px] sm:w-[60px] md:w-[77px] h-[110px] sm:h-[135px] md:h-[157px] bg-[#00383D] rounded-l-[1440px]" />

            {/* Circular Yellow Interactive Badge */}
            <button
              onClick={scrollToMenu}
              className="relative w-[110px] sm:w-[135px] md:w-[157px] h-[110px] sm:h-[135px] md:h-[157px] bg-[#FFDF00] rounded-full flex items-center justify-center cursor-pointer group transition-spring hover:scale-105 active:scale-95 shadow-md hover:shadow-xl flex-shrink-0 -ml-[1px]"
              aria-label="Explore Menu"
            >
              {/* Rotating Circular Text - centered dead-on */}
              <div className="absolute -inset-[20%] w-[140%] h-[140%] pointer-events-none animate-spin-slow flex items-center justify-center">
                <Image
                  src="/images/hero_badge_text-56586a.png"
                  alt="Explore Menu circular text"
                  width={220}
                  height={220}
                  className="w-full h-full object-contain select-none"
                  priority
                />
              </div>

              {/* Center Arrow */}
              <div className="relative z-10 transition-transform duration-300 group-hover:translate-x-2">
                <Image
                  src="/images/hero_arrow-56586a.png"
                  alt="Arrow icon"
                  width={37}
                  height={16}
                  className="w-[26px] sm:w-[32px] md:w-[37px] h-auto object-contain select-none"
                  priority
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Showcase Gallery Row - FULL WIDTH edge-to-edge matching Figma */}
      <div className="w-full max-w-full overflow-hidden relative">
        <div className="w-full overflow-x-auto pb-6 scrollbar-none overscroll-x-contain">
          <div className="flex items-center gap-[18px] sm:gap-[24px] md:gap-[27.5px] w-max pl-2 sm:pl-4 lg:pl-0 pr-6 sm:pr-10 md:pr-16">
            {/* 1. Spaghetti Circle */}
            <div className="hero-showcase-item w-[260px] sm:w-[320px] md:w-[381px] h-[260px] sm:h-[320px] md:h-[381px] rounded-full overflow-hidden relative flex-shrink-0 group shadow-lg transition-transform-spring hover:-translate-y-2 hover:shadow-2xl">
              <Image
                src="/images/hero_img_1.png"
                alt="Artisanal spaghetti pasta"
                fill
                sizes="(max-width: 768px) 260px, 381px"
                className="object-cover transition-image group-hover:scale-108"
                priority
              />
            </div>

            {/* 2. Woman Eating Arch */}
            <div className="hero-showcase-item w-[230px] sm:w-[280px] md:w-[340px] h-[260px] sm:h-[320px] md:h-[381px] rounded-t-[140px] sm:rounded-t-[160px] md:rounded-t-[180px] overflow-hidden relative flex-shrink-0 group shadow-lg transition-transform-spring hover:-translate-y-2 hover:shadow-2xl">
              <Image
                src="/images/hero_img_2-4aa612.png"
                alt="Guest enjoying dining"
                fill
                sizes="(max-width: 768px) 230px, 340px"
                className="object-cover transition-image group-hover:scale-108"
                priority
              />
            </div>

            {/* 3. Dark Teal Double Arches */}
            <div className="hero-showcase-item w-[250px] sm:w-[310px] md:w-[377px] h-[290px] sm:h-[360px] md:h-[430px] relative flex-shrink-0 flex items-center transition-transform-spring hover:-translate-y-2">
              {/* Arch 1 (shifted down 49.5px) */}
              <div
                className="w-[120px] sm:w-[150px] md:w-[183px] h-[260px] sm:h-[320px] md:h-[381px] bg-[#00383D] rounded-l-[1238px] absolute left-0 top-[35px] sm:top-[42px] md:top-[49.5px] shadow-md transition-transform duration-300 hover:scale-[1.03]"
              />
              {/* Arch 2 */}
              <div
                className="w-[120px] sm:w-[150px] md:w-[183px] h-[260px] sm:h-[320px] md:h-[381px] bg-[#00383D] rounded-l-[1238px] absolute right-0 top-0 shadow-md transition-transform duration-300 hover:scale-[1.03]"
              />
            </div>

            {/* 4. Burgers Arch-Left */}
            <div className="hero-showcase-item w-[180px] sm:w-[220px] md:w-[269px] h-[260px] sm:h-[320px] md:h-[381px] rounded-l-[1238px] overflow-hidden relative flex-shrink-0 group shadow-lg transition-transform-spring hover:-translate-y-2 hover:shadow-2xl">
              <Image
                src="/images/hero_img_3.png"
                alt="Gourmet sliders and burgers"
                fill
                sizes="(max-width: 768px) 180px, 269px"
                className="object-cover transition-image group-hover:scale-108"
                priority
              />
            </div>

            {/* 5. Plated Bowl Circle */}
            <div className="hero-showcase-item w-[260px] sm:w-[320px] md:w-[381px] h-[260px] sm:h-[320px] md:h-[381px] rounded-full overflow-hidden relative flex-shrink-0 group shadow-lg transition-transform-spring hover:-translate-y-2 hover:shadow-2xl">
              <Image
                src="/images/hero_img_4-56586a.png"
                alt="Exquisite catering dish"
                fill
                sizes="(max-width: 768px) 260px, 381px"
                className="object-cover transition-image group-hover:scale-108"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
