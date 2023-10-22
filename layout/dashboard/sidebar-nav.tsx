"use client";
import { Separator } from "@/components/ui/separator";
import { MenuItems } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FunctionComponent } from "react";

interface SidebarNavProps {}

const SidebarNav: FunctionComponent<SidebarNavProps> = () => {
  const pathname = usePathname();
  return (
    <div className="flex w-14 flex-col justify-start overflow-hidden  border-r dark:border-dark bg-body border-scale-500 ">
      <div
        className="dark:border-dark flex max-h-12 items-center border-b px-6"
        style={{ minHeight: "3rem" }}
      ></div>
      <ul className="flex flex-col space-y-4 items-center p-2">
        {MenuItems.map((i) => (
          <Tooltip key={i.label} placement={"right"} content={i.label}>
            <button>
              <Link href={i.href}>
                <span
                  className={cn(
                    `transition-colors
                  duration-200 flex items-center group
                   justify-center h-10 w-10 rounded  hover:dark:bg-scale-500 hover:bg-slate-300 group `,
                    pathname.startsWith(i.href)
                      ? "dark:bg-scale-500 bg-slate-300 text-slate-600 "
                      : ""
                  )}
                >
                  <i.icon
                    className={cn("h-7 w-7 group-hover:text-slate-600 ")}
                  />
                </span>
              </Link>
            </button>
          </Tooltip>
        ))}
      </ul>
    </div>
  );
};

export default SidebarNav;
