// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` receives the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
describe("Token contract", function () {
  // Mocha has four functions that let you hook into the the test runner's
  // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

  // They're very useful to setup the environment for tests, and to clean it
  // up after they run.

  // A common pattern is to declare some variables, and assign them in the
  // `before` and `beforeEach` callbacks.

  let Token;
  let myercToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

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

      await expect(() => myercToken.transfer(addr1.address,50))
        .to.changeTokenBalances(myercToken,[owner,addr1],[-50,50]);
      
      await expect(() => myercToken.connect(addr1).transfer(addr2.address,25))
        .to.changeTokenBalances(myercToken,[addr1,addr2],[-25,25]);

    });

    it("Should emit Transfer event", async function() {
        await expect(myercToken.transfer(addr1.address,17))
            .to.emit(myercToken,'Transfer')
            .withArgs(owner.address,addr1.address,17);
    }); 
    
    it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialReceiverBalance = await myercToken.balanceOf(owner.address);

      await expect(myercToken.connect(addr1).transfer(owner.address, 1))
        .to.be.revertedWith("Your balance is too low");

      expect(await myercToken.balanceOf(owner.address))
        .to.equal( initialReceiverBalance);
    });

    it("Should fail if receiver is a zero-address", async function() {
        const initialSenderBalance = await myercToken.balanceOf(owner.address);

        await expect(myercToken.transfer('0x0000000000000000000000000000000000000000',100))
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
    //should decrease allowance

    //should fail if balance too low
    //should fail if allowance too low
    //should fail if recievevr is 0x0 address
    //should fail if reciver is token address

    //should emit Transfer and Approval

  });
  

});