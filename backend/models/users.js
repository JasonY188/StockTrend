const mongoose = require('mongoose');
const Schema = mongoose.Schema

mongoose.set('userCreateIndex', true);

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
    },
    confirm: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    }




});

const Users = mongoose.model('Users', userSchema)
module.exports = Users;