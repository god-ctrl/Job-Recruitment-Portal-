const express=require('express');
const router=express.Router();

const passport = require('passport');


const postjobController=require('../controllers/postjob_controller');

router.post('/create',passport.checkAuthentication,postjobController.create);

router.get('/destroy/:id',passport.checkAuthentication,postjobController.destroy);  // <===================================================================

router.get('/newjob',passport.checkAuthentication,postjobController.newjob);

module.exports=router; 