/**
 * RAADO WATCH — Haute Horlogerie Cinematic Experience
 * Powered by GSAP 3 + ScrollTrigger
 * 
 * Features:
 * 1. GSAP Cinematic Hero Timeline & Staggered Word Reveals
 * 2. Mouse-Based 3D Tilt & Parallax on Hero Watch
 * 3. ScrollTrigger Sequential Reveals & Clipping Image Unveils
 * 4. Interactive Horological Showcase with Live Spec Switching
 * 5. Touch & Keyboard Accessible Testimonials Carousel
 * 6. Live Calibre Clock & Kinetic Watermark Parallax
 * 7. Verified Contact Concierge with Real State Feedback
 * 8. High-Res Image Lightbox & Product Specs Modal
 */

// ==========================================================================
// 1. Data Store for Sample Timepieces
// ==========================================================================
const watchCatalog = {
  classic: {
    name: "Classic Watch",
    price: "$350",
    image: "assets/images/classic-watch.jpg",
    tagline: "Timeless sophistication with warm rose-gold nuances.",
    description: "The Classic Watch is crafted for both everyday distinction and formal milestones. Features an ivory dial with Roman numerals and an embossed alligator-grain leather strap.",
    specs: {
      "Diameter": "40 mm",
      "Case": "316L Rose Gold PVD Steel",
      "Movement": "Automatic Caliber (28,800 vph)",
      "Crystal": "Domed Scratch-Resistant Sapphire",
      "Water Resistance": "5 ATM (50 meters)",
      "Strap": "Genuine Brown Calfskin Leather"
    }
  },
  sport: {
    name: "Sport Watch",
    price: "$420",
    image: "assets/images/sport-watch.jpg",
    tagline: "Engineered endurance with race-inspired tachymeter precision.",
    description: "Built to perform in demanding environments, the Sport Watch combines a woven carbon-fiber dial with chronograph subdials and an ergonomic waterproof rubber strap.",
    specs: {
      "Diameter": "43 mm",
      "Case": "Brushed Aerospace Grade Steel",
      "Movement": "High-Precision Quartz Chronograph",
      "Crystal": "Flat Anti-Reflective Sapphire",
      "Water Resistance": "10 ATM (100 meters)",
      "Strap": "Textured Fluoroelastomer Rubber"
    }
  },
  minimalist: {
    name: "Minimalist Watch",
    price: "$290",
    image: "assets/images/minimalist-watch.jpg",
    tagline: "Pure form, understated clarity, ultra-thin profile.",
    description: "Stripped of all non-essential markers, the Minimalist Watch celebrates clean Scandinavian-inspired horology. Pairs seamlessly with casual or evening attire.",
    specs: {
      "Diameter": "38 mm",
      "Case": "Polished Stainless Steel",
      "Movement": "Ultra-Slim Swiss Quartz Movement",
      "Crystal": "Sapphire Crystal",
      "Water Resistance": "3 ATM (30 meters)",
      "Strap": "Stainless Steel Milanese Mesh"
    }
  }
};

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Initialize GSAP & ScrollTrigger
if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ==========================================================================
// 2. DOM Elements & State
// ==========================================================================
const siteHeader = document.getElementById("site-header");
const navLinks = document.getElementById("nav-links");
const mobileToggle = document.getElementById("mobile-menu-toggle");
const heroVideo = document.getElementById("hero-bg-video");
const videoToggleBtn = document.getElementById("video-toggle-btn");
const videoBtnIcon = document.getElementById("video-btn-icon");

