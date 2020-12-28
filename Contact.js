const { Schema, model } = require('mongoose')

let contactSchema = new Schema({
    name: {
        type: String
            // required: true
    },
    email: {
        type: String
            // required: true,
            // unique: true
    },
    phone: {
        type: String
            // required: true,
            // minlength: 10,
            // maxlength: 14
    }
})

let Contact = new model('Contact', contactSchema)
module.exports = Contact