require("dotenv").config();
var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  dotenv = require("dotenv"),
  mongoose = require("mongoose"),
  flash = require("connect-flash"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override"),
  moment = require("moment"),
  University = require("./models/university"),
  Comment = require("./models/comment"),
  User = require("./models/user"),
  seedDB = require("./seeds"),
  universityRoutes = require("./routes/universities"),
  commentRoutes = require("./routes/comments"),
  indexRoutes = require("./routes/index");

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const {
  parsed: { MONGODB_URI }
} = dotenv.config();
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.locals.moment = require("moment");
app.use(flash());
// seedDB();

//PASSPORT CONFIGURATION
app.use(
  require("express-session")({
    secret: "The Unicornsity is the secret.",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//DEFINE USER OR NOT
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.use(indexRoutes);
app.use("/universities", universityRoutes);
app.use("/universities/:id/comments", commentRoutes);

const PORT = process.env.PORT || 5000;
const IP = process.env.IP || "localhost";
app.listen(PORT, IP, function () {
  console.log(`The server has started on: ${IP}:${PORT}`);
});
