# 💰 Personal Finance Tracker

A modern, responsive personal finance tracker built with **Next.js App Router**, **Tailwind CSS**,**ShadCN** and **Recharts**. It allows users to track transactions, visualize monthly expenses, and manage their finances effectively.

## 🚀 Features

- ✅ Add, view, and delete transactions
- 📈 Interactive monthly expenses chart
- 🎨 Beautiful responsive UI with gradients, cards, and modern layout
- 📦 Modular component structure
- 🌈 Tailwind CSS + shadcn/ui based design
- 🔄 API connected (stubbed with `/api/transactions`)
- 🔒 Clean and type-safe code with TypeScript



## 🧱 Tech Stack

| Technology     | Purpose                        |
|-|--|
| Next.js 15    | React framework (App Router)   |
| TypeScript     | Type-safe development          |
| Tailwind CSS   | Utility-first styling          |
| Recharts       | Bar chart visualizations       |
| shadcn/ui      | Styled reusable UI components  |
| Lucide Icons   | Modern, minimal icons          |
| Sonner         | Beautiful toast notifications  |



## 📁 Folder Structure

```

.
├── components/
│   ├── TransactionForm.tsx     # Add transaction form
│   ├── TransactionList.tsx     # List of transactions
│   └── ExpensesChart.tsx       # Recharts-based monthly expense chart
│
├── app/
│   ├── page.tsx     # Add transaction form
│   ├── globals.css       # Tailwind Base Styles
│
|── lib/
│   ├── data/
    |   |── db.ts     # MongoDB Connection
│   |   ├── models.ts     # Transaction Model
│   └── utils.ts       # Shadcn Generated Utils
|
├── types/
│   └── index.ts                # Shared Transaction types
|
├── public/                     # Assets (optional)
├── package.json
└── README.md

````

## 📦 Installation

```bash
# 1. Clone the repo
git clone https://github.com/rohits2404/Personal-Finance.git
cd personal-finance

# 2. Install dependencies
npm install

# 3. MongoDB Connection
create .env.local
MONGODB_URL=

# 4. Run the development server
npm run dev
````

Visit `http://localhost:3000` in your browser.


## 📋 Transaction Type Definition

```ts
// /types/index.ts
export interface Transaction {
  _id: string;
  amount: number;
  description: string;
  date: string;
}
```

## 📊 Chart Logic

Expenses are grouped by `month` using:

```ts
const grouped = data.reduce((acc, tx) => {
  const month = new Date(tx.date).toLocaleString('default', { month: 'short', year: 'numeric' });
  acc[month] = (acc[month] || 0) + tx.amount;
  return acc;
}, {});
```

## 🔧 API (stubbed for now)

Ensure you have a working API route at `/api/transactions` that supports:

* `GET`: Fetch all transactions
* `POST`: Add a new transaction
* `DELETE`: Remove a transaction by ID

Sample format:

```json
{
  "_id": "abc123",
  "amount": -1200,
  "description": "Groceries",
  "date": "2025-07-05"
}
```


## 📌 To-Do (Future Improvements)

(Stage 2)

* [ ] Predefined Categories for Transactions
* [ ] Categories Wise Pie Chart
* [ ] Dashboard with summary cards: total expenses, category breakdown, most recent transactions

```