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
  }),
})

export const { useGetCryptosQuery } = cryptoCoinranking
