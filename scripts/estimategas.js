const hre = require("hardhat")

async function main() {
    const TransferContract = await hre.ethers.getContractFactory("TransferContract")
    const ChenToken = await hre.ethers.getContractFactory("ChenToken")

    const transferContractGasEstimate = await ethers.provider.estimateGas(TransferContract.getDeployTransaction())
    const chenTokenGasEstimate = await ethers.provider.estimateGas(ChenToken.getDeployTransaction())

    console.log(`Gas estimate to deploy TransferContract: ${transferContractGasEstimate}`)
    console.log(`Gas estimate to deploy ChenToken: ${chenTokenGasEstimate}`)

    const accounts = await ethers.getSigners()
    const balance = await ethers.provider.getBalance(accounts[0].address)
    console.log(balance)
} 

main()