const mongoose = require('mongoose');
const companySchema=new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required:true,

    },
    companyName:{
        type: String,
        required:true
    },
    isuser: {
        type: Boolean
    },
    Type: {
        type: String,
        required: true
    }
    // },
    // location:  {
    //     type: String,
    //     required:true
    // },
    // description : {
    //     type: String,
    //     required:true
    // } 
},{
    timestamps:true
});


const Company= mongoose.model('Company',companySchema);
module.exports = Company;