// Modals
const productModal = document.getElementById("product-modal");
const modalBody = document.getElementById("modal-body");
const modalCloseBtn = document.getElementById("modal-close-btn");
const imageLightbox = document.getElementById("image-lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxCloseBtn = document.getElementById("lightbox-close-btn");

// Clock Elements
const handHour = document.getElementById("clock-hand-hour");
const handMin = document.getElementById("clock-hand-min");
const handSec = document.getElementById("clock-hand-sec");
const liveTimeDisplay = document.getElementById("live-time-display");
const scrollDepthDisplay = document.getElementById("scroll-depth-display");

// Showcase Elements
const showcaseImg = document.getElementById("showcase-img");
const showcaseName = document.getElementById("showcase-name");
const showcasePrice = document.getElementById("showcase-price");
const showcaseDesc = document.getElementById("showcase-desc");
const specDia = document.getElementById("spec-dia");
const specCase = document.getElementById("spec-case");
const specMov = document.getElementById("spec-mov");
const specWr = document.getElementById("spec-wr");
const btnShowcaseModal = document.getElementById("btn-showcase-modal");
const stylePillBtns = document.querySelectorAll(".style-pill-btn");

// Contact Form
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// ==========================================================================
// 3. GSAP Cinematic Animations
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === "undefined" || prefersReducedMotion) {
    // Graceful fallback for reduced motion or without GSAP
    document.querySelectorAll(".headline-word, #hero-intro, #hero-actions, #hero-watch-card, #scroll-indicator").forEach(el => {
      if (el) {
        el.style.opacity = "1";
        el.style.transform = "none";
      }
    });
    return;
  }

  // --- Hero Cinematic Entrance Timeline ---
  const heroTL = gsap.timeline({ defaults: { ease: "power3.out" } });

  heroTL
    .fromTo(".site-header", 
      { y: -30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1 }
    )
    .to(".headline-word", {
      y: "0%",
      opacity: 1,
      duration: 1.1,
      stagger: 0.12,
      ease: "power3.out"
    }, "-=0.6")
    .to("#hero-intro", {
      y: 0,
      opacity: 1,
      duration: 0.9
    }, "-=0.7")
    .to("#hero-actions", {
      y: 0,
      opacity: 1,
      duration: 0.9
    }, "-=0.7")
    .to("#hero-watch-card", {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      duration: 1.3,
      ease: "expo.out"
    }, "-=0.9")
    .to("#scroll-indicator", {
      opacity: 0.85,
      duration: 0.8
    }, "-=0.5");

  // --- Mouse-based 3D Parallax on Hero Watch ---
  const heroCard = document.getElementById("hero-watch-card");
  const heroSection = document.getElementById("hero");

  if (heroCard && heroSection && window.innerWidth > 960) {
    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(heroCard, {
        rotateY: x * 14,
        rotateX: -y * 14,
        duration: 0.8,
        ease: "power2.out",
        transformPerspective: 1000
      });

      gsap.to(".hero-watch-glow", {
        x: x * 40,
        y: y * 40,
        duration: 1.2,
        ease: "power2.out"
      });
    });

    heroSection.addEventListener("mouseleave", () => {
      gsap.to(heroCard, {
        rotateY: 0,
        rotateX: 0,
        duration: 1.2,
        ease: "power2.out"
      });
      gsap.to(".hero-watch-glow", {
        x: 0,
        y: 0,
        duration: 1.2,
        ease: "power2.out"
      });
    });
  }

  // --- ScrollTrigger: Featured Watches Staggered Reveal ---
  gsap.from(".collection-header", {
    scrollTrigger: {
      trigger: ".collection-section",
      start: "top 80%"
    },
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  gsap.from(".product-card", {
    scrollTrigger: {
      trigger: ".product-grid",
      start: "top 78%"
    },
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.18,
    ease: "power3.out"
  });

  // --- ScrollTrigger: Brand Story Split-Screen Reveal ---
  gsap.from(".about-text", {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 75%"
    },
    x: -50,
    opacity: 0,
    duration: 1.1,
    ease: "power3.out"
  });

  gsap.from(".about-image-card", {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 75%"
    },
    x: 50,
    opacity: 0,
    duration: 1.1,
    ease: "power3.out"
  });

  // --- ScrollTrigger: Showcase Container Reveal ---
  gsap.from(".showcase-container", {
    scrollTrigger: {
      trigger: ".showcase-section",
      start: "top 75%"
    },
    scale: 0.94,
    opacity: 0,
    duration: 1.2,
    ease: "expo.out"
  });

  // --- ScrollTrigger: Craftsmanship 4-Card Stagger ---
  gsap.from(".craft-card", {
    scrollTrigger: {
      trigger: ".craft-grid",
      start: "top 80%"
    },
    y: 50,
    opacity: 0,
    duration: 0.9,
    stagger: 0.14,
    ease: "power3.out"
  });

  // --- ScrollTrigger: Testimonials Carousel Reveal ---
  gsap.from(".testimonial-carousel-container", {
    scrollTrigger: {
      trigger: ".testimonials-section",
      start: "top 80%"
    },
    y: 45,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  // --- ScrollTrigger: Contact Card Reveal ---
  gsap.from(".contact-card", {
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top 78%"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });

  // --- ScrollTrigger: Kinetic Watermark Horizontal Parallax ---
  gsap.to(".watermark-collection", {
    scrollTrigger: {
      trigger: ".collection-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    },
    x: -180,
    ease: "none"
  });

  gsap.to(".watermark-showcase", {
    scrollTrigger: {
      trigger: ".showcase-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    },
    x: 160,
    ease: "none"
  });

  gsap.to(".watermark-craft", {
    scrollTrigger: {
      trigger: ".craftsmanship-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 1
    },
    x: -140,
    ease: "none"
  });
});

// ==========================================================================
// 4. Header Scroll State & Active Nav Link Tracking
// ==========================================================================
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY || window.pageYOffset;

  // Header background blur transition
  if (siteHeader) {
    if (scrollY > 50) {
      siteHeader.classList.add("is-scrolled");
    } else {
      siteHeader.classList.remove("is-scrolled");
    }
  }

  // Active section indicator
  const sections = document.querySelectorAll("section[id]");
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (scrollY >= top && scrollY < top + height) {
      document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });

  // Scroll depth percentage calculation
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? Math.min(100, Math.round((scrollY / docHeight) * 100)) : 0;
  if (scrollDepthDisplay) {
    scrollDepthDisplay.textContent = `${scrollPercent}% SCROLL`;
  }
}, { passive: true });

// ==========================================================================
// 5. Live Horological Calibre Clock (Smooth Real-Time Ticking)
// ==========================================================================
function updateLiveClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const millis = now.getMilliseconds();

  const secondDeg = ((seconds + millis / 1000) / 60) * 360;
  const minuteDeg = ((minutes + seconds / 60) / 60) * 360;
  const hourDeg = (((hours % 12) + minutes / 60) / 12) * 360;

  if (handSec) handSec.style.transform = `rotate(${secondDeg}deg)`;
  if (handMin) handMin.style.transform = `rotate(${minuteDeg}deg)`;
  if (handHour) handHour.style.transform = `rotate(${hourDeg}deg)`;

  if (liveTimeDisplay) {
    const formatted = [hours, minutes, seconds]
      .map(v => String(v).padStart(2, "0"))
      .join(":");
    liveTimeDisplay.textContent = formatted;
  }

  requestAnimationFrame(updateLiveClock);
}
requestAnimationFrame(updateLiveClock);

