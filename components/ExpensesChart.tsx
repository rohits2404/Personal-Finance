'use client';

import { Transaction } from '@/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export default function ExpensesChart({ data }: { data: Transaction[] }) {

    const grouped = data.reduce((acc: Record<string, number>, tx: Transaction) => {
        const month = new Date(tx.date).toLocaleString('default', {
            month: 'short',
            year: 'numeric',
        });
        acc[month] = (acc[month] || 0) + tx.amount;
        return acc;
    }, {});

    const chartData = Object.keys(grouped).map((month) => ({
        name: month,
        amount: parseFloat(grouped[month].toFixed(2)),
    }));

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">Monthly Expenses Overview</h2>
            {chartData.length === 0 ? (
                <div className="text-center text-gray-500 py-10 text-sm">No expense data yet.</div>
            ) : (
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip
                            cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                            contentStyle={{
                                backgroundColor: '#f9fafb',
                                borderRadius: '10px',
                                border: '1px solid #e5e7eb',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                fontSize: '14px',
                                padding: '10px',
                            }}
                            formatter={(value: number) => `₹${value.toFixed(2)}`}
                            />
                            <Bar
                            dataKey="amount"
                            radius={[8, 8, 0, 0]}
                            fill="url(#barGradient)"
                            />
                            <defs>
                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.8} />
                                </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}