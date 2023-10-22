"use client";
import { useModal } from "@/hooks/use-modal";
import { REVALIDATE_LOCATION_LIST } from "@/lib/keys";
import { supabaseClient } from "@/lib/supabaseClient";
import { http } from "@/service/httpService";
import { Location } from "@/types/custom";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Switch,
  Tooltip,
} from "@nextui-org/react";
import { AlertCircle, CheckCircle, Edit, Plane, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FunctionComponent } from "react";
import { toast } from "sonner";

const CardDetails: FunctionComponent<Location> = ({
  name,
  created_at,
  slug,
  id,
  image,
  is_active,
  seo,
  location_attributes,
}) => {
  const modal = useModal();
  const route = useRouter();

  const deleteDestination = async () => {
    const { data, error } = await supabaseClient
      .from("location")
      .delete()
      .eq("id", id!);
    if (error) {
      throw new Error("Error while deleting destination.. " + error.message);
    }
    return;
  };

  const updateDestinationStatus = async (status: boolean) => {
    const { data, error } = await supabaseClient
      .from("location")
      .update({ is_active: status })
      .eq("id", id!);
    if (error) {
      throw new Error("Error while updating destination.. " + error.message);
    }
    return;
  };

  const handleUpdateStatus = (status: boolean) => {
    toast.promise(updateDestinationStatus(status), {
      loading: `Loading, updating destination ..`,
      error(error) {
        return error;
      },
      async success(data) {
        await http(`/api/revalidate?tag=${REVALIDATE_LOCATION_LIST}`).get();
        route.refresh();
        return `Destination ${name} has been updated`;
      },
    });
  };

  const handleDelete = () => {
    toast.promise(deleteDestination, {
      loading: `Loading, deleting destination ..`,
      error(error) {
        return error;
      },
      async success(data) {
        await http(`/api/revalidate?tag=${REVALIDATE_LOCATION_LIST}`).get();
        route.refresh();
        return `Destination ${name} has been deleted`;
      },
    });
  };

  const CardElemnt = () => {
    return (
      <Card className="pt-4">
        <CardHeader className="pt-2 px-4 flex items-center justify-between pb-2">
          <Switch
            isSelected={is_active ?? false}
            onValueChange={(e) => handleUpdateStatus(e)}
            size="sm"
          />

          <h4 className="font-bold text-large text-right">{name}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2 border-t pb-4">
          <Image
            alt="Card background"
            className="object-cover rounded-xl max-h-28"
            src={image?.url ?? ""}
            width={1000}
            height={500}
          />
          <div className="flex justify-end flex-wrap mt-4 gap-x-2 gap-y-4">
            {location_attributes?.map((x) => (
              <Chip
                color="primary"
                key={x.id!}
                avatar={
                  <Avatar name={(x.location_tours?.length ?? 0).toString()} />
                }
              >
                {x.title}
              </Chip>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <Tooltip content="Image Size">
              <Chip color="danger" variant="faded">
                {image?.size}
              </Chip>
            </Tooltip>
            <Tooltip content="Image Order">
              <Chip color="primary" variant="faded">
                {image?.order}
              </Chip>
            </Tooltip>
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
                  modal.onOpenDestination({
                    name,
                    created_at,
                    id,
                    image,
                    is_active,
                    seo,
                    slug,
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
            <Button
              endContent={<Plane />}
              radius="full"
              size="sm"
              variant="shadow"
              color="primary"
              onPress={() =>
                modal.onOpenDestinationTours({
                  name,
                  created_at,
                  id,
                  image,
                  is_active,
                  seo,
                  location_attributes,
                  slug,
                })
              }
            >
              Assign to tours
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  };

  if (seo) {
    return (
      <Badge
        color="success"
        shape="rectangle"
        content={
          <div className="flex items-center p-1 gap-x-2">
            <CheckCircle className="w-4 h-4" />
            <h6 className="text-xs">SEO configured correctly!</h6>
          </div>
        }
        placement="top-left"
        classNames={{ badge: "translate-x-0 -translate-y-7 ", base: "h-full" }}
      >
        <CardElemnt />
      </Badge>
    );
  }

  return (
    <Badge
      color="danger"
      shape="rectangle"
      content={
        <div className="flex items-center p-1 gap-x-2">
          <AlertCircle className="w-4 h-4" />
          <h6 className="text-xs">SEO is not configured!</h6>
        </div>
      }
      placement="top-left"
      classNames={{ badge: "translate-x-0 -translate-y-7", base: "h-full" }}
    >
      <CardElemnt />
    </Badge>
  );
};

export default CardDetails;
