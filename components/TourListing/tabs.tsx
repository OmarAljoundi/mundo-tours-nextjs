import {
  Tabs as TabUi,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { BaseResponse } from "@/interface/BaseResponse";
import { ILocation, ILocationTours } from "@/interface/Location";
import { ILocationResponse } from "@/interface/Response";
import { getLocationTours } from "@/lib/fetchers";
import { QueryString } from "@/lib/utils";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "react-query";

const Tabs: React.FC<{
  setSearch: (search: QueryString) => void;
  search: QueryString;
  onChange: boolean;
}> = ({ onChange, search, setSearch }) => {
  const { data: locations, isLoading } = useQuery("locations");

  const { destination } = useParams();
  const searchParams = useSearchParams();

  const selectedDest = decodeURIComponent(destination?.toString());

  const getLocationId = (dest: string) => {
    return (
      (locations as ILocationResponse)?.locations.find((x) => x.name === dest)
        ?.id || 0
    );
  };

  const { data: loactionsTours, isLoading: isLoadingLocationTours } = useQuery(
    destination,
    async () =>
      await getLocationTours(getLocationId(selectedDest?.replaceAll("-", " "))),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      enabled: destination != "",
    }
  );

  if (
    !loactionsTours ||
    loactionsTours.locationTours.length <= 1 ||
    !destination
  )
    return null;

  return (
    <TabUi
      defaultValue={
        searchParams?.get("tab") ??
        loactionsTours?.locationTours[0].tab.toString()
      }
      className="w-full mb-8 "
      onValueChange={(e) => setSearch({ ...search, tab: e })}
    >
      <TabsList className="w-full shadow-xl bg-white gap-4 grid grid-cols-2 lg:grid-cols-4 h-full">
        {loactionsTours?.locationTours?.map((item) => (
          <TabsTrigger
            value={item.tab.toString()}
            key={item.id}
            className="w-full data-[state=active]:bg-secondary data-[state=active]:text-white px-4 "
          >
            {item.title}
          </TabsTrigger>
        ))}
      </TabsList>
    </TabUi>
  );
};

export default Tabs;
