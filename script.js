/**
 * Great Ekky's Touch LTD — Interactive Scripts
 * Vanilla JS • Accessible • Performant
 */

(function () {
  "use strict";

  // ---------- Preloader ----------
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("hide");
      setTimeout(() => preloader.remove(), 700);
    }, 600);
  });

  // ---------- Header scroll ----------
  const header = document.getElementById("header");
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- Mobile menu ----------
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  // Close menu on link click
  mainNav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // ---------- Active nav link on scroll ----------
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const setActiveLink = () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  };
  window.addEventListener("scroll", setActiveLink, { passive: true });

  // ---------- Car filter ----------
  const filterBtns = document.querySelectorAll(".filter-btn");
  const carCards = document.querySelectorAll(".car-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      const filter = btn.dataset.filter;

      carCards.forEach((card) => {
        const categories = card.dataset.category || "";
        if (filter === "all" || categories.includes(filter)) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });
    });
  });

  // ---------- Inquiry Modal ----------
  const modal = document.getElementById("inquireModal");
  const modalVehicle = document.getElementById("modalVehicle");
  const modalWhatsApp = document.getElementById("modalWhatsApp");
  const inquireBtns = document.querySelectorAll(".inquire-btn");

  const openModal = (vehicleName) => {
    modalVehicle.textContent = vehicleName;
    const msg = encodeURIComponent(
      `Hello Ekky's Luxury Cars, I am interested in the ${vehicleName}. Please share more details and availability.`
    );
    modalWhatsApp.href = `https://wa.me/2348136661266?text=${msg}`;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = "";
  };

  inquireBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal(btn.dataset.vehicle);
    });
  });

  modal.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  // ---------- Contact Form ----------
  const form = document.getElementById("contactForm");
  const toast = document.getElementById("toast");

  const showToast = (message) => {
    toast.textContent = message;
    toast.hidden = false;
    requestAnimationFrame(() => toast.classList.add("show"));
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => (toast.hidden = true), 300);
    }, 3200);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const interest = form.interest.value;
    const message = form.message.value.trim();

    if (!name || !phone || !interest) {
      showToast("Please fill in all required fields.");
      return;
    }

    const interestLabels = {
      "car-rent": "Car Rental",
      "car-buy": "Buying a Car",
      fashion: "Native Wear / Fashion",
      corporate: "Corporate Package",
      other: "Other inquiry",
    };

    const text = encodeURIComponent(
      `Hello Ekky's Touch LTD,\n\nName: ${name}\nPhone: ${phone}\nInterest: ${interestLabels[interest] || interest}\n\nMessage: ${message || "—"}`
    );

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/2348136661266?text=${text}`, "_blank");
    showToast("Opening WhatsApp… We’ll reply shortly.");
    form.reset();
  });

  // ---------- Year ----------
  document.getElementById("year").textContent = new Date().getFullYear();

  // ---------- Smooth reveal on scroll (lightweight) ----------
  const revealEls = document.querySelectorAll(
    ".car-card, .brand-card, .service-card, .fashion-card, .about-text, .fashion-feature"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    revealObserver.observe(el);
  });
})();
