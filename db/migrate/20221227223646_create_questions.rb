class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions do |t|
      t.references :user, null: false, foreign_key: {to_table: :users}
      t.string :title, null: false, unique: true, index: true
      t.string :body, null: false
      t.timestamps
    end
  end
end
