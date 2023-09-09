"use client";
import { getDestination } from "@/lib/fetchers";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import DestinationHomeLoading from "../Loading/destination-home-loading";

const Destination = () => {
  const { isLoading, data: response } = useQuery(
    "Locations",
    async () => await getDestination(),
    {
      refetchInterval: false,
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="container">
      {isLoading ? (
        <div className="mt-8">
          <DestinationHomeLoading />{" "}
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4 mt-8">
          {response?.locations?.map((location, index) => (
            <Link
              href={`/tour-listing/${location.name?.replaceAll(" ", "-")}`}
              key={location.id}
              className={cn(
                "block col-span-12",
                location.imageSize == 4 ? `sm:col-span-4` : "sm:col-span-6"
              )}
            >
              <div className="relative rounded-2xl group transition-all duration-500">
                <div className="listing-card__img">
                  <Image
                    src={location.imageUrl || ""}
                    alt="image"
                    className=" w-full rounded-2xl"
                    width={400}
                    height={307}
                  />
                </div>
                <div
                  className="absolute top-0 left-0 flex flex-col justify-between h-full w-full before:w-full 
                before:absolute before:h-full before:bottom-0 before:left-0 before:bg-gradient-to-t 
                 before:from-black/40 before:rounded-2xl  group-hover:before:transition-all group-hover:before:duration-500 group-hover:before:blur-2xl before:to-black/50 group-hover:after:w-full group-hover:after:absolute 
                 "
                >
                  <div className=" items-end px-5 pb-5 flex flex-wrap w-full gap-4 h-full justify-between z-10">
                    <div>
                      <div className="flex gap-2 items-center">
                        <i className="las la-map-marker-alt text-3xl text-[#9C742B]"></i>
                        <h4 className="text-xl sm:text-base lg:text-2xl text-white font-semibold">
                          {location.name}
                        </h4>
                      </div>
                    </div>
                    <div
                      className="inline-flex text-xs rounded-2xl px-4 py-2
                     items-center bg-white/50 group-hover:bg-white/70  justify-center  duration-300 font-primary"
                    >
                      {location.totalTours} رحلات ضمن البرنامج
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Destination;