// ==========================================================================
// 6. Interactive Product Showcase / Details Switcher
// ==========================================================================
stylePillBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const targetKey = btn.getAttribute("data-showcase");
    const watch = watchCatalog[targetKey];
    if (!watch) return;

    // Update active button state
    stylePillBtns.forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    // Animate image and spec changes with GSAP
    if (typeof gsap !== "undefined" && !prefersReducedMotion) {
      gsap.to(showcaseImg, {
        opacity: 0,
        scale: 0.94,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          showcaseImg.src = watch.image;
          showcaseImg.alt = watch.name;
          showcaseName.textContent = watch.name;
          showcasePrice.textContent = watch.price;
          showcaseDesc.textContent = watch.description;
          specDia.textContent = watch.specs["Diameter"];
          specCase.textContent = watch.specs["Case"];
          specMov.textContent = watch.specs["Movement"];
          specWr.textContent = watch.specs["Water Resistance"];
          if (btnShowcaseModal) btnShowcaseModal.setAttribute("data-product", targetKey);

          gsap.to(showcaseImg, {
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: "power2.out"
          });
        }
      });
    } else {
      showcaseImg.src = watch.image;
      showcaseName.textContent = watch.name;
      showcasePrice.textContent = watch.price;
      showcaseDesc.textContent = watch.description;
      specDia.textContent = watch.specs["Diameter"];
      specCase.textContent = watch.specs["Case"];
      specMov.textContent = watch.specs["Movement"];
      specWr.textContent = watch.specs["Water Resistance"];
      if (btnShowcaseModal) btnShowcaseModal.setAttribute("data-product", targetKey);
    }
  });
});

