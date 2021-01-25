// We import Chai to use its asserting functions here.
const { expect } = require("chai");

describe("Token contract", function () {

  let Token;
  let myercToken;
  let owner;
  let wallet1;
  let wallet2;
  let wallets;
  const zeroAddress = '0x0000000000000000000000000000000000000000';

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("Token");
    [owner, wallet1, wallet2, ...wallets] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens onces its transaction has been
    // mined.
    myercToken = await Token.deploy();
  });

  // You can nest describe calls to create subsections.
  describe("constructor()", function () {
    // `it` is another Mocha function. This is the one you use to define your
    // tests. It receives the test name, and a callback function.
    it("Should assign name", async function() {
        const name = await myercToken.name();
        //expect('name').to.be.calledOnContract(myercToken); //not supported by hardhat
        expect(name).to.equal("myerc");
    });

    it("Should assign symbol", async function() {
        const symbol = await myercToken.symbol();
        expect(symbol).to.equal("MYE");
    })

    it("Should assign decimals", async function() {
        const decimals = await myercToken.decimals();
        expect(decimals).to.equal(18);
    })

    it("Should set totalSupply", async function() {
        const totalSupply = await myercToken.totalSupply();
        expect(totalSupply).to.equal(17000000);
    })

    it("Should transfer the total supply of tokens to the owner", async function () {
      const ownerBalance = await myercToken.balanceOf(owner.address);
      expect(await myercToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("transfer()", function () {
    it("Should transfer tokens and update balances", async function () {

      await expect(() => myercToken.transfer(wallet1.address,50))
        .to.changeTokenBalances(myercToken,[owner,wallet1],[-50,50]);
      
      await expect(() => myercToken.connect(wallet1).transfer(wallet2.address,25))
        .to.changeTokenBalances(myercToken,[wallet1,wallet2],[-25,25]);

    });

    it("Should emit Transfer event", async function() {
        await expect(myercToken.transfer(wallet1.address,17))
            .to.emit(myercToken,'Transfer')
            .withArgs(owner.address,wallet1.address,17);
    }); 
    
    it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialReceiverBalance = await myercToken.balanceOf(owner.address);

      await expect(myercToken.connect(wallet1).transfer(owner.address, 1))
        .to.be.revertedWith("Your balance is too low");

      expect(await myercToken.balanceOf(owner.address))
        .to.equal( initialReceiverBalance);
    });

    it("Should fail if receiver is a zero-address", async function() {
        const initialSenderBalance = await myercToken.balanceOf(owner.address);

        await expect(myercToken.transfer(zeroAddress,100))
          .to.be.revertedWith("Cannot send tokens to 0x0 address");

        expect(await myercToken.balanceOf(owner.address))
          .to.equal(initialSenderBalance);
    });

    it("Should fail if receiver is a smart-contracts's address", async function() {
        const initialSenderBalance = await myercToken.balanceOf(owner.address);

        await expect(myercToken.transfer(myercToken.address,100))
          .to.be.revertedWith("Cannot send tokens to smart-contract's address");

        expect(await myercToken.balanceOf(owner.address))
          .to.equal(initialSenderBalance);
    });
  });

  describe("transferFrom()", function () {
    //should send
    it("Should correctly send tokens between two valid accounts", async function() {
      await myercToken.approve(wallet1.address,100);

      await expect(() => myercToken.connect(wallet1).transferFrom(owner.address,wallet2.address,100))
        .to.changeTokenBalances(myercToken,[owner,wallet2],[-100,100]);
    })

    //should fail if balance too low
    it("Should fail if sender's balance is too low", async function() {
      await expect(myercToken.transferFrom(wallet1.address,wallet2.address,100))
        .to.be.revertedWith("Sender balance is too low")
    })
    //should fail if allowance too low
    it("Should fail if allowance is too low", async function() {
      await myercToken.approve(wallet1.address,100);

      await expect(myercToken.connect(wallet1).transferFrom(owner.address,wallet2.address,200))
        .to.be.revertedWith("Spender allowance is too low");
    })
    //should fail if recievevr is 0x0 address
    it("Should fail if receiver is 0x0 address", async function() {
      await expect(myercToken.transferFrom(wallet2.address,zeroAddress,100))
        .to.be.revertedWith("Cannot send tokens to 0x0 address");
    })

    //should fail if reciver is token address
    it("Should fail if receiver is token's address", async function() {
      await expect(myercToken.transferFrom(wallet2.address,myercToken.address,100))
        .to.be.revertedWith("Cannot send tokens to smart-contract's address");
    })

    //should emit Transfer and Approval
    it("Should emit Transfer and Approval events", async function() {
      await myercToken.approve(wallet1.address,100);

      await expect(myercToken.connect(wallet1).transferFrom(owner.address,wallet2.address,100))
        .to.emit(myercToken,'Transfer')
        .withArgs(owner.address,wallet2.address,100)
        .to.emit(myercToken,'Approval')
        .withArgs(owner.address,wallet1.address,0);

    })
  });

  describe("approve()", function() {
    //should set allowance
    it("Should set allowance", async function() {
      await myercToken.approve(wallet1.address,100);
      
      expect(await myercToken.connect(wallet1).allowance(owner.address,wallet1.address))
        .to.equal(100);
    });
    //should fail if someone violates anti-frontrunnig condition
    it("Should fail if someone violates anti-frontrunnig condition", async function() {
      await myercToken.approve(wallet1.address,100);

      await expect(myercToken.approve(wallet1.address,100))
        .to.be.revertedWith("You first have to set allowance to zero, to avoid race condition, or use increase/decrease Approval");
    });
    //shoul fail if there is not enough balance
    it("Should fail if there is not enough balance", async function() {
      await expect(myercToken.connect(wallet1).approve(wallet2.address,100))
        .to.be.revertedWith("Your balance is too low to set allowance");
    })
    //should fail if spender is 0x0
    it("Should fail if spender is 0x0 address", async function() {
      await expect(myercToken.approve(zeroAddress,100))
        .to.be.revertedWith("Cannot set allowance, spender cannot be 0x0 address");
    })
    //should emit Approval
    it("Should emit Approval event", async function() {
      await expect(myercToken.approve(wallet1.address,100))
        .to.emit(myercToken,'Approval')
        .withArgs(owner.address,wallet1.address,100);
    })
  });

  describe("increaseAllowance() & decreaseAllowance()", function() {
    //should increase allowance
    it("Should increase allowance", async function() {
      await myercToken.increaseAllowance(wallet1.address,100);
      expect(await myercToken.allowance(owner.address,wallet1.address))
        .to.be.equal(100);
    })
    //should decrease allowance
    it("Should decrease allowance", async function() {
      await myercToken.increaseAllowance(wallet1.address,100);
      await myercToken.decreaseAllowance(wallet1.address,100);
      expect(await myercToken.allowance(owner.address,wallet1.address))
        .to.be.equal(0);
    })
    //should increase and decrease allowance
    it("Should increase and decrease allowance", async function() {
      await myercToken.increaseAllowance(wallet1.address,100);
      await expect(myercToken.approve(wallet1.address,101))
        .to.be.revertedWith("You first have to set allowance to zero, to avoid race condition, or use increase/decrease Approval");
      await myercToken.decreaseAllowance(wallet1.address,100);
      expect(await myercToken.allowance(owner.address,wallet1.address))
        .to.be.equal(0);
    })
    //should fail if not enogh balance
    it("Should fail if not enough balance to set allowance", async function() {
      await expect(myercToken.connect(wallet1).increaseAllowance(wallet2.address,100))
        .to.be.revertedWith("Your balance is too low to set allowance")

    })
    //should fail if allowance below 0
    it("Should fail if trying to set allowance below 0", async function() {
      await myercToken.increaseAllowance(wallet2.address,50);
      await expect(myercToken.decreaseAllowance(wallet2.address,100))
        .to.be.revertedWith("Cannot set allowance smaller than zero")

    })
    //should fail if spender is 0x0
    it("Should fail if spender is a 0x0 address", async function() {
      await expect(myercToken.increaseAllowance(zeroAddress,100))
        .to.be.revertedWith("Cannot set allowance, spender cannot be 0x0 address");
      await expect(myercToken.decreaseAllowance(zeroAddress,100))
        .to.be.revertedWith("Cannot set allowance, spender cannot be 0x0 address");
    })

  });
  

});