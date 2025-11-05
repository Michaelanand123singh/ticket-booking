import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendEmail, generatePasswordResetEmail } from '@/lib/email'
import { setCache } from '@/lib/redis'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Don't reveal if user exists or not for security
    if (!user) {
      return NextResponse.json({
        message: 'If the email exists, a password reset link has been sent.',
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour

    // Store token in cache (Redis) or database
    await setCache(`password-reset:${resetToken}`, {
      userId: user.id,
      email: user.email,
      expiresAt: resetTokenExpiry.toISOString(),
    }, 3600) // 1 hour expiry

    // Send reset email
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`
    
    await sendEmail({
      to: email,
      subject: 'Password Reset Request - TicketHub',
      html: generatePasswordResetEmail(resetUrl),
    })

    return NextResponse.json({
      message: 'If the email exists, a password reset link has been sent.',
    })
  } catch (error) {
    console.error('Password reset error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