// Showcase Inquire Button
const btnShowcaseInquiry = document.getElementById("btn-showcase-inquiry");
if (btnShowcaseInquiry) {
  btnShowcaseInquiry.addEventListener("click", () => {
    const currentName = showcaseName.textContent;
    const contactMessage = document.getElementById("contact-message");
    if (contactMessage) {
      contactMessage.value = `I am interested in bespoke details and acquisition timing for the ${currentName}.`;
    }
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// ==========================================================================
// 7. Accessible Testimonials Carousel (Click, Touch, Keyboard)
// ==========================================================================
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const carouselDots = document.querySelectorAll(".carousel-dot");
const prevBtn = document.getElementById("carousel-prev-btn");
const nextBtn = document.getElementById("carousel-next-btn");
const carouselContainer = document.getElementById("testimonial-carousel");
let currentSlideIndex = 0;

function showSlide(index) {
  if (index < 0) index = testimonialSlides.length - 1;
  if (index >= testimonialSlides.length) index = 0;
  currentSlideIndex = index;

  testimonialSlides.forEach((slide, i) => {
    slide.classList.toggle("is-active", i === currentSlideIndex);
  });

  carouselDots.forEach((dot, i) => {
    dot.classList.toggle("is-active", i === currentSlideIndex);
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => showSlide(currentSlideIndex - 1));
}
if (nextBtn) {
  nextBtn.addEventListener("click", () => showSlide(currentSlideIndex + 1));
}

carouselDots.forEach(dot => {
  dot.addEventListener("click", () => {
    const index = parseInt(dot.getAttribute("data-dot"), 10);
    showSlide(index);
  });
});

// Touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;
if (carouselContainer) {
  carouselContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  carouselContainer.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 45) {
      showSlide(currentSlideIndex + 1); // Swipe left -> next
    } else if (touchEndX - touchStartX > 45) {
      showSlide(currentSlideIndex - 1); // Swipe right -> prev
    }
  }, { passive: true });
}

// ==========================================================================
// 8. Product Details Modal & Interactive Catalog Logic
// ==========================================================================
function openProductModal(productId) {
  const watch = watchCatalog[productId];
  if (!watch) return;

  let specRowsHtml = "";
  for (const [key, value] of Object.entries(watch.specs)) {
    specRowsHtml += `
      <li>
        <span class="spec-name">${key}</span>
        <span class="spec-val">${value}</span>
      </li>
    `;
  }

  modalBody.innerHTML = `
    <div class="modal-product-header">
      <img src="${watch.image}" alt="${watch.name}" class="modal-thumb" style="cursor: pointer;" onclick="openImageLightbox('${watch.image}', '${watch.name}')" title="Click to view full-size">
      <div class="modal-title-area">
        <h3 id="modal-title">${watch.name}</h3>
        <div class="modal-price">${watch.price}</div>
        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-top: 6px;">${watch.tagline}</p>
      </div>
    </div>
    <p style="font-size: 0.95rem; line-height: 1.65; color: var(--text-primary); margin-bottom: 18px;">
      ${watch.description}
    </p>
    <ul class="modal-spec-list">
      ${specRowsHtml}
    </ul>
    <div style="display: flex; gap: 14px; margin-top: 24px;">
      <button class="btn btn-gold" style="flex: 1;" onclick="handleModalInquiry('${watch.name}')">Inquire for Allocation</button>
      <button class="btn btn-outline-dark" onclick="closeProductModal()">Close</button>
    </div>
  `;

  productModal.classList.add("is-open");
  productModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  productModal.classList.remove("is-open");
  productModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

window.handleModalInquiry = function(watchName) {
  closeProductModal();
  const contactMessage = document.getElementById("contact-message");
  if (contactMessage) {
    contactMessage.value = `I wish to inquire about availability and concierge reservation for the ${watchName}.`;
  }
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: "smooth" });
  }
};

