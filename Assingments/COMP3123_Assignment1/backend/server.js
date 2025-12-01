require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const empRoutes = require('./routes/empRoutes');

const app = express(); 

app.use(cors({
  origin: 'http://localhost:3002', 
  credentials: true
}));
app.use(bodyParser.json());


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', empRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: false, message: 'in server error' });
});


const PORT = process.env.PORT || 3001; 
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/comp3123_assigment1';

connectDB(MONGO_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
