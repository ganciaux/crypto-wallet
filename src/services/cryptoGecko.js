import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CryptoApi, getCryptoApiIds } from '../data/CryptoApi'
const cryptoGeckoHeaders = {
  'x-rapidapi-host': 'coinGecko1.p.rapidapi.com',
  'x-rapidapi-key': '7ce4dbab36mshdd18c65adaaf6aap19c22ajsn1a50b8beab17',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'Origin, X-Requested-With, Content-Type, Accept',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
}

const ids = getCryptoApiIds('geckoId')

const baseUrl = 'https://api.coingecko.com/api/v3'

const createRequest = (url) => ({ url, headers: cryptoGeckoHeaders })

export const cryptoGecko = createApi({
  reducerPath: 'cryptoGecko',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest(`/coins/markets?vs_currency=eur&ids=${ids}`),
    }),
    https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=1638058320&to=1638835200'
    
  }),
})

export const { useGetCryptosQuery } = cryptoGecko
