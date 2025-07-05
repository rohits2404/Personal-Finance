'use client';

import { Budget, Transaction } from "@/types";

interface Props {
    transactions: Transaction[];
    budgets: Budget[];
}

export default function SpendingInsights({ transactions, budgets }: Props) {

  const month = new Date().toLocaleString('default', { month: 'short', year: 'numeric' });

    const actuals: { [key: string]: number } = {};
    transactions.forEach((tx: any) => {
        const txMonth = new Date(tx.date).toLocaleString('default', { month: 'short', year: 'numeric' });
        if (txMonth === month) {
            actuals[tx.category] = (actuals[tx.category] || 0) + tx.amount;
        }
    });

    const budgetMap: { [key: string]: number } = {};
    budgets.forEach((b: any) => {
        if (b.month === month) {
        budgetMap[b.category] = b.amount;
        }
    });

    const insights = Object.keys(actuals).map((cat) => {
        const spent = actuals[cat];
        const budget = budgetMap[cat] || 0;
        const status = spent > budget ? 'over' : 'within';
        return { category: cat, spent, budget, status };
    });

    return (
        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 mt-8">
            <h3 className="text-2xl font-semibold text-emerald-600 mb-4">💡 Spending Insights</h3>

            {insights.length === 0 ? (
                <p className="text-center text-sm text-gray-500">No spending data available for {month}.</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {insights.map((insight, i) => (
                        <li key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3">
                            <div className="text-sm font-medium text-gray-700">{insight.category}</div>

                            <div className="text-sm text-right mt-2 sm:mt-0">
                                <span className="font-semibold text-gray-800">
                                    ₹{insight.spent.toFixed(2)} / ₹{insight.budget.toFixed(2)}
                                </span>
                                <span
                                className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                                    insight.status === 'over'
                                    ? 'bg-red-100 text-red-600'
                                    : 'bg-green-100 text-green-600'
                                }`}
                                >
                                    {insight.status === 'over' ? 'Over Budget' : 'Within Budget'}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}