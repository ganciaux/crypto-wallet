export const ids = [
  {
    name: 'Crypto.com Chain',
    symbol: 'cro',
    geckoId: 'crypto-com-chain',
    coinranking: '65PHZTpmE55b',
  },
  {
    name: 'Casper',
    symbol: 'CSPR',
    geckoId: 'casper-network',
    coinranking: 'o35j_d524',
  },
  {
    name: 'Solana',
    symbol: 'sol',
    geckoId: 'solana',
    coinranking: 'zNZHO_Sjf',
  },
  {
    name: 'Waltonchain',
    symbol: 'wtc',
    geckoId: 'waltonchain',
    coinranking: 'Z90WSKAjhslmJ',
  },
  {
    name: 'Bitcoin',
    symbol: 'btc',
    geckoId: 'bitcoin',
    coinranking: 'Qwsogvtv82FCd',
  },
  {
    name: 'Elrond',
    symbol: 'egld',
    geckoId: 'elrond-erd-2',
    coinranking: 'omwkOTglq',
  },
  {
    name: 'Chiliz',
    symbol: 'chz',
    geckoId: 'chiliz',
    coinranking: 'GSCt2y6YSgO26',
  },
  {
    name: 'BENQI',
    symbol: 'qi',
    geckoId: 'benqi',
    coinranking: '',
  },
  {
    name: 'VeChain',
    symbol: 'vet',
    geckoId: 'vechain',
    coinranking: 'FEbS54wxo4oIl',
  },
  {
    name: 'The Sandbox',
    symbol: 'sand',
    geckoId: 'the-sandbox',
    coinranking: 'pxtKbG5rg',
  },
  {
    name: 'Gala',
    symbol: 'gala',
    geckoId: 'gala',
    coinranking: 'zfVt1uA3P',
  },
  {
    name: 'Stellar',
    symbol: 'xlm',
    geckoId: 'stellar',
    coinranking: 'f3iaFeCKEmkaZ',
  },
  {
    name: 'Decentraland',
    symbol: 'mana',
    geckoId: 'decentraland',
    coinranking: 'tEf7-dnwV3BXS',
  },
  {
    name: 'Avalanche',
    symbol: 'avax',
    geckoId: 'avalanche-2',
    coinranking: 'dvUj0CzDZ',
  },
  {
    name: 'Enjin Coin',
    symbol: 'enj',
    geckoId: 'enjincoin',
    coinranking: 'hG9iQlgtdwCvc',
  },
  {
    name: 'Theta Network',
    symbol: 'theta',
    geckoId: 'theta-token',
    coinranking: 'uuB42IRxNtoYmwKid',
  },
  {
    name: 'WAX',
    symbol: 'waxp',
    geckoId: 'wax',
    coinranking: 'xyNkSk64O',
  },
  {
    name: 'Uniswap',
    symbol: 'uni',
    geckoId: 'uniswap',
    coinranking: '_H5FVG9iW',
  },
  {
    name: 'Cardano',
    symbol: 'ada',
    geckoId: 'cardano',
    coinranking: 'qzawljRxB5bYu',
  },
  {
    name: 'Dogecoin',
    symbol: 'doge',
    geckoId: 'dogecoin',
    coinranking: 'a91GCGd_u96cF',
  },
  {
    name: 'Fantom',
    symbol: 'ftm',
    geckoId: 'fantom',
    coinranking: 'uIEWfMFnQo9K_',
  },
  {
    name: 'Shiba Inu',
    symbol: 'shib',
    geckoId: 'shiba-inu',
    coinranking: 'xz24e0BjL',
  },
  {
    name: 'Holo',
    symbol: 'hot',
    geckoId: 'holotoken',
    coinranking: 'iEHCPwcxoIH8e',
  },
  {
    name: 'Ethereum',
    symbol: 'eth',
    geckoId: 'ethereum',
    coinranking: 'razxDUgYGNAdQ',
  },
  {
    name: 'USD Coin',
    symbol: 'usdc',
    geckoId: 'usd-coin',
    coinranking: 'aKzUVe4Hh_CON',
  },
  {
    name: 'Cosmos',
    symbol: 'atom',
    geckoId: 'cosmos',
    coinranking: 'Knsels4_Ol-Ny',
  },
  {
    geckoId: 'basic-attention-token',
    symbol: 'bat',
    name: 'Basic Attention Token',
    coinranking: 'pOnT-qfd-RN7W',
  },
  {
    geckoId: 'yield-guild-games',
    symbol: 'ygg',
    name: 'Yield Guild Games',
    coinranking: '',
  },
  {
    geckoId: 'litecoin',
    symbol: 'ltc',
    name: 'Litecoin',
    coinranking: 'D7B1x_ks7WhV5',
  },
  {
    geckoId: 'my-neighbor-alice',
    symbol: 'alice',
    name: 'My Neighbor Alice',
    coinranking: 't7IApd4quI',
  },
]

export const getCryptoApi = (symbol) => {
  return ids.find((id) => {
    if (id['symbol'] === symbol) return id
  })
}

export const getCryptoApiIds = (api) => {
  return ids
    .map((id) => {
      return id[api]
    })
    .join(',')
}
