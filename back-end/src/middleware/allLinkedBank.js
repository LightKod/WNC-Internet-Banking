import BankATransferTemplate from "./BankA.js";

const getExternalTransferTemplateByBankCode = (bank_code) => {
    if (bank_code === "001") {
        return new BankATransferTemplate();
    }
}

export default getExternalTransferTemplateByBankCode;