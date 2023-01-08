json.question do
  json.extract! @question, :id, :user_id, :title, :body, :created_at, :updated_at
  json.score @question.votes.where(upvote: true).length - @question.votes.where(upvote: false).length
  json.user_vote @question.votes.where(user_id: @user_id).first
end

json.answers do
  @question.answers.each do |answer|
    json.set! answer.id do
      json.extract! answer, :id, :user_id, :question_id, :body, :created_at, :updated_at
      json.user answer.user.username
      json.score answer.votes.where(upvote: true).length - answer.votes.where(upvote: false).length
      json.user_vote answer.votes.where(user_id: @user_id).where(answer_id: answer.id).first
    end
  end
end

json.questionVotes do
  @question.votes.each do |vote|
    json.set! vote.id do
      json.extract! vote, :id, :user_id, :question_id, :upvote
    end
  end
end