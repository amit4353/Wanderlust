const express = require("express");
const router = express.Router();



// INDEX - posts
router.get("/",(req,res)=>{
    res.send("GET route for post");
});

// SHOW - post
router.get("/:id",(req,res) => {
    res.send("Get post for id");
});

//  POST - post
router.post("/",(req,res) => {
    res.send("POST for post");
});

// DELETE - post
router.delete("/:id",(req,res)=>{
    res.send("DELETE for post id ");
})


module.exports = router;
