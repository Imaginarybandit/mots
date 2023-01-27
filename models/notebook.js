const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteBookSchema = new Schema({

    vocabulary: [
        {
            frenchWord: {
                type: String
            }, englishWord: {
                type: String
            }
        }
    ]

})

module.exports = mongoose.model('Notebook', noteBookSchema);