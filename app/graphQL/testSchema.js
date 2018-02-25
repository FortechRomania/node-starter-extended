const {
    GraphQLObjectType,
    GraphQLString,
    // GraphQLInt,
    GraphQLSchema,
    // GraphQLList,
    // GraphQLNonNull,
} = require( "graphql" );

const states = [
    { id: "1", name: "Alabama" },
    { id: "2", name: "Colorado" },
    { id: "3", name: "California" },
];

// State Type
const StateType = new GraphQLObjectType( {
    name: "State",
    fields: () => ( {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
    } ),
} );

// root query
const RootQuery = new GraphQLObjectType( {
    name: "RootQueryType",
    fields: () => ( {
        state: {
            type: StateType,
            args: {
                id: { type: GraphQLString },
            },
            // eslint-disable-next-line consistent-return
            resolve( parentValue, args ) {
                for ( let i = 0; i < states.length; i += 1 ) {
                    if ( states[ i ].id === args.id ) {
                        return states[ i ];
                    }
                }
            },
        },
    } ),
} );

module.exports = new GraphQLSchema( {
    query: RootQuery,
} );
