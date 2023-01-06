import { useDispatch, useSelector } from "react-redux";
import { deleteAnswer } from "../../store/answersReducer";


const AnswerIndexItem = ({ answer }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const handleDelete = async (e) => {
        dispatch(deleteAnswer(answer.id))
    }

    let deleteButton = <></>
    if (sessionUser.id === answer.userId) {
        deleteButton = <button onClick={handleDelete}>delete</button>
    }

    return (
        <li>
            {answer.body}
            <br></br>
            {answer.user}
            {deleteButton}
        </li>
    )
}

export default AnswerIndexItem;