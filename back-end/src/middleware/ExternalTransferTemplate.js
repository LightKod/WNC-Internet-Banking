
export default class ExternalTransferTemplate {
    constructor() {
        if (new.target === ExternalTransferTemplate) {
            throw new Error("Cannot instantiate an abstract class directly.");
        }
    }

    getValidateHash(payload) {
        throw new Error("Abstract method 'getValidateHash' must be implemented in the subclass.");
    }

    async getValidateSignature(payload) {
        throw new Error("Abstract method 'getValidateSignature' must be implemented in the subclass.");
    }

    async getUserAccount(data, url, secretKey)  {
        throw new Error("Abstract method 'getTransferInitateBodyRespon' must be implemented in the subclass.");
    }

    async getTransferDepositBody(data, url, secretKey) {
        throw new Error("Abstract method 'getTransferDepositBody' must be implemented in the subclass.");
    }

}

