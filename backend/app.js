const express = require('express');
const mongoose = require('mongoose');
const carRoutes = require('./routes/carRoutes');
const cors = require("cors");
const dotenv = require("dotenv");
const twoWheelerRoutes = require('./routes/twoWheelerRoutes');

const PORT = process.env.PORT || 5000;
const app = express();
dotenv.config();

app.use(cors({
    origin: ["http://localhost:3000"]
}));

app.use(express.json());
app.use('/parking/car', carRoutes);
app.use('/parking/twoWheeler', twoWheelerRoutes);

mongoose.connect(process.env.MONGO_CONNECTION_STR)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
