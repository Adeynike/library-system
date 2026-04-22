const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/authors", require("./routes/authorRoutes"));
app.use("/books", require("./routes/bookRoutes"));
app.use("/students", require("./routes/studentRoutes"));
app.use("/attendants", require("./routes/attendantRoutes"));

app.get("/", (req, res) => {
  res.send("Library API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});