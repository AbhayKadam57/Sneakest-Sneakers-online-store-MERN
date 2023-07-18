
const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({


    title:{
        type:String,
        required:true  
    },
    type:{
        type:String,
        required:true  
    },
    price:{
        type:Number,
        required:true  
    },
    desc:{
        type:String,
        required:true  
    },
    sizes:{
        type:Array,  
    },
    manufacturers:{

        type:String
    },
    country:{

        type:String
    },
    importBy:{

        type:String
    },
    weight:{

        type:Number,
    },
    genericName:{

        type:String
    },
    UOM:{

        type:String
    },
    marketedBy:{

        type:String
    },
    articleCode:{

        type:String
    },
    images:{

        type:Array,

    },
    inStock:{

        type:Boolean,
        default:true
    },
    categories:{

        type:Array
    }


},{timestamps:true})


module.exports = mongoose.model("product",ProductSchema)