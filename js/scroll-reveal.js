/* =========================================================
   scroll-reveal.js — hiệu ứng hiện dần khi cuộn tới
   Dùng IntersectionObserver gắn class .is-visible vào .reveal.
   ========================================================= */
(function () {
  "use strict";

  function init() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    // Trình duyệt không hỗ trợ -> hiện hết, không chặn nội dung.
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach(function (el) { observer.observe(el); });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
