"use client"
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../(pages)/auth/authSlice.js'
export const store = configureStore({
  reducer: {

    user : authReducer,

  },
})