# 💊 MedTracker

A personal medicine tracking web application built with **Next.js**, **TypeScript**, **Prisma**, and **PostgreSQL**.

---

## 🚀 Features

- 🔐 **Authentication** — Secure signup and signin with NextAuth.js
- 💊 **Medicine Management** — Add, edit, and delete medicines with dosage and stock info
- 🔔 **Smart Reminders** — Set multiple daily/weekly reminders per medicine
- 📦 **Stock Tracking** — Track stock in/out with automatic deduction on dose taken
- ⚠️ **Low Stock Alerts** — Get notified when medicine stock is running low
- ✅ **Auto Stock Deduction** — Marking a dose as taken automatically deducts stock
- 📊 **Dashboard** — Overview of today's reminders, low stock, and recent stock changes
- 📱 **Fully Responsive** — Works on all devices

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | shadcn/ui + Tailwind CSS |
| Authentication | NextAuth.js v5 (Auth.js) |
| Database | PostgreSQL (Neon) |
| ORM | Prisma 7 |
| Validation | Zod + React Hook Form |
| Alerts | SweetAlert2 |

---

## 📁 Project Structure

medicine-tracker/
├── app/
│   ├── (auth)/
│   │   ├── signin/
│   │   └── signup/
│   ├── api/
│   │   ├── auth/
│   │   ├── medicines/
│   │   ├── reminders/
│   │   ├── stock/
│   │   └── dashboard/
│   ├── dashboard/
│   │   ├── medicines/
│   │   ├── reminders/
│   │   └── stock/
│   └── page.tsx
├── components/
│   ├── dashboard/
│   ├── home/
│   ├── layout/
│   ├── medicines/
│   ├── reminders/
│   └── stock/
├── lib/
│   └── db.ts
├── prisma/
│   └── schema.prisma
├── types/
│   ├── medicine.ts
│   ├── reminder.ts
│   ├── stock.ts
│   └── dashboard.ts
└── middleware.ts

---

## 🗄️ Database Schema

```prisma
User
  └── Medicine (one-to-many)
        ├── ReminderSchedule (one-to-many)
        │     └── ReminderTime (one-to-many)
        └── StockLog (one-to-many)
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL database (or Neon account)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Asha-08/medicine-tracker.git
cd medicine-tracker
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root:
```env
DATABASE_URL="-----"
AUTH_SECRET="------"
```

4. **Run database migrations**
```bash
npx prisma migrate dev
```

5. **Start the development server**
```bash
npm run dev
```

6. **Open the app**

Visit [http://localhost:3000](http://localhost:3000)

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `AUTH_SECRET` | NextAuth secret key |

---

## 📸 Pages

| Page | Route | Access |
|---|---|---|
| Landing Page | `/` | Public |
| Sign Up | `/signup` | Public |
| Sign In | `/signin` | Public |
| Dashboard | `/dashboard` | Protected |
| Medicines | `/dashboard/medicines` | Protected |
| Reminders | `/dashboard/reminders` | Protected |
| Stock | `/dashboard/stock` | Protected |

---

## 🧠 Key Concepts Used

- **JWT Authentication** with NextAuth.js
- **Prisma ORM** with relational data modeling
- **Server-side API Routes** with Next.js App Router
- **Zod validation** for form and API data
- **Prisma Transactions** for atomic stock updates
- **Protected Routes** with Next.js Middleware
- **Component-based architecture** for clean code

