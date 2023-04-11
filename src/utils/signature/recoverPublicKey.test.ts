import { expect, test } from 'vitest'
import { accounts } from '../../_test/index.js'
import { privateKeyToAccount } from '../../accounts/index.js'
import { toBytes } from '../encoding/index.js'
import { hashMessage } from './hashMessage.js'

import { recoverPublicKey } from './recoverPublicKey.js'

test('default', async () => {
  expect(
    await recoverPublicKey({
      hash: hashMessage('hello world'),
      signature:
        '0xa461f509887bd19e312c0c58467ce8ff8e300d3c1a90b608a760c5b80318eaf15fe57c96f9175d6cd4daad4663763baa7e78836e067d0163e9a2ccf2ff753f5b1b',
    }),
  ).toEqual(privateKeyToAccount(accounts[0].privateKey).publicKey)

  expect(
    await recoverPublicKey({
      hash: hashMessage('🥵'),
      signature:
        '0x05c99bbbe9fac3ad61721a815d19d6771ad39f3e8dffa7ae7561358f20431d8e7f9e1d487c77355790c79c6eb0b0d63690f690615ef99ee3e4f25eef0317d0701b',
    }),
  ).toEqual(privateKeyToAccount(accounts[0].address).publicKey)

  expect(
    await recoverPublicKey({
      hash: hashMessage('hello world', 'bytes'),
      signature:
        '0xa461f509887bd19e312c0c58467ce8ff8e300d3c1a90b608a760c5b80318eaf15fe57c96f9175d6cd4daad4663763baa7e78836e067d0163e9a2ccf2ff753f5b1b',
    }),
  ).toEqual(privateKeyToAccount(accounts[0].address).publicKey)

  expect(
    await recoverPublicKey({
      hash: hashMessage('🥵', 'bytes'),
      signature:
        '0x05c99bbbe9fac3ad61721a815d19d6771ad39f3e8dffa7ae7561358f20431d8e7f9e1d487c77355790c79c6eb0b0d63690f690615ef99ee3e4f25eef0317d0701b',
    }),
  ).toEqual(privateKeyToAccount(accounts[0].address).publicKey)

  expect(
    await recoverPublicKey({
      hash: hashMessage('hello world', 'bytes'),
      signature: toBytes(
        '0xa461f509887bd19e312c0c58467ce8ff8e300d3c1a90b608a760c5b80318eaf15fe57c96f9175d6cd4daad4663763baa7e78836e067d0163e9a2ccf2ff753f5b1b',
      ),
    }),
  ).toEqual(privateKeyToAccount(accounts[0].address).publicKey)
})