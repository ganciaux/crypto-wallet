import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoCoinrankingHeaders = {}

const baseUrl = 'http://localhost:8080'

const createRequest = (url) => ({ url, headers: cryptoCoinrankingHeaders })

export const cryptoCoinranking = createApi({
  reducerPath: 'cryptoCoinranking',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest(`/coins`),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) =>
        createRequest(`coin/${coinId}/history/${timeperiod}`),
    }),
  }),
})

export const { useGetCryptosQuery } = cryptoCoinranking
