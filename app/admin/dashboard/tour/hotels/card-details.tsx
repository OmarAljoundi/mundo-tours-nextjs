"use client";
import { Hotel } from "@/types/custom";
import { useModal } from "@/hooks/use-modal";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { Edit, Trash } from "lucide-react";
import { FunctionComponent } from "react";
import Carousel from "@/components/common/carousel";
import { supabaseClient } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { http } from "@/service/httpService";
import { REVALIDATE_HOTEL_LIST } from "@/lib/keys";
import { useRouter } from "next/navigation";

const CardDetails: FunctionComponent<Hotel> = ({
  created_at,
  id,
  images,
  name,
  rating,
}) => {
  const modal = useModal();
  const route = useRouter();
  const deleteHotel = async () => {
    const { error } = await supabaseClient.from("hotel").delete().eq("id", id!);

    if (error) {
      throw new Error("Error while deleting the hotel" + error.message);
    }
    return;
  };

  const handleDelete = () => {
    toast.promise(deleteHotel(), {
      error(error) {
        return error;
      },
      loading: "Loading..",
      async success(data) {
        await http(`/api/revalidate?tag=${REVALIDATE_HOTEL_LIST}`, {
          revalidate: 0,
        }).get();
        route.refresh();
        return `Hotel ${name} deleted successfully!`;
      },
    });
  };
  return (
    <Card className="pt-4">
      <CardHeader className="pt-2 px-4 flex items-center justify-between pb-2">
        <h4 className="font-bold text-large text-right">{name}</h4>
        <div className="flex items-center">
          <svg
            className="w-4 h-4 text-yellow-300 mr-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
            {rating}
          </p>
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2 border-t pb-4">
        <Carousel images={images?.map((image) => image) ?? []} />
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
                modal.onOpenHotel({ created_at, id, images, name, rating })
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
