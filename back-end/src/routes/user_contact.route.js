// routes/userContact.routes.js
import express from "express";
import {
    createNewContactController,
    getAllContactsController,
    deleteContactController,
    checkContactExistsController,
    getUserContactsByTypeController
} from "../controllers/user_contact.controller.js";

const router = express.Router();

// Routes
router.post("/", createNewContactController);
router.get("/", getAllContactsController);
router.delete("/:contactId", deleteContactController);
router.post("/check-existence", checkContactExistsController);
router.get('/contacts', getUserContactsByTypeController); // Lấy danh bạ theo loại (internal/external)

export default router;