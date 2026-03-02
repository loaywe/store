const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const { User} = require("../module/user");


// fetch all users
router.get("/", async (req, res) => {
  try {

    const users = await User.find();

    res.status(200).json({users});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/adduser", async (req, res) => {
  try {
    
    console.log(req.body);
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User added successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// update a user by id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated", user: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete a user by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted", user: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// جلب مستخدم واحد
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;