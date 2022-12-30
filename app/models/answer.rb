# == Schema Information
#
# Table name: answers
#
#  id          :bigint           not null, primary key
#  user_id     :bigint           not null
#  question_id :bigint           not null
#  body        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Answer < ApplicationRecord
    validates :user_id, :question_id, :body, presence: true

    belongs_to :question,
    foreign_key: :question_id,
    class_name: :Question,
    dependent: :destroy

    belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

end
