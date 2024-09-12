const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDb = require("./Config/db");
const contactRoutes = require("./routes/contact")
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

connectDb();

app.get("/", (req, res) => {
  res.send("Here is  backend");
});

app.use("/api/contact",contactRoutes)

app.use(
  "/Image",
  express.static(path.join(__dirname, "Image"))
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
