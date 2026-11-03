# CosRent – Nền tảng Cho Thuê Trang Phục & Phụ Kiện Cosplay

> **Báo cáo & Đồ án Bài tập lớn Môn: Phát triển Ứng dụng Web Nâng cao**  
> **Trường Đại học Phenikaa – Khoa Công nghệ Thông tin**  
> **Nhóm thực hiện: Nhóm 9**  
> - **QuyenNguyenDinh** (`nguyendinhquyen27102005@gmail.com`) – Trưởng nhóm: Thiết kế CSDL TypeORM, Kiến trúc Backend & Module Đơn thuê (Rentals)
> - **chinmeomeo2865** (`23011987@st.phenikaa-uni.edu.vn`) – Xác thực Auth (JWT, Refresh Token), Phân quyền RBAC, Quản trị Admin & Viết tài liệu hệ thống
> - **Sang2601** (`zlsangdzlz@gmail.com`) – Giao diện Khách hàng (React Vite, Tailwind CSS), Hero Carousel, Danh mục & Kiểm thử E2E
> 
> **Repository:** https://github.com/nhom9-commits/DriveFlow

---

## 1. Giới thiệu đề tài

**CosRent** là đồ án môn học xây dựng website hỗ trợ quản lý và cho thuê trang phục, phụ kiện cosplay. Hệ thống tập trung giải quyết bài toán vận hành thực tế tại cửa hàng:

- **Quản lý danh mục & kích cỡ:** Mỗi trang phục có nhiều kích cỡ (S, M, L, XL), số lượng tồn kho theo từng size, đơn giá thuê theo ngày và số tiền cọc quy định.
- **Tra cứu lịch tồn kho:** Khách hàng có thể tra cứu trực quan số lượng đồ còn trống theo khoảng ngày dự kiến trước khi đặt giữ chỗ.
- **Tự động tính tiền thuê và tiền cọc:** Hệ thống tự động tính tổng tiền thuê dựa trên số ngày thuê (tính trọn vẹn cả ngày nhận và ngày trả) và số tiền cọc cần chuẩn bị khi nhận đồ.
- **Quy trình quản lý đơn thuê:**
  1. Khách đặt giữ chỗ trực tuyến (`PENDING`).
  2. Quản trị viên duyệt đơn (`CONFIRMED`) hoặc từ chối nếu không hợp lệ (`REJECTED`).
  3. Khách đến quầy nhận đồ và nộp cọc -> Đơn chuyển sang trạng thái đang thuê (`RENTING`).
  4. Khách trả đồ tại quầy -> Quản trị viên kiểm tra đồ, hoàn lại tiền cọc và kết thúc đơn (`RETURNED`).

### Phạm vi và quy ước vận hành:
- Giao nhận trang phục, thanh toán tiền thuê và đặt cọc/hoàn cọc thực hiện trực tiếp tại quầy cửa hàng (In-store pickup & return).
- Hệ thống hỗ trợ 2 vai trò người dùng chính: **Khách hàng (Customer)** và **Quản trị viên (Admin)**.

---

## 2. Công nghệ sử dụng (Tech Stack)

Dự án áp dụng mô hình **Monorepo** với 2 ứng dụng độc lập: `apps/backend` và `apps/frontend`.

- **Môi trường & Quản trị Workspace:** Node.js (>= 20.x), npm Workspaces.
- **Backend (`apps/backend`):**
  - Framework: NestJS (TypeScript).
  - Database & ORM: PostgreSQL 16, TypeORM (quản lý schema bằng Migration).
  - Bảo mật: Passport-JWT, bcrypt mã hóa mật khẩu, HttpOnly Cookie lưu Refresh Token, Guards phân quyền RBAC, Helmet bảo vệ HTTP headers, Rate Limiting chống spam.
  - Tài liệu API: Swagger UI tự động tại `/api/docs`.
- **Frontend (`apps/frontend`):**
  - Thư viện: React 18, TypeScript, Vite.
  - UI & Styling: Tailwind CSS, React-Bootstrap, Lucide Icons.
  - Quản lý phiên đăng nhập: React Context API (`AuthContext`).
- **Kiểm thử (Testing):**
  - Backend: Jest & Supertest (Unit test tính giá, kiểm tra tồn kho, máy trạng thái đơn hàng).
  - Frontend: Vitest & React Testing Library (Unit test các components).
  - E2E: Playwright (Kiểm thử luồng đặt thuê tự động).
- **Môi trường chạy:** Docker Compose (PostgreSQL 16) hoặc chế độ In-Memory Database (`pg-mem`).

---

## 3. Các quy tắc nghiệp vụ cốt lõi

