// Copyright 2024 Tether Operations Limited
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
'use strict'

/** @typedef {import('./abstract-swap-protocol.js').SwapProtocolConfig} SwapProtocolConfig */
/** @typedef {import('./abstract-swap-protocol.js').SwapOptions} SwapOptions */
/** @typedef {import('./abstract-swap-protocol.js').SwapResult} SwapResult */

/** @typedef {import('./abstract-bridge-protocol.js').BridgeProtocolConfig} BridgeProtocolConfig */
/** @typedef {import('./abstract-bridge-protocol.js').BridgeOptions} BridgeOptions */
/** @typedef {import('./abstract-bridge-protocol.js').BridgeResult} BridgeResult */

/** @typedef {import('./abstract-lending-protocol.js').SupplyOptions} SupplyOptions */
/** @typedef {import('./abstract-lending-protocol.js').SupplyResult} SupplyResult */
/** @typedef {import('./abstract-lending-protocol.js').WithdrawOptions} WithdrawOptions */
/** @typedef {import('./abstract-lending-protocol.js').WithdrawResult} WithdrawResult */
/** @typedef {import('./abstract-lending-protocol.js').BorrowOptions} BorrowOptions */
/** @typedef {import('./abstract-lending-protocol.js').BorrowResult} BorrowResult */
/** @typedef {import('./abstract-lending-protocol.js').RepayOptions} RepayOptions */
/** @typedef {import('./abstract-lending-protocol.js').RepayResult} RepayResult */

export { default as AbstractSwapProtocol } from './abstract-swap-protocol.js'

export { default as AbstractBridgeProtocol } from './abstract-bridge-protocol.js'

export { default as AbstractLendingProtocol } from './abstract-lending-protocol.js'
