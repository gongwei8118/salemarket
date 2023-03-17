import { expect } from "chai";
import { Wallet, Provider, Contract } from "zksync-web3";
import * as hre from "hardhat";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

const RICH_WALLET_PK = "0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110";
const RICH_WALLET_ADDRESS = "0x36615Cf349d7F6344891B1e7CA7C72883F5dc049";

async function deployCustomERC721Factory(deployer: Deployer): Promise<Contract>{
    const artifact = await deployer.loadArtifact("CustomERC721Factory");
    return await deployer.deploy(artifact, []);
}

describe("CustomERC721Factory", async function(){

    it("createCustomERC721's address equal deployedContract address", async function(){
        const provider = Provider.getDefaultProvider();
        const wallet = new Wallet(RICH_WALLET_PK, provider);
        const deployer = new Deployer(hre, wallet);
        const customERC721Factory = await deployCustomERC721Factory(deployer);
        const customERC721Address1 = await customERC721Factory.createCustomERC721("nameTest1", "symbolTest1", "http://test/");
        const comfirmedAddress1 = await customERC721Address1.wait();
        const deployedContractValue = await customERC721Factory.deployedContract(RICH_WALLET_ADDRESS, 0);
        expect(comfirmedAddress1.contractAddress).to.equal(deployedContractValue);
  
    })

    it("deployedContract value length should equal deploy customERC721 times", async function(){
        const provider = Provider.getDefaultProvider();
        const wallet = new Wallet(RICH_WALLET_PK, provider);
        const deployer = new Deployer(hre, wallet);
        const customERC721Factory = await deployCustomERC721Factory(deployer);
        const customERC721Address1 = await customERC721Factory.createCustomERC721("nameTest1", "symbolTest1", "http://test/");
        await customERC721Address1.wait();
        const customERC721Address2 = await customERC721Factory.createCustomERC721("nameTest2", "symbolTest2", "http://test/");
        await customERC721Address2.wait();
        
        let deployedContractValueLength: number = (await customERC721Factory.deployedContractValueLength(RICH_WALLET_ADDRESS)).toNumber();
        // for(let i=0; i<deployedContractValueLength; i++){
        //     console.log(await customERC721Factory.deployedContract(RICH_WALLET_ADDRESS, i));
        // }
        expect(deployedContractValueLength).to.equal(2);
    })
})