import csrfFetch from "./csrf";

export const RECEIVE_QUESTION_VOTE = 'RECEIVE_QUESTION_VOTE';
export const RECEIVE_QUESTION_VOTES = 'RECEIVE_QUESTION_VOTES';
export const REMOVE_QUESTION_VOTE = 'REMOVE_QUESTION_VOTE';

//thunk action creators
export const createQuestionVote = (questionVote) => async (dispatch) => {
    const res = await csrfFetch('/api/question_votes', {
      method: 'POST',
      body: JSON.stringify(questionVote)
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(receiveQuestionVote(data))
    } else {
      console.log(res.statusText);
    }
}

//action creators
export const receiveQuestionVote = payload => ({
    type: RECEIVE_QUESTION_VOTE,
    payload
});

//reducer
const questionVoteReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = { ...state };
  
    switch (action.type) {
      case RECEIVE_QUESTION_VOTE:
        nextState[action.payload.id] = action.payload;
        return nextState
      case RECEIVE_QUESTION_VOTES:
        return {...nextState, ...action.questions}
      case REMOVE_QUESTION_VOTE:
        delete nextState[action.questionId];
        return nextState;
      default:
        return state;
    };
};
  
export default questionVoteReducer;