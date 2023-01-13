import { Redirect, useHistory, useLocation } from "react-router-dom";
import './NotFound.css';

const NotFound = () => {
    const history = useHistory();
    const location = useLocation();

    if (location.pathname === "/") return <Redirect to="/splash"/>;

    return (
        <div id="not-found-page">
            <h1>404 Not Found</h1>
            <a onClick={()=>history.goBack()} id="not-found-button">Go Back</a>
        </div>
    )
}

export default NotFound;