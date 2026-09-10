import { describe, expect, test } from '@jest/globals'

import { InvalidSignerError, SignerError } from '../index.js'

describe('errors', () => {
  test('SignerError is an alias of InvalidSignerError', () => {
    expect(SignerError).toBe(InvalidSignerError)
  })
})
