export type EquipmentSpec = {
  label: string;
  value: string;
};

export type EquipmentFeature = {
  icon: "wrench" | "chart" | "shield" | "sliders";
  title: string;
  description: string;
  tone: "light" | "primary" | "surface" | "muted";
};

export type EquipmentItem = {
  slug: string;
  category: string;
  categoryLabel: string;
  cardTag: string;
  model: string;
  itemCode: string;
  catalogCategory: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  alt: string;
  badge?: string;
  badgeTone?: string;
  specs: EquipmentSpec[];
  gallery: Array<{ image: string; alt: string }>;
  features: EquipmentFeature[];
  technicalSpecs: Array<{ item: string; specification: string }>;
  relatedSlugs: string[];
  relatedDescription: string;
};

export const equipmentCatalog: EquipmentItem[] = [
  {
    slug: "qt-2000x",
    category: "CONCRETE",
    categoryLabel: "콘크리트 시험기",
    cardTag: "CONCRETE-TEST-04",
    model: "MODEL: QT-2000X",
    itemCode: "CONCRETE-TEST-04",
    catalogCategory: "정밀 계측 시스템",
    title: "고정밀 디지털 유압 압축 시험기 (QT-2000X)",
    summary:
      "산업 현장의 정밀한 압축 강도 측정을 위해 설계된 하이엔드 솔루션입니다.",
    description:
      "산업 현장의 정밀한 압축 강도 측정을 위해 설계된 하이엔드 솔루션입니다. ASTM 및 ISO 표준을 준수하는 초정밀 센서와 디지털 제어 시스템이 탑재되어 있습니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD1RDmYcf07QFiYj_aHVc-EtrDrqELaT0x5lVBQjyit7lnTo6BrHR1bXDI8v2aeGh-0QZGCm8S7PR-fw-rq7yI4KS4lGL2uiHpDFGdBNwNDx6mVEeV1NYpIvfHLKDHIDX695ItyUJ1TF6_RDGfkcXclQOhhZcjmHAhaGvWt7ea07fVP-0t15RSKYfETh4eMjxd3j3eYjpIV_gtwrkIk4nkR8U63GcqnAvJAuCxo-BFJFUf64kP0OJ2ceFCCzdgA3aUMUXmcrgfflw_d",
    alt: "Industrial hydraulic compression testing machine in a clean lab",
    badge: "IN STOCK",
    badgeTone: "bg-secondary text-white",
    specs: [
      { label: "최대 용량", value: "2,000 kN" },
      { label: "하중 정확도", value: "±0.5%" },
      { label: "제어 방식", value: "완전 자동 서보 제어" },
    ],
    gallery: [
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuD1RDmYcf07QFiYj_aHVc-EtrDrqELaT0x5lVBQjyit7lnTo6BrHR1bXDI8v2aeGh-0QZGCm8S7PR-fw-rq7yI4KS4lGL2uiHpDFGdBNwNDx6mVEeV1NYpIvfHLKDHIDX695ItyUJ1TF6_RDGfkcXclQOhhZcjmHAhaGvWt7ea07fVP-0t15RSKYfETh4eMjxd3j3eYjpIV_gtwrkIk4nkR8U63GcqnAvJAuCxo-BFJFUf64kP0OJ2ceFCCzdgA3aUMUXmcrgfflw_d",
        alt: "Hydraulic compression testing machine in a laboratory",
      },
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDkRp0P3SQT1AN7mV_FrfYLaY4S4bLI0fcc_Yv4VXJ3uu85XO-jD1YwHnvJCpYnUb73-m9OZNW-EuCMMC976wclA5RR8ys77kLu_otUH9az86tZx4XSQkIL01WlKSP-9UrU5FhyZizaMpn7nbJxDA9xi6mZ5YCmwrOJvIK59FsFruM6hEcFkl8yOzMaYY5KJRkGLCdTvX-ejOnrmOntcbuZzHNeZ4sKWFlBArpsYCyr16YVihBZzQCPuxWHJFAJfgK-prBgewaudAx3",
        alt: "Digital control panel for industrial testing equipment",
      },
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBSPEe8cr3MIQWgeWjkIAttdhIvsJS-2wpzBjl7uQNpp3s9uOY78mAXb9Z_a2Pj9J13QHH08unjBBDmTrcxBcXl2PXHkGPpM9x72tKssg2Z_7024m5p2CQoD3A5guh8AVT4UL8q0kwR0hYVZDc39d_TvtQNQknnL97atjQDE5QzEmd1s0Ib0pbcdUPHR3JYUTd2OZkeKbVkVOFq5ml1BX2Yoaj0Htgcul8zPkvfkr1Q_fuD7yuvUsawDWha-e4LZavBrBfv1eNuMcKB",
        alt: "Heavy duty hydraulic piston of a compression test machine",
      },
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAKNEXv16t32SG2qh9YfYVF-D0p1fpD_v3T2IY9vLAZ3DLsNkZ6t6Q5TBmCz7gTF9_38aKZVyuSAc5VuKQpLRaqzeuKjoLTlRaIOFaDmccCt4ktw6t-xRw3oCruXtgS-cUVgE9mV2aTXlVxOaifyyyHDQXmK5QE_IPGELTekLjfo4H396jt4PoEQdP5na5ODis7Y1lD1Udaer6mL2ycJLLR7-Ay71ztMdilYt0y80XRL7OKekwGyzJ02ynxajwN-G8x1x3F4ksVm-kX",
        alt: "Concrete sample undergoing compression testing",
      },
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAu8btv6LBDQODu3CEd6AommqbVwsj4G3baYro4rpujByT8EEGfwkm7fAgkivQiP6-WWLAqqt3Dxr-w2f1_MtU8Az3O_Zh665dOFAdKz34kQ_umrx92HGGBZT3CRim8CJ1iYMr8Iaocvigra-jjKUFaT-frjVHEg9DpX3kqxgnHVoJR7QJSFmEi_qFj3AmEmtc5zhBv-xVXq01a4X4PtxMNZ4GFdXiv_A4j28IXPlVYQIgaui96m28EolqZ6U_qrf3NHsWI13avDpqd",
        alt: "Technical schematic drawing of an industrial test facility",
      },
    ],
    features: [
      {
        icon: "wrench",
        title: "초정밀 로드셀 시스템",
        description:
          "0.1% 미만의 오차 범위를 자랑하는 하이엔드 로드셀을 장착하여 극한의 정밀도를 보장합니다.",
        tone: "light",
      },
      {
        icon: "chart",
        title: "실시간 데이터 분석 소프트웨어",
        description:
          "자체 개발된 QT-Vision 소프트웨어를 통해 실시간 그래프 출력 및 자동 리포트 생성이 가능합니다.",
        tone: "primary",
      },
      {
        icon: "shield",
        title: "다중 안전 보호 장치",
        description:
          "과부하 방지 밸브와 비상 정지 시스템을 통해 작업자의 안전을 최우선으로 고려했습니다.",
        tone: "surface",
      },
      {
        icon: "sliders",
        title: "완전 자동 서보 제어",
        description:
          "한 번의 버튼 조작으로 하중 속도 유지 및 시험 종료까지 완전 자동화된 공정을 제공합니다.",
        tone: "muted",
      },
    ],
    technicalSpecs: [
      { item: "최대 용량", specification: "2,000 kN (200 ton)" },
      {
        item: "하중 정확도",
        specification: "Indicated value ±0.5% (ISO 7500-1 Class 0.5)",
      },
      { item: "램 스트로크", specification: "0 ~ 200 mm" },
      {
        item: "압축 판 사이즈",
        specification: "Ø250 mm x 50 mm (Hardened & Ground)",
      },
      { item: "전원 공급", specification: "AC 380V, 3-Phase, 50/60Hz" },
      {
        item: "장비 규격 (W x D x H)",
        specification: "1,100 x 650 x 1,850 mm",
      },
      { item: "장비 중량", specification: "약 1,250 kg" },
    ],
    relatedSlugs: ["qt-utm100", "materialscope-pro", "env-chamber-pro"],
    relatedDescription:
      "초정밀 센서와 디지털 제어 시스템을 기반으로 콘크리트 압축 강도를 안정적으로 측정합니다.",
  },
  {
    slug: "q-dss10",
    category: "SOIL",
    categoryLabel: "토질 시험기",
    cardTag: "SOIL-DIRECT-02",
    model: "MODEL: Q-DSS10",
    itemCode: "SOIL-DIRECT-02",
    catalogCategory: "지반 안정성 분석",
    title: "디지털 직접 전단 시험기",
    summary: "토질의 전단 강도와 마찰 특성을 정밀 분석하는 토질 시험 솔루션입니다.",
    description:
      "토질의 전단 강도와 마찰 특성을 정밀 분석하는 토질 시험 솔루션입니다. 디지털 센서와 자동 제어 시스템을 통해 반복 시험에서도 일관된 결과를 확보할 수 있습니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDn3tbhtqJwdCQhY3lmJ1XvJxykebHyH6uZxrdkxaKbfwM49sZffYLr5JY9Tk6D1gW8VSSTPI-8BeEuYrz-_Yg_TjcSpQPtKn60CF_QsN7SbY9B4eN5uLL-ORLY8ZlteNrAYq-ERft9hyMo6Z0X8SKnI1dt8PZOZPcKZOjCI70FHG8tWZTHw511PvDl-TmIPe9DVDu1f3_34zzqKFj8-HinZQgzVOa8tWUrxpoaeFH0Qu0oN-dLAtB4NSnsZsOzQIvv8JSLnqMHQOYL",
    alt: "Digital direct shear testing device in an engineering lab",
    specs: [
      { label: "수평 하중", value: "10 kN Max" },
      { label: "데이터 인터페이스", value: "USB / Ethernet" },
      { label: "표준 규격", value: "KS F 2343" },
    ],
    gallery: [
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDn3tbhtqJwdCQhY3lmJ1XvJxykebHyH6uZxrdkxaKbfwM49sZffYLr5JY9Tk6D1gW8VSSTPI-8BeEuYrz-_Yg_TjcSpQPtKn60CF_QsN7SbY9B4eN5uLL-ORLY8ZlteNrAYq-ERft9hyMo6Z0X8SKnI1dt8PZOZPcKZOjCI70FHG8tWZTHw511PvDl-TmIPe9DVDu1f3_34zzqKFj8-HinZQgzVOa8tWUrxpoaeFH0Qu0oN-dLAtB4NSnsZsOzQIvv8JSLnqMHQOYL",
        alt: "Digital direct shear apparatus in a soil lab",
      },
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAwLxDq-eGG4VwDkQJsoussxU0VE5_085ZrgSOgT04emZqdTRd_tO_DCc1ls0Czd-In1jGBSIkVfnva7lAQGhMLIgAiqQhnN0_FLmCmU96qPNoCuDTEK424jyI97WS3Hae7SCL6WTKIo3-PxOb-f2evwWPk0suS0Vs70mvq4NyQijwf11gY9PYSdiJFv0FhEr2YQ_zZJJAjiEtDT_AwMn5y3E78zaMM_VPFkPA1jx5vtaTTP3T1gdCpz_gmCxefMj2LTDRlMYvgHIDB",
        alt: "Technical drawings and tools for geotechnical consulting",
      },
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDd2hEPYEu2WZcVDQr9vBj6s8SV9HsPs6Ho25OssPka3jDIDkwu2bT79STfDSS522-ArQZTWrY2oeVTeXz3bfZmD2ZF-VKKRboJgqTkkVlhj3jXkJoTRO61-wjMoaZowMySZPK9ETyyktR85MB6POrfQ4BxhwEz-kuPNUPwRh7ea8P6befp5_7GoyX8xCND1FSto1Su6Ds_LCt8s4S-1qQFHkqAaHu_r5dEC_XLuxsBAJo1wXm_vNaOv0B2wlaOQn_aOrjhKWyrIdpB",
        alt: "Sensor module for high precision material testing",
      },
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAx2_dv4eFj0quWGXRpGKdVEi2xWdNukHEnw6icvCKs9yyvZGRQGLH47QgR8rEHe2zNKn2CbWzqDB9HPyyzb3-TUImo1gnklNYA2YMAFeZVlt12_uHstv9fbG1OeHkBoAF36GEMUOjYngdzVuDU_MTHqccb7jIR4J7cR6LTFD9pW21D6enWHWy3o88bBsKId0cHNCjPiyTs8ELNsJLQKajx7ZjnbvoORauhUVkSEc9gA1eOwi9Ufr4r1t6QhXL9FIxI-ry6_do7wjJw",
        alt: "Engineer collecting field data on site",
      },
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAu8btv6LBDQODu3CEd6AommqbVwsj4G3baYro4rpujByT8EEGfwkm7fAgkivQiP6-WWLAqqt3Dxr-w2f1_MtU8Az3O_Zh665dOFAdKz34kQ_umrx92HGGBZT3CRim8CJ1iYMr8Iaocvigra-jjKUFaT-frjVHEg9DpX3kqxgnHVoJR7QJSFmEi_qFj3AmEmtc5zhBv-xVXq01a4X4PtxMNZ4GFdXiv_A4j28IXPlVYQIgaui96m28EolqZ6U_qrf3NHsWI13avDpqd",
        alt: "Technical schematic sheet for testing equipment",
      },
    ],
    features: [
      {
        icon: "wrench",
        title: "정밀 하중 제어",
        description:
          "수평 및 수직 하중을 독립 제어하여 복합 지반 조건에서도 안정적인 전단 실험이 가능합니다.",
        tone: "light",
      },
      {
        icon: "chart",
        title: "실시간 전단 응력 분석",
        description:
          "시험 중 응력-변형률 곡선을 즉시 시각화하여 연구 및 품질 보고서 작성 시간을 줄입니다.",
        tone: "primary",
      },
      {
        icon: "shield",
        title: "반복 시험 신뢰성",
        description:
          "고강성 프레임과 자동 보정 로직으로 반복 측정 간 편차를 최소화합니다.",
        tone: "surface",
      },
      {
        icon: "sliders",
        title: "시험 조건 프리셋 저장",
        description:
          "자주 사용하는 토질 시험 레시피를 저장해 실험 준비 시간을 단축합니다.",
        tone: "muted",
      },
    ],
    technicalSpecs: [
      { item: "수평 하중 용량", specification: "10 kN" },
      { item: "수직 하중 용량", specification: "50 kN" },
      { item: "전단 속도", specification: "0.0001 ~ 9.999 mm/min" },
      { item: "데이터 샘플링", specification: "최대 100 Hz" },
      { item: "시편 크기", specification: "60 x 60 mm / 100 x 100 mm" },
      { item: "인터페이스", specification: "USB, Ethernet" },
      { item: "전원", specification: "AC 220V, 60Hz" },
    ],
    relatedSlugs: ["qt-2000x", "q-wtt-pro", "env-chamber-pro"],
    relatedDescription:
      "지반 안정성 평가와 기초 설계 검증에 필요한 전단 강도 데이터를 디지털 방식으로 제공합니다.",
  },
  {
    slug: "q-wtt-pro",
    category: "ASPHALT",
    categoryLabel: "아스팔트 시험기",
    cardTag: "ASPHALT-ROAD-07",
    model: "MODEL: Q-WTT-PRO",
    itemCode: "ASPHALT-ROAD-07",
    catalogCategory: "포장 품질 분석 시스템",
    title: "아스팔트 휠 트래킹 시험기",
    summary: "포장 재료의 소성 변형 저항성을 평가하는 정밀 시험 솔루션입니다.",
    description:
      "포장 재료의 소성 변형 저항성을 평가하는 정밀 시험 솔루션입니다. 고온 환경에서도 반복 하중 특성을 안정적으로 재현해 아스팔트 배합의 내구성을 검증합니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDH3vSEXulWKVxXmR_f0mIvdGqn3ZHxfW11V-ORlhTqg9IvpzxRuwm2qac9bg0zSdWzFNaXJVQhNXH3O2E596Xjubyg4wIYjHTAtPVeTBK65fcOOyWHSqHZ3m1HO4CfyoYq5KxvuSFsKXFmLqJ_ME7KpMwwYkTEKuiG86VoyyJ6KxYAGLPQU3nIqUyPghbrNypCba8d5aFYNDMnIV37TRDqXeo9xpW834UCP8Z0yFrQuGgkEsJc0bRJW6r-Rm-qSNiFQh9ayqQe9zvy",
    alt: "Asphalt wheel tracking testing machine with industrial chamber",
    badge: "PREMIUM",
    badgeTone: "bg-primary text-white",
    specs: [
      { label: "온도 범위", value: "상온 ~ 80°C" },
      { label: "하중 정밀도", value: "± 1%" },
      { label: "특징", value: "실시간 그래프 분석" },
    ],
    gallery: [
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDH3vSEXulWKVxXmR_f0mIvdGqn3ZHxfW11V-ORlhTqg9IvpzxRuwm2qac9bg0zSdWzFNaXJVQhNXH3O2E596Xjubyg4wIYjHTAtPVeTBK65fcOOyWHSqHZ3m1HO4CfyoYq5KxvuSFsKXFmLqJ_ME7KpMwwYkTEKuiG86VoyyJ6KxYAGLPQU3nIqUyPghbrNypCba8d5aFYNDMnIV37TRDqXeo9xpW834UCP8Z0yFrQuGgkEsJc0bRJW6r-Rm-qSNiFQh9ayqQe9zvy",
        alt: "Asphalt wheel tracking test equipment",
      },
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDMCwLI6cc3ONTIVdOT9fmsDXb00Cj4iBPdbZ9sSE50Tmf0-pWgD4CRzf0lmKsWAGNQ08r1YQeOQySvu_8UvGkrri8tsW_xbtg8znjx_F9RQNSmiXEOcD3ikp5j0wK5XhRq7Z_1c2y_weF0QTMxlpyGNzIEJPFf1kvsTbrMC_9TlgeKNRPO15LYtQAou4AF9KglCx3hsgsHZStHpdB_aN3PkbLngy63t9suAe4UPwtxzzsvZbrD7ccZiWIyeffiNxTWzGUgvhCDfkbM",
        alt: "Compression testing environment for road material analysis",
      },
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBSPEe8cr3MIQWgeWjkIAttdhIvsJS-2wpzBjl7uQNpp3s9uOY78mAXb9Z_a2Pj9J13QHH08unjBBDmTrcxBcXl2PXHkGPpM9x72tKssg2Z_7024m5p2CQoD3A5guh8AVT4UL8q0kwR0hYVZDc39d_TvtQNQknnL97atjQDE5QzEmd1s0Ib0pbcdUPHR3JYUTd2OZkeKbVkVOFq5ml1BX2Yoaj0Htgcul8zPkvfkr1Q_fuD7yuvUsawDWha-e4LZavBrBfv1eNuMcKB",
        alt: "Mechanical drive system of tracking equipment",
      },
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAKNEXv16t32SG2qh9YfYVF-D0p1fpD_v3T2IY9vLAZ3DLsNkZ6t6Q5TBmCz7gTF9_38aKZVyuSAc5VuKQpLRaqzeuKjoLTlRaIOFaDmccCt4ktw6t-xRw3oCruXtgS-cUVgE9mV2aTXlVxOaifyyyHDQXmK5QE_IPGELTekLjfo4H396jt4PoEQdP5na5ODis7Y1lD1Udaer6mL2ycJLLR7-Ay71ztMdilYt0y80XRL7OKekwGyzJ02ynxajwN-G8x1x3F4ksVm-kX",
        alt: "Asphalt sample under load testing",
      },
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAu8btv6LBDQODu3CEd6AommqbVwsj4G3baYro4rpujByT8EEGfwkm7fAgkivQiP6-WWLAqqt3Dxr-w2f1_MtU8Az3O_Zh665dOFAdKz34kQ_umrx92HGGBZT3CRim8CJ1iYMr8Iaocvigra-jjKUFaT-frjVHEg9DpX3kqxgnHVoJR7QJSFmEi_qFj3AmEmtc5zhBv-xVXq01a4X4PtxMNZ4GFdXiv_A4j28IXPlVYQIgaui96m28EolqZ6U_qrf3NHsWI13avDpqd",
        alt: "Road testing schematic visualization",
      },
    ],
    features: [
      {
        icon: "wrench",
        title: "고온 챔버 일체형 구조",
        description:
          "포장 시료의 고온 변형 거동을 실제 환경과 유사한 조건에서 재현합니다.",
        tone: "light",
      },
      {
        icon: "chart",
        title: "변형 추이 자동 기록",
        description:
          "반복 하중에 따른 깊이 변화와 소성 변형량을 자동으로 기록하고 시각화합니다.",
        tone: "primary",
      },
      {
        icon: "shield",
        title: "시험 반복 안정성",
        description:
          "정밀 가이드 레일과 하중 보정 로직으로 장시간 시험에서도 반복성이 우수합니다.",
        tone: "surface",
      },
      {
        icon: "sliders",
        title: "배합 조건별 레시피 저장",
        description:
          "프로젝트별 배합 조건과 시험 프로파일을 저장해 재현 시험을 빠르게 수행할 수 있습니다.",
        tone: "muted",
      },
    ],
    technicalSpecs: [
      { item: "온도 제어 범위", specification: "Ambient ~ 80°C" },
      { item: "하중 적용 방식", specification: "Reciprocating Wheel Load" },
      { item: "하중 정확도", specification: "±1%" },
      { item: "시험 속도", specification: "42 cycles/min" },
      { item: "변위 측정 해상도", specification: "0.001 mm" },
      { item: "시편 크기", specification: "300 x 300 x 50 mm" },
      { item: "전원", specification: "AC 220V / 60Hz" },
    ],
    relatedSlugs: ["qt-2000x", "q-utm600", "env-chamber-pro"],
    relatedDescription:
      "아스팔트 배합의 소성 변형 저항성과 고온 안정성을 평가하는 프리미엄 테스트 장비입니다.",
  },
  {
    slug: "q-utm600",
    category: "METAL",
    categoryLabel: "금속/재료 시험기",
    cardTag: "UTM-SERIES",
    model: "MODEL: Q-UTM600",
    itemCode: "UTM-SERIES",
    catalogCategory: "만능 재료 분석 시스템",
    title: "만능 재료 시험기 (600kN)",
    summary:
      "금속과 복합 소재의 인장, 압축, 굴곡 시험을 하나의 플랫폼에서 처리합니다.",
    description:
      "금속과 복합 소재의 인장, 압축, 굴곡 시험을 하나의 플랫폼에서 처리합니다. 서보 유압 제어와 고정밀 센서 조합으로 다양한 표준 시험을 안정적으로 수행할 수 있습니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAdic56jWRaN3ABm0iFONiRrrJzOjsuIa_7C2aIWYnDBOMg1Ot10vaCYJ9FGE9McMvxf36lsAWJkXA3pQ4zb6_DkOXc_GUozWdeDCDLCSFh0B03QwbTBwkUza8hoWhbL3EKEBf1bp2Z4pyWhspef9FQkI3rINd_344nAy0h76OzCVZiSKFZ3zUX0mZCRLWH0HtvtS7zwoKxTvyPLOxiZ0PijWlLnv-IsUIPoOyV6If1qPvVGOV4KIwp1AAfq0w6b_14FP61rXXlCA1M",
    alt: "Universal testing machine for metals in a laboratory",
    specs: [
      { label: "시험 항목", value: "인장, 압축, 굴곡" },
      { label: "측정 범위", value: "0.4% ~ 100% FS" },
      { label: "구동 방식", value: "Servo Hydraulic" },
    ],
    gallery: [
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAdic56jWRaN3ABm0iFONiRrrJzOjsuIa_7C2aIWYnDBOMg1Ot10vaCYJ9FGE9McMvxf36lsAWJkXA3pQ4zb6_DkOXc_GUozWdeDCDLCSFh0B03QwbTBwkUza8hoWhbL3EKEBf1bp2Z4pyWhspef9FQkI3rINd_344nAy0h76OzCVZiSKFZ3zUX0mZCRLWH0HtvtS7zwoKxTvyPLOxiZ0PijWlLnv-IsUIPoOyV6If1qPvVGOV4KIwp1AAfq0w6b_14FP61rXXlCA1M",
        alt: "Universal testing machine in clean industrial lab",
      },
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBkYG5nD_MrlNi7DS3K7iAc60W4dxmHTwNyW-IbnHdYjn2fbqTw-w3V0YbOlRMZxyxGWHakm-ERUVtUmerkkmjzobA9wJpyL7Cx_qfG3zoLAeIecQ72l5SpRjcvgY0I9cEolHxyZ50FrdfJV6Jpzn_eZ6GBRJ2K6ZgL1sp104E_m-RGOjC0gmbeaKF1434rL0wK_4aVEXP0WsfU8tLoDFuIBLMNHoRjiVxa2QEChem8pwdOo9bNHSo1cWvVfeCW03JfiUsP_A30ZXRw",
        alt: "Material structure analysis in quality control center",
      },
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBSPEe8cr3MIQWgeWjkIAttdhIvsJS-2wpzBjl7uQNpp3s9uOY78mAXb9Z_a2Pj9J13QHH08unjBBDmTrcxBcXl2PXHkGPpM9x72tKssg2Z_7024m5p2CQoD3A5guh8AVT4UL8q0kwR0hYVZDc39d_TvtQNQknnL97atjQDE5QzEmd1s0Ib0pbcdUPHR3JYUTd2OZkeKbVkVOFq5ml1BX2Yoaj0Htgcul8zPkvfkr1Q_fuD7yuvUsawDWha-e4LZavBrBfv1eNuMcKB",
        alt: "Servo hydraulic drive assembly",
      },
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAKNEXv16t32SG2qh9YfYVF-D0p1fpD_v3T2IY9vLAZ3DLsNkZ6t6Q5TBmCz7gTF9_38aKZVyuSAc5VuKQpLRaqzeuKjoLTlRaIOFaDmccCt4ktw6t-xRw3oCruXtgS-cUVgE9mV2aTXlVxOaifyyyHDQXmK5QE_IPGELTekLjfo4H396jt4PoEQdP5na5ODis7Y1lD1Udaer6mL2ycJLLR7-Ay71ztMdilYt0y80XRL7OKekwGyzJ02ynxajwN-G8x1x3F4ksVm-kX",
        alt: "Specimen gripping during a material strength test",
      },
      {
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAu8btv6LBDQODu3CEd6AommqbVwsj4G3baYro4rpujByT8EEGfwkm7fAgkivQiP6-WWLAqqt3Dxr-w2f1_MtU8Az3O_Zh665dOFAdKz34kQ_umrx92HGGBZT3CRim8CJ1iYMr8Iaocvigra-jjKUFaT-frjVHEg9DpX3kqxgnHVoJR7QJSFmEi_qFj3AmEmtc5zhBv-xVXq01a4X4PtxMNZ4GFdXiv_A4j28IXPlVYQIgaui96m28EolqZ6U_qrf3NHsWI13avDpqd",
        alt: "Engineering schematic for universal test system",
      },
    ],
    features: [
      {
        icon: "wrench",
        title: "다기능 시험 프레임",
        description:
          "인장, 압축, 굴곡 지그를 빠르게 교체해 다양한 재료 시험에 대응합니다.",
        tone: "light",
      },
      {
        icon: "chart",
        title: "고속 샘플링 데이터 처리",
        description:
          "시험 중 하중-변위 데이터를 고속으로 취득하여 정밀한 파괴 시점을 기록합니다.",
        tone: "primary",
      },
      {
        icon: "shield",
        title: "서보 유압 안정성",
        description:
          "서보 밸브와 자동 제어 알고리즘이 안정적인 시험 속도 유지와 반복성을 보장합니다.",
        tone: "surface",
      },
      {
        icon: "sliders",
        title: "시험 프로토콜 자동화",
        description:
          "표준별 시험 프로토콜을 저장하고 한 번의 실행으로 자동 리포트를 생성합니다.",
        tone: "muted",
      },
    ],
    technicalSpecs: [
      { item: "최대 하중", specification: "600 kN" },
      { item: "하중 정확도", specification: "Class 0.5" },
      { item: "시험 속도", specification: "0.001 ~ 500 mm/min" },
      { item: "컬럼 간 거리", specification: "550 mm" },
      { item: "수직 스트로크", specification: "900 mm" },
      { item: "제어 방식", specification: "Servo Hydraulic" },
      { item: "전원", specification: "AC 380V, 3-Phase" },
    ],
    relatedSlugs: ["qt-2000x", "materialscope-pro", "env-chamber-pro"],
    relatedDescription:
      "금속, 플라스틱, 복합소재의 기계적 특성을 하나의 플랫폼에서 시험할 수 있는 범용 시스템입니다.",
  },
  {
    slug: "qt-utm100",
    category: "UTM",
    categoryLabel: "범용 재료 시험기",
    cardTag: "UTM-SERIES",
    model: "MODEL: QT-UTM100",
    itemCode: "UTM-SERIES",
    catalogCategory: "범용 강도 측정",
    title: "범용 인장 압축 시험기 (QT-UTM100)",
    summary:
      "금속, 플라스틱 등 다양한 소재의 물리적 성질을 측정할 수 있는 다목적 장비입니다.",
    description:
      "금속, 플라스틱 등 다양한 소재의 물리적 성질을 측정할 수 있는 다목적 장비입니다. 소형 연구소와 품질 관리 라인에서 효율적으로 활용할 수 있는 컴팩트 모델입니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDlpB4BVc4H_UBy2vpGGywhSSu3x-08Jx_zLXtvFZK6-Z3UGqdWtO18pfZOaltzClWWcL6cCDHVu_Bh10VTqT6uuB8txkDyMIw-WWam-motDZnnASu71C_FkHlNtPXEAuqd7lg5l6uCTxJI-dKeRewSN8xKdZSA0X1rdzWto5P-KoYNjaChwnBzb0s213y3uXwXOzaW7JBD87Y_pSedClKW9IQVxGt_jdI2clSYFuJW2pgsfNiwMFdSjUaUMNJoOYZvVY6ISKy4NZJF",
    alt: "Universal testing machine in a white industrial lab space",
    specs: [
      { label: "최대 하중", value: "100 kN" },
      { label: "시험 항목", value: "인장, 압축" },
      { label: "제어 방식", value: "전자 제어식" },
    ],
    gallery: [],
    features: [],
    technicalSpecs: [],
    relatedSlugs: ["qt-2000x"],
    relatedDescription:
      "금속, 플라스틱 등 다양한 소재의 물리적 성질을 측정할 수 있는 다목적 장비입니다.",
  },
  {
    slug: "materialscope-pro",
    category: "ANALYSIS",
    categoryLabel: "분석 장비",
    cardTag: "ANALYSIS-TOOL",
    model: "MODEL: MS-PRO",
    itemCode: "ANALYSIS-TOOL",
    catalogCategory: "재료 구조 분석",
    title: "재료 구조 분석 현미경",
    summary:
      "미세 구조의 정밀 분석을 통해 재료의 결함 및 결정 구조를 파악합니다.",
    description:
      "미세 구조의 정밀 분석을 통해 재료의 결함 및 결정 구조를 파악합니다. 연구소, 대학, 품질 검사 센터에 최적화된 고배율 분석 장비입니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBkYG5nD_MrlNi7DS3K7iAc60W4dxmHTwNyW-IbnHdYjn2fbqTw-w3V0YbOlRMZxyxGWHakm-ERUVtUmerkkmjzobA9wJpyL7Cx_qfG3zoLAeIecQ72l5SpRjcvgY0I9cEolHxyZ50FrdfJV6Jpzn_eZ6GBRJ2K6ZgL1sp104E_m-RGOjC0gmbeaKF1434rL0wK_4aVEXP0WsfU8tLoDFuIBLMNHoRjiVxa2QEChem8pwdOo9bNHSo1cWvVfeCW03JfiUsP_A30ZXRw",
    alt: "Scientific microscope used for material structure analysis",
    specs: [
      { label: "배율", value: "50x ~ 1000x" },
      { label: "이미징", value: "4K Digital Capture" },
      { label: "용도", value: "결함 및 조직 분석" },
    ],
    gallery: [],
    features: [],
    technicalSpecs: [],
    relatedSlugs: ["qt-2000x"],
    relatedDescription:
      "미세 구조의 정밀 분석을 통해 재료의 결함 및 결정 구조를 파악합니다.",
  },
  {
    slug: "env-chamber-pro",
    category: "ENV",
    categoryLabel: "환경 시험 장비",
    cardTag: "ENV-CHAMBER",
    model: "MODEL: EC-PRO",
    itemCode: "ENV-CHAMBER",
    catalogCategory: "환경 내구성 시험",
    title: "항온항습 만능 시험기",
    summary:
      "극한의 온도 및 습도 환경에서 재료의 내구성을 평가하는 챔버형 장비입니다.",
    description:
      "극한의 온도 및 습도 환경에서 재료의 내구성을 평가하는 챔버형 장비입니다. 장시간 반복 시험과 환경 스트레스 재현에 적합합니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBP6j8UbcBsr5G-OPLpWP4WtvmMmMFrb_Ln1mCb5bzbIvZg5HU8Q364teFdlfGJC-r1OeukDCvAUuIGxf0zIsz7lvwRyXeZwqQUpQoWoFpCO7Yw59RD6EU5agEQotjOE26cco7KpIfOgCZvbbIHizI24DcF9sRLqYOOEZI4W58c_GxRAmimHEUiQOmPbA-Qo971vkv-vIGnZXkxZlUOqFj9KA9adVxwPJbwW8Q2fWGqlVZVJxBR3g7DMRyuUMeVKe3B6cuMdlBmica_",
    alt: "Industrial climate control chamber for environmental stress testing",
    specs: [
      { label: "온도 범위", value: "-40°C ~ 150°C" },
      { label: "습도 범위", value: "20% ~ 98% RH" },
      { label: "용도", value: "내구성 평가" },
    ],
    gallery: [],
    features: [],
    technicalSpecs: [],
    relatedSlugs: ["qt-2000x"],
    relatedDescription:
      "극한의 온도 및 습도 환경에서 재료의 내구성을 평가하는 챔버형 장비입니다.",
  },
];

export const featuredEquipment = equipmentCatalog.filter((item) =>
  ["qt-2000x", "q-dss10", "q-wtt-pro", "q-utm600"].includes(item.slug),
);

export function getEquipmentBySlug(slug: string) {
  return equipmentCatalog.find((item) => item.slug === slug);
}
