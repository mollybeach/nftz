const fs = require('fs');
const deployments = require('../data/deployments');

task('deploy-fixed-rewards').setAction(async function () {
  const [deployer] = await ethers.getSigners();

  // approximately 6000 blocks per day

  const RATE = ethers.utils
    .parseUnits('5', 18)
    .div(ethers.BigNumber.from('6000'));

    const EXPIRATION = ethers.BigNumber.from('42000');

  const factory = await ethers.getContractFactory('SweetsStaking', deployer);
  const instance = await factory.deploy(
    deployments.ztoadzMainnet,
    RATE,
    EXPIRATION,
    deployments.brainzMainnet
  );
  await instance.deployed();

  console.log(`Deployed fishFixedMain to: ${instance.address}`);
  deployments.fishFixedMain = instance.address;

  const json = JSON.stringify(deployments, null, 2);
  fs.writeFileSync(`${__dirname}/../data/deployments.json`, `${json}\n`, {
    flag: 'w',
  });
});
