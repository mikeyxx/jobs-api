require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();

// error handlers
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

// Database
const connectDB = require("./db/connect");

app.use(cors());
app.use(express.json());

// Routes
const authRouter = require("./routes/user");
const jobRouter = require("./routes/jobs");

// Authenticated user
const authenticatedUser = require("./middleware/authentication");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticatedUser, jobRouter);

app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
