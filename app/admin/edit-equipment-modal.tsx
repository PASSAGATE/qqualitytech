"use client";

import { useMemo, useState, type ChangeEvent } from "react";
import { Pencil } from "lucide-react";
import { updateEquipmentAction } from "./equipment-actions";
import { EditEquipmentImageSlots } from "./edit-equipment-image-slots";
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
  EQUIPMENT_IMAGE_SLOT_NUMBERS,
  MAX_TOTAL_UPLOAD_BYTES,
  getSelectedFiles,
  getTotalUploadBytes,
  preventWithError,
  readFilePreview,
  replaceAt,
  validateEquipmentFormBasics,
} from "./equipment-modal-utils";

type EditEquipmentModalProps = {
  availableCount: number;
  categoryValue: string;
  description: string;
  equipmentId: string;
  imageUrls: string[];
  modelCode: string;
  monthlyRentalPrice: number;
  name: string;
  salePrice: number;
  statusValue: string;
  totalCount: number;
  typeValue: string;
};

function getKeptExistingImageCount(
  form: HTMLFormElement,
  currentImageUrls: string[],
) {
  return EQUIPMENT_IMAGE_SLOT_NUMBERS.filter((slotNumber) => {
    const hasCurrentImage = Boolean(currentImageUrls[slotNumber - 1]);
    const markedDelete =
      (form.elements.namedItem(
        `delete_image_flag_${slotNumber}`,
      ) as HTMLInputElement | null)?.value === "1";

    return hasCurrentImage && !markedDelete;
  }).length;
}

export function EditEquipmentModal({
  equipmentId,
  name,
  modelCode,
  description,
  typeValue,
  categoryValue,
  statusValue,
  salePrice,
  monthlyRentalPrice,
  totalCount,
  availableCount,
  imageUrls,
}: EditEquipmentModalProps) {
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>(typeValue || "sale");
  const [newImagePreviews, setNewImagePreviews] = useState<Array<string | null>>(
    Array(EQUIPMENT_IMAGE_SLOT_COUNT).fill(null),
  );
  const [deleteFlags, setDeleteFlags] = useState<boolean[]>(
    Array(EQUIPMENT_IMAGE_SLOT_COUNT).fill(false),
  );
  const currentImageUrls = useMemo(() => imageUrls.filter(Boolean), [imageUrls]);

  const handleImageChange = async (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      setNewImagePreviews((prev) => replaceAt(prev, index, null));
      return;
    }

    try {
      const preview = await readFilePreview(file);
      setDeleteFlags((prev) => replaceAt(prev, index, false));
      setNewImagePreviews((prev) => replaceAt(prev, index, preview));
    } catch {
      setNewImagePreviews((prev) => replaceAt(prev, index, null));
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1 rounded-sm border border-outline-variant/30 px-2.5 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-surface-container-high"
      >
        <Pencil className="size-3.5" />
        수정
      </button>

      {open ? (
        <ModalFrame
          title="장비 수정"
          onClose={() => setOpen(false)}
          maxWidthClassName="max-w-3xl"
          zIndexClassName="z-[110]"
        >
          <form
            action={updateEquipmentAction}
            className="space-y-5"
            onSubmit={(event) => {
              setFormError(null);
              const form = event.currentTarget;
              const basicError = validateEquipmentFormBasics(form);
              if (basicError) {
                preventWithError(event, basicError, setFormError);
                return;
              }

              const keepCount = getKeptExistingImageCount(form, currentImageUrls);
              const newImages = getSelectedFiles(form, "new_image_file");
              if (keepCount + newImages.length === 0) {
                preventWithError(
                  event,
                  "최소 1장 이상의 이미지를 유지하거나 업로드해 주세요.",
                  setFormError,
                );
                return;
              }

              if (getTotalUploadBytes(newImages) > MAX_TOTAL_UPLOAD_BYTES) {
                preventWithError(
                  event,
                  "업로드 용량이 너무 큽니다. 새 이미지 전체 용량을 9MB 이하로 줄여 주세요.",
                  setFormError,
                );
              }
            }}
          >
            <FormErrorMessage message={formError} />
            <input type="hidden" name="equipment_id" value={equipmentId} />

            <div className="grid gap-5 sm:grid-cols-2">
              <TextInputField
                name="name"
                label="장비명 *"
                defaultValue={name}
                required
              />
              <TextInputField
                name="model_code"
                label="모델 코드"
                defaultValue={modelCode}
              />
            </div>

            <EquipmentSelectFields
              typeValue={typeValue || ""}
              categoryValue={categoryValue || ""}
              statusValue={statusValue || "active"}
              onTypeChange={setSelectedType}
            />
            <PricingFields
              selectedType={selectedType}
              salePrice={salePrice}
              monthlyRentalPrice={monthlyRentalPrice}
            />
            <InventoryFields
              totalCount={totalCount}
              availableCount={availableCount}
            />
            <EditEquipmentImageSlots
              currentImageUrls={currentImageUrls}
              deleteFlags={deleteFlags}
              newImagePreviews={newImagePreviews}
              onImageChange={handleImageChange}
              onToggleDelete={(index) => {
                setDeleteFlags((prev) => replaceAt(prev, index, !prev[index]));
              }}
            />
            <DescriptionField defaultValue={description} />
            <ModalActions
              onCancel={() => setOpen(false)}
              submitLabel="수정 저장"
            />
          </form>
        </ModalFrame>
      ) : null}
    </>
  );
}
