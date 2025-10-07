const express = require('express');
const path = require('path');
const app = express();
const userRouter = require('./routes/users');

app.use(express.json());

app.use('/api/v1/user', userRouter);

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

const PORT = process.env.port || 8081;
app.listen(PORT, () => {
  console.log('Web Server is listening at port ' + PORT);
});
