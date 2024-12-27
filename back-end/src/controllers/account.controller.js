import {getBankAccountByAccountNumber, getAccountsByUserIdService, getPaymentAccountsByUserIdService, getUserDataByAccountNumberService } from "../services/account.service.js";
import statusCode from "../constants/statusCode.js";

export const getAccountsByUserIdController = async (req, res) => {
    const userId = req.user.id;

    try {
        const accounts = await getAccountsByUserIdService(userId);
        if (accounts.length === 0) {
            return res.status(404).json({ status: statusCode.ERROR, message: "No accounts found for this user." });
        }
        return res.status(200).json({
            status: statusCode.SUCCESS,
            data: { accounts },
        });

    }
    catch (error) {
        console.error("Error fetching accounts:", error);
        return res.status(500).json({ status: statusCode.ERROR, message: "Internal server error." });
    }
}

export const getPaymentAccountsByUserIdController = async (req, res) => {
    const userId = req.user.id;

    try {
        const account = await getPaymentAccountsByUserIdService(userId);
        if (!account) {
            return res.status(404).json({ message: "No payment account found for this user." });
        }
        return res.status(200).json({
            status: statusCode.SUCCESS,
            data: { account },
        });
    } catch (error) {
        console.error("Error fetching payment account:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};



export const getUserDataByAccountNumberController = async (req, res) => {
    try {
        const { accountNumber } = req.params;
        const accountData = await getUserDataByAccountNumberService(accountNumber);

        if (!accountData) {
            return res.status(404).json({ status: statusCode.ERROR, message: "Account not found" });
        }

        res.status(200).json({ status: statusCode.SUCCESS, data: accountData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const getBankAccountByAccountNumberController = async (req, res) => {
    try {
      const {  bank_code, account_number } = req.body;
      const bankAccountData = await getBankAccountByAccountNumber(bank_code,account_number);
  
      if (!bankAccountData) {
        return res.status(200).json({ status: statusCode.ERROR, message: "Bank account not found" });
      }
  
      res.status(200).json({ status: statusCode.SUCCESS, data: bankAccountData });
    } catch (error) {
      console.error("Error in getBankAccountByAccountNumberController:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };