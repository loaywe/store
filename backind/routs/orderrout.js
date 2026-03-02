const express = require('express');

const ordersrouter = express.Router();
const { User, Product, Order } = require("../module/user");


// fetch all users
ordersrouter.get("/", async (req, res) => {
  try {

    const orders = await Order.aggregate([

      // جلب بيانات المستخدم
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userInfo"
        }
      },

      // جلب بيانات المنتج
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productInfo"
        }
      },

      // تشكيل الشكل النهائي
      {
        $project: {
          _id: 1,
          totalprice: 1,
          orderdate: 1,
          __v: 1,

          address: {
            $arrayElemAt: ["$userInfo.address", 0]
          },

          email: {
            $arrayElemAt: ["$userInfo.email", 0]
          },

          age: {
            $arrayElemAt: ["$userInfo.age", 0]
          },

          gender: {
            $arrayElemAt: ["$userInfo.gender", 0]
          },

          name: {
            $arrayElemAt: ["$userInfo.name", 0]
          },

          category: {
            $arrayElemAt: ["$productInfo.category", 0]
          },
          productName: {
  $arrayElemAt: ["$productInfo.name", 0]
}

        }
      }

    ]);

    res.status(200).json({ orders });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

ordersrouter.post("/addorder", async (req, res) => {
  try {
    console.log(req.body);
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "Order added successfully", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// update an existing order by id
ordersrouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Order.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order updated", order: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete an order (or user?) by id
ordersrouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Order.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted", order: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// جلب طلبية واحدة مع تفاصيل المستخدم والمنتج (populate)
ordersrouter.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user')
      .populate('product');
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






module.exports = ordersrouter;