
export default class ExternalTransferTemplate {
    constructor() {
        if (new.target === ExternalTransfer) {
            throw new Error("Cannot instantiate an abstract class directly.");
        }
    }

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

