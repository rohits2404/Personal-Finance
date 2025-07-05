import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    amount: Number,
    description: String,
    date: Date,
    category: {
        type: String,
        enum: ['Food', 'Rent', 'Shopping', 'Bills', 'Travel', 'Other'],
        default: 'Other'
    },

}, { timestamps: true });

export const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);