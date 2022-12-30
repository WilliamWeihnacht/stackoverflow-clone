class CreateAnswers < ActiveRecord::Migration[7.0]
  def change
    create_table :answers do |t|
      t.references :user, null: false, foreign_key: {to_table: :users}
      t.references :question, null: false, foreign_key: {to_table: :questions}
      t.string :body, null: false
      t.timestamps
    end
  end
end
