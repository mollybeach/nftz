const fs = require('fs');
const deployments = require('../data/deployments');



/*  write it task  functions for these solidity functions:
        constructor(string memory name_, string memory symbol_, string memory baseURI_) ERC721(name_, symbol_); 
        function totalSupply() public view virtual returns (uint256)
        function changePrice(uint256 _newPrice) public onlyOwner
        function changeBatchSize(uint256 _newBatch) public onlyOwner
        function tokenURI(uint256 tokenId) public view virtual override returns (string memory)
        function setTokenURI(uint256 _tokenId, string memory _tokenURI) public onlyOwner
        function setStart(bool _start) public onlyOwner
        function devMint(uint256 _times) public onlyOwner
        function mintToad(uint256 _times) payable public

        let runFunction = await instance.callStatic.functionName() for everything else
        await runFunction.wait() for everything else

        let runViewFunction = await instance.connect(deployer).functionName() for public view functions
        console.log(runViewFunction) for everything else

*/
task('deploy-zombie-toadz').setAction(async function () {
    const NAME = 'ZombieToadz', SYMBOL = 'BRAINZ', BASE_URI = 'ipfs://QmWf3ywafrdzWx6QjUJiRe6NqMkb28rfPj3oBBkokTL199/';
    const [deployer] = await ethers.getSigners();
    console.log(deployer);
    const factory = await ethers.getContractFactory('ZombieToadz', deployer);
    const constructor = await factory.deploy(
        NAME,
        SYMBOL,
        NAME

    );
    //before deploy :
   // const instance = constructor;
    //after deploy : 
    const instance = await ethers.getContractAt('ZombieToadz',deployments.ZombieToadz);
    await instance.deployed();
    console.log(`Deployed ZombieToadz to: ${instance.address}`);
    deployments.ZombieToadz = instance.address;
    const json = JSON.stringify(deployments, null, 2);
    fs.writeFileSync(`${__dirname}/../data/deployments.json`, `${json}\n`, {
        flag: 'w',
    });
    console.log('\n*******Checking functions*********\n');
    let successStatement = (functionName) => { console.log('\n Success: The ' + functionName + ' function ran without errors.');}
    
    //run totalSupply() view function
    const totalSupply = await instance.callStatic.totalSupply();
    console.log(totalSupply);
    successStatement('totalSupply');

    //run changePrice() function
    const changePrice = await instance.connect(deployer).changePrice(100);
    await changePrice.wait();
    successStatement('changePrice');

    //run changeBatchSize() function
    const changeBatchSize = await instance.connect(deployer).changeBatchSize(10);
    await changeBatchSize.wait();
    successStatement('changeBatchSize');

    //run tokenURI() view function
/*
    const tokenURI = await instance.callStatic.tokenURI(5358);
    console.log(tokenURI);
    successStatement('tokenURI');

    //run setTokenURI() function
    const setTokenURI = await instance.connect(deployer).setTokenURI(1, BASE_URI + '1');
    await setTokenURI.wait();
    successStatement('setTokenURI');

    //run setStart() function
    const setStart = await instance.connect(deployer).setStart(true);
    await setStart.wait();
    successStatement('setStart');*/

    //run devMint() function
    const devMint = await instance.connect(deployer).devMint(1);
    await devMint.wait();
    successStatement('devMint');
/*
    //run mintToad() function
    const mintToad = await instance.connect(deployer).mintToad(1);
    await mintToad.wait();
    successStatement('mintToad');
    */

});

//yarn run hardhat deploy-zombie-toadz --network localhost

