import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoGeckoHeaders = {
    'x-rapidapi-host': 'coingecko.p.rapidapi.com',
    'x-rapidapi-key': '7ce4dbab36mshdd18c65adaaf6aap19c22ajsn1a50b8beab17'
}

const baseUrl = 'https://coingecko.p.rapidapi.com/coins'

const createRequest = (url) => ({ url, headers: cryptoGeckoHeaders })

export const cryptoGecko = createApi({
  reducerPath: 'cryptoGecko',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest('coins/list'),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coins/${coinId}`),
    }),
  }),
})

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
} = cryptoGecko
