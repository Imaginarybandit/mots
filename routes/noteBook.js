const express = require('express');
const router = express.Router();
const Notebook = require('../models/notebook');
const User = require('../models/user');
const catchAsync = require('../Util/catchAsync')
const { isLoggedIn } = require('../middleWare/authenticationMiddleWare')

router.get('/notebook', isLoggedIn, catchAsync(async (req, res) => {

    const id = req.user._id;
    console.log(id)
    const users = await User.findById(id);
    res.render('main/noteBook', { users, id })
}))

router.patch('/notebook/:id', catchAsync(async (req, res) => {


    const id = req.user._id;
    const wordId = req.body.wordId;
    const user = await User.findById(id);
    for (let item of user.noteBook.vocabulary) {
        if (String(wordId) === String(item._id)) {
            user.noteBook.vocabulary.pull({ _id: item._id })
        }
    };

    user.save()
    req.flash('success', 'Vocabulary removed from Notebook')
    res.redirect('/notebook')

}))


module.exports = router;