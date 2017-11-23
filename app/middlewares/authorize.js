const usersRepository = require( "../repositories/usersRepository" );

function authorize ( req, res, next ) {
    const { id } = req.body;
    if ( !id ) {
        res.preconditionFailed( "missing_id" );
        return;
    }

    usersRepository.findUser( id ).then( ( user ) => {
        req.user = user;
        return next();
    } ).catch( ( err ) => res.send( err ) );
}

module.exports = authorize;
