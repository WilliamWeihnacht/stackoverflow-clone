import { RECEIVE_ANSWER_VOTE, REMOVE_ANSWER_VOTE, UPDATE_ANSWER_VOTE } from "./answerVotesReducer";
import csrfFetch from "./csrf";
import { RECEIVE_QUESTION, RECEIVE_QUESTIONS, REMOVE_QUESTION } from "./questionsReducer";

export const RECEIVE_ANSWER = 'RECEIVE_ANSWER';
export const RECEIVE_ANSWERS = 'RECEIVE_ANSWERS';
export const REMOVE_ANSWER = 'REMOVE_ANSWER';

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
	if (res.ok) {
		const data = await res.json();
		dispatch(receiveAnswer(data));
	} else {
		console.log(res.statusText);
	}
}

export const deleteAnswer = (answerId) => async (dispatch) => {
	const res = await csrfFetch(`/api/answers/${answerId}`, {
		method: 'DELETE',
	});
	if (res.ok) {
		dispatch(removeAnswer(answerId))
	} else {
		console.log(res.statusText);
	}
} 

export const fetchAnswers = (questionId) => async (dispatch) => {
	const res = await fetch(`/questions/${questionId}`);
	if (res.ok) {
		const data = await res.json();
		dispatch(receiveAnswers(data))
	} else {
		console.log(res.statusText);
	}
}

//action creators
export const receiveAnswer = answer => ({
	type: RECEIVE_ANSWER,
	answer
});

export const receiveAnswers = answers => ({
	type: RECEIVE_ANSWERS,
	answers
});

export const removeAnswer = answerId => ({
	type: REMOVE_ANSWER,
	answerId
})

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
		case RECEIVE_QUESTIONS:
			// return {};
			return nextState;
		case RECEIVE_QUESTION:
			// return {...nextState, ...action.payload.answers};
			return {...action.payload.answers};
		case REMOVE_QUESTION:
			Object.entries(nextState).forEach(element => {
				if (element.questionId === action.questionId) delete nextState[element.id]
			});
		case RECEIVE_ANSWER_VOTE:
			nextState[action.payload.answer_id].userVote = action.payload;
			return nextState
		case REMOVE_ANSWER_VOTE:
			nextState[action.answerVote.answer_id].userVote = null;
			return nextState
		case UPDATE_ANSWER_VOTE:
			nextState[action.answerVote.answer_id].userVote = action.answerVote;
			return nextState
		default:
			return state;
	};
};
	
export default answerReducer;