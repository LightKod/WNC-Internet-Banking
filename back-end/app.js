import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import 'dotenv/config'

import db from "./src/models/index.model.js";
import authRouter from "./src/routes/auth.route.js";
import transferRouter from "./src/routes/transfer.route.js"
import debtRouter from "./src/routes/debt.route.js"
import accountRouter from "./src/routes/account.route.js"
import userRouter from "./src/routes/user.route.js"
import userContactRouter from "./src/routes/user_contact.route.js";
import transactionRouter from "./src/routes/transaction.route.js"
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
app.use("/api/transfer", transferRouter);
app.use("/api/debt", protectRoute, debtRouter);
app.use("/api/account", protectRoute, accountRouter);
app.use("/api/user", protectRoute, userRouter);
app.use("/api/user-contacts", protectRoute, userContactRouter);
app.use("/api/transaction", protectRoute, transactionRouter);
app.use('/api/check-role', protectRoute, (req, res) => {
  res.status(200).json({ role: req.user.role });
});
var port = 80;

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
export default app;
