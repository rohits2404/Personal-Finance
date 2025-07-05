import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL!;

export const connectDB = async () => {

    if (mongoose.connections[0].readyState) return;

    try {
        await mongoose.connect(MONGODB_URL, {
            dbName: 'finance',
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err);
    }
};