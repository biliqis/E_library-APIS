/**
 * This provides the view for the search
 */

const router = require("express").Router()

router.get("/", (req, res) => {
    return res.status(200).json({message:"welcome to e-library!"})
    // res.render("home", {name:"name"});
})


module.exports = router;