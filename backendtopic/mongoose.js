const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const enquiryRoutes = require('./routes/enquiry.routes');

const app = express();
app.use(express.json());

// Routes
app.use("/api", enquiryRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB");
        app.listen(process.env.PORT, () => {
            console.log(`🚀 Server running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => console.error("❌ MongoDB connection error:", err));
