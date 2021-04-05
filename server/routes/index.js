const express = require('express');
const router = express.Router();
const users = require('./users.js');
const groups = require('./groups.js');
const events = require('./events.js');
const members = require('./members.js');

router.get('/users', users.getAllUsers);
router.get('/users/:id', users.getUserById);
router.post('/users', users.addUser);

router.get('/groups', groups.getAllGroups);
router.get('/groups/:id', groups.getGroupById);
router.post('/groups', groups.addGroup);

router.get('/events', events.getAllEvents);
router.get('/events/:id', events.getEventById);
router.get('/groups/:id/events', events.getEventsByGroup);
router.post('/events', events.addEvent);

router.get('/groups/:id/members', members.getGroupMembers);
router.get('/users/:id/groups', members.getUserGroups);
router.post('/users/:user_id/groups/:group_id', members.addUserToGroup);

module.exports = router;
