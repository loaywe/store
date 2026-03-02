const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./module/conectdb");
const { User, Product, Order } = require("./module/user");
require('dotenv').config();
const ruser=require("./routs/userrout")
const prruser=require("./routs/productrout")
const ordersrouter=require("./routs/orderrout")


connectDB();
const app = express();
app.use(cors());
// parse JSON request bodies
app.use(express.json());
app.use("/user",ruser);
app.use("/product", prruser);
app.use("/order",ordersrouter);





app.get("/",  (req, res) => {
  res.send("helwo");
});


const PORT =  51770;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


