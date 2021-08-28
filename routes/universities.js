var express = require("express"),
	University = require("../models/university"),
	middleware = require("../middleware/index"),
	router = express.Router(),
	NodeGeocoder = require("node-geocoder");

var options = {
	provider: "google",
	httpAdapter: "https",
	apiKey: process.env.GEOCODER_API_KEY,
	formatter: null,
};

var geocoder = NodeGeocoder(options);

//INDEX - show all universities
router.get("/", function (req, res) {
	//Get all Universities from DB
	University.find({}, function (err, allUniversities) {
		if (err) {
			console.log(err);
		} else {
			res.render("universities/index", {
				universities: allUniversities,
				currentUser: req.user,
				page: "universities",
			});
		}
	});
});

//CREATE - add new university to DB
router.post("/", middleware.isLoggedIn, function (req, res) {
	//get data from form and add to universities array
	var name = req.body.name;
	var tuition = req.body.tuition;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username,
	};
	geocoder.geocode(req.body.location, function (err, data) {
		if (err || !data.length) {
			console.log("err: ", err);
			req.flash("error", "Invalid address");
			return res.redirect("back");
		}
		var lat = data[0].latitude;
		var lng = data[0].longitude;
		var location = data[0].formattedAddress;

		var newUniversity = {
			name: name,
			tuition: tuition,
			image: image,
			description: desc,
			author: author,
			location: location,
			lat: lat,
			lng: lng,
		};
		//Create a new university and save to DB
		University.create(newUniversity, function (err, newlyCreated) {
			if (err) {
				console.log(err);
			} else {
				//redirect back to universities page
				res.redirect("/universities");
			}
		});
	});
});

//NEW - show form to create new university
router.get("/new", middleware.isLoggedIn, function (req, res) {
	res.render("universities/new");
});

//SHOW - show more info about one university
router.get("/:id", function (req, res) {
	//find the university with provided ID
	University.findById(req.params.id)
		.populate("comments")
		.exec(function (err, foundUniversity) {
			if (err) {
				console.log(err);
			} else {
				//render show template with that university
				res.render("universities/show", { university: foundUniversity });
			}
		});
});

//EDIT - edit
router.get(
	"/:id/edit",
	middleware.checkUniversityOwnership,
	function (req, res) {
		University.findById(req.params.id, function (err, foundUniversity) {
			res.render("universities/edit", { university: foundUniversity });
		});
	}
);

//UPDATE - update
router.put("/:id", middleware.checkUniversityOwnership, function (req, res) {
	geocoder.geocode(req.body.location, function (err, data) {
		if (err || !data.length) {
			req.flash("error", "Invalid address");
			return res.redirect("back");
		}
		req.body.university.lat = data[0].latitude;
		req.body.university.lng = data[0].longitude;
		req.body.university.location = data[0].formattedAddress;

		//find and update the correct university
		University.findByIdAndUpdate(
			req.params.id,
			req.body.university,
			function (err, updatedUniversity) {
				if (err) {
					req.flash("error", err.message);
					res.redirect("back");
				} else {
					req.flash("success", "Successfully updated university post.");
					//redirect to show page
					res.redirect("/universities/" + req.params.id);
				}
			}
		);
	});
});

//DESTORY ROUTE
router.delete("/:id", middleware.checkUniversityOwnership, function (req, res) {
	University.findByIdAndRemove(req.params.id, function (err) {
		if (err) {
			res.redirect("/universities");
		} else {
			req.flash("success", "Successfully deleted university post.");
			return res.redirect("/universities");
		}
	});
});

module.exports = router;