document.querySelectorAll(".view-details-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const productKey = btn.getAttribute("data-product");
    openProductModal(productKey);
  });
});

if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeProductModal);

if (productModal) {
  productModal.addEventListener("click", (e) => {
    if (e.target === productModal) closeProductModal();
  });
}

// ==========================================================================
// 9. Full-Screen High-Resolution Lightbox
// ==========================================================================
window.openImageLightbox = function(src, altText) {
  if (!imageLightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = altText;
  lightboxCaption.textContent = altText;
  imageLightbox.classList.add("is-open");
  imageLightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

function closeImageLightbox() {
  if (!imageLightbox) return;
  imageLightbox.classList.remove("is-open");
  imageLightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".zoomable-image").forEach(el => {
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    const src = el.getAttribute("data-src") || el.src;
    const alt = el.getAttribute("data-alt") || el.alt || "RAADO WATCH";
    openImageLightbox(src, alt);
  });
});

if (lightboxCloseBtn) lightboxCloseBtn.addEventListener("click", closeImageLightbox);

if (imageLightbox) {
  imageLightbox.addEventListener("click", (e) => {
    if (e.target === imageLightbox) closeImageLightbox();
  });
}

// Close modals on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (imageLightbox && imageLightbox.classList.contains("is-open")) {
      closeImageLightbox();
    } else if (productModal && productModal.classList.contains("is-open")) {
      closeProductModal();
    }
  } else if (e.key === "ArrowLeft") {
    showSlide(currentSlideIndex - 1);
  } else if (e.key === "ArrowRight") {
    showSlide(currentSlideIndex + 1);
  }
});

// ==========================================================================
// 10. Ambient Background Video Controller
// ==========================================================================
if (videoToggleBtn && heroVideo) {
  videoToggleBtn.addEventListener("click", () => {
    if (heroVideo.paused) {
      heroVideo.play();
      if (videoBtnIcon) videoBtnIcon.textContent = "⏸";
      videoToggleBtn.setAttribute("aria-label", "Pause background video");
    } else {
      heroVideo.pause();
      if (videoBtnIcon) videoBtnIcon.textContent = "▶";
      videoToggleBtn.setAttribute("aria-label", "Play background video");
    }
  });
}

// ==========================================================================
// 11. Mobile Navigation Menu Toggle
// ==========================================================================
if (mobileToggle && navLinks) {
  mobileToggle.addEventListener("click", () => {
    navLinks.classList.toggle("is-active");
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-active");
    });
  });
}

// ==========================================================================
// 12. Verified Contact Concierge Form Handling (Realistic Feedback)
// ==========================================================================
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("contact-name").value.trim();
    const emailInput = document.getElementById("contact-email").value.trim();
    const submitBtn = document.getElementById("btn-send-inquiry");

    if (!nameInput || !emailInput) {
      formStatus.className = "form-status status-error";
      formStatus.textContent = "Please fill in all required fields.";
      return;
    }

    // Step 1: Realistic Loading State
    formStatus.className = "form-status status-loading";
    formStatus.textContent = "Connecting with RAADO concierge...";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";
      submitBtn.innerHTML = "<span>Transmitting...</span>";
    }

    // Step 2: Realistic Server Simulation
    setTimeout(() => {
      formStatus.className = "form-status status-success";
      formStatus.textContent = `Concierge inquiry received, ${nameInput}. (Demo verification: This is an educational inquiry for the RAADO WATCH project).`;
      contactForm.reset();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
        submitBtn.innerHTML = "<span>Send Demo Inquiry</span>";
      }

      setTimeout(() => {
        formStatus.textContent = "";
        formStatus.className = "form-status";
      }, 7000);
    }, 1200);
  });
}
