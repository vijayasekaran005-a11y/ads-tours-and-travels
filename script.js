
/* ==========================================
   ADS HOLIDAYS — PREMIUM TRAVEL WEBSITE
   Complete Responsive CSS
========================================== */

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');

:root {
  --primary: #174c3c;
  --primary-dark: #10372c;
  --accent: #d7ad68;
  --accent-light: #f4e7cf;
  --background: #faf9f5;
  --surface: #ffffff;
  --text: #202b26;
  --muted: #747e77;
  --border: #e7e9e3;
  --radius: 18px;
  --shadow: 0 12px 35px rgba(20, 50, 38, 0.09);
  --transition: 0.3s ease;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 90px;
}

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--background);
  color: var(--text);
  line-height: 1.7;
  overflow-x: hidden;
}

img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
select,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

button,
a,
input,
select,
textarea {
  -webkit-tap-highlight-color: transparent;
}

.container {
  width: min(1180px, 90%);
  margin-inline: auto;
}

section {
  padding: 85px 0;
}

h1,
h2,
h3,
h4 {
  font-family: 'Playfair Display', serif;
  line-height: 1.2;
}

h1 {
  font-size: clamp(2.5rem, 6vw, 5rem);
}

h2 {
  font-size: clamp(2rem, 4vw, 3.2rem);
}

h3 {
  font-size: 1.5rem;
}

p {
  color: var(--muted);
}

.section-heading {
  max-width: 720px;
  margin: 0 auto 42px;
  text-align: center;
}

.section-heading h2 {
  margin-bottom: 14px;
}

.section-heading p {
  max-width: 600px;
  margin-inline: auto;
}

.eyebrow {
  display: inline-block;
  color: var(--primary);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 14px;
}

/* NAVIGATION */

header {
  position: relative;
  z-index: 100;
}

nav,
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 18px 5%;
  background: rgba(250, 249, 245, 0.96);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(14px);
  transition: box-shadow var(--transition);
}

nav.nav-scrolled,
.navbar.nav-scrolled {
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
}

.logo,
.brand {
  font-family: 'Playfair Display', serif;
  color: var(--primary);
  font-size: 1.5rem;
  font-weight: 700;
  white-space: nowrap;
}

#navMenu,
.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
  list-style: none;
}

#navMenu a,
.nav-links a {
  font-size: 0.9rem;
  font-weight: 600;
  transition: color var(--transition);
}

#navMenu a:hover,
.nav-links a:hover {
  color: var(--accent);
}

#menuToggle {
  display: none;
  border: 0;
  background: transparent;
  color: var(--primary);
  font-size: 1.8rem;
}

/* BUTTONS */

.btn,
.button,
button.primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 13px 24px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: var(--primary);
  color: white;
  font-weight: 700;
  transition:
    transform var(--transition),
    background var(--transition),
    box-shadow var(--transition);
}

.btn:hover,
.button:hover,
button.primary:hover {
  transform: translateY(-3px);
  background: var(--primary-dark);
  box-shadow: 0 9px 22px rgba(23, 76, 60, 0.2);
}

.btn-outline {
  background: transparent;
  border-color: var(--primary);
  color: var(--primary);
}

.btn-outline:hover {
  background: var(--primary);
  color: white;
}

.btn-gold {
  background: var(--accent);
  color: #24231e;
}

.btn-gold:hover {
  background: #c49a55;
}

/* HERO SECTION */

.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: min(760px, 88vh);
  padding: 100px 0;
  overflow: hidden;
  color: white;
  background:
    linear-gradient(
      90deg,
      rgba(9, 31, 24, 0.82),
      rgba(9, 31, 24, 0.32)
    ),
    url('images/kodaikanal.jpeg') center 45% / cover no-repeat;
}

.hero h1,
.hero h2,
.hero h3,
.hero p {
  color: white;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 780px;
}

.hero .eyebrow {
  color: var(--accent-light);
}

