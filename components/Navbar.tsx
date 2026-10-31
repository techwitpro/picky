"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { gsap } from "@/lib/gsap";

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Initial navbar reveal
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "all",
        }
      );
    }, navRef);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
    };
  }, []);

  const navLinks = [
    { label: "Story", href: "#story" },
    { label: "Rates", href: "#events" },
    { label: "Food Menu", href: "#menu" },
    { label: "Stories", href: "#reviews" },
  ];

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,padding,box-shadow] duration-300 ${
        scrolled
          ? "bg-[#1BD6D3]/90 backdrop-blur-md py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center transition-transform hover:scale-105 active:scale-95"
          aria-label="Picky Catering Home"
        >
          <Image
            src="/images/logo.svg"
            alt="Picky Logo"
            width={112}
            height={50}
            className="w-[112px] h-[50px] object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[#00383D] font-normal text-[18px] leading-[32.4px] hover:text-[#005057] transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#00383D] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <button
            onClick={onOpenBooking}
            className="bg-[#FFDF00] text-[#00383D] font-['Sedan'] text-[20px] leading-[18px] px-6 py-4 rounded-full transition-spring hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer font-medium"
          >
            Reach us
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#00383D] focus:outline-none cursor-pointer transition-transform duration-200 active:scale-90"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1BD6D3] border-b border-[#00383D]/10 px-6 py-6 flex flex-col gap-5 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#00383D] font-normal text-[20px] py-1 hover:opacity-75"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="bg-[#FFDF00] text-[#00383D] font-['Sedan'] text-[20px] py-3.5 rounded-full text-center transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            Reach us
          </button>
        </div>
      )}
    </header>
  );
};
