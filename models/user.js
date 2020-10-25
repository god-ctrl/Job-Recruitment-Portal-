const mongoose = require('mongoose');
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required:true,

    },
    name:{
        type: String,
        required:true
    },
    isuser: {
        type: Boolean
    },
    subs: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }],
    applied_jobs: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }]

    // gender : {
    //     type : String,
    //     required : true
    // },
    // phoneNumber : {
    //     type : Number,
    //     required : true
    // },
    // interests : [{
    //     title : String,
    //     required : true
    // }],
    

},{
    timestamps:true
});


const User= mongoose.model('User',userSchema);
module.exports = User;