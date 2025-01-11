import './App.css'
import {createBrowserRouter} from "react-router";
import {RootLayout} from "./Components/ButtonList/RootLayout.tsx";

function App() {

const  routes =createBrowserRouter([
    {
        path: '/',
        element: <RootLayout>,
            children: [

            ],
    },

  },
])

  return (
    <>


    </>
  )
}

export default App
