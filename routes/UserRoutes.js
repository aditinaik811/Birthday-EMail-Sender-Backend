const express = require("express");
const User = require("../models/user");
const router = express.Router();

// Create a new user
router.post("/", async (req, res) => {
  try {
    const { name, email, birthday } = req.body;
    const user = new User({ name, email, birthday });
    await user.save();
    res.status(201).json({ message: "User saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});


router.delete("/delete/:id",(req,res)=>{
  User.findByIdAndDelete({_id:req.params.id})
  .then(result=>{
    res.status(200).json({
      deletedDetails : result
    })
  })
  .catch(err=>{
    console.log(err)
    res.status(500).json({
      error:err
    })
  })
})
module.exports = router;
