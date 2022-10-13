class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.text :content, null: false
      t.timestamps
    end
    add_reference :posts, :user, index: true, foreign_key: true
  end
end
