import { configureStore } from '@reduxjs/toolkit'
import currentPageReducer from '@/redux/features/currentPage'
import adminCurrentPageReducer from '@/redux/features/adminCurrentPage'

export const store = configureStore({
    reducer: {
      currentPage: currentPageReducer,
      adminCurrentPage: adminCurrentPageReducer,
    }
  })
