class CreateAnswerVotes < ActiveRecord::Migration[7.0]
  def change
    create_table :answer_votes do |t|
      t.references :user, foreign_key: {to_table: :users}, null: false
      t.references :answer, foreign_key: {to_table: :answers}, null: false
      t.boolean :upvote, null: false
      t.timestamps
    end
  end
end
