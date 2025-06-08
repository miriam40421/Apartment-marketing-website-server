
import mongoose from "mongoose";


const SchemaAdvertiser=new mongoose.Schema({
name:{
        type:String,
        require:true,

    },
email:{
    type:String,
    require:true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
},
password:{
    type:String,
    require:true,


},
phone:{
    type:String,
    match:/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/

},
anotherPhone:{
    type:String,
    match:/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/

},
arrApartment:[
    {
            type:mongoose.Types.ObjectId,
            ref:"Apartments"
    }
]


})
export default mongoose.model('Advertiser',SchemaAdvertiser)
