import { expect } from "chai";
import { Wallet, Provider, Contract } from "zksync-web3";
import * as hre from "hardhat";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";

const RICH_WALLET_PK = "0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110";
const RICH_WALLET_ADDRESS = "0x36615Cf349d7F6344891B1e7CA7C72883F5dc049";

async function deployCustomERC721(deployer: Deployer): Promise<Contract>{
    const artifact = await deployer.loadArtifact("CustomERC721");
    return await deployer.deploy(artifact, ["nameTest", "symbolTest", "http://test/"]);
}

describe("CustomERC721", async function(){
    it("mintOne", async function(){
        const provider = Provider.getDefaultProvider();
        const wallet = new Wallet(RICH_WALLET_PK, provider);
        const deployer = new Deployer(hre, wallet);
        const customERC721 = await deployCustomERC721(deployer);
        const mintOne = await customERC721.mintOne(RICH_WALLET_ADDRESS);
        await mintOne.wait();
        let currentTokenId = await customERC721.currentTokenId();
        expect(currentTokenId.toNumber()).to.equal(1);
    })
    it("mintMany", async function(){
        const provider = Provider.getDefaultProvider();
        const wallet = new Wallet(RICH_WALLET_PK, provider);
        const deployer = new Deployer(hre, wallet);
        const customERC721 = await deployCustomERC721(deployer);
        const mintMany = await customERC721.mintMany(RICH_WALLET_ADDRESS, 10);
        await mintMany.wait();
        let currentTokenId = await customERC721.currentTokenId();
        expect(currentTokenId.toNumber()).to.equal(10);
    })

})
