const fs = require('fs');
const deployments = require('../data/deployments');

task('deploy-berries-single').setAction(async function () {
  const [deployer] = await ethers.getSigners();

  // approximately 6000 blocks per day

  const factory = await ethers.getContractFactory('BerriesSingleStaking', deployer);
  const instance = await factory.deploy(
    deployments.berriesToken,
    deployments.berriesToken,
  );
  await instance.deployed();

  console.log(`Deployed stackRewardsMainnet to: ${instance.address}`);
  deployments.berrySingleStakingMainnet = instance.address;

  const json = JSON.stringify(deployments, null, 2);
  fs.writeFileSync(`${__dirname}/../data/deployments.json`, `${json}\n`, {
    flag: 'w',
  });
});
