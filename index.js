const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;
const userRouter = require('./routes/user');
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const orderRouter = require("./routes/order");
const stripeRouter = require("./routes/stripe");
const cors = require("cors");

dotenv.config();
app.use(express.json());

mongoose
.connect(
    process.env.MONGO_URL,
    { 
        useNewUrlParser: true,
        useUnifiedTopology:true
    }
)
.then(()=> console.log("DB Connection Successfull...."))
.catch((err)=>{
    console.log(err);
})

app.get(
    "/",
    (req,res)=>{
        res.send("Test Successfully done.....");
    }
)

app.use(cors());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/checkout",stripeRouter);;

app.listen(
    port,
    ()=>{
        console.log("Server started on port ",port);
    }
)
