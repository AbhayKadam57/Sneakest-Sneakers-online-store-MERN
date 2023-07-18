const mongoose = require('mongoose')



const OrderSchema = new mongoose.Schema({


    userID:{
        type:String,
        required:true
    },
    products:[


        {
            productID:{
                type:String,
                required:true
            },
            quantity:{

                type:Number,
                required:true
            }
        }

    ],
    amount:{

        type:Number,
        required:true
    },
    address:{

        type:Object,
        required:true
    },
    status:{

        type:String,
        default:"Pending"
    }


},{timestamps:true})


module.exports = mongoose.model('orders',OrderSchema)