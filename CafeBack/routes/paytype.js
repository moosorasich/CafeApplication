var expressFunction = require('express')

const router = expressFunction.Router()
const mongoose = require('mongoose')
const auth = require('../Auth')
var schema = require('mongoose').Schema
const paytypeSchema = schema({
    paytype:String
},{
    collection: 'paytype'
})

let Paytype 
try {
    Paytype = mongoose.model('paytype')    
} catch (err) {
    Paytype = mongoose.model('paytype',paytypeSchema)
}

function getPaytype(){
    return new Promise((resolve, reject) => {
        Paytype.find({},(err,data) => {
          if (err) {
              reject(new Error('Cannot get paytype'))
          } else {
              if(data){
                  resolve(data)
              }
              else{
                reject(new Error('Cannot get paytype'))
              }
          }
      })
    })   
}
router.route('/getPaytype').get(auth,(req,res) => {
    getPaytype().then( result => {
        if(result)
            res.status(200).json(result)
        else
            res.status(204).send({message : `Document is empty.`})
    })
    .catch( err => {
        res.status(500).send({message: `Eroor: ${err}`})
    })
})

function addPaytype(PaytypeDetails){
    return new Promise((res,rej) => {
        var new_user = new Paytype({
            paytype:PaytypeDetails.paytype
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

router.route('/addPaytype').post((req,res) => {
    const payload ={
        paytype:req.body.paytype
    }
    console.log(payload)
    addPaytype(payload)
    .then(ress => {
        console.log(ress)
        res.status(200).json(ress)
    })
    .catch(err => {
        console.log(err)
    })

})







module.exports = router