import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/usersReducer";
import './UserIndex.css';

const UserIndex = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);

    useEffect(()=>{
        dispatch(fetchUsers());
    },[])

    return (
        <div></div>
    )
}

export default UserIndex;