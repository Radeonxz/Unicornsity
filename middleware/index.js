var University         = require("../models/university"),
    Comment            = require("../models/comment"),
    middlewareOgj      = {};

//CHECK UNIOVERSITIES OWNERSHIP MIDDLEWARE
middlewareOgj.checkUniversityOwnership = function(req, res, next){
    //if user logged in
    if(req.isAuthenticated()){
        University.findById(req.params.id, function(err, foundUniversity){
            if(err){
                req.flash("error", "University not found.");
                res.redirect("back");
            } else{
                //does user own the university
                if(foundUniversity.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                } else{
                    req.flash("error", "Only the owner who submitted this post can do that.");
                    //if user doesnt own the university also redirect
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to login first to do that.");
        //if not logged in then redirect
        res.redirect("back");
    } 
}


//CHECK COMMENTS OWNERSHIP MIDDLEWARE
middlewareOgj.checkCommentOwnership = function(req, res, next){
    //if user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else{
                //does user own the comment
                if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                } else{
                    req.flash("error", "Only the owner who submitted this comment can do that.");
                    //if user doesnt own the comment also redirect
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to login first to do that.");
        //if not logged in then redirect
        res.redirect("back");
    } 
}


//MIDDLEWARE CHECK LOGIN STATUS
middlewareOgj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to login first to do that.");
    res.redirect("/login");
}


module.exports = middlewareOgj;