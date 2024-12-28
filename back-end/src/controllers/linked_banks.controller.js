import { getAllLinkedBanksService } from "../services/linked_banks.service.js";
import statusCode from "../constants/statusCode.js";

// Controller to get all linked banks
export const getAllLinkedBanksController = async (req, res) => {
    try {
        const linkedBanks = await getAllLinkedBanksService();
        res.status(200).json({ status: statusCode.SUCCESS, data: linkedBanks });
    } catch (error) {
        console.error("Error in getAllLinkedBanksController:", error);
        res.status(500).json({ status: statusCode.ERROR, message: "Failed to fetch linked banks" });
    }
};