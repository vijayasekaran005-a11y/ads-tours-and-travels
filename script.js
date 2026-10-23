/*
  ADS HOLIDAYS — Complete JavaScript
  Features:
  - WhatsApp trip booking
  - Guest management
  - Date validation
  - Food budget calculator
  - Destination and package selection
  - Mobile navigation
  - Scroll reveal animations
*/

(() => {
  "use strict";

  const WHATSAPP_NUMBER = "919345587325";

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];

  function init() {
    const guestList = $("#guestList");
    const tripForm = $("#tripForm");
    const toast = $("#toast");

    if (!guestList || !tripForm || !toast) {
      console.error("ADS Holidays: Required HTML elements are missing.");
      return;
    }

    let guests = [{ name: "", age: "" }];
    let toastTimer;

    function showToast(message) {
      toast.textContent = message;
      toast.classList.add("show");

      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove("show");
      }, 2800);
    }

    function formatCurrency(amount) {
      return "₹" + Math.round(amount).toLocaleString("en-IN");
    }

    function updateFoodEstimate() {
      const budget = $("#foodBudget");
      const estimate = $("#foodEstimate");

      if (!budget || !estimate) return;

      estimate.textContent = formatCurrency(
        Math.max(0, Number(budget.value) || 0) * guests.length
      );
    }

    function updateGuestSummary() {
      let adults = 0;
      let children = 0;

      guests.forEach((guest) => {
        if (guest.age === "") return;

        const age = Number(guest.age);

        if (!Number.isInteger(age) || age < 0 || age > 120) return;

        if (age >= 12) adults++;
        else children++;
      });

      if ($("#adultCount")) $("#adultCount").textContent = adults;
      if ($("#childCount")) $("#childCount").textContent = children;
      if ($("#guestCount")) $("#guestCount").textContent = guests.length;

      updateFoodEstimate();
    }

    function updateGuestList() {
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

        name.addEventListener("input", () => {
          guests[index].name = name.value;
        });

        const age = document.createElement("input");
        age.type = "number";
        age.placeholder = "Age";
        age.min = "0";
        age.max = "120";
        age.step = "1";
        age.value = guest.age;
        age.required = true;

        age.addEventListener("input", () => {
          guests[index].age = age.value;
          updateGuestSummary();
        });

        row.append(name, age);

        if (guests.length > 1) {
          const remove = document.createElement("button");
          remove.type = "button";
          remove.className = "remove-guest";
          remove.textContent = "×";

          remove.addEventListener("click", () => {
            guests.splice(index, 1);
            updateGuestList();
          });

          row.appendChild(remove);
        }

        guestList.appendChild(row);
      });

      updateGuestSummary();
    }

    function setMinimumDates() {
      const start = $("#startDate");
      const end = $("#endDate");

      if (!start || !end) return;

      const today = new Date();
      const localToday = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
      ].join("-");

      start.min = localToday;
      end.min = localToday;
    }

    function openWhatsApp(message) {
      if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
        showToast("Please check the WhatsApp number in script.js.");
        return;
      }

      const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

      window.open(url, "_blank", "noopener,noreferrer");
    }

    function selectDestination(destination) {
      const select = $("#destination");

      if (select) select.value = destination;

      $("#planner")?.scrollIntoView({ behavior: "smooth" });
    }

    // Add guest
    $("#addGuest")?.addEventListener("click", () => {
      if (guests.length >= 30) {
        showToast("You can add up to 30 guests.");
        return;
      }

      guests.push({ name: "", age: "" });
      updateGuestList();
    });

    // Food budget
    $("#foodBudget")?.addEventListener("input", updateFoodEstimate);

    // Validate travel dates
    $("#startDate")?.addEventListener("change", () => {
      const start = $("#startDate");
      const end = $("#endDate");

      if (!start || !end) return;

      end.min = start.value || start.min;

      if (start.value && end.value && end.value < start.value) {
        end.value = "";
        showToast("Choose a return date on or after your start date.");
      }
    });

    // Destination buttons
    $$(".choose-destination").forEach((button) => {
      button.addEventListener("click", () => {
        selectDestination(button.dataset.destination);
      });
    });

    // Package selection
    $$(".package-select").forEach((button) => {
      button.addEventListener("click", () => {
        const packageSelect = $("#tripPackage");

        if (packageSelect) {
          packageSelect.value =
            button.dataset.package || "Customized Trip";
        }

        $("#planner")?.scrollIntoView({ behavior: "smooth" });
      });
    });

    // Villa selection
    $$(".room-select").forEach((button) => {
      button.addEventListener("click", () => {
        const room = button.dataset.room || "";

        if ($("#destination")) {
          $("#destination").value = "Yercaud";
        }

        const stay = $("#stay");

        if (stay) {
          const option = [...stay.options].find((item) =>
            item.text.toLowerCase().includes(room.toLowerCase())
          );

          stay.value = option ? option.value : "Need recommendations";
        }

        $("#planner")?.scrollIntoView({ behavior: "smooth" });
        showToast(`${room} selected. Add your trip details below.`);
      });
    });

    // WhatsApp contact
    $("#contactWhatsApp")?.addEventListener("click", () => {
      openWhatsApp(
        "Hi ADS Holidays! 👋\nI'd like to know more about your holiday packages and villa stays."
      );
    });

    // Submit trip enquiry
    tripForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!tripForm.reportValidity()) return;

      const invalidGuest = guests.find((guest) => {
        const age = Number(guest.age);

        return (
          !guest.name.trim() ||
          guest.age === "" ||
          !Number.isInteger(age) ||
          age < 0 ||
          age > 120
        );
      });

      if (!guests.length || invalidGuest) {
        showToast("Enter each guest's name and a valid age.");
        return;
      }

      const startDate = $("#startDate").value;
      const endDate = $("#endDate").value;

      if (!startDate || !endDate || endDate < startDate) {
        showToast("Return date must be on or after your start date.");
        return;
      }

      const totalBudget = Number($("#totalBudget").value);

      if (!Number.isFinite(totalBudget) || totalBudget <= 0) {
        showToast("Enter a valid total trip budget.");
        return;
      }

      const adults = guests.filter(
        (guest) => Number(guest.age) >= 12
      ).length;

      const children = guests.length - adults;

      const foodPerGuest = Math.max(
        0,
        Number($("#foodBudget").value) || 0
      );

      const foodTotal = foodPerGuest * guests.length;
      const services = [];

      if ($("#pickupDrop")?.checked) services.push("Pickup & drop");
      if ($("#guide")?.checked) services.push("Local guide");
      if ($("#breakfast")?.checked) services.push("Breakfast");
      if ($("#lunch")?.checked) services.push("Lunch");
      if ($("#dinner")?.checked) services.push("Dinner");

      const guestDetails = guests.map((guest, index) => {
        const age = Number(guest.age);
        const category = age >= 12 ? "Adult" : "Child";

        return `${index + 1}. ${guest.name.trim()} — Age ${age} (${category})`;
      });

      const value = (selector) =>
        $(selector)?.value?.trim() || "";

      const message = [
        "🌿 *NEW TRIP ENQUIRY — ADS HOLIDAYS*",
        "",
        `👤 *Name:* ${value("#customerName")}`,
        `📱 *Contact:* ${value("#customerPhone")}`,
        `📍 *Destination:* ${value("#destination")}`,
        `🧳 *Trip type:* ${value("#tripPackage")}`,
        `📅 *Start date:* ${startDate}`,
        `📅 *Return date:* ${endDate}`,
        `🏡 *Stay preference:* ${value("#stay")}`,
        `🚘 *Pickup location:* ${value("#pickup") || "Not specified"}`,
        "",
        `👥 *Guests:* ${guests.length}`,
        `🧑 *Adults (12+):* ${adults}`,
        `🧒 *Children (under 12):* ${children}`,
        "",
        "*Guest details:*",
        ...guestDetails,
        "",
        "*Requested services:*",
        ...(services.length
          ? services.map((service) => `• ${service}`)
          : ["• No additional services selected"]),
        "",
        `🍽️ *Food budget per guest:* ${formatCurrency(foodPerGuest)}`,
        `🍽️ *Estimated food budget total:* ${formatCurrency(foodTotal)}`,
        `💰 *Total trip budget:* ${formatCurrency(totalBudget)}`,
        "",
        `📝 *Special requests:* ${value("#notes") || "None"}`,
        "",
        "Please share availability, package inclusions and the final price. Thank you!"
      ].join("\n");

      openWhatsApp(message);
    });

    // Mobile navigation
    const menuToggle = $("#menuToggle");
    const navMenu = $("#navMenu");

    menuToggle?.addEventListener("click", () => {
      if (!navMenu) return;

      const isOpen = navMenu.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "×" : "☰";
    });

    $$("#navMenu a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu?.classList.remove("open");

        if (menuToggle) {
          menuToggle.textContent = "☰";
          menuToggle.setAttribute("aria-expanded", "false");
        }
      });
    });

    if ($("#year")) {
      $("#year").textContent = new Date().getFullYear();
    }

    setMinimumDates();
    updateGuestList();

    console.info("ADS Holidays: script.js loaded successfully.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();

// ========================================
// DYNAMIC SCROLL ANIMATIONS
// ========================================

(() => {
  "use strict";

  function initScrollEffects() {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const selectors = [
      "main section h1",
      "main section h2",
      "main section h3",
      "main section p",
      "main section .btn",
      "main section .button",
      ".destination-card",
      ".package-card",
      ".villa-card",
      ".tour-card",
      ".feature-card",
      ".destination",
      ".package",
      ".villa",
      ".section-heading",
      ".section-title"
    ];

    const elements = document.querySelectorAll(selectors.join(", "));

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            } else {
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
        if (element.dataset.revealReady) return;
        if (element.closest(".hero")) return;

        element.dataset.revealReady = "true";

        if (element.closest("nav, header, footer, form")) return;

        if (element.matches("img")) {
          element.classList.add("reveal-scale");
        } else {
          element.classList.add("reveal");
        }

        element.style.transitionDelay = `${(index % 4) * 80}ms`;
        observer.observe(element);
      });
    }

    // Navbar shadow on scroll
    const navElements = document.querySelectorAll("nav, .navbar");

    function updateNavbar() {
      navElements.forEach((nav) => {
        nav.classList.toggle("nav-scrolled", window.scrollY > 25);
      });
    }

    window.addEventListener("scroll", updateNavbar, { passive: true });
    updateNavbar();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    console.info("ADS Holidays: scroll effects loaded.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScrollEffects, {
      once: true
    });
  } else {
    initScrollEffects();
  }
})();
