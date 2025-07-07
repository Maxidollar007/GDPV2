import { useState } from 'react'
import './App.css'
import { createBrowserRouter,RouterProvider,Link } from 'react-router-dom'
import { Home } from './pages/landing/acceuil'
import { Add } from './pages/keys/add'
import { Enregistrement } from './pages/presence/Enregistrement'
import { Stat } from './pages/historique/statistique'
 import { Error } from './pages/errorspages'


const router=createBrowserRouter([
    {
        path:'/',
        element:<Home/>
    },
    {
        path:'/Presence',
        element:<Enregistrement/>
    },
    {
        path:'/Historique',
        element:<Stat/>
    },
    {
        path:"/Enregistrement",
        element:<Add/>
    },
    {
        path:'*',
        element:<Error/>
    }
])

function App() {
 return<>

    <RouterProvider router={router}/>
  
 </>
}

export default App
