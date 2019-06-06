// Copyright (c) 2019 Clearmatics Technologies Ltd

// SPDX-License-Identifier: LGPL-3.0+

pragma solidity ^0.5.0;

import "zos-lib/contracts/Initializable.sol";
import "openzeppelin-eth/contracts/math/SafeMath.sol";


contract SampleContract is Initializable{
    using SafeMath for uint256;

    uint256 public _value;

    function initialize(uint256 value) public initializer {
        _value = value;
    }

    function squareValue() public {
        _value = _value.mul(_value);
    }


}
