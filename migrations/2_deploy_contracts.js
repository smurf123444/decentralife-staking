var Contract = artifacts.require("TokenFarm");

module.exports = function(deployer) {
  deployer.deploy(Contract,"TITS", "TITSASSsuka", '18', '10000', '10000', '5000');

};
