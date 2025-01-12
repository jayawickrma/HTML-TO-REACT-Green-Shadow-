import 'bootstrap-icons/font/bootstrap-icons.css';
import {Link} from "react-router";

export function SideBar(){
    return(
        <>
            <div className=" sidebar d-flex flex-column justify-content-between text-white p-2 vh-100 vw-45 bg-dark">
                <div>
                <a className="d-flex align-items-center p-5">

                    <span className="fs-4">Green Shadow</span>
                </a>
                <hr className="text-secondary mt-2"/>
                <ul className="nav nav-pills flex-column p-0 m-0">
                    <li className="nav-item p-0 bg-gradient text-center">
                        <i className=" me-2 fs-5">
                            <Link to="/" className="nav-link text-white fs-5 "> DashBoard</Link>
                        </i>
                    </li>
                    <li className="nav-item p-0 bg-gradient text-center">
                        <i className=" me-2 fs-5">
                            <Link to="/" className="nav-link text-white fs-5">Crop Management </Link>
                        </i>

                    </li>
                    <li className="nav-item p-0 bg-gradient text-center">
                        <i className=" me-2 fs-5">
                            <Link to="" className="nav-link text-white fs-5">Field Management</Link>
                        </i>

                    </li>
                    <li className="nav-item p-0 bg-gradient text-center">
                        <i className=" me-2 fs-5">
                            <Link to="" className="nav-link text-white fs-5">Log Management</Link>
                        </i>
                        <span className="fs-5"></span>
                    </li>
                    <li className="nav-item p-0 bg-gradient text-center">
                        <i className=" me-2 fs-5">
                            <Link to="" className="nav-link text-white fs-5">Equipment Management</Link>
                        </i>
                        <span className="fs-5"></span>
                    </li>
                    <li className="nav-item p-0 bg-gradient text-center">
                        <i className=" me-2 fs-5">
                            <Link to="" className="nav-link text-white fs-5">Staff Management</Link>
                        </i>
                        <span className="fs-5"></span>
                    </li>
                    <li className="nav-item p-1 bg-gradient text-center">
                        <i className=" me-2 fs-5">
                            <Link to="" className="nav-link text-white fs-5">Vehicle Management</Link>
                        </i>
                        <span className="fs-5"></span>
                    </li>

                    <li className="nav-item p-1 bg-gradient text-center">
                        <i className=" me-2 fs-5">
                            <Link to="" className="nav-link text-white fs-5">Settings </Link>
                        </i>
                        <span className="fs-5"></span>
                    </li>
                </ul>
                </div>
                <div></div>
            </div>
        </>
    )
}