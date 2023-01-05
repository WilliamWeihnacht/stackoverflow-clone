json.question do
  json.extract! @question, :id, :user_id, :title, :body, :created_at, :updated_at
end

json.answers do
  @question.answers.each do |answer|
    json.set! answer.id do
      json.extract! answer, :id, :user_id, :question_id, :body, :created_at, :updated_at
    end
  end
end