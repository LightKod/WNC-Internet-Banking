import express from "express";
import { getAllLinkedBanksController, createLinkedBankController } from "../controllers/linked_banks.controller.js";

const router = express.Router();

router.get("/", getAllLinkedBanksController);
router.post("/", createLinkedBankController);

export default router;
