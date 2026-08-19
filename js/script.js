// ============================================
// Product data — extracted directly from client's
// poster content. Image fields left empty; the
// client will supply photos per category later.
// To add a photo, set `image: "assets/images/your-file.jpg"`
// on the matching product below.
// ============================================
const PRODUCT_DATA = [
  // CCTV Camera
  { category: "cctv-camera", categoryLabel: "CCTV Camera", name: "4G & 5G Camera", image: "assets/images/4g-cctv.jpg" },
  { category: "cctv-camera", categoryLabel: "CCTV Camera", name: "IP & HD Cameras", image: "assets/images/cctvs.jpg" },
  { category: "cctv-camera", categoryLabel: "CCTV Camera", name: "Solar Camera", image: "assets/images/solar-cctv.jpg" },
  { category: "cctv-camera", categoryLabel: "CCTV Camera", name: "NVR & DVR", image: "assets/images/nvr-dvr-cctv.jpg" },

  // Biometrics
  { category: "biometrics", categoryLabel: "Biometrics", name: "Fingerprint", image: "assets/images/biometric-scanner.jpg" },
  { category: "biometrics", categoryLabel: "Biometrics", name: "Face ID", image: "assets/images/face-door.jpg" },

  // Video Door Phone
  { category: "video-door-phone", categoryLabel: "Video Door Phone", name: "Analog System", image: "assets/images/intercom-doorbell.jpg" },
  { category: "video-door-phone", categoryLabel: "Video Door Phone", name: "IP System", image: "assets/images/ip-video-door-phone-systems.jpg" },

  // Intercom
  { category: "intercom", categoryLabel: "Intercom", name: "IP Intercom", image: "assets/images/ip-door.jpg" },
  { category: "intercom", categoryLabel: "Intercom", name: "Analog Intercom", image: "assets/images/Intercom-System-Types.jpg" },

  // Security System
  { category: "security-system", categoryLabel: "Security System", name: "Alarm", image: "assets/images/fire-alarm.jpg" },
  { category: "security-system", categoryLabel: "Security System", name: "Wired & Wireless", image: "assets/images/Fire-Alarm-System-PNG-Pic.png" },
  { category: "security-system", categoryLabel: "Security System", name: "Audio Paging System", image: "assets/images/sound-pacing.jpg" },

  // Automation
  { category: "automation", categoryLabel: "Automation", name: "Gate Automation", image: "assets/images/gate-automation-system.jpg" },
  { category: "automation", categoryLabel: "Automation", name: "Home Automation Switches", image: "assets/images/home-switch.jpg" },

  //Networking
  { category: "networking", categoryLabel: "Networking", name: "Networking", image: "assets/images/networking.jpg" },
];

const CAMERA_PLACEHOLDER_ICON = `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
    <rect x="2" y="7" width="14" height="10" rx="2"/>
    <path d="M16 10.5l5-2.5v8l-5-2.5"/>
    <circle cx="8" cy="12" r="2.4"/>
  </svg>`;

function renderProducts() {
  const grid = document.getElementById("productGrid");
  const frag = document.createDocumentFragment();

  PRODUCT_DATA.forEach((item) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.category = item.category;

    const mediaInner = item.image
      ? `<img src="${item.image}" alt="${item.name}">`
      : `${CAMERA_PLACEHOLDER_ICON}<span>Add photo:<br>${item.name}</span>`;

    card.innerHTML = `
      <div class="product-media">${mediaInner}</div>
      <div class="product-body">
        <span class="product-cat">${item.categoryLabel}</span>
        <h3 class="product-name">${item.name}</h3>
      </div>
    `;
    frag.appendChild(card);
  });

  grid.appendChild(frag);
}

function initFilters() {
  const bar = document.getElementById("filterBar");
  const buttons = Array.from(bar.querySelectorAll(".filter-btn"));
  const grid = document.getElementById("productGrid");

  bar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    buttons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const filter = btn.dataset.filter;
    const cards = grid.querySelectorAll(".product-card");

    cards.forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !match);
    });
  });
}

function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const header = document.getElementById("siteHeader");

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close mobile menu after tapping a link
  document.getElementById("navLinks").addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      header.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  initFilters();
  initNavToggle();

  // Intro Animation
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    const intro = document.getElementById("introScreen");
    intro.classList.add("hide");
    document.body.style.overflow = "auto";
  }, 2000);
});
