import { Visa, VisaType } from "@/types/custom";
import { FormikProps } from "formik";
import { FunctionComponent } from "react";
import { X } from "lucide-react";
import SingleImageForm from "@/components/common/single-image-form";
import { Button } from "@/components/ui/button";

interface ImageFormProps {
  formik: FormikProps<VisaType>;
}

const ImageForm: FunctionComponent<ImageFormProps> = ({ formik }) => {
  const onImageRemove = () => {
    formik.setValues({
      ...formik.values,
      image: undefined,
    });
  };

  return (
    <div className="col-span-3  xl:col-span-2">
      <SingleImageForm formik={formik} field="image" maxNumber={1}>
        {formik.values.image && (
          <div className="image-item  border rounded-xl relative dark:bg-white mt-4 w-52">
            <img
              src={formik.values.image}
              alt=""
              className="w-full rounded-xl "
            />
            <Button
              type="button"
              size={"icon"}
              variant={"ghost"}
              className="absolute -top-2 -right-2 bg-white w-6 h-6 rounded-full border border-red-600"
              onClick={() => {
                onImageRemove();
              }}
            >
              <X className="w-4 h-4 text-red-600" />
            </Button>
          </div>
        )}
      </SingleImageForm>
    </div>
  );
};

export default ImageForm;
