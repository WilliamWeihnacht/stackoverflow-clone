import "./QuestionIndexItem.css";

const QuestionIndexItem = ({ question }) => {


    return (
        <li>
            <a>{question.title}</a>
        </li>
    )
}

export default QuestionIndexItem;