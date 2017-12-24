var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Form validation', success: req.session.success, errors: req.session.errors}); //object and variables we will pass to jade 
  req.session.errors = null;
});

router.post('/submit', function(req, res, next) {
	req.check('email', 'Invalid email address').isEmail(); //need to match with the name of the input es email
	req.check('password','Wrong password').isLength({min: 4}).equals(req.body.confirmPassword);

	var errors = req.validationErrors();
	if (errors) {
		req.session.errors = errors;
		req.session.success = false;
	} else {
		req.session.success = true;
	}
	res.redirect('/');
});

module.exports = router;
