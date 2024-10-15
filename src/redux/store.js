import { configureStore } from '@reduxjs/toolkit'
import currentPageReducer from '@/redux/features/currentPage'

export const store = configureStore({
    reducer: {
      currentPage: currentPageReducer,
    }
  })
