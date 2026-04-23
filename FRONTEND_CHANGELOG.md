# FRONTEND CHANGELOG

Bu fayl frontend implementatsiyasi davomida qilingan muhim o‘zgarishlarni yozib borish uchun ishlatiladi.

## Format qoidasi
- sana
- modul/page
- nima qo‘shildi
- nima o‘zgardi
- nima tuzatildi
- keyingi qadam

---

## 2026-04-23

### Auth + My Page integration

- Added: `/my-page` sahifasi real backend profile API bilan ulandi (`GET/PATCH /users/me`).
- Added: `/my-page` sahifasida `로그아웃` oqimi ishlaydigan holatga keltirildi.
- Updated: `/my-page` UI to‘liq koreyscha copy bilan barqarorlashtirildi.
- Updated: `/my-page` sidebar navigatsiyasiga `홈으로 가기` linki qo‘shildi.
- Fixed: profile update submit paytida redirect/header xatolari (invalid header char) bartaraf qilindi.

### Header navigation and role-based UX

- Updated: global header login holatiga qarab ko‘rinadigan qilib sozlandi:
  - login yo‘q bo‘lsa `로그인`
  - customer bo‘lsa `마이페이지`
  - admin bo‘lsa `관리자 페이지`
- Added: headerda `장바구니` linki.
- Added: header avatar ko‘rinishi va avatar bosilganda dropdown (`ism + 로그아웃`).
- Updated: user talabiga ko‘ra `관리자` nav item olib tashlandi.
- Updated: `마이페이지/관리자 페이지` va `장바구니` tugmalariga icon qo‘shildi.

### Admin equipment management integration

- Updated: admin equipment list/create/edit/delete oqimi mock data’dan backend API oqimiga o‘tkazildi.
- Added: add/edit modalda 5-slot image upload UX va preview.
- Added: edit jarayonida slot-level delete/replace boshqaruvi.
- Added: Supabase storage cleanup:
  - update’da olib tashlangan rasmlar storage’dan o‘chiriladi
  - delete’da equipmentga tegishli rasmlar ham storage’dan o‘chiriladi
- Updated: equipment type (`sale/rental/sale_and_rental`)ga qarab narx fieldlari condition bilan ko‘rsatiladigan qilindi.
- Fixed: `next/image` remote host xatolari uchun safe image fallback oqimi.
- Fixed: add modalda numeric inputlarda avtomatik `0` olib tashlandi, helper text qo‘shildi.

### Admin list UX improvements

- Added: admin equipment listing uchun 10 talik pagination.
- Updated: filter/search auto-apply qilinadigan bo‘ldi (submit tugmasisiz).
- Added: `필터 초기화` tugmasi.
- Updated: filter/pagination client-sidega o‘tkazildi, butun page reload bo‘lmaydi.
- Added: equipment preview modal (rasm yoki nom ustiga bosilganda ochiladi).

### Cart page baseline

- Added: `/cart` sahifasining boshlang‘ich versiyasi (header/nav integratsiyasi uchun).

### Cart API integration

- Added: `lib/backend/cart.ts` backend cart API response helperlari.
- Added: `app/cart/actions.ts` (`updateCartItemCountAction`, `deleteCartItemAction`).
- Updated: `app/cart/page.tsx` real cart data bilan render qilinadigan bo‘ldi:
  - login bo‘lmagan user uchun login CTA
  - item list + quantity update + delete
  - summary (`buySubtotal`, `rentSubtotal`, `totalAmount`)
- Updated: `components/site-header.tsx` savat badge real `totalQuantity` bilan ko‘rsatiladi.

### Next

- Equipment detail/list sahifalarida `장바구니 추가` oqimini backend `POST /cart/items` bilan ulash.
- Checkout preview/confirm sahifalarini real API bilan ulash.
- Auth + cart + checkout bo‘yicha yakuniy E2E checklist yuritish.
