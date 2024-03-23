// import fetch from "node-fetch"
import forge from 'node-forge'
import { v4 as uuidv4 } from 'uuid'
import { ENV } from '../utils/env'
// 生成 UUID v4
export function generateUUIDv4() {
    return uuidv4()
}

  
// 加密函數
export function encryptData(publicKey: any, entitySecret: any) {
    const encryptedData = publicKey.encrypt(entitySecret, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: {
            md: forge.md.sha256.create(),
        },
    });
    return forge.util.encode64(encryptedData)
}

// 創建錢包函數
export async function createWallets() {
    const url = 'https://api.circle.com/v1/w3s/developer/wallets'
    const uuid = generateUUIDv4()

    // 公鑰
    const publicKeyPem = `
        -----BEGIN PUBLIC KEY-----
        MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEArXVzO2yqJiUywoset791
        gdX8Lyt62dbXtGimc2bW07lyn3H3QUNczJ8kru/D2w5hCkwIENTVlqina6RIWjWS
        GSNWicJ57z+wykgZ4TNUT7vUbPjaUPovnbQKw6vix1QApfbRIPltmFb5RXa0zbOr
        0Uq9GtZ5aLlRnYx6w/dMtHypK2OWlyYrhqN0AXNlgc2FNgQZ4fMbzWcrs3RZRYFe
        TD1RcUdbrqMPTv6BKE8o7ot92gak0Vhmy7eZ8PKi3Ga8FX1GbL+JYhN92WmsHWi/
        Dy2mhlrFw8Ikeeq0wTXuevMsRslw8rzESKfJAmbjGPWiYN381XPDAsPWMUfVxdiL
        h0WgPKBaJ+dn4etZiUIBnikfn1rYwGGZHprDFTrrHue3G/YYkQS5Ksl065fKCrbu
        Y54AbVQr35ql6ABEhua7Tx9B8lEAGo0mtNj7FsXY/H9+1ih1gYYPZNCjoiwWf8je
        e2kRfiRnnwAYge0B47JOtviymL3FP/0FWGRuEXA0Es1ukzchdhFxypMzA+qoY/7/
        ECRhe1UdKkmC1RNBJCiSUuXhaCxvKbYwHmIU5OiIMA6HzyPj9P152tLIoT60fHir
        5uYiOSYCplLi0yYgmvFVzMMgdLIXCKCu3iSsvTgNL2VnzQljee75FqmK8dnET0uA
        dXvoyAPFbygpPLI2lfvXI1sCAwEAAQ==
        -----END PUBLIC KEY-----`
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem)
    const entitySecret = forge.util.hexToBytes('7dd10821de91607612051b3aef97f247897085efc076e041fb1e8f33ea905212')
    const encryptedData = encryptData(publicKey, entitySecret)

    const options = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'authorization': `Bearer ${ENV}`,
        },
        body: JSON.stringify({
            blockchains: ['MATIC-MUMBAI'],
            idempotencyKey: uuid,
            walletSetId: '018e69e1-91ed-7352-bba2-63179fcc7eed',
            entitySecretCiphertext: encryptedData,
            count: 1
        })
    }
    
    try {
        const response = await fetch(url, options)
        const jsonData = await response.json()
        return jsonData
    } catch (err) {
        throw new Error('Failed to create wallets: ' + err)
    }
}

// createWallets()
//   .then(data => console.log(data))
//   .catch(err => console.error('Error:', err.message))
