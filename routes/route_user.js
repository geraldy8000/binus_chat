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
	var dt 				= new Date();
	var time 			= dt.getHours() + ":" + dt.getMinutes();
	sess = req.session;
	
	if(sess.uid)
	{
		res.render('chat_bodies/chat', { layout: 'user_layout', name: sess.uid, time: time })
	}
	else 
	{
    	res.redirect('/login');
	}
	
});

router.get('/logout', (req,res) => {

	req.session.destroy();
	res.render('chat_bodies/login', { layout: 'user_layout' })


});

/*
 |----------------------------------------------------
 |          login routes
 |----------------------------------------------------
 */
router.get('/login', (req,res) => res.render('chat_bodies/login', { layout: 'user_layout' , text: req.query.text}));

router.get('/test', (req,res) => res.render('chat_bodies/test', { layout: 'user_layout' }));

router.get('/settings', (req,res) => res.render('chat_bodies/settings', { layout: 'user_layout' }));

router.get('/password', (req,res) => res.render('chat_bodies/password', { layout: 'user_layout' }));


module.exports = router;