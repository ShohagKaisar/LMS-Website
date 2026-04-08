import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/auth/login - Login user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const user = await db.user.findUnique({ where: { email } })

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Demo: simple password check (no bcrypt for demo)
    if (user.password !== password) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    if (!user.isApproved) {
      return NextResponse.json(
        { success: false, error: 'Account not approved' },
        { status: 403 }
      )
    }

    // Update last active
    await db.user.update({
      where: { id: user.id },
      data: { lastActiveAt: new Date() },
    })

    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({
      success: true,
      data: userWithoutPassword,
      message: 'Login successful',
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Login failed' },
      { status: 500 }
    )
  }
}
