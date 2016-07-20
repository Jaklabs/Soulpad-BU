var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var jwt = require('express-jwt');
var router = express.Router();
var Post = mongoose.model('Post');
var User = mongoose.model('User');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/*GET new post form. */
router.get('/new', function(req, res, next) {
	res.render('new');
});
router.get('/search', function(req, res, next) {
  res.render('search');
})
/*GET post route.*/
router.get('/posts', function(req, res, next) {
	Post.find(function(err, posts) {
		if (err) return next(err);
		res.json(posts);
	});
});
/*POST */
router.post('/posts', auth, function(req, res, next) {
	var post = new Post(req.body);
  post.author = req.payload.username;
	post.save(function(err, post) {
		if (err) return next(err);
		res.json(post);
	});
});
router.param('post', function(req, res, next, id) {
	var query = Post.findById(id);
	query.exec(function(err, post) {
		if (err) return next(err);
		if (!post) return next(new Error('can\'t find post'));
		req.post = post;
		return next();
	});
});
router.get('/posts/:post', function(req, res) {
	res.json(req.post);
})
// POST registration form
router.post('/register', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields.'})
  }
  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.save(function(err) {
    if (err) return next(err);
    return res.json({token: user.generateJWT});
  });
});
// POST login form
router.post('/login', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({message: 'Please fill out all fields.'});
  }
  passport.authenticate('local', function(err, user, info)  {
    if (err) return next(err);
    if (user) {
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

module.exports = router;
