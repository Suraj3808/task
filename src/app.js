const express = require("express");
require("./db/connect");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const authenticate = require("../middleware/authenticate");
const User = require("./models/userSchema");

const app = express();
const path = require("path");
const hbs = require("hbs")
const { registerPartials } = ("hbs");
const PORT = process.env.PORT || 3000;

const staticPath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

// to get data in json format on browser tab
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// public statis path
app.use(express.static(staticPath));

app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);


// middleware
const middleware = (req, res, next) => {
    console.log("hello middleware");
    next();
}


// routing
app.get("/", (req, res) => {
    res.render("index");
})

app.get("/user", middleware, (req, res) => {
    res.render("user");
})


//Login Routes

app.post('/', async (req, res) => {
    // console.log(req.body);
    // res.json({ message: "awesome" });

    try {
        let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please Fill All the Details " });
        }
        const userLogin = await User.findOne({ email: email });

        //Generate Token
        token = await userLogin.generateAuthToken();
        console.log(token);

        //store token in cookies
        res.cookie("jwttoken", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true

        });

        // if (userLogin) {
        //     const isMatch = await bcrypt.compare(password, userLogin.password);

        //     if (!isMatch) {
        //         res.status(400).json({ error: "invalid Credientials" });
        //     } else {
        //         res.json({ message: "User Signin Successfully" });
        //     }
        // } else {
        //     res.status(400).json({ error: "Invalid Credientials" });
        // }



    } catch (err) {
        console.log(err);
    }

});



app.post("/user",async (req, res) => {

    try {

        const userData = new User(req.body);

        await userData.save();

        res.status(201).render("user");
    } catch (error) {
        res.status(500).send(error);
    }
})

// logout Page

app.get('/logout', (req, res) => {
    console.log(`hello about  logout page`);
    res.clearCookie("jwttoken", { path: "/" });
    res.status(200).render("index");

});

app.get("*", (req, res) => {
    res.send("404 oppss!!! page not found!!");
})


app.listen(PORT, (req, res) => {
    console.log(`server is running on port no ${PORT}`);
})