var BirTokenSale=artifacts.require("BirTokenSale");
var BirToken=artifacts.require("BirToken");

contract('BirTokenSale',function(accounts){
    var tokenSaleInstance;
    var tokenPrice=1000000000000000;// in wei
    var buyer=accounts[1];
    var numberOfTokens;
    var tokenInstance;
    var admin=accounts[0];
    var tokensAvail=500;
    it('Initializes the contract with the correct the values',function(){
        return BirTokenSale.deployed().then(function(instance){
        tokenSaleInstance=instance;
            // to check if the contract address has been creatred
            return tokenSaleInstance.address
        })
        .then(function(address){
            assert.notEqual(address,0x0,'has contract addre ss');
            return tokenSaleInstance.tokenContract();
        })
        .then(function(address){
            assert.notEqual(address,0x0,'has a token contract');
            return tokenSaleInstance.tokenPrice();
        })
        .then(function(price){
            assert.equal(price,tokenPrice,'token price is correct');
        });
    });
    it('facilitates token buying',function(){
        return BirToken.deployed().then(function(instance){
            //gran tokenInstance first
            tokenInstance=instance;
            return BirTokenSale.deployed();
        }).then(function(instance){ 
            //then gran tokenSaleInstance
            tokenSaleInstance=instance;
            //provision 50% of tpkems tp the admin
            return tokenInstance.transfer(tokenSaleInstance.address,tokensAvail,{from:admin});    
        }).then(function(receipt){
           // return tokenInstance.transfer(tokenSaleInstance.address,tokensAvail,{from:admin});
            numberOfTokens=10;
            return tokenSaleInstance.BuyTokens(numberOfTokens,{from:buyer,value:numberOfTokens*tokenPrice});      
        })
        //below is the receipt due to the above transaction
        .then(function(receipt){
            assert.equal(receipt.logs.length, 1, 'triggers one event');
			assert.equal(receipt.logs[0].event, 'Sell', 'should be the "Sell" event');
			assert.equal(receipt.logs[0].args._buyer, buyer, 'logs the account that purchased the tokens');
			assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'logs the number of tokens purchased');	
            return tokenSaleInstance.tokenSold();
        })
        .then(function(amount){
            assert.equal(amount.toNumber(),numberOfTokens,'increments the number of tokens sold');
            return tokenInstance.balanceOf(buyer); 
        }).then(function(balance){ 
            assert.equal(balance.toNumber,numberOfTokens);
            return tokenInstance.balanceOf(tokenSaleInstance.address); 
        }).then(function(balance){ 
            assert.equal(balance.toNumber,tokensAvail-numberOfTokens);
            //try to buy tokrns different from the ether value
            return tokenSaleInstance.BuyTokens(numberOfTokens,{from:buyer,value:1});      
        })
        .then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >=	 0,'msg.value must equal number if of tokens in wei');  
            return tokenSaleInstance.BuyTokens(1001,{from:buyer,value:numberOfTokens*tokenPrice}) ;
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >=0,'cannot purchase more than tokens available');  
        });
    });

});