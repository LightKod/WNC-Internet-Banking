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
        attributes: { exclude: ['user_id'] }, // Exclude user_id from the returned fields
    });
    return contacts;
};

export const deleteContactService = async (contactId, userId) => {
    const contact = await UserContact.findOne({ where: { id: contactId } });
    if (!contact) {
        throw new Error("Contact not found");
    }

    if (contact.user_id !== userId) {
        throw new Error("You are not authorized to delete this contact");
    }
    await contact.destroy();
    return { message: "Contact deleted successfully" };
};
