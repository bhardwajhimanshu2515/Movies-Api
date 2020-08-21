const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: { type: String, required: true },
    phoneNumber:{type:String,required:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    position:{type: String, required: true},
    salary:{type: String, required: true},
    TopSkill:{type: String, required: true},
    userDept: { type: String,  enum : ['IT', 'CS', 'ADMIN'] }, 
    isActive: {type: Boolean, default: true}    
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);


