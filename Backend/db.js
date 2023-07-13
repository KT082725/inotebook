const mongoose=require('mongoose');
const mongoURI='mongodb+srv://aniketgupta:Tanu0827@cluster0.kl4i2zi.mongodb.net/?retryWrites=true&w=majority';
const connectToMongo=()=>{
    mongoose.connect(mongoURI)
}
module.exports=connectToMongo;