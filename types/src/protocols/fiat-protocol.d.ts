/**
 * @interface
 */
export interface IFiatProtocol {
    /**
     * Generates a widget URL for a user to purchase a crypto asset with fiat currency.
     * @param {string} cryptoAsset - The provider-specific code of the crypto asset to purchase.
     * @param {string} fiatCurrency - The currency's ISO 4217 code (e.g., 'USD').
     * @param {number} amount - The amount of crypto asset to buy, in its main unit (e.g., 1.50 for 1.50 ETH).
     * @param {string} [recipient] - The wallet address to receive the purchased crypto asset.
     * @param {Record<string, any>} [config] - Provider-specific configuration for the buy operation.
     * @returns {Promise<string>} The URL for the user to complete the purchase.
     */
    buy(cryptoAsset: string, fiatCurrency: string, amount: number, recipient?: string, config?: Record<string, any>): Promise<string>;
    /**
     * Generates a widget URL for a user to sell a crypto asset for fiat currency.
     * @param {string} cryptoAsset - The provider-specific code of the crypto asset to sell.
     * @param {string} fiatCurrency - The currency's ISO 4217 code (e.g., 'USD').
     * @param {number} amount - The amount of crypto asset to sell, in its main unit (e.g., 0.5 for 0.5 ETH).
     * @param {string} [refundAddress] - The wallet address to receive refunds in case of failure.
     * @param {Record<string, any>} [config] - Provider-specific configuration for the sell operation.
     * @returns {Promise<string>} The URL for the user to complete the sale.
     */
    sell(cryptoAsset: string, fiatCurrency: string, amount: number, refundAddress?: string, config?: Record<string, any>): Promise<string>;
    /**
     * Retrieves the details of a specific transaction from the provider.
     * @param {'buy' | 'sell'} direction - The direction of the transaction.
     * @param {string} txId - The unique identifier of the transaction.
     * @returns {Promise<FiatTransactionDetail>} The transaction details.
     */
    getTransactionDetail(direction: "buy" | "sell", txId: string): Promise<FiatTransactionDetail>;
    /**
     * Retrieves a list of supported crypto assets from the provider.
     * @returns {Promise<FiatSupportedAsset[]>} An array of supported crypto assets.
     */
    getSupportedCryptoAssets(): Promise<FiatSupportedAsset[]>;
    /**
     * Retrieves a list of supported fiat currencies from the provider.
     * @returns {Promise<FiatSupportedCurrency[]>} An array of supported fiat currencies.
     */
    getSupportedFiatCurrencies(): Promise<FiatSupportedCurrency[]>;
    /**
     * Retrieves a list of supported countries from the provider.
     * @returns {Promise<FiatSupportedCountry[]>} An array of supported countries.
     */
    getSupportedCountries(): Promise<FiatSupportedCountry[]>;
}
/**
 * @abstract
 * @implements {IFiatProtocol}
 */
