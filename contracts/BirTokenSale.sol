pragma solidity >=0.4.22 <0.7.0;
import "./BirToken.sol";
contract BirTokenSale{

    address admin;
    BirToken public tokenContract;
    //without public it showed the errpr that tokenPrice doesn'r exisst
    uint public tokenPrice;
    uint public tokenSold;
    constructor(BirToken _takenContract,uint _tokenPrice)public{
        //assign an admin
        admin = msg.sender;
        //Takem contract
        tokenContract = _takenContract;
        //Tooken  Price
        tokenPrice = _tokenPrice;
    }
    event Sell(
        address _buyer,
        uint _amount
    );

    //multiply function
    function mul(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x, "ds-math-mul-overflow");
    }
    //Buy Tokens
    function BuyTokens(uint _numberOfTokens)public payable{
        //require that value  is equal tp tokens
        require(msg.value == mul(_numberOfTokens,tokenPrice),'');
        //require that the contract has enough tokens
        require(tokenContract.balanceOf(address(this)) >= _numberOfTokens,'');
        //require that a trasfer is successful
        require(tokenContract.transfer(msg.sender,_numberOfTokens),'');
        //keep reack of tokensold
        tokenSold += _numberOfTokens;
        //trigger sell event
        emit Sell(msg.sender,_numberOfTokens);
    }

    
}