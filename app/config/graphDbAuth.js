const neo4j = require( "neo4j-driver" ).v1;

const statesDbDriver = neo4j.driver(
    "bolt://hobby-lgejnfbhieglgbkefpakhpal.dbs.graphenedb.com:24786",
    neo4j.auth.basic( "generalaccess", "b.xm1BhVfyoeRo.6Wq97tB7lfcIDqlV" ),
);

module.exports = statesDbDriver;
