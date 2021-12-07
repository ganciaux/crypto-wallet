const CRYPTO_API_GECKO = 'gecko'
const CRYPTO_API_COINAPI = 'coinapi'

const coinapi = {
  asset_id: "BTC",
  name: "Bitcoin",
  type_is_crypto: 1,
  data_quote_start: "2014-02-24T17:43:05.0000000Z",
  data_quote_end: "2021-12-07T06:54:48.0567089Z",
  data_orderbook_start: "2014-02-24T17:43:05.0000000Z",
  data_orderbook_end: "2020-08-05T14:38:38.3413202Z",
  data_trade_start: "2010-07-17T23:09:17.0000000Z",
  data_trade_end: "2021-12-07T06:58:49.4760000Z",
  data_symbols_count: 71730,
  volume_1hrs_usd: 10206570130573.38,
  volume_1day_usd: 1083774715760406.22,
  volume_1mth_usd: 22075030249242613.24,
  price_usd: 51231.19141521695288069602391,
  id_icon: "4caf2b16-a017-4e26-a348-2cea69c34cba",
  data_start: "2010-07-17",
  data_end: "2021-12-07"
},

const coinGecko = {
	id: "bitcoin",
	symbol: "btc",
	name: "Bitcoin",
	image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
	current_price: 45310,
	market_cap: 855496301359,
	market_cap_rank: 1,
	fully_diluted_valuation: 950866539983,
	total_volume: 32860649830,
	high_24h: 45465,
	low_24h: 41818,
	price_change_24h: 2533.13,
	price_change_percentage_24h: 5.92171,
	market_cap_change_24h: 45687065123,
	market_cap_change_percentage_24h: 5.64171,
	circulating_supply: 18893737.0,
	total_supply: 21000000.0,
	max_supply: 21000000.0,
	ath: 59717,
	ath_change_percentage: -24.17654,
	ath_date: "2021-11-10T14:24:11.849Z",
	atl: 51.3,
	atl_change_percentage: 88166.61075,
	atl_date: "2013-07-05T00:00:00.000Z",
	roi: null,
	last_updated: "2021-12-07T07:05:53.772Z"
}

const cryptoInit = () => {
  return {
    id: '',
    symbol: '',
    name: '',
    current_price: '',
    market_cap: '',
    daily_change: '',
    icon: '',
  }
}

export const cryptoFormat = (dataApi, api) => {
  const data = cryptoInit()
  switch (api) {
    case 'gecko':
      id: "bitcoin",
      symbol: "btc",
      name: "Bitcoin",
      image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
      current_price: 45310,
      market_cap: 855496301359,


      break
    case 'coinapi':
      break
    default:
      break
  }
  return data
}
