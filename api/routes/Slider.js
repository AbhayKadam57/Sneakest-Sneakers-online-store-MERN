const Router = require('express').Router()
const Slider = require("../models/Slider")


Router.post("/",async(req,res)=>{

    const Images = new Slider(req.body)

    try{

        const saveImages = await Images.save()

        res.status(200).json(saveImages)

    }catch(error){


        res.status(500).json(error)
    }

})


Router.get("/",async(req,res)=>{

    try{

        const Image = await Slider.find()

        res.status(200).json(Image)


    }catch(error){

        res.status(500).json(error)

    }





})



module.exports=Router