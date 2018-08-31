const mongoose = require( "mongoose" );

const { Schema } = mongoose;

const characterSchema = new Schema(
    {
        userId: { type: String, required: true },
        playerName: { type: String, required: true },
        type: { type: String, required: true },
        life: { type: Number, required: true },
        attack: { type: Number, required: true },
        defense: { type: Number, required: true },
        level: { type: Number, required: true },
        experience: { type: Number, required: false },
        disabledTime: { type: Number, required: false },
    },
    {
        timestamp: true,
    },
);

module.exports = mongoose.model( "Character", characterSchema );
