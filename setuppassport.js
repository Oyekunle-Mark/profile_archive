let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

let User = require('./models/user');

module.exports = function() {
	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
};

passport.use('login', new LocalStrategy(function(username, password, done) {
	User.findOne({ username: username }, function(err, user) {
		if (err)
			return done(err);
	
		if (!user)
			return done(null, false, { message: 'No user has that username!' });

		user.checkPassword(password, function(err, isMatch) {
			if (err)
				return done(err);
			else
				return done(null, false, { message: 'Invalid Password' });
		});
	});
}));
