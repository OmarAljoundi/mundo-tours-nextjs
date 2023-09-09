import HowWorks from "@/components/Home/how-works";
import BreadCrumb from "@/components/Tour/bread-crumb";

export default function TourLayout({
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
        <div className="mt-4 mb-16">
          {children}
          <HowWorks />
        </div>
      </div>
    </section>
  );
}
