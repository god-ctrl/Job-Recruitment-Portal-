const mongoose=require('mongoose');
const postSchema=new mongoose.Schema({
    content:{
        type :String,
        required :true
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    //include the ids of comments in an array

    comments: [{
        
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        
        
    }]
},{
    timestamps:true
});

const Post = mongoose.model('Post',postSchema);
module.exports=Post;