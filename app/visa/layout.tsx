import BreadCrumb from "@/components/Visa/bread-crumb";
import { getContentData } from "@/lib/fetchers";

export async function generateMetadata() {
  const data = await getContentData();
  return {
    title: data?.content?.visa?.seoTitle,
    description: data?.content?.visa?.seoDescription,
    keywords: data?.content?.visa?.seoTags || "",
  };
}

export default function VisaLayout({
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
