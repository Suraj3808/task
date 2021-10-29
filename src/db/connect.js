const mongoose = require("mongoose");

// database
mongoose.connect("mongodb://localhost:27017/addbook").then(() => {
    console.log("connected successfuly...")
}
).catch((err) => {
    console.log(err)
});
