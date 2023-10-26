import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Database } from './types/supabase'

export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'],
}

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })

  const isDashboard = req.nextUrl.pathname.includes('dashboard')

  if (isDashboard) {
    const response = await supabase.auth.getSession()
    if (response.data.session == null) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL!}/admin/login`)
    }
    return res
  }

  return res
}
