import { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchSearchQuestions } from "../../store/questionsReducer";
import './SearchBar.css';


const SearchBar = () => {
    const dispatch = useDispatch();

    const handleSearch = async (e) => {
        if (e.key === 'Enter') {
            dispatch(fetchSearchQuestions(e.target.value));
        }
    }

    return (
        <div id="searchbar-wrapper">
            <input id="searchbar" type="text" placeholder="Search..." onKeyDown={handleSearch}></input>
        </div>
    )
}

export default SearchBar;