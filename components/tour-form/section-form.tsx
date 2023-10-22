import { Tour, TourSection } from "@/types/custom";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Textarea,
} from "@nextui-org/react";
import { FormikProps, useFormik } from "formik";
import { FunctionComponent, useEffect } from "react";
import ImageForm from "../common/multiple-image-form";
import { Button as ShcdnButton } from "../ui/button";
import { Delete, Edit, Plus, RecycleIcon, Trash, X } from "lucide-react";
import { useSectionModal } from "@/hooks/use-section-modal";
import { ScrollArea } from "../ui/scroll-area";
interface SectionFormProps {
  formik: FormikProps<Tour>;
}

const SectionForm: FunctionComponent<SectionFormProps> = ({ formik }) => {
  const sectionModal = useSectionModal();

  const handleDelete = (uuid: string) => {
    const { setValues, values } = formik;
    setValues({
      ...values,
      tour_sections: values.tour_sections?.filter((x) => x.uuid !== uuid) ?? [],
    });
  };

  const CardComponent = (data: TourSection) => {
    const { description, title, image, uuid } = data;
    return (
      <Card className="w-full max-h-64 h-64">
        <CardHeader className="justify-between">
          <div className="flex gap-5 ">
            <div className="w-8 h-8">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src={image}
                fallback="No image"
              />
            </div>
            <div className="flex flex-col gap-1 items-start justify-center  ">
              <h4 className="text-small font-semibold  text-default-600 text-ellipsis overflow-hidden line-clamp-1 leading-5">
                {title}
              </h4>
            </div>
          </div>
        </CardHeader>
        <ScrollArea className="max-h-32 min-h-[128px] mt-4 bg-gray-300">
          <CardBody className="px-3 text-small text-black py-2 ">
            <p>{description}</p>
          </CardBody>
        </ScrollArea>
        <CardFooter className="gap-3  px-0">
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => sectionModal.onOpen(formik, data)}
              >
                <Edit />
              </Button>
            </p>
            <p className="text-default-400 text-small">
              <Button
                isIconOnly
                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                radius="full"
                variant="light"
                onPress={() => handleDelete(uuid)}
              >
                <Trash />
              </Button>
            </p>
          </div>
        </CardFooter>
      </Card>
    );
  };
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8  mt-4 gap-x-4 gap-y-6">
      <Card className="w-full max-h-64 h-64">
        <CardBody className="px-3 py-0 text-small text-default-400 flex items-center justify-center min-h-[160px] h-40">
          <Button
            isIconOnly
            disableRipple
            className="text-default-900/60 data-[hover]:bg-foreground/10 border"
            radius="full"
            variant="light"
            onPress={() => sectionModal.onOpen(formik)}
          >
            <Plus />
          </Button>
          <p className="text-center">Click to create a new section</p>
        </CardBody>
      </Card>
      {formik.values.tour_sections?.map((section) => (
        <CardComponent key={section.title} {...section} />
      ))}
    </div>
  );
};

export default SectionForm;
