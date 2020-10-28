
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
        
        
            User.find({},function(err,users){
                    Job.find({})
                    .populate('company')
                    .exec(function(err, jobs){
                        Company.find({}, function(err, company){
                            return res.render('home',{
                                title: "Codecial|Home",
                                jobs: jobs,
                                all_users: users,
                                all_company: company
                        });
                        });
                        
                    
            });
            
        });

    
    
}