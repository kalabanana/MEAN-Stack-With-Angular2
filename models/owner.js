const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt =  require('bcrypt-nodejs') //middle ware use to encrypt password

const ownerSchema = new Schema({
    name: {type: String, required: true, lowercase: true},
    username: {type: String, required:true, lowercase:true},
    password:{type: String, required:true},
    email: {type: String, required:true, lowercase:true},
    telephone:{type: Number, required:true},
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
