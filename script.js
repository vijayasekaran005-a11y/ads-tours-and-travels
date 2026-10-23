
/* ============================================
   ADS HOLIDAYS — COMPLETE SCRIPT.JS
   Booking + Navigation + Scroll Animations
============================================ */

(() => {
  "use strict";

  const WHATSAPP_NUMBER = "919345587325";

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  // ---------- TOAST NOTIFICATIONS ----------

  let toastTimer;

  function showToast(message) {
    const toast = $("#toast");

    if (!toast) {
      console.log(message);
      return;
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  // ---------- WHATSAPP ----------

  function openWhatsApp(message) {
    if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
      showToast("Please configure the WhatsApp number.");
      return;
    }

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  // ---------- MOBILE NAVIGATION ----------

  function initNavigation() {
    const toggle = $("#menuToggle");
    const menu = $("#navMenu");

    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        const opened = menu.classList.toggle("open");

        toggle.setAttribute("aria-expanded", String(opened));
        toggle.textContent = opened ? "×" : "☰";
      });

      $$("a", menu).forEach((link) => {
        link.addEventListener("click", () => {
          menu.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.textContent = "☰";
        });
      });
    }

    // Sticky navbar elevation
    const navbars = $$("nav, .navbar");

    function updateNavbar() {
      navbars.forEach((navbar) => {
        navbar.classList.toggle(
          "nav-scrolled",
          window.scrollY > 30
        );
      });
    }

    window.addEventListener("scroll", updateNavbar, {
      passive: true
    });

    updateNavbar();
  }

  // ---------- SCROLL REVEAL ANIMATIONS ----------

  function initScrollAnimations() {
    const selectors = [
      ".destination-card",
      ".package-card",
      ".villa-card",
      ".feature-card",
      ".image-card",
      ".section-heading",
      ".destination",
      ".package",
      ".villa",
      "section h2",
      "section h3",
      "section p",
      "section .btn",
      "section .button"
    ].join(",");

    const elements = $$(selectors);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Avoid invisible content if animations aren't supported.
    if (
      reduceMotion ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach((element) => {
        element.classList.add("visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            // Remove this block if you want elements to stay
            // visible after the first time they appear.
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    elements.forEach((element, index) => {
      // Do not hide hero content or form controls.
      if (
        element.closest(".hero") ||
        element.closest("form") ||
        element.closest("footer")
      ) {
        return;
      }

      if (element.dataset.revealReady === "true") return;

      element.dataset.revealReady = "true";
      element.classList.add("reveal");

      // Small staggered elevation effect.
      element.style.transitionDelay =
        `${(index % 4) * 90}ms`;

      observer.observe(element);
    });
  }

  // ---------- SMOOTH SECTION NAVIGATION ----------

  function initSmoothScrolling() {
    $$('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");

        if (!href || href === "#") return;

        const target = $(href);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      });
    });
  }

  // ---------- DESTINATION SELECTION ----------

  function initDestinations() {
    $$(".choose-destination").forEach((button) => {
      button.addEventListener("click", () => {
        const destination = button.dataset.destination;
        const select = $("#destination");

        if (select && destination) {
          select.value = destination;
        }

        $("#planner")?.scrollIntoView({
          behavior: "smooth"
        });
      });
    });

    $$(".package-select").forEach((button) => {
      button.addEventListener("click", () => {
        const packageSelect = $("#tripPackage");

        if (packageSelect) {
          packageSelect.value =
            button.dataset.package || "Customized Trip";
        }

        $("#planner")?.scrollIntoView({
          behavior: "smooth"
        });
      });
    });

    $$(".room-select").forEach((button) => {
      button.addEventListener("click", () => {
        const room = button.dataset.room || "";
        const stay = $("#stay");

        if (stay) {
          const option = [...stay.options].find((item) =>
            item.text.toLowerCase().includes(room.toLowerCase())
          );

          if (option) stay.value = option.value;
        }

        $("#planner")?.scrollIntoView({
          behavior: "smooth"
        });

        showToast("Stay preference selected!");
      });
    });
  }

  // ---------- TRAVEL DATE VALIDATION ----------

  function initDates() {
    const start = $("#startDate");
    const end = $("#endDate");

    if (!start || !end) return;

    const now = new Date();

    const today = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0")
    ].join("-");

    start.min = today;
    end.min = today;

    start.addEventListener("change", () => {
      end.min = start.value || today;

      if (
        start.value &&
        end.value &&
        end.value < start.value
      ) {
        end.value = "";
        showToast("Please select a valid return date.");
      }
    });
  }

  // ---------- GUEST MANAGEMENT ----------

  function initGuestManagement() {
    const guestList = $("#guestList");
    const addButton = $("#addGuest");

    if (!guestList || !addButton) return;

    let guests = [{ name: "", age: "" }];

    function updateSummary() {
      const adults = guests.filter(
        (guest) =>
          guest.age !== "" &&
          Number(guest.age) >= 12
      ).length;

      const children = guests.filter(
        (guest) =>
          guest.age !== "" &&
          Number(guest.age) < 12
      ).length;

      if ($("#guestCount")) {
        $("#guestCount").textContent = guests.length;
      }

      if ($("#adultCount")) {
        $("#adultCount").textContent = adults;
      }

      if ($("#childCount")) {
        $("#childCount").textContent = children;
      }

      const foodBudget = Number($("#foodBudget")?.value) || 0;

      if ($("#foodEstimate")) {
        $("#foodEstimate").textContent =
          "₹" + (foodBudget * guests.length).toLocaleString("en-IN");
      }
    }

    function renderGuests() {
      guestList.replaceChildren();

      guests.forEach((guest, index) => {
        const row = document.createElement("div");
        row.className = "guest-row";

        const name = document.createElement("input");
        name.type = "text";
        name.placeholder = `Guest ${index + 1} name`;
        name.value = guest.name;
        name.required = true;
        name.maxLength = 80;
        name.setAttribute("aria-label", `Guest ${index + 1} name`);

        name.addEventListener("input", () => {
          guests[index].name = name.value;
        });

        const age = document.createElement("input");
        age.type = "number";
        age.placeholder = "Age";
        age.min = "0";
        age.max = "120";
        age.step = "1";
        age.required = true;
        age.value = guest.age;
        age.setAttribute("aria-label", `Guest ${index + 1} age`);

        age.addEventListener("input", () => {
          guests[index].age = age.value;
          updateSummary();
        });

        row.append(name, age);

        if (guests.length > 1) {
          const remove = document.createElement("button");
          remove.type = "button";
          remove.className = "remove-guest";
          remove.textContent = "×";
          remove.setAttribute("aria-label", "Remove guest");

          remove.addEventListener("click", () => {
            guests.splice(index, 1);
            renderGuests();
          });

          row.appendChild(remove);
        }

        guestList.appendChild(row);
      });

      updateSummary();
    }

    addButton.addEventListener("click", () => {
      if (guests.length >= 30) {
        showToast("Maximum 30 guests allowed.");
        return;
      }

      guests.push({ name: "", age: "" });
      renderGuests();
    });

    $("#foodBudget")?.addEventListener("input", updateSummary);

    // Make guests accessible to the booking form.
    guestList.dataset.getGuests = "enabled";

    renderGuests();

    document.addEventListener("adsGetGuests", (event) => {
      event.detail.guests = guests.map((guest) => ({ ...guest }));
    });
  }

  // ---------- BOOKING FORM ----------

  function initBookingForm() {
    const form = $("#tripForm");

    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const value = (selector) =>
        $(selector)?.value?.trim() || "";

      const startDate = value("#startDate");
      const endDate = value("#endDate");

      if (!startDate || !endDate || endDate < startDate) {
        showToast("Please check your travel dates.");
        return;
      }

      const totalBudget = Number(value("#totalBudget"));

      if (!Number.isFinite(totalBudget) || totalBudget <= 0) {
        showToast("Enter a valid trip budget.");
        return;
      }

      const guestsEvent = new Event("adsGetGuests");
      guestsEvent.detail = { guests: [] };
      document.dispatchEvent(guestsEvent);

      const guests = guestsEvent.detail.guests;

      if (
        guests.length &&
        guests.some((guest) =>
          !guest.name.trim() ||
          guest.age === "" ||
          !Number.isInteger(Number(guest.age)) ||
          Number(guest.age) < 0 ||
          Number(guest.age) > 120
        )
      ) {
        showToast("Please enter valid details for every guest.");
        return;
      }

      const guestDetails = guests.map((guest, index) =>
        `${index + 1}. ${guest.name} — Age ${guest.age}`
      );

      const services = [
        ["#pickupDrop", "Pickup & drop"],
        ["#guide", "Local guide"],
        ["#breakfast", "Breakfast"],
        ["#lunch", "Lunch"],
        ["#dinner", "Dinner"]
      ]
        .filter(([selector]) => $(selector)?.checked)
        .map(([, name]) => name);

      const message = [
        "🌿 *ADS HOLIDAYS — TRIP ENQUIRY*",
        "",
        `Name: ${value("#customerName")}`,
        `Phone: ${value("#customerPhone")}`,
        `Destination: ${value("#destination")}`,
        `Package: ${value("#tripPackage")}`,
        `Start date: ${startDate}`,
        `Return date: ${endDate}`,
        `Stay: ${value("#stay")}`,
        `Pickup location: ${value("#pickup") || "Not specified"}`,
        "",
        `Guests: ${guests.length || value("#guestCount") || "Not specified"}`,
        ...(guestDetails.length
          ? ["", "*Guest details:*", ...guestDetails]
          : []),
        "",
        `Services: ${services.join(", ") || "None selected"}`,
        `Food budget per guest: ₹${Number(value("#foodBudget") || 0)}`,
        `Total budget: ₹${totalBudget.toLocaleString("en-IN")}`,
        `Special requests: ${value("#notes") || "None"}`,
        "",
        "Please share availability and the final package price. Thank you!"
      ].join("\n");

      openWhatsApp(message);
    });
  }

  // ---------- CONTACT BUTTON ----------

  function initContact() {
    $("#contactWhatsApp")?.addEventListener("click", () => {
      openWhatsApp(
        "Hi ADS Holidays! I would like to know about your Kodaikanal, Yercaud, Ooty and Munnar tour packages."
      );
    });
  }

  // ---------- FOOTER YEAR ----------

  function initFooter() {
    const year = $("#year");

    if (year) {
      year.textContent = new Date().getFullYear();
    }
  }

  // ---------- INITIALIZE EVERYTHING ----------

  function init() {
    initNavigation();
    initScrollAnimations();
    initSmoothScrolling();
    initDestinations();
    initDates();
    initGuestManagement();
    initBookingForm();
    initContact();
    initFooter();

    console.info("ADS Holidays: All features initialized.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {
      once: true
    });
  } else {
    init();
  }
})();

/* ===== SCROLL ANIMATION ENGINE ===== */

(() => {
  function startAnimations() {
    const selectors = [
      "section h1",
      "section h2",
      "section h3",
      "section p",
      "section img",
      "section .btn",
      "section .button",
      ".destination-card",
      ".package-card",
      ".villa-card",
      ".feature-card",
      ".image-card",
      ".section-heading",
      "section article"
    ];

    const elements = document.querySelectorAll(
      selectors.join(",")
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("show"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    elements.forEach((el, index) => {
      if (el.dataset.animationReady) return;

      el.dataset.animationReady = "true";

      const animationTypes = [
        "reveal-up",
        "reveal-zoom",
        "reveal-left",
        "reveal-right"
      ];

      el.classList.add(
        animationTypes[index % animationTypes.length]
      );

      el.style.transitionDelay =
        `${(index % 4) * 100}ms`;

      observer.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      startAnimations,
      { once: true }
    );
  } else {
    startAnimations();
  }
})();
