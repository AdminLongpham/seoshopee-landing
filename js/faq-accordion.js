/* =========================================================
   faq-accordion.js — đóng/mở câu hỏi thường gặp
   Bấm .faq-q -> bật .is-open trên .faq-item và set max-height
   cho .faq-a để có hiệu ứng trượt mượt. Chỉ mở 1 mục tại 1 thời điểm.
   ========================================================= */
(function () {
  "use strict";

  function closeItem(item) {
    item.classList.remove("is-open");
    var answer = item.querySelector(".faq-a");
    if (answer) answer.style.maxHeight = null;
  }

  function openItem(item) {
    item.classList.add("is-open");
    var answer = item.querySelector(".faq-a");
    if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
  }

  function init() {
    var items = Array.prototype.slice.call(document.querySelectorAll(".faq-item"));
    if (!items.length) return;

    items.forEach(function (item) {
      var question = item.querySelector(".faq-q");
      if (!question) return;

      question.addEventListener("click", function () {
        var willOpen = !item.classList.contains("is-open");
        items.forEach(closeItem); // đóng tất cả
        if (willOpen) openItem(item);
      });
    });

    // Cập nhật lại chiều cao mục đang mở khi đổi kích thước cửa sổ
    window.addEventListener("resize", function () {
      var open = document.querySelector(".faq-item.is-open .faq-a");
      if (open) open.style.maxHeight = open.scrollHeight + "px";
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
