# Auth API – Tài liệu Postman

**Base URL**: `http://localhost:8080`  
**Prefix**: `/api/auth`

---

## 1. Đăng ký tài khoản

- **Method**: POST
- **URL**: `http://localhost:8080/api/auth/register`
- **Authorization**: Không
- **Headers**:
  - `Content-Type: application/json`
- **Body** (raw JSON):

```json
{
  "email": "nguyenvana@example.com",
  "password": "password123",
  "fullName": "Nguyễn Văn A"
}
```

- **Response**:
  - 200 (thành công): `"Đăng ký thành công. Vui lòng kiểm tra email để xác thực tài khoản."`

---

## 2. Đăng nhập

- **Method**: POST
- **URL**: `http://localhost:8080/api/auth/login`
- **Authorization**: Không
- **Headers**:
  - `Content-Type: application/json`
- **Body** (raw JSON):

```json
{
  "email": "nguyenvana@example.com",
  "password": "password123"
}
```

- **Response**:
  - 200 (thành công):

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "nguyenvana@example.com",
  "fullName": "Nguyễn Văn A"
}
```

---

## 3. Xác thực email

- **Method**: POST
- **URL**: `http://localhost:8080/api/auth/verify?code={verificationCode}`
- **Authorization**: Không
- **Headers**:
  - `Content-Type: application/json`
- **Query Parameters**:
  - `code`: Mã xác thực được gửi qua email (ví dụ: `a1b2c3d4`)
- **Response**:
  - 200 (thành công):

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "email": "nguyenvana@example.com",
  "fullName": "Nguyễn Văn A"
}
```

---

## 4. Quên mật khẩu

- **Method**: POST
- **URL**: `http://localhost:8080/api/auth/forgot-password?email={email}`
- **Authorization**: Không
- **Headers**:
  - `Content-Type: application/json`
- **Query Parameters**:
  - `email`: Email của tài khoản cần đặt lại mật khẩu (ví dụ: `nguyenvana@example.com`)
- **Response**:
  - 200 (thành công): `"Đã gửi email đặt lại mật khẩu"`

---

## 5. Đặt lại mật khẩu

- **Method**: POST
- **URL**: `http://localhost:8080/api/auth/reset-password?code={resetCode}&newPassword={newPassword}`
- **Authorization**: Không
- **Headers**:
  - `Content-Type: application/json`
- **Query Parameters**:
  - `code`: Mã đặt lại mật khẩu được gửi qua email (ví dụ: `reset123abc`)
  - `newPassword`: Mật khẩu mới (ví dụ: `newpassword456`)
- **Response**:
  - 200 (thành công): `"Đặt lại mật khẩu thành công"`

---

## Ghi chú chung

- **Cổng mặc định**: Server chạy trên cổng `8080` (xem `application.properties`).
- **JWT Token**: Sau khi đăng nhập hoặc xác thực email thành công, server trả về JWT token. Token này cần được sử dụng trong header `Authorization: Bearer {token}` cho các API yêu cầu xác thực.
- **Email xác thực**: Sau khi đăng ký, người dùng cần xác thực email trước khi có thể đăng nhập.
- **Mã xác thực và mã đặt lại mật khẩu**: Được gửi qua email và có thời hạn sử dụng giới hạn.
