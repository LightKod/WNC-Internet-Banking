import crypto from 'crypto';
import * as openpgp from 'openpgp';

/**
 * Verify request hash using a secret key (shared secret between two parties)
 */
export const verifyRequestHash = (data, secretKey, providedHash) => {
    const payloadString = JSON.stringify(data);
    const computedHash = crypto.createHmac('sha256', secretKey).update(payloadString).digest('hex');
    return computedHash === providedHash;
};

/**
 * Generate request hash using a secret key (shared secret between two parties)
 */
export const generateRequestHash = (payload, secretKey) => {
    const payloadString = JSON.stringify(payload);
    return crypto.createHmac('sha256', secretKey).update(payloadString).digest('hex');
};

// Generate RSA Signature
export const generateRSASignature = (payload, privateKey) => {
    const payloadString = JSON.stringify(payload);
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(payloadString);
    sign.end();
    return sign.sign({ key: privateKey, padding: crypto.constants.RSA_PKCS1_PADDING }, 'base64');
};

// Verify RSA Signature
export const verifyRSASignature = (data, publicKey, providedSignature) => {
    const payloadString = JSON.stringify(data);
    return crypto.verify(
        'sha256',
        Buffer.from(payloadString),
        { key: publicKey, padding: crypto.constants.RSA_PKCS1_PADDING },
        Buffer.from(providedSignature, 'base64')
    );
};
/**
 * Generate PGP signature
 */
export const generatePGPSignature = async (payload, privateKeyArmored) => {
    try {
        // Decrypt the private key
        const privateKey = await openpgp.decryptKey({
            privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
            passphrase: process.env.PGP_PASSPHRASE || 'yourPassphrase',
        });

        // Create a message from the payload
        const message = await openpgp.createMessage({ text: JSON.stringify(payload) });

        // Sign the message
        const signature = await openpgp.sign({
            message,
            signingKeys: privateKey,
        });

        return signature;
    } catch (error) {
        console.error('Error generating PGP signature:', error);
        throw error;
    }
};

/**
 * Verify PGP signature
 */
export const verifyPGPSignature = async (data, publicKeyArmored, providedSignature) => {
    try {
        // Read the public key
        const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

        // Read the signed message
        const message = await openpgp.readMessage({ armoredMessage: providedSignature });

        // Verify the signature
        const verification = await openpgp.verify({
            message,
            verificationKeys: publicKey,
        });

        const isVerified = await verification.signatures[0].verified;
        return isVerified;
    } catch (error) {
        console.error('Error verifying PGP signature:', error);
        throw error;
    }
};

/**
 * General function to verify signature (supports RSA and PGP)
 */
export const verifySignature = async (data, publicKey, providedSignature, signatureType) => {
    publicKey =  Buffer.from(publicKey, 'base64').toString('ascii');

    if (signatureType === 'RSA') {
        return verifyRSASignature(data, publicKey, providedSignature);
    } else if (signatureType === 'PGP') {
        return verifyPGPSignature(data, publicKey, providedSignature);
    } else {
        throw new Error('Unsupported signature type');
    }
};

/**
 * General function to generate signature (supports RSA and PGP)
 */
export const generateSignature = async (payload, privateKey, signatureType) => {
     privateKey =  Buffer.from(privateKey, 'base64').toString('ascii');
     console.log("privateKey",privateKey)
    if (signatureType === 'RSA') {
        return generateRSASignature(payload, privateKey);
    } else if (signatureType === 'PGP') {
        return generatePGPSignature(payload, privateKey);
    } else {
        throw new Error('Unsupported signature type');
    }
};
