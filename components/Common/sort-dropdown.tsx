"use client";
import { useState, useEffect, FC, useRef } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Check, Plus } from "lucide-react";
import { QueryString, cn, orderFilter } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { useParams, useRouter } from "next/navigation";

const SortDropdown: FC<{
  onChange: boolean;
  search: QueryString;
  setSearch: (search: QueryString) => void;
}> = ({ onChange, setSearch, search }) => {
  const getValue = () => {
    return (
      orderFilter.find(
        (x) => x.order == search.sortOrder && x.value == search.sortMemebr
      )?.label || undefined
    );
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-left w-full  cursor-pointer"
        >
          <Plus className="ml-2 h-4 w-4" />
          الترتيب
          {getValue() && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {getValue()}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>لاتوجد نتائج</CommandEmpty>
            <CommandGroup>
              {orderFilter?.map((option) => {
                return (
                  <CommandItem
                    key={option.label}
                    onSelect={() => {
                      setSearch({
                        ...search,
                        sortMemebr: option.value,
                        sortOrder: option.order,
                      });
                    }}
                  >
                    <Check
                      className={cn(
                        "ml-2 text-green-600 flex h-4 w-4 items-center justify-center opacity-0 transition-all duration-500",
                        getValue() == option.label ? "opacity-100" : "opacity-0"
                      )}
                    />

                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {getValue() && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    className="justify-center text-center"
                    onSelect={() =>
                      setSearch({
                        ...search,
                        sortMemebr: undefined,
                        sortOrder: undefined,
                      })
                    }
                  >
                    حذف الفلتر
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SortDropdown;
