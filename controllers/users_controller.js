const User = require("../models/user");
const Company = require("../models/company");
// const Application = require("../models/application");
const Job = require("../models/job");
const Post = require("../models/post");

// jab koi or khole
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render('user' ,{
            title: "User",
            profile_user: user
            
        });
    })
   
}

module.exports.profile2 = async function (req, res) {
    let notif = []
    let user = await User.findById(req.user._id).populate('applied_jobs').exec()
    for (a of user.applied_jobs) {
      let job = await Job.findById(a.id).populate('applicants').exec()
      for (a of job.applicants) {
        if (a.user == user.id && a.notification == "yes") {
          notif.push(job.title);
          a.notification = "no";//a.Applicant.update({_id: id}, {notification: "no"})
          
        }
      }
      job.save();
    }
    console.log(notif);
    return res.render('user', {
      title: "User",
      notif: notif
    })
  }

// jab wo khud khole
// module.exports.profile2=function(req,res){
//     let notif = [];
//     // console.log(notif.length);
//     User.findById(req.user._id)
//         .populate('applied_jobs')
//         .exec(function(err, user){
//             for(a of user.applied_jobs){
//                 console.log("allo matar");
//                 Job.findById(a._id)
//                 .populate('applicants')
//                 .exec(function(err, job){
//                     for(a of job.applicants){
//                         if(a.user == user.id && a.notification=="yes"){
                            
//                             notif.push(job.title);
//                             console.log(job.title);
//                             a.notification="no";
                           
//                             console.log("yahan pe agae");
//                         }
                        
//                     }
//                     job.save();
//                     console.log("**********",notif.length);
//                     return res.render('user' ,{
//                     title: "User",
//                     notif: notif
//                 });
        
//                 })
//             }
//         })
// }

module.exports.getCompany=function(req,res) {
    User.find({},function(err,users){
        Job.find({})
        .populate('company')
        .exec(function(err, jobs){
            Company.find({}, function(err, company){
                console.log(req.body);
                Company.find( { $or:[ {'companyName':req.body.kompany}, {'Type':req.body.kompany} ]},function(err,companyFound){
                            
                        return res.render('home',{
                        title: "Codecial|Home",
                        jobs: jobs,
                        all_users: users,
                        all_company: company,
                        companyFound: companyFound
                });
                
            });
            });
            
        
});

});
}
module.exports.apply=function(req,res){
    
    Job.findById(req.params.id, function(err, job){
        console.log('job id:' + job.id);
        if(err){
            console.log('error in finding this job');
            return ;
        }
        job.applicants.push({user: req.body.user, status: "pending hai bro"});
        job.save();
        User.findById(req.body.user, function(err, user) {
            if(err){
                console.log('error in filling applied_jobs for this user');
                return ;
            }
            // console.log('user id: this is' +user.id + 'and job id: ' + job.id);
            
            user.applied_jobs.push(job.id);
            user.save();
            res.redirect('/');
        })
    })

}

module.exports.subs=function(req,res){
    console.log('yaha aya tha');
    User.findById(req.body.user,function(err,user){
        console.log("yaha bhi aya tha");
        if(user){
                 
            console.log(req.params.id);
            user.subs.push(req.params.id);
            user.save();

            res.redirect('/');
        }
        else
        {
            console.log('user not found');
            res.redirect('back');
        }
    })
}

module.exports.update=function(req,res){
    if(req.user.id==req.params.id)
    {
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
                if(err)
                {
                    console.log('error in updating user');
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
        return res.redirect('/users/profile');
    }
    return res.render('user_signup',{
        title:"Codecial| Sign Up"
    })
    
}
//render the signin page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_signin',{
        title:"Codecial| Sign In"
    })
    
}
//get the sign up data
module.exports.create=function(req,res){
    if(req.body.password != req.body.confirm_password){
    return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding user in signUp');return}

        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err){console.log('error in creating  user in signUp');return};
                return res.redirect('/users/sign-in');
                
            })
        }
        else
        {
            return res.redirect('/users/sign-in');
        }
    })
}
//sign-in to create a session for the user
module.exports.createSession= function(req,res){
    req.flash('success','login successful');
    return res.redirect('/users/profile');
}
module.exports.destroySession= function(req,res){
    req.logout();
    req.flash('success','you have logged out successfully');
    return res.redirect('/');
}