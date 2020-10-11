var expressFunction = require('express')
const bcr = require('bcryptjs')
const jwt = require('jsonwebtoken')
const KEY = 'G5N9i15w!tHu'
const router = expressFunction.Router()
const mongoose = require('mongoose')
const auth = require('../Auth')
var schema = require('mongoose').Schema
const userSchema = schema({
    email: String,
    name: String,
    username: String,
    password: String,
    phone: String,
    point: Number
},
    {
    collection: 'customer'
})

//create or used existing collection
let User 
try {
    User = mongoose.model('customer')    
} catch (err) {
    User = mongoose.model('customer',userSchema)
}

async function makeHash(Text) {
    const res = await bcr.hash(Text,10)
    return res
}
//Save data to collection
function insertUser(dataUsers){
    return new Promise((res,rej) => {
        var new_user = new User({
            email: dataUsers.email,
            name: dataUsers.name,
            username: dataUsers.username,
            password: dataUsers.password,
            phone: dataUsers.phone,
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
function login(username){
    return new Promise((resolve, reject) => {
      User.findOne({username:username},(err,data) => {
          if(err){
              reject(new Error('Cannot find username'))
          }
          else{
            if(data){
                resolve({id:data._id,username:data.username,password:data.password,email:data.email,phone:data.phone,name:data.name,point:data.point})

            }
            else{
                reject(new Error('Cannot find username'))
            }
          }
      })
    })
    
}
async function compareHash(Text,myHash) {
    return new Promise((resolve, reject) => {
         bcr.compare(Text,myHash,(err,data) => {
             if(err){
                 
                 reject(new Error('Error bcrypt compare'))
             }
             else{
                 
                 resolve({status: data})
             }
         })
    })
 }

 router.route('/signup').post((req,res) => {
    makeHash(req.body.password).then(hashtext => {
        const payload ={
            email: req.body.email,
            password: hashtext,
            username: req.body.username,
            name: req.body.name,
            phone: req.body.phone,
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
    .catch(err => {
        console.log(err)
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
router.route('/login').post(async (req,res) => {
    const payload = {
        username:req.body.username,
        password:req.body.password
    }
    console.log(payload)
    try {
        const result = await login(payload.username)
        const loginStatus = await compareHash(payload.password,result.password)
        console.log(result)
        const status = loginStatus.status

        if(status){
            const token = jwt.sign(result,KEY, {expiresIn:60*60*5})
            res.status(200).json({result,token,status})
        }
        else{
            res.status(200).json({status})
        }
    } catch (error) {
        res.status(404).send(error)
        
    }
})
module.exports = router