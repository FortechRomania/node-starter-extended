const extractObject = ( obj, keys ) => {
    const returnObj = {};
    keys.forEach( key => {
        returnObj[ key ] = obj[ key ];
    } );

    return returnObj;
};

module.exports = extractObject;
