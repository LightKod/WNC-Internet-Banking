import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import 'dotenv/config'

import db from "./src/models/index.model.js";
import authRouter from "./src/routes/auth.route.js";
const maxRetries = 5;
const retryDelay = 5000;

//dùng jwt
import passport from "./src/config/passport.js";
const protectRoute = passport.authenticate('jwt', { session: false });

async function syncDatabase(retries) {
  try {
    await db.sequelize.sync();
    console.log("Database synced");
  } catch (err) {
    if (retries > 0) {
      console.error(
        `Failed to sync database. Retrying in ${retryDelay / 1000} seconds...`
      );
      setTimeout(() => syncDatabase(retries - 1), retryDelay);
    } else {
      console.error(
        "Failed to sync database after multiple attempts:",
        err.message
      );
      process.exit(1);
    }
  }
}

syncDatabase(maxRetries);

var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api/auth", authRouter);
var port = 80;

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
export default app;
