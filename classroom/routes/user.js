const express = require("express");
const router = express.Router();



// INDEX - user
router.get("/",(req,res)=>{
    res.send("GET route for user");
});

// SHOW - user
router.get("/:id",(req,res) => {
    res.send("Get User for id");
});

//  POST - user
router.post("/",(req,res) => {
    res.send("POST for user");
});

// DELETE - user
router.delete("/:id",(req,res)=>{
    res.send("DELETE for user id ");
})


module.exports = router;
