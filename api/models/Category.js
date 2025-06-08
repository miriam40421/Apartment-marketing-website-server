import mongoose from "mongoose";
const Categoryschema=new mongoose.Schema({
    nameCategory:{
        type:String,
        require:true

    },
    arrApartment:[
        {
                type:mongoose.Types.ObjectId,
                ref:"Apartments"
        }
    ]
})
export default mongoose.model('category',Categoryschema)