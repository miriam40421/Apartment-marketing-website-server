import mongoose from "mongoose";
const ApartmentSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true

    },
    description:{
        type:String
    },
    image:{
        type:String
    },
    codeCategory:{
        type:mongoose.Types.ObjectId,
     ref:'category',
     require:true 
    },
    codeCity:{
         type:mongoose.Types.ObjectId,
         ref:'City',
         require:true 

    },
    adress:{
     type:String
    },
    numBed:{
        type:Number
    },
    more:{
        type:String
 
    },
    price:{
        type:Number
    },
    codeadvertiser:{
        type:mongoose.Types.ObjectId,
        ref:'Advertiser',
        require:true

    }

})

export default mongoose.model('Apartments',ApartmentSchema)
