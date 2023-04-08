import Footer from '@/components/Footer'
import Header from '@/components/Header'
import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <Suspense fallback={<div className="w-screen h-screen flex justify-center items-center">
      <img className="w-[40px]" src="/img/logo.svg" alt />
    </div>}>
        <Header />
        <Outlet />
        <Footer />
    </Suspense>
  )
}

export default MainLayout