"use client";

import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import BreadCrumb from "./bread-crumb";
import { useQuery } from "react-query";
import { getTourBySlug } from "@/lib/fetchers";
import Image from "next/image";
import TourStory from "./tour-story";
import TourBenfits from "./tour-benfits";
import TourHotels from "./tour-hotels";
import ContactForm from "../Common/contact-form";
import {
  BedDouble,
  BedSingle,
  CalendarDays,
  Clock7,
  MapPin,
  QrCode,
  Type,
} from "lucide-react";
import BlurImage from "../Common/blur-image";
import Share from "./share";
import TourLinks from "./tour-links";

const Tour = () => {
  const { tourName } = useParams();

  const { data: response, isLoading } = useQuery(
    tourName,
    async () => await getTourBySlug(decodeURIComponent(tourName as string)),
    {
      enabled: !!tourName,
    }
  );

  if (isLoading || !response?.tour) return null;

  const {
    id,
    hotels,
    imageUrl,
    name,
    numberOfDays,
    seoAlt,
    startDay,
    tourCountries,
    tourType,
    price,
    pricePerSingle,
  } = response.tour;

  return (
    <div>
      <div className="bg-secondary/5 p-4">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-16 justify-center lg:justify-between  items-start ">
            <div className="px-3 sm:px-4 lg:px-6 py-6 col-span-2  bg-white rounded-2xl border border-neutral-40 mb-6 shadow-card w-full">
              <h1 className="text-3xl text-center font-primary">الأسعار</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-between mt-5">
                <div className="shadow-lg p-5 border rounded-lg">
                  <div className="grid items-center justify-items-center">
                    <div className="bg-primary p-2 rounded-full">
                      <BedSingle className=" text-white " />
                    </div>
                    <h4 className="mt-2  text-base sm:text-sm md:text-sm font-primary">
                      الشخض في الغرفة المزدوجة
                    </h4>
                    <h2 className="text-xl font-bold">{price}</h2>
                  </div>
                </div>
                <div className="shadow-lg p-5 border rounded-lg">
                  <div className="grid items-center justify-items-center ">
                    <div className="bg-primary p-2 rounded-full">
                      <BedDouble className=" text-white " />
                    </div>
                    <h4 className="mt-2 text-base sm:text-sm md:text-sm font-primary">
                      الشخض في الغرفة المفردة
                    </h4>
                    <h2 className="text-xl font-bold">{pricePerSingle}</h2>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-x-8  border-t border-dashed mt-4  gap-md-0 divide-y divide-dashed font-primary">
                <div className="py-2 col-span-2">
                  <div className="flex items-center gap-4 ">
                    <div className="bg-primary p-2 rounded-full">
                      <MapPin className=" text-white " />
                    </div>
                    <div className="grid items-center ">
                      <span>الدول</span>
                      <span className="text-primary font-primary">
                        {tourCountries?.map((i) => i.label)?.join(" - ")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="py-2 col-span-2">
                  <div className="flex items-center gap-4 ">
                    <div className="bg-primary p-2 rounded-full">
                      <Clock7 className=" text-white " />
                    </div>
                    <div className="grid items-center w-fit">
                      <span>المدة</span>
                      <span>
                        <span className="text-primary">
                          {numberOfDays} أيام
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="py-2 col-span-2">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-4 ">
                      <div className="bg-primary p-2 rounded-full">
                        <CalendarDays className=" text-white " />
                      </div>
                      <div className="grid items-center ">
                        <span>تاريخ الرحلة</span>
                        <div
                          className="flex justify-between
                     items-center gap-4"
                        >
                          <span className="text-primary">
                            أيام {startDay} أسبوعياً
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <DatesData tour={tour} /> */}
                  </div>
                </div>
                <div className="py-2 col-span-2">
                  <div className="flex items-center gap-4 ">
                    <div className="bg-primary p-2 rounded-full">
                      <Type className=" text-white " />
                    </div>
                    <div className="grid items-center ">
                      <span>نوع الرحلة الرحلة</span>
                      <span>
                        <span className="text-primary">{tourType?.type}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-3 sm:px-4 lg:px-6 py-6 bg-white rounded-2xl border border-neutral-40 mb-6 shadow-card">
              <h1 className="text-3xl text-center font-primary mb-5 ">
                {name}
              </h1>
              <BlurImage
                className="rounded-md"
                src={imageUrl ?? ""}
                alt={seoAlt ?? ""}
                quality={100}
                width={640}
                height={427}
              />
              <Share />
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-12">
        <TourStory tour={response.tour} />
        <TourLinks tour={response.tour} />

        <TourBenfits tour={response.tour} />
        {hotels && <TourHotels tour={response.tour} />}
      </div>
    </div>
  );
};

export default Tour;
