import { configureStore } from '@reduxjs/toolkit'

import { cryptoApi } from '../services/cryptoApi'
import { cryptoGecko } from '../services/cryptoGecko'
import { cryptoCoinranking } from '../services/cryptoCoinranking'
import { cryptoPaprika } from '../services/cryptoPaprika'
import { cryptoNewsApi } from '../services/cryptoNewsApi'

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoGecko.reducerPath]: cryptoGecko.reducer,
    [cryptoCoinranking.reducerPath]: cryptoCoinranking.reducer,
    [cryptoPaprika.reducerPath]: cryptoPaprika.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
})
