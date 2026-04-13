export type FieldCase = {
  slug: string;
  category: string;
  title: string;
  description: string;
  solutionLabel: string;
  image: string;
  alt: string;
};

export const caseCategories = [
  "전체보기",
  "교량/토목",
  "건축/플랜트",
  "안전진단",
] as const;

export const fieldCases: FieldCase[] = [
  {
    slug: "oo-bridge-quality-testing",
    category: "교량/토목",
    title: "OO대교 현장 품질시험 지원",
    description:
      "특수 교량 상부 슬래브 타설 단계에서 콘크리트 강도 및 탄성 계수 실시간 모니터링 시스템을 도입하여 정밀 시공을 지원했습니다.",
    solutionLabel: "TECHNICAL SOLUTION",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBCVkEArKlNYLHYni36CGhwyg27U4-yiijc5Nx9nah7Kez-QanBCWSFI6HuxKPmovl5AK2hrjQ7t6L2QoD3D62L2lokWpOEKl4hx-4n5AwgyE5-WwPElBcKP_TX8MCvUCa2s39qoMHdf-JeFjQ04z9BVtq0_Z90xcmiG7hKrWr0_5_YmBih7_ijarxllvS43jUVxxGwIu8PdInrwOx91GHknJxDWSBDgcybPGSsEs1VAzwKmQMBGv-hBgFBurlNc6rU-rTRSgu5dseF",
    alt: "Massive concrete bridge construction site with cranes and industrial equipment at sunrise",
  },
  {
    slug: "technovalley-complex-monitoring",
    category: "건축/플랜트",
    title: "테크노밸리 복합단지 신축",
    description:
      "대규모 지하 공간 굴착 시 주변 지반 변위 계측 및 구조물 안전성 검토를 통해 무재해 시공 달성에 기여한 사례입니다.",
    solutionLabel: "DIGITAL TWIN MONITORING",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBqxWVYIptFgv9OhGdgxSCTXYSrEwqvAkj0Ia8f7xjyB61YanDwS9apGVMMLsNJsQ8NWzig1ZkZ7IC21Pjk3AwLC9rNdvcM7uNhHALRVPhblAL0PcWU5Xi7vFgvdaxy_U6XOMM4ewHnJBdeHGQmxfN63bnlusOV87-S1HPV1eoi7hMiX_YYxyYr4NmLRKMw1ad75YkFm046mldncXV1dMqC7JIfzRkeQUAm3ZhDoSkU4yz8_k3DpcPNB-LHvRK11IYImvrty-MgT2TQ",
    alt: "Architectural complex under construction with glass facades and steel frame structure",
  },
  {
    slug: "metropolitan-safety-diagnosis",
    category: "안전진단",
    title: "수도권 1기 신도시 정밀안전진단",
    description:
      "노후 주거 단지의 콘크리트 중성화 및 철근 부식도를 정밀 분석하여 보수/보강 공법 결정을 위한 데이터 베이스를 구축했습니다.",
    solutionLabel: "SAFETY INSPECTION",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBGaXjV3oDOAY5qeNZFBeJBgAlCZedK53oiK9K3QM-wt5IbQ2eLo2VArEWBZDjFicekTRlLwQIbbMrfWkyP-ElozsWOjkIsTU6E4GgG46Tg0EBmi5dLOm1PW59sRMclQlYzI8cYjoa6T4tA0vVWc0GZJXyYeQwBEcRNRSu64QKovGAADNVarQQTebgIJC_UnohtK50jV18_t9A867JHmp9FzwBZs9zHYZYvY3R3d9YRTmKVTqOU41BBVVYpov9UzGLvH6z5q9zFGeA9",
    alt: "Industrial plant with large pipes and metal structures during inspection",
  },
  {
    slug: "metro-tunnel-structural-analysis",
    category: "교량/토목",
    title: "광역철도 OO구간 터널 시공 지원",
    description:
      "터널 굴착면의 내공변위 및 숏크리트 두께 측정을 통한 막장 안전성 확보 솔루션을 제공했습니다.",
    solutionLabel: "STRUCTURAL ANALYSIS",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_Pe7QiHc6KiEK01FOVVSS8sr81zSRXcRMTi-javHGtqyYVpVgXitalXdZB5y17qsS7Q9FDBupfI3satJwRiBQVXU04zLIW1Q7GtDeiUKcLg05mcGeHlMWCt9flGm9oBLjtBrYDTT5iRBHMkAEdIUoVW4YBegvfWcgS3Z3ScBQ6z7be_7JCQs4C3Mfr5SROLiS7mf9dNZyWEO7MxocME_HUygHO3o2-9sBHewC3fiAGusJ3-3ozapMZcNju7YLhqGYXEKoIOrpL5AB",
    alt: "Interior of a large concrete tunnel construction with industrial ventilation pipes",
  },
  {
    slug: "global-datacenter-precision-survey",
    category: "건축/플랜트",
    title: "글로벌 데이터센터 신축 정밀검측",
    description:
      "고정밀 진동 제어가 요구되는 데이터센터 바닥판의 평탄도(FF/FL) 검측 및 무진동 설비 기초 보강 설계를 지원했습니다.",
    solutionLabel: "PRECISION MEASUREMENT",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDWuqSzxcT9YwjpEkt8_jjHasaapWI4bLbemzoQ8ZfDo8I2FXJ9OPHQkPfIgfK1XP-pM9pzAVFLS2nCS2Yk7Ym0ce3kdk72h_3HBuyXP73OSIfbqJrj5lANBBe7kEe1uilHxB8JIYBwoOaXKgwm6wJAH8DeQ8M-WSH21SFLxSxCJbdCOGYJ_Om5qDoECVALVXDq_-avsUWFii3lbArkMYJmU7DkfDmhg9PSRNcAbuqpgJz0o5R8Injs6dwaZmSNm6k7wbkcSUqW1IEH",
    alt: "Modern data center facility with intricate electrical systems during technical audit",
  },
  {
    slug: "offshore-wind-foundation-durability",
    category: "안전진단",
    title: "해상 풍력단지 기초 구조물 진단",
    description:
      "해수 노출 환경에서의 콘크리트 내구성 및 전위 측정을 통해 기초 구조물의 잔존 수명 예측 진단을 수행했습니다.",
    solutionLabel: "DURABILITY FORECAST",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-84jKBdj6fwuF1SC6NAAMurdMaoz8XsDGhV6Cla1_tDJTtUuSToZD-6zm14Y3w88GQZ9M1ZNzNkSRF9UChxVd_6Pt2RXfOBZIF0lYkClinv0_XzfsH5W8vZD8oGmhDsOLrzYa3q9FZQGiNjnGpsObf4I9oFBREJFjz7wsE_8sBce7OsIP_Ad7ZvShLVqS-nEcSUY_ZV-HtSIY--V-0OXvW8qrUic3PJaYfSjD-98eGxsBnngVdKeCt8OUa_2VW8PVaC910ZsbDAuw",
    alt: "Ocean wind farm construction with giant turbine bases installed in deep water",
  },
];

export const homeFieldCasePreview = fieldCases.slice(0, 2);
