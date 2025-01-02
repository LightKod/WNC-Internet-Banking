import axios from "axios";
import ExternalTransferTemplate from "./ExternalTransferTemplate.js";
import { createHmac, createSign, createVerify } from "crypto";
import * as openpgp from 'openpgp';
async function generatePGPSignature(message, privateKeyArmored) {
    try {
      // Read the private key
      const privateKey = await openpgp.readPrivateKey({
        armoredKey: privateKeyArmored,
      });
  
      const privateKeyPass = await openpgp.decryptKey({
        privateKey: privateKey,
        passphrase: process.env.PGP_PASSPHRASE || "yourPassphrase",
      });
  
      const detachedSignature = await openpgp.sign({
        message: await openpgp.createMessage({ text: message }),
        signingKeys: privateKeyPass,
        detached: true,
      });
  
      // const signature = await openpgp.readSignature({
      //   armoredSignature: detachedSignature, // parse detached signature
      // });
  
      return detachedSignature;
    } catch (error) {
      console.error("Error generating PGP signature:", error);
    }
  }
export default class BankATransferTemplate extends ExternalTransferTemplate {
  getValidateHash(payload) {
    const { time, domain, secretKey } = payload;
    const dataToHash = `${domain}|${time}|${secretKey}`;
    return createHmac("sha256", secretKey).update(dataToHash).digest("hex");
  }

  async getValidateSignature(payload) {
    const { data } = payload;
    const message = JSON.stringify(data);
    const signature = await generatePGPSignature(message, process.env.PRIVATE_KEY);
    return signature;
  }

  async getUserAccount(data, url, secretKey) {
    try {
      const { account_number } = data;
      const parsedUrl = new URL(url);
      const domain = parsedUrl.pathname;
      const time = Date.now();
      const dataToHash = { time, domain, secretKey };
      const hash = this.getValidateHash(dataToHash);
      const response = await axios.post(url, {
        payload: {
          accountNumber: account_number,
        },
        time,
        token: hash,
        domain,
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching user account:", error.message);
      throw new Error("Failed to fetch user account data");
    }
  }

    async getTransferDepositBody(data, url, secretKey) {
        try {
           const { source_account_number, destination_account_number, amount,content} = data;
           const payload = {
            amount,
            accountNumber: destination_account_number,
            srcAccount: source_account_number,
            content
           }
           const parsedUrl = new URL(url);
           const domain = parsedUrl.pathname;
           const time = Date.now();
           const dataToHash = { time, domain, secretKey };
           const hash = this.getValidateHash(dataToHash);
           const signature = await this.getValidateSignature(payload);
           const response = await axios.post(url, {
             payload,
             time,
             token: hash,
             domain,
             signature
           })
            return response.data;
          } catch (error) {
            console.error("Error fetching deposit account:", error.message);
            throw new Error("Failed to fetch deposit account data");
          }
  }
}
