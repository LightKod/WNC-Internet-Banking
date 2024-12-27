import db from "../models/index.model.js";

const { LinkedBanks } = db;


export const getAllLinkedBanksService = async () => {
    try {
        const linkedBanks = await LinkedBanks.findAll({
            attributes: ['id', 'bank_code', 'bank_name'],
        });
        return linkedBanks;
    } catch (error) {
        console.error("Error fetching linked banks:", error);
        throw new Error("Failed to fetch linked banks");
    }
};


export const createLinkedBankService = async (linkedBankData) => {
    const { bank_code, bank_name, public_key, secret_key, encryption_type, account_info_api_url, deposit_api_url } = linkedBankData;

    const existingBank = await LinkedBanks.findOne({ where: { bank_code } });
    if (existingBank) {
        throw new Error("A bank with this bank_code already exists");
    }

    const newLinkedBank = await LinkedBanks.create({
        bank_code,
        bank_name,
        public_key,
        secret_key,
        encryption_type,
        account_info_api_url,
        deposit_api_url,
    });

    return newLinkedBank;
};