// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/Pausable.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol';
import '@openzeppelin/contracts/utils/Strings.sol';

contract CTDao is ERC1155, Ownable, Pausable, ERC1155Supply {
  string public name = 'dAO';
  string public symbol = 'dAO';

  uint256 public id = 0;
  uint256 public maxSupply = 1;
  uint256 public maxPerWallet = 100;

  mapping(address => uint256) purchasesPerWallet;

  constructor(
    string memory _uri,
    string memory _name,
    string memory _symbol
  ) ERC1155(_uri) {
    name = _name;
    symbol = _symbol;
  }

  function setURI(string memory newuri) public onlyOwner {
    _setURI(newuri);
  }

  function pause() public onlyOwner {
    _pause();
  }

  function unpause() public onlyOwner {
    _unpause();
  }

  function initalMint(uint256 amount) public payable {
    _mint(msg.sender, id, amount, '');
    id += 1;
  }

  function Mint(uint256 targetId, uint256 amount) public payable {
    _mint(msg.sender, targetId, amount, '');
  }

  function uri(uint256 _id)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(exists(_id), 'URI nonexist token');
    return
      string(abi.encodePacked(super.uri(_id), Strings.toString(_id), '.json'));
  }

  function mintBatch(
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) public onlyOwner {
    _mintBatch(to, ids, amounts, data);
  }

  function _beforeTokenTransfer(
    address operator,
    address from,
    address to,
    uint256[] memory ids,
    uint256[] memory amounts,
    bytes memory data
  ) internal override(ERC1155, ERC1155Supply) whenNotPaused {
    super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
  }

  function withdraw(address _addr) external onlyOwner {
    uint256 balance = address(this).balance;
    payable(_addr).transfer(balance);
  }
}
