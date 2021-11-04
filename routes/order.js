const Order = require("../models/Order");
const {verifyTokenAndAuthorization,verifyToken, verifyTokenAndAdmin} = require("./verifyToken");
const orderRouter = require("express").Router();

//Create 

//Create
orderRouter.post(
    "/",
    verifyToken,
    async(req,res)=>{
        const newOrder = new Order(req.body);
        try{
            const savedOrder = await newOrder.save();
            res.status(200).json(savedOrder);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
)

//Update
orderRouter.put(
    ":/id",
    verifyTokenAndAdmin,
    async(req,res)=>{
       try{
        const updatedOrder = awaitOrder.findByIdAndUpdate(
            req.params.id,
            {
                $set:req.body,
            },
            {
                new:true
            }
        )
        res.status(200).json(updatedOrder)
       }
       catch(err){
           res.status(500).json(err);
       }
    }
)

//delete
orderRouter.delete(
    "/:id",
    verifyTokenAndAdmin,
    async(req,res)=>{
        try{
            awaitOrder.findByIdAndDelete(req.params.id);
            res.status(200).json("Product Delete successfully.....!!!!");
        }

        catch(err){
            res.status(500).json(err);
        }
    }
)

//Get Cart
orderRouter.get(
    "/find/:userId",
    verifyTokenAndAuthorization,
    async(req,res)=>{
        try{
            const order = awaitOrder.findOne({userId: req.params.userId});

            res.status(200).json(order);
        }

        catch(err){
            res.status(500).json(err);
        }
    }
)

//Get all Cart
orderRouter.get(
    "/",
    verifyTokenAndAdmin,
    async(req,res)=>{
        try{
            const order = awaitOrder.find();
            res.status(200).json(order)
        }
        catch(err){
            res.status(500).json(err);
        }
    }
)


//Stats
orderRouter.get(
    "/income",
    verifyTokenAndAdmin,
    async(req,res)=>{
        const date = new Date();
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

        try{

            const income = await Order.aggregate([
                {$match:{createdAt: {$gte: previousMonth}}},
                {
                    $project:{
                        month:{$month:"$createdAt"},
                        sales:"$amount",
                    }
                },
                {
                    $group:{
                        _id:"$month",
                        total:{$sum: "$sales"},
                    }
                }
            ])
            res.status(200).json(income);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
)




module.exports = orderRouter;