@questions.each do |question|
    json.set! question.id do
        json.extract! question, :id, :title, :body, :user_id, :created_at, :updated_at
    end
end