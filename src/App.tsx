import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {RootLayout} from "./Components/ButtonList/RootLayout.tsx";
import {DashBoard} from "./Pages/DashBoard.tsx";
import {FieldPage} from "./Pages/Field/FieldPage.tsx";
import {CropPage} from "./Pages/Crop/CropPage.tsx";
import {LogPage} from "./Pages/Log/LogPage.tsx";
import {StaffPage} from "./Pages/Staff/StaffPage.tsx";
import {VehiclePage} from "./Pages/Vehicle/VehiclePage.tsx";
import {EquipmentPage} from "./Pages/Equipment/EquipmentPage.tsx";


function App() {

const  routes =createBrowserRouter([
        {
            path: '/',
            element: <RootLayout/>,
            children:[
                {path:'',element:<DashBoard/>},
                {path:'/cropsManagement',element:<CropPage/>},
                {path:'/fieldManagement',element:<FieldPage/>},
                {path:'/logManagement',element:<LogPage/>},
                {path:'/staffManagement',element:<StaffPage/>},
                {path:'/vehicleManagement',element:<VehiclePage/>},
                {path:'/equipmentManagement',element:<EquipmentPage/>}
            ]
        }
    ]);

  return (
    <>
           <RouterProvider router={routes}/>
    </>
  )
}

export default App
