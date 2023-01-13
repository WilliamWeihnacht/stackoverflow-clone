import { useHistory } from "react-router-dom";
import './NotFound.css';

const NotFound = () => {
    const history = useHistory();

    return (
        <div id="not-found-page">
            <h1>404 Not Found</h1>
            <a onClick={()=>history.goBack()} id="not-found-button">Go Back</a>
        </div>
    )
}

export default NotFound;