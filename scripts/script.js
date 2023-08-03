const hre = require("hardhat")

const RECEPIENT_ADDRESS = "0x488DDEF50e9ed50340775A54606794ac89926240"
const TOKEN_TRANSFER_AMOUNT = 1

async function main() {
  console.log("Deploying...")

  const transferContract = await hre.ethers.deployContract("TransferContract")
  const tokenContract = await hre.ethers.deployContract("ChenToken")

  await transferContract.waitForDeployment()
  await tokenContract.waitForDeployment()

  const transferContractAddress = await transferContract.getAddress()
  const tokenContractAddress = await tokenContract.getAddress()

  console.log(`Transfer: ${transferContractAddress}, Token: ${tokenContractAddress}`)

  console.log("Calling Functions...")
  await callFunctions(transferContractAddress, tokenContractAddress, RECEPIENT_ADDRESS, TOKEN_TRANSFER_AMOUNT)

  console.log("Done!")
}
async function callFunctions(transferContractAddress, tokenAddress, recipientAddress, amount) {
  const [accounts] = await hre.ethers.getSigners()

  const tokenFactory = await hre.ethers.getContractFactory("ChenToken")
  const tokenFactoryContract = new hre.ethers.Contract(tokenAddress, tokenFactory.interface).connect(accounts)
  await tokenFactoryContract.approve(transferContractAddress, TOKEN_TRANSFER_AMOUNT)

  const transferFactory = await hre.ethers.getContractFactory("TransferContract")
  const contract = new hre.ethers.Contract(transferContractAddress, transferFactory.interface).connect(accounts)

  let transferToken = await contract.transferToken(tokenAddress, recipientAddress, amount)
  let transferEth = await contract.transferEth(recipientAddress,  { value: "1" })

  console.log(`store: ${transferToken.hash} Get: ${transferEth.hash}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})