const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt =  require('bcrypt-nodejs') //middle ware use to encrypt password

//first name validate
let firstNameLength = (firstName) => {
    if(!firstName){
        return false;
    }else{
        if(firstName.length < 3 || firstName.length >= 30){
            return false
        }else {
            return true
        }
    }
}
let validFirstName = (firstName) => {
    if(!firstName){
        return false;
    }
    else{
        const regExp = new RegExp(/^[a-z ,.'-]+$/i);
        return regExp.test(firstName);
    }
}

const firstNameValidators = [
    {
        validator: firstNameLength,
        message: "First name must be at least 3 characters and no longer than 30 characters "
    },
    {
        validator: validFirstName,
        message: "Must input a valid first name"
    }
]


//last name validate

let lastNameLength = (lastName) => {
    if(!lastName){
        return false;
    }else{
        if(lastName.length < 3 || lastName.length >= 30){
            return false
        }else {
            return true
        }
    }
}
let validLastName = (lastName) => {
    if(!lastName){
        return false;
    }
    else{
        const regExp = new RegExp(/^[a-z ,.'-]+$/i);
        return regExp.test(lastName);
    }
}
const lastNameValidators = [
    {
        validator: lastNameLength,
        message: "First name must be at least 3 characters and no longer than 30 characters "
    },
    {
        validator: validLastName,
        message: "Must input a valid last name"
    }

]



// email validate
let emailLengthCheck = (email) =>
{
    if(!email){ //if email does'n exist
        return false;
    }else {
        if(email.length <5 || email.length >= 30){
            return false
        }else {
            return true;
        }
    }
}
let validEmailChecker = (email) => {
    if(!email){
        return false;
    } else {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        return regExp.test(email);
    }
}
const emailValidators = [
    {
        validator: emailLengthCheck,
        message:" Email must be at least 5 characters but no more than 30"
    },
    {
        validator: validEmailChecker,
        message:" Email must be a valid email"
    }
]


//username validate

let userNameLength = (username) => {
    if(!username){
        return false;
    }else{
        if(username.length < 5 || username.length >= 12){
            return false
        }else {
            return true
        }
    }
}

let validUserName = (username) => {
    if (!username) {
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(username);
    }
}

const usernameValidators = [
    {
        validator: userNameLength,
        message: "Username must be at least 5 characters and no longer than 12 characters "
    },
    {
        validator: validUserName,
        message: "Username must not have any special characters"
    }

]


//telephone validate
let phoneLength = (telephone) => {
    if(!telephone){
        return false;
    }else{
        if(telephone.length < 10 || telephone.length >=15){
            return false
        }else {
            return true
        }
    }
}

let validPhone = (telephone) => {
    if (!telephone) {
        return false;
    } else {
        const regExp = new RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/);
        return regExp.test(telephone);
    }
}

const telephoneValidators = [
    {
        validator: phoneLength,
        message: "Telephone number should at least be 10 numbers but no more than 15"
    },
    {
        validator: validUserName,
        message: "Not a valid telephone number"
    }

]

let passwordLength = (password) =>
{
    if(!password){
        return false;
    }else{
        if(password.length < 8 || password > 30){
            return false
        }else {
            return true
        }
    }
}
let validPassword = (password) => {
    if(!password){
        return false;
    }else{
        const regExp = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/)
        return regExp.test(password);
    }
}

const passwordValidators = [
    {
        validator: passwordLength,
        message: "Password must be at least 8 characters long but no more than 30"
    },
    {
        validator: validPassword,
        message: "Must have at least one uppercase, lowercase, special character, and number"
    }
]

//model definition

const ownerSchema = new Schema({
    firstName: {type: String, required: true, lowercase: true, validate: firstNameValidators},
    lastName: {type: String, required: true, lowercase: true, valida: lastNameValidators},
    username: {type: String, required:true, lowercase:true, validate: usernameValidators},
    password:{type: String, required:true, validate: passwordValidators},
    email: {type: String, required:true, lowercase:true, validate:emailValidators},
    telephone:{type: String, required:true, validate: telephoneValidators},
});

ownerSchema.pre('save',function (next){
    if(this.isModified('password')){
        return next();

        bcrypt.hash(this.password, null, null, (err, hash) =>{
                if(err) return next(err);
                this.password = hash;
                next();
            })
    }
});

//compare what user inputs with what's in database
ownerSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('Owner', ownerSchema);
