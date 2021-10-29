const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})
//Hashing the password

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();

});

//Generating Token
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, "addressbookisfamousworthyandsecure"); //generate token
        this.tokens = this.tokens.concat({ token: token }); //save token in DB
        await this.save();
        return token;

    } catch (err) {
        console.log(err);
    }
}



//Collection Creation
const User = mongoose.model("User", userSchema);

module.exports = User;