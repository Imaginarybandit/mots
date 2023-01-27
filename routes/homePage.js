if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const catchAsync = require('../Util/catchAsync')
const express = require('express');
const router = express.Router();
const axios = require('axios').create({ baseUrl: "http://localhost:3000/home" });
const deepl = require('deepl-node');
const User = require('../models/user');



const response = " ";
let eword = " ";
const fword = " ";

router.get('/', (req, res) => {
    let aboutPage = req.cookies.aboutPage
    res.cookie('aboutPage', 'true')
    res.render('main/homePage', { response, eword, fword, aboutPage })
})

router.get('/home/wordSearch', catchAsync(async (req, res) => {

    const fword = req.query.frenchWord
    let aboutPage = req.cookies.aboutPage

    if (fword === " ") {
        res.render('main/homePage', { response, eword, fword, aboutPage })
    } else {


        const translator = new deepl.Translator(process.env.DEEPLAUTHKEY);

        try {
            const result = await translator.translateText(fword, 'fr', 'en-US');
            let eword = result.text.trim()
            if (eword.split(" ").length > 1) {
                res.render('main/homePage', { response, eword, fword, aboutPage })
            } else {
                const config = { headers: { "app_id": process.env.DICTAPIID, "app_key": process.env.DICTAPIKEY } }
                const response = await axios.get(`https://od-api.oxforddictionaries.com:443/api/v2/entries/en/${eword}`, config);
                res.render('main/homePage', { response, eword, fword, aboutPage })
            }
        } catch (err) {
            console.log(err.response)
            eword = `not found`
            res.render('main/homePage', { response, eword, fword, aboutPage })
        }

    }
}));


router.patch('/home/wordSearch', catchAsync(async (req, res) => {
    console.log(req.body)
    const id = req.user._id
    const user = await User.findById(id);
    user.noteBook.vocabulary.push({ frenchWord: req.body.frenchWord, englishWord: req.body.englishWord });
    user.save();
    req.flash('success', 'Vocabulary Added')
    res.redirect('/')

}));


module.exports = router;