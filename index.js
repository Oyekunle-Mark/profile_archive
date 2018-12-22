let express = require('express');
let mongoose = require('mongoose');
let path = require('path');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let flash = require('connect-flash');
let passport = require('passport');

let routes = require('./routes');
let setUpPassport = require('./setuppassport');

let app = express();

mongoose.connect('mongodb://localhost:27017/test');

setUpPassport();

app.set('port', process.env.PORT || 3000);

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: 'LSDljd3948(*&&^98??<<1fujs., SDJ/&&**^78',
	resave: true,
	saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(app.get('port'), function() {
	console.log('Server started on port ' + app.get('port'));
});
