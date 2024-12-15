import db from "../models/index.model.js";

const { User } = db;

// Function to get user details by userId
export const getUserDetails = async (userId) => {
    try {
        const user = await User.findOne({
            where: { id: userId },
            attributes: ['id', 'username', 'email', 'phone_number', 'created_at'],
        });

        return user ? user : null;
    } catch (error) {
        console.error("Error fetching user details:", error);
        return null;
    }
};
