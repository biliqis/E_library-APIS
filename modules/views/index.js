const router = require("express").Router();
const search = require("./search");

router.use(search);

module.exports = router;