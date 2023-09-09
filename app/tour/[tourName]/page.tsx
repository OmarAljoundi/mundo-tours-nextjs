import Tour from "@/components/Tour/tour";
import { getTourBySlug } from "@/lib/fetchers";
import { Metadata } from "next";

type Params = {
  params: {
    tourName: string;
  };
};

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
