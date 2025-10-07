const express = require('express');
const fs = require('fs');
const path = require('path');
const routerUser = express.Router();

const userFilePath = path.join(__dirname, '..', 'user.json');


routerUser.get('/profile', (req, res) => {
  fs.readFile(userFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error for user' });
    }
    const user = JSON.parse(data);
    res.json(user);
  });
});


routerUser.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile(userFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error for user' });
    }

    const user = JSON.parse(data);

    if (username !== user.username) {
      return res.json({ status: false, message: 'cany use that username' });
    }

    if (password !== user.password) {
      return res.json({ status: false, message: 'cant use that password' });
    }

    res.json({ status: true, message: 'user accepted' });
  });
});


routerUser.get('/logout', (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.send('<b>enter username to logout.</b>');
  }

  res.send(`<b>${username} you are loged out.</b>`);
});

module.exports = routerUser;
