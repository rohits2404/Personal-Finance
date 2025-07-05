'use client';

import { Transaction } from '@/types';

export default function DashboardSummary({ data }: { data: Transaction[] }) {

    const total = data.reduce((sum, tx) => sum + tx.amount, 0);

    const categoryTotals: { [key: string]: number } = {};
    data.forEach(tx => {
        categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
    });

    const recent = [...data]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Total Expenses */}
            <div className="bg-white shadow-md rounded-xl p-6 border-l-4 border-rose-500">
                <h3 className="text-sm font-semibold text-gray-600 mb-1">Total Expenses</h3>
                <p className="text-3xl font-bold text-rose-600">
                    ₹{total.toFixed(2)}
                </p>
            </div>

            {/* Category Totals */}
            <div className="bg-white shadow-md rounded-xl p-6 md:col-span-2 border-l-4 border-indigo-500">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">Spending by Category</h3>
                <ul className="divide-y text-sm">
                    {Object.entries(categoryTotals).map(([cat, amt]) => (
                        <li key={cat} className="flex justify-between py-1">
                            <span className="text-gray-700">{cat}</span>
                            <span className="font-medium text-indigo-600">₹{amt.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white shadow-md rounded-xl p-6 md:col-span-3 border-l-4 border-emerald-500">
                <h3 className="text-sm font-semibold text-gray-600 mb-3">Recent Transactions</h3>
                <ul className="divide-y text-sm">
                    {recent.map(tx => (
                        <li key={tx._id} className="py-2 flex justify-between items-start">
                            <div>
                                <p className="font-medium text-gray-800">{tx.description}</p>
                                <p className="text-xs text-muted-foreground">
                                    {tx.category} · {new Date(tx.date).toLocaleDateString()}
                                </p>
                            </div>
                            <span className="font-bold text-emerald-600">₹{tx.amount.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}