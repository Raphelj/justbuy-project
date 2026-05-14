import mongoose from "mongoose";

mongoose.set("bufferCommands", false);

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB...");
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error("MongoDB connection failed FULL ERROR 👇");
        console.error(error);
        process.exit(1);
    }
};

export default connectDB;
