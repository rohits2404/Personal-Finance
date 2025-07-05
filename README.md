# 💰 Walletly: Personal Finance Tracker

[![Next.js](https://img.shields.io/badge/Next.js-15-blue.svg)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-green.svg)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)](https://www.typescriptlang.org/)

**Walletly** is a sleek, responsive and modern **personal finance management** app built using the latest technologies — **Next.js App Router**, **TypeScript**, **Tailwind CSS v4**, **MongoDB**, **Recharts**, and **shadcn/ui**.

Track your income & expenses, visualize monthly trends, set budgets, and gain powerful insights — all in one place.

---

## 🌟 Features

- ✅ Add, view, and delete income or expense transactions
- 📊 Interactive monthly **bar chart** for expenses
- 🥧 **Pie chart** showing category breakdown
- 🧾 Clean **dashboard summary** with totals and recent entries
- 💰 Setup **monthly budgets** per category
- ⚖️ View **Budget vs Actual** comparisons
- 💡 See **Smart Insights** (over/under budget)
- 🗓️ Monthly selector support
- 🎨 Beautiful, responsive UI with TailwindCSS + shadcn/ui

---

## 📸 Screenshots

| Dashboard Summary | Expenses Charts | Budget & Insights |
|------------------|------------------|-------------------|
| ![](./public/screens/dashboard.png) | ![](./public/screens/charts.png) | ![](./public/screens/insights.png) |

---

## 🧠 Tech Stack

| Tech | Role |
|------|------|
| [**Next.js 15 (App Router)**](https://nextjs.org/docs) | Full-stack React framework |
| [**TypeScript**](https://www.typescriptlang.org/) | Static typing |
| [**Tailwind CSS v4**](https://tailwindcss.com/) | Modern utility-first CSS |
| [**shadcn/ui**](https://ui.shadcn.dev/) | Accessible component primitives |
| [**Recharts**](https://recharts.org/) | Bar & pie chart visualizations |
| [**MongoDB**](https://www.mongodb.com/) | Database for transactions & budgets |
| [**Sonner**](https://sonner.emilkowal.dev/) | Toast notifications |

---

## 📁 Project Structure

```txt
.
├── app/
│   ├── page.tsx               # Main HomePage
│   ├── globals.css            # Global styles (TailwindCSS included)
│
├── components/
│   ├── TransactionForm.tsx
│   ├── TransactionList.tsx
│   ├── ExpensesChart.tsx
│   ├── CategoryPieChart.tsx
│   ├── DashboardSummary.tsx
│   ├── BudgetForm.tsx
│   ├── BudgetComparisonChart.tsx
│   ├── SpendingInsights.tsx
│
├── types/
│   └── index.ts               # Shared type definitions
│
├── public/
│   └── screens/
│       ├── dashboard.png
│       ├── charts.png
│       └── insights.png
│
└── README.md
````

-----

## 🚀 Getting Started

### 1\. Clone the Repository

```bash
git clone https://github.com/rohits2404/personal-finance.git
cd personal-finance
```

### 2\. Install Dependencies

```bash
npm install
```

### 3\. Configure Environment Variables

Create a `.env.local` file in the root:

```env
MONGODB_URI=
```

### 4\. Start the Dev Server

```bash
npm run dev
```

Visit [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser.

-----

## 🔐 Type Definitions

```ts
// types/index.ts

export interface Transaction {
  _id: string;
  amount: number;
  description: string;
  date: string;
  category: string;
}

export interface Budget {
  _id?: string;
  month: string;
  category: string;
  amount: number;
}
```

-----

## 📈 Roadmap

  * [x] Add responsive dashboard layout
  * [x] Budget vs Actual comparison
  * [x] Smart insights section
  * [x] Category-wise pie chart

-----

## ❤️ Acknowledgements

  * [shadcn/ui](https://ui.shadcn.dev/)
  * [Recharts](https://recharts.org/)
  * [MongoDB Atlas](https://www.mongodb.com/atlas)
  * [Sonner Toast](https://sonner.emilkowal.dev/)

-----

```
```
