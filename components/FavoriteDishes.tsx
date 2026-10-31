"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

interface FavoriteDishesProps {
  onOpenMenu: () => void;
}

interface DishItem {
  id: string;
  title: string;
  image: string;
  category: string;
  dietary: string[];
  description: string;
}

const dishes: DishItem[] = [
  {
    id: "bass",
    title: "Pan-Seared Bass with\nBright Citrus Beurre Blanc",
    image: "/images/dish_1-516cf5.png",
    category: "Entrée",
    dietary: ["Gluten-Free", "Pescatarian"],
    description:
      "Wild-caught sea bass pan-crisped to golden perfection, served over baby asparagus and finished with Meyer lemon-infused butter reduction.",
  },
  {
    id: "mushrooms",
    title: "Crab-Filled\nMushrooms",
    image: "/images/dish_2.png",
    category: "Appetizer",
    dietary: ["Pescatarian"],
    description:
      "Roasted cremini mushroom caps stuffed with jumbo lump blue crab meat, fresh tarragon, panko crunch, and aged parmesan.",
  },
  {
    id: "chicken",
    title: "Herb-Crusted Chicken\nwith Zesty Lemon Butter",
    image: "/images/dish_3.png",
    category: "Entrée",
    dietary: ["Halal Available", "Nut-Free"],
    description:
      "Tender farm-raised chicken breast enrobed in rosemary, thyme, and garlic crumbs, drizzled with velvety Sicilian lemon butter.",
  },
  {
    id: "wellington",
    title: "Vegetable Wellington\nwith Forest Mushroom Sauce",
    image: "/images/dish_4.png",
    category: "Entrée",
    dietary: ["Vegetarian", "Vegan Available"],
    description:
      "Buttery puff pastry encasing roasted butternut squash, wilted baby spinach, and wild portobello duxelles, served with rich mushroom jus.",
  },
  {
    id: "salmon",
    title: "Salmon Dill\nCrostini",
    image: "/images/dish_5-7234fb.png",
    category: "Canapé",
    dietary: ["Pescatarian", "Nut-Free"],
    description:
      "Cold-smoked Scottish salmon ribbons layered on toasted artisan sourdough with whipped caper cream cheese and fresh dill sprigs.",
  },
];

