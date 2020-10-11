var expressFunction = require('express')

const router = expressFunction.Router()
const mongoose = require('mongoose')
const auth = require('../Auth')
var schema = require('mongoose').Schema
const promotionSchema = schema({
    name: String,
    type: String,
    discount: Number,
    point: Number,
    shop: String
},{
    collection: 'promotions'
})
//create or used existing collection
let Promotion
try {
    Promotion = mongoose.model('promotion')    
} catch (err) {
    Promotion = mongoose.model('promotion',promotionSchema)
}

function getPromotion(){
    return new Promise((resolve, reject) => {
        Promotion.find({},(err,data) => {
          if (err) {
              reject(new Error('Cannot get promotion'))
          } else {
              if(data){
                  resolve(data)
              }
              else{
                reject(new Error('Cannot get promotion'))
              }
          }
      })
    })   
}
function addPromotion(PromotionDetails){
    return new Promise((res,rej) => {
        var new_user = new Promotion({
            name:PromotionDetails.name,
            type:PromotionDetails.type,
            discount:PromotionDetails.discount,
            point:PromotionDetails.point,
            shop:PromotionDetails.shop
        })
        new_user.save((err,data) => {
            if(err){
                rej(new Error('Cannot insert point to DB'))
            }
            else{
                res({message: 'Add successfully'})
            }
        })
    })
}
function getPromotionShop(shop){
    return new Promise((resolve, reject) => {
        Promotion.find({shop:shop},(err,data) => {
            if(err)
              reject(new Error('Connot get promotion'))
            else
              if(data)
                  resolve(data)
              else
                  reject(new Error(`Promotion ID ${id} is not exist`))
        })
    })
    
}
router.route('/getPromotionShop/:id').get(auth,(req,res) => {
    const id = req.params.id
    getPromotionShop(id).then( result => {
        if(result)
            res.status(200).json(result)
        else
            res.status(404).send({message : `Cannot find employee with ID  ${id}`})
    }).catch( err => {
        res.status(500).send({message: `Error: ${err}`})
    })
})

router.route('/delete/:id').delete(auth,function (req,res){
    Promotion.findByIdAndRemove({_id: req.params.id},function(err,promotion){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});



router.route('/updatepromotions').put(auth,(req,res) => {
    const payload =  {
        price:req.body.price
    }
    console.log(payload)
    Promotion.updateOne({_id:req.body.id},{price: payload.price},(err,data) => {
        if(data){
            res.status(200).json(data)
        }
        else{
            res.status(500).send({message:'Update failed'+err.message})
        }
    })
})




router.route('/addPromotion').post(auth,(req,res) => {
        const payload ={
            name:req.body.name,
            type:req.body.type,
            discount:req.body.discount,
            point:req.body.point,
            shop: req.body.shop
        }
        console.log(payload)
        addPromotion(payload)
        .then(ress => {
            console.log(ress)
            res.status(200).json(ress)
        })
        .catch(err => {
            console.log(err)
        })

})


router.route('/getPromotion').get(auth,(req,res) => {
    getPromotion().then( result => {
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