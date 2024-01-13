export type OrQuriesProp = {
  forigenTable: string | null
  query: string
}
export const getPagination = (page: number, size: number) => {
  const limit = size ? +size : 3
  let from = page ? page * limit : 0
  let to = page ? from + size : size

  if (from !== 0) {
    ++from
    ++to
  }

  return { from, to }
}
