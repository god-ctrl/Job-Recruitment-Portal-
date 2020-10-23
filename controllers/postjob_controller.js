const Job=require('../models/job');



module.exports.create=function(req,res){
    Job.create({
        title: req.body.title,
        description: req.body.description,
        dateposted: req.body.dateposted,
        skills: req.body.skills,
        location: req.body.location,
        experience: req.body.experience,
        basesalary: req.body.basesalary,

        company: req.user._id
    },function(err,post){
        if(err)
        {
            console.log('error in posting a job');
            return;
        }
        return res.redirect('/company/profile');
    })
}
module.exports.newjob=function(req,res){

    return res.render('postjob' ,{
        title: "create new job"
})

}


module.exports.destroy = function(req,res){
    Job.findById(req.params.id,function(err,post){
        //.id means converting the objectId into String
        if(job.company == req.user.id){
            job.remove();

            Comment.deleteMany({job:req.params.id},function(err){
                if(err)
                {
                    console.log('error in deleting comments of the post');
                    return;
                }
                return res.redirect('/company/profile');
            });

        }
        else
        {
            return res.redirect('back');
        }
    });
} 