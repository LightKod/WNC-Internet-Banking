import TransferTemplate from './TransferTemplate';

export default class BankATransferTemplate extends TransferTemplate {
    getValidateHash(payload) {
        throw new Error("Abstract method 'getValidateHash' must be implemented in the subclass.");
    }

    getValidateSignature(payload) {
        throw new Error("Abstract method 'getValidateSignature' must be implemented in the subclass.");
    }

    getUserAccountBody(payload) {
        throw new Error("Abstract method 'getTransferInitateBodyRespon' must be implemented in the subclass.");
    }

    getTransferDepositBody(payload) {
        throw new Error("Abstract method 'getTransferDepositBody' must be implemented in the subclass.");
    }
}