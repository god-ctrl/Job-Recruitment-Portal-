const Comment=require('../models/comment');

const Post=require('../models/post');


module.exports.create = function(req, res){
    if(req.user.isuser==true){
    Post.findById(req.body.post,function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                post : req.body.post,
                user : req.user._id
            },function(err,comment){
                if(err)
                {
                    console.log('error in creating comment');
                    return;
                }
                post.comments.push(comment);
                post.save();

                res.redirect('back');
            });
        }
    })
    }
    else{
        return res.redirect('back');
    }
}

module.exports.destroy = function(req, res){
    if(req.user.isuser){
    Comment.findById(req.params.id,function(err,comment){
        
        if(comment)
        {
            let userId = -1;
            Post.findById(comment.post,function(err,post){
                if(err)
                {
                    console.log('error in finding post of comment');
                    return;
                }
                userId=post.user;
                
                if(req.user.id==userId)
                {
                    let postId=comment.post;
                   
                    comment.remove();

                    Post.findByIdAndUpdate(postId,{$pull: {comments:req.params.id}},function(err,post){
                    return res.redirect('back');
                     });
                }
                else if(comment.user==req.user.id)
                {
                    let postId=comment.post;

                    comment.remove();
    
                    Post.findByIdAndUpdate(postId,{$pull: {comments:req.params.id}},function(err,post){
                        return res.redirect('back');
                    });
                }
                else
                {
                    return res.redirect('back');
                }
            });
            
        }
        else{
            return res.redirect('back');
        }
    })
    }
    else
    {
        return res.redirect('back');
    }
}