import BreadCrumb from "@/components/About/bread-crumb";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

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
