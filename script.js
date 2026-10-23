/**
 * RAADO WATCH — Dynamic Watch Catalogue, Theme System & GSAP Motion Controller
 * 
 * Features:
 * - Step 5: Advanced GSAP & ScrollTrigger animations (Hero timeline, 3D parallax, scroll reveals)
 * - Step 6: Real interactions (5-watch dynamic catalogue, category filters, themed modal, contact handling)
 * - Step 7: Accessibility (WCAG focus states, reduced-motion compliance, keyboard listeners)
 * - Step 8: Clean lifecycle, error-free DOM bindings, and high performance
 */

document.addEventListener("DOMContentLoaded", () => {
  const catalog = window.WATCH_CATALOG || {};
  const productGrid = document.getElementById("product-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const siteHeader = document.getElementById("site-header");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isGSAPAvailable = typeof gsap !== "undefined";

  if (isGSAPAvailable && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // ==========================================================================
  // 1. Render Product Cards Dynamically
  // ==========================================================================
  function renderCatalogue(filterCategory = "all") {
    if (!productGrid) return;
    productGrid.innerHTML = "";

    const watches = Object.values(catalog);
    const filtered = filterCategory === "all" 
      ? watches 
      : watches.filter(w => w.category === filterCategory);

    filtered.forEach((watch, index) => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.setAttribute("data-theme", watch.theme);
      card.setAttribute("id", `card-${watch.id}`);
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `${watch.name}, priced at ${watch.price}`);

      card.innerHTML = `
        <div class="product-image-container zoomable-image" data-src="${watch.primaryImage}" data-alt="${watch.name}">
          <img src="${watch.primaryImage}" alt="${watch.name} - ${watch.subtitle}" class="product-image" loading="lazy">
          <span class="product-tag">${watch.categoryLabel}</span>
        </div>
        <div class="product-info">
          <span class="product-category-tag">${watch.subtitle}</span>
          <h3 class="product-name">${watch.name}</h3>
          <p class="product-snippet">${watch.tagline}</p>
          <div class="product-bottom">
            <span class="product-price">${watch.price}</span>
            <div class="product-actions-wrap">
              <button class="btn btn-small view-modal-btn" data-id="${watch.id}" aria-label="Quick preview of ${watch.name}">Quick View</button>
              <a href="product.html?id=${watch.id}" class="btn btn-small btn-primary" aria-label="Open detailed page for ${watch.name}">Page &rarr;</a>
            </div>
          </div>
        </div>
      `;

      productGrid.appendChild(card);
    });

    // Reattach interactive listeners
    attachCardListeners();

    // GSAP Card Stagger Animation when filtering or rendering
    if (isGSAPAvailable && !prefersReducedMotion) {
      gsap.fromTo(".product-card", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }
      );
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
    }
  }

  // ==========================================================================
  // 2. Category Filter Controls
  // ==========================================================================
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const category = btn.getAttribute("data-filter");
      renderCatalogue(category);
    });
  });

  // Initial catalogue render
  renderCatalogue("all");

  // ==========================================================================
  // 3. Step 5 — Advanced GSAP Animations & Parallax
  // ==========================================================================
  if (isGSAPAvailable && !prefersReducedMotion) {
    // Hero Entrance Timeline
    const heroTL = gsap.timeline({ defaults: { ease: "power3.out" } });

    heroTL
      .from(".site-header", {
        y: -30,
        opacity: 0,
        duration: 0.8
      })
      .from(".hero-badge", {
        scale: 0.9,
        opacity: 0,
        duration: 0.6
      }, "-=0.4")
      .from(".hero-headline", {
        y: 25,
        opacity: 0,
        duration: 0.9
      }, "-=0.4")
      .from(".hero-intro", {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, "-=0.6")
      .from(".hero-actions", {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, "-=0.6")
      .from(".image-frame", {
        scale: 0.94,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out"
      }, "-=0.7");

    // Mouse-based 3D perspective parallax on hero watch
    const heroFrame = document.getElementById("hero-image-frame");
    const heroSection = document.getElementById("hero");

    if (heroFrame && heroSection && window.innerWidth > 960) {
      heroSection.addEventListener("mousemove", (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(heroFrame, {
          rotateY: x * 10,
          rotateX: -y * 10,
          duration: 0.6,
          ease: "power1.out",
          transformPerspective: 1000
        });
      });

      heroSection.addEventListener("mouseleave", () => {
        gsap.to(heroFrame, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      });
    }

    // ScrollTrigger Sections
    if (typeof ScrollTrigger !== "undefined") {
      gsap.from(".collection-section .section-header", {
        scrollTrigger: {
          trigger: ".collection-section",
          start: "top 80%"
        },
        y: 35,
        opacity: 0,
        duration: 0.9
      });

      gsap.from(".about-grid", {
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 78%"
        },
        y: 40,
        opacity: 0,
        duration: 1
      });

      gsap.from(".contact-card", {
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%"
        },
        y: 40,
        opacity: 0,
        duration: 0.9
      });
    }
  }

  // Sticky Header Scroll Listener
  window.addEventListener("scroll", () => {
    if (siteHeader) {
      if (window.scrollY > 40) {
        siteHeader.classList.add("is-scrolled");
      } else {
        siteHeader.classList.remove("is-scrolled");
      }
    }
  }, { passive: true });

  // ==========================================================================
  // 4. Themed Product Quick-View Modal
  // ==========================================================================
  const modal = document.getElementById("product-modal");
  const modalBody = document.getElementById("modal-body");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  function openThemedModal(watchId) {
    const watch = catalog[watchId];
    if (!watch || !modal || !modalBody) return;

    // Apply watch's specific theme to the modal dialog
    modal.setAttribute("data-theme", watch.theme);

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
        <img src="${watch.primaryImage}" alt="${watch.name}" class="modal-thumb" style="cursor: pointer;" onclick="openImageLightbox('${watch.primaryImage}', '${watch.name}')" title="Click to view full screen">
        <div class="modal-title-area">
          <span class="theme-pill-badge">${watch.categoryLabel}</span>
          <h3 id="modal-title">${watch.name}</h3>
          <div class="modal-price">${watch.price}</div>
        </div>
      </div>
      <p style="font-size: 0.95rem; line-height: 1.6; color: var(--theme-text-primary); margin-bottom: 16px;">
        ${watch.description}
      </p>
      <ul class="modal-spec-list">
        ${specRowsHtml}
      </ul>
      <div style="display: flex; gap: 12px; margin-top: 20px;">
        <a href="product.html?id=${watch.id}" class="btn btn-primary" style="flex: 1; text-align: center;">Open Dedicated Page &rarr;</a>
        <button class="btn btn-outline" onclick="closeThemedModal()">Close</button>
      </div>
    `;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  window.closeThemedModal = function() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener("click", window.closeThemedModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) window.closeThemedModal();
    });
  }

  // ==========================================================================
  // 5. Card Listeners Attachment
  // ==========================================================================
  function attachCardListeners() {
    document.querySelectorAll(".view-modal-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        openThemedModal(id);
      });
    });

    document.querySelectorAll(".zoomable-image").forEach(el => {
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        const src = el.getAttribute("data-src") || el.src;
        const alt = el.getAttribute("data-alt") || el.alt || "RAADO WATCH";
        openImageLightbox(src, alt);
      });
    });
  }

  // ==========================================================================
  // 6. Full-Screen Image Lightbox
  // ==========================================================================
  const imageLightbox = document.getElementById("image-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxCloseBtn = document.getElementById("lightbox-close-btn");

  window.openImageLightbox = function(src, altText) {
    if (!imageLightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = altText;
    if (lightboxCaption) lightboxCaption.textContent = altText;
    imageLightbox.classList.add("is-open");
    imageLightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  window.closeImageLightbox = function() {
    if (!imageLightbox) return;
    imageLightbox.classList.remove("is-open");
    imageLightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  if (lightboxCloseBtn) lightboxCloseBtn.addEventListener("click", window.closeImageLightbox);
  if (imageLightbox) {
    imageLightbox.addEventListener("click", (e) => {
      if (e.target === imageLightbox) window.closeImageLightbox();
    });
  }

  // Keyboard accessibility: Escape closes any open modal/lightbox
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (imageLightbox && imageLightbox.classList.contains("is-open")) {
        window.closeImageLightbox();
      } else if (modal && modal.classList.contains("is-open")) {
        window.closeThemedModal();
      }
    }
  });

  // ==========================================================================
  // 7. Mobile Navigation Menu Toggle
  // ==========================================================================
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-active");
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-active");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ==========================================================================
  // 8. Honest Customer Concierge Inquiry Handling (No False Purchases)
  // ==========================================================================
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("contact-name").value.trim();
      const emailInput = document.getElementById("contact-email").value.trim();
      const messageInput = document.getElementById("contact-message").value.trim();

      if (!nameInput || !emailInput || !messageInput) {
        formStatus.textContent = "Please provide your name, email, and inquiry.";
        formStatus.style.color = "#dc2626";
        return;
      }

      // Step 6 requirement: Do not simulate a purchase; state honest demonstration reception
      formStatus.style.color = "var(--theme-accent)";
      formStatus.textContent = `Thank you, ${nameInput}. Your inquiry regarding "${messageInput.slice(0, 30)}..." has been received. (Demonstration Notice: RAADO WATCH is an educational brand; no financial transactions or physical shipments are conducted).`;
      contactForm.reset();

      setTimeout(() => {
        formStatus.textContent = "";
      }, 8000);
    });
  }
});
