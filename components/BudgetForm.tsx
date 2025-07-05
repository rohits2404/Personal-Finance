'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { Budget } from '@/types';

const categories = ['Food', 'Rent', 'Shopping', 'Bills', 'Travel', 'Other'];

export default function BudgetForm({ onSave }: { onSave: () => void }) {

    const currentMonth = new Date().toLocaleString('default', { month: 'short', year: 'numeric' });

    const [budgets, setBudgets] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [existingBudgets, setExistingBudgets] = useState<Budget[]>([]);

    const fetchBudgets = async () => {
        const res = await fetch(`/api/budgets?month=${currentMonth}`);
        const data = await res.json();
        setExistingBudgets(data);
        const map: { [key: string]: string } = {};
        data.forEach((b: Budget) => {
            map[b.category] = b.amount.toString();
        });
        setBudgets(map);
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        for (const category of categories) {
            const amount = parseFloat(budgets[category] || '0');
            await fetch('/api/budgets', {
                method: 'POST',
                body: JSON.stringify({ month: currentMonth, category, amount }),
            });
        }

        toast.success('Budgets saved successfully!');
        setLoading(false);
        onSave();
        fetchBudgets(); // Refresh after save
    };

    return (
        <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 sm:p-8 mt-8 space-y-6 border border-gray-200"
        >
            <div>
                <h2 className="text-2xl font-semibold text-indigo-600 mb-1">Set Monthly Budgets</h2>
                <p className="text-sm text-muted-foreground">Budget for {currentMonth}</p>
            </div>

            <div className="space-y-4">
                {categories.map((cat) => {
                    const currentValue = parseFloat(budgets[cat] || '0');
                    const existingValue = existingBudgets.find(b => b.category === cat)?.amount || 0;
                    const progress = existingValue > 0 ? (currentValue / existingValue) * 100 : 0;

                    return (
                        <div key={cat} className="space-y-1">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-gray-700">{cat}</label>
                                <Input
                                type="number"
                                min="0"
                                placeholder="₹0"
                                value={budgets[cat] || ''}
                                onChange={(e) =>
                                    setBudgets({ ...budgets, [cat]: e.target.value })
                                }
                                className="w-32 border-gray-300 focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            {existingValue > 0 && (
                                <Progress value={Math.min(progress, 100)} className="h-2 bg-gray-100" />
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="pt-4">
                <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 transition-all"
                >
                    {loading ? 'Saving...' : 'Save Budgets'}
                </Button>
            </div>
        </form>
    );
}