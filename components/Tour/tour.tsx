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
    hotels,
    imageUrl,
    name,
    numberOfDays,
    seoAlt,
    startDay,
    tourCountries,
    tourType,
  } = response.tour;

  return (
    <div>
      <div className="bg-secondary/5 p-4">
        <div className="container">
          <div className="flex justify-between flex-wrap items-start ">
            <div className="grid items-start content-center">
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <h4 className="text-gray-700  dark:text-gray-100 mr-2 lg:text-3xl text-2xl font-primary font-bold">
                    {name}
                  </h4>
                </div>
                <div className="flex items-center text-primary mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5 mr-1"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <p className="text-lg font-primary  mr-2">
                    {tourCountries?.map((i) => i.label).join(" | ")}
                  </p>
                </div>
                <div className="flex flex-wrap mt-4">
                  <span className="bg-primary/50 text-xs text-black font-medium rounded-full px-4 py-1 flex items-center mr-1 mb-3 font-primary">
                    <span>مدة الرحلة {numberOfDays} أيام</span>
                  </span>
                  <span className="bg-primary/50  text-black font-medium rounded-full px-4 text-xs py-1 flex items-center mr-1 mb-3 font-primary">
                    <span className="mr-1">{tourType?.type}</span>
                  </span>
                  <span className="bg-primary/50  text-black font-medium rounded-full px-4 text-xs py-1 flex items-center mr-1 mb-3 font-primary">
                    الأيام ({startDay})
                  </span>
                </div>
                <div className="flex items-center lg:justify-start gap-2 mt-4">
                  <Button size={"sm"}>مشاركة البرنامج</Button>
                  <ContactForm />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <Image
                className="rounded-md"
                src={imageUrl ?? ""}
                alt={seoAlt ?? ""}
                width={400}
                height={50}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-12">
        <TourStory tour={response.tour} />
        <TourBenfits tour={response.tour} />
        {hotels && <TourHotels tour={response.tour} />}
      </div>
    </div>
  );
};

export default Tour;
