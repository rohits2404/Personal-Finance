import { connectDB } from '@/lib/data/db';
import { Transaction } from '@/lib/data/Models/User/models';

export async function GET() {
    await connectDB();
    const transactions = await Transaction.find().sort({ date: -1 });
    return Response.json(transactions);
}

export async function POST(req: Request) {
    await connectDB();
    const data = await req.json();
    const newTx = await Transaction.create(data);
    return Response.json(newTx);
}

export async function DELETE(req: Request) {
    await connectDB();
    const { id } = await req.json();
    await Transaction.findByIdAndDelete(id);
    return Response.json({ success: true });
}