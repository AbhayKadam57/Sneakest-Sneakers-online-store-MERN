const mongoose = require('mongoose')


const SliderSchema = new mongoose.Schema({

    id:{
        type:String,
    },
    img:{
        type:String,
    },
    bg:{

        type:String,
    },
    title:{

        type:String,
    },
    Desc:{

        type:String,
    }
       
})


module.exports = mongoose.model('slider', SliderSchema)