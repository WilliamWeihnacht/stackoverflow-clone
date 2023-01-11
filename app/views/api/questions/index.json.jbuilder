@questions.each do |question|
    json.set! question.id do
        json.extract! question, :id, :title, :body, :user_id, :created_at, :updated_at
        json.user question.user.username
        json.answer_count question.answers.length
        json.vote_count question.votes.length
        json.score question.votes.where(upvote: true).length - question.votes.where(upvote: false).length
        if current_user
            json.user_vote question.votes.where(user_id: current_user.id).first
        else
            json.user_vote nil
        end
    end
end