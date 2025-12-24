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

import { NotImplementedError } from './errors.js'

/** @typedef {import('./wallet-account.js').IWalletAccount} IWalletAccount */
/** @typedef {import('./isigner.js').ISigner} ISigner */

/** Signer resolution uses positional params: signerName (default: "default") or explicit signer. */

/**
 * @typedef {Object} FeeRates
 * @property {bigint} normal - The fee rate for transaction sent with normal priority.
 * @property {bigint} fast - The fee rate for transaction sent with fast priority.
 */

/** @abstract */
export default class WalletManager {
  /**
   * Creates a new wallet manager.
   *
   * @param {ISigner} signer - The default signer for the wallet.
   * @param {WalletConfig} [config] - The wallet configuration.
   */
  constructor (signer, config = { }) {
    this._signers = new Map()
    this._signers.set('default', signer)
    this._accounts = new Map()
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
   * Creates a new signer.
   *
   * @param {string} signerName - The signer name.
   * @param {ISigner} signer - The signer.
   */
  createSigner (signerName, signer) {
    throw new NotImplementedError('createSigner(signerName, signer)')
  }

  /**
   * Returns a signer.
   *
   * @param {string} signerName - The signer name.
   * @returns {ISigner} The signer.
   */
  // Maybe we should leave this method abstract and implement it in the concrete class?
  getSigner (signerName) {
    return this._signers.get(signerName)
  }

  /**
   * Returns the wallet account at a specific index (see [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)).
   *
   * @abstract
   * @param {number} [index] - The index of the account to get (default: 0).
   * @param {string} [signerName='default'] - The name of the signer to use.
   * @returns {Promise<IWalletAccount>} The account.
   */
  async getAccount (index = 0, signerName = 'default') {
    throw new NotImplementedError('getAccount(index)')
  }

  /**
   * Returns the wallet account at a specific [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) derivation path.
   *
   * @abstract
   * @param {string} path - The derivation path (e.g. "0'/0/0").
   * @param {string} [signerName='default'] - The name of the signer to use.
   * @returns {Promise<IWalletAccount>} The account.
   */
  async getAccountByPath (path, signerName = 'default') {
    throw new NotImplementedError('getAccountByPath(path)')
  }

  /**
   * Returns the current fee rates.
   *
   * @abstract
   * @returns {Promise<FeeRates>} The fee rates (in base unit).
   */
  async getFeeRates () {
    throw new NotImplementedError('getFeeRates()')
  }

  /**
   * Disposes all the wallet accounts, erasing their private keys from the memory.
   */
  dispose () {
    for (const signer of Object.values(this._signers)) {
      if (signer.isActive) {
        signer.dispose()
      }
    }
    for (const account of Object.values(this._accounts)) {
      if (account.isActive) {
        account.dispose()
      }
    }
    this._signers = {}
    this._accounts = {}
  }
}
