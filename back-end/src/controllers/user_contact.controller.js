import {
    createNewContactService,
    getAllContactsService,
    deleteContactService,
    checkContactExistsService,
    getUserContactsByTypeService,
    updateContactService
} from "../services/user_contact.service.js";
import statusCode from "../constants/statusCode.js";

// Controller for creating a new contact
export const createNewContactController = async (req, res) => {
    try {
        const userId = req.user.id;
        let { account_number, nickname, bank_id, bank_name } = req.body;
        if (!bank_id) bank_id = "";
        if (!bank_name) bank_name = "";
        const newContact = await createNewContactService({
            user_id: userId,
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

export const deleteContactController = async (req, res) => {
    try {
        const userId = req.user.id;
        const { contactId } = req.params;

        if (!contactId) {
            return res
                .status(400)
                .json({ status: statusCode.ERROR, message: "Contact ID is required" });
        }

        const result = await deleteContactService(contactId, userId);
        res.status(200).json({ status: statusCode.SUCCESS, message: result.message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: statusCode.ERROR, message: "Delete failed" });
    }
};

export const checkContactExistsController = async (req, res) => {
    try {
        const userId = req.user.id; // Authenticated user's ID
        const { account_number, bank_id } = req.body;

        if (!account_number) {
            return res.status(400).json({ status: statusCode.ERROR, message: "Account number is required" });
        }

        const contactExists = await checkContactExistsService(account_number, bank_id, userId);

        if (contactExists) {
            return res.status(200).json({ status: statusCode.SUCCESS, data: true, message: "Contact exists" });
        }

        return res.status(200).json({ status: statusCode.SUCCESS, data: false, message: "Contact does not exist" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: statusCode.ERROR, message: "Internal server error" });
    }
};

export const getUserContactsByTypeController = async (req, res) => {
    const { type } = req.query; // `type` là loại danh bạ, `currentBank` là ngân hàng hiện tại
    const currentBank = process.env.BANK_ID;
    try {
        const contacts = await getUserContactsByTypeService(type, currentBank);
        return res.status(200).json({ status: statusCode.SUCCESS, data: contacts });
    } catch (error) {
        console.error("Error in getUserContactsByTypeController:", error);
        return res.status(500).json({ status: statusCode.ERROR, message: 'Internal server error' });
    }
};

export const updateContactController = async (req, res) => {
    const { contactId } = req.params;
    const userId = req.user.id;
    const updateData = req.body;

    try {
        const updatedContact = await updateContactService(contactId, userId, updateData);
        res.status(200).json({
            status: statusCode.SUCCESS,
            message: "Contact updated successfully",
            data: updatedContact,
        });
    } catch (error) {
        res.status(400).json({
            status: statusCode.ERROR,
            message: error.message
        });
    }
};