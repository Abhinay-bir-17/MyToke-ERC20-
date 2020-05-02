// steps for starting:
// 1.truffle init : makes initial files
// 2. make changes in truffle -config.js
// 3.make you BirToken contract
// 4.create a 2_deploy_contracts.js
// 5.Open ganache, then do truffle migrate --reset
// next truffle console ,use .exit to exit
// 6. Test yourc ontract by makinga test file
// that is BirToken.js
//7. push to git
// git remote add origin url(of the repo then)
	 //git push origin master
//8. add 10000  to 2_deploy

// #PROVISION TOKENS TO TOKEN SALE CONTRACT
// #SET A TOKEN PTICE IN WEI
// #ASSIGN AN ADMIN
// #BUY TOKENS
// #END SALE

//start at 4:25:00

pragma solidity >=0.4.22 <0.7.0;
contract BirToken{
	string public name;
	uint public decimals;
	string public symbol;

	event Transfer(
		address indexed _from,
		address indexed _to,
		uint _value
	);
	//approve event
	event Approval(
		 address indexed _owner,
		 address indexed _spender,
		 uint _value
	);

	uint public totalSupply;//its a state variable
	mapping(address=> uint) public balanceOf;
	// allowance
	mapping(address=>mapping(address =>uint)) public allowance;

	// _ for arguments
	constructor(uint _initialSupply)public{
		totalSupply = _initialSupply;
		//allocate the initial supply
		 balanceOf[msg.sender] = _initialSupply;
		 name = "BirToken";
		 symbol = "BT";
		 decimals = 8;
}
function transfer(address _to, uint _value)public  returns(bool success){
		//exception if account doesnt have enough
		require(balanceOf[msg.sender] >= _value,'');
		// transfer the balance
		balanceOf[msg.sender] -= _value;
		balanceOf[_to] += _value;
		//returns a boolean
		emit Transfer(msg.sender,_to,_value);
		//transfer event
		return true;
	}
	//Delegated Transfer

	//approve
	function approve(address _spender,uint _value)public returns(bool success) {
		//allowance
		allowance[msg.sender][_spender] = _value;
		//approve event
		emit Approval(msg.sender,_spender,_value);
		return true;
	}
	//transferFrom: it makes the transfer from our behalf
	function transferFrom(address _from,address _to,uint _value) public returns(bool success){
		//require from has enough tokens
		require(_value <= balanceOf[_from],'');
		//require allowance is big enough
		require(allowance[_from][msg.sender] >= _value,'');
		//change the balance
		balanceOf[_from] -= _value;
		balanceOf[_to] += _value;
		//update the allowance
		allowance[_from][msg.sender] -=_value;
		//transfer a event
		emit Transfer(_from,_to,_value);
		//return a boolean
		return true;
	}
}

// fucker seee this : https://www.youtube.com/watch?v=x0EYpi38Yp4