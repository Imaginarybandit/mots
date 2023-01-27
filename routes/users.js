const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport')

router.get('/register', (req, res) => {
    res.render('main/users/register')
});

router.post('/register', async (req, res) => {
    try {

        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registerUser = await User.register(user, password);
        req.flash('success', 'Successfully made a notebook')
        return res.redirect('/')
    } catch (e) {
        req.flash('error', 'Username already exist')
        res.redirect('/register')
    }
});

router.get('/login', async (req, res) => {
    res.render('main/users/login');
});


router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), (req, res) => {
    req.flash('success', 'Successfully logged in')
    const redirectUrl = req.session.returnTo || '/'
    res.redirect(redirectUrl)
});

router.get('/logout', (req, res) => {

    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', "Logged Out Successfully");
        res.redirect('/');
    });

});

module.exports = router