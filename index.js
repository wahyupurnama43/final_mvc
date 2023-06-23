const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const flashs = require("connect-flash");
const cookieParser = require("cookie-parser");
const toastr = require("express-toastr");
const passport = require("./lib/passport");
const session = require("express-session");
const flash = require("express-flash");

// init express
const route = require("./routers");
const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
    }),
);
app.use(flash());
app.use(flashs());
app.use(toastr());
app.use(cookieParser("secret"));
app.use(function (req, res, next) {
    res.locals.toasts = req.toastr.render();
    next();
});

app.use(passport.initialize());
app.use(passport.session());
app.use(route);

app.listen(3000, () => {
    console.log("Running on http://localhost:3000");
});
