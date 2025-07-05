import { connectDB } from "@/lib/data/db";
import { Budget } from "@/lib/data/Models/Budget/models";

export async function GET() {
    await connectDB();
    const data = await Budget.find();
    return Response.json(data);
}

export async function POST(req: Request) {
    await connectDB();
    const body = await req.json();
    const existing = await Budget.findOne({ month: body.month, category: body.category });

    if (existing) {
        existing.amount = body.amount;
        await existing.save();
        return Response.json(existing);
    } else {
        const created = await Budget.create(body);
        return Response.json(created);
    }
}