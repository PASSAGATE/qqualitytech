"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import {
  EQUIPMENT_CATEGORY_OPTIONS,
  EQUIPMENT_STATUS_OPTIONS,
  EQUIPMENT_TYPE_OPTIONS,
} from "./equipment-enums";

const fieldClassName =
  "w-full rounded-md border border-outline-variant/40 bg-white px-3 py-2.5 text-sm font-medium outline-none transition-all focus:border-secondary";

export function ModalFrame({
  children,
  maxWidthClassName,
  onClose,
  title,
  zIndexClassName,
}: {
  children: ReactNode;
  maxWidthClassName: string;
  onClose: () => void;
  title: string;
  zIndexClassName: string;
}) {
  return (
    <div
      className={`fixed inset-0 ${zIndexClassName} flex items-center justify-center bg-black/45 p-4`}
    >
      <div
        className={`max-h-[90vh] w-full ${maxWidthClassName} overflow-y-auto rounded-md bg-white p-6 shadow-2xl sm:p-8`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-extrabold tracking-tight text-primary">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high"
            aria-label="닫기"
          >
            <X className="size-5" />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export function FormErrorMessage({ message }: { message: string | null }) {
  return message ? (
    <p className="rounded-md border border-[#f5c2c7] bg-[#fff5f5] px-4 py-3 text-sm font-semibold text-[#c92a2a]">
      {message}
    </p>
  ) : null;
}

export function TextInputField({
  defaultValue,
  label,
  name,
  placeholder,
  required = false,
}: {
  defaultValue?: string;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="space-y-2 text-sm font-semibold text-primary">
      {label}
      <input
        name={name}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={fieldClassName}
      />
    </label>
  );
}

export function DescriptionField({
  defaultValue,
  placeholder = "장비 설명을 입력하세요.",
}: {
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <label className="block space-y-2 text-sm font-semibold text-primary">
      설명
      <textarea
        name="description"
        rows={4}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={fieldClassName}
      />
    </label>
  );
}

export function EquipmentSelectFields({
  categoryValue = "",
  layoutClassName = "grid gap-5 sm:grid-cols-2",
  onTypeChange,
  statusValue = "active",
  typeValue = "",
  withPlaceholders = false,
}: {
  categoryValue?: string;
  layoutClassName?: string;
  onTypeChange: (value: string) => void;
  statusValue?: string;
  typeValue?: string;
  withPlaceholders?: boolean;
}) {
  return (
    <div className={layoutClassName}>
      <label className="block space-y-2 text-sm font-semibold text-primary">
        장비 타입 *
        <select
          name="type"
          required
          defaultValue={typeValue}
          onChange={(event) => {
            onTypeChange(event.target.value);
          }}
          className={fieldClassName}
        >
          {withPlaceholders ? (
            <option value="" disabled>
              타입을 선택해 주세요
            </option>
          ) : null}
          {EQUIPMENT_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-2 text-sm font-semibold text-primary">
        장비 분류 *
        <select
          name="category"
          required
          defaultValue={categoryValue}
          className={fieldClassName}
        >
          {withPlaceholders ? (
            <option value="" disabled>
              분류를 선택해 주세요
            </option>
          ) : null}
          {EQUIPMENT_CATEGORY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-2 text-sm font-semibold text-primary">
        상태
        <select name="status" defaultValue={statusValue} className={fieldClassName}>
          {EQUIPMENT_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export function PricingFields({
  monthlyRentalPrice,
  salePrice,
  selectedType,
  showHelp = false,
}: {
  monthlyRentalPrice?: number;
  salePrice?: number;
  selectedType: string;
  showHelp?: boolean;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {selectedType === "sale" || selectedType === "sale_and_rental" ? (
        <label className="space-y-2 text-sm font-semibold text-primary">
          판매가 (원)
          <input
            name="sale_price"
            type="number"
            min={0}
          defaultValue={salePrice}
            placeholder={showHelp ? "숫자를 입력해 주세요" : undefined}
            className={fieldClassName}
          />
          {showHelp ? (
            <p className="text-xs font-medium text-on-surface-variant">
              비워두면 0원으로 저장됩니다.
            </p>
          ) : null}
        </label>
      ) : (
        <input type="hidden" name="sale_price" value={salePrice ?? 0} />
      )}

      {selectedType === "rental" || selectedType === "sale_and_rental" ? (
        <label className="space-y-2 text-sm font-semibold text-primary">
          월 임대료 (원)
          <input
            name="monthly_rental_price"
            type="number"
            min={0}
          defaultValue={monthlyRentalPrice}
            placeholder={showHelp ? "숫자를 입력해 주세요" : undefined}
            className={fieldClassName}
          />
          {showHelp ? (
            <p className="text-xs font-medium text-on-surface-variant">
              비워두면 0원으로 저장됩니다.
            </p>
          ) : null}
        </label>
      ) : (
        <input
          type="hidden"
          name="monthly_rental_price"
          value={monthlyRentalPrice ?? 0}
        />
      )}
    </div>
  );
}

export function InventoryFields({
  availableCount,
  showHelp = false,
  totalCount,
}: {
  availableCount?: number;
  showHelp?: boolean;
  totalCount?: number;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="space-y-2 text-sm font-semibold text-primary">
        총 재고 수량
        <input
          name="total_count"
          type="number"
          min={0}
          defaultValue={totalCount}
          placeholder={showHelp ? "수량을 입력해 주세요" : undefined}
          className={fieldClassName}
        />
        {showHelp ? (
          <p className="text-xs font-medium text-on-surface-variant">
            비워두면 0개로 저장됩니다.
          </p>
        ) : null}
      </label>

      <label className="space-y-2 text-sm font-semibold text-primary">
        사용 가능 수량
        <input
          name="available_count"
          type="number"
          min={0}
          defaultValue={availableCount}
          placeholder={showHelp ? "수량을 입력해 주세요" : undefined}
          className={fieldClassName}
        />
        {showHelp ? (
          <p className="text-xs font-medium text-on-surface-variant">
            비워두면 0개로 저장됩니다.
          </p>
        ) : null}
      </label>
    </div>
  );
}

export function ModalActions({
  onCancel,
  submitLabel,
}: {
  onCancel: () => void;
  submitLabel: string;
}) {
  return (
    <div className="flex items-center justify-end gap-3 pt-2">
      <button
        type="button"
        onClick={onCancel}
        className="rounded-md border border-outline-variant/40 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-surface-container-low"
      >
        취소
      </button>
      <button
        type="submit"
        className="rounded-md bg-secondary px-5 py-2 text-sm font-bold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitLabel}
      </button>
    </div>
  );
}
