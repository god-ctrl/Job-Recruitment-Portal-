const express=require('express');
const router=express.Router();
const passport=require('passport');
const usersController=require('../controllers/users_controller');
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);
router.get('/profile/',passport.checkAuthentication,usersController.profile2); 
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/getCompany',passport.checkAuthentication,usersController.getCompany);
router.get('/sign-out',usersController.destroySession);
router.post('/create',usersController.create);
// to apply for a job
router.post('/apply/:id',usersController.apply);
// to subscribe to a company
router.post('/subscribe/:id',usersController.subs);
router.post('/update/:id',passport.checkAuthentication,usersController.update);
//use passport as a middleware
router.post('/create-session',passport.authenticate(
    'user-locals',{failureRedirect:'/users/sign-in'},
),usersController.createSession);
module.exports=router;
