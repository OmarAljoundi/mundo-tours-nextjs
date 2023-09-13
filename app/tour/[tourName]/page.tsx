export const revalidate = 0;
import Tour from "@/components/Tour/tour";
import { ITourResponse } from "@/interface/Response";
import { SearchQuery } from "@/interface/Search";
import { getTourBySlug } from "@/lib/fetchers";
import { http } from "@/service/httpService";
import { Metadata } from "next";

type Params = {
  params: {
    tourName: string;
  };
};

export async function generateStaticParams() {
  const _SQ: SearchQuery = {
    FilterByOptions: [],
    OrderByOptions: [],
    PageIndex: 0,
    PageSize: 0,
  };
  const result = await http<ITourResponse>("Tour/SearchBusiness").post(_SQ);

  return result.tours.map((tour) => ({
    slug: `${tour.name?.replaceAll(" ", "-")}`,
  }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const slug = params.tourName;
  const data = await getTourBySlug(slug);
  const { tour } = data;
  if (tour) {
    return {
      title: tour.seoTitle,
      description: tour.seoDescription,
      openGraph: {
        title: tour.seoTitle || "",
        description: tour.seoDescription || "",
        type: "website",
        images: [tour.imageUrl || ""],
        siteName: "Mundo Tours",
      },
      keywords: tour.seoTag || "",
    };
  }
  return {
    title: "Error - Product not found ",
  };
}

const TourPage = () => {
  return <Tour />;
};

export default TourPage;