export const FavoriteDishes: React.FC<FavoriteDishesProps> = ({ onOpenMenu }) => {
  const [selectedDish, setSelectedDish] = useState<DishItem | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
        ".dishes-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "all",
        }
      )
      // 2. Carousel items staggered entrance
      .fromTo(
        ".dish-card-item",
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
        "-=0.45"
      )
      // 3. Arrow buttons pop in
      .fromTo(
        ".dish-nav-btn-wrap",
        { scale: 0.75, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(2)",
          clearProps: "all",
        },
        "-=0.4"
      )
      // 4. View Menu button
      .fromTo(
        ".view-menu-btn-wrap",
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="py-24 sm:py-28 md:py-32 w-full max-w-full overflow-hidden"
    >
      <div>
        {/* Section Header */}
        <div className="dishes-header text-center max-w-[727px] mx-auto px-6 mb-16 md:mb-20">
          <h2 className="font-['Sedan'] text-[#00383D] text-[42px] sm:text-[56px] md:text-[64px] lg:text-[72px] leading-[1.1] font-normal mb-5 tracking-[-0.0139em]">
            Guest Favorite Dishes
          </h2>
          <p className="font-['Inter'] text-[#005057] text-[17px] sm:text-[19px] md:text-[20px] leading-[1.68] font-normal">
            Our menu pairs beloved dishes and fresh ideas, offering comfort with a chef's touch in every beautifully prepared plate for your special celebration.
          </p>
        </div>

        {/* Carousel Container - FULL WIDTH edge-to-edge matching Figma */}
        <div className="relative w-full mb-14 overflow-hidden">
          {/* Navigation Button Previous */}
          <div className="dish-nav-btn-wrap hidden md:flex absolute left-4 md:left-8 lg:left-12 top-[135px] z-30">
            <button
              onClick={scrollLeft}
              className="w-[60px] h-[60px] rounded-full bg-[#FFDF00] border border-[#00383D] flex items-center justify-center cursor-pointer transition-spring hover:scale-110 active:scale-90 shadow-xl hover:shadow-2xl group"
              aria-label="Previous dishes"
            >
              <Image
                src="/images/arrow_left.svg"
                alt="Previous slide"
                width={31}
                height={30}
                className="w-[24px] h-[24px] transition-transform duration-200 group-hover:-translate-x-1"
              />
            </button>
          </div>

          {/* Navigation Button Next */}
          <div className="dish-nav-btn-wrap hidden md:flex absolute right-4 md:right-8 lg:right-12 top-[135px] z-30">
            <button
              onClick={scrollRight}
              className="w-[60px] h-[60px] rounded-full bg-[#FFDF00] border border-[#00383D] flex items-center justify-center cursor-pointer transition-spring hover:scale-110 active:scale-90 shadow-xl hover:shadow-2xl group"
              aria-label="Next dishes"
            >
              <Image
                src="/images/arrow_right.svg"
                alt="Next slide"
                width={31}
                height={30}
                className="w-[24px] h-[24px] transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* Scrollable Track - edge-to-edge bleed */}
          <div
            ref={scrollContainerRef}
            className="dishes-carousel-track flex items-start gap-[28px] sm:gap-[36px] lg:gap-[49.5px] overflow-x-auto pb-6 scrollbar-none px-6 sm:px-12 md:px-16 lg:px-24 scroll-smooth snap-x snap-mandatory overscroll-x-contain"
          >
            {dishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => setSelectedDish(dish)}
                className="dish-card-item flex flex-col items-center gap-[29.3px] flex-shrink-0 w-[280px] sm:w-[310px] cursor-pointer group snap-center"
              >
                {/* Arch-shaped Mask Container */}
                <div className="w-[280px] sm:w-[310px] h-[300px] sm:h-[330px] rounded-t-[140px] sm:rounded-t-[155px] overflow-hidden relative shadow-lg transition-spring group-hover:-translate-y-2.5 group-hover:shadow-[0_20px_35px_rgba(0,56,61,0.2)]">
                  <Image
                    src={dish.image}
                    alt={dish.title.replace("\n", " ")}
                    fill
                    sizes="(max-width: 768px) 280px, 310px"
                    className="object-cover transition-image group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-[#FFDF00] text-[#00383D] font-['Sedan'] text-base px-5 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      Recipe Story
                    </span>
                  </div>
                </div>

                {/* Dish Title */}
                <div className="max-w-[248px] text-center">
                  <h3 className="font-['Sedan'] text-[#00383D] text-[22px] sm:text-[24px] leading-[1.4] font-normal transition-colors duration-200 group-hover:text-[#005057] whitespace-pre-line">
                    {dish.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Carousel Controls */}
          <div className="flex md:hidden justify-center gap-4 mt-4">
            <button
              onClick={scrollLeft}
              className="w-[48px] h-[48px] rounded-full bg-[#FFDF00] border border-[#00383D] flex items-center justify-center active:scale-90 shadow-md cursor-pointer"
              aria-label="Previous slide"
            >
              <Image
                src="/images/arrow_left.svg"
                alt="Previous"
                width={20}
                height={20}
              />
            </button>
            <button
              onClick={scrollRight}
              className="w-[48px] h-[48px] rounded-full bg-[#FFDF00] border border-[#00383D] flex items-center justify-center active:scale-90 shadow-md cursor-pointer"
              aria-label="Next slide"
            >
              <Image
                src="/images/arrow_right.svg"
                alt="Next"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>

        {/* View Menu Button */}
        <div className="view-menu-wrap flex justify-center">
          <div className="view-menu-btn-wrap">
            <button
              onClick={onOpenMenu}
              className="bg-[#FFDF00] text-[#00383D] font-['Sedan'] text-[20px] leading-[18px] px-8 py-5 rounded-full transition-spring hover:scale-105 active:scale-95 shadow-md hover:shadow-xl cursor-pointer font-medium"
            >
              View Menu
            </button>
          </div>
        </div>
      </div>

      {/* Dish Quick Detail Modal */}
      {selectedDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#1BD6D3] text-[#00383D] w-full max-w-lg rounded-[32px] p-6 sm:p-8 shadow-2xl relative border-2 border-[#00383D]/10">
            <button
              onClick={() => setSelectedDish(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#00383D] text-[#FFDF00] flex items-center justify-center font-bold text-lg hover:scale-110 active:scale-90 transition-transform cursor-pointer"
            >
              ×
            </button>
            <div className="w-full h-56 rounded-2xl overflow-hidden relative mb-5 shadow-inner">
              <Image
                src={selectedDish.image}
                alt={selectedDish.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex gap-2 flex-wrap mb-2">
              <span className="bg-[#00383D] text-[#FFDF00] text-xs px-2.5 py-1 rounded-full font-bold uppercase">
                {selectedDish.category}
              </span>
              {selectedDish.dietary.map((tag) => (
                <span
                  key={tag}
                  className="bg-white/60 text-[#00383D] text-xs px-2.5 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="font-['Sedan'] text-[28px] leading-tight mb-3">
              {selectedDish.title.replace("\n", " ")}
            </h3>
            <p className="font-['Inter'] text-sm sm:text-base leading-relaxed opacity-90 mb-6">
              {selectedDish.description}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedDish(null);
                  onOpenMenu();
                }}
                className="flex-1 bg-[#00383D] text-[#FFDF00] font-['Sedan'] py-3.5 rounded-full text-center hover:scale-105 active:scale-95 transition-transform"
              >
                Browse Full Menu
              </button>
              <button
                onClick={() => setSelectedDish(null)}
                className="px-6 border-2 border-[#00383D] text-[#00383D] font-['Sedan'] py-3.5 rounded-full hover:bg-[#00383D]/10 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
