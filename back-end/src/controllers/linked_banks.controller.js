import { getAllLinkedBanksService, createLinkedBankService } from "../services/linked_banks.service.js";
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


export const createLinkedBankController = async (req, res) => {
    try {
        const {
            bank_code,
            bank_name,
            public_key,
            secret_key,
            encryption_type,
            account_info_api_url,
            deposit_api_url,
        } = req.body;

        // Validate input
        if (
            !bank_code ||
            !bank_name ||
            !public_key ||
            !secret_key ||
            !encryption_type ||
            !account_info_api_url ||
            !deposit_api_url
        ) {
            return res.status(400).json({ status: statusCode.ERROR, message: "All fields are required" });
        }

        const newLinkedBank = await createLinkedBankService({
            bank_code,
            bank_name,
            public_key,
            secret_key,
            encryption_type,
            account_info_api_url,
            deposit_api_url,
        });

        res.status(201).json({ status: statusCode.SUCCESS, data: newLinkedBank });
    } catch (error) {
        console.error("Error in createLinkedBankController:", error);
        if (error.message === "A bank with this bank_code already exists") {
            return res.status(409).json({ status: statusCode.ERROR, message: error.message });
        }
        res.status(500).json({ status: statusCode.ERROR, message: "Failed to create linked bank" });
    }
};