import { useRoutes } from "react-router-dom"
import { routers } from "./routers"
import { Suspense } from 'react'
import '@/assets/css/tailwind.css'


function App() {
  const element = useRoutes(routers)
  return (
    <Suspense fallback={<div className="w-screen h-screen flex justify-center items-center flex-col"><img className="w-[40px]" src="/img/logo.svg" alt /></div>}>
      {element}
    </Suspense>
  )
}

export default App
