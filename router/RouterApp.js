const express = require("express");

const app = express();
const router = express.Router();



/** 
 * jetzt benutzen wir den router() von Router
 * use := signat von router
 */


router.get("/", (req, res) => {
    res.render( "index", 
    {title: "Hallo router from Router()"} );
});

router.get("/service", (req, res) => {
    res.render("service", 
    {
        titleService : "I comme from router, your service"
    })
})

module.exports = router;
