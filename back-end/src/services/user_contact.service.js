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


export const checkContactExistsService = async (accountNumber, bankId, userId) => {
  const existingContact = await UserContact.findOne({
    where: {
      account_number: accountNumber,
      bank_id: bankId,
      user_id: userId,
    },
  });

  return existingContact !== null; // Returns true if a contact exists, false otherwise
};
export const getUserContactsByTypeService = async (type, currentBank) => {
  try {
    let condition;
    if (type === 'internal') {
      condition = { bank_id: currentBank }; // Nếu là internal, lấy danh bạ với ngân hàng hiện tại
    } else if (type === 'external') {
      condition = { bank_id: { [Op.ne]: currentBank } }; // Nếu là external, lấy danh bạ với ngân hàng khác
    } else {
      throw new Error('Invalid type');
    }

    const contacts = await UserContact.findAll({
      where: condition,
    });

    return contacts;
  } catch (error) {
    console.error("Error in getUserContactsByTypeService:", error);
    throw error;
  }
};


export const updateContactService = async (contactId, userId, updateData) => {
  try {
    // Find the contact by ID and user ID
    const contact = await UserContact.findOne({
      where: {
        id: contactId,
        user_id: userId
      }
    });

    if (!contact) {
      throw new Error("Contact not found or you are not authorized to update this contact");
    }

    // Update the contact with the new data
    const updatedContact = await contact.update(updateData);

    return updatedContact;
  } catch (error) {
    console.error("Error in updateContactService:", error);
    throw error;
  }
};