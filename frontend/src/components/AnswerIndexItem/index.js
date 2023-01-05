import { useDispatch } from "react-redux";
import { deleteAnswer } from "../../store/answersReducer";


const AnswerIndexItem = ({ answer }) => {
    const dispatch = useDispatch();

    const handleDelete = async (e) => {
        dispatch(deleteAnswer(answer.id))
    }

    return (
        <li>
            {answer.body}
            <button onClick={handleDelete}>delete</button>
        </li>
    )
}

export default AnswerIndexItem;