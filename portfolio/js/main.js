/* Portfolio interactions — no dependencies */
(function () {
  "use strict";

  // --- Mobile nav toggle ---
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // close the menu when a link is tapped (mobile)
    nav.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // --- Reveal on scroll ---
  var revealers = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealers.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealers.forEach(function (el) { io.observe(el); });
  } else {
    revealers.forEach(function (el) { el.classList.add("in"); });
  }

  // --- Current year in footer ---
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
