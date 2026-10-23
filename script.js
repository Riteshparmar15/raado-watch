/**
 * RAADO WATCH — Dynamic Watch Catalogue & Theme Controller
 * 
 * Step 2 & Step 3 Implementation:
 * - Dynamic 5-watch catalogue rendering from products-data.js
 * - Real-time category filtering (All, Heritage, Chronograph, Minimal, Luxury, Diver)
 * - Themed modal preview & deep-link navigation to product.html?id=...
 * - Image lightbox & contact inquiry handling
 */

document.addEventListener("DOMContentLoaded", () => {
  const catalog = window.WATCH_CATALOG || {};
  const productGrid = document.getElementById("product-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");

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

    filtered.forEach(watch => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.setAttribute("data-theme", watch.theme);
      card.setAttribute("id", `card-${watch.id}`);

      card.innerHTML = `
        <div class="product-image-container zoomable-image" data-src="${watch.primaryImage}" data-alt="${watch.name}">
          <img src="${watch.primaryImage}" alt="${watch.name}" class="product-image" loading="lazy">
          <span class="product-tag">${watch.categoryLabel}</span>
        </div>
        <div class="product-info">
          <span class="product-category-tag">${watch.subtitle}</span>
          <h3 class="product-name">${watch.name}</h3>
          <p class="product-snippet">${watch.tagline}</p>
          <div class="product-bottom">
            <span class="product-price">${watch.price}</span>
            <div class="product-actions-wrap">
              <button class="btn btn-small view-modal-btn" data-id="${watch.id}">Quick View</button>
              <a href="product.html?id=${watch.id}" class="btn btn-small btn-primary">Page &rarr;</a>
            </div>
          </div>
        </div>
      `;

      productGrid.appendChild(card);
    });

    // Reattach listeners to newly created card elements
    attachCardListeners();
  }

  // ==========================================================================
  // 2. Category Filter Handler
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
  // 3. Themed Product Modal
  // ==========================================================================
  const modal = document.getElementById("product-modal");
  const modalBody = document.getElementById("modal-body");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  function openThemedModal(watchId) {
    const watch = catalog[watchId];
    if (!watch || !modal || !modalBody) return;

    // Apply the watch's specific theme to the modal dialog
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

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", window.closeThemedModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) window.closeThemedModal();
    });
  }

  // ==========================================================================
  // 4. Card Event Listeners
  // ==========================================================================
  function attachCardListeners() {
    // Quick View Buttons
    document.querySelectorAll(".view-modal-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        openThemedModal(id);
      });
    });

    // Zoomable Image Lightbox
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
  // 5. Full-Screen Image Lightbox
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

  // Close modals on Escape key
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
  // 6. Mobile Navigation Menu Toggle
  // ==========================================================================
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const navLinks = document.getElementById("nav-links");

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
  // 7. Demo Contact Form Submission
  // ==========================================================================
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("contact-name").value.trim();
      if (!nameInput) return;

      formStatus.textContent = `Thank you, ${nameInput}! (Demo note: Inquiries are simulated for the RAADO WATCH learning project).`;
      contactForm.reset();

      setTimeout(() => {
        formStatus.textContent = "";
      }, 6000);
    });
  }
});
