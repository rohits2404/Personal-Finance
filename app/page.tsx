'use client';

import { useEffect, useState } from 'react';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import ExpensesChart from '@/components/ExpensesChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import DashboardSummary from '@/components/DashboardSummary';
import BudgetForm from '@/components/BudgetForm';
import BudgetComparisonChart from '@/components/BudgetComparisonChart';
import SpendingInsights from '@/components/SpendingInsights';

export default function HomePage() {

    const [transactions, setTransactions] = useState([]);
    const [budgets, setBudgets] = useState([]);

    const fetchTransactions = async () => {
        const res = await fetch('/api/transactions');
        const data = await res.json();
        setTransactions(data);
    };

    const fetchBudgets = async () => {
        const res = await fetch('/api/budgets');
        const data = await res.json();
        setBudgets(data);
    };

    useEffect(() => {
        fetchTransactions();
        fetchBudgets();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-teal-50 text-foreground">
            {/* Header Section */}
            <header className="bg-gradient-to-r from-indigo-500 to-teal-500 text-white py-12 shadow-md">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 drop-shadow-md">
                        Personal Finance Tracker
                    </h1>
                    <p className="text-lg sm:text-xl font-light text-white/90">
                        Track your income and expenses to take control of your finances
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-10 max-w-6xl space-y-10">

                {/* Summary Cards */}
                <section className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700">Dashboard Summary</h2>
                    <DashboardSummary data={transactions} />
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Add New Transaction</h2>
                        <TransactionForm onAdd={fetchTransactions} />
                    </div>

                    {/* Charts */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                            <h2 className="text-2xl font-semibold mb-4 text-teal-600">Monthly Expenses</h2>
                            <ExpensesChart data={transactions} />
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                            <h2 className="text-2xl font-semibold mb-4 text-emerald-600">Category Breakdown</h2>
                            <CategoryPieChart data={transactions} />
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Budget Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                        <h2 className="text-2xl font-semibold mb-4 text-purple-600">Monthly Budget Setup</h2>
                        <BudgetForm onSave={fetchBudgets} />
                    </div>

                    {/* Budget vs Actual Comparison */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                        <h2 className="text-2xl font-semibold mb-4 text-rose-600">Budget vs Actual</h2>
                        <BudgetComparisonChart transactions={transactions} budgets={budgets} />
                    </div>
                </section>

                {/* Spending Insights */}
                <section className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                    <SpendingInsights transactions={transactions} budgets={budgets} />
                </section>

                {/* Transaction History */}
                <section className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-600">Transaction History</h2>
                    <TransactionList data={transactions} onDelete={fetchTransactions} />
                </section>
            </main>
        </div>
    );
}