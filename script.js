/**
 * RAADO WATCH — Interactive Client Logic & Smooth Animations
 * 
 * Features:
 * 1. Live Horological Calibre Clock (hours, minutes, ticking seconds)
 * 2. Scroll-driven Watermark Parallax & Scroll Depth Percentage
 * 3. Staggered Scroll-Triggered Reveal Animations (IntersectionObserver)
 * 4. Ambient Hero Background Video Controller (Play/Pause)
 * 5. High-Resolution Image Lightbox (Open Images with Smooth Motion)
 * 6. Product Details Modal & Interactive Inquiry Handling
 */

// 1. Data Store for Sample Timepieces
const watchCatalog = {
  classic: {
    name: "Classic Watch",
    price: "$350",
    image: "assets/images/classic-watch.jpg",
    tagline: "Timeless sophistication with warm rose-gold nuances.",
    description: "The Classic Watch is crafted for both everyday distinction and formal milestones. Features an ivory dial with Roman numerals and an embossed alligator-grain leather strap.",
    specs: {
      "Case Diameter": "40 mm",
      "Case Material": "316L Stainless Steel with Rose Gold PVD",
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
    description: "Built to perform in demanding environments, the Sport Watch combines a woven carbon-fiber dial with chronograph subdials and a high-grade resilient rubber strap.",
    specs: {
      "Case Diameter": "43 mm",
      "Case Material": "Brushed Aerospace Grade Steel",
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
      "Case Diameter": "38 mm",
      "Case Material": "Polished Stainless Steel",
      "Movement": "Ultra-Slim Swiss Quartz Movement",
      "Crystal": "Sapphire Crystal",
      "Water Resistance": "3 ATM (30 meters)",
      "Strap": "Stainless Steel Milanese Mesh"
    }
  }
};

// 2. DOM Elements
const modal = document.getElementById("product-modal");
const modalBody = document.getElementById("modal-body");
const modalCloseBtn = document.getElementById("modal-close-btn");
const viewButtons = document.querySelectorAll(".view-details-btn");
const mobileToggle = document.getElementById("mobile-menu-toggle");
const navLinks = document.getElementById("nav-links");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Video and Lightbox Elements
const heroVideo = document.getElementById("hero-bg-video");
const videoToggleBtn = document.getElementById("video-toggle-btn");
const videoBtnIcon = document.getElementById("video-btn-icon");

const imageLightbox = document.getElementById("image-lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxCloseBtn = document.getElementById("lightbox-close-btn");

// Clock and Scroll Elements
const handHour = document.getElementById("clock-hand-hour");
const handMin = document.getElementById("clock-hand-min");
const handSec = document.getElementById("clock-hand-sec");
const liveTimeDisplay = document.getElementById("live-time-display");
const scrollDepthDisplay = document.getElementById("scroll-depth-display");

const watermarkHero = document.getElementById("watermark-hero");
const watermarkCollection = document.getElementById("watermark-collection");
const watermarkAbout = document.getElementById("watermark-about");

// ==========================================================================
// 3. Live Horological Calibre Clock (Smooth Ticking Animation)
// ==========================================================================
function updateHorologyClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const millis = now.getMilliseconds();

  // Calculate degrees for analog watch hands
  const secondDeg = ((seconds + millis / 1000) / 60) * 360;
  const minuteDeg = ((minutes + seconds / 60) / 60) * 360;
  const hourDeg = (((hours % 12) + minutes / 60) / 12) * 360;

  if (handSec) handSec.style.transform = `rotate(${secondDeg}deg)`;
  if (handMin) handMin.style.transform = `rotate(${minuteDeg}deg)`;
  if (handHour) handHour.style.transform = `rotate(${hourDeg}deg)`;

  // Update digital readout (HH:MM:SS)
  if (liveTimeDisplay) {
    const formatted = [hours, minutes, seconds]
      .map(v => String(v).padStart(2, "0"))
      .join(":");
    liveTimeDisplay.textContent = formatted;
  }

  requestAnimationFrame(updateHorologyClock);
}
// Start horology clock loop
requestAnimationFrame(updateHorologyClock);

// ==========================================================================
// 4. Scroll-Driven Time Animation & Background Words Parallax
// ==========================================================================
function handleScrollEffects() {
  const scrollY = window.scrollY || window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? Math.min(100, Math.round((scrollY / docHeight) * 100)) : 0;

  // Update scroll percentage indicator
  if (scrollDepthDisplay) {
    scrollDepthDisplay.textContent = `${scrollPercent}% SCROLL`;
  }

  // Smooth Parallax for Background Typography Words
  if (watermarkHero) {
    watermarkHero.style.transform = `translateX(${scrollY * -0.25}px)`;
  }
  if (watermarkCollection) {
    watermarkCollection.style.transform = `translateX(${-120 + scrollY * 0.22}px)`;
  }
  if (watermarkAbout) {
    watermarkAbout.style.transform = `translateX(${scrollY * -0.18}px)`;
  }

  // Sticky header shadow enhancement
  const header = document.getElementById("site-header");
  if (header) {
    if (scrollY > 40) {
      header.style.boxShadow = "0 8px 24px rgba(18, 19, 22, 0.06)";
    } else {
      header.style.boxShadow = "none";
    }
  }
}

window.addEventListener("scroll", handleScrollEffects, { passive: true });
handleScrollEffects(); // Initial call

// ==========================================================================
// 5. Scroll-Triggered Entrance Animations (IntersectionObserver)
// ==========================================================================
const scrollObserverOptions = {
  threshold: 0.12,
  rootMargin: "0px 0px -40px 0px"
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute("data-delay") || 0;
      setTimeout(() => {
        entry.target.classList.add("is-visible");
      }, delay);
      scrollObserver.unobserve(entry.target); // Reveal once
    }
  });
}, scrollObserverOptions);

