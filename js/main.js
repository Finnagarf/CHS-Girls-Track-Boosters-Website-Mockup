
// ---- Site configuration: edit these values to update links everywhere ----
const siteConfig = {
  donationUrl: "https://www.zeffy.com/en-US/donation-form/support-champaign-central-girls-track-boosters",
  volunteerFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLScpR81TnREv1lL5aMesUHCvy4aRIfH2nR77Jy9UQkRagllvOw/viewform?embedded=true",
  email: "centralgirlstrackboosters@gmail.com",
  facebookUrl: "https://www.facebook.com/runningmaroons/",
  instagramUrl: "https://www.instagram.com/runningmaroons/",
};

// ---- Apply configuration to the page ----
document.querySelectorAll("[data-config-href]").forEach((el) => {
  const value = siteConfig[el.dataset.configHref];
  if (value) el.href = value;
});

document.querySelectorAll("[data-config-mailto]").forEach((el) => {
  el.href = "mailto:" + siteConfig[el.dataset.configMailto];
});

document.querySelectorAll("[data-config-text]").forEach((el) => {
  el.textContent = siteConfig[el.dataset.configText];
});

// ---- Mobile navigation toggle ----
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");

function setMenu(open) {
  siteNav.classList.toggle("is-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.querySelector(".nav-toggle-label").textContent = open ? "Close" : "Menu";
}

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  setMenu(!isOpen);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
    navToggle.focus();
  }
});

// ---- Wishlist total (only runs on pages that have wishlist cards) ----
const wishlistCards = document.querySelectorAll("[data-cost]");
const wishlistTotal = document.querySelector("#wishlist-total");
const wishlistProgress = document.querySelector("#wishlist-progress");

if (wishlistCards.length > 0 && wishlistTotal) {
  let total = 0;
  wishlistCards.forEach((card) => {
    total += Number(card.dataset.cost);
  });

  wishlistTotal.textContent = "$" + total.toLocaleString("en-US");
  if (wishlistProgress) wishlistProgress.max = total;
}

// ---- Volunteer form embed (only runs on pages that have it) ----
const volunteerFrame = document.querySelector("#volunteer-frame");
const formPlaceholder = document.querySelector("#form-placeholder");

if (volunteerFrame && formPlaceholder && siteConfig.volunteerFormUrl !== "#") {
  volunteerFrame.src = siteConfig.volunteerFormUrl;
  volunteerFrame.hidden = false;
  formPlaceholder.hidden = true;
}
