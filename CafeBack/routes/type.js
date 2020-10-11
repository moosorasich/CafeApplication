var expressFunction = require('express')

const router = expressFunction.Router()
const mongoose = require('mongoose')
const auth = require('../Auth')
var schema = require('mongoose').Schema
const typeSchema = schema({
    type:String
},{
    collection: 'type'
})

let Type 
try {
    Type = mongoose.model('type')    
} catch (err) {
    Type = mongoose.model('type',typeSchema)
}

function getType(){
    return new Promise((resolve, reject) => {
        Type.find({},(err,data) => {
          if (err) {
              reject(new Error('Cannot get type'))
          } else {
              if(data){
                  resolve(data)
              }
              else{
                reject(new Error('Cannot get type'))
              }
          }
      })
    })   
}
router.route('/getType').get(auth,(req,res) => {
    getType().then( result => {
        if(result)
            res.status(200).json(result)
        else
            res.status(204).send({message : `Document is empty.`})
    })
    .catch( err => {
        res.status(500).send({message: `Eroor: ${err}`})
    })
})

function addType(TypeDetails){
    return new Promise((res,rej) => {
        var new_user = new Type({
            type:TypeDetails.type
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

router.route('/addType').post((req,res) => {
    const payload ={
        type:req.body.type
    }
    console.log(payload)
    addType(payload)
    .then(ress => {
        console.log(ress)
        res.status(200).json(ress)
    })
    .catch(err => {
        console.log(err)
    })

})







module.exports = router