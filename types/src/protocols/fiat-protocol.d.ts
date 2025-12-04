/**
 * @interface
 */
export interface IFiatProtocol {
    /**
     * Generates a widget URL for a user to purchase a crypto asset with fiat currency.
     * @param {BuyOptions} options - The options for the buy operation.
     * @returns {Promise<string>} The URL for the user to complete the purchase.
     */
    buy(options: BuyOptions): Promise<string>;
    /**
     * Generates a widget URL for a user to sell a crypto asset for fiat currency.
     * @param {SellOptions} options - The options for the sell operation.
     * @returns {Promise<string>} The URL for the user to complete the sale.
     */
    sell(options: SellOptions): Promise<string>;
    /**
     * Retrieves the details of a specific transaction from the provider.
     * @param {string} txId - The unique identifier of the transaction.
     * @returns {Promise<FiatTransactionDetail>} The transaction details.
     */
    getTransactionDetail(txId: string): Promise<FiatTransactionDetail>;
    /**
     * Retrieves a list of supported crypto assets from the provider.
     * @returns {Promise<SupportedCryptoAsset[]>} An array of supported crypto assets.
     */
    getSupportedCryptoAssets(): Promise<SupportedCryptoAsset[]>;
    /**
     * Retrieves a list of supported fiat currencies from the provider.
     * @returns {Promise<SupportedFiatCurrency[]>} An array of supported fiat currencies.
     */
    getSupportedFiatCurrencies(): Promise<SupportedFiatCurrency[]>;
    /**
     * Retrieves a list of supported countries from the provider.
     * @returns {Promise<SupportedCountry[]>} An array of supported countries.
     */
    getSupportedCountries(): Promise<SupportedCountry[]>;
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
     * @param {IWalletAccountReadOnly} [account] - The wallet account to use to interact with the protocol.
     */
    constructor(account?: IWalletAccountReadOnly);
    /**
     * Creates a new fiat protocol with read-only account.
     *
     * @overload
     * @param {IWalletAccount} [account] - The wallet account to use to interact with the protocol.
     */
    constructor(account?: IWalletAccount);
    /**
     * The wallet account to use to interact with the protocol.
     *
     * @protected
     * @type {IWalletAccountReadOnly | IWalletAccount | undefined}
     */
    protected _account: IWalletAccountReadOnly | IWalletAccount | undefined;
    /**
     * Generates a URL for a user to purchase a crypto asset with fiat currency.
     * @abstract
     * @param {BuyOptions} options - The options for the buy operation.
     * @returns {Promise<string>} The URL for the user to complete the purchase.
     */
    abstract buy(options: BuyOptions): Promise<string>;
    /**
     * Generates a URL for a user to sell a crypto asset for fiat currency.
     * @abstract
     * @param {SellOptions} options - The options for the sell operation.
     * @returns {Promise<string>} The URL for the user to complete the sale.
     */
    abstract sell(options: SellOptions): Promise<string>;
    /**
     * Retrieves the details of a specific transaction from the provider.
     * @abstract
     * @param {string} txId - The unique identifier of the transaction.
     * @returns {Promise<FiatTransactionDetail>} The transaction details.
     */
    abstract getTransactionDetail(txId: string): Promise<FiatTransactionDetail>;
    /**
     * Retrieves a list of supported crypto assets from the provider.
     * @abstract
     * @returns {Promise<SupportedCryptoAsset[]>} An array of supported crypto assets.
     */
    abstract getSupportedCryptoAssets(): Promise<SupportedCryptoAsset[]>;
    /**
     * Retrieves a list of supported fiat currencies from the provider.
     * @abstract
     * @returns {Promise<SupportedFiatCurrency[]>} An array of supported fiat currencies.
     */
    abstract getSupportedFiatCurrencies(): Promise<SupportedFiatCurrency[]>;
    /**
     * Retrieves a list of supported countries or regions from the provider.
     * @abstract
     * @returns {Promise<SupportedCountry[]>} An array of supported countries.
     */
    abstract getSupportedCountries(): Promise<SupportedCountry[]>;
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
export type FiatTransactionDetail<M = Record<string, unknown>> = {
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
    metadata?: M;
};
/**
 * A protocol-agnostic, standardized object representing a supported crypto asset.
 */
export type SupportedCryptoAsset<M = Record<string, unknown>> = {
    /**
     * - Provider-specific asset code for the crypto asset.
     */
    code: string;
    /**
     * - The network code for the asset, if applicable (e.g., 'ethereum', 'tron').
     */
    networkCode: string;
    /**
     * - The asset's full name (e.g., 'Bitcoin').
     */
    name?: string;
    /**
     * - Provider-specific raw data for this asset.
     */
    metadata?: M;
};
/**
 * A protocol-agnostic, standardized object representing a supported fiat currency.
 */
export type SupportedFiatCurrency<M = Record<string, unknown>> = {
    /**
     * - The currency's ISO 4217 code (e.g., 'USD').
     */
    code: string;
    /**
     * - The currency's full name (e.g., 'United States Dollar').
     */
    name?: string;
    /**
     * - Provider-specific raw data for this currency.
     */
    metadata?: M;
};
/**
 * A protocol-agnostic, standardized object representing a supported country.
 */
export type SupportedCountry<M = Record<string, unknown>> = {
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
    metadata?: M;
};
export type BuyOptions = BuyCommonOptions & (BuyExactCryptoAmountOptions | BuyWithFiatAmountOptions);
export type BuyCommonOptions = {
    /**
     * - The provider-specific code of the crypto asset to purchase.
     */
    cryptoAsset: string;
    /**
     * - The currency's ISO 4217 code (e.g., 'USD').
     */
    fiatCurrency: string;
    /**
     * - The wallet address to receive the purchased crypto asset. Defaults to the account's address.
     */
    recipient?: string;
};
export type BuyExactCryptoAmountOptions = {
    /**
     * - The amount of crypto asset to buy, in its main unit (e.g., 1.50 for 1.50 ETH).
     */
    cryptoAmount: number;
    /**
     * - The amount of fiat currency to spend, in its main unit (e.g., 1.50 for 1.50 USD).
     */
    fiatAmount?: never;
};
export type BuyWithFiatAmountOptions = {
    /**
     * - The amount of fiat currency to spend, in its main unit (e.g., 1.50 for 1.50 USD).
     */
    fiatAmount: number;
    /**
     * - The amount of crypto asset to buy, in its main unit (e.g., 1.50 for 1.50 ETH).
     */
    cryptoAmount?: never;
};
export type SellOptions = SellCommonOptions & (SellExactCryptoAmountOptions | SellForFiatAmountOptions);
export type SellCommonOptions = {
    /**
     * - The provider-specific code of the crypto asset to sell.
     */
    cryptoAsset: string;
    /**
     * - The currency's ISO 4217 code (e.g., 'USD').
     */
    fiatCurrency: string;
    /**
     * - The wallet address to receive refunds in case of failure. Defaults to the account's address.
     */
    refundAddress?: string;
};
export type SellExactCryptoAmountOptions = {
    /**
     * - The amount of crypto asset to sell, in its main unit (e.g., 1.50 for 1.50 ETH).
     */
    cryptoAmount: number;
    /**
     * - The amount of fiat currency to receive, in its main unit (e.g., 1.50 for 1.50 USD).
     */
    fiatAmount?: never;
};
export type SellForFiatAmountOptions = {
    /**
     * - The amount of fiat currency to receive, in its main unit (e.g., 1.50 for 1.50 USD).
     */
    fiatAmount: number;
    /**
     * - The amount of crypto asset to sell, in its main unit (e.g., 1.50 for 1.50 ETH).
     */
    cryptoAmount?: never;
};
