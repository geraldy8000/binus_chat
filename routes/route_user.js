//Libraries
var express         = require('express');
var router          = express.Router();
var session 		= require('express-session');

/*
 |----------------------------------------------------
 |          chat routes
 |----------------------------------------------------
 */
router.get('/', (req,res) => { 

	sess = req.session;
	res.render('chat_bodies/chat', { layout: 'user_layout', name: sess.email })

	});

/*
 |----------------------------------------------------
 |          login routes
 |----------------------------------------------------
 */
router.get('/login', (req,res) => res.render('chat_bodies/login', { layout: 'user_layout' }));


router.get('/test', (req,res) => res.render('chat_bodies/test', { layout: 'user_layout' }));

module.exports = router;