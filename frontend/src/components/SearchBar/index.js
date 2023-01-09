import { useState } from "react";


const SearchBar = () => {
    const [results, setResults] = useState([]);

    const suggestResult = async (e) => {
        const res = await fetch(`/api/search?query=${e.target.value}`);
        if (res.ok) {
            const data = await res.json();
            console.log(data);
            setResults(data)
        }
    }

    return (
        <>
            <input type="text" placeholder="Search..." onChange={suggestResult}></input>
            <ul>{results.map((el,i)=><li key={i}>{el.title}</li>)}</ul>
        </>
    )
}

export default SearchBar;