var expressFunction = require('express')

const router = expressFunction.Router()
const mongoose = require('mongoose')
const auth = require('../Auth')
var schema = require('mongoose').Schema
const variationSchema = schema({
    variation:String
},{
    collection: 'variation'
})

let Variation 
try {
    Variation = mongoose.model('variation')    
} catch (err) {
    Variation = mongoose.model('variation',variationSchema)
}

function getVariation(){
    return new Promise((resolve, reject) => {
        Variation.find({},(err,data) => {
          if (err) {
              reject(new Error('Cannot get variation'))
          } else {
              if(data){
                  resolve(data)
              }
              else{
                reject(new Error('Cannot get variation'))
              }
          }
      })
    })   
}
router.route('/getVariation').get(auth,(req,res) => {
    getVariation().then( result => {
        if(result)
            res.status(200).json(result)
        else
            res.status(204).send({message : `Document is empty.`})
    })
    .catch( err => {
        res.status(500).send({message: `Eroor: ${err}`})
    })
})

function addVariation(VariationDetails){
    return new Promise((res,rej) => {
        var new_user = new Variation({
            variation:VariationDetails.variation
        })
        new_user.save((err,data) => {
            if(err){
                rej(new Error('Cannot insert menu to DB'))
            }
            else{
                res({message: 'Add successfully'})
            }
        })
    })
}

router.route('/addVariation').post((req,res) => {
    const payload ={
        variation:req.body.variation
    }
    console.log(payload)
    addVariation(payload)
    .then(ress => {
        console.log(ress)
        res.status(200).json(ress)
    })
    .catch(err => {
        console.log(err)
    })

})







module.exports = router