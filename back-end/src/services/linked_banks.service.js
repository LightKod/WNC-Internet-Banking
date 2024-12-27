import db from "../models/index.model.js";

const { LinkedBanks } = db;


export const getAllLinkedBanksService = async () => {
    try {
        const linkedBanks = await LinkedBanks.findAll({
            attributes: ['id', 'bank_code', 'bank_name', 'encryption_type', 'api_base_url'],
        });
        return linkedBanks;
    } catch (error) {
        console.error("Error fetching linked banks:", error);
        throw new Error("Failed to fetch linked banks");
    }
};
