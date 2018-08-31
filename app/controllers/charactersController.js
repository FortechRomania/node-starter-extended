const characters = require( "../utilities/characters" );
const characterRepository = require( "../repositories/characterRepository" );

const create = async ( req, res, next ) => {
    const {
        type, userId, username, playerName,
    } = req.userData;
    const character = characters.getCharacter( type );
    character.userId = userId;
    character.disabledTime = new Date().getTime();
    character.type = type;
    character.playerName = playerName;
    try {
        const savedCharacter = await characterRepository.saveCharacter( character );
        return res.json( {
            success: true,
            character: savedCharacter,
            user: {
                userId,
                username,
            },
        } );
    } catch ( err ) {
        next( err );
    }
};

const getCharacterByUser = async ( req, res, next ) => {
    const { userId, username, token } = req.userData;
    try {
        const character = await characterRepository.getCharacterByUser( userId );
        return res.json( {
            succes: true,
            character,
            user: {
                userId,
                username,
                token,
            },
        } );
    } catch ( err ) {
        next( err );
    }
};

module.exports = {
    create,
    getCharacterByUser,
};
