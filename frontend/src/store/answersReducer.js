import csrfFetch from "./csrf";

const RECEIVE_ANSWER = 'RECEIVE_ANSWER';
const RECEIVE_ANSWERS = 'RECEIVE_ANSWERS';
const REMOVE_ANSWER = 'REMOVE_ANSWER';

//fetch util methods
export const postAnswer = (answer) => {
    return csrfFetch('/api/answers', {
        method: 'POST',
        body: JSON.stringify(answer)
    });
}



//thunk action creators
export const createAnswer = (answer) => async (dispatch) => {
    const res = await postAnswer(answer);
    let data;
    if (res.ok) {
      data = await res.json();
      dispatch(receiveAnswer(data));
    } else {
      console.log(res.statusText);
    }
}

//action creators
export const receiveAnswer = answer => ({
    type: RECEIVE_ANSWER,
    answer
});

//reducer
const answerReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = { ...state };
  
    switch (action.type) {
      case RECEIVE_ANSWER:
        nextState[action.answer.id] = action.answer;
        return nextState;
      case RECEIVE_ANSWERS:
        return {...nextState, ...action.answers}
      case REMOVE_ANSWER:
        delete nextState[action.answerId];
        return nextState;
      default:
        return state;
    };
};
  
export default answerReducer;