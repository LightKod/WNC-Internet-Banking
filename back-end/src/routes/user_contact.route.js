// routes/userContact.routes.js
import express from "express";
import {
    createNewContactController,
    getAllContactsController,
    deleteContactController,
} from "../controllers/user_contact.controller.js";

const router = express.Router();

// Routes
router.post("/", createNewContactController);
router.get("/", getAllContactsController);
router.delete("/:contactId", deleteContactController);

export default router;