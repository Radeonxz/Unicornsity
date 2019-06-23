var express   = require("express"),
    passport  = require("passport"),
    User      = require("../models/user"),
    router    = express.Router();
 
//ROOT ROUTE
router.get("/", function(req, res){
    res.render("landing");
});


//SHOW REGISTER FORM
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//HANDLE SIGN UP LOGIC
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    
    if(req.body.adminCode === 'admincode970') {
        newUser.isAdmin = true;
    }
    
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            res.redirect("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Unicornsity " + user.username);
            res.redirect("/universities"); 
        });
    });
})

//SHOW LOGIN PAGE
router.get("/login", function(req, res) {
    res.render("login", {page: 'login'});
});

//HANDLE LOGIN LOGIC
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/universities",
        failureRedirecty: "/login"
    }), function(req, res){
});

//HANDLE LOGOUT LOGIC
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Successfully logged out.");
    res.redirect("/universities");
});


module.exports = router;