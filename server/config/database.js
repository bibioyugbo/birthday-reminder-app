const mongoose = require("mongoose");
const env = require("dotenv");
env.config();

const connectDB = async () => {
    try {
        console.log("MONGO_URI:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            bufferCommands: false,
            // bufferMaxEntries: 0,
        })
        mongoose.set("debug", true); // log MongoDB ops
        console.log("MongoDB connected");
    } catch (err) {
        console.log(err.message);
    }
};

module.exports = {
    connectDB
};
