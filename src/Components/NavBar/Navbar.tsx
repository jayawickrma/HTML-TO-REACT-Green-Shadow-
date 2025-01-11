import {Link} from "react-router";


export function Navbar(){
return(
    <>
    <header>
        <div className="list-group list-group-flush text-center">
          <Link to="/">DashBoard</Link>
            <Link to="">Crop Management</Link>
            <Link to="">Field Management</Link>
            <Link to="">Log Management</Link>
            <Link to="">Equipment Management</Link>
            <Link to="">Staff Management</Link>
            <Link to="">Vehicle Management</Link>
            <Link to="">Settings</Link>
    </div>
    </header>

</>
)
}