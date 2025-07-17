export class NotImplementedError extends Error {
    /**
     * Create a new not implemented error.
     *
     * @param {string} methodName - The method's name.
     */
    constructor(methodName: string);
}
/** @interface */
export default interface IWalletAccount {
    /**
     * The derivation path's index of this account.
     *
     * @type {number}
     */
    get index(): number;
    /**
     * The derivation path of this account (see [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)).
     *
     * @type {string}
     */
    get path(): string;
    /**
     * The account's key pair.
     *
     * @type {KeyPair}
     */
    get keyPair(): KeyPair;
    /**
     * Returns the account's address.
     *
     * @returns {Promise<string>} The account's address.
     */
    getAddress(): Promise<string>;
    /**
     * Signs a message.
     *
     * @param {string} message - The message to sign.
     * @returns {Promise<string>} The message's signature.
     */
    sign(message: string): Promise<string>;
    /**
     * Verifies a message's signature.
     *
     * @param {string} message - The original message.
     * @param {string} signature - The signature to verify.
     * @returns {Promise<boolean>} True if the signature is valid.
     */
    verify(message: string, signature: string): Promise<boolean>;
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
     * Sends a transaction.
     *
     * @param {Transaction} tx - The transaction.
     * @returns {Promise<TransactionResult>} The transaction's result.
     */
    sendTransaction(tx: Transaction): Promise<TransactionResult>;
    /**
     * Quotes the costs of a send transaction operation.
     *
     * @see {@link sendTransaction}
     * @param {Transaction} tx - The transaction.
     * @returns {Promise<Omit<TransactionResult, 'hash'>>} The transaction's quotes.
     */
    quoteSendTransaction(tx: Transaction): Promise<Omit<TransactionResult, "hash">>;
    /**
     * Transfers a token to another address.
     *
     * @param {TransferOptions} options - The transfer's options.
     * @returns {Promise<TransferResult>} The transfer's result.
     */
    transfer(options: TransferOptions): Promise<TransferResult>;
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
     * @returns {Promise<unknown | null>} – The receipt, or null if the transaction has not been included in a block yet.
     */
    getTransactionReceipt(hash: string): Promise<unknown | null>;
    /**
     * Disposes the wallet account, erasing the private key from the memory.
     */
    dispose(): void;
}
export type KeyPair = {
    /**
     * - The public key.
     */
    publicKey: Uint8Array;
    /**
     * - The private key.
     */
    privateKey: Uint8Array;
};
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
