const mongoose=require('mongoose');
const uri="mongodb://localhost:27017/Astacus"

const connecttomongodb=()=>{
    mongoose.connect(uri);
    console.log("Connected to mongodb");
}

module.exports=connecttomongodb;