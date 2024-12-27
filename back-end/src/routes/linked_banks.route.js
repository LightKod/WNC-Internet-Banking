import express from "express";
import { getAllLinkedBanksController } from "../controllers/linked_banks.controller.js";

const router = express.Router();

router.get("/", getAllLinkedBanksController);

export default router;
