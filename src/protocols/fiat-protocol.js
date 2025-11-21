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

import { NotImplementedError } from '../errors.js'

/** @typedef {import('../wallet-account-read-only.js').IWalletAccountReadOnly} IWalletAccountReadOnly */

/** @typedef {import('../wallet-account.js').IWalletAccount} IWalletAccount */

/**
 * Standardized status for an on/off-ramp transaction.
 * @typedef {'in_progress' | 'failed' | 'completed'} WdkFiatTransactionStatus
 */

/**
 * A protocol-agnostic, standardized object representing the details of an on/off-ramp transaction.
 * @typedef {object} WdkFiatTransactionDetail
 * @property {WdkFiatTransactionStatus} status - The current status of the transaction.
 * @property {string} cryptoAsset - The provider-specific code of the crypto asset (e.g., 'btc').
 * @property {string} fiatCurrency - The currency's ISO 4217 code (e.g., 'USD').
 * @property {object} [metadata] - Provider-specific raw data for this transaction.
 */

/**
 * A protocol-agnostic, standardized object representing a supported crypto asset.
 * @typedef {object} WdkFiatSupportedAsset
 * @property {string} code -Provider-specific asset code for the crypto asset.
 * @property {string} networkCode - The network code for the asset, if applicable (e.g., 'ethereum', 'tron').
 * @property {number} precision - The number of decimal places for the asset.
 * @property {string} [name] - The asset's full name (e.g., 'Bitcoin').
 * @property {object} [metadata] - Provider-specific raw data for this asset.
 */

/**
 * A protocol-agnostic, standardized object representing a supported fiat currency.
 * @typedef {object} WdkFiatSupportedCurrency
 * @property {string} code - The currency's ISO 4217 code (e.g., 'USD').
 * @property {number} precision - The number of decimal places for the currency.
 * @property {string} [name] - The currency's full name (e.g., 'United States Dollar').
 * @property {object} [metadata] - Provider-specific raw data for this currency.
 */

/**
 * A protocol-agnostic, standardized object representing a supported country.
 * @typedef {object} WdkFiatSupportedCountry
 * @property {string} code - The country's ISO 3166-1 alpha-2 or alpha-3 code.
 * @property {boolean} isBuyAllowed - Whether buying is supported in this country.
 * @property {boolean} isSellAllowed - Whether selling is supported in this country.
 * @property {string} [name] - The country's common name.
 * @property {object} [metadata] - Provider-specific raw data for this region.
 */

/**
 * @interface
 */
export class IFiatProtocol {
  /**
   * Generates a widget URL for a user to purchase a crypto asset with fiat currency.
   * @param {string} cryptoAsset - The provider-specific code of the crypto asset to purchase.
   * @param {string} fiatCurrency - The currency's ISO 4217 code (e.g., 'USD').
   * @param {number} amount - The amount of crypto asset to buy, in its main unit (e.g., 1.50 for 1.50 ETH).
   * @param {string} [recipient] - The wallet address to receive the purchased crypto asset.
   * @param {object} [config] - Provider-specific configuration for the buy operation.
   * @returns {Promise<string>} The URL for the user to complete the purchase.
   */
  async buy (cryptoAsset, fiatCurrency, amount, recipient, config) {
    throw new NotImplementedError('buy(cryptoAsset, fiatCurrency, amount, recipient, config)')
  }

  /**
   * Generates a widget URL for a user to sell a crypto asset for fiat currency.
   * @param {string} cryptoAsset - The provider-specific code of the crypto asset to sell.
   * @param {string} fiatCurrency - The currency's ISO 4217 code (e.g., 'USD').
   * @param {number} amount - The amount of crypto asset to sell, in its main unit (e.g., 0.5 for 0.5 ETH).
   * @param {string} [refundAddress] - The wallet address to receive refunds in case of failure.
   * @param {object} [config] - Provider-specific configuration for the sell operation.
   * @returns {Promise<string>} The URL for the user to complete the sale.
   */
  async sell (cryptoAsset, fiatCurrency, amount, refundAddress, config) {
    throw new NotImplementedError('sell(cryptoAsset, fiatCurrency, amount, refundAddress, config)')
  }

  /**
   * Retrieves the details of a specific transaction from the provider.
   * @param {'buy' | 'sell'} direction - The direction of the transaction.
   * @param {string} txId - The unique identifier of the transaction.
   * @returns {Promise<WdkFiatTransactionDetail>} The transaction details.
   */
  async getTransactionDetail (direction, txId) {
    throw new NotImplementedError('getTransactionDetail(direction, txId)')
  }

