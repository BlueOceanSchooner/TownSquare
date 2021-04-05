const express = require('express');
const router = express.Router();
const users = require('./users.js');
const groups = require('./groups.js');
const events = require('./events.js');
const members = require('./members.js');
const attendees = require('./attendees.js');
const posts = require('./posts.js');

router.get('/users', users.getAllUsers);
router.get('/users/:user_id', users.getUserById);
router.get('/users/:user_id/groups', members.getUserGroups);
router.get('/users/:user_id/events', attendees.getUserEvents);

router.post('/users', users.addUser);
router.post('/users/:user_id/groups/:group_id', members.addUserToGroup);

router.get('/groups', groups.getAllGroups);
router.get('/groups/:group_id', groups.getGroupById);
router.get('/groups/:group_id/events', events.getEventsByGroup);
router.get('/groups/:group_id/members', members.getGroupMembers);
router.get('/groups/:group_id/posts', posts.getPostsByGroupId);

router.post('/groups', groups.addGroup);
router.post('/groups/:group_id/posts', posts.addPost);

router.get('/events', events.getAllEvents);
router.get('/events/:event_id', events.getEventById);
router.get('/events/:event_id/attendees', attendees.getEventAttendees);

router.post('/events', events.addEvent);
router.post('/events/:event_id/attendees', attendees.doRsvp);




module.exports = router;
