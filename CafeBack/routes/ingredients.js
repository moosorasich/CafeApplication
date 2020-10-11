var expressFunction = require('express')

const router = expressFunction.Router()
const mongoose = require('mongoose')
const auth = require('../Auth')
var schema = require('mongoose').Schema
const ingredientSchema = schema({
   name:String,
   status:String,
   shop:String
},{
    collection: 'ingredients'
})

//create or used existing collection
let Ingredients 
try {
    Ingredients = mongoose.model('ingredients')    
} catch (err) {
    Ingredients = mongoose.model('ingredients',ingredientSchema)
}

function getIngredients(){
    return new Promise((resolve, reject) => {
        Ingredients.find({},(err,data) => {
          if (err) {
              reject(new Error('Cannot get shops'))
          } else {
              if(data){
                  resolve(data)
              }
              else{
                reject(new Error('Cannot get shops'))
              }
          }
      })
    })   
}
function addIngredient(ingredientDetails){
    return new Promise((res,rej) => {
        var new_user = new Ingredients({
            name:ingredientDetails.name,
            status:ingredientDetails.status,
            shop:ingredientDetails.shop
        })
        new_user.save((err,data) => {
            if(err){
                rej(new Error('Cannot insert user to DB'))
            }
            else{
                res({message: 'Ingredient add successfully'})
            }
        })
    })
}
function getIngredientShop(shop){
    return new Promise((resolve, reject) => {
        Ingredients.find({shop:shop},(err,data) => {
            if(err)
              reject(new Error('Connot get employee'))
            else
              if(data)
                  resolve(data)
              else
                  reject(new Error(`Employee ID ${id} is not exist`))
        })
    })
    
}
router.route('/getIngredientShop/:id').get(auth,(req,res) => {
    const id = req.params.id
    getIngredientShop(id).then( result => {
        if(result)
            res.status(200).json(result)
        else
            res.status(404).send({message : `Cannot find employee with ID  ${id}`})
    }).catch( err => {
        res.status(500).send({message: `Error: ${err}`})
    })
})

router.route('/updateingredients').put(auth,(req,res) => {
    const payload =  {
        status:req.body.status
    }
    console.log(payload)
    Ingredients.updateOne({_id:req.body.id},{status: payload.status},(err,data) => {
        if(data){
            res.status(200).json(data)
        }
        else{
            res.status(500).send({message:'Update failed'+err.message})
        }
    })
})

router.route('/delete/:id').delete(auth,function (req,res){
    Ingredients.findByIdAndRemove({_id: req.params.id},function(err,ingredient){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});


router.route('/addIngredient').post(auth,(req,res) => {
        const payload ={
            name:req.body.name,
            status:req.body.status,
            shop:req.body.shop
        }
        console.log(payload)
        addIngredient(payload)
        .then(ress => {
            console.log(ress)
            res.status(200).json(ress)
        })
        .catch(err => {
            console.log(err)
        })

})


router.route('/getIngredients').get(auth,(req,res) => {
    getIngredients().then( result => {
        if(result)
            res.status(200).json(result)
        else
            res.status(204).send({message : `Document is empty.`})
    })
    .catch( err => {
        res.status(500).send({message: `Eroor: ${err}`})
    })
})
module.exports = router