const express = require( "express" );

const statesController = require( "../controllers/statesController" );

const router = express.Router( );

router.post( "/getAllStates", statesController.getAllStates );

router.get( "/test", ( req, res ) => {
    res.json( { success: true } );
} );

module.exports = ( app ) => {
    app.use( "/", router );
};
