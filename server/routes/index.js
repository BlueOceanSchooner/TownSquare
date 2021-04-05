const express = require('express');
const router = express.Router();
const users = require('./users.js');
const groups = require('./groups.js');

router.get('/users', users.getAllUsers);
router.get('/users/:id', users.getUserById);
router.post('/users', users.addUser);

router.get('/groups', groups.getAllGroups);
router.get('/groups/:id', groups.getGroupById);
router.post('/groups', groups.addGroup);

module.exports = router;
