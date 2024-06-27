const express = require("express");
const router = express.Router();

// posts
// Index route
router.get("/" ,(req,res) =>{
    res.send("Hi i am posts");
})

// show route
router.get("/:id", (req,res) =>{
    res.send(" Show specificposts id");
})

// Post route
router.post("/", (req,res) =>{
    res.send(" Post new posts");
})

// delete
router.delete("/:id", (req,res) =>{
    res.send("delete posts");
})

module.exports = router;