.hero p {
  max-width: 620px;
  margin: 24px 0 30px;
  font-size: 1.05rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

/* DESTINATION CARDS */

.destination-grid,
.destinations-grid,
.package-grid,
.villa-grid,
.features-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}

.destination-card,
.package-card,
.villa-card,
.feature-card,
.destination,
.package,
.villa {
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: 0 5px 20px rgba(20, 50, 38, 0.035);
  transition:
    transform var(--transition),
    box-shadow var(--transition);
}

.destination-card:hover,
.package-card:hover,
.villa-card:hover,
.feature-card:hover,
.destination:hover,
.package:hover,
.villa:hover {
  transform: translateY(-7px);
  box-shadow: var(--shadow);
}

.destination-card img,
.destination img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  transition: transform 0.65s ease;
}

.destination-card:hover img,
.destination:hover img {
  transform: scale(1.06);
}

.card-content {
  padding: 22px;
}

.card-content h3 {
  margin-bottom: 9px;
}

.card-content p {
  margin-bottom: 16px;
  font-size: 0.92rem;
}

.destination-card .btn,
.destination-card .button {
  width: 100%;
}

/* PHOTO OVERLAY CARD */

.image-card {
  position: relative;
  min-height: 350px;
  overflow: hidden;
  border-radius: var(--radius);
  isolation: isolate;
}

.image-card img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.7s ease;
}

.image-card::after {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(
    0deg,
    rgba(5, 20, 14, 0.85),
    transparent 75%
  );
  content: '';
}

.image-card:hover img {
  transform: scale(1.07);
}

.image-card-content {
  position: absolute;
  z-index: 1;
  right: 22px;
  bottom: 22px;
  left: 22px;
  color: white;
}

.image-card-content h3,
.image-card-content p {
  color: white;
}

/* PACKAGES AND VILLAS */

.package-card img,
.villa-card img {
  height: 220px;
  object-fit: cover;
}

.price {
  display: block;
  margin: 12px 0;
  color: var(--primary);
  font-size: 1.3rem;
  font-weight: 700;
}

.price small {
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 400;
}

.card-content ul {
  margin: 15px 0;
  padding-left: 20px;
  color: var(--muted);
}

.card-content li {
  margin-bottom: 6px;
}

/* PLANNER AND BOOKING FORM */

.planner-section {
  background: #f0f3ed;
}

#planner {
  scroll-margin-top: 35px;
}

#tripForm,
.booking-form {
  max-width: 900px;
  margin-inline: auto;
  padding: clamp(20px, 4vw, 42px);
  border: 1px solid var(--border);
  border-radius: 24px;
  background: white;
  box-shadow: var(--shadow);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

label {
  font-size: 0.9rem;
  font-weight: 700;
}

input,
select,
textarea {
  width: 100%;
  min-height: 48px;
  padding: 12px 14px;
  border: 1px solid #dce2da;
  border-radius: 10px;
  outline: none;
  background: #fff;
  color: var(--text);
  transition:
    border-color var(--transition),
    box-shadow var(--transition);
}

input:focus,
select:focus,
textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(23, 76, 60, 0.1);
}

textarea {
  min-height: 120px;
  resize: vertical;
}

.checkbox-group {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
}

.checkbox-group input {
  width: 18px;
  min-height: 18px;
  accent-color: var(--primary);
}

#tripForm button[type="submit"],
.booking-form button[type="submit"] {
  width: 100%;
  margin-top: 25px;
}

.guest-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 100px 42px;
  gap: 10px;
  margin-bottom: 12px;
}

.remove-guest {
  min-height: 45px;
  border: 1px solid #efd2d2;
  border-radius: 10px;
  background: #fff3f3;
  color: #a22;
  font-size: 1.3rem;
}

#addGuest {
  margin: 10px 0 20px;
}

.budget-summary {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 15px;
  margin-top: 20px;
  padding: 18px;
  border-radius: 12px;
  background: var(--accent-light);
}

