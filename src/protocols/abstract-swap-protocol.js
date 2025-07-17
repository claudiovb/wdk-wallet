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

import { NotImplementedError } from '../wallet-account.js'

/** @typedef {import('../wallet-account.js').default} IWalletAccount */

/**
 * @typedef {Object} SwapProtocolConfig
 * @property {number} [swapMaxFee] - The maximum fee amount for swap operations.
 */

/**
 * @typedef {Object} SwapOptions
 * @property {string} tokenIn - The address of the token to sell.
 * @property {string} tokenOut - The address of the token to buy.
 * @property {number} [tokenInAmount] - The amount of input tokens to sell (in base unit).
 * @property {number} [tokenOutAmount] - The amount of output tokens to buy (in base unit).
 */

/**
 * @typedef {Object} SwapResult
 * @property {string} hash - The hash of the swap operation.
 * @property {number} fee - The gas cost.
 * @property {number} tokenInAmount - The amount of input tokens sold.
 * @property {number} tokenOutAmount - The amount of output tokens bought.
 */

/** @abstract */
export default class AbstractSwapProtocol {
  /**  
   * Creates a new swap protocol.
   * 
   * @param {IWalletAccount} account - The wallet account to use to interact with the protocol.
   * @param {SwapProtocolConfig} [config] - The swap protocol configuration.
   */
  constructor (account, config = {}) {
    /**
     * The wallet account to use to interact with the protocol.
     * 
     * @protected
     * @type {IWalletAccount}
     */
    this._account = account

    /** 
     * The swap protocol configuration.
     * 
     * @protected
     * @type {SwapProtocolConfig}
     */
    this._config = config
  }

  /**
   * Swaps a pair of tokens.
   *
   * @abstract
   * @param {SwapOptions} options - The swap's options.
   * @returns {Promise<SwapResult>} The swap's result.
   */
  async swap (options) {
    throw new NotImplementedError('swap(options)')
  }

  /**
   * Quotes the costs of a swap operation.
   *
   * @see {@link swap}
   * @abstract
   * @param {SwapOptions} options - The swap's options.
   * @returns {Promise<Omit<SwapResult, 'hash'>>} The swap's quotes.
   */
  async quoteSwap (options) {
    throw new NotImplementedError('swap(options)')
  }
}
