import BankATransferTemplate from "./BankA.js";

const getExternalTransferTemplateByBankCode = (bank_code) => {
    if (bank_code === "RSA") {
        return new BankATransferTemplate();
    }
}

export default getExternalTransferTemplateByBankCode;