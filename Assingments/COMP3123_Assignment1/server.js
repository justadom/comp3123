require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const empRoutes = require('./routes/empRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', empRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: false, message: 'in server error' });
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/comp3123_assigment1';

connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`server good on ${PORT}`));
});