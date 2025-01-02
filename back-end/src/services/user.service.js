import db from "../models/index.model.js";
import bcrypt from "bcrypt";
import { Op } from 'sequelize';

const { User } = db;

// Function to get user details by userId
export const getUserDetails = async (userId) => {
    try {
        const user = await User.findOne({
            where: { id: userId },
            attributes: ['id', 'username', "name", 'email', 'phone_number', 'created_at'],
        });

        return user ? user : null;
    } catch (error) {
        console.error("Error fetching user details:", error);
        return null;
    }
};
export const listEmployees = async ({ page, limit, search }) => {
    const offset = (page - 1) * limit;
    const whereClause = {
        role: "employee",
        ...(search && { name: { [Op.iLike]: `%${search}%` } }),
    };

    const employees = await User.findAndCountAll({
        where: whereClause,
        offset,
        limit: parseInt(limit),
        attributes: ["id", "username", "name", "email", "phone_number", "created_at", "status"],
    });

    return {
        data: employees.rows,
        total: employees.count,
        page: parseInt(page),
        limit: parseInt(limit),
    };
};
export const assignEmployee = async (username) => {
    const user = await User.findOne({ where: { username: username } });

    if (user) {
        user.role = "employee";
        await user.save();
        return user;
    }
    return null;
};
export const unassignEmployee = async (employeeId) => {
    const user = await User.findOne({ where: { id: employeeId, role: "employee" } });

    if (user) {
        user.role = "user";
        await user.save();
        return user;
    }
    return null;
};
export const banUnbanEmployee = async (employeeId, action) => {
    const user = await User.findOne({ where: { id: employeeId, role: "employee" } });

    if (user) {
        user.status = action === "ban" ? "banned" : "active";
        await user.save();
        return user;
    }
    return null;
};

export const changePassword = async (userId, oldPassword, newPassword) => {
    const user = await User.findOne({ where: { id: userId } });

    if (user && bcrypt.compareSync(oldPassword, user.password)) {
        user.password = bcrypt.hashSync(newPassword, 10);
        await user.save();
        return true;
    }
    return false;
};
