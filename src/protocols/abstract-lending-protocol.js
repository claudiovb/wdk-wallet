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
 * @typedef {Object} SupplyOptions
 * @property {string} token - The address of the token to supply.
 * @property {number} amount - The amount of tokens to supply (in base unit).
 * @property {string} [onBehalfOf] - The address on behalf of which the supply operation should be performed. If not set, the supply operation will be performed on behalf of the account itself.
 */

/**
 * @typedef {Object} SupplyResult
 * @property {string} hash - The hash of the supply operation.
 * @property {number} fee - The gas cost.
 */

/**
 * @typedef {Object} WithdrawOptions
 * @property {string} token - The address of the token to withdraw.
 * @property {number} amount - The amount of tokens to withdraw (in base unit).
 * @property {string} [to] - The address that should receive the funds. If not set, the account itself will receive the tokens.
 */

/**
 * @typedef {Object} WithdrawResult
 * @property {string} hash - The hash of the withdraw operation.
 * @property {number} fee - The gas cost.
 */

/**
 * @typedef {Object} BorrowOptions
 * @property {string} token - The address of the token to borrow.
 * @property {number} amount - The amount of tokens to borrow (in base unit).
 * @property {string} [onBehalfOf] - The address on behalf of which the borrow operation should be performed. If not set, the borrow operation will be performed on behalf of the account itself.
 */

/**
 * @typedef {Object} BorrowResult
 * @property {string} hash - The hash of the borrow operation.
 * @property {number} fee - The gas cost.
 */

/**
 * @typedef {Object} RepayOptions
 * @property {string} token - The address of the token to repay.
 * @property {number} amount - The amount of tokens to repay (in base unit).
 * @property {string} [onBehalfOf] - The address on behalf of which the repay operation should be performed. If not set, the repay operation will be performed on behalf of the account itself.
 */

/**
 * @typedef {Object} RepayResult
 * @property {string} hash - The hash of the repay operation.
 * @property {number} fee - The gas cost.
 */

/** @abstract */
export default class AbstractLendingProtocol {
  /**  
   * Creates a new lending protocol.
   * 
   * @param {IWalletAccount} account - The wallet account to use to interact with the protocol.
   */
  constructor(account) {
    /**
     * The wallet account to use to interact with the protocol.
     * 
     * @protected
     * @type {IWalletAccount}
     */
    this._account = account
  }

  /**
   * Supplies a specific token amount to the lending pool.
   *
   * @abstract
   * @param {SupplyOptions} options - The supply's options.
   * @returns {Promise<SupplyResult>} The supply's result.
   */
  async supply(options) {
    throw new NotImplementedError('supply(options)')
  }

  /**
   * Quotes the costs of a supply operation.
   *
   * @see {@link supply}
   * @abstract
   * @param {SupplyOptions} options - The supply's options.
   * @returns {Promise<Omit<SupplyResult, 'hash'>>} The supply's costs.
   */
  async quoteSupply(options) {
    throw new NotImplementedError('quoteSupply(options)')
  }

  /**
   * Withdraws a specific token amount from the pool.
   *
   * @abstract
   * @param {WithdrawOptions} options - The withdraw's options.
   * @returns {Promise<WithdrawResult>} The withdraw's result.
   */
  async withdraw(options) {
    throw new NotImplementedError('withdraw(options)')
  }

  /**
   * Quotes the costs of a withdraw operation.
   *
   * @see {@link withdraw}
   * @abstract
   * @param {WithdrawOptions} options - The withdraw's options.
   * @returns {Promise<Omit<WithdrawResult, 'hash'>>} The withdraw's costs.
   */
  async quoteWithdraw(options) {
    throw new NotImplementedError('quoteWithdraw(options)')
  }

  /**
   * Borrows a specific token amount.
   *
   * @abstract
   * @param {BorrowOptions} options - The borrow's options.
   * @returns {Promise<BorrowResult>} The borrow's result.
   */
  async borrow(options) {
    throw new NotImplementedError('borrow(options)')
  }

  /**
   * Quotes the costs of a borrow operation.
   *
   * @see {@link borrow}
   * @abstract
   * @param {BorrowOptions} options - The borrow's options.
   * @returns {Promise<Omit<BorrowResult, 'hash'>>} The borrow's costs.
   */
  async quoteBorrow(options) {
    throw new NotImplementedError('quoteBorrow(options)')
  }

  /**
   * Repays a specific token amount.
   *
   * @abstract
   * @param {RepayOptions} options - The borrow's options.
   * @returns {Promise<RepayResult>} The repay's result.
   */
  async repay(options) {
    throw new NotImplementedError('repay(options)')
  }

  /**
   * Quotes the costs of a repay operation.
   *
   * @see {@link repay}
   * @abstract
   * @param {RepayOptions} options - The repay's options.
   * @returns {Promise<Omit<RepayResult, 'hash'>>} The repay's costs.
   */
  async quoteRepay(options) {
    throw new NotImplementedError('quoteRepay(options)')
  }
}
