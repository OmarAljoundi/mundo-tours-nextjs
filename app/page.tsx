import SectionProvider from '@/components/shared/section-provider'
import Hero from '@/components/Home/hero'
import HowWorks from '@/components/Home/how-works'
import Intro from '@/components/Home/intro'
import { getContentData } from '@/lib/operations'
import DestinationList from '@/components/Home/destination-list'
import BestToursList from '@/components/Home/best-tours.list'
import CategoryList from '@/components/Home/category-list'

export async function generateMetadata() {
  const data = await getContentData()
  return {
    title: data?.home?.seo?.title,
    description: data?.home?.seo?.description,
    keywords: data?.home?.seo?.tags || '',
  }
}

export default async function Home() {
  return (
    <div>
      <Hero />

      <SectionProvider title="إنت اختار" sub="وجهتك السياحية">
        <DestinationList />
      </SectionProvider>

      <SectionProvider>
        <Intro />
      </SectionProvider>

      <SectionProvider title="البرامج الاكثر مبيعاً">
        <BestToursList />
      </SectionProvider>

      <SectionProvider title="انواع البرامج">
        <CategoryList />
      </SectionProvider>

      <SectionProvider title="أسهل مما تتخيل">
        <HowWorks />
      </SectionProvider>
    </div>
  )
}
