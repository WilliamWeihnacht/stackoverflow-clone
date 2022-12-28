json.question do
    json.extract! @question, :id, :user_id, :title, :body
end