1. **Xử lý ngày tháng theo giờ Việt Nam (`Asia/Ho_Chi_Minh`):** Quản lý ngày lịch dạng chuỗi `YYYY-MM-DD`, loại bỏ hoàn toàn lỗi lệch ngày do chuyển đổi múi giờ UTC.
2. **Tính ngày thuê trọn vẹn (Inclusive Days):** Cả ngày nhận và ngày trả đồ đều được tính là ngày sử dụng.
   - Thuê trong ngày (nhận sáng trả chiều): Tính là **1 ngày**.
   - Công thức: `Số ngày thuê = (Ngày trả - Ngày nhận) + 1`.
3. **Tách biệt Tiền thuê & Tiền cọc:**
   - **Tiền thuê:** Doanh thu dịch vụ của cửa hàng, tính theo: `Đơn giá/ngày × Số ngày thuê × Số lượng`.
   - **Tiền cọc:** Khoản bảo đảm giữ đồ, được hoàn trả 100% khi khách trả trang phục nguyên vẹn. Khoản này không tính vào doanh thu.
4. **Bảo vệ dữ liệu giá (Zero Client Trust):** Toàn bộ đơn giá, tiền cọc và tổng tiền đều do Backend tính toán từ CSDL, không nhận giá tiền do Frontend gửi lên.
5. **Snapshot dữ liệu đơn hàng:** Lưu vết tên trang phục, kích cỡ, giá thuê/ngày và tiền cọc tại thời điểm đặt để việc thay đổi giá sản phẩm sau này không làm sai lệch lịch sử giao dịch.
6. **Thuật toán kiểm tra tồn kho theo khoảng ngày:**
   - Các đơn ở trạng thái `PENDING`, `CONFIRMED`, `RENTING` sẽ giữ chỗ trong kho.
   - Các đơn ở trạng thái `CANCELLED`, `REJECTED`, `RETURNED` sẽ giải phóng chỗ cho người khác thuê.
   - Số lượng khả dụng trong khoảng `[Ngày nhận, Ngày trả]` là **giá trị nhỏ nhất (MIN)** của số lượng còn lại từng ngày trong khoảng đó.
7. **Chống đặt vượt kho khi nhiều người đặt cùng lúc (Race Condition):**
   - Sử dụng khóa bi quan (`Pessimistic Write Lock` - `SELECT ... FOR UPDATE`) trong transaction khi tạo đơn.
   - Sắp xếp ID biến thể tăng dần trước khi khóa để tránh Deadlock.

---

## 4. Hướng dẫn Cài đặt & Khởi chạy

### Yêu cầu hệ thống:
- Node.js >= 20.x, npm >= 9.x.
- Git, trình duyệt web.

### Bước 1: Clone mã nguồn và cài đặt thư viện
```bash
git clone https://github.com/nhom9-commits/DriveFlow.git
cd DriveFlow
npm install
```

### Bước 2: Chuẩn bị Cơ sở dữ liệu (PostgreSQL)
Chọn 1 trong 2 cách sau:
- **Cách 1 (Dùng Docker - Khuyên dùng):**
  ```bash
  docker compose up -d
  ```
- **Cách 2 (PostgreSQL cài sẵn trên máy):**
  Tạo database `cosrent_db` trên PostgreSQL local.

*(Nếu chạy thử nghiệm nhanh trên máy chưa cài PostgreSQL/Docker, backend có tích hợp sẵn In-Memory PostgreSQL qua `pg-mem` để chấm bài ngay mà không cần cài thêm gì).*

### Bước 3: Cấu hình biến môi trường
Tạo file `.env` từ file mẫu:
```bash
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
```

### Bước 4: Chạy Migration và Nạp dữ liệu mẫu
```bash
# Tạo bảng CSDL
npm run migration:run --workspace=apps/backend

# Nạp dữ liệu mẫu (Tài khoản, danh mục, 21 bộ trang phục cosplay)
npm run seed --workspace=apps/backend
```

### Bước 5: Khởi chạy dự án
Chạy đồng thời cả Backend và Frontend:
```bash
npm run dev
```

Hoặc chạy riêng từng phần:
```bash
# Terminal 1: Backend NestJS (cổng 3000)
npm run dev:backend

# Terminal 2: Frontend Vite React (cổng 5173)
npm run dev:frontend
```

- Truy cập trang web: **`http://localhost:5173`**
- Truy cập Swagger API: **`http://localhost:3000/api/docs`**

---

## 5. Tài khoản thử nghiệm (Demo Accounts)

| Vai trò | Email | Mật khẩu | Quyền hạn |
| :--- | :--- | :--- | :--- |
| **Quản trị viên (ADMIN)** | `admin@cosrent.vn` | `Admin123@` | Quản lý kho, duyệt đơn, bàn giao đồ, xác nhận trả đồ, thống kê |
| **Khách hàng 1 (CUSTOMER)** | `customer@cosrent.vn` | `Customer123@` | Tài khoản mẫu có sẵn lịch sử đơn thuê ở các trạng thái |
| **Khách hàng 2 (CUSTOMER)** | `customer2@cosrent.vn` | `Customer123@` | Tài khoản mới dùng để test tạo đơn và hủy đơn |

