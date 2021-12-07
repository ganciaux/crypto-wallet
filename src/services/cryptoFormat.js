const CRYPTO_API_GECKO = 'gecko'
const CRYPTO_API_COINAPI = 'coinapi'

const cryptoInit = () => {
  return {
    test: 'value',
  }
}

export const cryptoFormat = (dataApi, api) => {
  const data = cryptoInit()
  switch (api) {
    case 'gecko':
      break
    case 'coinapi':
      break
    default:
      break
  }
  return data
}