.budget-summary strong {
  color: var(--primary);
}

/* FEATURES */

.feature-card {
  padding: 28px;
}

.feature-icon {
  display: grid;
  width: 55px;
  height: 55px;
  place-items: center;
  margin-bottom: 20px;
  border-radius: 15px;
  background: var(--accent-light);
  color: var(--primary);
  font-size: 1.5rem;
}

.feature-card h3 {
  margin-bottom: 10px;
}

/* CONTACT AND FOOTER */

.contact-section {
  background: #eaf0e8;
}

.contact-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding: clamp(25px, 5vw, 55px);
  border-radius: 24px;
  background: white;
  box-shadow: var(--shadow);
}

footer {
  padding: 55px 0 25px;
  background: #112f25;
  color: white;
}

footer h2,
footer h3,
footer p,
footer a {
  color: white;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 40px;
}

.footer-links {
  display: grid;
  gap: 10px;
  list-style: none;
}

.footer-links a:hover {
  color: var(--accent);
}

.footer-bottom {
  margin-top: 35px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  text-align: center;
}

/* TOAST MESSAGE */

#toast {
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 999;
  max-width: min(380px, calc(100vw - 44px));
  padding: 15px 20px;
  border-radius: 12px;
  background: var(--primary-dark);
  color: white;
  box-shadow: var(--shadow);
  opacity: 0;
  pointer-events: none;
  transform: translateY(15px);
  transition: all var(--transition);
}

#toast.show {
  opacity: 1;
  transform: translateY(0);
}

/* SCROLL REVEAL ANIMATIONS */

.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-scale {
  opacity: 0;
  transform: scale(0.96);
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;
}

.reveal-scale.visible {
  opacity: 1;
  transform: scale(1);
}

/* IMAGE HOVER EFFECT */

.destination-card img,
.package-card img,
.villa-card img {
  will-change: transform;
}

/* ACCESSIBILITY */

:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .reveal,
  .reveal-scale {
    opacity: 1;
    transform: none;
  }
}

/* TABLET */

@media (max-width: 1000px) {
  .destination-grid,
  .destinations-grid,
  .package-grid,
  .villa-grid,
  .features-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  #navMenu,
  .nav-links {
    gap: 16px;
  }

  .hero {
    min-height: 620px;
  }
}

/* MOBILE */

@media (max-width: 700px) {
  section {
    padding: 60px 0;
  }

  nav,
  .navbar {
    flex-wrap: wrap;
    padding: 15px 5%;
  }

  #menuToggle {
    display: block;
  }

  #navMenu,
  .nav-links {
    display: none;
    flex-basis: 100%;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding-top: 12px;
  }

  #navMenu.open,
  .nav-links.open {
    display: flex;
  }

  #navMenu a,
  .nav-links a {
    display: block;
    padding: 12px 0;
  }

  .hero {
    min-height: 580px;
    padding: 70px 0;
    background-position: 58% center;
  }

  .hero p {
    font-size: 0.98rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .destination-grid,
  .destinations-grid,
  .package-grid,
  .villa-grid,
  .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .destination-card img,
  .destination img {
    height: 270px;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-group.full-width {
    grid-column: auto;
  }

  .checkbox-group {
    grid-template-columns: 1fr;
  }

  .guest-row {
    grid-template-columns: minmax(0, 1fr) 75px 38px;
    gap: 7px;
  }

  #tripForm,
  .booking-form {
    padding: 20px 15px;
  }

  .contact-panel {
    align-items: stretch;
    flex-direction: column;
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .image-card {
    min-height: 320px;
  }
}

/* SMALL PHONES */

@media (max-width: 380px) {
  .container {
    width: 92%;
  }

  .guest-row {
    grid-template-columns: minmax(0, 1fr) 65px 34px;
  }

  .btn,
  .button {
    padding: 12px 17px;
  }
}
