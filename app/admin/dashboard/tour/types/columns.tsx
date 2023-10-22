"use client";
import { format } from "date-fns";
import { ColumnDef, Table } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { DataTableAction } from "@/components/table/data-table-actions";
import { supabaseClient } from "@/lib/supabaseClient";
import { Badge } from "@/components/ui/badge";
import { Filters } from "@/hooks/use-filter-modal";
import { TourType } from "@/types/custom";
import { Avatar } from "@nextui-org/react";
import { REVALIDATE_TOUR_TYPE } from "@/lib/keys";

export const columns: ColumnDef<TourType>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type Id" />
    ),
    cell: ({ row }) => <div className="w-[80px]">#{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type Image" />
    ),
    cell: ({ row }) => {
      return (
        <Avatar
          isBordered
          radius="full"
          size="md"
          src={row.original.image}
          fallback="No image"
        />
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-32 flex items-center justify-between">
          <Badge className="max-w-[6rem] truncate">
            {row.getValue("name")}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return row.original.name?.includes(value) || false;
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CreatedAt" />
    ),
    cell: ({ row }) => (
      <div className="w-[100px] truncate">
        {format(new Date(row.getValue("created_at")), "yyyy-MM-dd")}
      </div>
    ),
    filterFn: (row, id, value) => {
      var from = true;
      var to = true;
      if (value?.from) {
        from =
          new Date(value.from as string) <= new Date(row.original.created_at!);
      }
      if (value?.to) {
        to = new Date(value.to as string) >= new Date(row.original.created_at!);
      }

      return from && to;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <DataTableAction
        row={row}
        actions={[
          {
            label: "Edit",
            action: "onOpenTourType",
            type: "Trigger",
          },
          {
            label: "Delete",
            type: "Promise",
            action: async () => {
              const { data, error } = await supabaseClient
                .from("tour")
                .delete()
                .eq("id", row.original.id!);
              if (error) {
                console.log("error", error);
                return {
                  success: false,
                  message: error.message,
                };
              }
              await fetch(`/api/revalidate?tag=${REVALIDATE_TOUR_TYPE}`);
              return {
                success: true,
                message: "Type deleted successfully",
              };
            },
          },
        ]}
      />
    ),
  },
];

export const filterOptions: Filters[] = [];
