import statusCode  from "../constants/statusCode";
export const checkRole = (requiredRole) => {
    return (req, res, next) => {
        try {
            const user = req.user; // Giả định req.user đã được gắn thông tin user từ middleware xác thực trước đó

            if (!user) {
                return res.status(401).json({
                    status: statusCode.ERROR,
                    message: "Unauthorized. User not found."
                });
            }

            if (user.role !== requiredRole) {
                return res.status(403).json({
                    status: statusCode.ERROR,
                    message: "Forbidden. You do not have the required role."
                });
            }

            next();
        } catch (error) {
            console.error("Error in checkRole middleware:", error);
            res.status(500).json({
                status: statusCode.ERROR,
                message: "Internal server error."
            });
        }
    };
};