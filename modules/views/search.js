/**
 * This provides the view for the search
 */

const router = require("express").Router()

router.get("/", (req, res) => {
    res.render("home", {name:"name"});
})


module.exports = router;