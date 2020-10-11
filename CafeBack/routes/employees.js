var expressFunction = require('express')

const router = expressFunction.Router()
const mongoose = require('mongoose')
const auth = require('../Auth')
var schema = require('mongoose').Schema
const userSchema = schema({
    email: String,
    name: String,
    phoneNumber: String,
    position: String,
    shop: String
},{
    collection: 'employees'
})

//create or used existing collection
let Employees 
try {
    Employees = mongoose.model('employees')    
} catch (err) {
    Employees = mongoose.model('employees',userSchema)
}


//Save data to collection
function insertUser(dataUsers){
    return new Promise((res,rej) => {
        var new_user = new Employees({
            email: dataUsers.email,
            name: dataUsers.name,
            phoneNumber: dataUsers.phoneNumber,
            position: dataUsers.position,
            shop: dataUsers.shop

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
        Employees.findById(id,(err,data) => {
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
function getAllEmolyees(){
    return new Promise((resolve, reject) => {
        Employees.find({},(err,data) => {
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
function getEmployeeShop(shop){
    return new Promise((resolve, reject) => {
        Employees.find({shop:shop},(err,data) => {
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
router.route('/delete/:id').delete(auth,function (req,res){
    Employees.findByIdAndRemove({_id: req.params.id},function(err,employee){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});
router.route('/getEmployeeShop/:id').get(auth,(req,res) => {
    const id = req.params.id
    getEmployeeShop(id).then( result => {
        if(result)
            res.status(200).json(result)
        else
            res.status(404).send({message : `Cannot find employee with ID  ${id}`})
    }).catch( err => {
        res.status(500).send({message: `Error: ${err}`})
    })
})
router.route('/getEmployee').get(auth,(req,res) => {
    getAllEmolyees().then( result => {
        if(result)
            res.status(200).json(result)
        else
            res.status(204).send({message : 'Document is empty.'})
    })
    .catch( err => {
        res.status(500).send({message: `Eroor: ${err}`})
    })
})

router.route('/getEmployee/:id').get(auth,(req,res) => {
    const id = req.params.id
    getUser(id).then( result => {
        if(data)
            res.status(200).json(result)
        else
            res.status(404).send({message : `Cannot find employee with ID  ${id}`})
    }).catch( err => {
        res.status(500).send({message: `Error: ${err}`})
    })
})
router.route('/signup').post(auth,(req,res) => {
        const payload ={
            email: req.body.email,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            position: req.body.position,
            shop: req.body.shop
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