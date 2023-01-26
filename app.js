if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');
const ExpressError = require('./Util/expressError')
const cookieParser = require('cookie-parser')

const noteBookRoute = require('./routes/noteBook')
const userRoute = require('./routes/users')
const homeRoute = require('./routes/homePage');

const dbUrl = process.env.DBURL;
//|| 'mongodb://localhost:27017/mots'
mongoose.connect(dbUrl)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
});

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(mongoSanitize())
app.use(cookieParser())

const sessionConfig = {
    secret: 'secretsecret',
    resave: false,
    saveUnitialized: true,
    //cookie: {
    //expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    //maxAge: 1000 * 60 * 60 * 24 * 7
    //}
}


app.use(session(sessionConfig));
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use('/', homeRoute);
app.use('/', noteBookRoute);
app.use('/', userRoute);

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).render('main/error', { err });
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`On port ${port}`)
});
