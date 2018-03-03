const driver = require( "../config/graphDbAuth" );

const extractNeo4jValues = ( fullNeo4jResponse ) => {
    const values = fullNeo4jResponse.records.map( ( record ) => record._fields[ 0 ].properties );
    return values;
};

exports.getAllStates = async() => {
    try {
        const session = driver.session();
        const queryResult = await session.run( "match (n:State) return n" );

        const states = extractNeo4jValues( queryResult );

        return states;
    } catch ( err ) {
        return err;
    }
};

exports.getStateById = async( id ) => {
    try {
        const session = driver.session();
        const queryResult = await session.run( `match (n:State) where n.id = '${ id }' return n` );

        const state = extractNeo4jValues( queryResult );
        return state[ 0 ];
    } catch ( err ) {
        return err;
    }
};