*(Hệ thống hỗ trợ đăng nhập bằng cả đuôi email `@cosrent.vn` và `@cosrent.com`)*

---

## 6. Hướng dẫn Chạy Kiểm thử (Testing)

```bash
# Chạy toàn bộ Unit Tests (33/33 bài test pass):
npm test

# Chạy riêng Backend Unit Tests:
npm run test:backend

# Chạy riêng Frontend Unit Tests:
npm run test:frontend

# Chạy kiểm thử tự động luồng đặt thuê E2E bằng Playwright:
npx playwright test
```

---

## 7. Phân công nhiệm vụ các thành viên

| Thành viên | Tài khoản GitHub | Nhiệm vụ chính phụ trách | Đóng góp |
| :--- | :--- | :--- | :---: |
| **Quyền** (Trưởng nhóm) | `QuyenNguyenDinh` | - Khởi tạo cấu trúc Monorepo, cấu hình Docker Compose và cơ sở dữ liệu PostgreSQL.<br>- Thiết kế các thực thể (Entities), quan hệ CSDL và Migration TypeORM ban đầu.<br>- Phát triển các module nghiệp vụ lõi: Kiểm tra tồn kho (Availability Service), Tính giá thuê (Pricing Service), Đơn thuê (Rentals Service).<br>- Viết Unit Test cho nghiệp vụ tính giá và kiểm tra phòng ngừa xung đột lịch thuê. | **~34%** (~5.400 dòng) |
| **An** | `chinmeomeo2865` | - Phụ trách toàn bộ Module Xác thực (Auth) & Bảo mật hệ thống: JWT Access Token, HttpOnly Refresh Token Cookie, mã hóa mật khẩu bcrypt.<br>- Thiết lập cơ chế bảo mật nâng cao: RBAC Guards (Customer/Admin), Helmet bảo vệ headers, CORS, Rate Limit chống brute-force và Global Exception Filters chuẩn hóa lỗi.<br>- Xây dựng RESTful API và giao diện Quản trị viên (Admin Portal): Dashboard doanh thu, quản lý danh mục, kho trang phục, quy trình duyệt đơn và hoàn cọc.<br>- Xây dựng các bộ kiểm thử tự động: Concurrency E2E (phòng ngừa race condition khi đặt đồ đồng thời), RBAC E2E, Unit Test máy trạng thái đơn thuê (Rental State Machine).<br>- Biên soạn và hoàn thiện toàn bộ tài liệu kỹ thuật, hướng dẫn cài đặt & vận hành hệ thống. | **~33%** (~5.340 dòng) |
| **Sang** | `Sang2601` | - Xây dựng bộ thư viện giao diện tái sử dụng: Navbar, Footer, Thẻ trang phục, Bộ lọc nâng cao, Thanh tìm kiếm, Huy hiệu trạng thái.<br>- Thiết kế Trang chủ với Hero Banner Carousel tự động chuyển ảnh và Trang danh mục sản phẩm kết hợp bộ lọc đa tiêu chí.<br>- Phát triển Trang chi tiết trang phục, Lịch xem tồn kho trực quan và Trang quản lý đơn thuê cá nhân của khách hàng.<br>- Xây dựng kịch bản kiểm thử luồng người dùng End-to-End (E2E) bằng Playwright và các bài test giao diện phía Client. | **~33%** (~5.270 dòng) |

---

## 8. Cấu trúc thư mục dự án

```
DriveFlow/
├── apps/
│   ├── backend/                     # Mã nguồn Backend NestJS
│   │   ├── src/
│   │   │   ├── common/              # Enums, decorators, guards, filters, date.util.ts
│   │   │   ├── database/            # Migrations, seed data (21 bộ trang phục)
│   │   │   ├── entities/            # 9 Entities TypeORM
│   │   │   └── modules/             # Auth, Users, Categories, Costumes, Pricing, Availability, Rentals, Admin
│   │   └── test/                    # Integration & Concurrency tests
│   └── frontend/                    # Mã nguồn Frontend React (Vite)
│       ├── src/
│       │   ├── components/          # Navbar, Footer, SearchBar, FilterSidebar, CostumeCard, StatusBadge...
│       │   ├── context/             # AuthContext (quản lý session và token)
│       │   ├── pages/               # Trang chủ, Danh mục, Chi tiết, Đặt thuê, Quản trị Admin...
│       │   └── services/            # Axios API client
│       └── vitest.config.ts         # Cấu hình test frontend
├── e2e/                             # Kịch bản Playwright E2E
├── docker-compose.yml               # Cấu hình PostgreSQL 16 container
├── package.json                     # Root monorepo workspace
├── .gitignore                       # Cấu hình gitignore
└── README.md                        # Tài liệu hướng dẫn này
```
