const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const {errorHandler} = require("./middleware/errorMiddleware");

mongoose
  .connect(
    "mongodb+srv://muzammilkt:27623264@cluster0.cupgu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("mongoDb successfully connected"))
  .catch((err) => console.error(err));
const app = express();

app.use(cors());
app.use(express.json())
app.listen(5001 , ()=> console.log(`server running at the port 5001`))
app.use(errorHandler);

app.use("/api/product",require("./routes/productRoute"))

