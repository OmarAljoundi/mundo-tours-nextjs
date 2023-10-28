import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const tag = req.nextUrl.searchParams.get('tag') ?? ('' as string)
    if (!tag) {
      throw new Error('Tags is missing!')
    }
    revalidateTag(tag)
    console.log('Done revalidating -- Mundo Tours', tag)

    const validateB2B = await fetch(`https://imtour.travel/api/revalidate?tag=${tag}`, { next: { revalidate: 0 } })

    if (validateB2B.status !== 200) {
      var content = await validateB2B.json()
      console.error(`An error occured while revalidating B2B Site.. ${content}`)
    }

    return NextResponse.json(
      {
        success: true,
      },
      {
        status: 200,
      },
    )
  } catch (ex) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 400,
      },
    )
  }
}
