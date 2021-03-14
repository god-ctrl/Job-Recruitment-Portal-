const Company = require("../models/company");
const User = require('../models/user');
const Job = require('../models/job');

const Post = require('../models/post');


// Jab koi or khole
module.exports.profile=function(req,res){
    Company.findById(req.params.id,function(err,user){
        Post.find({user:user._id})
        .populate('user')
        .populate({
            path:'comments',
            populate : {
                path: 'user'
            }
        })
        .exec(function(err,posts){
            Job.find({company: req.params.id})
            .populate({
                path:'applicants'
            })
            .populate({
                path:'applicants',
                populate : {
                    path: 'user'
                }
            })
            .exec(function(err, job){
                // arr.sort((a, b) => (a.dateposted > b.dateposted) ? -1 : 1 );
                return res.render('company',{
                    title: "Company",
                    profile_company: user,
                    posts: posts,
                    job: job
                  
            });
            });  
                
             });
        });
              
}
// jab woh khud khole
module.exports.profile2=function(req,res){

        Post.find({user:req.user._id})
        .populate('user')
        .populate({
            path:'comments',
            populate : {
                path: 'user'
            }
        })
        .exec(function(err,posts){
            Job.find({company: req.user.id})
            .populate({
                path:'applicants'
            })
            .populate({
                path:'applicants',
                populate : {
                    path: 'user'
                }
            })
            .exec(function(err, job){
                return res.render('company',{
                    title: "Company",
                    posts: posts,
                    job: job
                   
            });
            });               
        });                
}
// to select a candidate
module.exports.select=function(req,res){
    
    Job.findById(req.params.id)
       .populate('applicants') 
       .exec(function(err, b){
        
           
               
    for(a of b.applicants){
                
               if(a.user == req.body.user)
                {   
                    
                   a.status = "confirmed";
                   a.notification = "yes";
                
                }
           
                b.save();
        //    console.log(b);
        }
           res.redirect('/company/profile');
       })
}
module.exports.update=function(req,res){
    if(req.user.id==req.params.id)
    {
        console.log(req.body);
        Company.findByIdAndUpdate(req.params.id,{companyName: req.body.name, email: req.body.email, Type: req.body.Type},function(err,user){
                if(err)
                {
                    console.log('error in updating company');
                    return;
                }
                return res.redirect('back');    
        });
    }
    else
    {
        return res.status(401).send('Unauthorized');
    }
}


//render sighup page
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/company/profile');
    }
    return res.render('company_signup',{           //   ejs file to be created
        title:"Codecial| Sign Up" 
    })
    
}
//render the signin page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/company/profile');
    }
    return res.render('company_signin',{             // ejs page to be created
        title:"Codecial| Sign In"
    })
    
}
//get the sign up data
module.exports.create=function(req,res){
    if(req.body.password != req.body.confirm_password){
    return res.redirect('back');                   // back means going back from where the req was made
    }
    if(req.body.password.length<=6){
        return res.redirect('back');                   // back means going back from where the req was made
    }

    Company.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding user in signUp');return}

        if(!user)
        {
            Company.create(req.body,function(err,user){
                if(err){console.log('error in creating  user in signUp');return};
                return res.redirect('/company/sign-in');
                
            })
        }
        else
        {
            return res.redirect('/company/sign-in');
        }
    })
}
//sign-in to create a session for the user
module.exports.createSession= function(req,res){
    return res.redirect('/company/profile');
}

module.exports.destroySession= function(req,res){
    req.logout();
    return res.redirect('/');
}
