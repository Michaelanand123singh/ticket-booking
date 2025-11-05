import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    })
    return true
  } catch (error) {
    console.error('Email sending error:', error)
    return false
  }
}

export function generateOrderConfirmationEmail(order: any, tickets: any[]) {
  const ticketList = tickets
    .map(
      (t) => `
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;">${t.title}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${t.quantity}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">$${t.price.toFixed(2)}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">$${(t.quantity * t.price).toFixed(2)}</td>
    </tr>
  `
    )
    .join('')

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #4F46E5;">Order Confirmation</h1>
          <p>Thank you for your purchase! Your order has been confirmed.</p>
          
          <h2 style="color: #4F46E5; margin-top: 30px;">Order Details</h2>
          <p><strong>Order ID:</strong> ${order.id}</p>
          <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Total Amount:</strong> $${order.totalAmount.toFixed(2)}</p>
          
          <h2 style="color: #4F46E5; margin-top: 30px;">Tickets</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
              <tr style="background-color: #4F46E5; color: white;">
                <th style="padding: 10px; border: 1px solid #ddd;">Ticket</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Quantity</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Price</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${ticketList}
            </tbody>
          </table>
          
          <p style="margin-top: 30px;">You can view and download your tickets from your dashboard.</p>
          
          <p style="margin-top: 30px;">Best regards,<br>Ticket Booking Team</p>
        </div>
      </body>
    </html>
  `
}

export function generateOTPEmail(otp: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #4F46E5;">Verification Code</h1>
          <p>Your verification code is:</p>
          <div style="background-color: #F3F4F6; padding: 20px; text-align: center; margin: 20px 0;">
            <h2 style="color: #4F46E5; font-size: 32px; letter-spacing: 5px; margin: 0;">${otp}</h2>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this code, please ignore this email.</p>
        </div>
      </body>
    </html>
  `
}

export function generatePasswordResetEmail(resetUrl: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #4F46E5;">Password Reset Request</h1>
          <p>You requested to reset your password. Click the button below to reset it:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
          </div>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #4F46E5;">${resetUrl}</p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request a password reset, please ignore this email.</p>
          <p style="margin-top: 30px;">Best regards,<br>TicketHub Team</p>
        </div>
      </body>
    </html>
  `
}

