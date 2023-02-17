import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/usersReducer";
import UserIndexItem from "../UserIndexItem";
import './UserIndex.css';

const UserIndex = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => Object.values(state.users));

    useEffect(()=>{
        dispatch(fetchUsers());
    },[])

    return (
        <div className="question-feed">
            <div id="header-box">
                <h1>All Users</h1>
            </div>
            <ul>
                {users?.map((user,i) => <UserIndexItem user={user} key={i}/>)}
            </ul>
        </div>
    )
}

export default UserIndex;