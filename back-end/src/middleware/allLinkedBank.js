import BankATransferTemplate from "./BankA.js";

export const  getExternalTransferTemplateByBankCode = (bank_code) => {
    if (bank_code === "001") {
        return new BankATransferTemplate();
    }
}