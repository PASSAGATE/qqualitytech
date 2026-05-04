export type DeliveryMethod = "delivery" | "pickup";

export type CheckoutPreviewItem = {
  cartItemId: string;
  equipmentId: string;
  equipmentName: string;
  equipmentCode: string | null;
  mode: "buy" | "rent";
  count: number;
  rentalMonths: number | null;
  unitPrice: number;
  lineTotal: number;
};

export type CheckoutPreviewResponse = {
  deliveryMethod: DeliveryMethod;
  buyOrderPreview: {
    itemCount: number;
    subtotal: number;
    items: CheckoutPreviewItem[];
  };
  rentOrderPreview: {
    itemCount: number;
    subtotal: number;
    items: CheckoutPreviewItem[];
  };
  deliveryFee: number;
  totalPrice: number;
};

export type ApiError = {
  message?: string;
  error?: string;
};

export type DeliveryFeeOption = {
  id: string;
  region: string;
  fee: number;
  isActive: boolean;
};

export type AddressSearchResult = {
  roadAddr: string;
  jibunAddr: string;
  zipNo: string;
  siNm: string;
};
