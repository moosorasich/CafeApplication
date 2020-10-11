var expressFunction = require('express')

const router = expressFunction.Router()
const mongoose = require('mongoose')
const bcr = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../Auth')
const KEY = 'G5N9i15w!tHu'
var schema = require('mongoose').Schema
const userSchema = schema({
    email: String,
    password: String,
    imageProfile: String,
    name: String,
    phoneNumber: String,
    personalId: String,
    address: String,
    tumbon: String,
    amphoe: String,
    province: String,
    post: String
},{
    collection: 'owners'
})

//create or used existing collection
let User 
try {
    User = mongoose.model('owners')    
} catch (err) {
    User = mongoose.model('owners',userSchema)
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
            password: dataUsers.password,
            imageProfile: dataUsers.imageProfile,
            name: dataUsers.name,
            phoneNumber: dataUsers.phoneNumber,
            personalId: dataUsers.id,
            address: dataUsers.address,
            tumbon: dataUsers.tumbon,
            amphoe: dataUsers.amphoe,
            province: dataUsers.province,
            post: dataUsers.post

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

router.route('/signup').post((req,res) => {
    makeHash(req.body.password).then(hashtext => {
        const payload ={
            email: req.body.email,
            password: hashtext,
            imageProfile: req.body.imageProfile,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            personalId: req.body.personalId,
            address: req.body.address,
            tumbon: req.body.tumbon,
            amphoe: req.body.amphoe,
            province: req.body.province,
            post: req.body.post
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

function login(email){
    return new Promise((resolve, reject) => {
      User.findOne({email:email},(err,data) => {
          if(err){
              reject(new Error('Cannot find username'))
          }
          else{
            if(data){
                resolve({id:data._id,email:data.email,password:data.password})

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

function getOwner(id){
    return new Promise((resolve, reject) => {
        User.findById(id,(err,data) => {
          if(err)
            reject(new Error('Connot get owner'))
          else
            if(data)
                resolve(data)
            else
                reject(new Error(`Owner ID ${id} is not exist`))
      })
    }) 
}

router.route('/login').post(async (req,res) => {
    const payload = {
        email:req.body.email,
        password:req.body.password
    }
    console.log(payload)
    try {
        const result = await login(payload.email)
        const loginStatus = await compareHash(payload.password,result.password)
        console.log(result)
        const status = loginStatus.status

        if(status){
            const token = jwt.sign(result,KEY, {expiresIn:60*60*5})
            res.status(200).json({result,token,status})
        }
        else{
            res.status(404).json({status})
        }
    } catch (error) {
        res.status(404).send(error)
        
    }
})

router.route('/getOwner/:id').get(auth,(req,res) => {
    const id = req.params.id
    getOwner(id).then( result => {
        if(result)
            res.status(200).json(result)
        else
            res.status(404).send({message : `Cannot find Owner with ID  ${id}`})
    }).catch( err => {
        res.status(500).send({message: `Error: ${err}`})
    })
})
module.exports = router