import 'bootstrap-icons/font/bootstrap-icons.css';

export function SideBar(){
    return(
        <>
            <div className="d-flex flex-column justify-content-between bg-dark text-white p-2 vh-100 vw-45">
                <div>
                <a className="d-flex align-items-center p-5">
                    <i className="bi bi-file-arrow-down"></i>
                    <span className="fs-4">Green Shadow</span>
                </a>
                <hr className="text-secondary mt-2"/>
                <ul className="nav nav-pills flex-column p-0 m-0">
                    <li className="nav-item p-1">
                        <a href="" className="nav-link text-white"></a>
                        <i className="bi bi-speedometer me-2 fs-5"></i>
                        <span className="fs-5">Dashboard</span>
                    </li>
                    <li className="nav-item p-2">
                        <a href="" className="nav-link text-white"></a>
                        <i className="bi bi-speedometer me-2 fs-5"></i>
                        <span className="fs-5">Crop Management</span>
                    </li>
                    <li className="nav-item p-2">
                        <a href="" className="nav-link text-white"></a>
                        <i className="bi bi-speedometer me-2 fs-5"></i>
                        <span className="fs-5">Field Management</span>
                    </li>
                    <li className="nav-item p-2">
                        <a href="" className="nav-link text-white"></a>
                        <i className="bi bi-speedometer me-2 fs-5"></i>
                        <span className="fs-5">Log Management</span>
                    </li>
                    <li className="nav-item p-2">
                        <a href="" className="nav-link text-white"></a>
                        <i className="bi bi-speedometer me-2 fs-5"></i>
                        <span className="fs-5">Equipment Management</span>
                    </li>
                    <li className="nav-item p-2">
                        <a href="" className="nav-link text-white"></a>
                        <i className="bi bi-usb-c me-2 fs-5"></i>
                        <span className="fs-5">Staff Management</span>
                    </li>
                    <li className="nav-item p-2">
                        <a href="" className="nav-link text-white"></a>
                        <i className="bi bi-behance me-2 fs-5"></i>
                        <span className="fs-5">Vehicle Management</span>
                    </li>

                    <li className="nav-item p-1">
                        <a href="" className="nav-link text-white"></a>
                        <i className="bi bi-info-circle me-2 fs-5"></i>
                        <span className="fs-5">Settings</span>
                    </li>
                </ul>
                </div>
                <div></div>
            </div>
        </>
    )
}