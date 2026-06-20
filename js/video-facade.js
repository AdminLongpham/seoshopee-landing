/* =========================================================
   video-facade.js — chỉ tải iframe YouTube khi người dùng bấm
   Giúp trang nhẹ & nhanh (không nhúng YouTube ngay từ đầu).
   Đọc data-video-id trên #demo-video.
   ---------------------------------------------------------
   CÁCH DÙNG: trong index.html sửa
       data-video-id="VIDEO_ID_HERE"
   thành ID video YouTube thật, ví dụ link
       https://www.youtube.com/watch?v=dQw4w9WgXcQ
   thì ID là  dQw4w9WgXcQ
   ========================================================= */
(function () {
  "use strict";

  var PLACEHOLDER = "VIDEO_ID_HERE";

  function showNeedsId(facade) {
    var poster = facade.querySelector(".video-poster");
    if (!poster) return;
    poster.innerHTML =
      '<p style="font-weight:700;color:#fff">Chưa gắn video demo</p>' +
      '<p style="margin-top:6px;font-size:13px;color:rgba(255,255,255,.7)">' +
      'Mở <b>index.html</b> và thay <b>data-video-id</b> bằng ID video YouTube của bạn.</p>';
  }

  function loadVideo(facade, id) {
    // Dùng domain youtube.com tiêu chuẩn + truyền origin (khi chạy http/https)
    // để tránh lỗi cấu hình trình phát (vd Error 153).
    // LƯU Ý: mở bằng file:// có thể vẫn lỗi vì YouTube cần origin http(s) —
    // hãy xem qua web server (python -m http.server) hoặc sau khi deploy lên domain.
    var loc = window.location;
    var originParam =
      loc.protocol === "http:" || loc.protocol === "https:"
        ? "&origin=" + encodeURIComponent(loc.origin)
        : "";
    var iframe = document.createElement("iframe");
    iframe.setAttribute(
      "src",
      "https://www.youtube.com/embed/" + id + "?autoplay=1&rel=0&playsinline=1" + originParam
    );
    iframe.setAttribute("title", "Demo WantSeoShopee");
    iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
    iframe.setAttribute("allowfullscreen", "");
    facade.innerHTML = "";
    facade.appendChild(iframe);
  }

  function init() {
    var facade = document.getElementById("demo-video");
    if (!facade) return;

    function activate() {
      var id = (facade.getAttribute("data-video-id") || "").trim();
      if (!id || id === PLACEHOLDER) {
        showNeedsId(facade);
        return;
      }
      loadVideo(facade, id);
    }

    facade.addEventListener("click", activate);
    facade.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activate();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
