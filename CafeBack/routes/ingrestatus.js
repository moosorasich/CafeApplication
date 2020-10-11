var expressFunction = require('express')

const router = expressFunction.Router()
const mongoose = require('mongoose')
const auth = require('../Auth')
var schema = require('mongoose').Schema
const statusSchema = schema({
   status:String
},{
    collection: 'status'
})

let Status 
try {
    Status = mongoose.model('status')    
} catch (err) {
    Status = mongoose.model('status',statusSchema)
}

function getStatus(){
    return new Promise((resolve, reject) => {
        Status.find({},(err,data) => {
          if (err) {
              reject(new Error('Cannot get status'))
          } else {
              if(data){
                  resolve(data)
              }
              else{
                reject(new Error('Cannot get status'))
              }
          }
      })
    })   
}
router.route('/getStatus').get(auth,(req,res) => {
    getStatus().then( result => {
        if(result)
            res.status(200).json(result)
        else
            res.status(204).send({message : `Document is empty.`})
    })
    .catch( err => {
        res.status(500).send({message: `Eroor: ${err}`})
    })
})

function addStatus(StatusDetails){
    return new Promise((res,rej) => {
        var new_user = new Status({
            status:StatusDetails.status
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

router.route('/addStatus').post((req,res) => {
    const payload ={
        status:req.body.status
    }
    console.log(payload)
    addStatus(payload)
    .then(ress => {
        console.log(ress)
        res.status(200).json(ress)
    })
    .catch(err => {
        console.log(err)
    })

})







module.exports = router