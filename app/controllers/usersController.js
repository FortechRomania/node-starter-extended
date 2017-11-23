const { extractObject } = require( "../utilities" );
const jwt = require( "jsonwebtoken" );
const bcrypt = require( "bcrypt" );
const usersRepository = require( "../repositories/usersRepository" );

const SECRET = "superSuperSecret";

const register = ( req, res ) => {
    const { user } = req;
    if ( user ) {
        res.preconditionFailed( "existing_user" );
        return;
    }
    usersRepository.saveUser( req.body )
        .then( savedUser => res.success( extractObject(
            savedUser,
            [ "id", "username" ],
        ) ) )
        .catch( ( err ) => res.send( err ) );
};

const login = ( req, res ) => {
    const { user } = req;

    if ( !req.body.password ) {
        return res.status( 400 ).send( "password required" );
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

const edit = ( req, res ) => {
    const { user } = req;

    usersRepository.editUser( user, req.body )
        .then( savedUser => res.success( savedUser ) )
        .catch( ( err ) => res.send( err ) );
};

const deleteUser = ( req, res ) => {
    const { user } = req;

    usersRepository.deleteUser( user )
        .then( savedUser => res.success( savedUser ) )
        .catch( ( err ) => res.send( err ) );
};

module.exports = {
    register,
    login,
    edit,
    deleteUser,
};
