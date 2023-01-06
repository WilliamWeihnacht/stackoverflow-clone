class CreateQuestionVotes < ActiveRecord::Migration[7.0]
  def change
    create_table :question_votes do |t|
      t.references :user, foreign_key: {to_table: :users}, null: false
      t.references :question, foreign_key: {to_table: :questions}, null: false
      t.boolean :upvote, null: false
      t.timestamps
    end
  end
end
