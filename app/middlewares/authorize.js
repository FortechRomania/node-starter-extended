const jwt = require( "jsonwebtoken" );

const SECRET = "superSuperSecret";

function authorize ( req, res, next ) {
    const token = req.body.token || req.query.token || req.headers[ "x-access-token" ];

    if ( !token ) {
        res.unauthorized( );
        return;
    }

    jwt.verify( token, SECRET, ( err, decoded ) => {
        if ( err ) {
            return res.unauthorized( );
        }
        req.user = decoded;
        return next( );
    } );
}

module.exports = authorize;
