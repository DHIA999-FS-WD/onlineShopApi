const cors = require("cors");
require("dotenv").config();
const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/connectDB");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
//middlewares
app.use(express.json());
app.use(
  cors({
    // origin: ["http://localhost:5173"],
    // methods: ["POST", "GET", "DELETE", "PUT"],
    // credentials: true,
  })
);
const PORT = process.env.PORT || 4000;
connectDB();
//routes
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);

app.listen(PORT, (err) => {
  err ? console.log("err", err) : console.log(`server run on port ${PORT}`);
});
