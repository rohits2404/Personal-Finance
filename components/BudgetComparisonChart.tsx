'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useMemo } from 'react';
import { Budget, Transaction } from '@/types';

interface Props {
    transactions: Transaction[];
    budgets: Budget[];
}

export default function BudgetComparisonChart({ transactions, budgets }: Props) {

    const month = new Date().toLocaleString('default', { month: 'short', year: 'numeric' });

    const chartData = useMemo(() => {

        const actuals: Record<string, number> = {};
        const budgetMap: Record<string, number> = {};

        transactions
        .filter((tx) => {
            const txMonth = new Date(tx.date).toLocaleString('default', {
                month: 'short',
                year: 'numeric',
            });
            return txMonth === month;
        })
        .forEach((tx) => {
            actuals[tx.category] = (actuals[tx.category] || 0) + tx.amount;
        });

        budgets
        .filter((b) => b.month === month)
        .forEach((b) => {
            budgetMap[b.category] = b.amount;
        });

        const categories = Array.from(new Set([...Object.keys(actuals), ...Object.keys(budgetMap)]));

        return categories.map((cat) => ({
            category: cat,
            Actual: parseFloat((actuals[cat] || 0).toFixed(2)),
            Budget: parseFloat((budgetMap[cat] || 0).toFixed(2)),
        }));
    }, [transactions, budgets, month]);

    return (
        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 mt-8">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                Budget vs Actual — <span className="text-gray-600">{month}</span>
            </h2>

            {chartData.length === 0 ? (
                <div className="text-center text-gray-500 py-10 text-sm">
                    No budget or transaction data available for this month.
                </div>
            ) : (
                <div className="h-[300px] sm:h-[360px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
                        barCategoryGap={20}
                        >
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                            <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                borderRadius: 10,
                                fontSize: 13,
                                border: '1px solid #e5e7eb',
                            }}
                            formatter={(value: number) => `₹${value.toFixed(2)}`}
                            />
                            <Legend
                            wrapperStyle={{ fontSize: '13px' }}
                            iconType="circle"
                            verticalAlign="top"
                            height={36}
                            />
                            <defs>
                                <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#4ade80" stopOpacity={0.9} />
                                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0.8} />
                                </linearGradient>
                                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#fb7185" stopOpacity={0.9} />
                                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0.8} />
                                </linearGradient>
                            </defs>
                            <Bar dataKey="Budget" radius={[8, 8, 0, 0]} fill="url(#budgetGradient)" />
                            <Bar dataKey="Actual" radius={[8, 8, 0, 0]} fill="url(#actualGradient)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}