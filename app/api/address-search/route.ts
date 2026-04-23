import { NextRequest, NextResponse } from "next/server";

type JusoCommon = {
  errorCode?: string;
  errorMessage?: string;
};

type JusoAddressRow = {
  roadAddr?: string;
  jibunAddr?: string;
  zipNo?: string;
  siNm?: string;
};

type JusoResponse = {
  results?: {
    common?: JusoCommon;
    juso?: JusoAddressRow[];
  };
};

export async function GET(request: NextRequest) {
  const keyword = (request.nextUrl.searchParams.get("keyword") ?? "").trim();

  if (keyword.length < 2) {
    return NextResponse.json(
      { message: "검색어를 2자 이상 입력해 주세요." },
      { status: 400 },
    );
  }

  const confmKey = "devU01TX0FWEgyMDI2MDQyMzE2NTEwNzExNzk5MDg=";
  if (!confmKey) {
    return NextResponse.json(
      { message: "JUSO_CONFM_KEY is not configured." },
      { status: 500 },
    );
  }

  const endpoints = [
    "https://business.juso.go.kr/addrlink/addrLinkApi.do",
    "https://www.juso.go.kr/addrlink/addrLinkApi.do",
  ];

  let lastErrorMessage = "주소 검색에 실패했습니다.";

  for (const endpoint of endpoints) {
    const url = new URL(endpoint);
    url.searchParams.set("confmKey", confmKey);
    url.searchParams.set("currentPage", "1");
    url.searchParams.set("countPerPage", "10");
    url.searchParams.set("keyword", keyword);
    url.searchParams.set("resultType", "json");

    try {
      const response = await fetch(url.toString(), {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        lastErrorMessage = `주소 검색 API 호출 실패 (${response.status})`;
        continue;
      }

      const data = (await response.json()) as JusoResponse;
      const common = data.results?.common;
      const errorCode = common?.errorCode ?? "0";

      if (errorCode !== "0") {
        lastErrorMessage = common?.errorMessage ?? "주소 검색에 실패했습니다.";
        continue;
      }

      const rows = data.results?.juso ?? [];
      const items = rows.map((row) => ({
        roadAddr: row.roadAddr ?? "",
        jibunAddr: row.jibunAddr ?? "",
        zipNo: row.zipNo ?? "",
        siNm: row.siNm ?? "",
      }));

      return NextResponse.json(items);
    } catch {
      lastErrorMessage = "주소 검색 서버 연결에 실패했습니다.";
    }
  }

  return NextResponse.json({ message: lastErrorMessage }, { status: 400 });
}
