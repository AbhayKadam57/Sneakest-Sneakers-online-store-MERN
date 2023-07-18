const mongoose = require('mongoose')



const CartSchema = new mongoose.Schema({

    username:{

        type:String,
        required:true
    },

    products:{

        type:Array
    },
    quantity:{

        type:Number
    },
    total:{

        type:Number
    }


},{timestamps:true});




module.exports = mongoose.model("cart",CartSchema);