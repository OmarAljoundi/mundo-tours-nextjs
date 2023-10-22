"use client";
import { Button, Input, ModalFooter, Textarea } from "@nextui-org/react";
import { Modal } from "../common/modal";
import { v4 as uuidv4 } from "uuid";
import { Faq } from "@/types/custom";
import { useFormik } from "formik";
import { useState } from "react";
import { useModal } from "@/hooks/use-modal";
import { useSetting } from "@/hooks/use-setting";
import { PushJsonFile } from "@/lib/storage-operations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const FaqModal = () => {
  const faqModal = useModal();
  const config = useSetting();
  const route = useRouter();

  const [uniqueId, setUniqueId] = useState(uuidv4());

  const { isOpenFaq, onClose, data } = faqModal;
  const handleSubmitSection = (formData: Faq) => {
    let newObject = { ...config.setting };
    if (data) {
      newObject = {
        home: { ...newObject.home },
        visa: {
          ...newObject.visa,
        },
        faq: [
          ...(newObject.faq?.filter((x) => x.uuid !== data.uuid) ?? []),
          formData,
        ],
      };
    } else {
      newObject = {
        home: { ...newObject.home },
        visa: {
          ...newObject.visa,
        },
        faq: [...(newObject.faq ?? []), formData],
      };
    }

    config.onCreate(newObject);
    const jsonData = JSON.stringify(newObject);
    const blob = new Blob([jsonData], { type: "application/json" });
    toast.promise(PushJsonFile(blob), {
      loading: "Saving your changes..",
      error(error) {
        return error;
      },
      success() {
        route.push("/admin/dashboard/setting/faq");
        return "Saved successfully";
      },
    });

    setUniqueId(uuidv4());
    resetForm();
    onClose();
  };

  const formik = useFormik({
    initialValues: faqModal.data ?? {
      uuid: uniqueId,
    },
    onSubmit: handleSubmitSection,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
  });

  const {
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    resetForm,
    handleSubmit,
    setFieldValue,
  } = formik;

  return (
    <Modal
      isOpen={isOpenFaq}
      onClose={onClose}
      dialogClass="px-2"
      title="Create new faq"
      renderFooter={() => {
        return (
          <ModalFooter>
            <Button
              variant="bordered"
              color="primary"
              type="button"
              onClick={() => handleSubmit()}
            >
              Add new Faq
            </Button>
          </ModalFooter>
        );
      }}
    >
      <form className="grid space-y-4 mt-4 gap-x-4">
        <div className="space-y-4">
          <div className="grid gap-y-4">
            <Input
              label="FAQ Title"
              labelPlacement="outside"
              placeholder="Enter faq title"
              onChange={handleChange}
              onBlur={handleBlur}
              onClear={() => setFieldValue("title", "")}
              value={values.title || ""}
              name="title"
              isClearable
              isInvalid={touched.title && !!errors.title}
            />
            <Textarea
              label="Section Description"
              labelPlacement="outside"
              placeholder="Enter section description"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.description && !!errors.description}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};
