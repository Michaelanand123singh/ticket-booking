import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getCache, deleteCache } from '@/lib/redis'

export async function POST(request: NextRequest) {
  try {
    const { otp, email } = await request.json()

    if (!otp || !email) {
      return NextResponse.json(
        { message: 'OTP and email are required' },
        { status: 400 }
      )
    }

    // Get OTP from cache
    const storedOtp = await getCache(`email-verification:${email}`)

    if (!storedOtp || storedOtp !== otp) {
      return NextResponse.json(
        { message: 'Invalid or expired OTP' },
        { status: 400 }
      )
    }

    // Verify user email
    await prisma.user.update({
      where: { email },
      data: { emailVerified: true },
    })

    // Delete OTP from cache
    await deleteCache(`email-verification:${email}`)

    return NextResponse.json({
      message: 'Email verified successfully',
    })
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

