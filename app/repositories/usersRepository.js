const mongoose = require( "mongoose" );

const User = mongoose.model( "User" );

exports.findUser = async ( id ) => {
    try {
        const queryResult = await User.findOne( { id } );
        return queryResult;
    } catch ( err ) {
        return err;
    }
};

exports.saveUser = async ( data ) => {
    try {
        const user = new User( data );
        user.setPass( data.password );
        const queryResult = await user.save( );

        return queryResult;
    } catch ( err ) {
        return err;
    }
};

exports.editUser = async ( userObject, newData ) => {
    const { name, sex, age } = newData;
    const user = userObject;
    try {
        user.name = name;
        user.sex = sex;
        user.age = age;

        const queryResult = await user.save( );
        return queryResult;
    } catch ( err ) {
        return err;
    }
};

exports.deleteUser = async ( user ) => {
    try {
        const queryResult = await user.remove();
        return queryResult;
    } catch ( err ) {
        return err;
    }
};
