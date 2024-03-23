import forge from 'node-forge'  
import { ENV } from '../utils/env'
import { encryptData, generateUUIDv4 } from './userService'

export async function getBalance (walletId: string) {
    const url = `https://api.circle.com/v1/w3s/wallets/${walletId}/balances`
    const options = {
    method: 'GET',
    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${ENV}`}
    }
    try {
        const response = await fetch(url, options)
        const jsonData = await response.json()
        return jsonData
    } catch (err) {
        throw new Error('Failed to get balance: ' + err)
    }
}

export async function transfer (from: string, to: string, tokenId: string, amount: string) {
    const url = 'https://api.circle.com/v1/w3s/developer/transactions/transfer'

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
      headers: {'Content-Type': 'application/json', Authorization: `Bearer ${ENV}`},
      body: JSON.stringify({
        idempotencyKey: generateUUIDv4(),
        entitySecretCipherText: encryptedData,
        amounts: [amount],
        destinationAddress: to,
        feeLevel: 'HIGH',
        tokenId: tokenId,
        walletId: from
      })
    }
    try {
        const response = await fetch(url, options)
        const jsonData = await response.json()
        return jsonData
    } catch (err) {
        throw new Error('Failed to transfer: ' + err)
    }
}