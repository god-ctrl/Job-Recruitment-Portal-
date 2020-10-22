const express=require('express');
const router=express.Router();

const passport = require('passport');


const postjobController=require('../controllers/postjob_controller');

router.post('/company/postjob',passport.checkAuthentication,postjobController.create);

router.get('/company/postjob/destroy/:id',passport.checkAuthentication,postjobController.destroy);  // <===================================================================

module.exports=router;