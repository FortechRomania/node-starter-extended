const fs = require( "fs" );
const stateArray = require( "./stateList.json" );
// const candy = require( "./candy" );
// const cars = require( "./cars" );
// const sports = require( "./sports" );
const hotels = require( "./hotels" );

const adjustPercentByDecade = ( decadeObj ) => {
    const brands = Object.keys( decadeObj );

    const total = brands.reduce( ( accum, crrValue ) => accum + decadeObj[ crrValue ], 0 );

    const decadeObjAdjusted = {};
    brands.forEach( brand => {
        const brandPercent = ( decadeObj[ brand ] * 100 ) / total;
        decadeObjAdjusted[ brand ] = brandPercent.toFixed( 2 );
    } );

    return decadeObjAdjusted;
};

const applyPercent = ( candyObj ) => {
    const decades = Object.keys( candyObj );
    decades.shift();

    const adjustedDecades = decades.map( ( decade ) =>
        adjustPercentByDecade( candyObj[ decade ] ) );

    const decadesStated = {
        seventies: adjustedDecades[ 0 ],
        eighties: adjustedDecades[ 1 ],
        ninties: adjustedDecades[ 2 ],
        oughts: adjustedDecades[ 3 ],
    };

    return decadesStated;
};

const states = Object.keys( stateArray ).map( ( state, index ) => (
    {
        name: stateArray[ state ],
        hotels: applyPercent( hotels[ index ] ),
    }

) );

fs.writeFile( "statesHotels.json", JSON.stringify( states ), ( err ) => {
    if ( err ) {
        throw err;
    }
} );
