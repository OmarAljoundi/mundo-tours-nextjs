import SectionProvider from '@/components/shared/section-provider'
import Category from '@/components/Home/category'
import ImportDynamic from 'next/dynamic'
import Hero from '@/components/Home/hero'
import HowWorks from '@/components/Home/how-works'
import Intro from '@/components/Home/intro'
import { getContentData } from '@/lib/operations'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { REVALIDATE_CONTENT_DATA } from '@/lib/keys'
import DestinationHomeLoading from '@/components/Loading/destination-home-loading'
import { Suspense } from 'react'
import BestToursListLoading from '@/components/Loading/best-tours-list-loading'

const Destination = ImportDynamic(() => import('@/components/Home/destination').then((mod) => mod.default), {
  ssr: false,
  loading: () => <DestinationHomeLoading />,
})

const BestTours = ImportDynamic(() => import('@/components/Home/best-tours').then((mod) => mod.default), {
  ssr: false,
  loading: () => <BestToursListLoading />,
})

export async function generateMetadata() {
  const data = await getContentData()
  return {
    title: data?.home?.seo?.title,
    description: data?.home?.seo?.description,
    keywords: data?.home?.seo?.tags || '',
  }
}

export default async function Home() {
  const query = new QueryClient()
  await query.prefetchQuery({
    queryKey: [REVALIDATE_CONTENT_DATA],
    queryFn: getContentData,
  })

  return (
    <div>
      <HydrationBoundary state={dehydrate(query)}>
        <Hero />
      </HydrationBoundary>

      <Suspense fallback={<DestinationHomeLoading />}>
        <SectionProvider title="إنت اختار" sub="وجهتك السياحية">
          <Destination />
        </SectionProvider>
      </Suspense>

      <SectionProvider>
        <Intro />
      </SectionProvider>

      <Suspense fallback={<BestToursListLoading />}>
        <SectionProvider title="البرامج الاكثر مبيعاً">
          <BestTours />
        </SectionProvider>
      </Suspense>

      <SectionProvider title="انواع البرامج">
        <Category />
      </SectionProvider>
      <SectionProvider title="أسهل مما تتخيل">
        <HowWorks />
      </SectionProvider>
    </div>
  )
}
