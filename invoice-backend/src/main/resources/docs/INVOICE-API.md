# Invoice API – Tài liệu Postman

**Base URL**: `http://localhost:8080`  
**Prefix**: `/api/invoices`

---

## 1. Tạo hóa đơn mới

- **Method**: POST
- **URL**: `http://localhost:8080/api/invoices`
- **Authorization**: Không (hiện tại chưa yêu cầu xác thực)
- **Headers**:
  - `Content-Type: application/json`
- **Body** (raw JSON):

```json
{
  "title": "Hóa đơn thanh toán",
  "template": "classic",
  "logo": "https://example.com/logo.png",
  "tax": 10,
  "notes": "Cảm ơn quý khách",
  "thumbnailUrl": "https://example.com/thumb.png",
  "clerkId": "clerk_123456",
  "company": {
    "name": "Công ty ABC",
    "phone": "0123456789",
    "address": "123 Đường Nguyễn Trãi, Quận 1, TP.HCM"
  },
  "billing": {
    "name": "Nguyễn Văn A",
    "phone": "0987654321",
    "address": "456 Lê Lợi, Quận 1, TP.HCM"
  },
  "shipping": {
    "name": "Nguyễn Văn A",
    "phone": "0987654321",
    "address": "456 Lê Lợi, Quận 1, TP.HCM"
  },
  "invoiceDetails": {
    "invoiceNumber": "INV-2026-0001",
    "invoiceDate": "2026-05-10",
    "dueDate": "2026-05-24"
  },
  "items": [
    {
      "itemName": "Dịch vụ thiết kế web",
      "quantity": 1,
      "amount": 5000000,
      "total": 5000000,
      "description": "Thiết kế website bán hàng"
    },
    {
      "itemName": "Hosting",
      "quantity": 1,
      "amount": 1200000,
      "total": 1200000,
      "description": "Hosting 1 năm"
    }
  ]
}
```

- **Response**:
  - 200 (thành công):

```json
{
  "id": "...",
  "title": "Hóa đơn thanh toán",
  "template": "classic",
  "logo": "https://example.com/logo.png",
  "tax": 10,
  "notes": "Cảm ơn quý khách",
  "thumbnailUrl": "https://example.com/thumb.png",
  "clerkId": "clerk_123456",
  "company": {
    "name": "Công ty ABC",
    "phone": "0123456789",
    "address": "123 Đường Nguyễn Trãi, Quận 1, TP.HCM"
  },
  "billing": {
    "name": "Nguyễn Văn A",
    "phone": "0987654321",
    "address": "456 Lê Lợi, Quận 1, TP.HCM"
  },
  "shipping": {
    "name": "Nguyễn Văn A",
    "phone": "0987654321",
    "address": "456 Lê Lợi, Quận 1, TP.HCM"
  },
  "invoiceDetails": {
    "invoiceNumber": "INV-2026-0001",
    "invoiceDate": "2026-05-10",
    "dueDate": "2026-05-24"
  },
  "items": [
    {
      "itemName": "Dịch vụ thiết kế web",
      "quantity": 1,
      "amount": 5000000,
      "total": 5000000,
      "description": "Thiết kế website bán hàng"
    },
    {
      "itemName": "Hosting",
      "quantity": 1,
      "amount": 1200000,
      "total": 1200000,
      "description": "Hosting 1 năm"
    }
  ],
  "createdAt": "2026-05-10T...",
  "updatedAt": "2026-05-10T..."
}
```

---

## 2. Tạo hóa đơn tối thiểu

- **Method**: POST
- **URL**: `http://localhost:8080/api/invoices`
- **Authorization**: Không
- **Headers**:
  - `Content-Type: application/json`
- **Body** (raw JSON) - Chỉ truyền các trường bắt buộc:

```json
{
  "title": "Hóa đơn đơn giản"
}
```

- **Response**:
  - 200 (thành công):

```json
{
  "id": "...",
  "title": "Hóa đơn đơn giản",
  "template": null,
  "logo": null,
  "tax": null,
  "notes": null,
  "thumbnailUrl": null,
  "clerkId": null,
  "company": null,
  "billing": null,
  "shipping": null,
  "invoiceDetails": null,
  "items": null,
  "createdAt": "2026-05-10T...",
  "updatedAt": "2026-05-10T..."
}
```

---

## Ghi chú chung

- **Cổng mặc định**: Server chạy trên cổng `8080` (xem `application.properties`).
- **Cơ sở dữ liệu**: MongoDB tại `MONGO_URI` (mặc định `mongodb://localhost:27017/invoiceDB`).
- **Validation**: Hiện tại server không kiểm tra validation – client cần đảm bảo gửi đúng format dữ liệu.
- **Authentication**: Chưa implement xác thực JWT. Tất cả API hiện tại đều public.
- **Trường dạng nested object**: `company`, `billing`, `shipping`, `invoiceDetails` đều là nested class với cấu trúc riêng.
- **Trường `items`**: là mảng object, mỗi item có `itemName`, `quantity`, `amount`, `total`, `description`.