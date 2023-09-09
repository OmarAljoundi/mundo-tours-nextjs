"use client";
import { FC, useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Banknote } from "lucide-react";
import { Button } from "../ui/button";
import qs from "query-string";
import useDebounce from "@/hooks/useDebounce";
import { usePathname, useRouter } from "next/navigation";
import { QueryString } from "@/lib/utils";

const PriceDropdown: FC<{
  onChange: boolean;
  setSearch: (QueryString: QueryString) => void;
  search: QueryString;
}> = ({ onChange, search, setSearch }) => {
  const pathname = usePathname();
  const [value, setValue] = useState<number>(1000);
  const debouncedValue = useDebounce<number>(value, 750);
  const router = useRouter();

  useEffect(() => {
    const query = qs.parseUrl(window.location.href, {
      arrayFormat: "comma",
      decode: true,
    }).query;

    if (query.maxprice) {
      setValue(Number(query.maxprice));
    }
  }, []);

  useEffect(() => {
    const query = {
      ...qs.parseUrl(window.location.href, {
        arrayFormat: "comma",
        decode: true,
      }).query,
      maxprice: value,
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      {
        skipNull: true,
        skipEmptyString: true,
        arrayFormat: "comma",
        encode: true,
      }
    );

    if (onChange) {
      router.push(url);
    } else {
      //@ts-ignore
      setSearch({
        ...search,
        maxprice: debouncedValue,
      });
    }
  }, [debouncedValue, router]);

  return (
    <Button
      variant="outline"
      size="sm"
      className="text-left w-full cursor-pointer relative block"
    >
      <div className="sm:px-6 focus:shadow-xl  gap-3 items-center sm:text-sm ">
        <div className="w-full py-1 flex items-center gap-2">
          <span className="flex items-center gap-1">
            <Banknote />
            السعر
          </span>
          <span className="absolute top-[-14px] bg-white rounded-2xl py-1 px-5 right-4 shadow text-primary text-xs">
            ر.ع {value}
          </span>
          <Slider
            handleStyle={{
              backgroundColor: "var(--primary)",
              borderColor: "var(--primary)",
            }}
            max={1000}
            trackStyle={{ backgroundColor: "var(--primary)" }}
            value={value}
            onChange={(value) => setValue(value as number)}
          />
        </div>
      </div>
    </Button>
  );
};

export default PriceDropdown;
