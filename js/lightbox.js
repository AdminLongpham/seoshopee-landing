/* ============================================================
   Lightbox đơn giản — nhấn ảnh trong #interface để phóng to.
   Không phụ thuộc thư viện ngoài, chạy được cả khi mở file://
   ============================================================ */
(function () {
  "use strict";

  var images = Array.prototype.slice.call(
    document.querySelectorAll("#interface img")
  );
  if (!images.length) return;

  // Tạo overlay 1 lần, tái sử dụng
  var overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.innerHTML =
    '<button class="lightbox-close" aria-label="Đóng">&times;</button>' +
    '<img class="lightbox-img" alt="" />';
  document.body.appendChild(overlay);

  var bigImg = overlay.querySelector(".lightbox-img");
  var closeBtn = overlay.querySelector(".lightbox-close");

  function open(src, alt) {
    bigImg.src = src;
    bigImg.alt = alt || "";
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    // Xoá src sau khi đóng để giải phóng
    setTimeout(function () {
      if (!overlay.classList.contains("is-open")) bigImg.src = "";
    }, 200);
  }

  images.forEach(function (img) {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", function () {
      open(img.currentSrc || img.src, img.alt);
    });
  });

  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", function (e) {
    // Bấm ra vùng nền (không phải chính ảnh) thì đóng
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });
})();
