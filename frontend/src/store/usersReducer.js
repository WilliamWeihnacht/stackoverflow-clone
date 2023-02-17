import csrfFetch from "./csrf";

export const RECEIVE_USER = 'RECIEVE_USER';
export const RECEIVE_USERS = 'RECIEVE_USERS';

export const addUser = (user) => ({
    type: RECEIVE_USER,
    user
});

export const addUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

export const fetchUser = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(addUser(data));
    }
}

export const fetchUsers = () => async dispatch => {
    const res = await csrfFetch(`/api/users/`);
    if (res.ok) {
        const data = await res.json();
        dispatch(addUsers(data));
    }
}

const userReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = { ...state };
    switch (action.type) {
        case RECEIVE_USER:
            return { ...state, ["user"]: action.user };
        case RECEIVE_USERS:
            return {...nextState, ...action.users};
        default:
            return state;
    };
};

export default userReducer