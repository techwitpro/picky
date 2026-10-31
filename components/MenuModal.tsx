"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Check, UtensilsCrossed } from "lucide-react";

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToBooking?: (selectedItems: string[]) => void;
}

interface MenuItem {
  id: string;
  category: "Canapés" | "Entrées" | "Stations" | "Desserts";
  title: string;
  image: string;
  price: string;
  dietary: string[];
  description: string;
}

const fullMenu: MenuItem[] = [
  {
    id: "m-1",
    category: "Entrées",
    title: "Pan-Seared Bass with Bright Citrus Beurre Blanc",
    image: "/images/dish_1-516cf5.png",
    price: "$38 / plate",
    dietary: ["Gluten-Free", "Pescatarian"],
    description:
      "Crisped wild sea bass served over tender baby asparagus with a vibrant Meyer lemon beurre blanc and micro herbs.",
  },
  {
    id: "m-2",
    category: "Canapés",
    title: "Crab-Filled Roasted Cremini Mushrooms",
    image: "/images/dish_2.png",
    price: "$18 / dozen",
    dietary: ["Pescatarian"],
    description:
      "Roasted mushroom caps stuffed with Atlantic lump crab, aged parmesan, fresh tarragon, and artisan breadcrumbs.",
  },
  {
    id: "m-3",
    category: "Entrées",
    title: "Herb-Crusted Chicken with Zesty Lemon Butter",
    image: "/images/dish_3.png",
    price: "$32 / plate",
    dietary: ["Halal Available", "Nut-Free"],
    description:
      "Free-range breast in a thyme, rosemary, and garlic crumb mantle, accompanied by roasted garlic pomme purée.",
  },
  {
    id: "m-4",
    category: "Entrées",
    title: "Vegetable Wellington with Forest Mushroom Sauce",
    image: "/images/dish_4.png",
    price: "$28 / plate",
    dietary: ["Vegetarian", "Vegan Available"],
    description:
      "Flaky puff pastry stuffed with caramelized butternut squash, wilted baby spinach, and rich portobello reduction.",
  },
  {
    id: "m-5",
    category: "Canapés",
    title: "Smoked Salmon Dill Crostini",
    image: "/images/dish_5-7234fb.png",
    price: "$22 / dozen",
    dietary: ["Pescatarian", "Nut-Free"],
    description:
      "House-smoked Scottish salmon ribbons over sourdough with whipped caper cream cheese and fresh dill sprigs.",
  },
  {
    id: "m-6",
    category: "Stations",
    title: "Artisan Birria & Carnitas Taco Bar",
    image: "/images/gallery_1.png",
    price: "$26 / guest",
    dietary: ["Gluten-Free Available"],
    description:
      "Slow-stewed beef birria and citrus-marinated pork carnitas, handmade corn tortillas, fresh cilantro, diced onions, and lime wedges.",
  },
  {
    id: "m-7",
    category: "Stations",
    title: "Gourmet Wagyu Slider Bar",
    image: "/images/gallery_4.png",
    price: "$24 / guest",
    dietary: ["Halal Available"],
    description:
      "Mini Wagyu beef patties with melted aged cheddar, caramelized balsamic onions, and truffle aioli on toasted brioche.",
  },
  {
    id: "m-8",
    category: "Desserts",
    title: "Heirloom Salmon Salad Tartine & Brunch Canapés",
    image: "/images/gallery_5.png",
    price: "$19 / guest",
    dietary: ["Pescatarian", "Vegetarian Options"],
    description:
      "Brioche open tartines with poached egg, avocado mash, smoked fish, and mini lavender honey madeleines.",
  },
];

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  onProceedToBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedDiet, setSelectedDiet] = useState<string>("All");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  if (!isOpen) return null;

  const categories = ["All", "Canapés", "Entrées", "Stations", "Desserts"];
  const diets = ["All", "Gluten-Free", "Vegetarian", "Pescatarian", "Halal Available"];

  const filteredItems = fullMenu.filter((item) => {
    const matchCat = activeCategory === "All" || item.category === activeCategory;
    const matchDiet =
      selectedDiet === "All" ||
      item.dietary.some((d) => d.toLowerCase().includes(selectedDiet.toLowerCase()));
    return matchCat && matchDiet;
  });

  const toggleItemSelection = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleBookWithSelections = () => {
    const titles = fullMenu
      .filter((m) => selectedItems.includes(m.id))
      .map((m) => m.title);
    if (onProceedToBooking) {
      onProceedToBooking(titles);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#1BD6D3] text-[#00383D] w-full max-w-4xl rounded-[36px] p-6 sm:p-10 shadow-2xl relative border-2 border-[#00383D]/10 max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#00383D] text-[#FFDF00] flex items-center justify-center hover:scale-110 hover:rotate-90 active:scale-90 transition-all duration-300 cursor-pointer z-10 shadow-md"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-12">
          <span className="text-xs uppercase font-bold tracking-wider bg-[#FFDF00] text-[#00383D] px-3.5 py-1 rounded-full inline-block mb-2">
            Chef’s Seasonal Selection
          </span>
          <h2 className="font-['Sedan'] text-[36px] sm:text-[46px] leading-tight">
            Full Catering Menu
          </h2>
          <p className="text-sm sm:text-base opacity-85 mt-1 font-['Inter']">
            Curate your multi-course event menu. Select dishes to include in your booking inquiry.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 pb-4 border-b border-[#00383D]/15">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-spring cursor-pointer active:scale-95 ${
                  activeCategory === cat
                    ? "bg-[#00383D] text-[#FFDF00] shadow-sm scale-105"
                    : "bg-white/60 text-[#00383D] hover:bg-white/90 hover:scale-102"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dietary Filter */}
          <div className="sm:ml-auto flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider opacity-75">
              Diet:
            </span>
            <select
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              className="bg-white/80 border border-[#00383D]/20 rounded-lg px-2.5 py-1 text-xs sm:text-sm text-[#00383D] focus:outline-none"
            >
              {diets.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dishes List (Scrollable) */}
        <div className="overflow-y-auto flex-1 pr-2 space-y-4 mb-6 scrollbar-thin">
          {filteredItems.map((item) => {
            const isSelected = selectedItems.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleItemSelection(item.id)}
                className={`p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-spring hover:scale-[1.01] hover:shadow-lg active:scale-[0.99] cursor-pointer border ${
                  isSelected
                    ? "bg-[#00383D] text-white border-[#FFDF00] shadow-md"
                    : "bg-white/60 text-[#00383D] border-[#00383D]/10 hover:bg-white/85"
                }`}
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden relative flex-shrink-0 shadow-sm">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span
                      className={`text-[11px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-[#FFDF00] text-[#00383D]"
                          : "bg-[#00383D] text-[#FFDF00]"
                      }`}
                    >
                      {item.category}
                    </span>
                    {item.dietary.map((d) => (
                      <span
                        key={d}
                        className={`text-[11px] px-2 py-0.5 rounded-full ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-[#00383D]/10 text-[#00383D]"
                        }`}
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  <h4 className="font-['Sedan'] text-[20px] sm:text-[22px] leading-snug">
                    {item.title}
                  </h4>
                  <p
                    className={`text-xs sm:text-sm mt-1 line-clamp-2 ${
                      isSelected ? "text-white/80" : "text-[#00383D]/80"
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Price & Selection Pill */}
                <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 pt-2 sm:pt-0 border-t sm:border-0 border-white/20">
                  <span
                    className={`font-mono text-sm sm:text-base font-bold ${
                      isSelected ? "text-[#FFDF00]" : "text-[#00383D]"
                    }`}
                  >
                    {item.price}
                  </span>
                  <button
                    type="button"
                    className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-spring hover:scale-105 active:scale-95 ${
                      isSelected
                        ? "bg-[#FFDF00] text-[#00383D] shadow-sm"
                        : "bg-[#00383D] text-[#FFDF00]"
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check size={12} />
                        <span>Selected</span>
                      </>
                    ) : (
                      <span>+ Select Dish</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-[#00383D]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm font-medium">
            {selectedItems.length > 0 ? (
              <span className="flex items-center gap-1.5 font-semibold text-[#00383D]">
                <UtensilsCrossed size={16} />
                {selectedItems.length} dish{selectedItems.length > 1 ? "es" : ""}{" "}
                selected for your occasion
              </span>
            ) : (
              <span className="opacity-75">
                Click any dish to select it for your catering inquiry
              </span>
            )}
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={handleBookWithSelections}
              className="flex-1 sm:flex-none bg-[#00383D] text-[#FFDF00] font-['Sedan'] text-[18px] px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-spring shadow-md font-medium cursor-pointer"
            >
              {selectedItems.length > 0
                ? "Inquire with Selected Dishes"
                : "Proceed to Booking"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

