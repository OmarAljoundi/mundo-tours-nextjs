"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ModalProps, useModal } from "@/hooks/use-modal";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FunctionKeys } from "@/lib/utils";

interface DateTableActionProps<TData> {
  row: Row<TData>;
  actions: {
    label: string;
    action?:
      | FunctionKeys<ModalProps>
      | (() => Promise<{ success: boolean; message: string }>);
    link?: string;
    type?: "Link" | "Promise" | "Trigger";
  }[];
}

export function DataTableAction<TData>({
  row,
  actions,
}: DateTableActionProps<TData>) {
  const route = useRouter();
  const modal = useModal();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {actions?.map((i) => {
          switch (i.type) {
            case "Link":
              return (
                <Link href={i.link!} key={i.label}>
                  <DropdownMenuItem>{i.label}</DropdownMenuItem>
                </Link>
              );
            case "Promise":
              return (
                <DropdownMenuItem
                  key={i.label}
                  onClick={async () => {
                    //@ts-ignore
                    toast.promise(i.action()!, {
                      error(error) {
                        return error;
                      },
                      loading: "in progress..",
                      success(data) {
                        route.refresh();
                        return (data as any).message!;
                      },
                    });
                  }}
                >
                  {i.label}
                </DropdownMenuItem>
              );
            case "Trigger":
              return (
                <DropdownMenuItem
                  key={i.label}
                  //@ts-ignore
                  onClick={() => modal[i.action as string](row.original)}
                >
                  {i.label}
                </DropdownMenuItem>
              );
          }
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
