"use client";
import { useEffect, useState, FC } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Check, Plus, X } from "lucide-react";
import { QueryString, cn, daysFilter, europeanCountries } from "@/lib/utils";
import { Separator } from "../ui/separator";
import qs from "query-string";
import { usePathname, useRouter } from "next/navigation";

const DurationDropdown: FC<{
  setSearch: (search: QueryString) => void;
  search: QueryString;
  onChange: boolean;
}> = ({ onChange, search, setSearch }) => {
  const pathname = usePathname();
  const [selected, setSelected] = useState<{ value: string; label: string }[]>(
    []
  );

  const router = useRouter();

  useEffect(() => {
    const query = qs.parseUrl(window.location.href, {
      arrayFormat: "comma",
      decode: true,
    }).query;

    if (typeof query.days == "string") query.days = [query.days];
    if (query.days && query.days.length > 0) {
      const labelSet = new Set(query.days);
      const filteredObjects = daysFilter.filter((obj) =>
        labelSet.has(obj.value)
      );
      setSelected(filteredObjects);
    }
  }, []);
  useEffect(() => {
    setSearch({
      ...search,
      days: selected.map((x) => x.value),
    });
  }, [selected, pathname]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-left w-full  cursor-pointer"
        >
          <Plus className="ml-2 h-4 w-4" />
          مدة الرحلة
          {selected.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden "
                onClick={() => setSelected([])}
              >
                {selected.length}
                <X className="border  rounded-lg w-4 h-4 mr-2 text-white bg-red-500/70" />
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selected.length > 1 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                    onClick={() => setSelected([])}
                  >
                    {selected.length}
                    <X className="border  rounded-lg w-4 h-4 mr-2 text-white bg-red-500/70" />
                  </Badge>
                ) : (
                  daysFilter
                    .filter((option) => selected.includes(option))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.label}
                        className="rounded-sm px-1 font-normal  text-[10px]"
                        onClick={() =>
                          setSelected([...selected.filter((x) => x != option)])
                        }
                      >
                        {option.label}
                        <X className="border  rounded-lg w-4 h-4 mr-2 text-white bg-red-500/70" />
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>لاتوجد نتائج</CommandEmpty>
            <CommandGroup>
              {daysFilter.map((option) => {
                return (
                  <CommandItem
                    key={option.label}
                    onSelect={() => {
                      if (selected.includes(option)) {
                        setSelected(selected.filter((x) => x != option));
                      } else {
                        setSelected([...selected, option]);
                      }
                    }}
                  >
                    <Check
                      className={cn(
                        "ml-2 text-green-600 flex h-4 w-4 items-center justify-center opacity-0 transition-all duration-500",
                        selected.includes(option) ? "opacity-100" : "opacity-0"
                      )}
                    />

                    <span className="font-naskh">{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selected.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    className="justify-center text-center"
                    onSelect={() => setSelected([])}
                  >
                    Clear filters
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

export default DurationDropdown;
