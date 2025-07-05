'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Transaction } from '@/types';

const COLORS = ['#10b981', '#f97316', '#3b82f6', '#e11d48', '#6366f1', '#14b8a6'];

export default function CategoryPieChart({ data }: { data: Transaction[] }) {
    
    const grouped = data.reduce((acc: Record<string, number>, tx) => {
        acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
        return acc;
    }, {});

    const chartData = Object.keys(grouped).map((category) => ({
        name: category,
        value: parseFloat(grouped[category].toFixed(2)),
    }));

    if (chartData.length === 0) {
        return <p className="text-sm text-gray-500">No data available for pie chart.</p>;
    }

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `₹${value.toFixed(2)}`} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}