/** @abstract */
export default abstract class AbstractLendingProtocol {
    /**
     * Creates a new lending protocol.
     *
     * @param {IWalletAccount} account - The wallet account to use to interact with the protocol.
     */
    constructor(account: IWalletAccount);
    /**
     * The wallet account to use to interact with the protocol.
     *
     * @protected
     * @type {IWalletAccount}
     */
    protected _account: IWalletAccount;
    /**
     * Supplies a specific token amount to the lending pool.
     *
     * @abstract
     * @param {SupplyOptions} options - The supply's options.
     * @returns {Promise<SupplyResult>} The supply's result.
     */
    abstract supply(options: SupplyOptions): Promise<SupplyResult>;
    /**
     * Quotes the costs of a supply operation.
     *
     * @see {@link supply}
     * @abstract
     * @param {SupplyOptions} options - The supply's options.
     * @returns {Promise<Omit<SupplyResult, 'hash'>>} The supply's costs.
     */
    abstract quoteSupply(options: SupplyOptions): Promise<Omit<SupplyResult, "hash">>;
    /**
     * Withdraws a specific token amount from the pool.
     *
     * @abstract
     * @param {WithdrawOptions} options - The withdraw's options.
     * @returns {Promise<WithdrawResult>} The withdraw's result.
     */
    abstract withdraw(options: WithdrawOptions): Promise<WithdrawResult>;
    /**
     * Quotes the costs of a withdraw operation.
     *
     * @see {@link withdraw}
     * @abstract
     * @param {WithdrawOptions} options - The withdraw's options.
     * @returns {Promise<Omit<WithdrawResult, 'hash'>>} The withdraw's costs.
     */
    abstract quoteWithdraw(options: WithdrawOptions): Promise<Omit<WithdrawResult, "hash">>;
    /**
     * Borrows a specific token amount.
     *
     * @abstract
     * @param {BorrowOptions} options - The borrow's options.
     * @returns {Promise<BorrowResult>} The borrow's result.
     */
    abstract borrow(options: BorrowOptions): Promise<BorrowResult>;
    /**
     * Quotes the costs of a borrow operation.
     *
     * @see {@link borrow}
     * @abstract
     * @param {BorrowOptions} options - The borrow's options.
     * @returns {Promise<Omit<BorrowResult, 'hash'>>} The borrow's costs.
     */
    abstract quoteBorrow(options: BorrowOptions): Promise<Omit<BorrowResult, "hash">>;
    /**
     * Repays a specific token amount.
     *
     * @abstract
     * @param {RepayOptions} options - The borrow's options.
     * @returns {Promise<RepayResult>} The repay's result.
     */
    abstract repay(options: RepayOptions): Promise<RepayResult>;
    /**
     * Quotes the costs of a repay operation.
     *
     * @see {@link repay}
     * @abstract
     * @param {RepayOptions} options - The repay's options.
     * @returns {Promise<Omit<RepayResult, 'hash'>>} The repay's costs.
     */
    abstract quoteRepay(options: RepayOptions): Promise<Omit<RepayResult, "hash">>;
}
export type IWalletAccount = import("../wallet-account.js").default;
export type SupplyOptions = {
    /**
     * - The address of the token to supply.
     */
    token: string;
    /**
     * - The amount of tokens to supply (in base unit).
     */
    amount: number;
    /**
     * - The address on behalf of which the supply operation should be performed. If not set, the supply operation will be performed on behalf of the account itself.
     */
    onBehalfOf?: string;
};
export type SupplyResult = {
    /**
     * - The hash of the supply operation.
     */
    hash: string;
    /**
     * - The gas cost.
     */
    fee: number;
};
export type WithdrawOptions = {
    /**
     * - The address of the token to withdraw.
     */
    token: string;
    /**
     * - The amount of tokens to withdraw (in base unit).
     */
    amount: number;
    /**
     * - The address that should receive the funds. If not set, the account itself will receive the tokens.
     */
    to?: string;
};
export type WithdrawResult = {
    /**
     * - The hash of the withdraw operation.
     */
    hash: string;
    /**
     * - The gas cost.
     */
    fee: number;
};
export type BorrowOptions = {
    /**
     * - The address of the token to borrow.
     */
    token: string;
    /**
     * - The amount of tokens to borrow (in base unit).
     */
    amount: number;
    /**
     * - The address on behalf of which the borrow operation should be performed. If not set, the borrow operation will be performed on behalf of the account itself.
     */
    onBehalfOf?: string;
};
export type BorrowResult = {
    /**
     * - The hash of the borrow operation.
     */
    hash: string;
    /**
     * - The gas cost.
     */
    fee: number;
};
export type RepayOptions = {
    /**
     * - The address of the token to repay.
     */
    token: string;
    /**
     * - The amount of tokens to repay (in base unit).
     */
    amount: number;
    /**
     * - The address on behalf of which the repay operation should be performed. If not set, the repay operation will be performed on behalf of the account itself.
     */
    onBehalfOf?: string;
};
export type RepayResult = {
    /**
     * - The hash of the repay operation.
     */
    hash: string;
    /**
     * - The gas cost.
     */
    fee: number;
};
