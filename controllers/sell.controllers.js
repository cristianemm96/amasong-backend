import Sell from "../models/sell.js";

export const addSell = async(req,res)=>{
    try{
        const {userID, product} = req.body
    console.log(product)
    const newSell = new Sell({
        userID,
        productID: product.id
    })
    await newSell.save()
    res.status(200).json(newSell)
    }
    catch(error){
        console.log(error)
    }
    
}

export const getSell = async(req,res)=>{
    const {id} = req.params
    console.log(id)
    const sell = await Sell.find({userID: `${id}`})
    res.status(200).json(sell)
}

