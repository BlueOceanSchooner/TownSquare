const express = require('express');
const router = express.Router();
const users = require('./users.js');
const groups = require('./groups.js');
const events = require('./events.js');
const members = require('./members.js');
const attendees = require('./attendees.js');
const posts = require('./posts.js');
const dms = require('./dms.js');
const forum = require('./forum.js');
const login = require('./login.js');
const isAuth = require('../auth/isAuth.js');
const maps = require('./map.js');

router.get('/users', users.getAllUsers);
router.get('/users/:user_id', users.getUserById);
router.get('/users/:user_id/groups', members.getUserGroups);
router.get('/users/:user_id/events', attendees.getUserEvents);
router.get('/users/:user_id/dms', dms.getConversations);

router.post('/users', users.addUser);
router.post('/users/:user_id/groups/:group_id', members.addUserToGroup);

router.get('/groups', groups.getAllGroups);
router.get('/groups/category/:category', groups.getGroupsByCategory);
router.get('/groups/search', groups.findGroupByName);
router.get('/groups/:group_id', groups.getGroupById);
router.get('/groups/:group_id/events', events.getEventsByGroup);
router.get('/groups/:group_id/members', members.getGroupMembers);
router.get('/groups/:group_id/posts', posts.getPostsByGroupId);
router.get('/groups/:group_id/forum', forum.getForumPostsByGroupId);

router.post('/groups', groups.addGroup);
router.post('/groups/:group_id/posts', posts.addPost);
router.post('/groups/:group_id/forum', forum.postOnForum);
router.post('/groups/:group_id/forum-reply', forum.replyOnForum);

router.get('/events', events.getAllEvents);
router.get('/events/category/:category', events.getEventsByGroupCategory);
router.get('/events/:event_id', events.getEventById);
router.get('/events/:event_id/attendees', attendees.getEventAttendees);

router.post('/events', events.addEvent);
router.post('/events/:event_id/attendees', attendees.doRsvp);

router.get('/dms', dms.getAllDms);
router.post('/dms', dms.addDm);

router.get('/login', login.getUserInfo);
router.get('/logout', login.logout);

router.get('/maps', maps.getMapsKey);

module.exports = router;
