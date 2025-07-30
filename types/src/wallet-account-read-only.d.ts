/** @interface */
export interface IWalletAccountReadOnly {
    /**
     * Returns the account's address.
     *
     * @returns {Promise<string>} The account's address.
     */
    getAddress(): Promise<string>;
    /**
     * Returns the account's native token balance.
     *
     * @returns {Promise<number>} The native token balance.
     */
    getBalance(): Promise<number>;
    /**
     * Returns the account balance for a specific token.
     *
     * @param {string} tokenAddress - The smart contract address of the token.
     * @returns {Promise<number>} The token balance.
     */
    getTokenBalance(tokenAddress: string): Promise<number>;
    /**
     * Quotes the costs of a send transaction operation.
     *
     * @see {@link sendTransaction}
     * @param {Transaction} tx - The transaction.
     * @returns {Promise<Omit<TransactionResult, 'hash'>>} The transaction's quotes.
     */
    quoteSendTransaction(tx: Transaction): Promise<Omit<TransactionResult, "hash">>;
    /**
     * Quotes the costs of a transfer operation.
     *
     * @see {@link transfer}
     * @param {TransferOptions} options - The transfer's options.
     * @returns {Promise<Omit<TransferResult, 'hash'>>} The transfer's quotes.
     */
    quoteTransfer(options: TransferOptions): Promise<Omit<TransferResult, "hash">>;
    /**
     * Returns a transaction's receipt.
     *
     * @param {string} hash - The transaction's hash.
     * @returns {Promise<unknown | null>} The receipt, or null if the transaction has not been included in a block yet.
     */
    getTransactionReceipt(hash: string): Promise<unknown | null>;
}
/**
 * @abstract
 * @implements {IWalletAccountReadOnly}
 */
export default abstract class AbstractWalletAccountReadOnly implements IWalletAccountReadOnly {
    /**
     * Creates a new read-only wallet account.
     *
     * @param {string} [address] - The account's address. If not provided, it must be set after construction with the {@link setAddress} method.
     */
    constructor(address?: string);
    /** @private */
    private _address;
    /**
     * Sets the account's address.
     *
     * @param {string} address - The account's address.
     */
    setAddress(address: string): void;
    getAddress(): Promise<string>;
    abstract getBalance(): Promise<number>;
    abstract getTokenBalance(tokenAddress: string): Promise<number>;
    abstract quoteSendTransaction(tx: Transaction): Promise<Omit<TransactionResult, "hash">>;
    abstract quoteTransfer(options: TransferOptions): Promise<Omit<TransferResult, "hash">>;
    abstract getTransactionReceipt(hash: string): Promise<unknown | null>;
}
export type Transaction = {
    /**
     * - The transaction's recipient.
     */
    to: string;
    /**
     * - The amount of native tokens to send to the recipient (in base unit).
     */
    value: number;
};
export type TransactionResult = {
    /**
     * - The transaction's hash.
     */
    hash: string;
    /**
     * - The gas cost.
     */
    fee: number;
};
export type TransferOptions = {
    /**
     * - The address of the token to transfer.
     */
    token: string;
    /**
     * - The address of the recipient.
     */
    recipient: string;
    /**
     * - The amount of tokens to transfer to the recipient (in base units).
     */
    amount: number;
};
export type TransferResult = {
    /**
     * - The hash of the transfer operation.
     */
    hash: string;
    /**
     * - The gas cost.
     */
    fee: number;
};
