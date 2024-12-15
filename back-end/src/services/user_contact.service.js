import db from "../models/index.model.js";
const { UserContact } = db;

// Service for creating a new contact
export const createNewContactService = async (contactData) => {
    const newContact = await UserContact.create(contactData);
    return newContact;
};

// Service for getting all contacts
export const getAllContactsService = async (userId) => {
    const contacts = await UserContact.findAll({
        where: { user_id: userId },
    });
    return contacts;
};
