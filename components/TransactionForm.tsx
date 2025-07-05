'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function TransactionForm({ onAdd }: { onAdd: () => void }) {

    const [form, setForm] = useState({ amount: '', description: '', date: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const { amount, description, date } = form;

        if (!amount || !description || !date) {
            setError('All fields are required');
            return;
        }

        await fetch('/api/transactions', {
            method: 'POST',
            body: JSON.stringify({
                amount: parseFloat(amount),
                description,
                date,
            }),
        });

        setForm({ amount: '', description: '', date: '' });
        onAdd();
        toast.success('Transaction added successfully!');
        setError('');
    };

    return (
        <form
        onSubmit={handleSubmit}
        className="space-y-5 p-4 sm:p-6 bg-gray-50 rounded-xl shadow-inner"
        >
            {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm">
                    {error}
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                    <label htmlFor="amount" className="text-sm font-medium text-gray-700">
                        Amount <span className="text-red-500">*</span>
                    </label>
                    <Input
                    id="amount"
                    placeholder="e.g. 1200"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    type="number"
                    className="focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="date" className="text-sm font-medium text-gray-700">
                        Date <span className="text-red-500">*</span>
                    </label>
                    <Input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Description <span className="text-red-500">*</span>
                </label>
                <Input
                id="description"
                placeholder="e.g. Grocery shopping"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <Button
            type="submit"
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 transition-all duration-200"
            >
                Add Transaction
            </Button>
        </form>
    );
}