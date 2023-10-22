import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const tag = req.nextUrl.searchParams.get('tag') ?? ('' as string)
    if (!tag) {
      throw new Error('Tags is missing!')
    }
    revalidateTag(tag)
    console.log('Done revalidating -- ', tag)
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
