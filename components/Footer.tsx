"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { gsap } from "@/lib/gsap";

export const Footer: React.FC = () => {
  const [activeLegalModal, setActiveLegalModal] = useState<string | null>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 88%",
          once: true,
        },
      });

      // 1. Top bar fade in
      tl.fromTo(
        ".footer-top-bar",
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "all",
        }
      )
      // 2. Giant wordmarks staggered wave
      .fromTo(
        ".footer-wordmark-item",
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "all",
        },
        "-=0.45"
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const legalContent: Record<string, { title: string; content: string }> = {
    terms: {
      title: "Terms & Conditions",
      content:
        "Welcome to Picky / Catered Plate. By booking our catering services or using our website, you agree to our service terms. Bookings require a 25% deposit to hold event dates. Final headcount and menu adjustments are finalized 7 business days prior to your occasion. All cancellation policies adhere to local state hospitality regulations.",
    },
    privacy: {
      title: "Privacy Policy",
      content:
        "We value and protect your privacy. Any personal information gathered—including your name, email, phone number, and event details—is strictly utilized to organize your catering orders, prepare invoices, and coordinate logistics. We never sell or distribute your private information to third parties.",
    },
    licenses: {
      title: "Licenses & Health Certifications",
      content:
        "Picky operates under full commercial food service licensure, ServSafe Executive Food Handler certifications, and Department of Health inspection Grade A compliance. Alcohol catering services operate in partnership with bonded and licensed state mixologists.",
    },
  };

  return (
    <footer ref={footerRef} className="pt-12 pb-6 overflow-hidden w-full max-w-full">
      {/* Top Copyright & Legal Links Bar (constrained in 1320px container) */}
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="footer-top-bar flex flex-col md:flex-row items-center justify-between gap-6 pb-16 text-[#00383D]">
          {/* Copyright */}
          <p className="font-['Inter'] text-[15px] sm:text-[16px] leading-[1.8] text-center md:text-left">
            © Copyright 2026, All Rights Reserved by{" "}
            <span className="font-semibold">UiMile</span>. Powered By{" "}
            <span className="font-semibold">Webflow</span>
          </p>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            <button
              onClick={() => setActiveLegalModal("terms")}
              className="font-['Inter'] text-[15px] sm:text-[16px] leading-[1.8] transition-colors duration-200 hover:text-[#005057] cursor-pointer relative py-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#00383D] hover:after:w-full after:transition-all after:duration-300"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => setActiveLegalModal("privacy")}
              className="font-['Inter'] text-[15px] sm:text-[16px] leading-[1.8] transition-colors duration-200 hover:text-[#005057] cursor-pointer relative py-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#00383D] hover:after:w-full after:transition-all after:duration-300"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveLegalModal("licenses")}
              className="font-['Inter'] text-[15px] sm:text-[16px] leading-[1.8] transition-colors duration-200 hover:text-[#005057] cursor-pointer relative py-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#00383D] hover:after:w-full after:transition-all after:duration-300"
            >
              Licenses
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Giant Repeating Wordmarks row - FULL WIDTH edge-to-edge matching Figma */}
      <div className="w-full max-w-full overflow-hidden pt-4 pb-2 px-4 sm:px-6 md:px-10 lg:px-14">
        <div className="footer-wordmarks-track flex items-center justify-between gap-3 sm:gap-6 md:gap-10 lg:gap-[87px] opacity-95 w-full">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="footer-wordmark-item w-[56px] xs:w-[80px] sm:w-[140px] md:w-[180px] lg:w-[220px] h-[25px] xs:h-[36px] sm:h-[62px] md:h-[80px] lg:h-[98px] relative flex-shrink-0 select-none pointer-events-none"
            >
              <Image
                src="/images/footer_vector.svg"
                alt="Picky Logo Vector"
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Legal Information Modal */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#1BD6D3] text-[#00383D] w-full max-w-lg rounded-[32px] p-6 sm:p-8 shadow-2xl relative border-2 border-[#00383D]/10">
            <button
              onClick={() => setActiveLegalModal(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#00383D] text-[#FFDF00] flex items-center justify-center hover:scale-110 active:scale-90 transition-transform cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="font-['Sedan'] text-[32px] mb-4">
              {legalContent[activeLegalModal].title}
            </h3>
            <p className="font-['Inter'] text-sm sm:text-base leading-relaxed opacity-90 mb-6">
              {legalContent[activeLegalModal].content}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="bg-[#00383D] text-[#FFDF00] font-['Sedan'] text-[18px] px-6 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-transform"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
