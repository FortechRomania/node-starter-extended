const usersRepository = require( "../repositories/usersRepository" );

async function userIdCheck ( req, res, next ) {
    const { id } = req.body;

    if ( !id ) {
        res.preconditionFailed( "missing_id" );
        return;
    }

    try {
        const foundUser = await usersRepository.findUser( id );
        req.user = foundUser;
        next();
    } catch ( err ) {
        res.send( err );
    }
}

module.exports = userIdCheck;
