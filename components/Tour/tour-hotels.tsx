import { ITour } from "@/interface/Tour";
import { Hotel } from "lucide-react";
import { FC } from "react";

const TourHotels: FC<{ tour: ITour }> = ({ tour }) => {
  return (
    <div className="p-3 sm:p-4 lg:p-6 bg-[var(--bg-1)] rounded-2xl border border-neutral-40 mb-6 lg:mb-10">
      <h4 className="mb-0 text-2xl font-semibold font-primary">
        أسماء الفنادق المتوقعة
      </h4>
      <div className="border border-dashed my-5"></div>
      <ul className="flex flex-col gap-4 mb-10">
        {tour?.hotels?.split(",").map((i) => (
          <li key={i}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-secondary/80">
                <Hotel className="p-1 text-white" />
              </div>
              <span className="inline-block font-primary">{i}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourHotels;
