'use client';

import { Transaction } from '@/types';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function TransactionList({ data, onDelete }: { data: Transaction[]; onDelete: () => void }) {

    const handleDelete = async (id: string) => {
        await fetch('/api/transactions', {
            method: 'DELETE',
            body: JSON.stringify({ id }),
        });
        toast.success('Transaction deleted');
        onDelete();
    };

    if (data.length === 0) {
        return (
            <div className="text-center text-gray-500 py-6 text-sm">
                No transactions yet. Start by adding one!
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-pink-600 mb-2">Recent Transactions</h2>
            <ul className="space-y-3">
                {data.map((tx) => {
                    const isExpense = (tx.amount) < 0;
                    return (
                        <li
                        key={tx._id}
                        className={`flex flex-col sm:flex-row sm:justify-between items-start sm:items-center bg-white border-l-4 ${
                            isExpense ? 'border-red-400' : 'border-green-400'
                        } shadow-sm rounded-lg px-4 py-3 hover:shadow-md transition-all duration-200`}
                        >
                            <div className="flex flex-col">
                                <span className="font-medium text-gray-800">{tx.description}</span>
                                <span className="text-sm text-muted-foreground">
                                {new Date(tx.date).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 mt-2 sm:mt-0 sm:text-right">
                                <span
                                className={`text-lg font-bold ${
                                    isExpense ? 'text-red-500' : 'text-green-600'
                                }`}
                                >
                                ₹{(tx.amount).toFixed(2)}
                                </span>
                                <button
                                onClick={() => handleDelete(tx._id)}
                                className="text-red-500 hover:text-red-600 transition-colors"
                                title="Delete transaction"
                                >
                                <Trash2 size={18} />
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}