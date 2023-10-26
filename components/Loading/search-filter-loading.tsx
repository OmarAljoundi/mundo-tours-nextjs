import { Skeleton } from '../ui/skeleton'

const SearchFilterLoading = () => {
  return (
    <div className="p-3 sm:p-4 lg:py-6 lg:px-8 bg-white  shadow-lg mb-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Skeleton className="h-9  px-3" />
      <Skeleton className="h-9  px-3" />
      <Skeleton className="h-9  px-3" />
      <Skeleton className="h-9  px-3" />
    </div>
  )
}

export default SearchFilterLoading
