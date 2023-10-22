import { useModal } from "@/hooks/use-modal";
import { useSetting } from "@/hooks/use-setting";
import { PushJsonFile } from "@/lib/storage-operations";
import { Faq, Slider } from "@/types/custom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";
import { toast } from "sonner";

const CardDetails: FunctionComponent<Slider> = ({
  call_to_action,
  image,
  sub_title,
  title,
  uuid,
  call_to_action_link,
}) => {
  const config = useSetting();
  const modal = useModal();
  const route = useRouter();
  const handleDelete = () => {
    let newObject = { ...config.setting };
    newObject = {
      ...newObject,
      home: {
        ...newObject.home,
        sliders: [
          ...(newObject.home?.sliders?.filter((x) => x.uuid !== uuid) ?? []),
        ],
      },
    };

    const jsonData = JSON.stringify(newObject);
    const blob = new Blob([jsonData], { type: "application/json" });
    toast.promise(PushJsonFile(blob), {
      loading: "Saving your changes..",
      error(error) {
        return error;
      },
      success() {
        config.onCreate(newObject);
        route.refresh();
        return "Saved successfully";
      },
    });
  };
  return (
    <Card className="pt-4">
      <CardHeader className="pt-2 px-4 flex-col items-end justify-between pb-2">
        <h4 className="font-bold text-large text-right">{title}</h4>
        <h4 className="text-small text-right">{sub_title}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2 border-t pb-4">
        <div className="relative">
          <Image
            alt=""
            className="object-cover"
            height={500}
            src={image}
            width={1000}
          />
          <div className="bg-black right-2 justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 shadow-small ml-1 z-10">
            <Button
              className="text-tiny text-white bg-black/20"
              variant="flat"
              color="default"
              radius="lg"
              size="sm"
            >
              {call_to_action}
            </Button>
          </div>
        </div>
      </CardBody>
      <CardFooter className="pt-2 p-0 border-t">
        <div className="flex gap-1 justify-between items-center w-full pt-3 pb-1 px-4">
          <div className="flex">
            <Button
              isIconOnly
              className="text-default-900/60 data-[hover]:bg-foreground/10 "
              radius="full"
              variant="light"
              onPress={() =>
                modal.onOpenSlide({
                  call_to_action,
                  image,
                  sub_title,
                  title,
                  uuid,
                  call_to_action_link,
                })
              }
            >
              <Edit />
            </Button>
            <Button
              isIconOnly
              className="text-default-900/60   data-[hover]:bg-foreground/10"
              radius="full"
              variant="light"
              onPress={() => handleDelete()}
            >
              <Trash />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardDetails;
