const mongoose = require( "mongoose" );

const User = mongoose.model( "User" );

const findUser = async ( id ) => {
    try {
        const queryResult = await User.findOne( { id } );
        return queryResult;
    } catch ( err ) {
        return err;
    }
};

const saveUser = async ( data ) => {
    try {
        const user = new User( data );
        user.setPass( data.password );
        const queryResult = await user.save( );

        return queryResult;
    } catch ( err ) {
        return err;
    }
};

const editUser = async ( userObject, newData ) => {
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

const deleteUser = async ( user ) => {
    try {
        const queryResult = await user.remove();
        return queryResult;
    } catch ( err ) {
        return err;
    }
};

module.exports = {
    findUser,
    saveUser,
    editUser,
    deleteUser,
};
