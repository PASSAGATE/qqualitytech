"use client";

import { useState, type ChangeEvent } from "react";
import { Plus } from "lucide-react";
import { createEquipmentAction } from "./equipment-actions";
import { AddEquipmentImageSlots } from "./add-equipment-image-slots";
import {
  DescriptionField,
  EquipmentSelectFields,
  FormErrorMessage,
  InventoryFields,
  ModalActions,
  ModalFrame,
  PricingFields,
  TextInputField,
} from "./equipment-modal-fields";
import {
  EQUIPMENT_IMAGE_SLOT_COUNT,
  MAX_TOTAL_UPLOAD_BYTES,
  getSelectedFiles,
  getTotalUploadBytes,
  preventWithError,
  readFilePreview,
  replaceAt,
  validateEquipmentFormBasics,
} from "./equipment-modal-utils";

export function AddEquipmentModal() {
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>("");
  const [imagePreviews, setImagePreviews] = useState<Array<string | null>>(
    Array(EQUIPMENT_IMAGE_SLOT_COUNT).fill(null),
  );

  const handleImageChange = async (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      setImagePreviews((prev) => replaceAt(prev, index, null));
      return;
    }

    try {
      const preview = await readFilePreview(file);
      setImagePreviews((prev) => replaceAt(prev, index, preview));
    } catch {
      setImagePreviews((prev) => replaceAt(prev, index, null));
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-3 font-bold text-white shadow-sm transition-all hover:opacity-90 active:scale-95"
      >
        <Plus className="size-5" />
        장비 추가
      </button>

      {open ? (
        <ModalFrame
          title="장비 등록"
          onClose={() => setOpen(false)}
          maxWidthClassName="max-w-2xl"
          zIndexClassName="z-[100]"
        >
          <form
            action={createEquipmentAction}
            className="space-y-5"
            onSubmit={(event) => {
              setFormError(null);
              const form = event.currentTarget;
              const basicError = validateEquipmentFormBasics(form);
              if (basicError) {
                preventWithError(event, basicError, setFormError);
                return;
              }

              const selectedImages = getSelectedFiles(form, "image_file");
              if (selectedImages.length === 0) {
                preventWithError(
                  event,
                  "최소 1장 이상의 이미지를 업로드해 주세요.",
                  setFormError,
                );
                return;
              }

              if (getTotalUploadBytes(selectedImages) > MAX_TOTAL_UPLOAD_BYTES) {
                preventWithError(
                  event,
                  "업로드 용량이 너무 큽니다. 이미지 전체 용량을 9MB 이하로 줄여 주세요.",
                  setFormError,
                );
              }
            }}
          >
            <FormErrorMessage message={formError} />

            <div className="grid gap-5 sm:grid-cols-2">
              <TextInputField
                name="name"
                label="장비명 *"
                placeholder="예: 만능 재료 시험기"
                required
              />
              <TextInputField
                name="model_code"
                label="모델 코드"
                placeholder="예: Q-UTM600"
              />
            </div>

            <EquipmentSelectFields
              typeValue=""
              categoryValue=""
              statusValue="active"
              onTypeChange={setSelectedType}
              layoutClassName="space-y-5"
              withPlaceholders
            />
            <PricingFields selectedType={selectedType} showHelp />
            <InventoryFields showHelp />
            <AddEquipmentImageSlots
              imagePreviews={imagePreviews}
              onImageChange={handleImageChange}
            />
            <DescriptionField />
            <ModalActions onCancel={() => setOpen(false)} submitLabel="등록" />
          </form>
        </ModalFrame>
      ) : null}
    </>
  );
}
