import { ITour } from "@/interface/Tour";
import { Check, X } from "lucide-react";
import { FC } from "react";
const TourBenfits: FC<{ tour: ITour }> = ({ tour }) => {
  return (
    <div className="p-3 sm:p-4 lg:p-6 bg-[var(--bg-1)] rounded-2xl border border-neutral-40 mb-6 lg:mb-10">
      <h4 className="mb-0 text-2xl font-semibold font-primary">
        مميزات البرنامج
      </h4>
      <div className="border border-dashed my-5"></div>
      <h6 className="mb-4 font-semibold font-primary"> ما يشمله البرنامج </h6>
      <ul className="flex flex-col gap-4 mb-10">
        {tour?.tourIncludes?.map((i) => (
          <li key={i.id}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-green-500/80">
                <Check className="p-1 text-white" />
              </div>
              <span className="inline-block font-primary">{i.details}</span>
            </div>
          </li>
        ))}
      </ul>
      <h6 className="mb-4 font-semibold font-primary"> ما لايشمله البرنامج </h6>
      <ul className="flex flex-col gap-4 mb-10">
        {tour?.tourExcludes?.map(({ id, details, title }) => (
          <li key={id}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-red-500/80">
                <X className="p-1 text-white" />
              </div>
              <span className="inline-block font-primary">{details}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourBenfits;
