const statesRepo = require( "../repositories/statesRepo" );
const stateCompanyRepo = require( "../repositories/stateCompanyRepo" );

const {
    GraphQLObjectType,
    GraphQLString,
    // GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    // GraphQLNonNull,
} = require( "graphql" );

// State Type
const StateType = new GraphQLObjectType( {
    name: "State",
    fields: () => ( {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
    } ),
} );

const BasicDataObjectType = new GraphQLObjectType( {
    name: "BasicDataObject",
    fields: () => ( {
        name: { type: GraphQLString },
        seventies: { type: GraphQLString },
        eighties: { type: GraphQLString },
        nineties: { type: GraphQLString },
        oughts: { type: GraphQLString },
    } ),
} );

const StateWithBasicDataType = new GraphQLObjectType( {
    name: "StateWithBasicData",
    fields: () => ( {
        state: { type: StateType },
        data: { type: new GraphQLList( BasicDataObjectType ) },
    } ),
} );

// root query
const RootQuery = new GraphQLObjectType( {
    name: "RootQueryType",
    fields: () => ( {
        statesWithData: {
            type: new GraphQLList( StateWithBasicDataType ),
            args: {
                companyType: { type: GraphQLString },
            },
            resolve( parentValue, args ) {
                return stateCompanyRepo.getStateCompanies( args.companyType )
                    .then( statesWithData => statesWithData );
            },
        },

        state: {
            type: StateType,
            args: {
                id: { type: GraphQLString },
            },

            resolve( parentValue, args ) {
                return statesRepo.getStateById( args.id )
                    .then( repoState => repoState );
            },
        },
        states: {
            type: new GraphQLList( StateType ),
            resolve( ) {
                return statesRepo.getAllStates()
                    .then( repoStates => repoStates );
            },
        },
    } ),
} );

module.exports = new GraphQLSchema( {
    query: RootQuery,
} );
