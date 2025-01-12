import 'bootstrap/dist/css/bootstrap.min.css';
import {SideBar} from "./Components/NavBar/SideBar.tsx";

function App() {
    return(
        <>
            <div className="d-flex">
                <div className="col-auto">
                   <SideBar/>
                </div>
            </div>
        </>
    )
}

export default App
