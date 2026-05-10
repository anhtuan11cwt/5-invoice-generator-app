# Quick Invoice — Invoice Generator

Ứng dụng full-stack tạo hóa đơn chuyên nghiệp với React (Vite) + Spring Boot + MongoDB, hỗ trợ đăng ký/đăng nhập, quản lý hóa đơn, 5 template tùy chỉnh, tải PDF, gửi email, và upload thumbnail lên Cloudinary.

---

## Công Nghệ

### Frontend
- **React 19** + **Vite 8** — Build tool & UI framework
- **React Router DOM v7** — Điều hướng SPA
- **Bootstrap 5.3** + **Tailwind CSS v4** — Giao diện responsive
- **Lucide React** — Icon system
- **Axios** — HTTP client
- **html2canvas** + **jsPDF** — Chụp DOM & tạo PDF
- **React Hot Toast** — Thông báo
- **Biome** + **ESLint** — Linting & formatting

### Backend (Spring Boot 3.5.14 / Java 25)
- **Spring Web** — REST API
- **Spring Data MongoDB** — Database
- **Spring Security** + **jjwt** — JWT authentication
- **Spring Mail** — Gửi email (Gmail SMTP)
- **Lombok** — Boilerplate reduction

### Dịch Vụ Bên Thứ Ba
- **Cloudinary** — Lưu thumbnail hóa đơn
- **Gmail SMTP** — Gửi email xác thực & hóa đơn PDF
- **MongoDB** — Database

---

## Tính Năng

- **Xác thực người dùng**: Đăng ký, đăng nhập, xác thực email (6-digit code), quên/đặt lại mật khẩu
- **5 template hóa đơn**: Giao diện khác nhau, chuyển đổi động
- **Form nhập liệu**: Logo công ty, thông tin khách hàng (Bill To / Ship To), danh sách sản phẩm, ngân hàng, thuế, ghi chú
- **Tự động tính toán**: Subtotal, tax, grand total
- **Xem trước trực tiếp**: Preview kích thước A4, chuyển template không mất dữ liệu
- **Lưu hóa đơn**: Lưu vào MongoDB qua API, phân quyền theo userId
- **Dashboard**: Quản lý danh sách hóa đơn, xem thumbnail, xóa
- **Tải PDF**: Xuất hóa đơn ra file PDF chất lượng cao
- **Gửi email**: Gửi hóa đơn đính kèm PDF tới khách hàng
- **Upload thumbnail**: Chụp ảnh preview và upload lên Cloudinary

---

## Cấu Trúc Thư Mục

```
invoice-generator-app/
├── invoice-generator/          # Frontend React
│   ├── src/
│   │   ├── assets/             # Ảnh tĩnh, logo, template SVG
│   │   ├── components/         # UI components
│   │   │   ├── Footer.jsx
│   │   │   ├── InvoiceForm.jsx
│   │   │   ├── InvoicePreview.jsx
│   │   │   ├── Logo.jsx
│   │   │   ├── MenuBar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── PublicRoute.jsx
│   │   │   └── TemplateGrid.jsx
│   │   ├── context/
│   │   │   ├── AppContext.jsx          # Invoice data state
│   │   │   ├── AuthContext.jsx         # Auth logic (login/logout)
│   │   │   └── AuthContextInstance.js  # Context definition
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── ForgotPasswordPage.jsx
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   ├── RegisterPage.jsx
│   │   │   │   └── VerifyEmailPage.jsx
│   │   │   ├── landing/
│   │   │   │   ├── LandingPage.jsx
│   │   │   │   └── LandingPage.css
│   │   │   ├── Dashboard.jsx
│   │   │   ├── MainPage.jsx
│   │   │   ├── PreviewPage.jsx
│   │   │   └── PreviewPage.css
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── cloudService.js
│   │   │   └── invoiceService.js
│   │   ├── templates/
│   │   │   ├── Template1.jsx / Template1.css
│   │   │   ├── Template2.jsx / Template2.css
│   │   │   ├── Template3.jsx / Template3.css
│   │   │   ├── Template4.jsx / Template4.css
│   │   │   └── Template5.jsx / Template5.css
│   │   ├── utils/
│   │   │   ├── formatDate.js
│   │   │   ├── formatInvoiceData.js
│   │   │   ├── invoiceTemplates.js
│   │   │   └── pdfUtils.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── invoice-backend/            # Backend Spring Boot
    ├── src/main/java/com/quickinvoice/invoice_backend/
    │   ├── config/
    │   │   └── SecurityConfig.java
    │   ├── controller/
    │   │   ├── AuthController.java
    │   │   └── InvoiceController.java
    │   ├── dto/
    │   │   ├── AuthResponse.java
    │   │   ├── LoginRequest.java
    │   │   └── RegisterRequest.java
    │   ├── entity/
    │   │   ├── Invoice.java
    │   │   └── User.java
    │   ├── mail/
    │   │   ├── EmailController.java
    │   │   └── EmailService.java
    │   ├── repository/
    │   │   ├── InvoiceRepository.java
    │   │   └── UserRepository.java
    │   ├── security/
    │   │   ├── CustomUserDetails.java
    │   │   ├── CustomUserDetailsService.java
    │   │   └── JwtAuthenticationFilter.java
    │   ├── service/
    │   │   ├── InvoiceService.java
    │   │   ├── JwtService.java
    │   │   └── UserService.java
    │   └── InvoiceBackendApplication.java
    ├── src/main/resources/
    │   └── application.properties
    └── pom.xml
```

