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

### Equipment -> Cart integration

- Updated: `app/equipment/page.tsx` list card butun maydoni detailga o‘tadigan qilindi (`상세 스펙 보기` tugmasi olib tashlandi).
- Added: `app/equipment/equipment-card.tsx` client card komponenti (`구매/임대 장바구니` tugmalari page refreshsiz ishlaydi).
- Added: `app/equipment/[slug]/add-to-cart-panel.tsx` detail sahifada AJAX cart qo‘shish paneli.
- Added: `app/api/cart/route.ts`, `app/api/cart/items/route.ts` BFF route’lari (frontend -> backend cart proxy).
- Added: `components/header-cart-button.tsx` mini cart modal (headerda cart bosilganda ochiladi, itemlar va total ko‘rinadi).
- Updated: `components/site-header.tsx` cart link o‘rniga mini modal button va live badge yangilanishi.
- Fixed: slug collision holatida noto‘g‘ri detail ochilishi (`/equipment/<slug>?id=<equipmentId>` ustuvor resolve qo‘shildi).

### Detail & Cart UI polish

- Updated: `app/cart/page.tsx` visual layout (image preview, clean card layout, sticky summary panel).
- Updated: detail gallery (`app/equipment/[slug]/equipment-gallery.tsx`) PC view’da ixchamroq, chiroyli proportion bilan.
- Updated: `관련 시험 장비` bo‘limi mobile’da horizontal swipe/snap carouselga o‘tkazildi.

### Checkout preview integration

- Added: `app/api/checkout/preview/route.ts` (frontend BFF proxy -> backend `POST /checkout/preview`).
- Added: `app/api/checkout/confirm/route.ts` (frontend BFF proxy -> backend `POST /checkout/confirm`).
- Added: `app/api/delivery-fees/route.ts` (frontend BFF proxy -> backend `GET /delivery-fees`).
- Added: `app/api/address-search/route.ts` (Juso 주소 검색 API proxy, `JUSO_CONFM_KEY` 필요).
- Added: `app/cart/checkout-preview-panel.tsx` client panel:
  - `delivery/pickup` tanlash
  - delivery holatida delivery fee API’dan keladigan `region` dropdown
  - Juso 주소 검색(키워드 검색 -> 결과 선택)으로 배송지 자동 입력
  - 선택한 주소 기반 region 자동 매칭 시도(매칭 실패 시 수동 선택 가능)
  - preview API chaqiruvi va error handling
  - preview natijalari (`buy subtotal`, `rent subtotal`, `delivery fee`, `total`) UI’da ko‘rsatish
  - `주문 확정` tugmasi orqali checkout confirm API chaqiruvi
- Updated: `app/cart/page.tsx` summary sidebar ichiga checkout preview panel qo‘shildi.
- Fixed: cart에서 rent 항목 수정 시 수량(count) 대신 임대 개월(rentalMonths, 6~36)을 갱신하도록 변경.
- Updated: cart live panelda rent 항목도 `수량 + 개월` 동시 수정 가능하도록 개선.
- Updated: 입력 변경 시 Enter 없이 line total/summary 즉시 재계산 + debounce 자동 저장.
- Fixed: 재고 초과 오류를 전체 상단이 아닌 해당 장비 항목 아래에 표시하도록 개선.
- Updated: cart 품목 이미지/이름 클릭 시 해당 equipment detail 페이지로 이동.

### Admin delivery fee management

- Added: `app/api/admin/delivery-fees/route.ts` (GET/POST, admin auth bilan backend proxy).
- Added: `app/api/admin/delivery-fees/[id]/route.ts` (PATCH/DELETE, admin auth bilan backend proxy).
- Added: `app/admin/delivery-fees-management-panel.tsx`:
  - 한국 시/도 17개 고정 목록(서울/부산/.../제주) 표시
  - 각 지역별 배송비/활성 여부 입력 후 개별 저장
  - 기존 값이 있으면 PATCH, 없으면 POST(create-or-update UX)
  - 설정 진행률(설정됨/활성 개수) 표시
- Updated: `app/admin/page.tsx` — `배송비 관리` panel qo‘shildi.

### Checkout address UX simplification

- Updated: `app/cart/checkout-preview-panel.tsx` da userga region/fee dropdown ko‘rsatish olib tashlandi.
- Updated: user endi faqat 주소 입력/선택 qiladi, region ichkarida manzildan auto-resolve qilinadi.
- Updated: `주소 검색` button olib tashlanib, typing paytida debounce auto-search qo‘shildi.
- Fixed: region aniqlanmasa preview/confirm oldidan aniq koreyscha xabar chiqadi.

### Admin orders integration (real backend)

- Added: `lib/backend/orders.ts` (`/orders/admin` fetch helper + typed response).
- Added: `app/admin/order-management-panel.tsx` (주문 목록 table, 상태/결제상태/합계 표시).
- Updated: `app/admin/page.tsx` da backenddan real 주문 데이터 yuklanib panelga chiqariladi.
- Added: `app/admin/actions.ts` -> `updateOrderPaymentStatusAction` (admin에서 결제상태 변경).
- Updated: `주문 관리` panelda `결제대기` 주문 uchun `결제완료 / 결제실패` 처리 버튼 qo‘shildi.

### Next

- Checkout confirm’dan keyingi payment flow (Phase 9) UI tayyorlash.
- Auth + cart + checkout bo‘yicha yakuniy E2E checklist yuritish.
