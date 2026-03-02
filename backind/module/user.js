
const mongoose = require("mongoose");





const userSchema = new mongoose.Schema({
ferstname: String,
lastname: String,


  name: { type: String },
  email:{ type: String, unique: true , validate:{validator:function(v){
    return v.includes("@");
  }, message:"البريد الإلكتروني غير صحيح"} },
  role: { type: String, enum: ["admin", "customer"] },
  password: String,
  age: Number,
  gender:{ type: String, enum: ["male", "female"] },
  address: {
    street: String,
    city: String,
  },
});

userSchema.pre("save", function () {
  this.name = this.ferstname + " " + this.lastname;
 
});
const User = mongoose.model("User", userSchema);

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  expirdate: Date,
  category: { type: String, enum: ["food", "electronics", "clothing"] },
criatdate:{type:Date,default:Date.now()}
});
const Product = mongoose.model("Product", productSchema);
const orderSchema = new mongoose.Schema({
  user:   
   {type:mongoose.Types.ObjectId,ref:"User"},
  product:{type:mongoose.Types.ObjectId,ref:"Product"},
  totalprice:Number,
  orderdate:{type:Date,default:Date.now()}
});

const Order = mongoose.model("Order", orderSchema);


module.exports = { User, Product, Order };


