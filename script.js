
"use strict";

// Replace this with your business WhatsApp number.
// Include country code, digits only. Example: 919876543210
const WHATSAPP_NUMBER = "919345587325";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const bookingForm = document.getElementById("bookingForm");
  const dateField = document.getElementById("date");
  const message = document.getElementById("message");

  // Current year in the footer.
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Prevent choosing a date in the past.
  if (dateField) {
    const now = new Date();
    const localToday = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0")
    ].join("-");

    dateField.min = localToday;
  }

  // Mobile navigation open and close.
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
        menuToggle.textContent = "☰";
      });
    });
  }

  // Fill destination and/or package when a visitor clicks a card.
  document.querySelectorAll(".choose-destination").forEach(button => {
    button.addEventListener("click", () => {
      const destination = button.dataset.destination;
      const destinationField = document.getElementById("destination");

      if (destinationField && destination) {
        destinationField.value = destination;
      }

      document.getElementById("booking")?.scrollIntoView({
        behavior: "smooth"
      });
    });
  });

  document.querySelectorAll(".choose-package").forEach(button => {
    button.addEventListener("click", () => {
      const destination = button.dataset.destination;
      const packageName = button.dataset.package;
      const destinationField = document.getElementById("destination");
      const packageField = document.getElementById("package");

      if (destination && destinationField) {
        destinationField.value = destination;
      }

      if (packageName && packageField) {
        const matchingOption = Array.from(packageField.options).find(
          option => option.value === packageName ||
                    option.textContent.trim() === packageName
        );

        if (matchingOption) {
          packageField.value = matchingOption.value;
        } else {
          // Map package card labels to available form choices.
          const lower = packageName.toLowerCase();

          if (lower.includes("kodaikanal")) {
            packageField.value = "Kodaikanal Highlights";
          } else if (lower.includes("yercaud")) {
            packageField.value = "Yercaud Nature Break";
          } else if (lower.includes("villa") || lower.includes("room")) {
            packageField.value = "Room / villa only";
          } else if (lower.includes("pickup")) {
            packageField.value = "Stay + pickup / drop";
          } else {
            packageField.value = "Custom trip plan";
          }
        }
      }

      document.getElementById("booking")?.scrollIntoView({
        behavior: "smooth"
      });
    });
  });

  // Animate content when it enters the viewport.
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(element => observer.observe(element));
  } else {
    revealElements.forEach(element => {
      element.classList.add("is-visible");
    });
  }

  // Build a booking enquiry and open WhatsApp.
  if (bookingForm) {
    bookingForm.addEventListener("submit", event => {
      event.preventDefault();

      if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
        message.textContent =
          "Please update the business WhatsApp number in script.js.";
        return;
      }

      if (!bookingForm.reportValidity()) {
        return;
      }

      const formData = new FormData(bookingForm);
      const customerPhone = String(formData.get("phone") || "").trim();

      if (!/^\+?[\d\s()-]{10,18}$/.test(customerPhone)) {
        message.textContent = "Please enter a valid mobile number.";
        return;
      }

      const enquiryLines = [
        "Hi ADS Tours & Travels! I'd like to enquire about a trip.",
        "",
        "Name: " + formData.get("name"),
        "Mobile: " + formData.get("phone"),
        "Destination: " + formData.get("destination"),
        "Travel date: " + formData.get("date"),
        "Group size: " + formData.get("guests"),
        "Trip duration: " + formData.get("duration"),
        "Requirement: " + formData.get("package"),
        formData.get("notes")
          ? "Extra details: " + formData.get("notes")
          : "",
        "",
        "Please confirm availability and final pricing. This is an enquiry, not a confirmed booking."
      ];

      const whatsappURL =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(enquiryLines.filter(Boolean).join("\n"));

      message.textContent =
        "Opening WhatsApp. Review your enquiry and press Send to submit it.";

      const whatsappWindow = window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
      );

      // Some browsers block popups. Provide a fallback link.
      if (!whatsappWindow) {
        const fallback = document.createElement("a");
        fallback.href = whatsappURL;
        fallback.target = "_blank";
        fallback.rel = "noopener noreferrer";
        fallback.textContent = "Click here to open WhatsApp";
        fallback.className = "whatsapp-fallback";

        message.replaceChildren(
          document.createTextNode("Your enquiry is ready. "),
          fallback
        );
      }
    });
  }
});

