const driver = require( "../config/graphDbAuth" );

const getProperties = ( recordArray ) => {
    const properties = recordArray.map( ( record ) => record.properties );

    return properties;
};

const extractStateGroups = ( fullNeo4jResponse ) => {
    const groups = fullNeo4jResponse.records.map( ( record ) => (
        {
            state: record._fields[ 0 ].properties,
            data: getProperties( record._fields[ 1 ] ),
        }
    ) );

    return groups;
};

exports.getStateCompanies = async( companyType ) => {
    try {
        const session = driver.session();
        const queryResult = await session.run( `
           match (state:State)-[has_${ companyType }]-(companyTypes:${ companyType })
           return state , collect(companyTypes) order by state.name
        ` );

        const stateCompanies = extractStateGroups( queryResult );

        return stateCompanies;
    } catch ( err ) {
        return err;
    }
};
