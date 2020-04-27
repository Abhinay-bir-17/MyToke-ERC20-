var BirToken=artifacts.require("BirToken");
contract('BirToken',function(accounts){
	var tokenInstance;
it('initializes the contract with the current values',function(){
	return BirToken.deployed()
					.then(function(instance){
					tokenInstance=instance;
					return tokenInstance.name();	
					})          
					.then(function(name){ 
						assert.equal(name,'BirToken','has the correct name');
						return tokenInstance.symbol();
					})
					.then(function(symbol){
						assert.equal(symbol,'BT','has the correct su symbol');
						return tokenInstance.decimals();
					})
					.then(function(decimals){
						assert.equal(decimals,8,'has the correct decimal value');
					});       
});

it('allocates the total supply upon deployment',function(){
	return BirToken.deployed()
			.then(function(instance){
				tokenInstance=instance;
				return tokenInstance.totalSupply();
			})
			.then(function(totalSupply){
				assert.equal(totalSupply.toNumber(),1000,'sets the total supply to oneK');
			return tokenInstance.balanceOf(accounts[0]);
			}).then(function(adminBalance){
				assert.equal(adminBalance.toNumber(),1000,'it allocates the initial suooly to the admin account');
			});//; os for return statemnt
			//else for hthen it diesntcome
  });
  	
it('transfers token ownership', function() {
    return BirToken.deployed().then(function(instance) {
      tokenInstance = instance;
      // Test `require` statement first by transferring something larger than the sender's balance
      return tokenInstance.transfer(accounts[1], 1001);
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >=	 0,'error message must contain revert');
	  return tokenInstance.transfer.call(accounts[1], 250, { from: accounts[0]});
	}).then(function(success){
		assert.equal(success,true,'it returns true');
	  	return tokenInstance.transfer(accounts[1], 250, { from: accounts[0]});
    }).then(function(receipt) {
	  //test for events 
	  assert.equal(receipt.logs.length, 1, 'triggers one event');
      assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
      assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
      assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
      assert.equal(receipt.logs[0].args._value, 250, 'logs the transfer amount');
      return tokenInstance.balanceOf(accounts[1]);
    }).then(function(balance) {
      assert.equal(balance.toNumber(),250,'adds the amount to the receiving account');
      return tokenInstance.balanceOf(accounts[0]);
    }).then(function(balance) {
      assert.equal(balance.toNumber(), 750, 'deducts the amount from the sending account');
    });
  });
// contnue fron 1:36:00 min // errot  on adds the amoynt ffrom the receibinf g axxount 
});
