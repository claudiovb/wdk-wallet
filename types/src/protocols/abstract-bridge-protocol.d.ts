/** @abstract */
export default abstract class AbstractBridgeProtocol {
    /**
     * Creates a new bridge protocol.
     *
     * @param {IWalletAccount} account - The wallet account to use to interact with the protocol.
     * @param {BridgeProtocolConfig} config - The bridge protocol configuration.
     */
    constructor(account: IWalletAccount, config: BridgeProtocolConfig);
    /**
     * The wallet account to use to interact with the protocol.
     *
     * @protected
     * @type {IWalletAccount}
     */
    protected _account: IWalletAccount;
    /**
     * The bridge protocol configuration.
     *
     * @protected
     * @type {BridgeProtocolConfig}
     */
    protected _config: BridgeProtocolConfig;
    /**
     * Bridges a token to a different blockchain.
     *
     * @param {BridgeOptions} options - The bridge's options.
     * @returns {Promise<BridgeResult>} The bridge's result.
     */
    bridge(options: BridgeOptions): Promise<BridgeResult>;
    /**
     * Quotes the costs of a bridge operation.
     *
     * @see {@link bridge}
     * @param {BridgeOptions} options - The bridge's options.
     * @returns {Promise<Omit<BridgeResult, 'hash'>>} The bridge's quotes.
     */
    quoteBridge(options: BridgeOptions): Promise<Omit<BridgeResult, "hash">>;
}
export type IWalletAccount = import("../wallet-account.js").default;
export type BridgeProtocolConfig = {
    /**
     * - The maximum fee amount for bridge operations.
     */
    bridgeMaxFee?: number;
};
export type BridgeOptions = {
    /**
     * - The identifier of the destination blockchain (e.g., "arbitrum").
     */
    targetChain: string;
    /**
     * - The address of the recipient.
     */
    recipient: string;
    /**
     * - The address of the token to bridge.
     */
    token: string;
    /**
     * - The amount of tokenss to bridge to the destination chain (in base unit).
     */
    amount: number;
};
export type BridgeResult = {
    /**
     * - The hash of the bridge operation.
     */
    hash: string;
    /**
     * - The gas cost.
     */
    fee: number;
    /**
     * - The bridge cost in the bridged token.
     */
    bridgeFee: number;
};
