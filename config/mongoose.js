const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/web',{ useNewUrlParser: true, useUnifiedTopology: true });
const db=mongoose.connection;
db.on('error',console.error.bind(console,"Error in connection gto mongodb"));
db.once('open',function(){
    console.log('Connected to database::MongoDB');
});
module.exports=db;