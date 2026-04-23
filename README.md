# QQualityTech Frontend

## 1. Overview

Bu loyiha Next.js frontend bo‘lib, `qqualitytech_backend` REST API bilan parallel ishlaydi.

Asosiy yo‘nalishlar:
- Auth (Supabase session)
- My Page
- Admin Equipment Management
- Equipment Catalog/Detail
- Cart (mini cart + full cart page)

---

## 2. Run

```bash
npm install
npm run dev
```

Frontend: `http://localhost:3000`  
Backend API base: `http://localhost:4000/api/v1` (env orqali boshqariladi)

---

## 3. Env (minimum)

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
BACKEND_API_URL=http://localhost:4000/api/v1
```

---

## 4. Current Status (2026-04-23)

Yopilgan ishlar:
- Login/Register/My Page flow barqarorlashtirilgan
- Admin equipment CRUD backend bilan ulangan
- Admin list: client-side filter + pagination + preview modal
- Equipment list/detail’dan cartga qo‘shish (AJAX)
- Header mini cart modal + live badge
- `/cart` page: real backend cart data, update/delete

Keyingi qadam:
- Checkout preview/confirm frontend flow’ni backend API bilan ulash

---

## 5. Documentation

- Frontend log: `FRONTEND_CHANGELOG.md`
- Backend master plan: `../qqualitytech_backend/src/docs/BACKEND_MASTER_PLAN.md`
- Parallel workflow: `../qqualitytech_backend/src/docs/DEVELOPMENT_WORKFLOW.md`

