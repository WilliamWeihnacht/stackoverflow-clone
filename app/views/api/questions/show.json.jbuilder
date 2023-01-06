json.question do
  json.extract! @question, :id, :user_id, :title, :body, :created_at, :updated_at
  json.score @question.votes.where(upvote: true).length - @question.votes.where(upvote: false).length
end

json.answers do
  @question.answers.each do |answer|
    json.set! answer.id do
      json.extract! answer, :id, :user_id, :question_id, :body, :created_at, :updated_at
      json.user answer.user.username
    end
  end
end