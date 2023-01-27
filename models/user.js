const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    noteBook: {
        vocabulary: [
            {
                frenchWord: {
                    type: String
                }, englishWord: {
                    type: String
                }
            }
        ]

    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema)