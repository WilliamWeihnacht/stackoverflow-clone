import { useState } from "react";
import './SearchBar.css';


const SearchBar = () => {
    const [results, setResults] = useState([]);

    const suggestResult = async (e) => {
        const res = await fetch(`/api/search?query=${e.target.value}`);
        if (res.ok) {
            const data = await res.json();
            setResults(data)
        }
    }

    return (
        <div id="searchbar-wrapper">
            <input id="searchbar" type="text" placeholder="Search..." onChange={suggestResult}></input>
            {/* <select id="searchbar-parent" multiple>{results.map((el,i)=><option id="searchbar-child" key={i}>{el.title}</option>)}</select> */}
            <ul id="searchbar-parent">{results.map((el,i)=><li id="searchbar-child" key={i}>{el.title}</li>)}</ul>
        </div>
    )
}

export default SearchBar;