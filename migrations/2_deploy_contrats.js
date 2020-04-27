//he name specified should match the name of the contract definition within that source file. Do not pass the 
///name of the source file, as files can contain more than one contract.
const BirToken = artifacts.require("BirToken");
 module.exports = function(deployer) {
  deployer.deploy(BirToken,1000);
};




