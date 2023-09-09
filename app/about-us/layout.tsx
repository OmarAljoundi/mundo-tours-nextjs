import BreadCrumb from "@/components/About/bread-crumb";
import { getContentData } from "@/lib/fetchers";

export async function generateMetadata() {
  const data = await getContentData();
  return {
    title: data?.content?.about?.seoTitle,
    description: data?.content?.about?.seoDescription,
    keywords: data?.content?.about?.seoTags || "",
  };
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div>
        <div className="container">
          <BreadCrumb />
        </div>
        <div className="mt-4 mb-16">{children}</div>
      </div>
    </section>
  );
}
