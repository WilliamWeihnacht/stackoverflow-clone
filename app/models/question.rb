# == Schema Information
#
# Table name: questions
#
#  id         :bigint           not null, primary key
#  user_id    :bigint           not null
#  title      :string           not null
#  body       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Question < ApplicationRecord
    validates :user_id, :title, :body, presence: true
    validates :title, uniqueness: true, length: { maximum: 100 }

    belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

end
