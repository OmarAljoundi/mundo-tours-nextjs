export const revalidate = 0;
import BreadCrumb from "@/components/TourListing/bread-crumb";
import ClientProvider from "@/components/Common/client-provider";
import Filter from "@/components/Common/filter";
import { getContentData } from "@/lib/fetchers";

export async function generateMetadata() {
  const data = await getContentData();
  return {
    title: data?.content?.allTours?.seoTitle,
    description: data?.content?.allTours?.seoDescription,
    keywords: data?.content?.allTours?.seoTags || "",
  };
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="container">
        <BreadCrumb />
        <Filter onChange={true} enableTabs={true} />
        <div className="mt-4 mb-16">{children}</div>
      </div>
    </section>
  );
}
