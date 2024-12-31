// routes/userContact.routes.js
import express from "express";
import {
    createNewContactController,
    getAllContactsController,
    deleteContactController,
    checkContactExistsController,
    getUserContactsByTypeController,
    updateContactController
} from "../controllers/user_contact.controller.js";

const router = express.Router();

// Routes
router.post("/", createNewContactController);
router.get("/", getAllContactsController);
router.delete("/:contactId", deleteContactController);
router.post("/check-existence", checkContactExistsController);
router.get('/contacts', getUserContactsByTypeController); // Lấy danh bạ theo loại (internal/external)
router.put("/:contactId", updateContactController);

export default router;