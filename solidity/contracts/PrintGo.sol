pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PrintGo is ERC721 {
    struct Log {
        bytes32 ipAddress;
        string log;
        address sender;
    }
    using Address for address;
    using Counters for Counters.Counter;
    using Strings for uint256;
    Counters.Counter private _tokenIds;
    mapping(uint256 => Log) private logs;
    address owner;

    constructor() public ERC721("PrintGo", "PTG") {
        owner = msg.sender;
    }

    function declareLog(bytes32 _ipAddress, string memory _log) public returns (uint256) {
        uint256 tokenId = _tokenIds.current();
        Log memory token = Log(_ipAddress, _log, msg.sender);
        _tokenIds.increment();
        logs[tokenId] = token;
        _mint(msg.sender, tokenId);
        return tokenId;
    }

    function getLog(uint256 _tokenId) public returns (string memory) {
        require(logs[_tokenId].sender == msg.sender, "Not your logs !");
        return logs[_tokenId].log;
    }

    function getIp(uint256 _tokenId) public returns (bytes32) {
        require(logs[_tokenId].sender == msg.sender, "Not your logs !");
        return logs[_tokenId].ipAddress;
    }
}
