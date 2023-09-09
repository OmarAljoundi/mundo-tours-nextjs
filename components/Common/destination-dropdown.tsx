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
import { QueryString, cn, daysFilter, europeanCountries } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ILocation } from "@/interface/Location";

const DestinationDropdown: FC<{
  locations: ILocation[];
  search: QueryString;
  setSearch: (search: QueryString) => void;
}> = ({ locations, setSearch, search }) => {
  const router = useRouter();

  const { destination } = useParams();

  const select = decodeURIComponent(destination?.toString());

  useEffect(() => {
    setSearch({
      ...search,
      tab: "1",
    });
  }, [destination]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-left w-full  cursor-pointer"
        >
          <Plus className="ml-2 h-4 w-4" />
          الوجهات
          {destination && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {select.replaceAll("-", " ")}
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
              {locations?.map((option) => {
                return (
                  <CommandItem
                    key={option.id}
                    onSelect={() => {
                      router.push(
                        `/tour-listing/${option.name?.replaceAll(" ", "-")}`
                      );
                    }}
                  >
                    <Check
                      className={cn(
                        "ml-2 text-green-600 flex h-4 w-4 items-center justify-center opacity-0 transition-all duration-500",
                        select.replaceAll("-", " ") == option.name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />

                    <span>{option.name}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {destination && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    className="justify-center text-center"
                    onSelect={() => router.push("/tour-listing")}
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

export default DestinationDropdown;
