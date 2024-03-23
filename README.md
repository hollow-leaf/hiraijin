# HiraiJin

![HiraiJin Logo](/HiraiJin_Logo.png "HiraiJin Logo")

## Description
Hiraijin is a revolutionize payments with QR codes, offering seamless USDC and New Taiwan Dollar transactions plus instant exchange - the ultimate financial toolkit for merchants!

In the evolving landscape of digital finance, where flexibility and efficiency are paramount, Hiraijin emerges as a transformative platform, bridging the gap between traditional commerce and the Web3 economy. We offer a visionary payment solution tailored for the forward-thinking Web3 community and merchants demanding daily financial agility.

## Unifying Payments with TWQR Technology
Central to Hiraijin's innovation is our support for TWQR, the standardized QR code system engineered to consolidate various mobile payment methods in Taiwan. This support ensures that Hiraijin is not just a platform but a comprehensive solution that caters to the diverse needs of Taiwan's digital economy. By embracing TWQR, we offer merchants and consumers a versatile payment gateway that accommodates a broad spectrum of payment preferences, including the latest in digital currency and traditional fiat payments.

This strategic incorporation of TWQR into our platform highlights our commitment to enhancing payment flexibility and accessibility. Merchants can generate a TWQR code through Hiraijin, enabling customers to make payments in their preferred method, be it USDC for the Web3-savvy users or New Taiwan Dollar for those inclined towards conventional transactions. This flexibility significantly broadens the appeal of Hiraijin, making it an indispensable tool for merchants aiming to tap into both the traditional market and the emerging Web3 space.

## Empowering Web3 Adoption with USDC Payments
Hiraijin is more than a payment platform; it’s a catalyst for Web3 adoption, offering USDC as a payment option. This choice resonates with the Web3 audience, providing an alternative way to engage with digital currencies. By embracing USDC, Hiraijin facilitates a seamless transition for consumers and merchants alike to explore and integrate into the Web3 space, leveraging the stability and security of a leading digital dollar.

## What we build?
Circle API: We use three APIs to develop our wallet：
developer/wallet : Generate wallet for user
wallets/__Wallet_ID__/balances : View user wallet balance
balancedeveloper/transactions/transfer : Initiate transaction
Contract: We use Thirdweb and MintClub to create and deploy contract

![HiraiJin Process](/HiraiJin_Process.png "HiraiJin Process")

## How to use

```
pnpm i
cd apps/serverless
pnpm dev
```