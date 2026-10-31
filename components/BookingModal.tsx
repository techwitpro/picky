"use client";

import React, { useState } from "react";
import { X, Calendar, Users, Utensils, Check, Sparkles } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEventType?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialEventType = "Business",
}) => {
  const [eventType, setEventType] = useState(initialEventType);
  const [eventDate, setEventDate] = useState("");
  const [guestCount, setGuestCount] = useState("50-100 guests");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [inquiryId, setInquiryId] = useState("");

  if (!isOpen) return null;

  const dietaryOptions = [
    "Gluten-Free",
    "Vegetarian",
    "Vegan",
    "Halal",
    "Nut Allergy",
    "Dairy-Free",
  ];

  const toggleDiet = (diet: string) => {
    if (selectedDiets.includes(diet)) {
      setSelectedDiets(selectedDiets.filter((d) => d !== diet));
    } else {
      setSelectedDiets([...selectedDiets, diet]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setInquiryId(`PKY-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSuccess(true);
    }, 900);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#1BD6D3] text-[#00383D] w-full max-w-2xl rounded-[36px] p-6 sm:p-10 shadow-2xl relative border-2 border-[#00383D]/10 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#00383D] text-[#FFDF00] flex items-center justify-center hover:scale-110 hover:rotate-90 active:scale-90 transition-all duration-300 cursor-pointer shadow-md"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 rounded-full bg-[#00383D] text-[#FFDF00] flex items-center justify-center mx-auto mb-6 text-4xl shadow-xl">
              <Sparkles size={38} />
            </div>
            <h3 className="font-['Sedan'] text-[40px] leading-tight mb-3">
              Inquiry Received!
            </h3>
            <p className="font-['Inter'] text-base sm:text-lg mb-6 max-w-md mx-auto opacity-90">
              Thank you, <span className="font-semibold">{name}</span>. Our executive banquet team has received your request and will reach out within 2 business hours.
            </p>

            <div className="bg-white/50 p-6 rounded-2xl max-w-md mx-auto text-left mb-8 space-y-2 text-sm sm:text-base font-['Inter']">
              <div className="flex justify-between border-b border-[#00383D]/15 pb-2">
                <span className="opacity-75">Reference No:</span>
                <span className="font-mono font-bold text-[#00383D]">{inquiryId}</span>
              </div>
              <div className="flex justify-between border-b border-[#00383D]/15 pb-2">
                <span className="opacity-75">Event:</span>
                <span className="font-semibold">{eventType}</span>
              </div>
              <div className="flex justify-between border-b border-[#00383D]/15 pb-2">
                <span className="opacity-75">Guests:</span>
                <span className="font-semibold">{guestCount}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="opacity-75">Preferred Date:</span>
                <span className="font-semibold">{eventDate || "To be decided"}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="bg-[#00383D] text-[#FFDF00] font-['Sedan'] text-[20px] px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition-transform shadow-lg cursor-pointer font-medium"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider bg-[#FFDF00] text-[#00383D] px-3.5 py-1 rounded-full inline-block mb-2">
                Catering Reservation & Inquiry
              </span>
              <h3 className="font-['Sedan'] text-[36px] sm:text-[44px] leading-tight">
                Plan Your Occasion
              </h3>
              <p className="text-sm sm:text-base opacity-85 mt-1">
                Tell us about your celebration, guest list, and preferred menu style.
              </p>
            </div>

            {/* Event Type selector pills */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2">
                Occasion / Service Type
              </label>
              <div className="flex flex-wrap gap-2.5">
                {["Business", "Wedding", "Private Event", "Gala Dinner", "Cocktail Party"].map(
                  (type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setEventType(type)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-spring cursor-pointer ${
                        eventType === type
                          ? "bg-[#00383D] text-[#FFDF00] shadow-md scale-105"
                          : "bg-white/60 text-[#00383D] hover:bg-white/90 hover:scale-102"
                      }`}
                    >
                      {type}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Date and Guest Count Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Calendar size={14} />
                  <span>Target Date *</span>
                </label>
                <input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-white/75 border border-[#00383D]/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00383D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Users size={14} />
                  <span>Estimated Guests *</span>
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full bg-white/75 border border-[#00383D]/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00383D]"
                >
                  <option value="10-25 guests">10 - 25 guests (Intimate)</option>
                  <option value="25-50 guests">25 - 50 guests (Small Gathering)</option>
                  <option value="50-100 guests">50 - 100 guests (Medium Celebration)</option>
                  <option value="100-250 guests">100 - 250 guests (Large Banquet)</option>
                  <option value="250+ guests">250+ guests (Grand Gala)</option>
                </select>
              </div>
            </div>

            {/* Dietary preferences */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Utensils size={14} />
                <span>Dietary Accommodations</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map((diet) => {
                  const active = selectedDiets.includes(diet);
                  return (
                    <button
                      key={diet}
                      type="button"
                      onClick={() => toggleDiet(diet)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                        active
                          ? "bg-[#00383D] text-[#FFDF00] border-[#00383D]"
                          : "bg-white/50 text-[#00383D] border-[#00383D]/20 hover:bg-white/80"
                      }`}
                    >
                      {active && <Check size={12} />}
                      <span>{diet}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Arthur Pendelton"
                  className="w-full bg-white/75 border border-[#00383D]/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00383D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="arthur@example.com"
                  className="w-full bg-white/75 border border-[#00383D]/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00383D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 019-2834"
                className="w-full bg-white/75 border border-[#00383D]/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00383D]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                Venue Location or Special Notes
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention any venue details, specific courses you love, or scheduling preferences..."
                className="w-full bg-white/75 border border-[#00383D]/20 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00383D]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#00383D] text-[#FFDF00] font-['Sedan'] text-[22px] py-4 rounded-full transition-spring hover:scale-[1.02] hover:shadow-2xl active:scale-95 shadow-xl font-medium cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Confirming Request...</span>
              ) : (
                <span>Submit Catering Inquiry</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

