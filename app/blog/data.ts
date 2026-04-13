export type BlogPost = {
  slug: string;
  category: string;
  date: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export const featuredInsight: BlogPost = {
  slug: "construction-quality-trends-2024",
  category: "Industry News",
  date: "2024.05.15",
  title: "2024 건설 품질 관리 트렌드: 자동화 및 비파괴 검사 기술의 진화",
  description:
    "최신 스마트 건설 기술과 비파괴 검사 장비의 결합이 어떻게 현장의 안전과 정확도를 높이는지 심층적으로 분석합니다.",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD2528NEttkRKktwlYB2ZQ6VozY6sqKcIZlHvGZq85LgwGTrGYAymf_kVa9J6ChTO3iexUtH4X4GpfX-PWM1uvMLRgbt82EzJ5MgNX3S13BxaKXAWGCVA0GxtaZAbsXu51ojhTKzlzDRX1Jes6rWSZc6y8vLn5xLWdnzCJvekNe2ANJ7UkUYz1h62LY1OeuYrzZhQ7wnMCYg9L8u6JMTYMYpW1M19F6SAq7VycOIECFNidMiEm6REN8sK_Fia-zp79eBHbYBrdg1i5l",
  alt: "Industrial laboratory setting with advanced testing equipment and engineers",
};

export const blogCategories = [
  "전체보기",
  "Technical Guide",
  "Industry News",
  "Maintenance",
  "Case Study",
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "load-measurement-calibration-cycle",
    category: "Technical Guide",
    date: "2024.05.10",
    title: "정밀 하중 측정 장비의 캘리브레이션 주기 및 중요성",
    description:
      "시험 장비의 정확도는 결과의 신뢰도와 직결됩니다. 오차 범위를 줄이기 위한 표준 캘리브레이션 절차와 적정 주기를 안내합니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAs3DURjk1jzWJeof4puphgHlnP9Nrfb_VMnwzimkiOM9kaL7Ag2_oFhZ5hyMPbgAvAjARuYEmTweV3b0jf5-xshhr2Eb5UmlsWPsb1zxE-m1j8RU2QKiOFd0GYyNT-DfD0CIfSpW-4yL5X0VLpddMxGSY-Ek04RQL_TEnhPO2aG0iI0-r9U8WECNS_dcqruxp6ybu_cD0mALRFMc9bR4W628Fq4RWsm8EA8hNtMdc0LLWwAceQv6TsiuniEokbGREAZMwLFyFBo6JH",
    alt: "Digital precision measurement tool showing technical data",
  },
  {
    slug: "winter-concrete-strength-testing-protocol",
    category: "Maintenance",
    date: "2024.05.02",
    title: "동절기 콘크리트 압축 강도 시험 시 주의사항",
    description:
      "저온 환경에서 발생할 수 있는 데이터 오류를 방지하기 위한 시험체 양생 관리 및 장비 예열 프로토콜을 소개합니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCsLLAZQeQUOl4nft_vEKml1fP7tnFK7xiAPOIFa3qRf2U8y7_5ez3RuvTNxiwkhDvMK6hzG1qpOKWjKPIUblpJ96TK2MXS1XCEq2rjdhh6TpChGPduM9PrXQhJk42gb13lpZ4xUeaUTqrFeYrVjRcdfcuHEGGPH-qc3rTVnQjiv2O7CZgvNpV1gb_o_9jngwKrlXShQdee-cluZQyv6KMt_Wh3AyyzgAayI_teg66Eqw5mY-3ul-vLvt9eFaFBrWE__P2o7WbybUy1",
    alt: "Maintenance worker checking heavy machinery in a workshop",
  },
  {
    slug: "quality-management-guideline-kcsc",
    category: "Industry News",
    date: "2024.04.28",
    title: "국가 건설 기준 개정에 따른 품질 관리 강화 지침 안내",
    description:
      "최근 변경된 건설 표준 코드(KCSC)에 따른 품질 시험 필수 항목 변화와 대응 방안에 대해 요약해 드립니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKxMhT1zT29SgWveNZtgi3hBnPbNYF1YBLJaZaAdqpj7FhEF6J3ITydPbcJ_gXWWIcZODHm-7HyEoiaCv-RX5J0N8wUHAAFHoE4WB-MNNPqaAQoClczB0cxcoHqt4Qd8LFAbjIq6RY1GI6xTRjCMH8ghshDDkgfDOy9meC2t9yPgBrCC12HjmsTee6rPEYI1BGGXdKz6XcgM_oM1MetBavcfkFQyFk05VJaGlVtQDFpfA-mQZMtS0UZKTYeL2BFxuE_RcN_FQVWy2m",
    alt: "Construction site with heavy cranes and steel structures",
  },
  {
    slug: "digital-loadcell-maintenance-guide",
    category: "Technical Guide",
    date: "2024.04.15",
    title: "디지털 로드셀 센서 유지보수 및 자가 진단 가이드",
    description:
      "로드셀의 제로점 표류(Zero Drift) 현상을 해결하고 장기적인 수명을 보장하기 위한 일상 점검 체크리스트입니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKzc5Tvaktz0JucLNiJZzZNcw63SsEYxvEjOOhI0eNWpTpDwTdGVu6b18QmR_oh5icZNyd2OxmlS1ulAcu1uqV_XpkmuFzXVZ4qdtjXKNF3ec6UV50Wrpt1Mf40EHwHGyiBDrrmk3No7CqaoAUZo_HV8eB5Vw1KRmbowae3ktZ0-xI7IcZKFlVztVD-RyRMEyvLWT3ZbIdSCjZul2wEl6ILjHopcYNeFJkNABSm3IxULovHXc58AHFHAWPG8304DvYEqdu2-e-Q4be",
    alt: "Technician operating a large hydraulic press machine in a laboratory",
  },
  {
    slug: "testing-lab-space-design-guide",
    category: "Case Study",
    date: "2024.04.05",
    title: "시험실 구축을 위한 공간 설계 및 유의사항",
    description:
      "효율적인 동선 확보와 정밀 장비의 진동 차폐를 위한 시험실 공간 설계의 핵심 요소들을 정리했습니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuALSzPg5APVR2779Gt_OXHsd0eRiNapscAjRzpZfq_zEENT_Konzq67cEa1blPhI11MQq4jR2cv3TxDIioAcdag2-jyd-QfPwJ9cepQGb7fPHr-Tpj-u8sSXEXKwlYpNY-a7_CFOPwKLsjdU9unOnuUFNGH46eHZ1F7qV0qM5SoLF2x3oEiPNyLceMOUCXwxyyNDg0GWdgqNXPEFiCVkkslTLv8as2TY0U4zxVC65gRtaNeg5Ua_hGOz3QEshr1z4ujXA7z0zfpCShJ",
    alt: "Architectural blueprint on a desk with magnifying glass and hard hat",
  },
  {
    slug: "global-steel-testing-expo-review",
    category: "Industry News",
    date: "2024.03.22",
    title: "글로벌 철강 시험 장비 기술 박람회 참관 후기",
    description:
      "독일 뒤셀도르프에서 열린 최신 산업 박람회를 통해 본 유럽의 차세대 시험 장비 트렌드와 국산화의 과제.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAcEt1W11hMi-Sl9hEM0iMC3O-MM3SLRovxIETIvDWKe7FEjjSVCkgtAk9YSA3iPft-kSEk2tZJnnKWWY-K-_5GLJ4ypG37oFKFMAPrMpmmNgAuhW74OYC7ZYpSAybFDtfJDOHixJSX9nme4Muet-F5_pNb_F9VzwXAcb3IwhFhNSCqY7nhVi39Ua9tgrh1Tu-SOMf-ME0FrhuhEyYKT7KC9m_vOmBAol8mo5vV4mUfn7eVZcMgHRs0nZ-axzhi3HhTeitA1SyElEOP",
    alt: "Abstract close-up of industrial steel beams with geometric shadows",
  },
];

export const blogPreviewPosts = blogPosts.slice(0, 2);
