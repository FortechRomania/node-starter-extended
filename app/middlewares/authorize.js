const usersRepository = require( "../repositories/usersRepository" );

module.exports = ( req, res, next ) => {
    const { id } = req.body;
    if ( !id ) {
        res.preconditionFailed( "missing_id" );
        return;
    }

    usersRepository.findUser( id ).then( ( user ) => {
        req.user = user;
        return next();
    } ).catch( ( err ) => res.send( err ) );
};
