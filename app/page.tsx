export const revalidate = 0;
import SectionProvider from "@/components/Common/section-provider";
import BestTours from "@/components/Home/best-tours";
import Category from "@/components/Home/category";
import Destination from "@/components/Home/destination";
import Hero from "@/components/Home/hero";
import HowWorks from "@/components/Home/how-works";
import Intro from "@/components/Home/intro";

export default function Home() {
  return (
    <div>
      <Hero />
      <SectionProvider title="إنت اختار" sub="وجهتك السياحية">
        <Destination />
      </SectionProvider>
      <SectionProvider>
        <Intro />
      </SectionProvider>
      <SectionProvider title="البرامج الاكثر مبيعاً">
        <BestTours />
      </SectionProvider>
      <SectionProvider title="انواع البرامج">
        <Category />
      </SectionProvider>
      <SectionProvider title="أسهل مما تتخيل">
        <HowWorks />
      </SectionProvider>
    </div>
  );
}
