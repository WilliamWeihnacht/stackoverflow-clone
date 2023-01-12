import csrfFetch from "./csrf";
import { RECEIVE_QUESTION_VOTE, REMOVE_QUESTION_VOTE, UPDATE_QUESTION_VOTE } from "./questionVotesReducer";

export const RECEIVE_QUESTION = 'RECEIVE_QUESTION';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const REMOVE_QUESTION = 'REMOVE_QUESTION';

//fetch util methods
export const requestQuestions = () => {
    return fetch('/api/questions');
}
  
export const requestQuestionDetail = id => {
    return fetch(`/api/questions/${id}`)
}

export const getQuestion = (questionId) => (store) => {
  if (store?.questions[questionId]) return store.questions[questionId];
  return null;
};

//thunk action creators
export const fetchAllQuestions = () => async (dispatch) => {
    const res = await requestQuestions();
    const questions = await res.json();
    dispatch(receiveQuestions(questions));
}

export const fetchSearchQuestions = (searchTerm) => async (dispatch) => {
  const res = await fetch(`/api/search?query=${searchTerm}`);
  if (res.ok) {
      const data = await res.json();
      dispatch(receiveQuestions(data));
  }
}

export const createQuestion = (question) => async (dispatch) => {
    const res = await csrfFetch('/api/questions', {
      method: 'POST',
      body: JSON.stringify(question)
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(receiveQuestion(data))
    } else {
      console.log(res.statusText);
    }
}

export const editQuestion = (question) => async (dispatch) => {
  question = {question}
  console.log(question)
  const res = await csrfFetch(`/api/questions/${question.question.question_id}`, {
    method: "PATCH",
    body: JSON.stringify(question)
  });

  if(res.ok) {
    const data = await res.json();
    dispatch(receiveQuestion(data))
  } else {
    console.log(res.statusText);
  }
}

export const fetchQuestion = (questionId) => async (dispatch) => {
  const res = await fetch(`/api/questions/${questionId}`);
  if (res.ok) {
    const question = await res.json();
    dispatch(receiveQuestion(question));
  } else {
    console.log(res.statusText);
  }
}

export const deleteQuestion = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/questions/${id}`, {
    method: "DELETE"
  });
  if (res.ok) {
    dispatch(removeQuestion(id));
  } else {
    console.log(res.statusText);
  }
}

//action creators
export const receiveQuestions = questions => ({
    type: RECEIVE_QUESTIONS,
    questions
});

export const receiveQuestion = payload => ({
    type: RECEIVE_QUESTION,
    payload
});

export const removeQuestion = questionId => ({
    type: REMOVE_QUESTION,
    questionId
});

//reducer
const questionReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = { ...state };
  
    switch (action.type) {
      case RECEIVE_QUESTION:
        // nextState[action.payload.id] = action.payload;
        nextState[action.payload.question.id] = action.payload.question;
        return nextState
      case RECEIVE_QUESTIONS:
        return {...nextState, ...action.questions}
        // return {...action.questions}
      case REMOVE_QUESTION:
        delete nextState[action.questionId];
        return nextState;
      case RECEIVE_QUESTION_VOTE:
        nextState[action.payload.question_id].userVote = action.payload
        return nextState
      case REMOVE_QUESTION_VOTE:
        nextState[action.questionVote.question_id].userVote = null
        return nextState
      case UPDATE_QUESTION_VOTE:
        nextState[action.questionVote.question_id].userVote = action.questionVote
        return nextState
      default:
        return state;
    };
};
  
export default questionReducer;