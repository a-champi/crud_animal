const express = require("express");
const { create } = require("../models/pet");
const router = express.Router();

//const mongoose = require("mongoose")
const Pet = require ( "../models/pet");


router.get("/", async(req, res) =>{
    try {
       const arrayPets = await Pet.find();
       res.render("pets", 
        {
            listPets : arrayPets
           
        })
       
    } catch (error) {
        console.log(error);
    }
       
});

//add animal
router.get("/add", (req, res) => {
    res.render("add");
});

//@post sent animal to form 
router.post("/", async(req, res) => {
     const  body = req.body;
     
     try {
        // const pet = new Pet(body);
        // await pet.save();
        
        await Pet.create(body);
        res.redirect("pets");

     } catch (error) {
        console.log(error)
     }
});

//@get animal by id
router.get("/:id", async(req, res) =>{

    const id = req.params.id;
    
    try {
       const pet = await Pet.findOne({_id: id});
       res.render("showById",{
        pet: pet,
        error: false
       }) 

    } catch (error) {
        console.log(error)
        res.render("showById", {
            error:true,
            message: "Dnt find the selected animal"
        })

    }
});

//@delete animal by id
router.delete("/:id", async(req, res) => {
    const id = req.params.id;

    try {
        const deletePet = await Pet.findByIdAndDelete({_id: id});
        
        if(deletePet){
            res.json({
                status: true,
                message: "delete"
            })
        }else{
            res.json({
                status:false,
                message: "dont delete"
            })

        }
    } catch (error) {
        console.log(error);
    }

});

//@put animal by id
// first, read a body and later the params..
router.put("/:id", async(req, res) => {
    const id = req.params.id;
    const body = req.body;

    try {
        const updatedPet = await Pet.findByIdAndUpdate(id, body, {useFindAndModify:false});
        res.json({
            status:true,
            message:"edited"
        });
    } catch (error) {
        console.log(error);
        res.json({
            status:false,
            message:"Dont edited"
        });
    }
})

module.exports = router;