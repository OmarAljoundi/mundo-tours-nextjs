import TourForm from "@/components/tour-form";
import { http } from "@/service/httpService";
import { Response, Tour } from "@/types/custom";
import { SearchQuery, eFilterOperator } from "@/types/search";
import { Divider } from "@nextui-org/react";
import { formatDistance, subDays } from "date-fns";
import { notFound } from "next/navigation";
import { FunctionComponent } from "react";

interface NewTourPageProps {
  params: { tourId: string };
}

const NewTourPage: FunctionComponent<NewTourPageProps> = async ({ params }) => {
  var _SQ: SearchQuery = {
    FilterByOptions: [
      {
        FilterFor: params.tourId,
        FilterOperator: eFilterOperator.EqualsTo,
        MemberName: "id",
      },
    ],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 1,
    Table: "tour",
    Select: "*",
  };
  const response = await http<Response<Tour>>("/api/search", {
    revalidate: 0,
  }).post(_SQ);

  if (response.success == false) {
    return notFound();
  }
  return (
    <div className="px-8">
      <div className="flex justify-between">
        <h1 className="text-3xl mt-16"> {response?.result?.name}</h1>
        <h1 className="text-3xl mt-16">
          {" "}
          {formatDistance(
            subDays(new Date(response.result!.created_at!), 3),
            new Date(),
            { addSuffix: true }
          )}
        </h1>
      </div>
      <TourForm data={response.result} />
    </div>
  );
};

export default NewTourPage;
