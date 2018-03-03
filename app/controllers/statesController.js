// const statesRepo = require( "../repositories/statesRepo" );
const stateCompanyRepo = require( "../repositories/stateCompanyRepo" );

exports.getAllStates = ( req, res ) => {
    stateCompanyRepo.getStateCars()
        .then( states => res.success( states ) )
        .catch( err => res.serverError( err ) );
};
