"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, CheckCircle2, X } from "lucide-react";
import { gsap } from "@/lib/gsap";

interface EventsWeServeProps {
  onSelectEventForBooking?: (eventType: string) => void;
}

interface EventData {
  id: string;
  title: string;
  image: string;
  tagline: string;
  description: string;
  features: string[];
  sampleCourses: string[];
  startingFrom: string;
}

const eventDetails: EventData[] = [
  {
    id: "business",
    title: "Business",
    image: "/images/event_business.png",
    tagline: "Corporate lunches, summits, galas, and executive dining",
    description:
      "Impress partners and celebrate achievements with immaculate dining experiences tailored to business timelines, professional etiquette, and diverse dietary needs.",
    features: [
      "Punctual executive drop-offs or full-service plated luncheons",
      "Seamless dietary management (Gluten-Free, Vegan, Halal, Nut-Free)",
      "Dedicated banquet captain and discreet, polished floor staff",
      "Custom branded dessert menus and specialty coffee baristas",
    ],
    sampleCourses: [
      "Canapé: Seared Ahi Tuna with Wasabi Aioli",
      "Entrée: Slow-Braised Short Rib with Truffle Polenta",
      "Dessert: Valrhona Dark Chocolate Ganache Tart",
    ],
    startingFrom: "$65 / guest",
  },
  {
    id: "wedding",
    title: "Wedding",
    image: "/images/event_wedding.png",
    tagline: "Receptions, rehearsal dinners, and unforgettable matrimonial feasts",
    description:
      "Your wedding deserves food as unforgettable as your love story. From grand champagne towers to bespoke multi-course dinners, we curate moments guests reminisce about for years.",
    features: [
      "Private tasting sessions for couples with our Executive Chef",
      "Signature cocktails crafted around your favorite flavors",
      "Floor-to-ceiling table decor, vintage flatware, and linen rentals",
      "Late-night artisan snack bars (Sliders, Crostini, Churros)",
    ],
    sampleCourses: [
      "Starter: Heirloom Tomato Burrata with Basil Emulsion",
      "Main: Pan-Seared Chilean Sea Bass with Citrus Beurre Blanc",
      "Sweet: Tiered Lemon Verbena Cake with Wild Berries",
    ],
    startingFrom: "$110 / guest",
  },
  {
    id: "private",
    title: "Private Event",
    image: "/images/event_private.png",
    tagline: "Intimate anniversaries, milestone birthdays, and lavish soirees",
    description:
      "Host stress-free gatherings in the comfort of your home or chosen venue. Our culinary team brings the gourmet restaurant experience directly to your table.",
    features: [
      "Customized menus built around family favorites and seasonal produce",
      "Sommelier wine pairing recommendations for every course",
      "Complete pre-event kitchen prep and post-event spotless cleanup",
      "Interactive chef cooking stations and live carving tables",
    ],
    sampleCourses: [
      "Amuse-Bouche: Truffled Wild Mushroom Arancini",
      "Centerpiece: Herb-Crusted Rack of Lamb with Mint Chimichurri",
      "Finale: Warm Lavender Madeleines with Honey Mascarpone",
    ],
    startingFrom: "$85 / guest",
  },
];

