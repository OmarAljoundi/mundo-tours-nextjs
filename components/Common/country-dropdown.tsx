"use client";
import { Fragment, useState, useEffect, FC } from "react";
import { QueryString, cn, europeanCountries, queryString } from "@/lib/utils";
import { Plus, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Separator } from "../ui/separator";
import Image from "next/image";
import qs from "query-string";

const CountryDropdown: FC<{
  setSearch: (search: QueryString) => void;
  search: QueryString;
  onChange: boolean;
}> = ({ onChange, search, setSearch }) => {
  const [selected, setSelected] = useState<
    { countryCode: string; label: string }[]
  >(() => {
    if (typeof window !== "undefined") {
      const query = qs.parseUrl(window.location.href, {
        arrayFormat: "comma",
        decode: true,
      }).query;

      if (typeof query.country == "string") query.country = [query.country];
      if (query.country && query.country.length > 0) {
        const labelSet = new Set(query.country);
        const filteredObjects = europeanCountries.filter((obj) =>
          labelSet.has(obj.label)
        );
        return filteredObjects;
      }
    }
    return [];
  });

  useEffect(() => {
    setSearch({
      ...search,
      country: selected.map((x) => x.label),
    });
  }, [selected]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="text-left w-full  cursor-pointer"
        >
          <Plus className="ml-2 h-4 w-4" />
          الدول
          {selected.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selected.length}
              </Badge>
              <div className="hidden space-x-1 lg:flex gap-2">
                {selected.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selected.length} selected
                  </Badge>
                ) : (
                  europeanCountries
                    .filter((option) => selected.includes(option))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.label}
                        className="rounded-sm px-1 font-normal "
                      >
                        {option.label}
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
          <CommandInput placeholder={"ابحث عن الدولة"} className="ml-4" />
          <CommandList>
            <CommandEmpty>لاتوجد نتائج</CommandEmpty>
            <CommandGroup>
              {europeanCountries.map((option) => {
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
                    <Image
                      src={`https://flagcdn.com/48x36/${option.countryCode.toLowerCase()}.png`}
                      width={48}
                      height={36}
                      alt={option.countryCode}
                      fetchPriority="high"
                      loading="eager"
                      className="ml-2 h-4 w-4 text-muted-foreground"
                    />
                    <span>{option.label}</span>
                    {/* {facets?.get(option.value) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option.value)}
                      </span>
                    )} */}
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

export default CountryDropdown;
