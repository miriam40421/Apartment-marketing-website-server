
import mongoose from "mongoose";
const Cityshceme=new mongoose.Schema({
    namecity:{
        type:String,
    },
    arrApartment:[
        {
                type:mongoose.Types.ObjectId,
                ref:"Apartments"
        }
    ]
})
export default mongoose.model('City',Cityshceme)