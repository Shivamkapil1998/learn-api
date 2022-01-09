const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/auth.routes");
const morgan = require("morgan");
const { route } = require("./routes/auth.routes");
const config = require("./config.js");
const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
app.use(morgan("dev"));
app.use("/api", router);

const PORT = config.port || 8000;
console.log(PORT);
const URL =
  "mongodb://shivamkapil1998:assignment1998@cluster0-shard-00-00.amtuz.mongodb.net:27017,cluster0-shard-00-01.amtuz.mongodb.net:27017,cluster0-shard-00-02.amtuz.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-4h96rq-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose
  .connect(config.mongoUrl || URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
    console.log("mongodb is connected");
  })
  .catch((error) => {
    console.log("Error:", error.message);
  });
