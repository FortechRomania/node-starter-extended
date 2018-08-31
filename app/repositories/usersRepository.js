const mongoose = require( "mongoose" );

const User = mongoose.model( "User" );

const findUser = async id => User.findOne( { id } );

const findByUsername = async username => {
    const user = await User.findOne( { username } );
    return user;
};

const allUsers = async () => User.find();

const saveUser = async data => {
    const user = new User( data );
    user.setPass( data.password );
    return user.save();
};

const editUser = async ( userObject, newData ) => {
    const { name, sex, age } = newData;
    const user = userObject;

    user.name = name;
    user.sex = sex;
    user.age = age;

    return user.save();
};

const deleteUser = async user => user.remove();

module.exports = {
    findUser,
    allUsers,
    findByUsername,
    saveUser,
    editUser,
    deleteUser,
};
