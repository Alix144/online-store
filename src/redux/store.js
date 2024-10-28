import { configureStore } from '@reduxjs/toolkit'
import currentPageReducer from '@/redux/features/currentPage'
import adminCurrentPageReducer from '@/redux/features/adminCurrentPage'
import isSidebarOpenReducer from '@/redux/features/isSidebarOpen'

export const store = configureStore({
    reducer: {
      currentPage: currentPageReducer,
      adminCurrentPage: adminCurrentPageReducer,
      isSidebarOpen: isSidebarOpenReducer,
    }
  })
