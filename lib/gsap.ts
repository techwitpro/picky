import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Configure ScrollTrigger defaults for silky-smooth, reliable execution
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  });

  // Automatically refresh trigger coordinates when fonts or images finish loading
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });

  if ("fonts" in document) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }

  // Fallback refresh after initial React hydration
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 350);

  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 1000);
}

export { gsap, ScrollTrigger };
