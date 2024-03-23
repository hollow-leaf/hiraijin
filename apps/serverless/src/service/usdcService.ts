import { ENV } from '../utils/env'

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