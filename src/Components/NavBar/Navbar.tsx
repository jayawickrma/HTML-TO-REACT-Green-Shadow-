    import {Link} from "react-router";

    export function Navbar(){
    return(
        <>
            <div className="list-group list-group-flush text-center">
                <Link to="/">DashBoard</Link> <br/>
                <Link to="/crop-management">Crop Management</Link> <br/>
                <Link to="/field-management">Field Management</Link> <br/>
                <Link to="/log-management">Log Management</Link> <br/>
                <Link to="/equipment-management">Equipment Management</Link> <br/>
                <Link to="/staff-management">Staff Management</Link> <br/>
                <Link to="/vehicle-management">Vehicle Management</Link> <br/>
                <Link to="/settings">Settings</Link>
            </div>

        </>
    )
    }