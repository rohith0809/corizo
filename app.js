// app.js
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/studentnew', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Set view engine to EJS
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded bodies (forms)
app.use(express.json());  // Parse JSON bodies (if needed)
app.use(methodOverride('_method'));  // Allows us to send PUT and DELETE requests

// Routes
app.use('/', studentRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
