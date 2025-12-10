# TicketHub - Sports & Concert Ticket Booking Website

A comprehensive full-stack ticket booking platform built with Next.js, MongoDB, Prisma, and modern web technologies.

## 🚀 Features

### User Panel
- **Home Page**: Browse all available tickets with category filtering (Sports/Concerts) and search functionality
- **About Page**: Company information, mission, vision, and team details
- **Contact Page**: Contact form with location map and social media links
- **User Dashboard**: 
  - Profile management
  - Order history
  - Ticket purchase interface
  - Download/View purchased tickets
- **Authentication System**: 
  - User registration and login
  - Secure JWT authentication
  - Password recovery
  - Email verification
  - Google OAuth (Firebase)

### Admin Panel
- **Dashboard**: Sales overview, revenue data, user statistics, recent orders
- **Ticket Management**: 
  - Upload new tickets
  - Edit ticket details
  - Set pricing and availability
  - Category management
  - Image uploads via Cloudinary
- **Order Management**: View all purchases, order status updates, export reports
- **User Management**: View registered users, account management

### Additional Features
- ✅ Email notifications (Order confirmation, Tickets, OTP)
- ✅ Mobile-responsive design
- ✅ Fast loading speeds with Redis caching
- ✅ SEO optimization
- ✅ Security features (JWT authentication, data encryption, Firebase Google login)

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB
- **ORM**: Prisma
- **State Management**: Zustand
- **Caching**: Redis
- **Image Storage**: Cloudinary
- **Authentication**: JWT + Firebase
- **Email**: Nodemailer
- **UI Components**: React Icons, React Hot Toast

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ticket
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/ticket-booking?retryWrites=true&w=majority"
   
   # JWT
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   JWT_EXPIRES_IN="7d"
   
   # Next.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret-change-this-in-production"
   
   # Firebase
   NEXT_PUBLIC_FIREBASE_API_KEY="your-firebase-api-key"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
   NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME="your-cloud-name"
   CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"
   
   # Redis
   REDIS_URL="redis://localhost:6379"
   
   # Email (Nodemailer)
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASSWORD="your-app-password"
   SMTP_FROM="your-email@gmail.com"
   
   # App
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Set up Prisma**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Database Schema

The application uses MongoDB with Prisma ORM. Key models include:

- **User**: User accounts with roles (USER/ADMIN)
- **Ticket**: Event tickets with categories (SPORTS/CONCERT)
- **Order**: User orders with status tracking
- **OrderItem**: Individual items in an order

## 🔐 Authentication

The application uses JWT tokens for authentication. Users can:
- Register with email/password
- Login with email/password
- Use Google OAuth (Firebase)
- Password recovery via email

## 📧 Email Notifications

Email notifications are sent using Nodemailer for:
- Order confirmations
- Email verification (OTP)
- Password reset

Configure SMTP settings in `.env`.

## 🎨 Project Structure

```
ticket/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin panel pages
│   ├── dashboard/         # User dashboard
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   └── tickets/           # Ticket detail pages
├── components/            # React components
├── lib/                   # Utility functions
│   ├── db.ts             # Prisma client
│   ├── auth.ts           # Authentication utilities
│   ├── email.ts          # Email utilities
│   └── redis.ts          # Redis utilities
├── store/                 # Zustand stores
├── prisma/                # Prisma schema
└── public/                # Static assets
```

## 🚀 Deployment

### Prerequisites
- MongoDB database (MongoDB Atlas recommended)
- Redis instance (for caching)
- Cloudinary account (for image storage)
- SMTP server (for emails)

### Build for Production
```bash
npm run build
npm start
```

## 📱 API Routes

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Tickets
- `GET /api/admin/tickets` - Get all tickets (Admin)
- `POST /api/admin/tickets` - Create ticket (Admin)
- `PUT /api/admin/tickets/[id]` - Update ticket (Admin)
- `DELETE /api/admin/tickets/[id]` - Delete ticket (Admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `GET /api/orders/[id]` - Get order details
- `GET /api/orders/stats` - Get user order statistics

### Admin
- `GET /api/admin/stats` - Get admin statistics

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- Role-based access control (Admin/User)
- Input validation and sanitization
- Secure session management

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For support, email support@tickethub.com or create an issue in the repository.

## 🎯 Roadmap

- [ ] Add Firebase Google OAuth
- [ ] Implement ticket download/PDF generation
- [ ] Add advanced search and filters
- [ ] Implement review and rating system
- [ ] Add push notifications
- [ ] Multi-language support

---

Built with ❤️ using Next.js and modern web technologies.