---

## Hướng Dẫn Cài Đặt

### Yêu Cầu
- Node.js 18+
- Java 21+ (JDK)
- MongoDB (local hoặc Atlas)
- Tài khoản Cloudinary (cho thumbnail)

### 1. Clone & Cài Dependencies

```bash
# Frontend
cd invoice-generator
npm install

# Backend
cd ../invoice-backend
# Mở trong IntelliJ IDEA, Maven tự động tải dependencies
```

### 2. Cấu Hình Môi Trường

**Frontend — `invoice-generator/.env`**
```env
VITE_CLOUDINARY_CLOUD_NAME=deef71c3q           # Cloudinary cloud name
```

**Backend — `invoice-backend/src/main/resources/application.properties`**
```properties
server.port=8080
spring.data.mongodb.uri=mongodb://localhost:27017/invoiceDB

# Gmail SMTP
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.starttls.required=true

app.mail.from=your-email@gmail.com

# JWT
jwt.secret=YourSuperSecretKeyForJWTTokenGenerationMustBeVeryLong1234567890
jwt.expiration=86400000
```

### 3. Cloudinary — Upload Preset

Vào Cloudinary Dashboard → Settings → Upload → Add Upload Preset:
- **Preset name**: `invoices-thumbnail`
- **Type**: Unsigned
- **Folder**: `5-invoice-generator-app`

### 4. Chạy Ứng Dụng

```bash
# Backend (port 8080)
cd invoice-backend
mvn spring-boot:run

# Frontend (port 5173)
cd invoice-generator
npm run dev
```

---

## API Endpoints

### Auth (`/api/auth`)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/register` | Đăng ký tài khoản |
| POST | `/login` | Đăng nhập, trả về JWT |
| POST | `/verify?code=` | Xác thực email |
| POST | `/forgot-password?email=` | Gửi mã đặt lại mật khẩu |
| POST | `/reset-password?code=&newPassword=` | Đặt lại mật khẩu |

### Invoices (`/api/invoices`)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/` | Lấy danh sách hóa đơn (theo userId) |
| POST | `/` | Tạo hóa đơn mới |
| DELETE | `/{id}` | Xóa hóa đơn |
| POST | `/send-invoice` | Gửi email đính kèm PDF |

---

## Routes (Frontend)

| Path | Component | Bảo vệ |
|------|-----------|--------|
| `/` | LandingPage | Public |
| `/login` | LoginPage | Public (redirect nếu đã login) |
| `/register` | RegisterPage | Public (redirect nếu đã login) |
| `/verify-email` | VerifyEmailPage | Public (redirect nếu đã login) |
| `/forgot-password` | ForgotPasswordPage | Public (redirect nếu đã login) |
| `/dashboard` | Dashboard | Protected |
| `/generate` | MainPage (InvoiceForm + TemplateGrid) | Protected |
| `/preview` | PreviewPage | Protected |
| `*` | Redirect → `/` | — |

---

## Luồng Xác Thực

1. **Đăng ký**: User nhập email, password, fullName → POST `/api/auth/register` → Lưu user (disabled) → Gửi email mã 6 số
2. **Xác thực email**: User nhập mã → POST `/api/auth/verify` → Bật `enabled` → Trả về JWT
3. **Đăng nhập**: POST `/api/auth/login` → Xác thực password + `enabled` → Trả về JWT
4. **JWT**: Lưu trong `localStorage`, gửi qua header `Authorization: Bearer <token>` cho mọi request
5. **Backend**: `JwtAuthenticationFilter` parse token → set `SecurityContextHolder` → API phân quyền theo `userId` (`authentication.getName()`)

---

## Luồng Tạo Hóa Đơn

1. User điền form tại `/generate` (InvoiceForm)
2. Dữ liệu được lưu trong `AppContext` (React Context)
3. User chọn template → validate items → navigate `/preview`
4. Tại PreviewPage:
   - Chuyển đổi template (5 mẫu) bằng pill buttons
   - **Save & Exit**: html2canvas chụp preview → upload lên Cloudinary → POST `/api/invoices` → redirect `/dashboard`
   - **Download PDF**: html2canvas → jsPDF A4 → tải file
   - **Send Email**: html2canvas → jsPDF (blob) → FormData → POST `/api/invoices/send-invoice`
   - **Delete**: DELETE `/api/invoices/{id}`

---

## Template Hóa Đơn

5 template được render động qua `invoiceTemplates.js`:
- `templateComponents[selectedTemplate] || Template1`
- Mỗi template nhận `formattedData` từ `formatInvoiceData()` — chuẩn hóa items, tính subtotal/tax/total, format currency VND

---

## Ghi Chú

- **Gmail SMTP** yêu cầu App Password (không dùng mật khẩu thường) — bật 2FA trên tài khoản Gmail
- **Cloudinary unsigned upload preset** cần được tạo trước khi chạy
- Các template CSS sử dụng kích thước A4 (794px × 1123px) cho preview và PDF
