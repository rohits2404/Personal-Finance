'use client';

import { useEffect, useState } from 'react';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import ExpensesChart from '@/components/ExpensesChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import DashboardSummary from '@/components/DashboardSummary';

export default function HomePage() {

    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async () => {
        const res = await fetch('/api/transactions');
        const data = await res.json();
        setTransactions(data);
    };

    useEffect(() => {
        fetchTransactions();
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
            <main className="container mx-auto px-4 py-10 max-w-6xl space-y-8">

                {/* Summary Cards Section */}
                <section className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Dashboard Summary</h2>
                    <DashboardSummary data={transactions} />
                </section>

                {/* Grid Section: Form and Charts */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Transaction Form */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Add New Transaction</h2>
                        <TransactionForm onAdd={fetchTransactions} />
                    </div>

                    {/* Charts Section */}
                    <div className="space-y-6">
                        {/* Bar Chart */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                            <h2 className="text-2xl font-semibold mb-4 text-teal-600">Monthly Expenses</h2>
                            <ExpensesChart data={transactions} />
                        </div>

                        {/* Pie Chart */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                            <h2 className="text-2xl font-semibold mb-4 text-emerald-600">Category Breakdown</h2>
                            <CategoryPieChart data={transactions} />
                        </div>
                    </div>
                </section>

                {/* Transaction List */}
                <section className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                    <h2 className="text-2xl font-semibold mb-4 text-pink-600">Transaction History</h2>
                    <TransactionList data={transactions} onDelete={fetchTransactions} />
                </section>
            </main>
        </div>
    );
}