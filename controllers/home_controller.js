
const Post = require("../models/post");
const Job = require("../models/job");

const User = require("../models/user");
const Company = require("../models/company");
module.exports.home=function(req,res){
   
        // console.log(req.cookies);
        // res.cookie('user_id',25);
        // Post.find({},function(err,posts){
        //     return res.render('home',{
        //         title: "Codecial|Home",
        //         posts: posts
        //    });
        // });

        //populate the user of each post
        
        Post.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate : {
                path: 'user'
            }
        })
        .exec(function(err,posts){
            User.find({},function(err,users){
                    Job.find({})
                    .populate('company')
                    .exec(function(err, jobs){
                        return res.render('home',{
                            title: "Codecial|Home",
                            posts: posts,
                            jobs: jobs,
                            all_users: users
                    });
                    
            });
            
        });

    })
    
}