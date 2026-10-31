"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Statement } from "@/components/Statement";
import { EventsWeServe } from "@/components/EventsWeServe";
import { FavoriteDishes } from "@/components/FavoriteDishes";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Reviews } from "@/components/Reviews";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { MenuModal } from "@/components/MenuModal";
import { LightboxModal } from "@/components/LightboxModal";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState("Business");
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleOpenBooking = (eventType = "Business") => {
    setSelectedEventType(eventType);
    setBookingOpen(true);
  };

  const handleProceedFromMenuToBooking = () => {
    setBookingOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#1BD6D3] text-[#00383D] relative w-full max-w-full overflow-x-hidden">
      {/* Fixed Navigation Header */}
      <Navbar onOpenBooking={() => handleOpenBooking("Business")} />

      {/* Hero Section */}
      <Hero />

      {/* Statement Section */}
      <Statement onOpenBooking={() => handleOpenBooking("Private Event")} />

      {/* Events We Serve Section */}
      <EventsWeServe onSelectEventForBooking={(type) => handleOpenBooking(type)} />

      {/* Guest Favorite Dishes Carousel Section */}
      <FavoriteDishes onOpenMenu={() => setMenuOpen(true)} />

      {/* Photo Gallery Grid */}
      <PhotoGallery onOpenLightbox={(idx) => setLightboxIndex(idx)} />

      {/* Reviews Testimonials Section */}
      <Reviews />

      {/* CTA Banner Section */}
      <CtaBanner onOpenBooking={() => handleOpenBooking("Wedding")} />

      {/* Footer */}
      <Footer />

      {/* Modals & Dialogs */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialEventType={selectedEventType}
      />

      <MenuModal
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onProceedToBooking={handleProceedFromMenuToBooking}
      />

      <LightboxModal
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </main>
  );
}
