const characters = {
    wizzard: {
        life: 140,
        attack: 40,
        defense: 5,
        level: 0,
        experience: 0,
    },
    knight: {
        life: 200,
        attack: 20,
        defense: 7,
        level: 0,
        experience: 0,
    },
    infantery: {
        life: 180,
        attack: 16,
        defense: 10,
        level: 0,
        experience: 0,
    },
    priest: {
        life: 160,
        attack: 25,
        defense: 7,
        level: 0,
        experience: 0,
    },
    archer: {
        life: 120,
        attack: 46,
        defense: 5,
        level: 0,
        experience: 0,
    },
};

const getCharacter = type => {
    if ( characters[ type ] !== undefined ) {
        return characters[ type ];
    }
    return characters.priest;
};

module.exports = {
    getCharacter,
};
