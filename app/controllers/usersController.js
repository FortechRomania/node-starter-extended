const extractObject = require( "../utilities/index" );
const jwt = require( "jsonwebtoken" );
const bcrypt = require( "bcrypt" );
const usersRepository = require( "../repositories/usersRepository" );

const SECRET = "superSuperSecret";

const register = async ( req, res, next ) => {
    const { username } = req;
    const user = await usersRepository.findByUsername( username );

    if ( user ) {
        res.preconditionFailed( "existing_user" );
        return;
    }
    try {
        const savedUser = await usersRepository.saveUser( req.body );
        req.userData = {
            userId: savedUser._id,
            type: req.body.type,
            username: savedUser.username,
            playerName: req.body.playerName,
        };
        next();
    } catch ( err ) {
        next( err );
    }
};

const login = async ( req, res, next ) => {
    const { username } = req.body;

    if ( !req.body.password ) {
        res.badRequest( "password required" );
    }

    const user = await usersRepository.findByUsername( username );
    console.log( "user", user );
    if ( user ) {
        console.log( "1" );
        const password = bcrypt.compareSync( req.body.password, user.password );
        if ( !password ) {
            return res.json( {
                success: false,
                message: "Authentication failed. Wrong password.",
            } );
        }

        const token = jwt.sign( user.toObject(), SECRET, { expiresIn: 1440 } );
        req.userData = {
            token,
            username: user.username,
            userId: user._id,
        };
        next();
    } else {
        return res.json( {
            success: false,
            message: "-->",
        } );
    }
};

const edit = async ( req, res, next ) => {
    const { user } = req;

    try {
        const editedUser = await usersRepository.editUser( user, req.body );
        res.success( editedUser );
    } catch ( err ) {
        next( err );
    }
};

const allUsers = async ( req, res, next ) => {
    try {
        const users = await usersRepository.allUsers();
        res.success( users );
    } catch ( err ) {
        next( err );
    }
};

const deleteUser = async ( req, res, next ) => {
    const { user } = req;

    try {
        const deletedUser = await usersRepository.deleteUser( user );
        res.success( deletedUser );
    } catch ( err ) {
        next( err );
    }
};

module.exports = {
    allUsers,
    register,
    login,
    edit,
    deleteUser,
};
