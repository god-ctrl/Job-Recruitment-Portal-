const Company = require("../models/company");

module.exports.profile=function(req,res){
    Company.findById(req.params.id,function(err,company){
        return res.render('company' ,{
            title: "Company",                    
            profile_company: company
        });
    })
   
}//
module.exports.profile2=function(req,res){
    
        return res.render('company' ,{
            title: "Company",
            company:"yes"
    })
   
}
module.exports.update=function(req,res){
    if(req.user.id==req.params.id)
    {
        Company.findByIdAndUpdate(req.params.id,req.body,function(err,user){
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