const mongoose = require( "mongoose" );

const Character = mongoose.model( "Character" );

const TIME_OUT = 300; // 5 minutes timeout

const saveCharacter = async data => {
    const character = new Character( data );
    return character.save();
};

const updateCharacter = async data => {
    const character = Character.findById( data.id );
    const { experience, life } = data;

    character.experience += experience;
    character.life = life <= 0 ? 0 : life;
    if ( life <= 0 ) {
        character.life = 0;
        character.date = new Date().getTime() + TIME_OUT;
    }
};

const getCharacterByUser = async userId => {
    const character = Character.find( { userId } );

    return character;
};
module.exports = {
    saveCharacter,
    updateCharacter,
    getCharacterByUser,
};
