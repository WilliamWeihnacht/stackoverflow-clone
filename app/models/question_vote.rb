class QuestionVote < ApplicationRecord

    validates :user_id, :question_id, presence: true
    validates :user_id, uniqueness: { scope: :question_id }
    validates :question_id, uniqueness: { scope: :user_id }

    belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

    belongs_to :question,
    foreign_key: :question_id,
    class_name: :Question

end
