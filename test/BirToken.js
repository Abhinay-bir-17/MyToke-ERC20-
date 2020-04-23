 var BirToken=artifacts.require("BirToken");
 contract('BirToken',function(accounts){
it('sets the total supply upon deployment',function(){
	return BirToken.deployed()
			.then(function(instance){
				tokenInstance=instance;
				return tokenInstance.totalSupply();
			})
			.then(function(totalSupply){
				assert.equal(totalSupply.toNumber(),1000,'sets the total supply to oneK');
			});
  });
});


