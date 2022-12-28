import csrfFetch from "./csrf";

const RECEIVE_QUESTION = 'RECEIVE_QUESTION';
const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
const REMOVE_QUESTION = 'REMOVE_QUESTION';
const RECEIVE_QUESTION_DETAIL = 'RECEIVE_QUESTION_DETAIL';

//fetch util methods
export const requestQuestions = () => {
    return fetch('/api/questions');
}
  
export const postQuestion = (question) => {
    return csrfFetch('/api/questions', {
        method: 'POST',
        body: JSON.stringify(question)
    });
}
  
export const requestQuestionDetail = id => {
    return fetch(`/api/questions/${id}`)
}

//thunk action creators
export const fetchAllQuestions = () => async (dispatch) => {
    const res = await requestQuestions();
    const questions = await res.json();
    dispatch(receiveQuestions(questions));
}

export const createQuestion = (question) => async (dispatch) => {
    const res = await postQuestion(question);
    let data;
    if (res.ok) {
      data = await res.json();
      dispatch(receiveQuestion(data))
    } else {
      console.log(res.statusText);
    }
}


//action creators
export const receiveQuestions = questions => ({
    type: RECEIVE_QUESTIONS,
    questions
});

export const receiveQuestion = question => ({
    type: RECEIVE_QUESTION,
    question
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
        nextState[action.question.id] = action.question;
        return nextState;
      case RECEIVE_QUESTIONS:
        return {...nextState, ...action.questions}
      case REMOVE_QUESTION:
        delete nextState[action.questionId];
        return nextState;
      default:
        return state;
    };
};
  
  export default questionReducer;


