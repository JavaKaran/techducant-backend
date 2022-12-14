const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./api/auth");
const userRoute = require("./api/users");
const postRoute = require("./api/posts");
const categoryRoute = require("./api/categories");
const externalRoute = require("./api/external");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const app = express();

dotenv.config();
app.use(express.json());

const corsOptions ={
    origin:'https://tech-ducant-frontend.vercel.app', 
    credentials:true,            
    optionSuccessStatus:200
}

app.use(cors(corsOptions));
app.use("/images", express.static(path.join(__dirname, "./images")));

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log(`Backend is running on localhost:${process.env.PORT}`);
});

module.exports = app;