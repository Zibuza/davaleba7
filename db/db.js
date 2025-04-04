const mongoose = require("mongoose");
require("dotenv").config();

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
};

module.exports = connectToDb;
