const express=require('express');
const router=express.Router();
const passport=require('passport');
const companyController=require('../controllers/company_controller');
router.get('/profile/:id',passport.checkAuthentication,companyController.profile);
router.get('/profile/',passport.checkAuthentication,companyController.profile2); 
router.get('/sign-up',companyController.signUp);
router.get('/sign-in',companyController.signIn);
router.get('/sign-out',companyController.destroySession);
// to select a candidate
router.post('/select/:id',companyController.select);

router.post('/create',companyController.create);
router.post('/update/:id',passport.checkAuthentication,companyController.update);
//use passport as a middleware
router.post('/create-session',passport.authenticate(
    'company-locals',{failureRedirect:'/company/sign-in'},
),companyController.createSession);
module.exports=router;
