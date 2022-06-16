const truffleContract = require('truffle-contract');
const storageContract = require('../build/contracts/SimpleStorage.json');

const web3provider = "http://127.0.0.1:7545";

const storage = truffleContract(storageContract);
storage.setProvider(web3provider);

contract('SimpleStorage', (accounts) => {
    let storageInstance;
    const owner = accounts[0]; //accounts on Gananche.
    const user = accounts[1];

    before (async () => {
        storageInstance = await storage.deployed();
    });

    it('should set and get a value', async () => {
        const settingValue = 32;
        await storageInstance.set(settingValue, {from : owner}); //from--> msg.sender

        const storedValue = await storageInstance.get();
        assert.equal(settingValue, storedValue, "Set and get values must be equal.");
    });
});