# WantSeoShopee — Landing Page (trang bán tool)

Trang web 1 trang (static) để **giới thiệu & bán phần mềm WantSeoShopee**: tính năng, cách hoạt động, demo, bảng giá, hỏi đáp và **chuyển đổi khách → chat Zalo / vào nhóm Zalo**.

Không cần build, không cần cài đặt. Chỉ là HTML + CSS + JS thuần (Tailwind nạp qua CDN).

---

## 1. Xem thử

- **Cách nhanh nhất:** bấm đúp mở `index.html` bằng trình duyệt (cần có mạng để tải Tailwind/Font/Icon).
- **Cách chuẩn (khuyên dùng):** chạy 1 web server tĩnh trong thư mục này rồi mở link hiện ra:
  ```bash
  # Python
  python -m http.server 5500
  # hoặc Node
  npx serve .
  ```

> ⚠️ **Video demo chỉ phát khi mở qua web server hoặc domain thật.** Nếu bấm đúp mở bằng `file://`, YouTube báo *Lỗi 153 / cấu hình trình phát* do thiếu origin http — đây là giới hạn của YouTube, không phải lỗi trang. Trang vẫn có nút **"Mở trên YouTube"** dự phòng ngay dưới video.

---

## 2. Những chỗ CẦN sửa cho đúng thực tế

Tìm chữ `TODO(user)` trong `index.html` để thấy nhanh các chỗ cần thay.

| Nội dung | Sửa ở đâu |
|---|---|
| **Giá các gói** (đang là giá mẫu 500K / 2.500K / 5.000K) | `index.html` → mục `id="pricing"` (3 thẻ `.price-card`). Sửa `.price-amount`, `.price-period`, danh sách quyền lợi. |
| **Video demo YouTube** | Đã gắn sẵn (`ahOOBbWNofM`). Muốn đổi: `index.html` → `id="demo-video"`, sửa `data-video-id`. Vd link `youtube.com/watch?v=dQw4w9WgXcQ` ⇒ ID là `dQw4w9WgXcQ`. |
| **Link nhóm Zalo** | `index.html` → mục `id="contact"`, nút "Tham gia nhóm Zalo": đổi `https://zalo.me/g/xxxxxx` thành link mời nhóm thật. |
| **Số Zalo cá nhân** | Đang dùng `0774150125` & `0963354832` (ở header, hero, contact, footer, nút nổi). Tìm `zalo.me/` để thay nếu cần. |
| **Domain (SEO)** | Thay `seoshopee.com` → domain thật ở **4 nơi**: `index.html` (`og:url`, `canonical`, JSON-LD), `sitemap.xml`, `robots.txt`. Mẹo: tìm chữ `seoshopee.com` để thay nhanh. |
| **Ảnh chụp tool thật** (tuỳ chọn) | Hiện đang dùng *mockup dựng bằng HTML*. Muốn thay bằng ảnh thật: đặt ảnh vào `assets/img/` rồi thay khối `.mockup-window` ở Hero / mục kịch bản bằng `<img>`. |

> 💡 Số điện thoại Zalo viết liền không dấu chấm trong link: `https://zalo.me/0774150125`.

---

## 3. Cấu trúc thư mục

```
wantseoshopee-landing/
├── index.html              # toàn bộ nội dung trang (chia section, có comment)
├── css/
│   ├── styles.css          # theme + giao diện component + mockup
│   └── animations.css      # hiệu ứng cuộn/floating/ping
├── js/
│   ├── main.js             # menu mobile, header sticky, nút lên đầu, icon
│   ├── scroll-reveal.js    # hiện dần khi cuộn
│   ├── faq-accordion.js    # đóng/mở hỏi đáp
│   └── video-facade.js     # bấm mới tải video YouTube
├── assets/img/
│   └── logo.png            # logo/favicon
├── robots.txt              # cho công cụ tìm kiếm
├── sitemap.xml             # sơ đồ trang (SEO)
└── README.md
```

---

## 4. Deploy (đưa lên mạng)

Đây là web tĩnh nên host ở đâu cũng được — chỉ cần **upload nguyên thư mục**:

- **Hosting/cPanel** (vd của seoshopee.com): upload toàn bộ vào thư mục `public_html`.
- **Netlify / Vercel:** kéo-thả thư mục, hoặc trỏ tới repo. Không cần lệnh build.

### GitHub Pages + domain riêng (miễn phí, SEO tốt)

GitHub Pages thân thiện SEO — Google index bình thường như mọi web tĩnh. Các bước:

1. Tạo repo, push toàn bộ thư mục này (giữ `index.html` ở **gốc** repo).
2. **Settings → Pages →** chọn `Branch: main`, folder `/ (root)` → Save.
3. **Trỏ domain riêng:**
   - Nhập domain vào ô **Custom domain** (GitHub tự tạo file `CNAME`).
   - Tại nhà cung cấp domain, thêm DNS: `www` → CNAME tới `<tài-khoản>.github.io`; hoặc domain gốc → 4 bản ghi A trỏ `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - Bật **Enforce HTTPS**.
4. Sau khi có domain, thay `seoshopee.com` ở `index.html` / `sitemap.xml` / `robots.txt` (xem mục 2).

> Dùng GitHub Pages + domain riêng **không ảnh hưởng SEO**. Quan trọng: `canonical`, `og:url`, `sitemap.xml` trỏ đúng **một** domain (chọn có `www` hoặc không rồi nhất quán).

---

## 5. SEO đã tối ưu sẵn

- `title` + `meta description` + `keywords` tiếng Việt đúng từ khoá ("phần mềm SEO Shopee", "nuôi acc Shopee"…).
- **Open Graph + Twitter Card** (đẹp khi share Zalo/Facebook).
- **Dữ liệu có cấu trúc (JSON-LD):** `SoftwareApplication` + `Organization` + **`FAQPage`** → cơ hội hiện *rich result* câu hỏi trên Google.
- `canonical`, `robots`, `sitemap.xml`, `robots.txt`.
- HTML ngữ nghĩa: 1 thẻ `h1`, `h2/h3` rõ ràng, `alt` ảnh, `lang="vi"`.
- Sau khi deploy: khai báo ở **Google Search Console** và bấm *Request indexing* cho nhanh lên top.

---

## 6. Ghi chú kỹ thuật

- Tailwind dùng **Play CDN** cho gọn (không cần build). Nếu sau này muốn tối ưu tốc độ/production, có thể biên dịch Tailwind ra 1 file CSS tĩnh.
- Trang hiện **chỉ tiếng Việt** theo đúng nhóm khách mục tiêu.
- Hiệu ứng tự tắt nếu người dùng bật "giảm chuyển động" (prefers-reduced-motion).
- Toàn bộ JS là classic script nên mở trực tiếp `file://` vẫn chạy.
