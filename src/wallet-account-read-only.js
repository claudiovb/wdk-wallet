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

import { NotImplementedError } from './errors.js'

/**
 * @typedef {Object} Transaction
 * @property {string} to - The transaction's recipient.
 * @property {number} value - The amount of native tokens to send to the recipient (in base unit).
 */

/**
 * @typedef {Object} TransactionResult
 * @property {string} hash - The transaction's hash.
 * @property {number} fee - The gas cost.
 */

/**
 * @typedef {Object} TransferOptions
 * @property {string} token - The address of the token to transfer.
 * @property {string} recipient - The address of the recipient.
 * @property {number} amount - The amount of tokens to transfer to the recipient (in base units).
 */

/**
 * @typedef {Object} TransferResult
 * @property {string} hash - The hash of the transfer operation.
 * @property {number} fee - The gas cost.
 */

/** @interface */
export class IWalletAccountReadOnly {
  /**
   * Returns the account's address.
   *
   * @returns {Promise<string>} The account's address.
   */
  async getAddress () {
    throw new NotImplementedError('getAddress()')
  }

  /**
   * Returns the account's native token balance.
   *
   * @returns {Promise<number>} The native token balance.
   */
  async getBalance () {
    throw new NotImplementedError('getBalance()')
  }

  /**
   * Returns the account balance for a specific token.
   *
   * @param {string} tokenAddress - The smart contract address of the token.
   * @returns {Promise<number>} The token balance.
   */
  async getTokenBalance (tokenAddress) {
    throw new NotImplementedError('getTokenBalance(tokenAddress)')
  }

  /**
   * Quotes the costs of a send transaction operation.
   *
   * @see {@link sendTransaction}
   * @param {Transaction} tx - The transaction.
   * @returns {Promise<Omit<TransactionResult, 'hash'>>} The transaction's quotes.
   */
  async quoteSendTransaction (tx) {
    throw new NotImplementedError('quoteSendTransaction(tx)')
  }

  /**
   * Quotes the costs of a transfer operation.
   *
   * @see {@link transfer}
   * @param {TransferOptions} options - The transfer's options.
   * @returns {Promise<Omit<TransferResult, 'hash'>>} The transfer's quotes.
   */
  async quoteTransfer (options) {
    throw new NotImplementedError('quoteTransfer(options)')
  }

  /**
   * Returns a transaction's receipt.
   *
   * @param {string} hash - The transaction's hash.
   * @returns {Promise<unknown | null>} The receipt, or null if the transaction has not been included in a block yet.
   */
  async getTransactionReceipt (hash) {
    throw new NotImplementedError('getTransactionReceipt(hash)')
  }
}

/** 
 * @abstract
 * @implements {IWalletAccountReadOnly}
 */
export default class AbstractWalletAccountReadOnly {
  /**
   * Creates a new read-only wallet account.
   *
   * @param {string} [address] - The account's address. If not provided, it must be set after construction with the {@link setAddress} method.
   */
  constructor (address) {
    /** @private */
    this._address = address
  }

  /**
   * Sets the account's address.
   * 
   * @param {string} address - The account's address.
   */
  setAddress (address) {
    this._address = address
  }

  async getAddress () {
    if (!this._address) {
      throw new Error("Account's address not set.")
    }

    return this._address
  }

  /** @abstract */
  async getBalance () {
    throw new NotImplementedError('getBalance()')
  }

  /** @abstract */
  async getTokenBalance (tokenAddress) {
    throw new NotImplementedError('getTokenBalance(tokenAddress)')
  }

  /** @abstract */
  async quoteSendTransaction (tx) {
    throw new NotImplementedError('quoteSendTransaction(tx)')
  }

  /** @abstract */
  async quoteTransfer (options) {
    throw new NotImplementedError('quoteTransfer(options)')
  }

  /** @abstract */
  async getTransactionReceipt (hash) {
    throw new NotImplementedError('getTransactionReceipt(hash)')
  }
}
