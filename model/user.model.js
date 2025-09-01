const mongoose = require("mongoose");
const { extend, BaseSchema } = require("./base.model");
const validator = require('validator');

const userSchema = extend(BaseSchema, {
    fullName: { type: String, required: true },
    gender: { type: String, required: false },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    }
});

// extend model 

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel