"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";

interface StatementProps {
  onOpenBooking: () => void;
}

export const Statement: React.FC<StatementProps> = ({ onOpenBooking }) => {
  const statementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: statementRef.current,
          start: "top 82%",
          once: true,
        },
      });

      // 1. Line-by-line reveal
      tl.fromTo(
        ".statement-line-inner",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.09,
          duration: 0.85,
          ease: "power3.out",
          clearProps: "all",
        }
      )
      // 2. Button pop up
      .fromTo(
        ".statement-btn-wrap",
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.8)",
          clearProps: "all",
        },
        "-=0.4"
      );
    }, statementRef);

    return () => ctx.revert();
  }, []);

  const lines = [
    "Each Catered Plate event",
    "lets hosts shape memorable menus",
    "and enjoy gracious service",
    "with guests around every table",
  ];

  return (
    <section
      ref={statementRef}
      id="story"
      className="py-24 sm:py-32 md:py-36 px-6 w-full max-w-full overflow-hidden"
    >
      <div className="max-w-[1086px] mx-auto text-center flex flex-col items-center gap-10 md:gap-12">
        <h2 className="font-['Sedan'] text-[#00383D] text-[36px] sm:text-[50px] md:text-[62px] lg:text-[72px] leading-[1.12] tracking-[-0.0139em] font-normal">
          {lines.map((line, idx) => (
            <div key={idx} className="overflow-hidden pb-1 -mb-1">
              <span className="statement-line-inner inline-block">
                {line}
              </span>
            </div>
          ))}
        </h2>

        <div className="statement-btn-wrap">
          <button
            onClick={onOpenBooking}
            className="bg-[#00383D] text-[#FFDF00] font-['Sedan'] text-[20px] leading-[18px] px-8 py-5 rounded-full transition-spring hover:scale-105 hover:bg-[#005057] active:scale-95 shadow-md hover:shadow-xl cursor-pointer font-medium"
          >
            Reach us
          </button>
        </div>
      </div>
    </section>
  );
};
