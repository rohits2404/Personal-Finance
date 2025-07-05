import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
    month: String,
    category: String,
    amount: Number,
}, { timestamps: true });

export const Budget = mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);