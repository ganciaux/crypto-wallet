import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
  'X-CoinAPI-Key': 'BFCA3928-A51C-48DB-B6EE-177DA2C93505',
}

const baseUrl = 'https://rest-sandbox.coinapi.io'

const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoCoinApi = createApi({
  reducerPath: 'cryptoCoinApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => {console.log('cryptoCoinApi: getCryptos()'); return createRequest(`/v1/assets/?filter_asset_id=CRO;QI;EGLD;CSPR;SOL;ETH;BTC;LTC;ATOM;YGG;ALICE;CHZ;WTC;VET;SAND;BAT;GALA;MANA;XLM;AVAX;ENJ;THETA;SHIB;UNI;ADA;WAX;DOGE;FTM;HOT;USDC`)},
    }),
  }),
})

export const {
  useGetCryptosQuery,
} = cryptoCoinApi
