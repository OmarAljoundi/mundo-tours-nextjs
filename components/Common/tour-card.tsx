import { ITour } from "@/interface/Tour";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const TourCard: React.FC<{ tour: ITour }> = ({ tour }) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-2 ">
      <div className="rounded-2xl relative group">
        <div className="property-card__img relative">
          <Image
            width={1000}
            height={500}
            quality={100}
            src={tour.imageUrl || ""}
            alt="image"
            className="rounded-2xl w-full h-[200px] lg:h-[300px]"
          />
          <div className="absolute top-2 right-2 bg-white w-auto px-4 h-11 sm:h-6 lg:h-11 rounded-full shadow-xl border-primary border-2">
            <div className="flex justify-center items-center h-full text-base sm:text-sm  lg:text-base font-primary">
              {tour.numberOfDays} يوم
            </div>
          </div>
          <div className="absolute top-2 left-2 bg-white w-auto px-4 h-11 sm:h-6 lg:h-11 rounded-full shadow-xl border-primary border-2">
            <div className="flex justify-center items-center h-full text-base sm:text-sm lg:text-base font-primary">
              {tour.tourType?.type}
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 sm:p-4 lg:p-5">
        <div className="flex items-center gap-1 mb-4 mt-5 sm:mt-3">
          <div className="flex gap-1">
            {tour?.tourCountries?.slice(0, 4).map((i) => (
              <span
                className="inline-block bg-secondary text-white px-2 py-1 text-[14px] rounded-md"
                key={i.id}
              >
                {i.label}
              </span>
            ))}
          </div>
        </div>
        <Link
          href={`/tour/${tour.name?.replaceAll(" ", "-")}`}
          className="text-base sm:text-xl font-medium text-neutral-700 mb-4"
        >
          {tour.name}
        </Link>
      </div>
      <div className="property-card__body py-0 mx-5">
        <div className=" border-t border-dashed"></div>
      </div>
      <div className="px-2 sm:px-5 pb-5 pt-3">
        <div className="flex flex-wrap justify-between items-center gap-5">
          <span className="text-primary text-xl font-medium">
            {tour?.price} ر.ع
            <span className="text-base text-neutral-700">
              {" "}
              / للشخص في الغرفة المزدوجة{" "}
            </span>
          </span>

          <Link href={`/tour/${tour.name?.replaceAll(" ", "-")}`}>
            <Button>عرض التفاصيل</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;