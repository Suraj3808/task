const jwt = require("jsonwebtoken");
const User = require("../src/models/userSchema");


const Authenticate = async (req, res, next) => {

    try {

        const token = req.cookies.jwttoken;
        const verifyToken = jwt.verify(token, "addressbookisfamousworthyandsecure");

        const rootUser = await User.findOne({ _id});

        if (!rootUser) {
            throw new Error("User Not Found");
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();

    } catch (err) {
        res.status(401).send("Unauthorized: No Token Provided");
        console.log(err);
    }

}

module.exports = Authenticate;