export default abstract class FiatProtocol implements IFiatProtocol {
    /**
     * Creates a new fiat protocol with read-only account.
     *
     * @overload
     * @param {IWalletAccountReadOnly} account - The wallet account to use to interact with the protocol.
     */
    constructor(account: IWalletAccountReadOnly);
    /**
     * Creates a new fiat protocol with read-only account.
     *
     * @overload
     * @param {IWalletAccount} account - The wallet account to use to interact with the protocol.
     */
    constructor(account: IWalletAccount);
    /**
     * The wallet account to use to interact with the protocol.
     *
     * @protected
     * @type {IWalletAccountReadOnly | IWalletAccount}
     */
    protected _account: IWalletAccountReadOnly | IWalletAccount;
    /**
     * Generates a URL for a user to purchase a crypto asset with fiat currency.
     * @abstract
     * @param {string} cryptoAsset - The provider-specific code of the crypto asset to purchase.
     * @param {string} fiatCurrency - The currency's ISO 4217 code (e.g., 'USD').
     * @param {number} amount - The amount of crypto asset to buy, in its main unit (e.g., 1.50 for 1.50 ETH).
     * @param {string} [recipient] - The wallet address to receive the purchased crypto asset.
     * @param {Record<string, any>} [config] - Provider-specific configuration for the buy operation.
     * @returns {Promise<string>} The URL for the user to complete the purchase.
     */
    abstract buy(cryptoAsset: string, fiatCurrency: string, amount: number, recipient?: string, config?: Record<string, any>): Promise<string>;
    /**
     * Generates a URL for a user to sell a crypto asset for fiat currency.
     * @abstract
     * @param {string} cryptoAsset - The provider-specific code of the crypto asset to sell.
     * @param {string} fiatCurrency - The currency's ISO 4217 code (e.g., 'USD').
     * @param {number} amount - The amount of crypto asset to sell, in its main unit (e.g., 0.5 for 0.5 ETH).
     * @param {string} [refundAddress] - The wallet address to receive refunds in case of failure.
     * @param {Record<string, any>} [config] - Provider-specific configuration for the sell operation.
     * @returns {Promise<string>} The URL for the user to complete the sale.
     */
    abstract sell(cryptoAsset: string, fiatCurrency: string, amount: number, refundAddress?: string, config?: Record<string, any>): Promise<string>;
    /**
     * Retrieves the details of a specific transaction from the provider.
     * @abstract
     * @param {'buy' | 'sell'} direction - The direction of the transaction.
     * @param {string} txId - The unique identifier of the transaction.
     * @returns {Promise<FiatTransactionDetail>} The transaction details.
     */
    abstract getTransactionDetail(direction: "buy" | "sell", txId: string): Promise<FiatTransactionDetail>;
    /**
     * Retrieves a list of supported crypto assets from the provider.
     * @abstract
     * @returns {Promise<FiatSupportedAsset[]>} An array of supported crypto assets.
     */
    abstract getSupportedCryptoAssets(): Promise<FiatSupportedAsset[]>;
    /**
     * Retrieves a list of supported fiat currencies from the provider.
     * @abstract
     * @returns {Promise<FiatSupportedCurrency[]>} An array of supported fiat currencies.
     */
    abstract getSupportedFiatCurrencies(): Promise<FiatSupportedCurrency[]>;
    /**
     * Retrieves a list of supported countries or regions from the provider.
     * @abstract
     * @returns {Promise<FiatSupportedCountry[]>} An array of supported countries.
     */
    abstract getSupportedCountries(): Promise<FiatSupportedCountry[]>;
}
export type IWalletAccountReadOnly = import("../wallet-account-read-only.js").IWalletAccountReadOnly;
export type IWalletAccount = import("../wallet-account.js").IWalletAccount;
/**
 * Standardized status for an on/off-ramp transaction.
 */
export type FiatTransactionStatus = "in_progress" | "failed" | "completed";
/**
 * A protocol-agnostic, standardized object representing the details of an on/off-ramp transaction.
 */
export type FiatTransactionDetail = {
    /**
     * - The current status of the transaction.
     */
    status: FiatTransactionStatus;
    /**
     * - The provider-specific code of the crypto asset (e.g., 'btc').
     */
    cryptoAsset: string;
    /**
     * - The currency's ISO 4217 code (e.g., 'USD').
     */
    fiatCurrency: string;
    /**
     * - Provider-specific raw data for this transaction.
     */
    metadata?: Record<string, any>;
};
/**
 * A protocol-agnostic, standardized object representing a supported crypto asset.
 */
export type FiatSupportedAsset = {
    /**
     * -Provider-specific asset code for the crypto asset.
     */
    code: string;
    /**
     * - The network code for the asset, if applicable (e.g., 'ethereum', 'tron').
     */
    networkCode: string;
    /**
     * - The number of decimal places for the asset.
     */
    precision: number;
    /**
     * - The asset's full name (e.g., 'Bitcoin').
     */
    name?: string;
    /**
     * - Provider-specific raw data for this asset.
     */
    metadata?: Record<string, any>;
};
/**
 * A protocol-agnostic, standardized object representing a supported fiat currency.
 */
export type FiatSupportedCurrency = {
    /**
     * - The currency's ISO 4217 code (e.g., 'USD').
     */
    code: string;
    /**
     * - The number of decimal places for the currency.
     */
    precision: number;
    /**
     * - The currency's full name (e.g., 'United States Dollar').
     */
    name?: string;
    /**
     * - Provider-specific raw data for this currency.
     */
    metadata?: Record<string, any>;
};
/**
 * A protocol-agnostic, standardized object representing a supported country.
 */
export type FiatSupportedCountry = {
    /**
     * - The country's ISO 3166-1 alpha-2 or alpha-3 code.
     */
    code: string;
    /**
     * - Whether buying is supported in this country.
     */
    isBuyAllowed: boolean;
    /**
     * - Whether selling is supported in this country.
     */
    isSellAllowed: boolean;
    /**
     * - The country's common name.
     */
    name?: string;
    /**
     * - Provider-specific raw data for this region.
     */
    metadata?: Record<string, any>;
};