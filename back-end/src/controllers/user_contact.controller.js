import {
    createNewContactService,
    getAllContactsService,
} from "../services/user_contact.service.js";
import statusCode from "../constants/statusCode.js";

// Controller for creating a new contact
export const createNewContactController = async (req, res) => {
    try {
        const { user_id, account_number, nickname, bank_id, bank_name } = req.body;
        const newContact = await createNewContactService({
            user_id,
            account_number,
            nickname,
            bank_id,
            bank_name,
        });

        res.status(201).json({ status: statusCode.SUCCESS, data: newContact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: statusCode.ERROR, message: "Internal server error" });
    }
};

// Controller for getting all contacts
export const getAllContactsController = async (req, res) => {
    try {
        const userId = req.user.id;
        const contacts = await getAllContactsService(userId);
        res.status(200).json({ status: statusCode.SUCCESS, data: contacts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: statusCode.ERROR, message: "Internal server error" });
    }
};