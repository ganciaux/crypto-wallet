import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoGeckoHeaders = {
  'x-rapidapi-host': 'coinGecko1.p.rapidapi.com',
  'x-rapidapi-key': '7ce4dbab36mshdd18c65adaaf6aap19c22ajsn1a50b8beab17',
}

const ids =
  'crypto-com-chain,casper-network,solana,elrond-erd-2,bitcoin,chiliz,vechain,benqi,the-sandbox,gala,decentraland,stellar,avalanche-2,enjincoin,wax,theta-token,shiba-inu,uniswap,dogecoin,fantom,cardano,holotoken,ethereum,waltonchain,usd-coin'

const baseUrl = 'https://api.coingecko.com/api/v3'

const createRequest = (url) => ({ url, headers: cryptoGeckoHeaders })

export const cryptoGecko = createApi({
  reducerPath: 'cryptoGecko',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: () => createRequest(`/coins/markets?vs_currency=eur&ids=${ids}`),
    }),
  }),
})

export const { useGetCryptosQuery } = cryptoGecko
