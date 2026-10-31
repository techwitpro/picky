"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MessageSquarePlus, X, Star } from "lucide-react";
import { gsap } from "@/lib/gsap";

interface ReviewItem {
  id: string;
  rating: number; // 5 or 4.5
  quote: string;
  author: string;
  role: string;
}

const initialReviews: ReviewItem[] = [
  {
    id: "review-1",
    rating: 5,
    quote:
      "“Our team praised the smooth planning and warm service. Every course impressed, and our corporate gathering felt polished from the first welcome through the final toast together.”",
    author: "Max Fleury",
    role: "Project Manager, Willpower",
  },
  {
    id: "review-2",
    rating: 4.5,
    quote:
      "\"Warm service and delicious food made our celebration feel effortless, truly memorable, and beautifully handled. We would happily choose this team again.\"",
    author: "Aaron Dhillon",
    role: "Co-Founder, Earthcon",
  },
  {
    id: "review-3",
    rating: 5,
    quote:
      "“The team's care stood out throughout our celebration. Thoughtful details, excellent food, and attentive service made the entire evening feel special at every turn.”",
    author: "Jack Williams",
    role: "CEO, Memorisely",
  },
];

export const Reviews: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(initialReviews);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newFeedback, setNewFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

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
        ".reviews-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "all",
        }
      )
      // 2. Testimonial Cards staggered rise
      .fromTo(
        ".review-card-item",
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

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newFeedback.trim()) return;

    const newRev: ReviewItem = {
      id: `review-${Date.now()}`,
      rating: newRating,
      quote: `“${newFeedback.trim()}”`,
      author: newName.trim(),
      role: newRole.trim() || "Event Host",
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowReviewModal(false);
      setNewName("");
      setNewRole("");
      setNewFeedback("");
    }, 1800);
  };

  return (
    <section ref={sectionRef} id="reviews" className="py-24 sm:py-28 md:py-32 px-6 w-full max-w-full overflow-hidden">
      <div className="max-w-[1320px] mx-auto">
        {/* Section Header */}
        <div className="reviews-header text-center max-w-[612px] mx-auto mb-16 md:mb-20">
          <h2 className="font-['Sedan'] text-[#00383D] text-[42px] sm:text-[56px] md:text-[64px] lg:text-[72px] leading-[1.1] font-normal mb-5 tracking-[-0.0139em]">
            Reviews
          </h2>
          <p className="font-['Inter'] text-[#005057] text-[16px] sm:text-[17px] md:text-[18px] leading-[1.8] font-normal">
            Our guests' feedback reflects the thoughtful planning, delicious menus, and attentive service we deliver at every gathering.
          </p>
        </div>

        {/* 3 Review Cards Grid with Arch-Top geometry */}
        <div className="reviews-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {reviewsList.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="review-card-item w-full max-w-[420px]"
            >
              <div className="bg-[#00383D] text-center rounded-t-[140px] sm:rounded-t-[160px] rounded-b-[24px] pt-12 pb-8 px-8 sm:px-10 flex flex-col items-center justify-between min-h-[422px] w-full shadow-xl transition-spring hover:-translate-y-2.5 hover:shadow-[0_25px_50px_rgba(0,56,61,0.3)] relative overflow-hidden group border border-[#FFDF00]/10">
                {/* Subtle Arch Ambient Glow */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#FFDF00]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Star Rating */}
                <div className="flex items-center gap-1.5 pt-4">
                  {[...Array(Math.floor(review.rating))].map((_, i) => (
                    <div key={i} className="review-star-icon transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src="/images/star_full.svg"
                        alt="Full Star"
                        width={26}
                        height={26}
                        className="w-[24px] sm:w-[26px] h-[24px] sm:h-[26px]"
                      />
                    </div>
                  ))}
                  {review.rating % 1 !== 0 && (
                    <div className="review-star-icon transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src="/images/star_half.svg"
                        alt="Half Star"
                        width={26}
                        height={26}
                        className="w-[24px] sm:w-[26px] h-[24px] sm:h-[26px]"
                      />
                    </div>
                  )}
                </div>

                {/* Quote Text */}
                <p className="font-['Inter'] text-[#FFDF00] text-[17px] sm:text-[19px] md:text-[20px] leading-[1.68] font-normal my-6 max-w-[360px]">
                  {review.quote}
                </p>

                {/* Author & Role */}
                <div className="flex flex-col items-center gap-1 pb-2">
                  <h4 className="font-['Sedan'] text-white text-[22px] sm:text-[24px] leading-tight font-normal">
                    {review.author}
                  </h4>
                  <p className="font-['Inter'] text-[#FFDF00] text-[15px] sm:text-[16px] leading-[1.8] font-normal opacity-90">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* User Interaction: Share Experience Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowReviewModal(true)}
            className="flex items-center gap-2.5 bg-transparent border-2 border-[#00383D] text-[#00383D] font-['Sedan'] text-[18px] px-7 py-3.5 rounded-full hover:bg-[#00383D] hover:text-[#FFDF00] transition-spring cursor-pointer shadow-sm hover:shadow-lg active:scale-95 group"
          >
            <MessageSquarePlus size={20} className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
            <span>Share Your Experience</span>
          </button>
        </div>
      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#1BD6D3] text-[#00383D] w-full max-w-lg rounded-[32px] p-6 sm:p-8 shadow-2xl relative border-2 border-[#00383D]/10">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#00383D] text-[#FFDF00] flex items-center justify-center hover:scale-110 hover:rotate-90 active:scale-90 transition-all duration-300 cursor-pointer"
            >
              <X size={20} />
            </button>

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-[#00383D] text-[#FFDF00] rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  ✓
                </div>
                <h3 className="font-['Sedan'] text-[32px] mb-2">Thank You!</h3>
                <p className="text-sm">
                  Your feedback helps us continue providing memorable catering.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <h3 className="font-['Sedan'] text-[32px] text-center mb-1">
                  Leave a Review
                </h3>
                <p className="text-xs sm:text-sm text-center opacity-85 mb-4">
                  How was your experience with Catered Plate?
                </p>

                {/* Rating selection */}
                <div className="flex justify-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 cursor-pointer transition-transform duration-200 hover:scale-125 active:scale-90"
                    >
                      <Star
                        size={30}
                        className={
                          star <= newRating
                            ? "fill-[#00383D] text-[#00383D]"
                            : "text-[#00383D]/30"
                        }
                      />
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Jessica Miller"
                    className="w-full bg-white/70 border border-[#00383D]/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00383D] transition-shadow duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                    Your Role / Company / Event
                  </label>
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="e.g. Host, Summer Soirée"
                    className="w-full bg-white/70 border border-[#00383D]/20 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00383D] transition-shadow duration-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newFeedback}
                    onChange={(e) => setNewFeedback(e.target.value)}
                    placeholder="Tell us about the dishes, service, and guest reactions..."
                    className="w-full bg-white/70 border border-[#00383D]/20 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00383D] transition-shadow duration-200"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00383D] text-[#FFDF00] font-['Sedan'] text-[20px] py-3.5 rounded-full transition-spring hover:scale-[1.02] hover:shadow-xl active:scale-95 font-medium cursor-pointer"
                >
                  Post Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
