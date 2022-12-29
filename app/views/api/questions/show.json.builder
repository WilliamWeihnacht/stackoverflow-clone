JSON.question do
    JSON.extract! @question, :id, :user_id, :title, :body
end