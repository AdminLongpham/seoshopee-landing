/* =========================================================
   main.js — khởi tạo chung
   - Render icon Lucide
   - Menu mobile (mở/đóng)
   - Header đổi nền khi cuộn (sticky glass)
   - Nút "lên đầu trang"
   Viết kiểu classic script (IIFE) để chạy được cả khi mở file://.
   ========================================================= */
(function () {
  "use strict";

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  onReady(function () {
    // 1) Icon Lucide
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }

    // 2) Menu mobile
    var navToggle = document.getElementById("nav-toggle");
    var mobileMenu = document.getElementById("mobile-menu");
    if (navToggle && mobileMenu) {
      navToggle.addEventListener("click", function () {
        mobileMenu.classList.toggle("hidden");
      });
      // Đóng menu khi bấm vào một liên kết
      mobileMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          mobileMenu.classList.add("hidden");
        });
      });
    }

    // 3) Header sticky + nút lên đầu trang
    var header = document.getElementById("site-header");
    var toTop = document.getElementById("to-top");

    function onScroll() {
      var y = window.scrollY || window.pageYOffset;
      if (header) header.classList.toggle("is-scrolled", y > 8);
      if (toTop) toTop.classList.toggle("is-visible", y > 500);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (toTop) {
      toTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  });
})();
