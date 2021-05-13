pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PrintGo is ERC721 {
    struct Sale {
        address printer;
        address buyer;
        uint256 price;
    }
    using Address for address;
    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter private _tokenIds;
    mapping(address => bool) public banList;
    mapping(uint256 => Sale) public sales;
    address owner;

    constructor() public ERC721("PrintGo", "PTG") {
        owner = msg.sender;
    }

    function isBanned(address _address) public view returns (bool) {
        return banList[_address];
    }

    function ban(address _printer) public returns (bool) {
        require(!isBanned(_printer), "Already banned");
        require(owner == msg.sender, "Not admin");
        banList[_printer] = true;
        return banList[_printer];
    }

    function declareSale(address _printer, address _buyer, uint256 _price) public returns (uint256) {
        require(!isBanned(_printer), "Banned");
        uint256 tokenId = _tokenIds.current();
        Sale memory token = Sale(_printer, _buyer, _price);
        sales[tokenId] = token;
        _mint(msg.sender, tokenId);
        return tokenId;
    }
}
