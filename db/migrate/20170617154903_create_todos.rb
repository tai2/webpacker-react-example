class CreateTodos < ActiveRecord::Migration[5.1]
  def change
    create_table :todos do |t|
      t.string :content, null: false
      t.datetime :due_date, null: false
      t.boolean :done, null: false

      t.timestamps
    end
  end
end
