const bcrypt = require( "bcrypt" );
const mongoose = require( "mongoose" );

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

userSchema.methods.setPass = function( password ) {
    // eslint-disable-line
    const saltRounds = 10;
    const hash = bcrypt.hashSync( password, saltRounds );
    this.password = hash;
};

module.exports = mongoose.model( "User", userSchema );
