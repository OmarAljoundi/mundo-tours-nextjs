"use client";

import { getDestination, getLocationTours, getTours } from "@/lib/fetchers";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import TourCard from "../Common/tour-card";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import React from "react";
import { ITour } from "@/interface/Tour";

const Tours = () => {
  const searchParams = useSearchParams();
  const { destination } = useParams();
  const selectedDest = decodeURIComponent(destination?.toString());
  const { ref, inView } = useInView();
  const LIMIT = 10;

  const { data: location_response, isLoading: locationLoading } = useQuery(
    "locations-2",
    async () => await getDestination(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  const getLocationId = (dest: string) => {
    return location_response?.locations?.find((x) => x.name === dest)?.id || 0;
  };

  const { data: loacationsTours, isLoading: isLoadingLocationTours } = useQuery(
    [destination, locationLoading],
    async () =>
      await getLocationTours(getLocationId(selectedDest?.replaceAll("-", " "))),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled:
        destination != "" &&
        !locationLoading &&
        getLocationId(selectedDest?.replaceAll("-", " ")) > 0,
    }
  );

  const getTourIds = () => {
    if (loacationsTours) {
      if (loacationsTours.total == 1) {
        return loacationsTours?.locationTours[0].tourIds;
      } else if (loacationsTours.locationTours.length > 1) {
        const tab = searchParams?.get("tab") ?? "1";
        return loacationsTours.locationTours.find((o) => o.tab == Number(tab))
          ?.tourIds;
      }
    }
    return null;
  };

  const {
    data: response,
    isSuccess,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [
      searchParams?.get("country"),
      searchParams?.get("days"),
      searchParams?.get("tab"),
      searchParams?.get("type"),
      searchParams?.get("page"),
      destination,
      loacationsTours,
    ],
    async ({ pageParam = 0 }) =>
      await getTours({
        pageSize: 10,
        country: searchParams?.get("country") as string,
        days: searchParams?.get("days") as string,
        tab: searchParams?.get("tab") as string,
        type: searchParams?.get("type") as string,
        tourIds: getTourIds(),
        pageIndex: pageParam,
      }),
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      keepPreviousData: false,
      enabled: true,
      getNextPageParam: (lastPage, allPages) => {
        let currentTotal = 0;
        allPages.map((i) => {
          currentTotal += i.tours.length;
        });
        if (currentTotal < lastPage.total) return allPages.length;

        return undefined;
      },
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);
  return (
    <div>
      <div className="grid grid-cols-12 gap-x-2 gap-y-4 lg:gap-8">
        {isSuccess &&
          response.pages.map((page) =>
            page?.tours?.map((tour, i) => {
              if (page?.tours?.length === i + 1) {
                return <TourContent ref={ref} key={tour.id} {...tour} />;
              }
              return <TourContent key={tour.id} {...tour} />;
            })
          )}
      </div>
    </div>
  );
};

export default Tours;

const TourContent = React.forwardRef((tour: ITour, ref) => {
  const content = ref ? (
    <article
      className="col-span-12 sm:col-span-6 xl:col-span-4 px-3 xl:px-0"
      //@ts-ignore
      ref={ref}
    >
      <TourCard tour={tour} />
    </article>
  ) : (
    <article className="col-span-12 sm:col-span-6 xl:col-span-4 px-3 xl:px-0">
      <TourCard tour={tour} />
    </article>
  );
  return content;
});
