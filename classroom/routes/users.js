
const express = require("express");
const router = express.Router();

// Users
// Index route

router.get("/" ,(req,res) =>{
    res.send("Hi i am user");
})

// show route
router.get("/:id", (req,res) =>{
    res.send(" Show specific user id");
})

// Post route
router.post("/", (req,res) =>{
    res.send(" Post new user");
})

// delete
router.delete("/:id", (req,res) =>{
    res.send("delete user");
})

module.exports = router;