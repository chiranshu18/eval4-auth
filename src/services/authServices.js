const db = require('../../database/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {insertIntoRedis, getFromRedis} = require('../utils/redis');

const register = async (userDetails) => {
    // userDetails.isAdmin = userDetails.isAdmin ? true : false;

    const hashedPassword = await bcrypt.hash(userDetails.password, 10);
    const newUser = await db.Users.create({
       email: userDetails.email,
       password: hashedPassword,
    //    isAdmin: userDetails.isAdmin
    });
    return newUser
};

const login = async (userDetails) => {
    const user = await db.Users.findOne({
        where: {
            email: userDetails.email
        },
    });
    if(!user){
        throw new Error('User does not exist');
    }
    const isPasswordValid = await bcrypt.compare(userDetails.password, user.password);
    if(!isPasswordValid){
        throw new Error('invalid password');
    }
    const token = jwt.sign(user.dataValues, 'secret');
    await insertIntoRedis(token, user.dataValues.id);
    return token;
};

const validate = async(token) => {
    const userId = await getFromRedis(token);
    if(!userId){
        throw new Error('Invalid token');
    }
    // return jwt.verify(token, process.env.TOKEN_SECRET)
    return jwt.verify(token, 'secret')

}

module.exports = {register, login, validate};