  /**
   * Retrieves a list of supported crypto assets from the provider.
   * @returns {Promise<WdkFiatSupportedAsset[]>} An array of supported crypto assets.
   */
  async getSupportedCryptoAssets () {
    throw new NotImplementedError('getSupportedCryptoAssets()')
  }

  /**
   * Retrieves a list of supported fiat currencies from the provider.
   * @returns {Promise<WdkFiatSupportedCurrency[]>} An array of supported fiat currencies.
   */
  async getSupportedFiatCurrencies () {
    throw new NotImplementedError('getSupportedFiatCurrencies()')
  }

  /**
   * Retrieves a list of supported countries from the provider.
   * @returns {Promise<WdkFiatSupportedCountry[]>} An array of supported countries.
   */
  async getSupportedCountries () {
    throw new NotImplementedError('getSupportedCountries()')
  }
}

/**
 * @abstract
 * @implements {IFiatProtocol}
 */
export default class FiatProtocol {
  /**
   * Creates a new fiat protocol with read-only account.
   *
   * @overload
   * @param {IWalletAccountReadOnly} account - The wallet account to use to interact with the protocol.
   */

  /**
   * Creates a new fiat protocol with read-only account.
   *
   * @overload
   * @param {IWalletAccount} account - The wallet account to use to interact with the protocol.
   */
  constructor (account) {
    /**
     * The wallet account to use to interact with the protocol.
     *
     * @protected
     * @type {IWalletAccountReadOnly | IWalletAccount}
     */
    this._account = account
  }

  /**
   * Generates a URL for a user to purchase a crypto asset with fiat currency.
   * @param {string} cryptoAsset - The provider-specific code of the crypto asset to purchase.
   * @param {string} fiatCurrency - The currency's ISO 4217 code (e.g., 'USD').
   * @param {number} amount - The amount of crypto asset to buy, in its main unit (e.g., 1.50 for 1.50 ETH).
   * @param {string} [recipient] - The wallet address to receive the purchased crypto asset.
   * @param {object} [config] - Provider-specific configuration for the buy operation.
   * @returns {Promise<string>} The URL for the user to complete the purchase.
   */
  async buy (cryptoAsset, fiatCurrency, amount, recipient, config) {
    throw new NotImplementedError('buy(cryptoAsset, fiatCurrency, amount, recipient, config)')
  }

  /**
   * Generates a URL for a user to sell a crypto asset for fiat currency.
   * @param {string} cryptoAsset - The provider-specific code of the crypto asset to sell.
   * @param {string} fiatCurrency - The currency's ISO 4217 code (e.g., 'USD').
   * @param {number} amount - The amount of crypto asset to sell, in its main unit (e.g., 0.5 for 0.5 ETH).
   * @param {string} [refundAddress] - The wallet address to receive refunds in case of failure.
   * @param {object} [config] - Provider-specific configuration for the sell operation.
   * @returns {Promise<string>} The URL for the user to complete the sale.
   */
  async sell (cryptoAsset, fiatCurrency, amount, refundAddress, config) {
    throw new NotImplementedError('sell(cryptoAsset, fiatCurrency, amount, refundAddress, config)')
  }

  /**
   * Retrieves the details of a specific transaction from the provider.
   * @param {'buy' | 'sell'} direction - The direction of the transaction.
   * @param {string} txId - The unique identifier of the transaction.
   * @returns {Promise<WdkFiatTransactionDetail>} The transaction details.
   */
  async getTransactionDetail (direction, txId) {
    throw new NotImplementedError('getTransactionDetail(direction, txId)')
  }

  /**
   * Retrieves a list of supported crypto assets from the provider.
   * @returns {Promise<WdkFiatSupportedAsset[]>} An array of supported crypto assets.
   */
  async getSupportedCryptoAssets () {
    throw new NotImplementedError('getSupportedCryptoAssets()')
  }

  /**
   * Retrieves a list of supported fiat currencies from the provider.
   * @returns {Promise<WdkFiatSupportedCurrency[]>} An array of supported fiat currencies.
   */
  async getSupportedFiatCurrencies () {
    throw new NotImplementedError('getSupportedFiatCurrencies()')
  }

  /**
   * Retrieves a list of supported countries or regions from the provider.
   * @returns {Promise<WdkFiatSupportedCountry[]>} An array of supported countries.
   */
  async getSupportedCountries () {
    throw new NotImplementedError('getSupportedCountries()')
  }
}