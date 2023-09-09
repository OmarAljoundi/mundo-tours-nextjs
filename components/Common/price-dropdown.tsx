"use client";
import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Banknote } from "lucide-react";
import { Button } from "../ui/button";

export default function PriceDropdown() {
  const [value, setValue] = useState(40);

  return (
    <Button
      variant="outline"
      size="sm"
      className="text-left w-full cursor-pointer relative block"
    >
      <div className="px-6 focus:shadow-xl  gap-3 items-center sm:text-sm ">
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
            max={500}
            trackStyle={{ backgroundColor: "var(--primary)" }}
            value={value}
            onChange={(value) => setValue(value as number)}
          />
        </div>
      </div>
    </Button>
  );
}
