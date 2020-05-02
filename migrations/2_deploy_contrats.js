//he name specified should match the name of the contract definition within that source file. Do not pass the 
///name of the source file, as files can contain more than one contract.
const BirToken = artifacts.require("BirToken");
const BirTokenSale=artifacts.require("BirTokenSale");

module.exports = function(deployer) {
  deployer.deploy(BirToken,1000).then(function(){
    //0.001 ether
    var tokenPrice=1000000000000000;
    return deployer.deploy(BirTokenSale,BirToken.address,tokenPrice);
  });   
};




