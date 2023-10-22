export const revalidate = 0
import { supabaseClientComponent } from '@/lib/supabaseClientComponent'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  const email = req.nextUrl.searchParams.get('email')
  const password = req.nextUrl.searchParams.get('password')

  if (email && password) {
    const { data, error } = await supabaseClientComponent.auth.signInWithPassword({
      email: email!,
      password: password!,
    })

    if (error) {
      return NextResponse.json(
        {
          message: error.message,
          success: false,
        },
        {
          status: 401,
        },
      )
    }

    await supabase.auth.setSession({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    })

    return NextResponse.json(
      {
        message: 'Logged in successfully',
        success: true,
      },
      {
        status: 200,
      },
    )
  }
  return NextResponse.json(
    {
      message: 'invalid credentials',
      success: false,
    },
    {
      status: 400,
    },
  )
}
