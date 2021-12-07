import { configureStore } from '@reduxjs/toolkit'

import { cryptoCoinApi } from '../services/cryptoCoinApi'
import { cryptoApi } from '../services/cryptoApi'
import { cryptoGecko } from '../services/cryptoGecko'
import { cryptoNewsApi } from '../services/cryptoNewsApi'

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoCoinApi.reducerPath]: cryptoCoinApi.reducer,
    [cryptoGecko.reducerPath]: cryptoGecko.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  },
})
