pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PrintGo is ERC721 {
    struct Log {
        bytes32 ipAddress;
        bytes log;
    }
    using Address for address;
    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter private _tokenIds;
    mapping(address => bool) public banList;
    mapping(uint256 => Log) private logs;
    address owner;

    constructor() public ERC721("PrintGo", "PTG") {
        owner = msg.sender;
    }

    function isBanned(bytes32 _ipAddress) public view returns (bool) {
        return banList[_ipAddress];
    }

    function ban(bytes32 _ipAddress) public returns (bool) {
        require(!isBanned(_ipAddress), "Already banned");
        require(owner == msg.sender, "Not admin");
        banList[_ipAddress] = true;
        return banList[_ipAddress];
    }

    function declareLog(bytes32 _ipAddress, bytes _log) public returns (uint256) {
        require(!isBanned(_ipAddress), "Banned");
        uint256 tokenId = _tokenIds.current();
        Log memory token = Log(_ipAddress, _log);
        _tokenIds.increment();
        logs[tokenId] = token;
        _mint(msg.sender, tokenId);
        return tokenId;
    }
}
