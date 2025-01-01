import BankATransferTemplate from "./BankA.js";

export default getExternalTransferTemplateByBankCode = (bank_code) => {
    if (bank_code === "001") {
        return new BankATransferTemplate();
    }
}