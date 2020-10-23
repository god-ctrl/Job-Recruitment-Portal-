const mongoose=require('mongoose');
const jobSchema=new mongoose.Schema({
    title:{
        type :String,
        required :true
    },
    description: {
        type: String,
        required: true
    },
    dateposted: {
        type: Date,
        required: true
    },
    skills: {
        type: String
    },
    location: {
        type: String
    },
    experience: {
        type: Number
    },
    basesalary: {
        type: String
    },
    company: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    

    applicants: [{
        
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User'
        
        
    }]
},{
    timestamps:true
});

const Job = mongoose.model('Job',jobSchema);
module.exports=Job;