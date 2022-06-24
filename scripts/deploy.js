const hre = require("hardhat");

async function main() {
    //const [deployer] = await ethers.getSigners();
  
    //console.log("Deploying contracts with the account:", deployer.address);
    //console.log("Account balance:", (await deployer.getBalance()).toString());
  
    
    // Get the ContractFactories and Signers here.
    const Nft = await hre.ethers.getContractFactory("Nft");
    const Marketplace = await hre.ethers.getContractFactory("Marketplace");
    // deploy contracts
    const marketplace = await Marketplace.deploy(1);
    const nft = await Nft.deploy();
    // Save copies of each contracts abi and address to the frontend.
    saveFrontendFiles(marketplace , "Marketplace");
    saveFrontendFiles(nft , "Nft");
  }
  
  function saveFrontendFiles(contract, name) {
    const fs = require("fs");
    const rootDir = __dirname.toString().slice(0,-7)
    const contractsDir = rootDir + "frontend/src/contractsData/";
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    fs.writeFileSync(
      contractsDir + `/${name}-address.json`,
      JSON.stringify({ address: contract.address }, undefined, 2)
    );
  
    //const contractArtifact = artifacts.readArtifactSync(name);
    const contractArtifact = fs.readFileSync(`${rootDir}artifacts/contracts/${name}.sol/${name}.json`).toString();
  
    fs.writeFileSync(
      contractsDir + `/${name}.json`,
      JSON.stringify(JSON.parse(contractArtifact), null, 2)
    );
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });