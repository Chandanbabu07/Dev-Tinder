const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouters = require("./routes/authRouters");
const profileRouters = require("./routes/profileRouters");
const connectionRouters = require("./routes/connectionRouters");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouters);
app.use("/user", profileRouters);
app.use("/connection", connectionRouters);

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(1800, () => {
      console.log("Server listening successfully on 1800 !!! ");
    });
  })
  .catch((error) => {
    console.error("Not Connected" + error.message);
  });
