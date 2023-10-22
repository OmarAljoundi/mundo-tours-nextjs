"use client";
import { Button, Card, CardBody } from "@nextui-org/react";
import { Plus } from "lucide-react";
import { FunctionComponent } from "react";
import { ModalProps, useModal } from "@/hooks/use-modal";
import Link from "next/link";
import { FunctionKeys } from "@/lib/utils";

interface CardAddProps {
  trigger?: FunctionKeys<ModalProps>;
  href?: string;
  title: string;
}

const CardAdd: FunctionComponent<CardAddProps> = ({ trigger, href, title }) => {
  const modal = useModal();
  return (
    <Card className="w-full h-full">
      {trigger && (
        <CardBody
          className="px-3 py-0 text-small text-default-400 flex items-center group cursor-pointer hover:bg-gray-500 justify-center min-h-[160px] h-40 transition-all duration-1000"
          onClick={() => modal[trigger]()}
        >
          <Button
            isIconOnly
            disableRipple
            className="text-default-900/60 data-[hover]:bg-foreground/10 border transition-all group-hover:scale-150 group-hover:border-2 duration-1000"
            radius="full"
            variant="light"
            onPress={() => modal[trigger]()}
          >
            <Plus className="group-hover:text-white" />
          </Button>

          <p className="text-center mt-4 group-hover:text-white">{title}</p>
        </CardBody>
      )}
      {href && (
        <CardBody
          as={Link}
          className="px-3 py-0 text-small text-default-400 flex items-center group cursor-pointer hover:bg-gray-500 justify-center min-h-[160px] h-40 transition-all duration-1000"
          href={href}
        >
          <Button
            isIconOnly
            disableRipple
            className="text-default-900/60 data-[hover]:bg-foreground/10 border transition-all group-hover:scale-150 group-hover:border-2 duration-1000"
            radius="full"
            variant="light"
          >
            <Plus className="group-hover:text-white" />
          </Button>

          <p className="text-center mt-4 group-hover:text-white">{title}</p>
        </CardBody>
      )}
    </Card>
  );
};

export default CardAdd;
