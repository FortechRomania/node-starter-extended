const extractObject = require( "../utilities/index" );
const jwt = require( "jsonwebtoken" );
const bcrypt = require( "bcrypt" );
const usersRepository = require( "../repositories/usersRepository" );

const SECRET = "superSuperSecret";

const register = ( req, res, next ) => {
    const { user } = req;
    if ( user ) {
        res.preconditionFailed( "existing_user" );
        return;
    }
    try {
        const savedUser = await usersRepository.saveUser( req.body );

        res.success( extractObject(
            savedUser,
            [ "id", "username" ],
        ) );
    } catch ( err ) {
        next( err );
    }
};

const login = ( req, res ) => {
    const { user } = req;

    if ( !req.body.password ) {
        res.badRequest( "password required" );
    }

    const password = bcrypt.compareSync( req.body.password, user.password );
    if ( user ) {
        if ( !password ) {
            return res.json( {
                success: false,
                message: "Authentication failed. Wrong password.",
            } );
        }

        const token = jwt.sign( user.toObject(), SECRET, { expiresIn: 1440 } );
        return res.json( {
            success: true,
            token,
        } );
    }
    return res.json( {
        success: false,
        message: "Authentication failed. User not found.",
    } );
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

const deleteUser = async ( req, res ) => {
    const { user } = req;

    try {
        const deletedUser = await usersRepository.deleteUser( user );
        res.success( deletedUser );
    } catch ( err ) {
        next( err );
    }
};

module.exports = {
    register,
    login,
    edit,
    deleteUser,
};
