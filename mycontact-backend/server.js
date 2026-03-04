const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
const { dbConnect } = require("./config/dbConnection");
const app = express();
const dotenv = require("dotenv").config();

const port = process.env.PORT || 5000
dbConnect();
app.use(
  cors({
    origin: "http://localhost:5173"
  })
);
app.use(express.json())
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
});