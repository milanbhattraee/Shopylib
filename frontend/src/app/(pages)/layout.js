"use client"; 
import React from 'react'
import Header from '../components/layout/Header'
import { Provider } from 'react-redux'
import { store } from '../store/store'

const clientLayout = ({children}) => {
  return (
    <>
    <Provider store={store}>
    <Header />
    {children}
    </Provider>
    </>
  )
}

export default clientLayout