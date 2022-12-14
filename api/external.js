const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("This is an external api");
})

module.exports = router;