export const EventsWeServe: React.FC<EventsWeServeProps> = ({
  onSelectEventForBooking,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // 1. Header reveal
      tl.fromTo(
        ".events-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "all",
        }
      )
      // 2. Event Cards staggered rise
      .fromTo(
        ".event-card-item",
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.12,
          duration: 0.85,
          ease: "power3.out",
          clearProps: "all",
        },
        "-=0.45"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (event: EventData) => {
    setSelectedEvent(event);
  };

  const handleBookFromModal = () => {
    if (selectedEvent && onSelectEventForBooking) {
      onSelectEventForBooking(selectedEvent.title);
    }
    setSelectedEvent(null);
  };

  return (
    <section
      ref={sectionRef}
      id="events"
      className="bg-[#00383D] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] py-24 sm:py-28 md:py-32 px-6 w-full max-w-full overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto">
        {/* Section Header */}
        <div className="events-header text-center max-w-[754px] mx-auto mb-16 md:mb-20">
          <h2 className="font-['Sedan'] text-white text-[42px] sm:text-[56px] md:text-[64px] lg:text-[72px] leading-[1.1] font-normal mb-5 tracking-[-0.0139em]">
            Events We Serve
          </h2>
          <p className="font-['Inter'] text-[#FFDF00] text-[17px] sm:text-[19px] md:text-[20px] leading-[1.68] font-normal">
            From intimate dinners to lively celebrations, our team thoughtfully plans menus and service that fit each occasion, style, guest list, and budget.
          </p>
        </div>

        {/* 3 Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-[30px] justify-items-center">
          {eventDetails.map((event) => (
            <div
              key={event.id}
              onClick={() => handleCardClick(event)}
              className="event-card-item flex flex-col items-center gap-6 group cursor-pointer w-full max-w-[420px]"
            >
              {/* Card Image Container with rounded shape */}
              <div className="relative w-full h-[380px] sm:h-[420px] md:h-[448px] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-2xl transition-spring group-hover:-translate-y-2.5 group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)]">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover transition-image group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-sm font-medium tracking-wide bg-[#FFDF00] text-[#00383D] px-4 py-2 rounded-full font-['Inter'] shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    Click to view packages
                  </span>
                </div>
              </div>

              {/* Card Label & Diagonal Arrow Reveal */}
              <div className="flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1.5">
                <h3 className="font-['Sedan'] text-white text-[32px] sm:text-[36px] md:text-[40px] leading-[1.24] font-normal transition-colors group-hover:text-[#FFDF00]">
                  {event.title}
                </h3>
                {/* Arrow reveals and slides diagonally on hover */}
                <div className="text-[#FFDF00] opacity-0 -translate-x-3 translate-y-3 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  <ArrowUpRight size={32} strokeWidth={2.5} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#1BD6D3] text-[#00383D] w-full max-w-2xl rounded-[32px] p-6 sm:p-8 md:p-10 shadow-2xl relative border-2 border-[#00383D]/10 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#00383D] text-[#FFDF00] flex items-center justify-center hover:scale-110 active:scale-90 transition-transform cursor-pointer"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pr-10">
              <span className="text-xs uppercase tracking-wider font-bold bg-[#FFDF00] text-[#00383D] px-3 py-1 rounded-full inline-block mb-3">
                Catering Package
              </span>
              <h3 className="font-['Sedan'] text-[36px] sm:text-[42px] leading-tight">
                {selectedEvent.title} Catering
              </h3>
              <p className="text-sm sm:text-base font-medium opacity-85 mt-1">
                {selectedEvent.tagline}
              </p>
            </div>

            <p className="text-base sm:text-[17px] leading-relaxed mb-6 font-['Inter']">
              {selectedEvent.description}
            </p>

            {/* Key Features */}
            <div className="mb-6 bg-white/40 p-5 rounded-2xl">
              <h4 className="font-['Sedan'] text-[20px] mb-3 font-semibold">
                What’s Included:
              </h4>
              <ul className="space-y-2.5">
                {selectedEvent.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base font-['Inter']">
                    <CheckCircle2 size={18} className="text-[#00383D] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sample Menu Courses */}
            <div className="mb-8 bg-[#00383D] text-[#FFDF00] p-5 rounded-2xl">
              <h4 className="font-['Sedan'] text-[20px] text-white mb-2 font-semibold">
                Chef’s Sample Tasting:
              </h4>
              <ul className="space-y-1.5 text-sm sm:text-base font-['Inter']">
                {selectedEvent.sampleCourses.map((course, i) => (
                  <li key={i} className="opacity-95">
                    • {course}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-[#FFDF00]/20 flex justify-between items-center text-xs sm:text-sm text-white font-medium">
                <span>Estimated starting rate:</span>
                <span className="text-[#FFDF00] text-lg font-bold">
                  {selectedEvent.startingFrom}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleBookFromModal}
                className="w-full sm:w-auto flex-1 bg-[#00383D] text-[#FFDF00] font-['Sedan'] text-[20px] py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-md font-medium text-center cursor-pointer"
              >
                Inquire For {selectedEvent.title}
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="w-full sm:w-auto bg-transparent border-2 border-[#00383D] text-[#00383D] font-['Sedan'] text-[20px] py-3.5 px-6 rounded-full hover:bg-[#00383D]/10 transition-colors cursor-pointer"
              >
                Back to Events
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
