import * as bip39 from 'bip39'

import { describe, expect, test } from '@jest/globals'

import WalletManager from '../index.js'

class DummyWalletManager extends WalletManager {
  async getAccount (index = 0) {
    return null
  }

  async getAccountByPath (path) {
    return null
  }

  async getFeeRates () {
    return {
      normal: 0,
      fast: 0
    }
  }

  dispose () {

  }
}

const SEED_PHRASE = 'cook voyage document eight skate token alien guide drink uncle term abuse'

const INVALID_SEED_PHRASE = 'invalid seed phrase'

describe('WalletManager', () => {
  describe('constructor', () => {
    test('should set the provided signer as the default signer', () => {
      const signer = { name: 'dummy-signer' } //TODO: refactor for mock implementation of ISigner
      const wallet = new DummyWalletManager(signer)

      expect(wallet.getSigner('default')).toBe(signer)
    })
  })

  describe('static getRandomSeedPhrase', () => {
    test('should generate a valid 12-word seed phrase', () => {
      const seedPhrase = WalletManager.getRandomSeedPhrase()

      const words = seedPhrase.trim()
        .split(/\s+/)

      expect(words).toHaveLength(12)

      words.forEach(word => {
        expect(bip39.wordlists.EN.includes(word))
          .not.toBe(-1)
      })
    })
  })

  describe('static isValidSeedPhrase', () => {
    test('should return true for a valid seed phrase', () => {
      expect(WalletManager.isValidSeedPhrase(SEED_PHRASE))
        .toBe(true)
    })

    test('should return false for an invalid seed phrase', () => {
      expect(WalletManager.isValidSeedPhrase(INVALID_SEED_PHRASE))
        .toBe(false)
    })

    test('should return false for an empty string', () => {
      expect(WalletManager.isValidSeedPhrase(''))
        .toBe(false)
    })
  })

  describe('getSigner', () => {
    test('should return the default signer when only default signer exists', () => {
      const signer = { name: 'default-signer' }
      const wallet = new DummyWalletManager(signer)

      expect(wallet.getSigner('default')).toBe(signer)
    })
  })
})
