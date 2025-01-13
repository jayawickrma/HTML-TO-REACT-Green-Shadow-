import {Outlet} from "react-router";
import {Sidebar} from "../NavBar/SideBar.tsx";


export function RootLayout(){
        return(
            <>
                <div className="flex flex-col h-screen bg-gray-800">
                    <Sidebar/>
                    <section className="absolute right-0 w-[78.5%] h-[97vh] overflow-y-auto p-5">
                        <Outlet/>
                    </section>
                </div>
            </>
        )
}