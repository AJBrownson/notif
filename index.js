const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const connectDB = require('./config/db');
const app = express();

// MongoDB connection
connectDB();

// CORS POLICY
app.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

// Middleware
app.use(express.json());


// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);


// Server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
