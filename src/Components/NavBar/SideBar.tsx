import 'bootstrap-icons/font/bootstrap-icons.css';

export function SideBar(){
    return(
        <>
            <div className="d-flex flex-column justify-content-between bg-dark text-white p-2 vh-100 vw-45">
                <div>
                <a className="d-flex align-items-center p-5">

                    <span className="fs-4">Green Shadow</span>
                </a>
                <hr className="text-secondary mt-2"/>
                <ul className="nav nav-pills flex-column p-0 m-0">
                    <li className="nav-item p-0 bg-gradient text-center">
                        <a href="" className="nav-link text-white fs-5"> DashBoard</a>
                        <i className=" me-2 fs-5"></i>
                    </li>
                    <li className="nav-item p-0 bg-gradient text-center">
                        <a href="" className="nav-link text-white fs-5">Crop Management</a>
                        <i className=" me-2 fs-5"></i>
                        <span className="fs-5"></span>
                    </li>
                    <li className="nav-item p-0 bg-gradient text-center">
                        <a href="" className="nav-link text-white fs-5">Field Management</a>
                        <i className=" me-2 fs-5"></i>
                        <span className="fs-5"></span>
                    </li>
                    <li className="nav-item p-0 bg-gradient text-center">
                        <a href="" className="nav-link text-white fs-5">Log Management</a>
                        <i className=" me-2 fs-5"></i>
                        <span className="fs-5"></span>
                    </li>
                    <li className="nav-item p-0 bg-gradient text-center">
                        <a href="" className="nav-link text-white fs-5">Equipment Management</a>
                        <i className=" me-2 fs-5"></i>
                        <span className="fs-5"></span>
                    </li>
                    <li className="nav-item p-0 bg-gradient text-center">
                        <a href="" className="nav-link text-white fs-5">Staff Management</a>
                        <i className=" me-2 fs-5"></i>
                        <span className="fs-5"></span>
                    </li>
                    <li className="nav-item p-1 bg-gradient text-center">
                        <a href="" className="nav-link text-white fs-5">Vehicle Management</a>
                        <i className=" me-2 fs-5"></i>
                        <span className="fs-5"></span>
                    </li>

                    <li className="nav-item p-1 bg-gradient text-center">
                        <a href="" className="nav-link text-white fs-5">Settings </a>
                        <i className=" me-2 fs-5"></i>
                        <span className="fs-5"></span>
                    </li>
                </ul>
                </div>
                <div></div>
            </div>
        </>
    )
}