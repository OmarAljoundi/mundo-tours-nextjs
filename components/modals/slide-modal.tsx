import { useModal } from "@/hooks/use-modal";
import { FunctionComponent, useState } from "react";
import { Modal } from "../common/modal";
import { Button, Input, ModalFooter } from "@nextui-org/react";
import { v4 } from "uuid";
import { Slider } from "@/types/custom";
import { useFormik } from "formik";
import SingleImageForm from "../common/single-image-form";
import { X } from "lucide-react";
import { Button as ShcdnButton } from "@/components/ui/button";
import { useSetting } from "@/hooks/use-setting";
import { toast } from "sonner";
import { PushJsonFile } from "@/lib/storage-operations";
import { useRouter } from "next/navigation";
interface SlideModalProps {}

const SlideModal: FunctionComponent<SlideModalProps> = () => {
  const modal = useModal();
  const config = useSetting();
  const [uniqueId, setUniqueId] = useState(v4());
  const route = useRouter();
  const handleSubmitFeature = (formData: Slider) => {
    const { onClose, data } = modal;
    let newObject = { ...config.setting };
    if (data) {
      newObject = {
        home: {
          ...newObject.home,
          sliders: [
            ...(newObject.home?.sliders?.filter((x) => x.uuid !== data.uuid) ??
              []),
            formData,
          ],
        },
        ...newObject,
      };
    } else {
      newObject = {
        ...newObject,
        home: {
          ...newObject.home,
          sliders: [...(newObject.home?.sliders ?? []), formData],
        },
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
        route.push("/admin/dashboard/setting");
        return "Saved successfully";
      },
    });
    setUniqueId(v4());
    resetForm();
    onClose();
  };

  const formik = useFormik({
    initialValues: modal.data ?? {
      uuid: uniqueId,
    },
    onSubmit: handleSubmitFeature,
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
      isOpen={modal.isOpenSlide}
      onClose={modal.onClose}
      dialogClass="px-2"
      size="4xl"
      title={`${modal.data ? "Update Slide" : "Create new slide"}`}
      renderFooter={() => {
        return (
          <ModalFooter>
            <Button
              variant="bordered"
              color="primary"
              type="button"
              onClick={() => handleSubmit()}
            >
              Save Changes
            </Button>
          </ModalFooter>
        );
      }}
    >
      <form className="grid space-y-4 mt-4 gap-x-4 mb-4">
        <div className="space-y-4">
          <div className="grid gap-y-4">
            <SingleImageForm formik={formik} field="image" maxNumber={1}>
              {values.image && (
                <div className="image-item  border rounded-xl relative dark:bg-white w-28 mt-5">
                  <img src={values.image} alt="" className="rounded-xl w-28" />
                  <ShcdnButton
                    type="button"
                    size={"icon"}
                    variant={"ghost"}
                    className="absolute -top-2 -right-2 bg-white w-6 h-6 rounded-full border border-red-600"
                    onClick={() => {
                      setFieldValue("image", undefined);
                    }}
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </ShcdnButton>
                </div>
              )}
            </SingleImageForm>
            <Input
              label="Feature Title"
              labelPlacement="outside"
              placeholder="Enter feature title"
              onChange={handleChange}
              onBlur={handleBlur}
              onClear={() => setFieldValue("title", "")}
              value={values.title || ""}
              name="title"
              isInvalid={touched.title && !!errors.title}
            />
            <Input
              label="Slide sub title"
              labelPlacement="outside"
              placeholder="Enter sub title"
              name="sub_title"
              value={values.sub_title || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.sub_title && !!errors.sub_title}
            />
            <div className="flex gap-x-2">
              <Input
                label="Action title"
                labelPlacement="outside"
                placeholder="Enter action title"
                name="call_to_action"
                value={values.call_to_action || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.call_to_action && !!errors.call_to_action}
              />
              <Input
                label="Action link"
                labelPlacement="outside"
                placeholder="Enter action link"
                name="call_to_action_link"
                value={values.call_to_action_link || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={
                  touched.call_to_action_link && !!errors.call_to_action_link
                }
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SlideModal;
