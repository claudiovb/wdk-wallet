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

import * as bip39 from 'bip39'

import { NotImplementedError } from './wallet-account.js'

/** @typedef {import('./wallet-account.js').default} IWalletAccount */

/**
 * @typedef {Object} WalletConfig
 * @property {number} [transferMaxFee] - The maximum fee amount for transfer operations.
 */

/**
 * @typedef {Object} FeeRates
 * @property {number} normal - The fee rate for transaction sent with normal priority (in base unit).
 * @property {number} fast - The fee rate for transaction sent with fast priority (in base unit).
 */

/** @abstract */
export default class AbstractWalletManager {
  /**
   * Creates a new wallet manager.
   *
   * @param {string | Uint8Array} seed - The wallet's [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) seed phrase.
   * @param {WalletConfig} [config] - The wallet configuration.
   */
  constructor (seed, config = { }) {
    if (typeof seed === 'string') {
      if (!AbstractWalletManager.isValidSeedPhrase(seed)) {
        throw new Error('Invalid seed phrase.')
      }

      seed = bip39.mnemonicToSeedSync(seed)
    }

    /** @private */
    this._seed = seed

    /**
     * The wallet configuration.
     *
     * @protected
     * @type {WalletConfig}
     */
    this._config = config
  }

  /**
   * Returns a random [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) seed phrase.
   *
   * @returns {string} The seed phrase.
   */
  static getRandomSeedPhrase () {
    return bip39.generateMnemonic()
  }

  /**
   * Checks if a seed phrase is valid.
   *
   * @param {string} seedPhrase - The seed phrase.
   * @returns {boolean} True if the seed phrase is valid.
   */
  static isValidSeedPhrase (seedPhrase) {
    return bip39.validateMnemonic(seedPhrase)
  }

  /**
   * The seed phrase of the wallet.
   *
   * @type {Uint8Array}
   */
  get seed () {
    return this._seed
  }

  /**
   * Returns the wallet account at a specific index (see [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)).
   *
   * @abstract
   * @param {number} [index] - The index of the account to get (default: 0).
   * @returns {Promise<IWalletAccount>} The account.
   */
  async getAccount (index = 0) {
    throw new NotImplementedError('getAccount(index)')
  }

  /**
   * Returns the wallet account at a specific [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) derivation path.
   *
   * @abstract
   * @param {string} path - The derivation path (e.g. "0'/0/0").
   * @returns {Promise<IWalletAccount>} The account.
   */
  async getAccountByPath (path) {
    throw new NotImplementedError('getAccountByPath(path)')
  }

  /**
   * Returns the current fee rates.
   *
   * @abstract
   * @returns {Promise<FeeRates>} The fee rates.
   */
  async getFeeRates () {
    throw new NotImplementedError('getFeeRates()')
  }

  /**
   * Disposes all the wallet accounts, erasing their private keys from the memory.
   *
   * @abstract
   */
  dispose () {
    throw new NotImplementedError('dispose()')
  }
}