document.querySelectorAll(".anim-on-scroll").forEach(el => {
  scrollObserver.observe(el);
});

// ==========================================================================
// 6. Ambient Background Video Controller (Play / Pause)
// ==========================================================================
if (videoToggleBtn && heroVideo) {
  videoToggleBtn.addEventListener("click", () => {
    if (heroVideo.paused) {
      heroVideo.play();
      videoBtnIcon.textContent = "⏸";
      videoToggleBtn.setAttribute("aria-label", "Pause background video");
    } else {
      heroVideo.pause();
      videoBtnIcon.textContent = "▶";
      videoToggleBtn.setAttribute("aria-label", "Play background video");
    }
  });
}

// ==========================================================================
// 7. High-Resolution Image Lightbox (Open Images with Smooth Motion)
// ==========================================================================
function openImageLightbox(src, altText) {
  if (!imageLightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = altText;
  lightboxCaption.textContent = altText;
  imageLightbox.classList.add("is-open");
  imageLightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeImageLightbox() {
  if (!imageLightbox) return;
  imageLightbox.classList.remove("is-open");
  imageLightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

// Attach lightbox trigger to all zoomable images
document.querySelectorAll(".zoomable-image").forEach(img => {
  img.addEventListener("click", (e) => {
    e.stopPropagation();
    openImageLightbox(img.src, img.alt);
  });
});

if (lightboxCloseBtn) {
  lightboxCloseBtn.addEventListener("click", closeImageLightbox);
}

if (imageLightbox) {
  imageLightbox.addEventListener("click", (e) => {
    if (e.target === imageLightbox) {
      closeImageLightbox();
    }
  });
}

// ==========================================================================
// 8. Product Details Modal & Interactive Catalog Logic
// ==========================================================================
function openProductModal(productId) {
  const watch = watchCatalog[productId];
  if (!watch) return;

  // Build specs rows dynamically
  let specRowsHtml = "";
  for (const [key, value] of Object.entries(watch.specs)) {
    specRowsHtml += `
      <li>
        <span class="spec-name">${key}</span>
        <span class="spec-val">${value}</span>
      </li>
    `;
  }

  // Populate modal content
  modalBody.innerHTML = `
    <div class="modal-product-header">
      <img src="${watch.image}" alt="${watch.name}" class="modal-thumb" style="cursor: pointer;" onclick="openImageLightbox('${watch.image}', '${watch.name}')" title="Click to view full-size">
      <div class="modal-title-area">
        <h3 id="modal-title">${watch.name}</h3>
        <div class="modal-price">${watch.price}</div>
        <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-top: 6px;">${watch.tagline}</p>
      </div>
    </div>
    <p style="font-size: 0.95rem; line-height: 1.6; color: var(--color-text-main); margin-bottom: 16px;">
      ${watch.description}
    </p>
    <ul class="modal-spec-list">
      ${specRowsHtml}
    </ul>
    <div style="display: flex; gap: 12px; margin-top: 20px;">
      <button class="btn btn-primary" style="flex: 1;" onclick="alert('Demo Inquiry: ${watch.name} request registered for RAADO WATCH educational test.')">Demo Order Inquiry</button>
      <button class="btn btn-outline" onclick="closeProductModal()">Close</button>
    </div>
  `;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function closeProductModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = ""; // Restore background scrolling
}

// Attach Event Listeners to "View Details" Buttons
viewButtons.forEach(button => {
  button.addEventListener("click", () => {
    const productKey = button.getAttribute("data-product");
    openProductModal(productKey);
  });
});

modalCloseBtn.addEventListener("click", closeProductModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeProductModal();
  }
});

// Close modals when Escape key is pressed
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (imageLightbox && imageLightbox.classList.contains("is-open")) {
      closeImageLightbox();
    } else if (modal && modal.classList.contains("is-open")) {
      closeProductModal();
    }
  }
});

// ==========================================================================
// 9. Mobile Navigation Menu Toggle
// ==========================================================================
if (mobileToggle) {
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
// 10. Demo Contact Form Submission
// ==========================================================================
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameInput = document.getElementById("contact-name").value;

    formStatus.textContent = `Thank you, ${nameInput}! (Demo note: This inquiry is simulated for the RAADO WATCH learning project).`;
    contactForm.reset();

    setTimeout(() => {
      formStatus.textContent = "";
    }, 6000);
  });
}
