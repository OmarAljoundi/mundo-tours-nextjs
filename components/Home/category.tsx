"use client";

import { getTourTypes } from "@/lib/fetchers";
import Image from "next/image";
import { useQuery } from "react-query";
import { Button } from "../ui/button";

const Category = () => {
  const { isLoading, data: response } = useQuery(
    "TourTypes",
    async () => await getTourTypes()
  );

  return (
    <div className="container">
      <div className="grid grid-cols-2 lg:grid-cols-5 mt-8 gap-4">
        {response?.map((i) => (
          <div key={i.id} className="w-full">
            <div className="grid justify-items-center p-4 border-2 border-dashed border-primary rounded-2xl gap-4 shadow-xl">
              <Image src={i?.image ?? ""} width={50} height={50} alt={i.type} />
              <h4 className="font-primary text-xl">{i.type}</h4>
              <Button>المزيد</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
