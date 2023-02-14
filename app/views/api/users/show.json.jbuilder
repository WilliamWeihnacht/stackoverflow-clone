json.user do
    json.extract! @user, :id, :email, :username, :created_at, :updated_at
end

json.answers do
    @user.answers.each do |answer|
        json.set! answer.id do
            json.extract! answer, :id, :user_id, :question_id, :body, :created_at, :updated_at
            json.vote_count answer.votes.length
        end
    end
end

json.questions do
    @user.questions.each do |question|
        json.set! question.id do
            json.extract! question, :id, :user_id, :title, :body, :created_at, :updated_at
            json.answer_count question.answers.length
            json.vote_count question.votes.length
        end
    end
end