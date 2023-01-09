# == Schema Information
#
# Table name: answer_votes
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  answer_id  :bigint           not null
#  upvote     :boolean          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class AnswerVote < ApplicationRecord

    validates :user_id, :answer_id, presence: true
    validates :user_id, uniqueness: { scope: :answer_id }
    validates :answer_id, uniqueness: { scope: :user_id }

    belongs_to :answer,
    foreign_key: :answer_id,
    class_name: :Answer

    belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

end
