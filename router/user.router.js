const express = require('express');
const app = express.Router();
const controller = require('../controller/user.controller');
const verifyToken = require('../middleware/auth.middleware');

// Router Define

app.post('/add', verifyToken, controller.addUser);
app.post('/update/:id', controller.updateUser);
app.get('/get/:id', controller.getUser);
app.delete('/delete/:id', controller.deleteUser);
app.get('/Lists', controller.userLists);
app.post('/Login', controller.userLogin);
app.post('/changePassword/:id', controller.changePassword);
app.post('/refreshToken', controller.refreshToken);

module.exports = app;