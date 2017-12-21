const usersRepository = require( "../repositories/usersRepository" );

async function authorize ( req, res, next ) {
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

module.exports = authorize;
