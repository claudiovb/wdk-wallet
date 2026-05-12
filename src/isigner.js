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

import { NotImplementedError } from './errors.js'

/** @typedef {import('./wallet-manager.js').WalletConfig} WalletConfig */
/**
 * A minimal, cross-chain signer interface.
 *
 * Only the universally-required surface is enforced here:
 *  - derive: create a child signer from a relative derivation path
 *  - getAddress: return the public address for this signer
 *  - dispose: clear any secret material from memory
 *
 * Chain-specific signers (EVM, BTC, Tron, Solana, etc.) can extend this
 * contract with additional capabilities (e.g., signTransaction, signTypedData,
 * signPsbt), but those are intentionally not included here to keep the base
 * interface chain-agnostic.
 *
 * Common optional fields/methods implementers may provide:
 *  - index: number | undefined
 *  - path: string | undefined
 *  - address: string | undefined
 *
 * @interface
 */
export class ISigner {
  /**
   * Derive a child signer using a relative path.
   *
   * Example formats (chain-dependent):
   *  - BIP-32/BIP-44 relative paths like "0'/0/0"
   *  - Implementation-specific segmenting, as applicable
   *
   * @param {string} relPath - The relative derivation path.
   * @param {WalletConfig} [cfg] - Optional chain-specific configuration.
   * @returns {ISigner} The derived signer.
   */
  derive (relPath, cfg) {
    throw new NotImplementedError('derive(relPath, cfg?)')
  }

  /**
   * Returns the signer's address.
   *
   * @returns {Promise<string>} The address.
   */
  async getAddress () {
    throw new NotImplementedError('getAddress()')
  }

  /**
   * Disposes the signer and clears any secret material from memory.
   * Implementations should be idempotent (safe to call more than once).
   */
  dispose () {
    throw new NotImplementedError('dispose()')
  }
}
