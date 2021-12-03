import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoCoinrankingHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS',
  'x-access-token': 'coinranking31764015111bc1ca04ddbc0dbac9585de4f1b6c87a13f739'};

const baseUrl = 'https://api.coinranking.com/v2'

const createRequest = (url) => ({ url, headers: cryptoCoinrankingHeaders })

export const cryptoCoinranking = createApi({
  reducerPath: 'cryptoCoinranking',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest(`/coins`),
    }),
  }),
})

export const { useGetCryptosQuery } = cryptoCoinranking
