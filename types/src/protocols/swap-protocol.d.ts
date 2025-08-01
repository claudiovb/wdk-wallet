/** @abstract */
export default abstract class AbstractSwapProtocol {
    /**
     * Creates a new swap protocol.
     *
     * @param {IWalletAccount} account - The wallet account to use to interact with the protocol.
     * @param {SwapProtocolConfig} [config] - The swap protocol configuration.
     */
    constructor(account: IWalletAccount, config?: SwapProtocolConfig);
    /**
     * The wallet account to use to interact with the protocol.
     *
     * @protected
     * @type {IWalletAccount}
     */
    protected _account: IWalletAccount;
    /**
     * The swap protocol configuration.
     *
     * @protected
     * @type {SwapProtocolConfig}
     */
    protected _config: SwapProtocolConfig;
    /**
     * Swaps a pair of tokens.
     *
     * @abstract
     * @param {SwapOptions} options - The swap's options.
     * @returns {Promise<SwapResult>} The swap's result.
     */
    abstract swap(options: SwapOptions): Promise<SwapResult>;
    /**
     * Quotes the costs of a swap operation.
     *
     * @see {@link swap}
     * @abstract
     * @param {SwapOptions} options - The swap's options.
     * @returns {Promise<Omit<SwapResult, 'hash'>>} The swap's quotes.
     */
    abstract quoteSwap(options: SwapOptions): Promise<Omit<SwapResult, "hash">>;
}
export type IWalletAccount = import("../wallet-account.js").IWalletAccount;
export type SwapProtocolConfig = {
    /**
     * - The maximum fee amount for swap operations.
     */
    swapMaxFee?: number;
};
export type SwapOptions = {
    /**
     * - The address of the token to sell.
     */
    tokenIn: string;
    /**
     * - The address of the token to buy.
     */
    tokenOut: string;
    /**
     * - The amount of input tokens to sell (in base unit).
     */
    tokenInAmount?: number;
    /**
     * - The amount of output tokens to buy (in base unit).
     */
    tokenOutAmount?: number;
    /**
     * - The address that will receive the output tokens. If not set, the account itself will receive the funds.
     */
    to?: string;
};
export type SwapResult = {
    /**
     * - The hash of the swap operation.
     */
    hash: string;
    /**
     * - The gas cost.
     */
    fee: number;
    /**
     * - The amount of input tokens sold.
     */
    tokenInAmount: number;
    /**
     * - The amount of output tokens bought.
     */
    tokenOutAmount: number;
};
