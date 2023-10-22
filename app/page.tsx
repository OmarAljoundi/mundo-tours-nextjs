import SectionProvider from '@/components/common/section-provider'
import BestTours from '@/components/Home/best-tours'
import Category from '@/components/Home/category'
import Destination from '@/components/Home/destination'
import Hero from '@/components/Home/hero'
import HowWorks from '@/components/Home/how-works'
import Intro from '@/components/Home/intro'
import { getContentData } from '@/lib/operations'

export async function generateMetadata() {
  const data = await getContentData()
  return {
    title: data?.home?.seo?.title,
    description: data?.home?.seo?.description,
    keywords: data?.home?.seo?.tags || '',
  }
}
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
  )
}
