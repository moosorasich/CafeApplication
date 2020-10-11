var expressFunction = require('express')

const router = expressFunction.Router()
const mongoose = require('mongoose')
const auth = require('../Auth')
var schema = require('mongoose').Schema
const userSchema = schema({
    email: String,
    name: String,
    phoneNumber: String,
    birth: Date,
    shop: String,
    point: Number
},{
    collection: 'customers'
})

//create or used existing collection
let User 
try {
    User = mongoose.model('customers')    
} catch (err) {
    User = mongoose.model('customers',userSchema)
}
//Save data to collection
function insertUser(dataUsers){
    return new Promise((res,rej) => {
        var new_user = new User({
            email: dataUsers.email,
            name: dataUsers.name,
            phoneNumber: dataUsers.phoneNumber,
            birth: dataUsers.birth,
            shop: dataUsers.shop,
            point: dataUsers.point
        })
        new_user.save((err,data) => {
            if(err){
                rej(new Error('Cannot insert user to DB'))
            }
            else{
                res({message: 'Singn up successfully'})
            }
        })
    })
}

function getUser(id){
    return new Promise((resolve, reject) => {
        User.findById(id,(err,data) => {
            if(err)
              reject(new Error('Connot get user'))
            else
              if(data)
                  resolve(data)
              else
                  reject(new Error(`User ID ${id} is not exist`))
        })
    })
    
}
function getAllCustomer(){
    return new Promise((resolve, reject) => {
        User.find({},(err,data) => {
          if (err) {
              reject(new Error('Cannot get orders'))
          } else {
              if(data){
                  resolve(data)
              }
              else{
                reject(new Error('Cannot get orders'))
              }
          }
      })
    })
}
function getCustomerShop(shop){
    return new Promise((resolve, reject) => {
        User.find({shop:shop},(err,data) => {
            if(err)
              reject(new Error('Connot get Customer'))
            else
              if(data)
                  resolve(data)
              else
                  reject(new Error(`Customer ID ${id} is not exist`))
        })
    })
    
}
function getCustomerTel(shop,phoneNumber){
    return new Promise((resolve, reject) => {
        User.find({shop:shop,phoneNumber:phoneNumber},(err,data) => {
            if(err)
              reject(new Error('Connot get Customer'))
            else
              if(data)
                  resolve(data)
              else
                  reject(new Error(`Customer ID ${id} is not exist`))
        })
    })
    
}
router.route('/getTel/:shop/:phoneNumber').get(auth,(req,res) => {
    const shop = req.params.shop
    const phoneNumber = req.params.phoneNumber
    getCustomerTel(shop,phoneNumber).then( result => {
        if(result)
            res.status(200).json(result)
        else
            res.status(204).send({message : `Document is empty.`})
    })
    .catch( err => {
        res.status(500).send({message: `Eroor: ${err}`})
    })
})
router.route('/getCustomerShop/:id').get(auth,(req,res) => {
    const id = req.params.id
    getCustomerShop(id).then( result => {
        if(result)
            res.status(200).json(result)
        else
            res.status(404).send({message : `Cannot find Customer with ID  ${id}`})
    }).catch( err => {
        res.status(500).send({message: `Error: ${err}`})
    })
})
router.route('/delete/:id').delete(auth,function (req,res){
    User.findByIdAndRemove({_id: req.params.id},function(err,user){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});
router.route('/getCustomer').get(auth,(req,res) => {
    getAllCustomer().then( result => {
        if(result)
            res.status(200).json(result)
        else
            res.status(204).send({message : 'Document is empty.'})
    })
    .catch( err => {
        res.status(500).send({message: `Eroor: ${err}`})
    })
})
router.route('/getCustomer/:id').get(auth,(req,res) => {
    const id = req.params.id
    getUser(id).then( result => {
        if(data)
            res.status(200).json(result)
        else
            res.status(404).send({message : `Cannot find user with ID  ${id}`})
    }).catch( err => {
        res.status(500).send({message: `Error: ${err}`})
    })
})
router.route('/updateCustomer').put(auth,(req,res) => {
    const changepoint =  {
        point: req.body.point
    }
    console.log(changepoint)
    User.updateOne({_id:req.body.id},changepoint,(err,data) => {
        if(data){
            res.status(200).json(data)
        }
        else{
            res.status(500).send({message:'Update failed'+err.message})
        }
    })
})
router.route('/signup').post(auth,(req,res) => {
        const payload ={
            email: req.body.email,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            birth: req.body.birth,
            shop: req.body.shop,
            point: req.body.point
        }
        console.log(payload)
        insertUser(payload)
        .then(ress => {
            console.log(ress)
            res.status(200).json(ress)
        })
        .catch(err => {
            console.log(err)
        })
})
module.exports = router