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
     * Returns a random [BIP-39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki) seed phrase.
     *
     * @returns {string} The seed phrase.
     */
    static getRandomSeedPhrase(): string;
    /**
     * Checks if a seed phrase is valid.
     *
     * @param {string} seedPhrase - The seed phrase.
     * @returns {boolean} True if the seed phrase is valid.
     */
    static isValidSeedPhrase(seedPhrase: string): boolean;
    /**
     * Creates a new wallet manager.
     *
     * @param {ISigner} signer - The default signer for the wallet.
     * @param {WalletConfig} [config] - The wallet configuration.
     */
    constructor(signer: ISigner, config?: WalletConfig);
    _signers: Map<any, any>;
    _accounts: Map<any, any>;
    /**
     * The wallet configuration.
     *
     * @protected
     * @type {WalletConfig}
     */
    protected _config: WalletConfig;
    /**
     * Creates a new signer.
     *
     * @param {string} signerName - The signer name.
     * @param {ISigner} signer - The signer.
     */
    createSigner(signerName: string, signer: ISigner): void;
    /**
     * Returns a signer.
     *
     * @param {string} signerName - The signer name.
     * @returns {ISigner} The signer.
     */
    getSigner(signerName: string): ISigner;
    /**
     * Returns the wallet account at a specific index (see [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)).
     *
     * @abstract
     * @param {number} [index] - The index of the account to get (default: 0).
     * @param {string} [signerName='default'] - The name of the signer to use.
     * @returns {Promise<IWalletAccount>} The account.
     */
    getAccount(index?: number, signerName?: string): Promise<IWalletAccount>;
    /**
     * Returns the wallet account at a specific [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) derivation path.
     *
     * @abstract
     * @param {string} path - The derivation path (e.g. "0'/0/0").
     * @param {string} [signerName='default'] - The name of the signer to use.
     * @returns {Promise<IWalletAccount>} The account.
     */
    getAccountByPath(path: string, signerName?: string): Promise<IWalletAccount>;
    /**
     * Returns the current fee rates.
     *
     * @abstract
     * @returns {Promise<FeeRates>} The fee rates (in base unit).
     */
    getFeeRates(): Promise<FeeRates>;
    /**
     * Disposes all the wallet accounts, erasing their private keys from the memory.
     */
    dispose(): void;
}
export type IWalletAccount = import("./wallet-account.js").IWalletAccount;
export type ISigner = import("./isigner.js").ISigner;
export type FeeRates = {
    /**
     * - The fee rate for transaction sent with normal priority.
     */
    normal: bigint;
    /**
     * - The fee rate for transaction sent with fast priority.
     */
    fast: bigint;
};
