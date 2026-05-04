import type {
  AddressSearchResult,
  ApiError,
  DeliveryFeeOption,
} from "./checkout-preview-types";

function normalizedRegionMatches(region: string, candidates: string[]) {
  const normalized = region.trim().toLowerCase();

  return candidates.some(
    (candidate) =>
      normalized === candidate ||
      normalized.includes(candidate) ||
      candidate.includes(normalized),
  );
}

function findMatchedRegion(
  candidates: string[],
  regionOptions: DeliveryFeeOption[],
) {
  const matched = regionOptions.find((option) =>
    normalizedRegionMatches(option.region, candidates),
  );

  return matched?.region ?? null;
}

export function resolveRegionFromAddressResult(
  result: AddressSearchResult,
  regionOptions: DeliveryFeeOption[],
) {
  const candidates = [result.siNm, result.roadAddr.split(" ")[0]]
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  if (candidates.length === 0) {
    return null;
  }

  return findMatchedRegion(candidates, regionOptions);
}

export function resolveRegionFromAddressText(
  addressText: string,
  regionOptions: DeliveryFeeOption[],
) {
  const tokens = addressText
    .trim()
    .split(/\s+/)
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean);

  if (tokens.length === 0) {
    return null;
  }

  const candidates = [tokens[0], tokens.slice(0, 2).join(" ")].filter(Boolean);
  return findMatchedRegion(candidates, regionOptions);
}

export async function readApiErrorMessage(
  response: Response,
  fallback: string,
) {
  try {
    const data = (await response.json()) as ApiError;
    return data.message ?? data.error ?? fallback;
  } catch {
    return fallback;
  }
}
