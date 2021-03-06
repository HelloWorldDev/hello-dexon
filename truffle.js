/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

var HDWalletProvider = require("truffle-hdwallet-provider");
var secret = require('./secret');
var mnemonic = secret.mnemonic;
const { utils: { toWei } } = require('web3');

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    testnet: {
      provider: () => new HDWalletProvider(
        mnemonic,
        /*
        * mnemonic is from BIP39
        * BIP39 is the method for deriving private keys from mnemonic words.
        * With different derivation path,
        * we can generate different private keys from the same set of mnemonic word
        */
        "https://testnet-rpc.dexon.org",
        0,
        1,
        true,
        "m/44'/237'/0'/0/",
        /*
        * Derivation Path <= "m/44'/237'/0'/0/"
        * 
        * BIP44 defines how what derivation path should be like,
        * and it relies on coin type.
        * 
        * Ethereum is registered as 60 『"m/44'/60'/0'/0/"』,
        * while DEXON is registered as 237 『"m/44'/237'/0'/0/"』.
        * 
        * Therefore, given the same set of mnemonic words,
        * the addresses for Ethereum and DEXON are different.
        */
      ),
      network_id: "*",
      gasPrice: toWei('24', 'gwei'),
    },
    development: {
      provider: () => new HDWalletProvider(
        mnemonic,
        "http://127.0.0.1:8545",
        0,
        2,
        true,
        "m/44'/237'/0'/0/",
      ),
      network_id: "5777",
      host: "localhost",
      port: 8545,
    },
  }
};
