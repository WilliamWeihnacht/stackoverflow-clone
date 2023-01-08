import csrfFetch from "./csrf";
import { editQuestion, RECEIVE_QUESTION, RECEIVE_QUESTIONS } from "./questionsReducer";

export const RECEIVE_QUESTION_VOTE = 'RECEIVE_QUESTION_VOTE';
export const RECEIVE_QUESTION_VOTES = 'RECEIVE_QUESTION_VOTES';
export const REMOVE_QUESTION_VOTE = 'REMOVE_QUESTION_VOTE';
export const UPDATE_QUESTION_VOTE = 'UPDATE_QUESTION_VOTE';

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

export const deleteQuestionVote = (questionVote) => async (dispatch) => {
    const res = await csrfFetch(`/api/question_votes/${questionVote.id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(removeQuestionVote(questionVote))
    } else {
        console.log(res.statusText);
    }
}

export const updateQuestionVote = (questionVote) => async (dispatch) => {
    const res = await csrfFetch(`/api/question_votes/${questionVote.id}`, {
        method: 'PATCH',
        body: JSON.stringify(questionVote)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(editQuestionVote(data));
    } else {
        console.log(res.statusText);
    }
}

//action creators
export const receiveQuestionVote = payload => ({
    type: RECEIVE_QUESTION_VOTE,
    payload
});

export const removeQuestionVote = questionVote => ({
    type: REMOVE_QUESTION_VOTE,
    questionVote
});

export const editQuestionVote = questionVote => ({
    type: UPDATE_QUESTION_VOTE,
    questionVote
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
            delete nextState[action.questionVote.id];
            return nextState;
        case UPDATE_QUESTION_VOTE:
            //todo
            return nextState;
        case RECEIVE_QUESTION:
            return {...action.payload.questionVotes};
        case RECEIVE_QUESTIONS:
            return {}
      default:
        return state;
    };
};
  
export default questionVoteReducer;