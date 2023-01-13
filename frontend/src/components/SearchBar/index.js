import { useHistory } from "react-router-dom";
import './SearchBar.css';


const SearchBar = () => {
    const history = useHistory();

    const handleSearch = async (e) => {
        if (e.key === 'Enter') {
            history.push(`/questions?query=${e.target.value}`);
        }
    }

    return (
        <div id="searchbar-wrapper">
            <input id="searchbar" type="text" placeholder="Search..." onKeyDown={handleSearch}></input>
        </div>
    )
}

export default SearchBar;