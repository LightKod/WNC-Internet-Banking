import { getUserDetails } from "../services/user.service.js";
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
