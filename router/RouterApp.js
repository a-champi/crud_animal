const express = require("express");

const router = express.Router();



/**
 * @res.render to load up an ejs views file 
 * 
 */

//about index page
router.get("/", (req, res) => {
    res.render( "index", 
    {title: "Hallo, Im come from main(index)"} );
});

//about service
router.get("/service", (req, res) => {
    res.render("service", 
    {
        title : "I comme from router and Im for your service"
    })
})

module.exports = router;
