import {changePassword,banUnbanEmployee,unassignEmployee,assignEmployee, listEmployees, getUserDetails } from "../services/user.service.js";
import statusCode from "../constants/statusCode.js";
export const getUserDetailController = async (req, res) => {
    const { id } = req.user;

    try {
        const user = await getUserDetails(id);

        if (user) {
            res.status(200).json({
                status: statusCode.SUCCESS,
                data: { user }
            });
        } else {
            res.status(404).json({
                status: statusCode.ERROR,
                message: "User not found"
            });
        }
    } catch (error) {
        console.error("Error in getUserController:", error);
        res.status(500).json({
            status: statusCode.ERROR,
            message: "Internal server error"
        });
    }
};
export const listEmployeesController = async (req, res) => {
    const { page = 1, limit = 10, search = "" } = req.query;

    try {
        const employees = await listEmployees({ page, limit, search });
        res.status(200).json({
            status: statusCode.SUCCESS,
            data: employees,
        });
    } catch (error) {
        console.error("Error in listEmployeesController:", error);
        res.status(500).json({
            status: statusCode.ERROR,
            message: "Internal server error",
        });
    }
};
export const assignEmployeeController = async (req, res) => {
    const { username } = req.body;

    try {
        const user = await assignEmployee(username);
        if (user) {
            res.status(200).json({
                status: statusCode.SUCCESS,
                message: "User assigned as employee successfully",
            });
        } else {
            res.status(404).json({
                status: statusCode.ERROR,
                message: "User not found",
            });
        }
    } catch (error) {
        console.error("Error in assignEmployeeController:", error);
        res.status(500).json({
            status: statusCode.ERROR,
            message: "Internal server error",
        });
    }
};
export const unassignEmployeeController = async (req, res) => {
    const { employeeId } = req.body;

    try {
        const user = await unassignEmployee(employeeId);
        if (user) {
            res.status(200).json({
                status: statusCode.SUCCESS,
                message: "Employee unassigned successfully",
            });
        } else {
            res.status(404).json({
                status: statusCode.ERROR,
                message: "Employee not found",
            });
        }
    } catch (error) {
        console.error("Error in unassignEmployeeController:", error);
        res.status(500).json({
            status: statusCode.ERROR,
            message: "Internal server error",
        });
    }
};
export const banUnbanEmployeeController = async (req, res) => {
    const { employeeId, action } = req.body;

    try {
        const user = await banUnbanEmployee(employeeId, action);
        if (user) {
            res.status(200).json({
                status: statusCode.SUCCESS,
                message: `Employee ${action === "ban" ? "banned" : "unbanned"} successfully`,
            });
        } else {
            res.status(404).json({
                status: statusCode.ERROR,
                message: "Employee not found",
            });
        }
    } catch (error) {
        console.error("Error in banUnbanEmployeeController:", error);
        res.status(500).json({
            status: statusCode.ERROR,
            message: "Internal server error",
        });
    }
};
export const changePasswordController = async (req, res) => {
    const { id } = req.user;
    const { oldPassword, newPassword } = req.body;

    try {
        const result = await changePassword(id, oldPassword, newPassword);

        if (result) {
            res.status(200).json({
                status: statusCode.SUCCESS,
                message: "Password changed successfully",
            });
        } else {
            res.status(400).json({
                status: statusCode.ERROR,
                message: "Old password is incorrect",
            });
        }
    } catch (error) {
        console.error("Error in changePasswordController:", error);
        res.status(500).json({
            status: statusCode.ERROR,
            message: "Internal server error",
        });
    }
};
