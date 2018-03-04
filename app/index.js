const express = require( "express" );
const expressGraphQL = require( "express-graphql" );
const bodyParser = require( "body-parser" );
const helmet = require( "helmet" );
const config = require( "./config" );
const customResponses = require( "./middlewares/customResponses" );

const testSchema = require( "./graphQL/testSchema" );

const app = express( );
const port = process.env.PORT || config.port;
const ENV = process.env.NODE_ENV || config.env;

app.set( "env", ENV );

app.use( ( req, res, next ) => {
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    next();
} );

app.use( bodyParser.json( ) );
app.use( customResponses );
app.use( helmet() );

app.use( "/graphql", ( req, res, next ) => {
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( "Access-Control-Allow-Headers", "Content-Type, Authorization, Content-Length, X-Requested-With" );
    if ( req.method === "OPTIONS" ) {
        res.sendStatus( 200 );
    } else {
        next();
    }
} );

app.use( "/graphql", expressGraphQL( {
    schema: testSchema,
    graphiql: true,
} ) );

require( "./config/routes" )( app );

// app.use( ( req, res ) => {
//     res.notFound( );
// } );

// Don't remove next !!!!
app.use( ( err, req, res, next ) => { // eslint-disable-line no-unused-vars
    res.status( 503 ).json( {
        success: false,
        error: "server_error",
    } );
} );

app.listen( port, () => { console.log( `Online at port: ${ port }` ); } );
